import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div className={cn("glass-card rounded-lg", hover && "hover:-translate-y-0.5", className)}>
      {children}
    </div>
  );
}
