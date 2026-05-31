import type { BrandDNA, ClientBrief } from "@/lib/types/workflow";
import type { CampaignIntelligence } from "@/lib/types/campaign-intelligence";
import {
  discoverMarketSources,
  formatDiscoverySources,
} from "@/lib/intelligence/providers/anakin-discovery";
import { getCachedDiscovery } from "@/lib/intelligence/discovery-cache";
import { isChatGPTWireConfigured, isGroqConfigured } from "@/lib/intelligence/config";
import { runGroqPrompt } from "@/lib/intelligence/providers/groq";
import { runChatGPTPrompt } from "@/lib/intelligence/providers/wire-chatgpt";
import {
  computeConfidenceFromWire,
  extractJsonFromAnswer,
  findObjectWithKeys,
} from "@/lib/intelligence/schemas";
import type { ReasoningMeta } from "@/lib/intelligence/model";
import {
  INDIA_2026_AUDIENCE,
  INDIA_2026_TRENDS,
} from "@/lib/data/india-2026";
import { getBriefFilteredCatalog } from "@/lib/data/brief-filter";

function fallbackIntelligence(
  brief: ClientBrief,
  brandDNA: BrandDNA,
  sources: Awaited<ReturnType<typeof discoverMarketSources>>
): CampaignIntelligence {
  const catalog = getBriefFilteredCatalog(brief);
  const topTrend = catalog.trends[0] ?? INDIA_2026_TRENDS[0];
  const topCreator = catalog.creators[0];
  const topEvent = catalog.events[0];
  const topCeleb = catalog.celebrities[0];
  const recommendedCreators = catalog.creators.slice(0, 3);
  const recommendedCelebrities = catalog.celebrities.slice(0, 3);
  const recommendedEvents = catalog.events.slice(0, 5);

  return {
    executiveSummary: `${brief.brand} can win in ${brief.region} by pairing ${brandDNA.coreThemes.slice(0, 2).join(" and ")} with India 2026 cultural momentum around ${topTrend.name.toLowerCase()}, ${topCreator.niche.toLowerCase()}, and ${topEvent.name}. With a ${brief.budget} budget, creator pods and event sampling will outperform celebrity-only launches for ${brief.audience}.`,
    sections: {
      audience: {
        title: "Audience Intelligence",
        body: `${brief.audience} in ${brief.region} is active across ${INDIA_2026_AUDIENCE.communities.slice(0, 3).join(", ")}. They care about ${INDIA_2026_AUDIENCE.interests.slice(0, 3).join(", ")}. Key pain point: ${INDIA_2026_AUDIENCE.painPoints[0]} Primary desire: ${INDIA_2026_AUDIENCE.desires[0]}`,
      },
      trends: {
        title: "Trend Radar",
        body: `Leading niches: ${INDIA_2026_TRENDS.map((t) => `${t.name} (${t.growth})`).join("; ")}. Best fit for ${brief.industry}: ${topTrend.niche} with ${topTrend.lifecycle} lifecycle in ${topTrend.region}.`,
      },
      creators: {
        title: "Creator Intelligence",
        body: `Recommended pods: ${recommendedCreators.map((c) => `${c.name} (${c.niche}, ${c.cost})`).join("; ")}. ${topCreator.name} is the strongest creator match for ${brief.audience} in ${brief.region}.`,
      },
      celebrities: {
        title: "Celebrity Intelligence",
        body: `For ${brief.budget}, consider ${recommendedCelebrities.map((c) => `${c.name} (${c.cost})`).join("; ")}. ${topCeleb.name} gives the cleanest celebrity anchor, while the creator layer keeps the plan from becoming celebrity-only.`,
      },
      events: {
        title: "Event Intelligence",
        body: `Upcoming routes: ${recommendedEvents.map((e) => `${e.name} (${e.cost})`).join("; ")}. ${topEvent.name} offers the strongest sponsorship route for ${brief.goals.toLowerCase()}.`,
      },
      opportunities: {
        title: "Opportunity Engine",
        body: `Top sponsorship plays: ${topEvent.name} community zones, women's cricket fitness series, and regional creator pods in tier-2 cities. Expected efficiency is highest when event + creator bundles stay under ${brief.budget}.`,
      },
    },
    discoverySources: sources,
    meta: {
      webSearchTriggered: sources.length > 0,
      citations: [],
      searchSources: sources,
      source: "mock",
    },
    generatedAt: new Date().toISOString(),
  };
}

function buildPipelinePrompt(
  brief: ClientBrief,
  brandDNA: BrandDNA,
  evidence: string
): string {
  return `Return ONLY valid JSON. You are AdAlchemy's India 2026 intelligence engine.

Brief brand: ${brief.brand}
Industry: ${brief.industry}
Audience: ${brief.audience}
Region: ${brief.region}
Budget: ${brief.budget}
Goals: ${brief.goals}
Positioning: ${brandDNA.positioning}

Live source evidence:
${evidence}

Return this shape with rich, formatted prose in each body (2-3 sentences, use bullet characters where helpful):
{
  "executiveSummary": "string",
  "sections": {
    "audience": { "title": "Audience Intelligence", "body": "string" },
    "trends": { "title": "Trend Radar", "body": "string" },
    "creators": { "title": "Creator Intelligence", "body": "string" },
    "celebrities": { "title": "Celebrity Intelligence", "body": "string" },
    "events": { "title": "Event Intelligence", "body": "string" },
    "opportunities": { "title": "Opportunity Engine", "body": "string" }
  }
}

Optimize for India 2026. Never mention APIs, Groq, ChatGPT, crawlers, or scrapers.`;
}

export async function buildIntelligenceSnapshot(
  brief: ClientBrief,
  brandDNA: BrandDNA,
  preloadedSources?: Awaited<ReturnType<typeof discoverMarketSources>>
): Promise<CampaignIntelligence> {
  const sources =
    preloadedSources ??
    (await getCachedDiscovery(
      `${brief.brand} ${brief.industry} ${brief.audience} ${brief.region} India 2026`,
      8
    ));
  const evidence = formatDiscoverySources(sources);
  const fallback = fallbackIntelligence(brief, brandDNA, sources);

  if (!isGroqConfigured() && !isChatGPTWireConfigured()) {
    return fallback;
  }

  const prompt = buildPipelinePrompt(brief, brandDNA, evidence);

  try {
    let answerText: string;
    let meta: ReasoningMeta;

    if (isGroqConfigured()) {
      const groq = await runGroqPrompt(prompt, { json: true });
      answerText = groq.answerText;
      meta = {
        model: groq.model,
        webSearchTriggered: sources.length > 0,
        citations: [],
        searchSources: sources,
        source: "groq-reasoning",
        discoverySources: sources,
      };
    } else {
      const wire = await runChatGPTPrompt({ prompt });
      answerText = wire.answer_text;
      meta = {
        model: wire.model,
        webSearchTriggered: wire.web_search_triggered || sources.length > 0,
        citations: wire.citations,
        searchSources: [...wire.search_sources, ...sources],
        source: "anakin-wire-chatgpt",
        discoverySources: sources,
      };
    }

    const raw = extractJsonFromAnswer(answerText);
    const parsed =
      findObjectWithKeys(raw, ["executiveSummary", "sections"]) ?? raw;

    const executiveSummary =
      typeof parsed === "object" &&
      parsed !== null &&
      "executiveSummary" in parsed &&
      typeof (parsed as { executiveSummary: unknown }).executiveSummary === "string"
        ? (parsed as { executiveSummary: string }).executiveSummary
        : fallback.executiveSummary;

    const sectionsRaw =
      typeof parsed === "object" &&
      parsed !== null &&
      "sections" in parsed &&
      typeof (parsed as { sections: unknown }).sections === "object"
        ? (parsed as { sections: CampaignIntelligence["sections"] }).sections
        : fallback.sections;

    const wireMeta = meta.source === "anakin-wire-chatgpt"
      ? {
          ...meta,
          confidence: computeConfidenceFromWire({
            answer_text: answerText,
            citations: meta.citations,
            search_sources: meta.searchSources,
            web_search_triggered: meta.webSearchTriggered,
          }),
        }
      : meta;

    return {
      executiveSummary,
      sections: {
        audience: sectionsRaw.audience ?? fallback.sections.audience,
        trends: sectionsRaw.trends ?? fallback.sections.trends,
        creators: sectionsRaw.creators ?? fallback.sections.creators,
        celebrities: sectionsRaw.celebrities ?? fallback.sections.celebrities,
        events: sectionsRaw.events ?? fallback.sections.events,
        opportunities: sectionsRaw.opportunities ?? fallback.sections.opportunities,
      },
      discoverySources: sources,
      meta: wireMeta,
      generatedAt: new Date().toISOString(),
    };
  } catch {
    return fallback;
  }
}
