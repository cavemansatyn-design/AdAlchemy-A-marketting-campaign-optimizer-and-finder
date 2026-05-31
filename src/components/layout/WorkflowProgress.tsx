"use client";

import Link from "next/link";
import { WORKFLOW_STAGES } from "@/lib/types/workflow";
import { useWorkflow } from "@/context/WorkflowContext";
import { cn } from "@/lib/utils";

/** First 7 stages — discovery workflow strip */
const DISCOVERY_STAGES = WORKFLOW_STAGES.slice(0, 7);

export function WorkflowProgress() {
  const { project, isStageComplete, goToStage } = useWorkflow();
  const currentStage = project.currentStage;
  const currentIndex = DISCOVERY_STAGES.findIndex((s) => s.id === currentStage);
  const progressPct =
    currentIndex >= 0
      ? Math.round(((currentIndex + 1) / DISCOVERY_STAGES.length) * 100)
      : project.brief
        ? 14
        : 0;

  return (
    <div className="mb-8 space-y-3">
      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-max items-center gap-1.5">
          {DISCOVERY_STAGES.map((stage, index) => {
            const complete = isStageComplete(stage.id);
            const current = stage.id === currentStage;
            const upcoming = index > currentIndex && !complete;

            return (
              <div key={stage.id} className="flex items-center">
                <Link
                  href={stage.path}
                  onClick={() => goToStage(stage.id)}
                  className={cn(
                    "flex min-h-9 items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-wide transition-all",
                    current && "bg-primary/15 text-primary ring-1 ring-primary/30",
                    complete && !current && "text-success-emerald",
                    upcoming && !complete && "text-on-surface-variant/50"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px]",
                      current && "bg-primary text-on-primary",
                      complete && !current && "bg-success-emerald/20 text-success-emerald",
                      upcoming && !complete && "bg-surface-container-high text-on-surface-variant"
                    )}
                  >
                    {complete && !current ? (
                      <span className="material-symbols-outlined text-[12px]">done</span>
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span>{stage.label}</span>
                </Link>
                {index < DISCOVERY_STAGES.length - 1 && (
                  <div
                    className={cn(
                      "mx-0.5 hidden h-px w-2 shrink-0 sm:block md:w-3",
                      complete ? "bg-success-emerald/40" : "bg-outline-variant/40"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-high">
        <div
          className="h-full rounded-full bg-primary/70 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      {project.brief && (
        <p className="font-data-mono text-[10px] text-on-surface-variant">
          Brief: {project.brief.brand} · {project.brief.budget} · {project.brief.audience}
        </p>
      )}
    </div>
  );
}
