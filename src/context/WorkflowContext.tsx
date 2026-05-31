"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CampaignIntelligence } from "@/lib/types/campaign-intelligence";
import type { BudgetScenario } from "@/lib/intelligence/schemas";
import type {
  BrandDNA,
  ClientBrief,
  WorkflowProject,
  WorkflowStage,
} from "@/lib/types/workflow";

interface WorkflowContextValue {
  project: WorkflowProject;
  setAnalysisResult: (payload: {
    brief: ClientBrief;
    brandDNA: BrandDNA;
    budgetScenarios: BudgetScenario[];
  }) => void;
  setIntelligence: (intelligence: CampaignIntelligence | null) => void;
  setPipelineStatus: (status: WorkflowProject["pipelineStatus"]) => void;
  goToStage: (stage: WorkflowStage) => void;
  completeStage: (stage: WorkflowStage) => void;
  isStageComplete: (stage: WorkflowStage) => boolean;
  resetProject: () => void;
  loadProject: (project: WorkflowProject) => void;
}

const defaultProject: WorkflowProject = {
  id: "default",
  name: "Untitled Campaign",
  brief: null,
  brandDNA: null,
  budgetScenarios: [],
  intelligence: null,
  pipelineStatus: "idle",
  currentStage: "brief",
  completedStages: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const WorkflowContext = createContext<WorkflowContextValue | null>(null);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<WorkflowProject>(defaultProject);

  const setAnalysisResult = useCallback(
    (payload: {
      brief: ClientBrief;
      brandDNA: BrandDNA;
      budgetScenarios: BudgetScenario[];
    }) => {
      setProject((prev) => ({
        ...prev,
        brief: payload.brief,
        brandDNA: payload.brandDNA,
        budgetScenarios: payload.budgetScenarios,
        name: payload.brief.brand || prev.name,
        currentStage: "brand-dna" as const,
        completedStages: ["brief" as WorkflowStage],
        pipelineStatus: "loading" as const,
        updatedAt: new Date().toISOString(),
      }));
    },
    []
  );

  const setIntelligence = useCallback((intelligence: CampaignIntelligence | null) => {
    setProject((prev) => ({
      ...prev,
      intelligence,
      pipelineStatus: intelligence ? ("ready" as const) : prev.pipelineStatus,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const setPipelineStatus = useCallback((pipelineStatus: WorkflowProject["pipelineStatus"]) => {
    setProject((prev) => ({
      ...prev,
      pipelineStatus,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  /** Navigate only — does NOT mark stages complete. */
  const goToStage = useCallback((stage: WorkflowStage) => {
    setProject((prev) => ({
      ...prev,
      currentStage: stage,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  /** Explicitly mark a stage finished (user action). */
  const completeStage = useCallback((stage: WorkflowStage) => {
    setProject((prev) => ({
      ...prev,
      completedStages: [...new Set([...prev.completedStages, stage])],
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const isStageComplete = useCallback(
    (stage: WorkflowStage) => project.completedStages.includes(stage),
    [project.completedStages]
  );

  const resetProject = useCallback(() => {
    setProject({
      ...defaultProject,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }, []);

  const loadProject = useCallback((loaded: WorkflowProject) => {
    setProject({
      ...loaded,
      updatedAt: new Date().toISOString(),
    });
  }, []);

  const value = useMemo(
    () => ({
      project,
      setAnalysisResult,
      setIntelligence,
      setPipelineStatus,
      goToStage,
      completeStage,
      isStageComplete,
      resetProject,
      loadProject,
    }),
    [
      project,
      setAnalysisResult,
      setIntelligence,
      setPipelineStatus,
      goToStage,
      completeStage,
      isStageComplete,
      resetProject,
      loadProject,
    ]
  );

  return (
    <WorkflowContext.Provider value={value}>{children}</WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const ctx = useContext(WorkflowContext);
  if (!ctx) {
    throw new Error("useWorkflow must be used within WorkflowProvider");
  }
  return ctx;
}
