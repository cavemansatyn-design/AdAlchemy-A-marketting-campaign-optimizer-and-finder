import type { ScoreSet } from "./scores";

export type IntelligenceSource =
  | "anakin-wire-youtube"
  | "anakin-wire-trends"
  | "anakin-wire-reddit"
  | "anakin-wire-news"
  | "reuters"
  | "product-hunt"
  | "hacker-news"
  | "github"
  | "steam"
  | "imdb"
  | "anakin-search"
  | "anakin-scraper"
  | "anakin-crawler"
  | "anakin-wire-chatgpt"
  | "groq-reasoning";

export interface IntelligenceSignal {
  id: string;
  title: string;
  summary: string;
  category: "trend" | "creator" | "celebrity" | "event" | "community" | "topic";
  region?: string;
  scores: Partial<ScoreSet>;
  sources: IntelligenceSource[];
  timestamp: string;
  live?: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: "sponsorship" | "creator" | "event" | "community" | "trend" | "cultural";
  fitScore: number;
  expectedReach?: string;
  costEfficiency?: "High" | "Medium" | "Low";
  scores: Partial<ScoreSet>;
  tags: string[];
}

export interface OpportunityFeedItem {
  id: string;
  message: string;
  category: string;
  momentum: number;
  timestamp: string;
}

export interface AttentionPulseItem {
  id: string;
  name: string;
  category: "celebrity" | "creator" | "event" | "community" | "topic";
  momentum: number;
  change: number;
}

export interface IntelligenceQuery {
  query: string;
  region?: string;
  brand?: string;
  audience?: string;
  sources?: IntelligenceSource[];
}

export interface IntelligenceResult {
  signals: IntelligenceSignal[];
  opportunities: Opportunity[];
  reasoning?: string;
  confidence: number;
  meta?: {
    model?: string;
    webSearchTriggered?: boolean;
    citations?: unknown[];
    searchSources?: unknown[];
    source?: "anakin-wire-chatgpt" | "groq-reasoning" | "mock";
    discoverySources?: unknown[];
  };
}
