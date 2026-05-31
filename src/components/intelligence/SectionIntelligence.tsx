"use client";

import { SectionInsightCard } from "@/components/ui/FormattedInsight";
import { useWorkflow } from "@/context/WorkflowContext";
import type { CampaignIntelligence } from "@/lib/types/campaign-intelligence";

type IntelligenceSection = keyof CampaignIntelligence["sections"];

export function SectionIntelligence({
  section,
  fallback,
}: {
  section: IntelligenceSection;
  fallback?: string;
}) {
  const { project } = useWorkflow();
  const insight = project.intelligence?.sections[section];

  if (!insight?.body && !fallback) return null;

  return (
    <SectionInsightCard
      title={insight?.title ?? section}
      body={insight?.body}
      fallback={fallback}
    />
  );
}
