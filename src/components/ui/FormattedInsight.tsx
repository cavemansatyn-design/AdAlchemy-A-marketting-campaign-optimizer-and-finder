import { cn } from "@/lib/utils";

interface FormattedInsightProps {
  text: string;
  className?: string;
}

export function FormattedInsight({ text, className }: FormattedInsightProps) {
  const blocks = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className={cn("space-y-3 text-sm leading-7 text-on-surface-variant", className)}>
      {blocks.map((block, index) => {
        if (block.startsWith("- ") || block.startsWith("• ")) {
          return (
            <ul key={index} className="list-disc space-y-2 pl-5">
              {block
                .split(/(?<=[.!?])\s+/)
                .filter((item) => item.startsWith("- ") || item.startsWith("• "))
                .map((item, itemIndex) => (
                  <li key={itemIndex}>{item.replace(/^[-•]\s*/, "")}</li>
                ))}
            </ul>
          );
        }

        return (
          <p key={index} className="text-pretty">
            {block}
          </p>
        );
      })}
    </div>
  );
}

interface SectionInsightCardProps {
  title: string;
  body?: string;
  fallback?: string;
}

export function SectionInsightCard({ title, body, fallback }: SectionInsightCardProps) {
  if (!body && !fallback) return null;

  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
      <p className="font-data-mono text-[10px] uppercase tracking-widest text-primary">
        AdAlchemy Intelligence
      </p>
      <h4 className="mt-2 font-headline-md text-lg text-on-surface">{title}</h4>
      <FormattedInsight text={body ?? fallback ?? ""} className="mt-3" />
    </div>
  );
}
