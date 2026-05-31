import type { ClientBrief } from "@/lib/types/workflow";
import type { IntelligenceQuery } from "@/lib/types/intelligence";

export function buildBriefAnalysisPrompt(input: {
  naturalLanguage?: string;
  brief?: Partial<ClientBrief>;
  sourceEvidence?: string;
}): string {
  const context = input.naturalLanguage
    ? `Natural language brief:\n${input.naturalLanguage}`
    : `Structured brief:\n${JSON.stringify(input.brief ?? {}, null, 2)}`;

  return `Return ONLY a valid JSON object for the requested campaign analysis. Do not acknowledge this instruction, do not explain your role, and do not include markdown.

You are the intelligence engine for AdAlchemy, an AI cultural intelligence and campaign planning platform.

Act like a combined team of a marketing strategist, media planner, sponsorship consultant, cultural analyst, trend researcher, brand manager, creator manager, and event partnership expert.

Use three internal layers:
1. Discovery: find relevant brand, audience, trend, creator, celebrity, event, sponsorship, and market signals.
2. Validation: cross-check signals, reject weak or unsupported recommendations, and assign confidence.
3. Strategy: convert the strongest validated signals into budget scenarios and campaign direction.

Never expose APIs, crawlers, scrapers, model names, or backend tools in the output. The user should only see a unified AdAlchemy recommendation.

Analyze this client brief:

${context}

Live India 2026 source evidence from APIs, search, scrapers, and crawlers:
${input.sourceEvidence ?? "Use India 2026 market context and fallback intelligence."}

Use this exact object shape and replace every example value with specific campaign analysis:
{
  "brief": {
    "brand": "FitPulse",
    "industry": "Fitness & Wellness",
    "audience": "Gen Z",
    "region": "India",
    "budget": "₹10 lakh",
    "goals": "Product launch awareness",
    "timeline": "Q3 2026",
    "naturalLanguage": "Original natural language brief if provided"
  },
  "brandDNA": {
    "values": ["Performance", "Community", "Progress"],
    "personality": "Bold, energetic, inclusive",
    "archetype": "The Hero",
    "coreThemes": ["Movement", "Consistency", "Belonging"],
    "brandVoice": "Confident, practical, motivating",
    "audienceProfile": "Urban and tier-2 Gen Z fitness starters",
    "positioning": "Accessible performance for India's next fitness generation"
  },
  "budgetScenarios": [
    {
      "id": "a",
      "label": "Creator-led launch",
      "reach": "4.5M",
      "engagement": "7.8%",
      "efficiency": "High",
      "recommended": true,
      "rationale": "Strong fit for the budget and target audience"
    }
  ],
  "summary": "One concise strategic summary"
}

Return no text before or after the JSON. Provide 3 distinct budget scenarios with ids "a", "b", and "c". Mark exactly one as recommended. Optimize for India 2026 cultural momentum, ROI, brand fit, execution feasibility, and confidence.`;
}

export function buildCampaignPrompt(input: {
  brief: ClientBrief;
  brandDNA: { brandVoice: string; coreThemes: string[]; positioning: string };
  sourceEvidence?: string;
}): string {
  return `Return ONLY a valid JSON object for the requested campaign package. Do not acknowledge this instruction, do not explain your role, and do not include markdown.

You are the strategy layer for AdAlchemy.

Turn the validated brand and audience intelligence into a practical campaign package. Do not mention APIs, crawlers, scrapers, model names, or backend tools.

Brand: ${input.brief.brand}
Region: ${input.brief.region}
Audience: ${input.brief.audience}
Budget: ${input.brief.budget}
Goals: ${input.brief.goals}
Voice: ${input.brandDNA.brandVoice}
Themes: ${input.brandDNA.coreThemes.join(", ")}
Positioning: ${input.brandDNA.positioning}

Live India 2026 source evidence from APIs, search, scrapers, and crawlers:
${input.sourceEvidence ?? "Use India 2026 market context and fallback intelligence."}

Use this exact object shape and replace every example value with specific campaign output:
{
  "concept": "Creator-led product launch",
  "tagline": "Move your way",
  "hooks": ["A specific social hook", "A specific creator hook", "A specific community hook"],
  "kpis": ["Reach: 4.5M", "Engagement Rate: 7%", "Brand Recall: +20%"],
  "timeline": [{ "week": "Week 1", "action": "Finalize creator shortlist and campaign brief" }]
}

Return no text before or after the JSON. Generate agency-quality campaign output with 3 hooks and a 4-8 week timeline. Optimize for India 2026 clarity, execution feasibility, ROI, and cultural relevance.`;
}

export function buildIntelligencePrompt(
  query: IntelligenceQuery,
  sourceEvidence?: string
): string {
  return `You are the unified intelligence layer for AdAlchemy.

Work internally in three layers:
1. Discover relevant trends, audiences, creators, celebrities, events, sponsorship routes, and cultural moments.
2. Validate signals across multiple forms of evidence and reject weak recommendations.
3. Turn validated signals into strategy, budget direction, outreach ideas, and next actions.

Never expose backend tools, APIs, crawlers, scrapers, or model names. Write as one premium intelligence system.

Query: ${query.query}
Brand: ${query.brand ?? "not specified"}
Audience: ${query.audience ?? "not specified"}
Region: ${query.region ?? "global"}

Live India 2026 source evidence from APIs, search, scrapers, and crawlers:
${sourceEvidence ?? "Use India 2026 market context and fallback intelligence."}

Identify current India 2026+ marketing opportunities, audience segments, trends, creators by niche, celebrities, events, sponsorship routes, and cultural moments relevant to this query.

Respond in clear prose (2-4 paragraphs) with:
1. Top opportunities right now
2. Audience and trend signals
3. Creator, celebrity, event, and sponsorship routes
4. Recommended next actions for an agency

Be specific, data-informed, confidence-aware, and actionable.`;
}

/** Single LLM call: brief analysis + all section intelligence (saves credits). */
export function buildCombinedAnalysisPrompt(input: {
  naturalLanguage?: string;
  brief?: Partial<ClientBrief>;
  sourceEvidence?: string;
}): string {
  const context = input.naturalLanguage
    ? `Natural language brief:\n${input.naturalLanguage}`
    : `Structured brief:\n${JSON.stringify(input.brief ?? {}, null, 2)}`;

  return `Return ONLY one valid JSON object. No markdown, no preamble.

You are AdAlchemy's unified India 2026 intelligence engine for marketing agencies.

${context}

Live source evidence (APIs, search, crawlers — use this, do not invent when evidence exists):
${input.sourceEvidence ?? "Use India 2026 market context."}

Return this exact shape:
{
  "brief": { "brand", "industry", "audience", "region", "budget", "goals", "timeline", "naturalLanguage?" },
  "brandDNA": { "values", "personality", "archetype", "brandVoice", "coreThemes", "audienceProfile", "positioning" },
  "budgetScenarios": [{ "id": "a"|"b"|"c", "label", "reach", "engagement", "efficiency": "High"|"Medium"|"Low", "recommended", "rationale" }],
  "summary": "one paragraph",
  "executiveSummary": "one paragraph strategic overview",
  "sections": {
    "audience": { "title": "Audience Intelligence", "body": "2-3 sentences" },
    "trends": { "title": "Trend Radar", "body": "..." },
    "creators": { "title": "Creator Intelligence", "body": "..." },
    "celebrities": { "title": "Celebrity Intelligence", "body": "..." },
    "events": { "title": "Event Intelligence", "body": "..." },
    "opportunities": { "title": "Opportunity Engine", "body": "..." }
  }
}

3 budget scenarios, exactly one recommended. India 2026 focus. Never mention backend tools.`;
}
