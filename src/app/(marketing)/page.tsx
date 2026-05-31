import Link from "next/link";
import { TRUSTED_BRANDS } from "@/lib/data/india-2026";

const FEATURES = [
  {
    icon: "edit_note",
    title: "Client Brief → Brand DNA",
    copy: "Paste a natural-language brief or structured form. We extract brand voice, archetype, positioning, and budget scenarios for India 2026.",
  },
  {
    icon: "groups",
    title: "Audience & Culture Intelligence",
    copy: "Communities, pain points, platform fit, and regional themes — ranked for your category and geography.",
  },
  {
    icon: "person_search",
    title: "Creators, Celebrities & Events",
    copy: "Multi-platform creator discovery, celebrity brand-fit scoring, and sponsorship-ready event shortlists with cost tiers.",
  },
  {
    icon: "radar",
    title: "Opportunity Engine",
    copy: "Confidence-weighted plays before competitors price them in — trends, hooks, and activation routes in one workflow.",
  },
];

const HOW_WE_HELP = [
  {
    step: "01",
    title: "Scope for free",
    body: "Run discovery across trends, creators, celebrities, and events. No paywall on intelligence — only on strategy execution packages.",
  },
  {
    step: "02",
    title: "Reason once, reuse everywhere",
    body: "Anakin discovery + Groq or ChatGPT WIRE reasoning is cached per brief so credits are protected while every module stays in sync.",
  },
  {
    step: "03",
    title: "Convert to paid strategy",
    body: "When you have the right partners scoped, unlock Basic, Pro, or Superplan packages for hooks, timelines, and production support.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.08)_0%,_transparent_55%)]" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div>
          <p className="font-data-mono text-[10px] uppercase tracking-[0.25em] text-primary">
            Commercial AdAlchemy
          </p>
          <p className="mt-1 text-sm text-on-surface-variant">
            Marketing intelligence for India 2026+
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="hidden rounded-lg border border-outline-variant px-4 py-2 text-xs font-bold uppercase text-on-surface-variant hover:bg-surface-container sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/plans"
            className="hidden rounded-lg border border-outline-variant px-4 py-2 text-xs font-bold uppercase text-on-surface-variant hover:bg-surface-container sm:block"
          >
            Plans
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg bg-primary px-5 py-2 text-xs font-bold uppercase text-on-primary hover:brightness-110"
          >
            Enter Platform
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-8 md:pt-16">
        <span className="font-data-mono text-xs uppercase tracking-[0.2em] text-primary">
          Agency workflow · AI + live discovery
        </span>
        <h1 className="font-display-lg mt-4 max-w-4xl text-on-surface">
          Turn client briefs into India-ready campaign intelligence in minutes.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant">
          Commercial AdAlchemy helps agencies and brands discover audiences, trends,
          creators, celebrities, and sponsorship events — then convert that intelligence
          into budget-aware strategy. Built for the way Indian campaigns actually run in 2026.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/campaign-planner"
            className="rounded-lg bg-primary px-8 py-4 font-label-sm font-bold uppercase text-on-primary hover:brightness-110"
          >
            Start with a brief
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-primary/40 px-8 py-4 font-label-sm font-bold uppercase text-primary hover:bg-primary/10"
          >
            View intelligence dashboard
          </Link>
        </div>

        <div className="mt-16 flex flex-wrap gap-2">
          {TRUSTED_BRANDS.map((brand) => (
            <span
              key={brand}
              className="rounded-full border border-outline-variant/60 bg-surface-container-high/50 px-3 py-1 text-xs font-bold text-on-surface-variant"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      <section className="border-y border-outline-variant/30 bg-surface-container-low/40 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="rounded-xl border border-outline-variant/40 p-6">
              <span className="material-symbols-outlined text-3xl text-primary">
                {feature.icon}
              </span>
              <h2 className="mt-4 font-headline-md text-lg">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-display-lg text-on-surface">How we help you win pitches</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {HOW_WE_HELP.map((item) => (
            <div
              key={item.step}
              className="rounded-xl border border-outline-variant/40 bg-surface-container-high/30 p-8"
            >
              <p className="font-data-mono text-2xl text-primary">{item.step}</p>
              <h3 className="mt-4 font-headline-md text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-outline-variant/30 bg-surface-container-low/50 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display-lg">Discovery is free. Strategy is paid.</h2>
          <p className="mt-4 text-on-surface-variant leading-7">
            Basic from ₹10K, Pro from ₹50K, and Superplan for teams that want automation
            and production support — full deliverable breakdown on the Plans page.
          </p>
          <Link
            href="/plans"
            className="mt-8 inline-block rounded-lg bg-primary px-8 py-3 font-label-sm font-bold uppercase text-on-primary hover:brightness-110"
          >
            Compare plans
          </Link>
        </div>
      </section>

      <footer className="border-t border-outline-variant/30 px-6 py-8 text-center text-xs text-on-surface-variant">
        Commercial AdAlchemy · India 2026 marketing intelligence · Built for agencies
      </footer>
    </div>
  );
}
