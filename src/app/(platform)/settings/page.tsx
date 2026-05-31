import { AppHeader } from "@/components/layout/AppHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { isChatGPTWireConfigured } from "@/lib/intelligence/config";

const SOURCES = [
  {
    name: "Strategy intelligence",
    role: "Brand analysis, campaign generation, scoring, and summaries",
    configured: isChatGPTWireConfigured(),
  },
  {
    name: "Creator signals",
    role: "Creator fit, audience match, engagement, and collaboration ideas",
    configured: false,
  },
  {
    name: "Trend signals",
    role: "Growth patterns, geography, momentum, and risk indicators",
    configured: false,
  },
  {
    name: "Opportunity discovery",
    role: "Events, sponsorships, communities, and cultural moments",
    configured: false,
  },
];

export default function SettingsPage() {
  return (
    <>
      <AppHeader title="Settings" showExecute={false} />
      <div className="space-y-8 px-4 py-6 md:p-8 xl:p-12">
        <h3 className="font-display-lg">Settings</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <GlassCard className="p-5 md:p-8">
            <h4 className="font-headline-md mb-4">Intelligence Coverage</h4>
            <p className="mb-6 text-sm text-on-surface-variant">
              These signals work together behind the scenes so teams see one
              clear recommendation layer instead of separate tools.
            </p>
            <ul className="space-y-3">
              {SOURCES.map((source) => (
                <li
                  key={source.name}
                  className="rounded-lg bg-surface-container-low px-4 py-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold">{source.name}</span>
                    <span
                      className={`font-data-mono text-[10px] uppercase ${
                        source.configured
                          ? "text-success-emerald"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {source.configured ? "Connected" : "Planned"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-on-surface-variant">
                    {source.role}
                  </p>
                </li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard className="p-5 md:p-8">
            <h4 className="font-headline-md mb-4">Output Preferences</h4>
            <div className="space-y-4 text-sm text-on-surface-variant">
              <Preference label="Evidence" value="Show confidence and sources" />
              <Preference label="Recommendations" value="Prioritize ROI and fit" />
              <Preference label="Report style" value="Executive-ready summary" />
              <Preference label="Plan format" value="30 / 60 / 90 day roadmap" />
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
}

function Preference({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-outline-variant/40 bg-surface-container-low px-4 py-3">
      <span className="text-on-surface">{label}</span>
      <span className="text-right font-data-mono text-xs text-primary">{value}</span>
    </div>
  );
}
