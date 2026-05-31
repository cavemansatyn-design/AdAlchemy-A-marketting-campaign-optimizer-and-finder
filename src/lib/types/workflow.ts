export type WorkflowStage =
  | "brief"
  | "brand-dna"
  | "audience"
  | "trends"
  | "creators"
  | "celebrities"
  | "events"
  | "platforms"
  | "opportunities"
  | "budget"
  | "campaign"
  | "report";

export interface ClientBrief {
  brand: string;
  industry: string;
  audience: string;
  region: string;
  budget: string;
  goals: string;
  timeline: string;
  naturalLanguage?: string;
}

export interface BrandDNA {
  values: string[];
  personality: string;
  archetype: string;
  coreThemes: string[];
  brandVoice: string;
  audienceProfile: string;
  positioning: string;
}

import type { BudgetScenario } from "@/lib/intelligence/schemas";
import type { CampaignIntelligence } from "@/lib/types/campaign-intelligence";

export interface WorkflowProject {
  id: string;
  name: string;
  brief: ClientBrief | null;
  brandDNA: BrandDNA | null;
  budgetScenarios: BudgetScenario[];
  intelligence: CampaignIntelligence | null;
  pipelineStatus: "idle" | "loading" | "ready" | "error";
  currentStage: WorkflowStage;
  completedStages: WorkflowStage[];
  createdAt: string;
  updatedAt: string;
}

export const WORKFLOW_STAGES: {
  id: WorkflowStage;
  label: string;
  path: string;
}[] = [
  { id: "brief", label: "Client Brief", path: "/campaign-planner" },
  { id: "brand-dna", label: "Brand DNA", path: "/campaign-planner" },
  { id: "audience", label: "Audience", path: "/audience" },
  { id: "trends", label: "Trends", path: "/trends" },
  { id: "creators", label: "Creators", path: "/creators" },
  { id: "celebrities", label: "Celebrities", path: "/celebrities" },
  { id: "events", label: "Events", path: "/events" },
  { id: "platforms", label: "Platform Discovery", path: "/platforms" },
  { id: "opportunities", label: "Opportunity Discovery", path: "/opportunities" },
  { id: "budget", label: "Budget Optimization", path: "/campaign-planner" },
  { id: "campaign", label: "Campaign Generation", path: "/generator" },
  { id: "report", label: "Agency Report", path: "/reports" },
];
