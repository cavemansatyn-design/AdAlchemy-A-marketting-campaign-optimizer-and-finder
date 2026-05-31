import { SectionIntelligence } from "@/components/intelligence/SectionIntelligence";
import { AppHeader } from "@/components/layout/AppHeader";
import { WorkflowProgress } from "@/components/layout/WorkflowProgress";
import { GlassCard } from "@/components/ui/GlassCard";
import { SafeImage } from "@/components/ui/SafeImage";
import { ScoreBadge } from "@/components/ui/ScoreBadge";

import {
  INDIA_2026_CREATORS,
  INDIA_2026_TRENDS,
} from "@/lib/data/india-2026";

const UNDERSERVED_AUDIENCES = [
  {
    id: "1",
    name: "Tier-2 fitness starters",
    detail: "18-28, Hindi/regional creator trust, high UGC potential",
    opportunity: 94.2,
    confidence: "High",
    icon: "groups",
  },
  {
    id: "2",
    name: "Women-led run communities",
    detail: "Urban women 20-34, marathon prep, community proof",
    opportunity: 91.5,
    confidence: "High",
    icon: "directions_run",
  },
];

const UNDERSATURATED_TRENDS = INDIA_2026_TRENDS.slice(0, 2).map((trend, index) => ({
  id: String(index + 1),
  signal: `TREND SIGNAL #2026-${index + 1}`,
  name: trend.name,
  growth: trend.growth,
  saturation: trend.lifecycle === "Emerging" ? "8%" : "12%",
}));

const DISCOVERY_ITEMS = [
  ...INDIA_2026_CREATORS.slice(0, 2).map((creator) => ({
    id: creator.handle,
    type: "creator" as const,
    name: creator.name,
    handle: creator.handle,
    image: creator.image,
    opportunity: creator.scores[0]?.value ?? 90,
    growth: `${creator.scores[1]?.value ?? 100}%`,
    confidence: "94%",
    description: `${creator.niche}. ${creator.city}. ${creator.audience}.`,
  })),
  {
    id: "event-1",
    type: "event" as const,
    name: "TCS World 10K Bengaluru 2026",
    handle: "Bengaluru | Running",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Open10K.jpg?width=900",
    opportunity: 95,
    growth: "12x",
    confidence: "94%",
    description:
      "Undersponsored community zones with strong sampling and creator race-team potential.",
  },
];

export default function OpportunityEnginePage() {
  return (
    <>
      <AppHeader title="Opportunity Engine" />
      <div className="space-y-12 px-4 py-6 pb-20 md:p-8 xl:space-y-16 xl:p-12 xl:pb-20">
        <div>
          <span className="font-data-mono text-xs uppercase tracking-[0.2em] text-primary">
            Flagship Feature
          </span>
          <h3 className="font-display-lg mt-2">Opportunity Discovery Engine</h3>
          <p className="mt-2 max-w-2xl text-on-surface-variant">
            Discover emerging
            creators, events, communities, topics, and cultural moments.
          </p>
        </div>

        <WorkflowProgress />
        <SectionIntelligence section="opportunities" />

        <section>
          <div className="mb-8 grid grid-cols-12 gap-6">
            <GlassCard className="col-span-12 p-5 md:p-8 lg:col-span-8">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <h4 className="font-headline-md italic text-on-surface">
                  Underserved Audiences
                </h4>
                <button className="font-data-mono text-xs uppercase tracking-wider text-primary hover:underline">
                  Expand Matrix
                </button>
              </div>
              <div className="space-y-4">
                {UNDERSERVED_AUDIENCES.map((audience) => (
                  <div
                    key={audience.id}
                    className="group flex flex-col gap-4 rounded-lg border border-transparent bg-surface-container/50 p-4 transition-all hover:border-outline-variant hover:bg-surface-container xl:flex-row xl:items-center xl:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-container/20">
                        <span className="material-symbols-outlined text-primary">
                          {audience.icon}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-body-lg font-bold">{audience.name}</p>
                        <p className="text-sm text-on-surface-variant">
                          {audience.detail}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 xl:gap-8">
                      <ScoreBadge type="opportunity" value={audience.opportunity} label="Opp. Score" />
                      <div className="text-right">
                        <p className="font-data-mono text-[10px] uppercase text-on-surface-variant">
                          Confidence
                        </p>
                        <p className="font-bold text-success-emerald">
                          {audience.confidence}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant transition-colors group-hover:text-primary">
                        chevron_right
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="col-span-12 bg-gradient-to-br from-surface-container to-surface p-5 md:p-8 lg:col-span-4">
              <h4 className="mb-6 font-headline-md italic text-on-surface">
                Undersaturated Trends
              </h4>
              <div className="space-y-6">
                {UNDERSATURATED_TRENDS.map((trend) => (
                  <div
                    key={trend.id}
                    className="border-l-2 border-outline-variant pl-4 transition-colors hover:border-primary"
                  >
                    <p className="mb-1 font-data-mono text-xs text-primary">
                      {trend.signal}
                    </p>
                    <p className="mb-2 text-lg font-bold leading-tight">{trend.name}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-secondary-container/30 px-2 py-0.5 text-xs text-on-secondary-container">
                        Growth: {trend.growth}
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        Saturation: {trend.saturation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        <section>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <h3 className="font-headline-md italic">Discovery Grid</h3>
            <div className="flex gap-4">
              <button className="rounded-full border border-outline-variant bg-surface-container-high px-4 py-2 text-xs font-bold">
                Creators
              </button>
              <button className="rounded-full border border-transparent px-4 py-2 text-xs font-bold text-on-surface-variant hover:border-outline-variant">
                Events
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:gap-8">
            {DISCOVERY_ITEMS.map((item) => (
              <GlassCard key={item.id} className="overflow-hidden">
                <div className="relative h-48 overflow-hidden bg-surface-container-high">
                  {"image" in item && item.image ? (
                    <SafeImage
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <span className="material-symbols-outlined absolute inset-0 m-auto flex h-fit w-fit text-6xl text-primary/30">
                      {item.type === "event" ? "event" : "person"}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <h5 className="text-lg font-bold">{item.name}</h5>
                      <p className="font-data-mono text-xs text-primary">{item.handle}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    <div className="rounded border border-outline-variant/50 bg-surface-container-low p-2 text-center">
                      <p className="font-data-mono text-[10px] uppercase text-on-surface-variant">
                        Opp.
                      </p>
                      <p className="font-bold text-primary">{item.opportunity}</p>
                    </div>
                    <div className="rounded border border-outline-variant/50 bg-surface-container-low p-2 text-center">
                      <p className="font-data-mono text-[10px] uppercase text-on-surface-variant">
                        Growth
                      </p>
                      <p className="font-bold">{item.growth}</p>
                    </div>
                    <div className="rounded border border-outline-variant/50 bg-surface-container-low p-2 text-center">
                      <p className="font-data-mono text-[10px] uppercase text-on-surface-variant">
                        Conf.
                      </p>
                      <p className="font-bold text-success-emerald">{item.confidence}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
