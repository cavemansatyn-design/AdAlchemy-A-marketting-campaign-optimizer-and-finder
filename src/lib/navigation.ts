import type { WorkflowStage } from "@/lib/types/workflow";

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  stage?: WorkflowStage;
}

export const MAIN_NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Campaign Planner", href: "/campaign-planner", icon: "event_note", stage: "brief" },
  { label: "Audience Intelligence", href: "/audience", icon: "groups", stage: "audience" },
  { label: "Creator Intelligence", href: "/creators", icon: "person_search", stage: "creators" },
  { label: "Celebrity Intelligence", href: "/celebrities", icon: "star", stage: "celebrities" },
  { label: "Event Intelligence", href: "/events", icon: "event", stage: "events" },
  { label: "Platform Intelligence", href: "/platforms", icon: "devices", stage: "platforms" },
  { label: "Trend Radar", href: "/trends", icon: "trending_up", stage: "trends" },
  { label: "Culture Radar", href: "/culture", icon: "public" },
  { label: "Opportunity Engine", href: "/opportunities", icon: "radar", stage: "opportunities" },
  { label: "Campaign Generator", href: "/generator", icon: "auto_awesome", stage: "campaign" },
  { label: "Plans & Pricing", href: "/plans", icon: "payments" },
  { label: "Reports", href: "/reports", icon: "description", stage: "report" },
  { label: "Projects", href: "/projects", icon: "folder" },
  { label: "Settings", href: "/settings", icon: "settings" },
];
