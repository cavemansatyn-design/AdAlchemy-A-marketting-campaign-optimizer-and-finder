import type { IntelligenceQuery, IntelligenceResult } from "@/lib/types/intelligence";
import { interpretIntelligenceQuery } from "@/lib/intelligence/model";
import { getOpportunityFeed, getAttentionPulse, getRecommendedOpportunities } from "@/lib/intelligence/feeds";

/**
 * Unified intelligence layer — all data sources feed through one brain.
 * Reasoning is powered by Anakin WIRE ChatGPT when configured.
 */
export async function queryIntelligence(
  query: IntelligenceQuery
): Promise<IntelligenceResult> {
  return interpretIntelligenceQuery(query);
}

export { getOpportunityFeed, getAttentionPulse, getRecommendedOpportunities };
