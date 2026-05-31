import { cn } from "@/lib/utils";
import { getScoreColor, type ScoreType } from "@/lib/types/scores";

interface ScoreBadgeProps {
  type: ScoreType;
  value: number;
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function ScoreBadge({ type, value, label, size = "md" }: ScoreBadgeProps) {
  const displayLabel = label ?? type.replace(/([A-Z])/g, " $1").trim();

  return (
    <div className="text-center">
      <p className="font-data-mono text-[10px] uppercase text-on-surface-variant">
        {displayLabel}
      </p>
      <p
        className={cn(
          "font-bold",
          getScoreColor(type, value),
          size === "sm" && "text-sm",
          size === "md" && "text-lg",
          size === "lg" && "text-2xl font-headline-md"
        )}
      >
        {type === "momentum" && value > 100 ? `+${value}%` : value}
      </p>
    </div>
  );
}

interface ScoreRingProps {
  value: number;
  size?: number;
  className?: string;
}

export function ScoreRing({ value, size = 96, className }: ScoreRingProps) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const fontSize = size <= 72 ? "text-lg" : "text-2xl";

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full border-4 border-primary/20",
        className
      )}
      style={{ width: size, height: size }}
    >
      <span className={cn("font-data-mono font-bold text-primary", fontSize)}>{value}</span>
      <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={4}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-primary"
        />
      </svg>
    </div>
  );
}
