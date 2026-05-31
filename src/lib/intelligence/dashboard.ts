import { cacheGet, cacheSet, cacheKey, TTL } from "@/lib/intelligence/cache";
import { getCachedDiscovery } from "@/lib/intelligence/discovery-cache";
import type { OpportunityFeedItem } from "@/lib/types/intelligence";
import {
  ATTENTION_PULSE,
  EMERGING_NODES,
  RECOMMENDED_OPPORTUNITIES,
  OPPORTUNITY_FEED,
} from "@/lib/data/mock-dashboard";
import { PLATFORM_STATS } from "@/lib/data/india-2026";

export interface DashboardSnapshot {
  feed: OpportunityFeedItem[];
  attentionPulse: typeof ATTENTION_PULSE;
  topOpportunity: (typeof RECOMMENDED_OPPORTUNITIES)[0];
  emergingNodes: typeof EMERGING_NODES;
  metrics: {
    campaignPotential: string;
    projectedReach: string;
    partnerShortlist: string;
  };
  hero: {
    headline: string;
    subline: string;
    fitScore: number;
    liveSourceCount: number;
  };
  fromCache: boolean;
}

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const key = cacheKey(["dashboard", "india-2026"]);
  const cached = cacheGet<DashboardSnapshot>(key);
  if (cached) return { ...cached, fromCache: true };

  const sources = await getCachedDiscovery(
    "India 2026 marketing trends creators celebrities events sponsorship fitness cricket",
    6
  );

  const feed: OpportunityFeedItem[] =
    sources.length > 0
      ? sources.map((source, index) => ({
          id: `live-${index}`,
          message: source.title,
          category: "Live signal",
          momentum: 28 + index * 11,
          timestamp: "Live",
        }))
      : OPPORTUNITY_FEED;

  const liveCount = sources.length;
  const fitScore = liveCount > 0 ? Math.min(88 + liveCount, 97) : 92;

  const snapshot: DashboardSnapshot = {
    feed,
    attentionPulse: ATTENTION_PULSE,
    topOpportunity: RECOMMENDED_OPPORTUNITIES[0],
    emergingNodes: EMERGING_NODES,
    metrics: {
      campaignPotential: String(fitScore),
      projectedReach: liveCount > 0 ? `${12 + liveCount * 6}M` : "48M",
      partnerShortlist: String(PLATFORM_STATS.creatorCount + PLATFORM_STATS.eventCount),
    },
    hero: {
      headline:
        sources[0]?.title ??
        "Sponsor the moment before competitors price it in.",
      subline:
        sources[0]?.snippet?.slice(0, 140) ??
        "Women's cricket x fitness communities are aligning for India 2026 launches.",
      fitScore,
      liveSourceCount: liveCount,
    },
    fromCache: false,
  };

  cacheSet(key, snapshot, TTL.dashboard);
  return snapshot;
}
