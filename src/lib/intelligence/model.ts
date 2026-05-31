import type { ClientBrief, BrandDNA } from "@/lib/types/workflow";
import type { IntelligenceQuery, IntelligenceResult, IntelligenceSource } from "@/lib/types/intelligence";
import { isChatGPTWireConfigured, isGroqConfigured } from "@/lib/intelligence/config";
import { runChatGPTPrompt } from "@/lib/intelligence/providers/wire-chatgpt";
import type { DiscoverySource } from "@/lib/intelligence/providers/anakin-discovery";
import {
  getSharedDiscoveryForBrief,
} from "@/lib/intelligence/discovery-cache";
import { runGroqPrompt } from "@/lib/intelligence/providers/groq";
import {
  BriefAnalysisSchema,
  CampaignOutputSchema,
  computeConfidenceFromWire,
  computeFallbackConfidence,
  extractJsonFromAnswer,
  findObjectWithKeys,
  type BriefAnalysis,
  type BudgetScenario,
  type CampaignOutput,
  type ChatGPTWireResponse,
} from "@/lib/intelligence/schemas";
import {
  buildBriefAnalysisPrompt,
  buildCampaignPrompt,
  buildIntelligencePrompt,
} from "@/lib/intelligence/prompts";
import {
  ATTENTION_PULSE,
  RECOMMENDED_OPPORTUNITIES,
} from "@/lib/data/mock-dashboard";
import { TRUSTED_BRANDS } from "@/lib/data/india-2026";

function inferBriefFromInput(input: {
  naturalLanguage?: string;
  brief?: Partial<ClientBrief>;
}): ClientBrief {
  const text = input.naturalLanguage ?? "";
  const lower = text.toLowerCase();
  const knownBrand = TRUSTED_BRANDS.find((b) => lower.includes(b.toLowerCase()));
  const budgetMatch = text.match(/(?:₹|rs\.?\s*)[\d.]+\s*(?:cr|crore|lakh|lac|k)?/i);
  const brand =
    input.brief?.brand ||
    knownBrand ||
    (text.split(/\s+/)[0]?.replace(/[^a-zA-Z0-9]/g, "") || "Campaign Brand");
  const audience =
    input.brief?.audience ||
    (lower.includes("gen z")
      ? "Gen Z"
      : lower.match(/\d{2}-\d{2}/)?.[0]
        ? `Ages ${lower.match(/\d{2}-\d{2}/)![0]}`
        : "Young adults 18-35");
  const region =
    input.brief?.region ||
    (lower.includes("india") ? "India" : lower.includes("metro") ? "Metro India" : "India");
  const budget = input.brief?.budget || budgetMatch?.[0] || "₹10 lakh";
  const timeline =
    input.brief?.timeline ||
    (lower.includes("q4") ? "Q4 2026" : lower.includes("q3") ? "Q3 2026" : "Q4 2026");

  return {
    brand,
    industry: input.brief?.industry ?? "Consumer / Lifestyle",
    audience,
    region,
    budget,
    goals: input.brief?.goals ?? "Brand awareness and cultural relevance",
    timeline,
    naturalLanguage: input.naturalLanguage,
  };
}

export interface ReasoningMeta {
  model?: string;
  webSearchTriggered: boolean;
  citations: unknown[];
  searchSources: unknown[];
  promptSentAt?: string;
  source: "anakin-wire-chatgpt" | "groq-reasoning" | "mock";
  discoverySources?: DiscoverySource[];
  error?: string;
  /** Background Anakin discovery calls fired during generation */
  apiCallCount?: number;
  backgroundQueries?: number;
}

export interface AnalyzeBriefResult {
  brief: ClientBrief;
  brandDNA: BrandDNA;
  budgetScenarios: BudgetScenario[];
  summary: string;
  confidence: number;
  meta: ReasoningMeta;
}

export interface CampaignGenerationResult {
  campaign: CampaignOutput;
  confidence: number;
  meta: ReasoningMeta;
}

const MOCK_BRAND_DNA: BrandDNA = {
  values: ["Performance", "Innovation", "Inclusivity"],
  personality: "Bold, aspirational, authentic",
  archetype: "The Hero",
  coreThemes: ["Movement", "Community", "Achievement"],
  brandVoice: "Confident, energetic, inclusive",
  audienceProfile: "Gen Z fitness enthusiasts in urban India",
  positioning: "Premium accessible performance for the next generation",
};

const MOCK_BUDGET: BudgetScenario[] = [
  {
    id: "a",
    label: "Virat Kohli Celebrity Anchor",
    reach: "8.2M",
    engagement: "4.1%",
    efficiency: "Medium",
    recommended: false,
  },
  {
    id: "b",
    label: "Bhuvan Bam, Prajakta Koli, CarryMinati Creator Pod",
    reach: "4.5M",
    engagement: "7.8%",
    efficiency: "High",
    recommended: true,
  },
  {
    id: "c",
    label: "TCS World 10K Bengaluru + Creator Activation",
    reach: "6.1M",
    engagement: "6.2%",
    efficiency: "High",
    recommended: false,
  },
];

function wireToMeta(wire: ChatGPTWireResponse): ReasoningMeta {
  return {
    model: wire.model,
    webSearchTriggered: wire.web_search_triggered,
    citations: wire.citations,
    searchSources: wire.search_sources,
    promptSentAt: wire.prompt_sent_at,
    source: "anakin-wire-chatgpt",
  };
}

function groqToMeta(model: string, discoverySources: DiscoverySource[]): ReasoningMeta {
  return {
    model,
    webSearchTriggered: discoverySources.length > 0,
    citations: [],
    searchSources: discoverySources,
    source: "groq-reasoning",
    discoverySources,
  };
}

function mockMeta(error?: string): ReasoningMeta {
  return {
    webSearchTriggered: false,
    citations: [],
    searchSources: [],
    source: "mock",
    error,
  };
}

function formatLiveError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes("Just a moment") || message.includes("composer")) {
    return "ChatGPT WIRE session is not ready. Reconnect or refresh the ChatGPT account in Anakin WIRE.";
  }

  try {
    const parsed = JSON.parse(message) as Array<{ path?: string[] }>;
    if (Array.isArray(parsed)) {
      const fields = parsed
        .map((item) => item.path?.join("."))
        .filter(Boolean)
        .join(", ");
      return fields
        ? `Live response did not match the required JSON fields: ${fields}.`
        : "Live response did not match the required JSON shape.";
    }
  } catch {
    // Keep the original message when it is not a Zod JSON error payload.
  }

  return message;
}

function parseBriefAnalysis(wire: ChatGPTWireResponse): BriefAnalysis {
  const raw = extractJsonFromAnswer(wire.answer_text);
  const analysis =
    findObjectWithKeys(raw, ["brief", "brandDNA", "budgetScenarios", "summary"]) ??
    raw;
  return BriefAnalysisSchema.parse(analysis);
}

function parseCampaignOutput(wire: ChatGPTWireResponse): CampaignOutput {
  const raw = extractJsonFromAnswer(wire.answer_text);
  const campaign =
    findObjectWithKeys(raw, ["concept", "tagline", "hooks", "kpis", "timeline"]) ??
    raw;
  return CampaignOutputSchema.parse(campaign);
}

function getMockBriefAnalysis(
  input: { naturalLanguage?: string; brief?: Partial<ClientBrief> },
  error?: string
): AnalyzeBriefResult {
  const brief = inferBriefFromInput(input);

  return {
    brief,
    brandDNA: MOCK_BRAND_DNA,
    budgetScenarios: MOCK_BUDGET,
    summary: error
      ? `Fallback analysis generated because live WIRE reasoning is unavailable: ${error}`
      : "Mock analysis — configure ANAKIN_API_KEY and ANAKIN_WIRE_CHATGPT_ACTION_ID for live reasoning.",
    confidence: computeFallbackConfidence({
      hasBrief: Boolean(input.naturalLanguage || input.brief?.brand),
      isError: Boolean(error),
      provider: "none",
    }),
    meta: mockMeta(error),
  };
}

function getMockCampaign(error?: string): CampaignGenerationResult {
  return {
    campaign: {
      concept: "Move Together — Tier-2 Fitness Revolution",
      tagline: "Your city. Your pace. Your movement.",
      hooks: [
        "What if your morning run started a movement?",
        "Premium performance shouldn't need a metro passport.",
        "3 creators. 3 cities. 1 movement.",
      ],
      kpis: ["Reach: 4.5M", "Engagement Rate: 6.8%", "Brand Recall: +22%", "CPA: ₹42"],
      timeline: [
        { week: "Week 1-2", action: "Creator outreach & content briefing" },
        { week: "Week 3-4", action: "Teaser campaign across Reels & YouTube" },
        { week: "Week 5-6", action: "Marathon sponsorship activation" },
        { week: "Week 7-8", action: "Community challenge & UGC push" },
      ],
    },
    confidence: computeFallbackConfidence({ provider: "mock" }),
    meta: mockMeta(error),
  };
}

async function getDiscoveryForPrompt(query: IntelligenceQuery | string) {
  try {
    if (typeof query === "string") {
      const { sources, evidence } = await getSharedDiscoveryForBrief({ extra: query });
      return { sources, evidence };
    }
    const { sources, evidence } = await getSharedDiscoveryForBrief({
      brand: query.brand,
      audience: query.audience,
      region: query.region,
      extra: query.query,
    });
    return { sources, evidence };
  } catch {
    return {
      sources: [] as DiscoverySource[],
      evidence: "No live source results were available.",
    };
  }
}

export async function analyzeBrief(input: {
  naturalLanguage?: string;
  brief?: Partial<ClientBrief>;
}): Promise<AnalyzeBriefResult> {
  if (!isGroqConfigured() && !isChatGPTWireConfigured()) {
    return getMockBriefAnalysis(input);
  }

  const discovery = await getDiscoveryForPrompt(
    input.naturalLanguage ??
      `${input.brief?.brand ?? "brand"} ${input.brief?.audience ?? ""} ${input.brief?.region ?? "India"} campaign 2026`
  );
  const promptInput = { ...input, sourceEvidence: discovery.evidence };

  if (isGroqConfigured()) {
    try {
      const prompt = buildBriefAnalysisPrompt(promptInput);
      const groq = await runGroqPrompt(prompt, { json: true });
      const wire: ChatGPTWireResponse = {
        answer_text: groq.answerText,
        citations: [],
        search_sources: discovery.sources,
        web_search_triggered: discovery.sources.length > 0,
        model: groq.model,
      };
      const analysis = parseBriefAnalysis(wire);

      return {
        brief: analysis.brief,
        brandDNA: analysis.brandDNA,
        budgetScenarios: analysis.budgetScenarios,
        summary: analysis.summary,
        confidence: computeConfidenceFromWire(wire),
        meta: groqToMeta(groq.model, discovery.sources),
      };
    } catch (error) {
      if (!isChatGPTWireConfigured()) {
        return getMockBriefAnalysis(input, formatLiveError(error));
      }
    }
  }

  let wire: ChatGPTWireResponse;
  let analysis: BriefAnalysis;
  try {
    const prompt = buildBriefAnalysisPrompt(promptInput);
    wire = await runChatGPTPrompt({ prompt });
    analysis = parseBriefAnalysis(wire);
  } catch (error) {
    return getMockBriefAnalysis(input, formatLiveError(error));
  }

  return {
    brief: analysis.brief,
    brandDNA: analysis.brandDNA,
    budgetScenarios: analysis.budgetScenarios,
    summary: analysis.summary,
    confidence: computeConfidenceFromWire(wire),
    meta: wireToMeta(wire),
  };
}

export async function generateCampaign(input: {
  brief: ClientBrief;
  brandDNA: BrandDNA;
  sourceEvidence?: string;
  sources?: DiscoverySource[];
}): Promise<CampaignGenerationResult> {
  if (!isGroqConfigured() && !isChatGPTWireConfigured()) {
    return getMockCampaign();
  }

  const discovery =
    input.sourceEvidence && input.sources
      ? { sources: input.sources, evidence: input.sourceEvidence }
      : await getDiscoveryForPrompt({
          query: `${input.brief.brand} ${input.brief.audience} ${input.brief.region} creators events sponsorship campaign 2026`,
          brand: input.brief.brand,
          audience: input.brief.audience,
          region: input.brief.region,
        });
  const promptInput = { ...input, sourceEvidence: discovery.evidence };

  if (isGroqConfigured()) {
    try {
      const prompt = buildCampaignPrompt(promptInput);
      const groq = await runGroqPrompt(prompt, { json: true });
      const wire: ChatGPTWireResponse = {
        answer_text: groq.answerText,
        citations: [],
        search_sources: discovery.sources,
        web_search_triggered: discovery.sources.length > 0,
        model: groq.model,
      };
      const campaign = parseCampaignOutput(wire);

      return {
        campaign,
        confidence: computeConfidenceFromWire(wire),
        meta: groqToMeta(groq.model, discovery.sources),
      };
    } catch (error) {
      if (!isChatGPTWireConfigured()) {
        return getMockCampaign(formatLiveError(error));
      }
    }
  }

  let wire: ChatGPTWireResponse;
  let campaign: CampaignOutput;
  try {
    const prompt = buildCampaignPrompt(promptInput);
    wire = await runChatGPTPrompt({ prompt });
    campaign = parseCampaignOutput(wire);
  } catch (error) {
    return getMockCampaign(formatLiveError(error));
  }

  return {
    campaign,
    confidence: computeConfidenceFromWire(wire),
    meta: wireToMeta(wire),
  };
}

export async function interpretIntelligenceQuery(
  query: IntelligenceQuery
): Promise<IntelligenceResult & { meta: ReasoningMeta }> {
  const baseSignals = ATTENTION_PULSE.map((item) => ({
    id: item.id,
    title: item.name,
    summary: `${item.name} showing ${item.change}% momentum in ${query.region ?? "global"} markets`,
    category: item.category,
    region: query.region,
    scores: {
      attention: item.momentum,
      momentum: item.change,
      confidence: 85,
    },
    sources: ["anakin-wire-chatgpt", "anakin-wire-trends"] as IntelligenceSource[],
    timestamp: new Date().toISOString(),
    live: item.change > 30,
  }));

  if (!isGroqConfigured() && !isChatGPTWireConfigured()) {
    return {
      signals: baseSignals,
      opportunities: RECOMMENDED_OPPORTUNITIES,
      reasoning: query.query
        ? `Analyzed "${query.query}" using mock intelligence pipeline.`
        : undefined,
      confidence: 68,
      meta: mockMeta(),
    };
  }

  const discovery = await getDiscoveryForPrompt({
    ...query,
    region: query.region ?? "India",
  });

  if (isGroqConfigured()) {
    try {
      const prompt = buildIntelligencePrompt(query, discovery.evidence);
      const groq = await runGroqPrompt(prompt);
      return {
        signals: baseSignals,
        opportunities: RECOMMENDED_OPPORTUNITIES,
        reasoning: groq.answerText,
        confidence: discovery.sources.length > 0 ? 88 : 76,
        meta: groqToMeta(groq.model, discovery.sources),
      };
    } catch (error) {
      if (!isChatGPTWireConfigured()) {
        const message = formatLiveError(error);
        return {
          signals: baseSignals,
          opportunities: RECOMMENDED_OPPORTUNITIES,
          reasoning: `Analyzed "${query.query}" using fallback intelligence because live Groq reasoning is unavailable: ${message}`,
          confidence: computeFallbackConfidence({
            sourceCount: discovery.sources.length,
            isError: true,
            provider: "groq",
          }),
          meta: mockMeta(message),
        };
      }
    }
  }

  let wire: ChatGPTWireResponse;
  try {
    const prompt = buildIntelligencePrompt(query, discovery.evidence);
    wire = await runChatGPTPrompt({ prompt });
  } catch (error) {
    const message = formatLiveError(error);
    return {
      signals: baseSignals,
      opportunities: RECOMMENDED_OPPORTUNITIES,
      reasoning: `Analyzed "${query.query}" using fallback intelligence because live WIRE reasoning is unavailable: ${message}`,
      confidence: computeFallbackConfidence({
        sourceCount: discovery.sources.length,
        isError: true,
        provider: "wire",
      }),
      meta: mockMeta(message),
    };
  }

  return {
    signals: baseSignals,
    opportunities: RECOMMENDED_OPPORTUNITIES,
    reasoning: wire.answer_text,
    confidence: computeConfidenceFromWire(wire),
    meta: wireToMeta(wire),
  };
}
