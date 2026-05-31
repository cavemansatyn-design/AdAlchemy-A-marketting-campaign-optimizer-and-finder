export type ScoreType =
  | "attention"
  | "momentum"
  | "opportunity"
  | "brandFit"
  | "audienceMatch"
  | "risk"
  | "costEfficiency"
  | "confidence";

export interface ScoreSet {
  attention: number;
  momentum: number;
  opportunity: number;
  brandFit: number;
  audienceMatch: number;
  risk: number;
  costEfficiency: number;
  confidence: number;
}

export const SCORE_LABELS: Record<ScoreType, string> = {
  attention: "Attention",
  momentum: "Momentum",
  opportunity: "Opportunity",
  brandFit: "Brand Fit",
  audienceMatch: "Audience Match",
  risk: "Risk",
  costEfficiency: "Cost Efficiency",
  confidence: "Confidence",
};

export function getScoreColor(type: ScoreType, value: number): string {
  if (type === "risk") {
    if (value >= 70) return "text-risk-ruby";
    if (value >= 40) return "text-primary";
    return "text-success-emerald";
  }
  if (value >= 85) return "text-success-emerald";
  if (value >= 70) return "text-primary";
  return "text-on-surface-variant";
}
