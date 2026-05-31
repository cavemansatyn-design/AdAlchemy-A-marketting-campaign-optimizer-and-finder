import type { ReasoningMeta } from "@/lib/intelligence/model";
import type { DiscoverySource } from "@/lib/intelligence/providers/anakin-discovery";
import type { BudgetScenario } from "@/lib/intelligence/schemas";

export interface SectionInsight {
  title: string;
  body: string;
}

export interface CampaignIntelligence {
  executiveSummary: string;
  sections: {
    audience: SectionInsight;
    trends: SectionInsight;
    creators: SectionInsight;
    celebrities: SectionInsight;
    events: SectionInsight;
    opportunities: SectionInsight;
  };
  discoverySources: DiscoverySource[];
  meta: ReasoningMeta;
  generatedAt: string;
}

export interface AnalysisPayload {
  brief: import("@/lib/types/workflow").ClientBrief;
  brandDNA: import("@/lib/types/workflow").BrandDNA;
  budgetScenarios: BudgetScenario[];
  summary: string;
  confidence: number;
  meta: ReasoningMeta;
  intelligence?: CampaignIntelligence;
}
