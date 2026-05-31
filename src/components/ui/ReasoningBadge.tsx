import { cn } from "@/lib/utils";
import type { ReasoningMeta } from "@/lib/intelligence/model";

interface ReasoningBadgeProps {
  confidence: number;
  meta: ReasoningMeta;
  className?: string;
}

export function ReasoningBadge({
  confidence,
  meta,
  className,
}: ReasoningBadgeProps) {
  const isLive = meta.source === "anakin-wire-chatgpt";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-lg border border-outline-variant/50 bg-surface-container-low px-4 py-3",
        className
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
          isLive
            ? "bg-success-emerald/15 text-success-emerald"
            : "bg-surface-container-high text-on-surface-variant"
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            isLive ? "bg-success-emerald pulse-glow" : "bg-on-surface-variant"
          )}
        />
        {isLive ? "Live intelligence" : "Demo intelligence"}
      </span>

      <span className="font-data-mono text-xs text-primary">
        Confidence {confidence}%
      </span>

      {meta.webSearchTriggered && (
        <span className="font-data-mono text-[10px] uppercase text-tertiary">
          Evidence checked
        </span>
      )}

      {(meta.citations.length > 0 || meta.searchSources.length > 0) && (
        <span className="font-data-mono text-[10px] text-on-surface-variant">
          {meta.citations.length} citations / {meta.searchSources.length} sources
        </span>
      )}

      {meta.apiCallCount != null && meta.apiCallCount > 0 && (
        <span className="font-data-mono text-[10px] uppercase text-success-emerald">
          {meta.apiCallCount} intelligence APIs
        </span>
      )}
    </div>
  );
}
