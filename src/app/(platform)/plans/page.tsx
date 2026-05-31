import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { MONETIZATION_PLANS } from "@/lib/data/india-2026";

export default function PlansPage() {
  return (
    <>
      <AppHeader title="Plans & Pricing" showExecute={false} />
      <div className="space-y-10 px-4 py-6 md:p-8 xl:space-y-12 xl:p-12">
        <div className="max-w-3xl">
          <span className="font-data-mono text-xs uppercase tracking-[0.2em] text-primary">
            Monetization after scoping
          </span>
          <h3 className="font-display-lg mt-2">Discovery is free. Strategy is paid.</h3>
          <p className="mt-3 text-on-surface-variant leading-7">
            Scoping creators, celebrities, events, trends, and sponsorship routes for
            India 2026 is always free inside the platform. When you are ready to convert
            intelligence into executable strategy, choose a paid tier below — no artificial
            limits on discovery or hook exploration during scoping.
          </p>
        </div>

        <GlassCard className="border border-success-emerald/20 bg-success-emerald/5 p-6">
          <p className="font-data-mono text-[10px] uppercase text-success-emerald">
            Always free — no restrictions
          </p>
          <h4 className="mt-2 font-headline-md text-xl">Scoping & Intelligence</h4>
          <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-on-surface-variant md:grid-cols-2">
            {[
              "Audience intelligence & platform fit",
              "Trend radar & culture signals",
              "Creator discovery (multi-platform)",
              "Celebrity brand-fit scoring",
              "Event sponsorship shortlists",
              "Opportunity engine & budget fit",
              "15+ demo briefs with live API reasoning",
              "Confidence scoring on every analysis",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="material-symbols-outlined text-[16px] text-success-emerald">
                  check
                </span>
                {item}
              </li>
            ))}
          </ul>
        </GlassCard>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {MONETIZATION_PLANS.map((plan, index) => (
            <GlassCard
              key={plan.name}
              className={`flex flex-col p-6 md:p-8 ${
                index === 1 ? "gradient-stroke ring-1 ring-primary/20" : ""
              }`}
            >
              {index === 1 && (
                <span className="font-data-mono text-[10px] uppercase text-primary">
                  Most popular
                </span>
              )}
              <h4 className="mt-2 font-headline-md text-2xl">{plan.name}</h4>
              <p className="mt-1 font-data-mono text-lg text-primary">{plan.price}</p>
              {"tagline" in plan && plan.tagline && (
                <p className="mt-2 text-sm font-bold text-on-surface">{plan.tagline}</p>
              )}
              <p className="mt-2 text-sm text-on-surface-variant">{plan.audience}</p>
              {"hooks" in plan && Array.isArray(plan.hooks) && (
                <ul className="mt-4 space-y-2 border-t border-outline-variant/30 pt-4">
                  {plan.hooks.map((hook: string) => (
                    <li key={hook} className="text-xs italic text-primary/90">
                      “{hook}”
                    </li>
                  ))}
                </ul>
              )}
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      check_circle
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              {"deliverables" in plan && Array.isArray(plan.deliverables) && (
                <div className="mt-4 rounded-lg bg-surface-container-low p-3">
                  <p className="font-data-mono text-[9px] uppercase text-on-surface-variant">
                    Deliverables
                  </p>
                  <p className="mt-1 text-xs text-on-surface-variant">
                    {plan.deliverables.join(" · ")}
                  </p>
                </div>
              )}
              <Link
                href="/campaign-planner"
                className="mt-8 block rounded-lg bg-primary py-3 text-center font-label-sm font-bold uppercase text-on-primary hover:brightness-110"
              >
                {"cta" in plan && plan.cta ? plan.cta : "Start with brief"}
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </>
  );
}
