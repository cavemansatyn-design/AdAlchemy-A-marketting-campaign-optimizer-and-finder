import { z } from "zod";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function textFromUnknown(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (value == null) return undefined;
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function normalizeWireResponse(value: unknown): unknown {
  if (!isRecord(value)) return value;

  const source = isRecord(value.outputs)
    ? value.outputs
    : isRecord(value.output)
      ? value.output
      : isRecord(value.result)
        ? value.result
        : isRecord(value.response)
          ? value.response
          : isRecord(value.data)
            ? value.data
            : value;

  const answerText =
    textFromUnknown(source.answer_text) ??
    textFromUnknown(source.answer) ??
    textFromUnknown(source.text) ??
    textFromUnknown(source.content) ??
    textFromUnknown(source.output) ??
    textFromUnknown(source.result) ??
    textFromUnknown(source.response) ??
    textFromUnknown(source.message) ??
    textFromUnknown(source);

  return {
    ...source,
    answer_text: answerText,
    citations: Array.isArray(source.citations) ? source.citations : [],
    search_sources: Array.isArray(source.search_sources)
      ? source.search_sources
      : [],
    web_search_triggered:
      typeof source.web_search_triggered === "boolean"
        ? source.web_search_triggered
        : false,
    prompt_sent_at:
      typeof source.prompt_sent_at === "string" ? source.prompt_sent_at : undefined,
    model: typeof source.model === "string" ? source.model : undefined,
  };
}

/** WIRE ChatGPT action response — validated at the intelligence boundary. */
export const ChatGPTWireResponseSchema = z.preprocess(
  normalizeWireResponse,
  z.object({
    answer_text: z.string(),
    citations: z.array(z.unknown()).optional().default([]),
    search_sources: z.array(z.unknown()).optional().default([]),
    web_search_triggered: z.boolean().optional().default(false),
    prompt_sent_at: z.string().optional(),
    model: z.string().optional(),
  })
);

export type ChatGPTWireResponse = z.infer<typeof ChatGPTWireResponseSchema>;

export const BrandDNASchema = z.object({
  values: z.array(z.string()),
  personality: z.string(),
  archetype: z.string(),
  brandVoice: z.string(),
  coreThemes: z.array(z.string()),
  audienceProfile: z.string(),
  positioning: z.string(),
});

export const ClientBriefSchema = z.object({
  brand: z.string(),
  industry: z.string(),
  audience: z.string(),
  region: z.string(),
  budget: z.string(),
  goals: z.string(),
  timeline: z.string(),
  naturalLanguage: z.string().optional(),
});

export const BudgetScenarioSchema = z.object({
  id: z.string(),
  label: z.string(),
  reach: z.string(),
  engagement: z.string(),
  efficiency: z.enum(["High", "Medium", "Low"]),
  recommended: z.boolean(),
  rationale: z.string().optional(),
});

export const BriefAnalysisSchema = z.object({
  brief: ClientBriefSchema,
  brandDNA: BrandDNASchema,
  budgetScenarios: z.array(BudgetScenarioSchema).min(1),
  summary: z.string(),
});

const SectionInsightSchema = z.object({
  title: z.string(),
  body: z.string(),
});

export const FullAnalysisSchema = BriefAnalysisSchema.extend({
  executiveSummary: z.string(),
  sections: z.object({
    audience: SectionInsightSchema,
    trends: SectionInsightSchema,
    creators: SectionInsightSchema,
    celebrities: SectionInsightSchema,
    events: SectionInsightSchema,
    opportunities: SectionInsightSchema,
  }),
});

export type FullAnalysis = z.infer<typeof FullAnalysisSchema>;

export const CampaignOutputSchema = z.object({
  concept: z.string(),
  tagline: z.string(),
  hooks: z.array(z.string()),
  kpis: z.array(z.string()),
  timeline: z.array(
    z.object({
      week: z.string(),
      action: z.string(),
    })
  ),
});

export type BriefAnalysis = z.infer<typeof BriefAnalysisSchema>;
export type CampaignOutput = z.infer<typeof CampaignOutputSchema>;
export type BudgetScenario = z.infer<typeof BudgetScenarioSchema>;

export function extractJsonFromAnswer(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced?.[1]) {
    return JSON.parse(fenced[1].trim());
  }

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end > start) {
    return JSON.parse(text.slice(start, end + 1));
  }

  throw new Error("No JSON object found in model response");
}

export function findObjectWithKeys(
  value: unknown,
  keys: string[],
  depth = 0
): unknown {
  if (depth > 5 || !value || typeof value !== "object") {
    return undefined;
  }

  if (
    !Array.isArray(value) &&
    keys.every((key) => Object.prototype.hasOwnProperty.call(value, key))
  ) {
    return value;
  }

  const values = Array.isArray(value) ? value : Object.values(value);
  for (const child of values) {
    const match = findObjectWithKeys(child, keys, depth + 1);
    if (match) return match;
  }

  return undefined;
}

export function computeConfidenceFromWire(wire: ChatGPTWireResponse): number {
  let score = 62;
  if (wire.web_search_triggered) score += 14;
  if (wire.citations.length > 0) score += Math.min(wire.citations.length * 4, 12);
  if (wire.search_sources.length > 0) {
    score += Math.min(wire.search_sources.length * 3, 15);
  }
  if (wire.model?.includes("llama") || wire.model?.includes("gpt")) score += 4;
  return Math.min(Math.max(score, 58), 98);
}

/** Dynamic confidence when LLM is unavailable or partially configured. */
export function computeFallbackConfidence(options: {
  sourceCount?: number;
  hasBrief?: boolean;
  isError?: boolean;
  provider?: "groq" | "wire" | "mock" | "none";
}): number {
  const { sourceCount = 0, hasBrief = false, isError = false, provider = "mock" } = options;
  let score = provider === "none" ? 61 : 68;
  if (hasBrief) score += 6;
  score += Math.min(sourceCount * 4, 20);
  if (provider === "groq") score += 8;
  if (provider === "wire") score += 10;
  if (isError) score -= 12;
  return Math.min(Math.max(score, 58), 94);
}
