"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { WORKFLOW_STAGES, type WorkflowStage } from "@/lib/types/workflow";
import { useWorkflow } from "@/context/WorkflowContext";

const PATH_TO_STAGE = Object.fromEntries(
  WORKFLOW_STAGES.map((s) => [s.path, s.id])
) as Record<string, WorkflowStage>;

/** Keeps stepper highlight in sync when user navigates workflow pages. */
export function WorkflowStageSync() {
  const pathname = usePathname();
  const { goToStage, project } = useWorkflow();

  useEffect(() => {
    const stage = PATH_TO_STAGE[pathname];
    if (stage && stage !== project.currentStage) {
      goToStage(stage);
    }
  }, [pathname, goToStage, project.currentStage]);

  return null;
}
