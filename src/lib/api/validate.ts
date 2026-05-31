import type { ClientBrief } from "@/lib/types/workflow";

const MAX_TEXT = 4000;

export function sanitizeText(input: string, max = MAX_TEXT): string {
  return input.trim().slice(0, max);
}

export function parseAnalyzeBody(body: unknown):
  | { ok: true; naturalLanguage?: string; brief?: Partial<ClientBrief> }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body" };
  }

  const record = body as Record<string, unknown>;
  const naturalLanguage =
    typeof record.naturalLanguage === "string"
      ? sanitizeText(record.naturalLanguage)
      : undefined;

  let brief: Partial<ClientBrief> | undefined;
  if (record.brief && typeof record.brief === "object") {
    const b = record.brief as Record<string, unknown>;
    brief = {
      brand: typeof b.brand === "string" ? sanitizeText(b.brand, 120) : undefined,
      industry: typeof b.industry === "string" ? sanitizeText(b.industry, 120) : undefined,
      audience: typeof b.audience === "string" ? sanitizeText(b.audience, 120) : undefined,
      region: typeof b.region === "string" ? sanitizeText(b.region, 80) : undefined,
      budget: typeof b.budget === "string" ? sanitizeText(b.budget, 80) : undefined,
      goals: typeof b.goals === "string" ? sanitizeText(b.goals, 300) : undefined,
      timeline: typeof b.timeline === "string" ? sanitizeText(b.timeline, 80) : undefined,
    };
  }

  if (!naturalLanguage && !brief?.brand) {
    return { ok: false, error: "Provide naturalLanguage or a structured brief" };
  }

  return { ok: true, naturalLanguage, brief };
}

export function safeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes("API key") || error.message.includes("401")) {
      return "Intelligence service authentication failed. Check server configuration.";
    }
    if (error.message.includes("402") || error.message.includes("credits")) {
      return "Intelligence credits exhausted. Using cached and fallback data.";
    }
    return error.message.slice(0, 200);
  }
  return "Request failed";
}
