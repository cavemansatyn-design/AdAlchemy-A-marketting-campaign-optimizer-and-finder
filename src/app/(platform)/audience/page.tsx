import { AppHeader } from "@/components/layout/AppHeader";
import { WorkflowProgress } from "@/components/layout/WorkflowProgress";
import { SectionIntelligence } from "@/components/intelligence/SectionIntelligence";
import { WorkflowContinue } from "@/components/workflow/WorkflowContinue";
import { BriefAudiencePanel } from "@/components/intelligence/BriefAudiencePanel";

export default function AudienceIntelligencePage() {
  return (
    <>
      <AppHeader title="Audience Intelligence" />
      <div className="space-y-10 px-4 py-6 md:p-8 xl:space-y-12 xl:p-12">
        <div>
          <span className="font-data-mono text-xs uppercase tracking-[0.2em] text-primary">
            Workflow Stage 3
          </span>
          <h3 className="font-display-lg mt-2">Audience Intelligence</h3>
          <p className="mt-2 text-on-surface-variant">
            Unified India 2026 signals ranked for your active brief — communities,
            platforms, and cultural themes.
          </p>
        </div>

        <WorkflowProgress />
        <SectionIntelligence section="audience" />
        <BriefAudiencePanel />
        <WorkflowContinue from="audience" />
      </div>
    </>
  );
}
