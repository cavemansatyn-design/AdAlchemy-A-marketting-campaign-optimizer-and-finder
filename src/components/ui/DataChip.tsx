import { cn } from "@/lib/utils";

interface DataChipProps {
  children: React.ReactNode;
  variant?: "default" | "live" | "gold";
  className?: string;
}

export function DataChip({ children, variant = "default", className }: DataChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        variant === "default" && "border border-outline-variant bg-surface-container-high text-on-surface-variant",
        variant === "live" && "border border-outline-variant bg-surface/80 text-success-emerald",
        variant === "gold" && "border border-primary/20 bg-primary/10 text-primary",
        className
      )}
    >
      {variant === "live" && (
        <span className="h-2 w-2 rounded-full bg-success-emerald pulse-glow" />
      )}
      {children}
    </span>
  );
}

interface PulseIndicatorProps {
  label?: string;
  variant?: "live" | "risk" | "alpha";
}

export function PulseIndicator({ label = "LIVE", variant = "live" }: PulseIndicatorProps) {
  const dotColor =
    variant === "risk"
      ? "bg-risk-ruby"
      : variant === "alpha"
        ? "bg-success-emerald"
        : "bg-success-emerald";

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-outline-variant bg-surface/80 px-2 py-1 backdrop-blur">
      <span className={cn("h-2 w-2 rounded-full pulse-glow", dotColor)} />
      <span className="text-[8px] font-bold uppercase">{label}</span>
    </span>
  );
}
