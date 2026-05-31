"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { WorkflowProgress } from "@/components/layout/WorkflowProgress";
import { GlassCard } from "@/components/ui/GlassCard";
import { ReasoningBadge } from "@/components/ui/ReasoningBadge";
import { useWorkflow } from "@/context/WorkflowContext";
import type { ClientBrief } from "@/lib/types/workflow";
import type { BudgetScenario } from "@/lib/intelligence/schemas";
import type { ReasoningMeta } from "@/lib/intelligence/model";
import { getBriefFilteredCatalog } from "@/lib/data/brief-filter";

import { SAMPLE_PROMPTS } from "@/lib/data/sample-prompts";

type ScenarioPartner = {
  name: string;
  role: string;
};

type ScenarioDisplay = {
  label: string;
  partners: ScenarioPartner[];
};

function formatPartnerList(partners: Array<{ name: string }>) {
  return partners.map((partner) => partner.name).join(", ");
}

function getScenarioDisplays(brief: ClientBrief | null): Record<string, ScenarioDisplay> {
  const { creators, celebrities, events } = getBriefFilteredCatalog(brief);
  const creatorPod = creators.slice(0, 3);
  const eventCreatorPod = creators.slice(3, 5);
  const topCelebrity = celebrities[0];
  const topEvent = events[0];

  return {
    a: {
      label: topCelebrity
        ? `${topCelebrity.name} Celebrity Anchor`
        : "Celebrity Anchor",
      partners: topCelebrity
        ? [{ name: topCelebrity.name, role: topCelebrity.cost }]
        : [],
    },
    b: {
      label: creatorPod.length
        ? `${formatPartnerList(creatorPod)} Creator Pod`
        : "Creator Pod",
      partners: creatorPod.map((creator) => ({
        name: creator.name,
        role: creator.cost,
      })),
    },
    c: {
      label: topEvent
        ? `${topEvent.name} + Creator Activation`
        : "Event + Creator Activation",
      partners: [
        ...(topEvent ? [{ name: topEvent.name, role: topEvent.cost }] : []),
        ...eventCreatorPod.map((creator) => ({
          name: creator.name,
          role: creator.cost,
        })),
      ],
    },
  };
}

export default function CampaignPlannerPage() {
  const router = useRouter();
  const { project, setAnalysisResult, setIntelligence, goToStage, completeStage } =
    useWorkflow();
  const [mode, setMode] = useState<"form" | "natural">("natural");
  const [naturalBrief, setNaturalBrief] = useState(
    project.brief?.naturalLanguage ??
      "We are launching a fitness product in India with ₹10 lakh budget targeting Gen Z."
  );
  const [form, setForm] = useState<ClientBrief>({
    brand: project.brief?.brand ?? "",
    industry: project.brief?.industry ?? "",
    audience: project.brief?.audience ?? "",
    region: project.brief?.region ?? "",
    budget: project.brief?.budget ?? "",
    goals: project.brief?.goals ?? "",
    timeline: project.brief?.timeline ?? "",
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDNA, setShowDNA] = useState(!!project.brandDNA);
  const [showBudget, setShowBudget] = useState(false);
  const [budgetScenarios, setBudgetScenarios] = useState<BudgetScenario[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [reasoningMeta, setReasoningMeta] = useState<ReasoningMeta | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const scenarioDisplays = useMemo(
    () => getScenarioDisplays(project.brief),
    [project.brief]
  );

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setError(null);

    try {
      const res = await fetch("/api/reasoning/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "natural"
            ? { naturalLanguage: naturalBrief }
            : { brief: form }
        ),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Analysis failed");
      }

      setAnalysisResult({
        brief: data.brief,
        brandDNA: data.brandDNA,
        budgetScenarios: data.budgetScenarios,
      });
      setIntelligence(data.intelligence ?? null);
      setBudgetScenarios(data.budgetScenarios);
      setSummary(data.summary);
      setReasoningMeta(data.meta);
      setConfidence(data.confidence);
      setShowDNA(true);
      setShowBudget(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <>
      <AppHeader title="Campaign Planner" showExecute={false} />
      <div className="space-y-10 px-4 py-6 md:p-8 xl:space-y-12 xl:p-12">
        <div>
          <span className="font-data-mono text-xs uppercase tracking-[0.2em] text-primary">
            Primary Entry Point
          </span>
          <h3 className="font-display-lg mt-2">Start with the Client Brief</h3>
          <p className="mt-2 max-w-2xl text-on-surface-variant">
            Every module feeds from this brief. AdAlchemy analyzes
            brand DNA, audience fit, and budget scenarios — with web search when
            needed.
          </p>
        </div>

        <WorkflowProgress />

        {reasoningMeta && confidence !== null && (
          <ReasoningBadge confidence={confidence} meta={reasoningMeta} />
        )}

        {error && (
          <div className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
            {error}
          </div>
        )}

        <div className="grid grid-cols-12 gap-6 xl:gap-8">
          <GlassCard className="col-span-12 p-5 md:p-8 lg:col-span-7">
            <div className="mb-6 flex flex-wrap gap-3">
              <button
                onClick={() => setMode("natural")}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase ${
                  mode === "natural"
                    ? "bg-primary text-on-primary"
                    : "border border-outline-variant text-on-surface-variant"
                }`}
              >
                Natural Language
              </button>
              <button
                onClick={() => setMode("form")}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase ${
                  mode === "form"
                    ? "bg-primary text-on-primary"
                    : "border border-outline-variant text-on-surface-variant"
                }`}
              >
                Structured Brief
              </button>
            </div>

            {mode === "natural" ? (
              <textarea
                value={naturalBrief}
                onChange={(e) => setNaturalBrief(e.target.value)}
                rows={5}
                className="w-full rounded-lg border border-outline-variant bg-surface-container-low p-4 font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Describe your campaign brief..."
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {(
                  [
                    ["brand", "Brand"],
                    ["industry", "Industry"],
                    ["audience", "Audience"],
                    ["region", "Region"],
                    ["budget", "Budget"],
                    ["goals", "Goals"],
                    ["timeline", "Timeline"],
                  ] as const
                ).map(([key, label]) => (
                  <div key={key} className={key === "goals" ? "col-span-2" : ""}>
                    <label className="font-label-sm text-on-surface-variant">
                      {label}
                    </label>
                    <input
                      value={form[key]}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, [key]: e.target.value }))
                      }
                      className="mt-1 w-full rounded-lg border border-outline-variant bg-surface-container-low px-4 py-2 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4">
              <p className="font-data-mono text-[10px] uppercase text-on-surface-variant">
                Sample briefs — click to paste
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {SAMPLE_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => {
                      setMode("natural");
                      setNaturalBrief(prompt.text);
                    }}
                    className="rounded-full border border-outline-variant/60 bg-surface-container-high px-3 py-1.5 text-[11px] font-bold text-on-surface-variant hover:border-primary/50 hover:text-primary"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="mt-6 flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-label-sm font-bold uppercase text-on-primary hover:brightness-110 disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[18px]">psychology</span>
              {analyzing ? "Building intelligence..." : "Generate Intelligence"}
            </button>
          </GlassCard>

          <GlassCard className="col-span-12 p-5 md:p-8 lg:col-span-5">
            <h4 className="font-headline-md italic text-on-surface">What you will get</h4>
            <p className="mt-2 text-sm text-on-surface-variant">
              AdAlchemy Intelligence → strategy engine → structured brand DNA, budget
              scenarios, citations, and confidence scoring.
            </p>
            {summary && (
              <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
                {summary}
              </p>
            )}
            {project.brief && (
              <div className="mt-6 space-y-3 border-t border-outline-variant/30 pt-6">
                <p className="font-data-mono text-[10px] uppercase text-primary">
                  Active Brief
                </p>
                <p className="font-bold">{project.brief.brand}</p>
                <p className="text-sm text-on-surface-variant">
                  {project.brief.region} · {project.brief.budget} ·{" "}
                  {project.brief.audience}
                </p>
              </div>
            )}
          </GlassCard>
        </div>

        {showDNA && project.brandDNA && (
          <section className="space-y-6">
            <h3 className="font-headline-md text-on-surface">Brand DNA Engine</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Archetype", value: project.brandDNA.archetype },
                { label: "Personality", value: project.brandDNA.personality },
                { label: "Brand Voice", value: project.brandDNA.brandVoice },
                { label: "Positioning", value: project.brandDNA.positioning },
              ].map((item) => (
                <GlassCard key={item.label} className="p-6">
                  <p className="font-data-mono text-[10px] uppercase text-primary">
                    {item.label}
                  </p>
                  <p className="mt-2 font-bold text-on-surface">{item.value}</p>
                </GlassCard>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.brandDNA.coreThemes.map((theme) => (
                <span
                  key={theme}
                  className="rounded-full border border-outline-variant bg-surface-container-high px-3 py-1 text-xs font-bold"
                >
                  {theme}
                </span>
              ))}
            </div>
            <button
              onClick={() => {
                completeStage("brand-dna");
                goToStage("audience");
                router.push("/audience");
              }}
              className="rounded-lg border border-primary/40 px-6 py-3 font-label-sm font-bold uppercase text-primary hover:bg-primary/10"
            >
              Continue to Audience Intelligence →
            </button>
          </section>
        )}

        {showBudget && (budgetScenarios.length > 0 || project.budgetScenarios.length > 0) && (
          <section className="space-y-6">
            <h3 className="font-headline-md text-on-surface">Budget Optimizer</h3>
            <p className="text-on-surface-variant">
              Given {project.brief?.budget ?? "your budget"}, here are optimized
              allocation scenarios from the reasoning model.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {(budgetScenarios.length > 0 ? budgetScenarios : project.budgetScenarios).map((scenario) => {
                const display = scenarioDisplays[scenario.id.toLowerCase()];

                return (
                  <GlassCard
                    key={scenario.id}
                    className={`p-6 ${scenario.recommended ? "gradient-stroke ring-1 ring-primary/20" : ""}`}
                  >
                    {scenario.recommended && (
                      <span className="font-data-mono text-[10px] uppercase text-primary">
                        Recommended
                      </span>
                    )}
                    <h4 className="mt-2 font-bold">{display?.label ?? scenario.label}</h4>
                    {display?.partners && display.partners.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {display.partners.map((partner) => (
                          <span
                            key={`${scenario.id}-${partner.name}`}
                            className="rounded bg-surface-container-high px-2 py-1 text-[11px] font-bold text-on-surface-variant"
                            title={partner.role}
                          >
                            {partner.name}
                          </span>
                        ))}
                      </div>
                    )}
                    {scenario.rationale && (
                      <p className="mt-2 text-sm text-on-surface-variant">
                        {scenario.rationale}
                      </p>
                    )}
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Expected Reach</span>
                        <span className="font-data-mono text-primary">
                          {scenario.reach}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Engagement</span>
                        <span className="font-data-mono">{scenario.engagement}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Cost Efficiency</span>
                        <span className="font-data-mono text-success-emerald">
                          {scenario.efficiency}
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
