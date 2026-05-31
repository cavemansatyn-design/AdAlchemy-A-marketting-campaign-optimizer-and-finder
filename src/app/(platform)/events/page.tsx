import { AppHeader } from "@/components/layout/AppHeader";
import { WorkflowProgress } from "@/components/layout/WorkflowProgress";
import { SectionIntelligence } from "@/components/intelligence/SectionIntelligence";
import { FilteredEventsGrid } from "@/components/intelligence/BriefFilteredCatalog";
import { WorkflowContinue } from "@/components/workflow/WorkflowContinue";

export default function EventsPage() {
  return (
    <>
      <AppHeader title="Event Intelligence" />
      <div className="space-y-10 px-4 py-6 md:p-8 xl:space-y-12 xl:p-12">
        <div>
          <span className="font-data-mono text-xs uppercase tracking-[0.2em] text-primary">
            Ongoing & upcoming · India 2026
          </span>
          <h3 className="font-display-lg mt-2">Event & Sponsorship Intelligence</h3>
          <p className="mt-2 text-on-surface-variant">
            Events ranked for your brief — marathons, IPL, esports, festivals with reach and cost tiers.
          </p>
        </div>

        <WorkflowProgress />
        <SectionIntelligence section="events" />
        <FilteredEventsGrid />
        <WorkflowContinue from="events" />
      </div>
    </>
  );
}
