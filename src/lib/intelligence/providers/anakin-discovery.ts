import { Anakin } from "@anakin-io/sdk";
import { getIntelligenceConfig } from "@/lib/intelligence/config";
import type { IntelligenceQuery } from "@/lib/types/intelligence";

export interface DiscoverySource {
  title: string;
  url: string;
  snippet?: string;
  date?: string;
}

let client: Anakin | null = null;

function getAnakinClient(): Anakin {
  if (!client) {
    const { anakinApiKey } = getIntelligenceConfig();
    client = new Anakin({
      apiKey: anakinApiKey,
      pollTimeoutMs: 120_000,
    });
  }
  return client;
}

export async function discoverMarketSources(
  query: IntelligenceQuery | string,
  limit = 8
): Promise<DiscoverySource[]> {
  const { anakinApiKey } = getIntelligenceConfig();
  if (!anakinApiKey) return [];

  const searchText =
    typeof query === "string"
      ? query
      : [
          query.query,
          query.brand,
          query.audience,
          query.region ?? "India",
          "2026 India creators celebrities events sponsorship trends",
        ]
          .filter(Boolean)
          .join(" ");

  const result = await getAnakinClient().search(searchText, { limit });

  return result.results.map((item) => ({
    title: item.title ?? item.url,
    url: item.url,
    snippet: item.snippet,
    date: item.date ?? item.lastUpdated,
  }));
}

export function formatDiscoverySources(sources: DiscoverySource[]): string {
  if (sources.length === 0) {
    return "No live source results were available. Use the India 2026 fallback market model.";
  }

  return sources
    .map(
      (source, index) =>
        `${index + 1}. ${source.title}\nURL: ${source.url}\n${source.snippet ?? ""}`
    )
    .join("\n\n");
}
