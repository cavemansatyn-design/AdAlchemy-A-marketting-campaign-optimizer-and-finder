"use client";

import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { WorkflowProgress } from "@/components/layout/WorkflowProgress";
import { GlassCard } from "@/components/ui/GlassCard";
import { ReasoningBadge } from "@/components/ui/ReasoningBadge";
import { useWorkflow } from "@/context/WorkflowContext";
import type { CampaignOutput } from "@/lib/intelligence/schemas";
import type { ReasoningMeta } from "@/lib/intelligence/model";

const FALLBACK_CAMPAIGN: CampaignOutput = {
  concept: "Move Together — Tier-2 Fitness Revolution",
  tagline: "Your city. Your pace. Your movement.",
  hooks: [
    "What if your morning run started a movement?",
    "Premium performance shouldn't need a metro passport.",
    "3 creators. 3 cities. 1 movement.",
  ],
  kpis: ["Reach: 4.5M", "Engagement Rate: 6.8%", "Brand Recall: +22%", "CPA: ₹42"],
  timeline: [
    { week: "Week 1-2", action: "Creator outreach & content briefing" },
    { week: "Week 3-4", action: "Teaser campaign across Reels & YouTube" },
    { week: "Week 5-6", action: "Marathon sponsorship activation" },
    { week: "Week 7-8", action: "Community challenge & UGC push" },
  ],
};

export default function GeneratorPage() {
  const { project } = useWorkflow();
  const [campaign, setCampaign] = useState<CampaignOutput>(FALLBACK_CAMPAIGN);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<ReasoningMeta | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);

  useEffect(() => {
    if (!project.brief || !project.brandDNA) return;

    async function generate() {
      setLoading(true);
      try {
        const res = await fetch("/api/reasoning/campaign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brief: project.brief,
            brandDNA: project.brandDNA,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setCampaign(data.campaign);
          setMeta(data.meta);
          setConfidence(data.confidence);
        }
      } finally {
        setLoading(false);
      }
    }

    generate();
  }, [project.brief, project.brandDNA]);

  return (
    <>
      <AppHeader title="Campaign Generator" />
      <div className="space-y-10 px-4 py-6 md:p-8 xl:space-y-12 xl:p-12">
        <div>
          <span className="font-data-mono text-xs uppercase tracking-[0.2em] text-primary">
            AdAlchemy Intelligence · campaign strategy
          </span>
          <h3 className="font-display-lg mt-2">Campaign Generator</h3>
          <p className="mt-2 text-on-surface-variant">
            Concepts, taglines, hooks, KPIs, and timelines — generated from your
            brief and brand DNA via AdAlchemy Intelligence.
          </p>
        </div>
        <WorkflowProgress />

        {meta && confidence !== null && (
          <ReasoningBadge confidence={confidence} meta={meta} />
        )}

        {loading && (
          <p className="font-data-mono text-sm text-primary">
            Generating campaign via AdAlchemy Intelligence...
          </p>
        )}

        <GlassCard className="p-5 md:p-8">
          <p className="font-data-mono text-[10px] uppercase text-on-surface-variant">
            Generated for {project.brief?.brand ?? "your brand"}
          </p>
          <h4 className="mt-2 font-headline-md text-2xl leading-tight md:text-3xl">{campaign.concept}</h4>
          <p className="mt-4 text-xl italic text-primary">
            &ldquo;{campaign.tagline}&rdquo;
          </p>
        </GlassCard>

        <div className="grid grid-cols-12 gap-6 xl:gap-8">
          <GlassCard className="col-span-12 p-5 md:p-8 lg:col-span-6">
            <h4 className="font-headline-md mb-6 italic">Hooks</h4>
            <ul className="space-y-4">
              {campaign.hooks.map((hook) => (
                <li key={hook} className="border-l-2 border-primary pl-4 text-on-surface-variant">
                  {hook}
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="col-span-12 p-5 md:p-8 lg:col-span-6">
            <h4 className="font-headline-md mb-6 italic">KPIs</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {campaign.kpis.map((kpi) => (
                <div
                  key={kpi}
                  className="rounded-lg bg-surface-container-low p-4 font-data-mono text-sm"
                >
                  {kpi}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="col-span-12 p-5 md:p-8">
            <h4 className="font-headline-md mb-6 italic">Launch Timeline</h4>
            <div className="space-y-4">
              {campaign.timeline.map((item) => (
                <div
                  key={item.week}
                  className="flex flex-col gap-2 rounded-lg bg-surface-container/50 p-4 md:flex-row md:items-center md:gap-6"
                >
                  <span className="shrink-0 font-data-mono text-xs text-primary md:w-24">
                    {item.week}
                  </span>
                  <span>{item.action}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <button className="rounded-lg bg-primary px-8 py-3 font-label-sm font-bold uppercase text-on-primary hover:brightness-110">
          Export Campaign Package
        </button>
      </div>
    </>
  );
}
