"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { DataChip, PulseIndicator } from "@/components/ui/DataChip";
import { ScoreRing } from "@/components/ui/ScoreBadge";
import { useWorkflow } from "@/context/WorkflowContext";
import type { DashboardSnapshot } from "@/lib/intelligence/dashboard";
import { PLATFORM_STATS } from "@/lib/data/india-2026";
import {
  ATTENTION_PULSE,
  EMERGING_NODES,
  OPPORTUNITY_FEED,
  RECOMMENDED_OPPORTUNITIES,
} from "@/lib/data/mock-dashboard";

const PRODUCT_STEPS = [
  { title: "Brief", copy: "Brand, audience, budget, geography, and goal.", icon: "edit_note" },
  { title: "Intelligence", copy: "Trends, creators, celebrities, and events ranked for India 2026.", icon: "query_stats" },
  { title: "Action Plan", copy: "Campaign ideas, budget allocation, and exportable reports.", icon: "task_alt" },
];

const FALLBACK: DashboardSnapshot = {
  feed: OPPORTUNITY_FEED,
  attentionPulse: ATTENTION_PULSE,
  topOpportunity: RECOMMENDED_OPPORTUNITIES[0],
  emergingNodes: EMERGING_NODES,
  metrics: { campaignPotential: "92", projectedReach: "48M", partnerShortlist: "18" },
  hero: {
    headline: "Sponsor the moment before competitors price it in.",
    subline: "Women's cricket x fitness communities aligning for India 2026.",
    fitScore: 94,
    liveSourceCount: 0,
  },
  fromCache: false,
};

export function DashboardView() {
  const { project } = useWorkflow();
  const [data, setData] = useState<DashboardSnapshot>(FALLBACK);
  const [loading, setLoading] = useState(true);
  const hasBrief = Boolean(project.brief);
  const briefConfidence = project.intelligence?.meta
    ? Math.min(88 + (project.intelligence.discoverySources?.length ?? 0) * 2, 97)
    : data.hero.fitScore;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/intelligence/dashboard");
        if (res.ok && !cancelled) {
          setData(await res.json());
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <AppHeader title="Intelligence Dashboard" />
      <div className="mx-auto w-full max-w-[1600px] space-y-12 px-4 py-6 md:p-8 xl:space-y-14 xl:p-12">
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12 xl:gap-8">
          <GlassCard className="overflow-hidden p-0 xl:col-span-8">
            <div className="flex flex-col lg:flex-row">
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-8 p-6 md:p-8 xl:p-10">
                <div>
                  <DataChip variant="gold">India 2026 · Cultural intelligence</DataChip>
                  <h1 className="mt-5 max-w-3xl font-display-lg text-on-surface">
                    Find trends, partners, and sponsorship routes worth acting on.
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-on-surface-variant">
                    Live Anakin discovery feeds Groq or ChatGPT once — cached to
                    protect credits — then powers every intelligence module.
                  </p>
                  {data.hero.liveSourceCount > 0 && (
                    <p
                      className={`mt-3 font-data-mono text-xs ${
                        hasBrief ? "text-success-emerald" : "text-on-surface-variant"
                      }`}
                    >
                      {hasBrief
                        ? `${data.hero.liveSourceCount} live sources aligned to your brief`
                        : `${data.hero.liveSourceCount} market sources preloaded — run a brief for campaign-specific confidence`}
                      {data.fromCache ? " · cached" : ""}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <Metric label="Campaign potential" value={data.metrics.campaignPotential} detail="Confidence-weighted" />
                  <Metric label="Projected reach" value={data.metrics.projectedReach} detail="Priority channels" />
                  <Metric label="Partner shortlist" value={data.metrics.partnerShortlist} detail="Creators & events" />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/campaign-planner" className="rounded-lg bg-primary px-6 py-3 font-label-sm font-bold uppercase text-on-primary hover:brightness-110">
                    Start New Brief
                  </Link>
                  <Link href="/opportunities" className="rounded-lg border border-outline-variant px-6 py-3 font-label-sm font-bold uppercase text-primary hover:bg-surface-container">
                    View Opportunities
                  </Link>
                </div>
              </div>

              <div className="flex min-w-0 flex-col justify-center border-t border-outline-variant/50 bg-surface-container-low/40 p-6 lg:w-[min(100%,380px)] lg:border-l lg:border-t-0 lg:p-8">
                <p className="font-data-mono text-[10px] uppercase text-primary">Recommended play</p>
                <h2 className="mt-3 font-headline-md text-xl leading-snug text-on-surface">
                  {loading ? "Loading signals…" : data.hero.headline}
                </h2>
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                  {data.hero.subline}
                </p>
                <div className="mt-6 flex items-center gap-6">
                  <ScoreRing value={hasBrief ? briefConfidence : data.hero.fitScore} size={72} />
                  <div className="grid flex-1 grid-cols-3 gap-2 text-center">
                    <MiniSignal label="Creators" value={String(PLATFORM_STATS.creatorCount)} />
                    <MiniSignal label="Events" value={String(PLATFORM_STATS.eventCount)} />
                    <MiniSignal label="Hooks" value={String(PLATFORM_STATS.hookBankSize)} />
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5 md:p-6 xl:col-span-4">
            <p className="font-data-mono text-[10px] uppercase text-primary">How it works</p>
            <h2 className="mt-2 font-headline-md text-2xl">One brief → full campaign system</h2>
            <div className="mt-6 space-y-4">
              {PRODUCT_STEPS.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-high text-primary">
                    <span className="material-symbols-outlined text-[22px]">{step.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold">{index + 1}. {step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-on-surface-variant">{step.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="font-headline-md">Live Opportunity Snapshot</h3>
              <p className="text-on-surface-variant">Attention and momentum across India 2026 signals.</p>
            </div>
            <DataChip variant="live">{loading ? "Syncing" : "Market signals"}</DataChip>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {data.attentionPulse.map((item) => (
              <GlassCard key={item.id} className="p-4">
                <p className="font-data-mono text-[10px] uppercase text-primary">{item.category}</p>
                <p className="mt-1 font-bold">{item.name}</p>
                <p className="mt-3 font-data-mono text-primary">+{item.change}%</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12 xl:gap-8">
          <GlassCard className="flex flex-col justify-between gap-8 p-5 md:p-8 xl:col-span-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <DataChip variant="gold">Best next move</DataChip>
                <h3 className="mt-4 font-headline-md text-2xl">{data.topOpportunity.title}</h3>
                <p className="mt-2 max-w-xl text-on-surface-variant">{data.topOpportunity.description}</p>
              </div>
              <div className="shrink-0 self-start">
                <ScoreRing value={data.topOpportunity.fitScore} size={88} />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/generator" className="rounded-lg bg-primary px-8 py-3 font-label-sm font-bold uppercase text-on-primary">
                Build Campaign
              </Link>
              <Link href="/plans" className="rounded-lg border border-outline-variant px-8 py-3 font-label-sm font-bold uppercase hover:bg-surface-container">
                View Plans
              </Link>
            </div>
          </GlassCard>

          <GlassCard className="border-l-4 border-l-tertiary p-5 md:p-8 xl:col-span-4">
            <span className="font-data-mono text-xs uppercase text-tertiary">Sponsorship gap</span>
            <h3 className="mt-2 font-headline-md text-2xl">Regional creator pods</h3>
            <p className="mt-2 text-sm leading-6 text-on-surface-variant">
              Tier-2 fitness creators outperform national celebrity CPMs for Gen Z India launches.
            </p>
            <p className="mt-6 font-data-mono text-lg text-tertiary">+245%</p>
          </GlassCard>
        </section>

        <section className="space-y-4">
          <h3 className="font-headline-md">Recommended Actions</h3>
          {data.feed.map((item) => (
            <GlassCard key={item.id} className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
              <div className="flex min-w-0 items-center gap-4">
                <PulseIndicator label="LIVE" />
                <div className="min-w-0">
                  <p className="font-bold leading-snug">{item.message}</p>
                  <p className="text-xs text-on-surface-variant">{item.category} · {item.timestamp}</p>
                </div>
              </div>
              <span className="shrink-0 font-data-mono text-primary">+{item.momentum}%</span>
            </GlassCard>
          ))}
        </section>
      </div>
    </>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-lg border border-outline-variant/50 bg-surface-container-low p-4">
      <p className="font-data-mono text-[10px] uppercase text-on-surface-variant">{label}</p>
      <p className="mt-1 font-headline-md text-3xl text-primary">{value}</p>
      <p className="mt-1 text-xs text-on-surface-variant">{detail}</p>
    </div>
  );
}

function MiniSignal({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-outline-variant/50 bg-surface-container-low p-2">
      <p className="font-headline-md text-lg text-primary">{value}</p>
      <p className="font-data-mono text-[9px] uppercase text-on-surface-variant">{label}</p>
    </div>
  );
}
