"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAuth } from "@/context/AuthContext";
import { useWorkflow } from "@/context/WorkflowContext";
import { PROJECT_LIST_META, getSeedProject } from "@/lib/data/projects-seed";

export default function ProjectsPage() {
  const { isAuthenticated } = useAuth();
  const { loadProject } = useWorkflow();
  const router = useRouter();

  const openProject = (id: string) => {
    const seed = getSeedProject(id);
    if (!seed) return;
    loadProject(seed);
    if (id === "nike-ipl") {
      router.push("/opportunities");
    } else if (seed.currentStage === "campaign") {
      router.push("/generator");
    } else {
      router.push("/audience");
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <AppHeader title="Projects" showExecute={false} />
        <div className="flex flex-col items-center justify-center gap-6 px-4 py-24 text-center">
          <p className="max-w-md text-on-surface-variant">
            Sign in to view saved agency campaigns and intelligence workflows.
          </p>
          <Link
            href="/login"
            className="rounded-lg bg-primary px-8 py-3 font-label-sm font-bold uppercase text-on-primary"
          >
            Sign in (123 / 123)
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <AppHeader title="Projects" showExecute={false} />
      <div className="space-y-8 px-4 py-6 md:p-8 xl:p-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="font-display-lg">Projects</h3>
            <p className="mt-2 text-on-surface-variant">
              All active agency campaigns and intelligence workflows.
            </p>
          </div>
          <Link
            href="/campaign-planner"
            className="rounded-lg bg-primary px-6 py-3 font-label-sm font-bold uppercase text-on-primary"
          >
            New Project
          </Link>
        </div>
        <div className="space-y-4">
          {PROJECT_LIST_META.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => openProject(project.id)}
              className="w-full text-left"
            >
              <GlassCard className="flex flex-col gap-4 px-5 py-5 transition-colors hover:border-primary/40 md:flex-row md:items-center md:justify-between md:px-8 md:py-6">
                <div className="min-w-0">
                  <h4 className="text-lg font-bold">{project.name}</h4>
                  <p className="text-sm text-on-surface-variant">{project.client}</p>
                  {project.budget && (
                    <p className="mt-1 font-data-mono text-xs text-primary">
                      {project.budget} · Confidence {project.confidence}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 md:gap-8">
                  <span className="font-data-mono text-xs text-primary">{project.stage}</span>
                  <span className="text-xs text-on-surface-variant">{project.updated}</span>
                  <span className="material-symbols-outlined text-on-surface-variant">
                    chevron_right
                  </span>
                </div>
              </GlassCard>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
