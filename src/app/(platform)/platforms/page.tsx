import { AppHeader } from "@/components/layout/AppHeader";
import { WorkflowProgress } from "@/components/layout/WorkflowProgress";
import { GlassCard } from "@/components/ui/GlassCard";

const PLATFORMS = [
  { name: "YouTube", match: 92, efficiency: "High", reach: "4.5M", suitability: "Long-form, tutorials, reviews" },
  { name: "Instagram Reels", match: 88, efficiency: "High", reach: "3.2M", suitability: "Short-form, lifestyle" },
  { name: "Reddit", match: 76, efficiency: "Medium", reach: "890K", suitability: "Community, authenticity" },
  { name: "Gaming (Steam/Discord)", match: 64, efficiency: "Medium", reach: "1.1M", suitability: "Youth, engagement" },
  { name: "Search", match: 85, efficiency: "High", reach: "2.8M", suitability: "Intent capture" },
  { name: "Emerging: Threads", match: 58, efficiency: "Low", reach: "420K", suitability: "Early adopter test" },
];

export default function PlatformsPage() {
  return (
    <>
      <AppHeader title="Platform Intelligence" />
      <div className="space-y-10 px-4 py-6 md:p-8 xl:space-y-12 xl:p-12">
        <div>
          <h3 className="font-display-lg">Platform Intelligence</h3>
          <p className="mt-2 text-on-surface-variant">
            Recommended channels based on audience match, cost efficiency, and content suitability.
          </p>
        </div>
        <WorkflowProgress />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLATFORMS.map((platform) => (
            <GlassCard key={platform.name} className="p-5 md:p-6">
              <h4 className="font-headline-md text-lg">{platform.name}</h4>
              <p className="mt-2 text-sm text-on-surface-variant">{platform.suitability}</p>
              <div className="mt-6 grid grid-cols-1 gap-3 text-center sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div>
                  <p className="font-data-mono text-[10px] uppercase text-on-surface-variant">Match</p>
                  <p className="font-bold text-primary">{platform.match}</p>
                </div>
                <div>
                  <p className="font-data-mono text-[10px] uppercase text-on-surface-variant">Efficiency</p>
                  <p className="font-bold text-success-emerald">{platform.efficiency}</p>
                </div>
                <div>
                  <p className="font-data-mono text-[10px] uppercase text-on-surface-variant">Reach</p>
                  <p className="font-bold">{platform.reach}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </>
  );
}
