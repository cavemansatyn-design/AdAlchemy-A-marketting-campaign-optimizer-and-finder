"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useWorkflow } from "@/context/WorkflowContext";
import { cn } from "@/lib/utils";

const WORKFLOW_NAV = [
  { label: "1. Campaign Brief", href: "/campaign-planner", icon: "edit_note" },
  { label: "2. Intelligence Dashboard", href: "/dashboard", icon: "query_stats" },
  { label: "3. Action Plan", href: "/generator", icon: "task_alt" },
];

const INSIGHT_NAV = [
  { label: "Audiences", href: "/audience", icon: "groups" },
  { label: "Trends", href: "/trends", icon: "trending_up" },
  { label: "Creators", href: "/creators", icon: "person_search" },
  { label: "Celebrities", href: "/celebrities", icon: "star" },
  { label: "Events", href: "/events", icon: "event" },
  { label: "Sponsorships", href: "/opportunities", icon: "handshake" },
];

const LIBRARY_NAV = [
  { label: "Projects", href: "/projects", icon: "folder" },
  { label: "Reports", href: "/reports", icon: "description" },
  { label: "Settings", href: "/settings", icon: "settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { project, resetProject } = useWorkflow();
  const { isAuthenticated } = useAuth();

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-outline-variant bg-surface-container-lowest py-6 lg:flex">
      <div className="mb-7 px-5">
        <Link href="/" className="block hover:opacity-90">
          <h1 className="font-headline-md font-bold text-primary">AdAlchemy</h1>
          <p className="mt-1 text-sm leading-5 text-on-surface-variant opacity-80">
            Turn a brand brief into trends, partners, sponsorships, and a campaign plan.
          </p>
        </Link>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-2.5">
        <NavGroup title="Workflow" items={WORKFLOW_NAV} pathname={pathname} />
        <NavGroup title="Intelligence" items={INSIGHT_NAV} pathname={pathname} />
        <NavGroup title="Workspace" items={LIBRARY_NAV} pathname={pathname} />
      </nav>

      <div className="border-t border-outline-variant/30 px-5 pt-5">
        <Link
          href="/campaign-planner"
          onClick={resetProject}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-label-sm uppercase tracking-wider text-on-primary transition-all hover:brightness-110"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Brief
        </Link>
        {!isAuthenticated && (
          <Link
            href="/login"
            className="mt-3 block w-full rounded-lg border border-outline-variant py-2 text-center text-xs font-bold uppercase text-on-surface-variant hover:border-primary/50"
          >
            Sign in
          </Link>
        )}
      </div>

      <div className="mt-4 px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-outline-variant bg-secondary-container">
            <span className="material-symbols-outlined text-on-surface-variant">workspaces</span>
          </div>
          <div className="min-w-0">
            <p className="truncate font-label-sm font-bold text-on-surface">{project.name}</p>
            <p className="truncate text-[10px] uppercase text-on-surface-variant">
              {project.currentStage.replace("-", " ")}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavGroup({
  title,
  items,
  pathname,
}: {
  title: string;
  items: { label: string; href: string; icon: string }[];
  pathname: string;
}) {
  return (
    <div>
      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
        {title}
      </p>
      <div className="space-y-0.5">
        {items.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-10 items-center rounded-r-lg py-2 pl-3 pr-2 transition-colors",
                active
                  ? "border-l-2 border-primary bg-surface-container-high/45 font-bold text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              <span className="material-symbols-outlined mr-3 shrink-0 text-[20px]">{item.icon}</span>
              <span className="truncate text-sm leading-5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const items = [
    { label: "Home", href: "/", icon: "home" },
    { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { label: "Brief", href: "/campaign-planner", icon: "edit_note" },
    { label: "Projects", href: "/projects", icon: "folder" },
    { label: "Plan", href: "/generator", icon: "task_alt" },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-outline-variant bg-surface-container-lowest/95 px-2 py-2 backdrop-blur-xl lg:hidden">
      {items.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex min-w-0 flex-col items-center gap-1 rounded-lg px-1 py-2 text-[10px] font-bold uppercase leading-none",
              active ? "bg-primary/15 text-primary" : "text-on-surface-variant"
            )}
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span className="w-full truncate text-center">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
