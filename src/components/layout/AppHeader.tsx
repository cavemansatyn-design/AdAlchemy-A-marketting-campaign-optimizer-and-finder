"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface AppHeaderProps {
  title?: string;
  showExecute?: boolean;
}

export function AppHeader({ title = "AdAlchemy", showExecute = true }: AppHeaderProps) {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 flex min-h-20 w-full flex-wrap items-center justify-between gap-4 border-b border-outline-variant bg-surface/90 px-4 py-4 backdrop-blur-xl md:px-8 xl:px-12">
      <div className="flex min-w-0 flex-1 items-center gap-6 xl:gap-10">
        <Link
          href="/"
          className="shrink-0 font-headline-md text-sm font-bold uppercase tracking-wider text-primary hover:underline"
        >
          AdAlchemy
        </Link>
        <h2 className="max-w-full truncate text-sm font-bold uppercase tracking-wider text-on-surface-variant">
          {title}
        </h2>
        <nav className="hidden shrink-0 gap-6 xl:flex">
          <Link href="/dashboard" className="text-sm text-on-surface-variant hover:text-primary">
            Dashboard
          </Link>
          <Link href="/campaign-planner" className="text-sm text-on-surface-variant hover:text-primary">
            Brief
          </Link>
          <Link href="/projects" className="text-sm text-on-surface-variant hover:text-primary">
            Projects
          </Link>
          <Link href="/generator" className="text-sm text-on-surface-variant hover:text-primary">
            Action Plan
          </Link>
        </nav>
      </div>

      <div className="flex min-w-0 items-center gap-3 md:gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <Link
              href="/projects"
              className="hidden rounded-full border border-outline-variant px-3 py-1.5 text-xs font-bold text-on-surface-variant sm:inline"
            >
              {user?.displayName}
            </Link>
            <button
              type="button"
              onClick={logout}
              className="text-xs font-bold uppercase text-on-surface-variant hover:text-primary"
            >
              Sign out
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded-full border border-primary/40 px-4 py-1.5 text-xs font-bold uppercase text-primary hover:bg-primary/10"
          >
            Sign in
          </Link>
        )}
        {showExecute && (
          <Link
            href="/generator"
            className="hidden whitespace-nowrap rounded-lg bg-primary-container px-4 py-2 font-label-sm font-bold uppercase tracking-wider text-on-primary-container transition-all hover:brightness-105 sm:inline-flex xl:px-5"
          >
            Build Plan
          </Link>
        )}
      </div>
    </header>
  );
}
