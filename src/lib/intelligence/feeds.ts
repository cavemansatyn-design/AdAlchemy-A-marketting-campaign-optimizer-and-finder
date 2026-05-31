import {
  ATTENTION_PULSE,
  OPPORTUNITY_FEED,
  RECOMMENDED_OPPORTUNITIES,
} from "@/lib/data/mock-dashboard";

export async function getOpportunityFeed() {
  return OPPORTUNITY_FEED;
}

export async function getAttentionPulse() {
  return ATTENTION_PULSE;
}

export async function getRecommendedOpportunities() {
  return RECOMMENDED_OPPORTUNITIES;
}
