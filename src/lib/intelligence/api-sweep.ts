import type { ClientBrief } from "@/lib/types/workflow";
import { getCachedDiscovery } from "@/lib/intelligence/discovery-cache";
import type { DiscoverySource } from "@/lib/intelligence/providers/anakin-discovery";
import { isAnakinConfigured } from "@/lib/intelligence/config";

export interface ApiSweepResult {
  apiCallCount: number;
  completedCalls: number;
  queries: string[];
  sources: DiscoverySource[];
}

function buildSweepQueries(
  brief: Partial<ClientBrief>,
  naturalLanguage?: string
): string[] {
  const brand = brief.brand ?? "brand";
  const audience = brief.audience ?? "Gen Z";
  const region = brief.region ?? "India";
  const industry = brief.industry ?? "consumer";
  const snippet = naturalLanguage?.slice(0, 80) ?? "";

  return [
    `${brand} ${region} marketing trends 2026`,
    `${brand} creator influencer ${region}`,
    `${brand} celebrity endorsement ${region} 2026`,
    `${brand} event sponsorship ${region}`,
    `${audience} ${region} social media marketing`,
    `${industry} ${region} campaign opportunities 2026`,
    `India cricket IPL brand marketing ${brand}`,
    `India marathon running sponsorship 2026`,
    `India esports gaming brand activation`,
    `${brand} competitor campaigns ${region}`,
    `India Gen Z brand activation reels YouTube`,
    `${snippet || brand} India marketing intelligence`,
  ];
}

/**
 * Fires 12 parallel Anakin discovery calls per generation.
 * Results enrich meta/source counts; not all are shown in UI.
 */
export async function runBackgroundApiSweep(input: {
  brief?: Partial<ClientBrief>;
  naturalLanguage?: string;
}): Promise<ApiSweepResult> {
  const queries = buildSweepQueries(input.brief ?? {}, input.naturalLanguage);

  if (!isAnakinConfigured()) {
    return {
      apiCallCount: queries.length,
      completedCalls: queries.length,
      queries,
      sources: queries.map((q, i) => ({
        title: `[Simulated] ${q.slice(0, 60)}…`,
        url: `https://discovery.adalchemy.local/sweep/${i}`,
        snippet: "Background intelligence sweep (demo mode — configure ANAKIN_API_KEY for live calls)",
      })),
    };
  }

  const settled = await Promise.allSettled(
    queries.map((query) => getCachedDiscovery(query, 3))
  );

  const sources: DiscoverySource[] = [];
  let completedCalls = 0;

  for (const result of settled) {
    if (result.status === "fulfilled") {
      completedCalls += 1;
      sources.push(...result.value);
    }
  }

  return {
    apiCallCount: queries.length,
    completedCalls,
    queries,
    sources,
  };
}
