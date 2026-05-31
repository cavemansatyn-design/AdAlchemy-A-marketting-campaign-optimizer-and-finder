import { AppHeader } from "@/components/layout/AppHeader";
import { GlassCard } from "@/components/ui/GlassCard";

const MOVEMENTS = [
  { name: "Localized Bio-Heritage", type: "Cultural Movement", momentum: "+288%", regions: "India, Southeast Asia" },
  { name: "Tier-2 City Pride", type: "Community Shift", momentum: "+156%", regions: "India" },
  { name: "Slow Fitness", type: "Lifestyle Trend", momentum: "+89%", regions: "Global Urban" },
  { name: "Creator-Owned Commerce", type: "Economic Shift", momentum: "+134%", regions: "Global" },
];

export default function CulturePage() {
  return (
    <>
      <AppHeader title="Culture Radar" />
      <div className="space-y-10 px-4 py-6 md:p-8 xl:space-y-12 xl:p-12">
        <div>
          <h3 className="font-display-lg">Culture Radar</h3>
          <p className="mt-2 text-on-surface-variant">
            Cultural movements, community shifts, and emerging narratives across regions.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {MOVEMENTS.map((movement) => (
            <GlassCard key={movement.name} className="p-5 md:p-8">
              <span className="font-data-mono text-[10px] uppercase text-primary">
                {movement.type}
              </span>
              <h4 className="mt-2 font-headline-md text-xl">{movement.name}</h4>
              <p className="mt-2 text-sm text-on-surface-variant">{movement.regions}</p>
              <p className="mt-4 font-data-mono text-lg text-success-emerald">
                {movement.momentum}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </>
  );
}
