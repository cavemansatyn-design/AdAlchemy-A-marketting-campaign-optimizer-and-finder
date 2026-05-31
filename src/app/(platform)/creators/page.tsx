import { AppHeader } from "@/components/layout/AppHeader";
import { WorkflowProgress } from "@/components/layout/WorkflowProgress";
import { SectionIntelligence } from "@/components/intelligence/SectionIntelligence";
import { FilteredCreatorsGrid } from "@/components/intelligence/BriefFilteredCatalog";
import { WorkflowContinue } from "@/components/workflow/WorkflowContinue";

export default function CreatorsPage() {
  return (
    <>
      <AppHeader title="Creator Intelligence" />
      <div className="space-y-10 px-4 py-6 md:p-8 xl:space-y-12 xl:p-12">
        <div>
          <span className="font-data-mono text-xs uppercase tracking-[0.2em] text-primary">
            Multi-platform creator discovery
          </span>
          <h3 className="font-display-lg mt-2">Creator Intelligence</h3>
          <p className="mt-2 max-w-2xl text-on-surface-variant">
            Creators re-ranked for your brief — niche, city, platform, cost tier, and brand match.
          </p>
        </div>

        <WorkflowProgress />
        <SectionIntelligence section="creators" />
        <FilteredCreatorsGrid />
        <WorkflowContinue from="creators" />
      </div>
    </>
  );
}
