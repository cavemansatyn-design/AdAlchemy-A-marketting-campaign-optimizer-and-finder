import type { CampaignIntelligence } from "@/lib/types/campaign-intelligence";
import type { ClientBrief } from "@/lib/types/workflow";
import { cacheGet, cacheSet, cacheKey, TTL } from "@/lib/intelligence/cache";
import { getSharedDiscoveryForBrief } from "@/lib/intelligence/discovery-cache";
import { isChatGPTWireConfigured, isGroqConfigured } from "@/lib/intelligence/config";
import { runGroqPrompt } from "@/lib/intelligence/providers/groq";
import { runChatGPTPrompt } from "@/lib/intelligence/providers/wire-chatgpt";
import { buildIntelligenceSnapshot } from "@/lib/intelligence/pipeline";
import {
  computeConfidenceFromWire,
  extractJsonFromAnswer,
  findObjectWithKeys,
  FullAnalysisSchema,
  type FullAnalysis,
} from "@/lib/intelligence/schemas";
import { buildCombinedAnalysisPrompt } from "@/lib/intelligence/prompts";
import { runBackgroundApiSweep } from "@/lib/intelligence/api-sweep";
import type { AnalyzeBriefResult, ReasoningMeta } from "@/lib/intelligence/model";
import { analyzeBrief as legacyAnalyzeBrief } from "@/lib/intelligence/model";

async function runReasoningJson(
  prompt: string,
  sources: unknown[]
): Promise<{ answerText: string; meta: ReasoningMeta }> {
  if (isGroqConfigured()) {
    const groq = await runGroqPrompt(prompt, { json: true });
    return {
      answerText: groq.answerText,
      meta: {
        model: groq.model,
        webSearchTriggered: sources.length > 0,
        citations: [],
        searchSources: sources,
        source: "groq-reasoning",
      },
    };
  }

  if (isChatGPTWireConfigured()) {
    const wire = await runChatGPTPrompt({ prompt });
    return {
      answerText: wire.answer_text,
      meta: {
        model: wire.model,
        webSearchTriggered: wire.web_search_triggered || sources.length > 0,
        citations: wire.citations,
        searchSources: [...wire.search_sources, ...sources],
        source: "anakin-wire-chatgpt",
      },
    };
  }

  throw new Error("No reasoning provider configured");
}

function fullAnalysisToResult(
  analysis: FullAnalysis,
  meta: ReasoningMeta
): AnalyzeBriefResult & { intelligence: CampaignIntelligence } {
  const wire = {
    answer_text: analysis.summary,
    citations: meta.citations as unknown[],
    search_sources: meta.searchSources as unknown[],
    web_search_triggered: meta.webSearchTriggered,
  };

  return {
    brief: analysis.brief,
    brandDNA: analysis.brandDNA,
    budgetScenarios: analysis.budgetScenarios,
    summary: analysis.summary,
    confidence: Math.min(
      computeConfidenceFromWire(wire) + (meta.apiCallCount && meta.apiCallCount >= 10 ? 4 : 0),
      98
    ),
    meta,
    intelligence: {
      executiveSummary: analysis.executiveSummary,
      sections: analysis.sections,
      discoverySources: (meta.discoverySources ?? meta.searchSources) as CampaignIntelligence["discoverySources"],
      meta,
      generatedAt: new Date().toISOString(),
    },
  };
}

/**
 * Credit-optimized path: 1× discovery + 1× LLM (Groq preferred over ChatGPT WIRE).
 */
export async function runFullAnalysis(input: {
  naturalLanguage?: string;
  brief?: Partial<ClientBrief>;
}): Promise<AnalyzeBriefResult & { intelligence: CampaignIntelligence }> {
  const key = cacheKey([
    "full-analysis",
    input.naturalLanguage,
    input.brief?.brand,
    input.brief?.audience,
    input.brief?.region,
    input.brief?.budget,
  ]);

  const cached = cacheGet<AnalyzeBriefResult & { intelligence: CampaignIntelligence }>(key);
  if (cached) {
    return {
      ...cached,
      meta: { ...cached.meta, source: cached.meta.source },
      intelligence: {
        ...cached.intelligence,
        meta: { ...cached.intelligence.meta, source: cached.intelligence.meta.source },
      },
    };
  }

  const { sources, evidence } = await getSharedDiscoveryForBrief({
    brand: input.brief?.brand,
    industry: input.brief?.industry,
    audience: input.brief?.audience,
    region: input.brief?.region,
    extra: input.naturalLanguage?.slice(0, 120),
  });

  const sweep = await runBackgroundApiSweep(input);
  const mergedSources = [...sources, ...sweep.sources];
  const sweepMeta = {
    apiCallCount: sweep.apiCallCount + 1,
    backgroundQueries: sweep.apiCallCount,
  };

  if (!isGroqConfigured() && !isChatGPTWireConfigured()) {
    const legacy = await legacyAnalyzeBrief(input);
    const intelligence = await buildIntelligenceSnapshot(
      legacy.brief,
      legacy.brandDNA,
      mergedSources
    );
    const result = {
      ...legacy,
      meta: {
        ...legacy.meta,
        ...sweepMeta,
        searchSources: mergedSources,
        webSearchTriggered: mergedSources.length > 0,
      },
      intelligence: {
        ...intelligence,
        discoverySources: mergedSources,
        meta: { ...intelligence.meta, ...sweepMeta, searchSources: mergedSources },
      },
    };
    cacheSet(key, result, TTL.analysis);
    return result;
  }

  try {
    const prompt = buildCombinedAnalysisPrompt({
      ...input,
      sourceEvidence: evidence,
    });
    const { answerText, meta } = await runReasoningJson(prompt, mergedSources);
    meta.discoverySources = mergedSources;
    meta.searchSources = mergedSources;
    meta.apiCallCount = sweepMeta.apiCallCount;
    meta.backgroundQueries = sweepMeta.backgroundQueries;
    meta.webSearchTriggered = mergedSources.length > 0;

    const raw = extractJsonFromAnswer(answerText);
    const parsed =
      findObjectWithKeys(raw, [
        "brief",
        "brandDNA",
        "budgetScenarios",
        "summary",
        "executiveSummary",
        "sections",
      ]) ?? raw;

    const analysis = FullAnalysisSchema.parse(parsed);
    const result = fullAnalysisToResult(analysis, meta);
    cacheSet(key, result, TTL.analysis);
    return result;
  } catch {
    const legacy = await legacyAnalyzeBrief(input);
    const intelligence = await buildIntelligenceSnapshot(
      legacy.brief,
      legacy.brandDNA,
      mergedSources
    );
    const result = {
      ...legacy,
      meta: {
        ...legacy.meta,
        ...sweepMeta,
        searchSources: mergedSources,
      },
      intelligence: {
        ...intelligence,
        discoverySources: mergedSources,
        meta: { ...intelligence.meta, ...sweepMeta, searchSources: mergedSources },
      },
    };
    cacheSet(key, result, TTL.analysis);
    return result;
  }
}

export async function runCampaignWithCache(
  brief: ClientBrief,
  brandDNA: AnalyzeBriefResult["brandDNA"]
) {
  const key = cacheKey(["campaign", brief.brand, brief.audience, brief.budget, brief.goals]);
  const cached = cacheGet<Awaited<ReturnType<typeof import("@/lib/intelligence/model").generateCampaign>>>(key);
  if (cached) return cached;

  const { sources, evidence } = await getSharedDiscoveryForBrief({
    brand: brief.brand,
    audience: brief.audience,
    region: brief.region,
    industry: brief.industry,
  });

  const { generateCampaign } = await import("@/lib/intelligence/model");
  const result = await generateCampaign({ brief, brandDNA, sourceEvidence: evidence, sources });
  cacheSet(key, result, TTL.campaign);
  return result;
}
