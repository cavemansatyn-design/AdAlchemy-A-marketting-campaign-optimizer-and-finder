import {
  discoverMarketSources,
  formatDiscoverySources,
  type DiscoverySource,
} from "@/lib/intelligence/providers/anakin-discovery";
import { cacheGet, cacheSet, cacheKey, TTL } from "@/lib/intelligence/cache";

export async function getCachedDiscovery(
  query: string,
  limit = 8
): Promise<DiscoverySource[]> {
  const key = cacheKey(["discovery", query, String(limit)]);
  const cached = cacheGet<DiscoverySource[]>(key);
  if (cached) return cached;

  const sources = await discoverMarketSources(query, limit);
  if (sources.length > 0) {
    cacheSet(key, sources, TTL.discovery);
  }
  return sources;
}

export function getCachedDiscoveryEvidence(
  sources: DiscoverySource[]
): string {
  return formatDiscoverySources(sources);
}

export async function getSharedDiscoveryForBrief(parts: {
  brand?: string;
  audience?: string;
  region?: string;
  industry?: string;
  extra?: string;
}): Promise<{ sources: DiscoverySource[]; evidence: string }> {
  const searchQuery = [
    parts.brand,
    parts.industry,
    parts.audience,
    parts.region ?? "India",
    "2026",
    "creators celebrities events sponsorship trends marketing",
    parts.extra,
  ]
    .filter(Boolean)
    .join(" ")
    .slice(0, 280);

  const sources = await getCachedDiscovery(searchQuery, 8);
  return { sources, evidence: getCachedDiscoveryEvidence(sources) };
}
