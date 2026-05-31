import { AppHeader } from "@/components/layout/AppHeader";
import { WorkflowProgress } from "@/components/layout/WorkflowProgress";
import { GlassCard } from "@/components/ui/GlassCard";

const REPORT_SECTIONS = [
  "Executive Summary",
  "Brand DNA Analysis",
  "Audience Intelligence",
  "Trend & Cultural Insights",
  "Creator Recommendations",
  "Event & Sponsorship Opportunities",
  "Budget Allocation",
  "Campaign Concepts",
  "Risk Analysis",
  "Action Plan",
];

export default function ReportsPage() {
  return (
    <>
      <AppHeader title="Reports" showExecute={false} />
      <div className="space-y-10 px-4 py-6 md:p-8 xl:space-y-12 xl:p-12">
        <div>
          <h3 className="font-display-lg">Agency Reports</h3>
          <p className="mt-2 text-on-surface-variant">
            Executive-ready, client-quality reports with research, insights, and recommendations.
          </p>
        </div>
        <WorkflowProgress />

        <GlassCard className="p-5 md:p-8 xl:p-12">
          <div className="border-b border-outline-variant pb-8">
            <p className="font-data-mono text-xs uppercase text-primary">Client Report Preview</p>
            <h4 className="mt-2 font-display-lg text-3xl">FitPulse Launch Strategy</h4>
            <p className="mt-2 text-on-surface-variant">India · Gen Z · ₹10 Lakh · Q3 2025</p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {REPORT_SECTIONS.map((section, i) => (
              <div
                key={section}
                className="rounded-lg border border-outline-variant/50 bg-surface-container-low p-4"
              >
                <span className="font-data-mono text-[10px] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-1 font-bold">{section}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-lg bg-primary px-8 py-3 font-label-sm font-bold uppercase text-on-primary hover:brightness-110">
              Export PDF
            </button>
            <button className="rounded-lg border border-outline-variant px-8 py-3 font-label-sm font-bold uppercase hover:bg-surface-container">
              Share with Client
            </button>
          </div>
        </GlassCard>
      </div>
    </>
  );
}
