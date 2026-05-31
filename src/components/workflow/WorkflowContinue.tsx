"use client";

import { useRouter } from "next/navigation";
import { WORKFLOW_STAGES, type WorkflowStage } from "@/lib/types/workflow";
import { useWorkflow } from "@/context/WorkflowContext";

interface WorkflowContinueProps {
  /** Current workflow stage for this page */
  from: WorkflowStage;
  className?: string;
}

export function WorkflowContinue({ from, className }: WorkflowContinueProps) {
  const router = useRouter();
  const { completeStage, goToStage, project } = useWorkflow();

  const index = WORKFLOW_STAGES.findIndex((s) => s.id === from);
  const next = WORKFLOW_STAGES[index + 1];

  if (!next || !project.brief) return null;

  const label = next.label.replace(" Discovery", "").replace(" Intelligence", "");

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-4 rounded-xl border border-primary/25 bg-primary/5 p-5 ${className ?? ""}`}
    >
      <div>
        <p className="font-data-mono text-[10px] uppercase text-primary">
          Next in workflow
        </p>
        <p className="mt-1 text-sm text-on-surface-variant">
          Intelligence for <strong>{project.brief.brand}</strong> continues to{" "}
          {next.label.toLowerCase()}.
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          completeStage(from);
          goToStage(next.id);
          router.push(next.path);
        }}
        className="rounded-lg bg-primary px-6 py-3 font-label-sm font-bold uppercase text-on-primary hover:brightness-110"
      >
        Continue to {label} →
      </button>
    </div>
  );
}
