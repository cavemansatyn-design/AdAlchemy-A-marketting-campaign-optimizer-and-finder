import type { ClientBrief } from "@/lib/types/workflow";
import {
  INDIA_2026_CREATORS,
  INDIA_2026_CELEBRITIES,
  INDIA_2026_EVENTS,
  INDIA_2026_TRENDS,
  INDIA_2026_AUDIENCE,
} from "@/lib/data/india-2026";

function briefKeywords(brief: ClientBrief | null): string[] {
  if (!brief) return [];
  const raw = [
    brief.brand,
    brief.industry,
    brief.audience,
    brief.region,
    brief.goals,
    brief.naturalLanguage ?? "",
  ]
    .join(" ")
    .toLowerCase();

  return [...new Set(raw.split(/[\s,./]+/).filter((w) => w.length > 2))];
}

function scoreText(text: string, keywords: string[]): number {
  const lower = text.toLowerCase();
  let score = 0;
  for (const kw of keywords) {
    if (lower.includes(kw)) score += 3;
  }
  return score;
}

function rankByBrief<T>(
  items: T[],
  brief: ClientBrief | null,
  textFn: (item: T) => string
): T[] {
  if (!brief) return items;
  const keywords = briefKeywords(brief);
  return [...items].sort(
    (a, b) => scoreText(textFn(b), keywords) - scoreText(textFn(a), keywords)
  );
}

export function getBriefFilteredCatalog(brief: ClientBrief | null) {
  const keywords = briefKeywords(brief);
  const brand = brief?.brand ?? "Your brand";

  const interests = brief
    ? [
        ...INDIA_2026_AUDIENCE.interests.filter((i) =>
          keywords.some((k) => i.toLowerCase().includes(k))
        ),
        ...INDIA_2026_AUDIENCE.interests,
      ].slice(0, 8)
    : INDIA_2026_AUDIENCE.interests;

  const themes = brief
    ? [
        `${brand} x ${brief.audience} activation`,
        ...INDIA_2026_AUDIENCE.themes,
      ].slice(0, 6)
    : INDIA_2026_AUDIENCE.themes;

  return {
    creators: rankByBrief(INDIA_2026_CREATORS, brief, (c) =>
      `${c.name} ${c.niche} ${c.audience} ${c.city}`
    ),
    celebrities: rankByBrief(INDIA_2026_CELEBRITIES, brief, (c) =>
      `${c.name} ${c.narrative} ${"category" in c ? (c as { category?: string }).category : ""}`
    ),
    events: rankByBrief(INDIA_2026_EVENTS, brief, (e) =>
      `${e.name} ${e.audience} ${e.location} ${"category" in e ? (e as { category?: string }).category : ""}`
    ),
    trends: rankByBrief(INDIA_2026_TRENDS, brief, (t) =>
      `${t.name} ${t.niche} ${t.region}`
    ),
    audience: {
      ...INDIA_2026_AUDIENCE,
      interests,
      themes,
      headline: brief
        ? `${brand} · ${brief.audience} · ${brief.region}`
        : "India 2026 audience signals",
    },
  };
}
