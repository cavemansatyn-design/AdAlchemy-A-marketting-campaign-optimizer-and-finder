import { AppHeader } from "@/components/layout/AppHeader";
import { WorkflowProgress } from "@/components/layout/WorkflowProgress";
import { SectionIntelligence } from "@/components/intelligence/SectionIntelligence";
import { FilteredCelebritiesGrid } from "@/components/intelligence/BriefFilteredCatalog";
import { WorkflowContinue } from "@/components/workflow/WorkflowContinue";

export default function CelebritiesPage() {
  return (
    <>
      <AppHeader title="Celebrity Intelligence" />
      <div className="space-y-10 px-4 py-6 md:p-8 xl:space-y-12 xl:p-12">
        <div>
          <span className="font-data-mono text-xs uppercase tracking-[0.2em] text-primary">
            India 2026 · momentum, fit, reputation
          </span>
          <h3 className="font-display-lg mt-2">Celebrity Intelligence</h3>
          <p className="mt-2 text-on-surface-variant">
            Celebrities sorted by brand fit for your active brief and budget tier.
          </p>
        </div>

        <WorkflowProgress />
        <SectionIntelligence section="celebrities" />
        <FilteredCelebritiesGrid />
        <WorkflowContinue from="celebrities" />
      </div>
    </>
  );
}
