import { AppHeader } from "@/components/layout/AppHeader";
import { WorkflowProgress } from "@/components/layout/WorkflowProgress";
import { SectionIntelligence } from "@/components/intelligence/SectionIntelligence";
import { FilteredTrendsList } from "@/components/intelligence/BriefFilteredCatalog";
import { WorkflowContinue } from "@/components/workflow/WorkflowContinue";

export default function TrendsPage() {
  return (
    <>
      <AppHeader title="Trend Radar" />
      <div className="space-y-10 px-4 py-6 md:p-8 xl:space-y-12 xl:p-12">
        <div>
          <h3 className="font-display-lg">Trend Radar</h3>
          <p className="mt-2 text-on-surface-variant">
            Trends ranked for your brief — India 2026 demand, growth, and lifecycle signals.
          </p>
        </div>
        <WorkflowProgress />
        <SectionIntelligence section="trends" />
        <FilteredTrendsList />
        <WorkflowContinue from="trends" />
      </div>
    </>
  );
}
