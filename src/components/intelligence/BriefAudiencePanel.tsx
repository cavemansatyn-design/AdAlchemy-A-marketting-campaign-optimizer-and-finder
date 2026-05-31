"use client";

import { useMemo } from "react";
import { useWorkflow } from "@/context/WorkflowContext";
import { getBriefFilteredCatalog } from "@/lib/data/brief-filter";
import { GlassCard } from "@/components/ui/GlassCard";

export function BriefAudiencePanel() {
  const { project } = useWorkflow();
  const catalog = useMemo(
    () => getBriefFilteredCatalog(project.brief),
    [project.brief]
  );

  return (
    <div className="grid grid-cols-12 gap-6 xl:gap-8">
      {project.brief && (
        <GlassCard className="col-span-12 border border-primary/20 bg-primary/5 p-5">
          <p className="font-data-mono text-[10px] uppercase text-primary">Brief-aligned audience</p>
          <p className="mt-2 font-bold">{catalog.audience.headline}</p>
        </GlassCard>
      )}
      <GlassCard className="col-span-12 p-5 md:p-8 lg:col-span-6">
        <h4 className="font-headline-md mb-6 italic">Interests & Behaviors</h4>
        <div className="flex flex-wrap gap-2">
          {catalog.audience.interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-outline-variant bg-surface-container-high px-3 py-1.5 text-xs font-bold"
            >
              {interest}
            </span>
          ))}
        </div>
        <h5 className="mb-3 mt-8 font-label-sm uppercase text-on-surface-variant">Themes</h5>
        <ul className="space-y-2">
          {catalog.audience.themes.map((theme) => (
            <li key={theme} className="flex items-center gap-2 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {theme}
            </li>
          ))}
        </ul>
      </GlassCard>
      <GlassCard className="col-span-12 p-5 md:p-8 lg:col-span-6">
        <h4 className="font-headline-md mb-6 italic">Popular Platforms</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {catalog.audience.platforms.map((platform) => (
            <div
              key={platform.name}
              className="rounded-xl border border-outline-variant/50 bg-surface-container-low p-4"
            >
              <p className="font-bold">{platform.name}</p>
              <p className="mt-2 font-data-mono text-xs text-primary">Match {platform.match}</p>
              <p className="mt-2 text-xs text-on-surface-variant">{platform.role}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
