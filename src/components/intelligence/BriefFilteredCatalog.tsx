"use client";

import { useMemo } from "react";
import { useWorkflow } from "@/context/WorkflowContext";
import { getBriefFilteredCatalog } from "@/lib/data/brief-filter";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { SafeImage } from "@/components/ui/SafeImage";
import { DataChip } from "@/components/ui/DataChip";

export function FilteredCreatorsGrid() {
  const { project } = useWorkflow();
  const { creators } = useMemo(
    () => getBriefFilteredCatalog(project.brief),
    [project.brief]
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {creators.slice(0, 9).map((creator, index) => (
        <GlassCard key={creator.name} className="overflow-hidden">
          {index === 0 && project.brief && (
            <div className="bg-primary/10 px-4 py-2 font-data-mono text-[10px] uppercase text-primary">
              Top match for {project.brief.brand}
            </div>
          )}
          <SafeImage
            src={creator.image}
            alt={creator.name}
            className="h-56 w-full bg-surface-container-low object-cover object-top"
          />
          <div className="p-5">
            <p className="font-data-mono text-[10px] uppercase text-primary">{creator.handle}</p>
            <h4 className="mt-2 font-headline-md text-lg">{creator.name}</h4>
            {"platforms" in creator && creator.platforms && (
              <div className="mt-2 flex flex-wrap gap-1">
                {(creator.platforms as string[]).map((p) => (
                  <span key={p} className="rounded bg-surface-container-high px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                    {p}
                  </span>
                ))}
              </div>
            )}
            <p className="mt-2 text-sm text-on-surface-variant">{creator.niche}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <Meta label="Followers" value={creator.followers} />
              <Meta label="Cost" value={creator.cost} />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2">
              {creator.scores.map((s) => (
                <ScoreBadge key={s.label} type={s.type} value={s.value} label={s.label} size="sm" />
              ))}
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

export function FilteredCelebritiesGrid() {
  const { project } = useWorkflow();
  const { celebrities } = useMemo(
    () => getBriefFilteredCatalog(project.brief),
    [project.brief]
  );

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {celebrities.slice(0, 8).map((celeb, index) => (
        <GlassCard key={celeb.name} className="overflow-hidden">
          {index === 0 && project.brief && (
            <div className="bg-primary/10 px-4 py-2 font-data-mono text-[10px] uppercase text-primary">
              Best brand fit for {project.brief.brand}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr]">
            <SafeImage
              src={celeb.image}
              alt={celeb.name}
              className="h-44 w-full bg-surface-container-low object-cover object-top sm:h-full sm:min-h-[180px]"
            />
            <div className="p-5">
              <h4 className="font-headline-md text-xl">{celeb.name}</h4>
              <p className="mt-2 text-sm text-on-surface-variant">{celeb.narrative}</p>
              <span className="mt-3 inline-block rounded bg-surface-container-high px-3 py-1 font-data-mono text-xs">
                {celeb.cost}
              </span>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <ScoreBadge type="attention" value={celeb.popularity} label="Popularity" size="sm" />
                <ScoreBadge type="momentum" value={celeb.momentum} label="Momentum" size="sm" />
                <ScoreBadge type="brandFit" value={celeb.brandFit} label="Brand Fit" size="sm" />
                <ScoreBadge type="risk" value={celeb.risk} label="Risk" size="sm" />
              </div>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

export function FilteredTrendsList() {
  const { project } = useWorkflow();
  const { trends } = useMemo(
    () => getBriefFilteredCatalog(project.brief),
    [project.brief]
  );

  return (
    <div className="space-y-4">
      {trends.map((trend, index) => (
        <GlassCard key={trend.name} className="flex flex-col gap-5 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8 md:py-6">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h4 className="text-lg font-bold">{trend.name}</h4>
              <DataChip variant="gold">{trend.lifecycle}</DataChip>
              {index === 0 && project.brief && (
                <span className="text-[10px] font-bold uppercase text-primary">
                  · {project.brief.brand} priority
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-on-surface-variant">{trend.region}</p>
          </div>
          <div className="flex gap-8">
            <div className="text-right">
              <p className="font-data-mono text-[10px] uppercase text-on-surface-variant">Growth</p>
              <p className="font-data-mono text-success-emerald">{trend.growth}</p>
            </div>
            <div className="text-right">
              <p className="font-data-mono text-[10px] uppercase text-on-surface-variant">Score</p>
              <p className="font-data-mono text-primary">{trend.score}</p>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

export function FilteredEventsGrid() {
  const { project } = useWorkflow();
  const { events } = useMemo(
    () => getBriefFilteredCatalog(project.brief),
    [project.brief]
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {events.slice(0, 8).map((event, index) => (
        <GlassCard key={event.name} className="overflow-hidden">
          {index === 0 && project.brief && (
            <div className="bg-primary/10 px-4 py-2 font-data-mono text-[10px] uppercase text-primary">
              Recommended for {project.brief.budget}
            </div>
          )}
          <SafeImage src={event.image} alt={event.name} className="h-40 w-full object-cover" />
          <div className="p-5">
            <h4 className="font-headline-md text-lg">{event.name}</h4>
            <p className="mt-1 text-sm text-on-surface-variant">{event.location}</p>
            <p className="mt-3 text-sm text-on-surface-variant">{event.audience}</p>
            <div className="mt-4 flex flex-wrap gap-4 font-data-mono text-xs">
              <span>Reach {event.reach}</span>
              <span className="text-primary">{event.cost}</span>
              <span className="text-success-emerald">Fit {event.brandFit}</span>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-outline-variant/50 bg-surface-container-low p-2">
      <p className="font-data-mono text-[9px] uppercase text-on-surface-variant">{label}</p>
      <p className="mt-1 text-xs font-bold">{value}</p>
    </div>
  );
}
