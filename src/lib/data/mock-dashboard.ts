import type {
  AttentionPulseItem,
  Opportunity,
  OpportunityFeedItem,
} from "@/lib/types/intelligence";

export const ATTENTION_PULSE: AttentionPulseItem[] = [
  { id: "1", name: "Run Clubs India", category: "community", momentum: 94, change: 48 },
  { id: "2", name: "Prajakta Koli", category: "creator", momentum: 88, change: 121 },
  { id: "3", name: "ESCOM 2026", category: "event", momentum: 85, change: 64 },
  { id: "4", name: "Women's Cricket Fitness", category: "topic", momentum: 92, change: 42 },
  { id: "5", name: "Neeraj Chopra", category: "celebrity", momentum: 91, change: 34 },
];

export const OPPORTUNITY_FEED: OpportunityFeedItem[] = [
  {
    id: "1",
    message: "Run clubs gaining brand sponsorship momentum in metro India",
    category: "Fitness",
    momentum: 48,
    timestamp: "Live",
  },
  {
    id: "2",
    message: "AI fitness coaching in Hinglish moving into creator content",
    category: "AI Wellness",
    momentum: 37,
    timestamp: "Live",
  },
  {
    id: "3",
    message: "Women's cricket fitness content expanding beyond tournaments",
    category: "Sports",
    momentum: 42,
    timestamp: "Live",
  },
  {
    id: "4",
    message: "Pickleball and social sports meetups spiking in Delhi NCR",
    category: "Niche Sports",
    momentum: 67,
    timestamp: "Live",
  },
  {
    id: "5",
    message: "Regional-language fitness creators outperforming celebrity-only ads",
    category: "Influencer",
    momentum: 132,
    timestamp: "Live",
  },
];

export const RECOMMENDED_OPPORTUNITIES: Opportunity[] = [
  {
    id: "1",
    title: "Fitness Brand x TCS World 10K Bengaluru",
    description:
      "Running communities create high-intent sampling, creator race teams, and local proof for performance products.",
    type: "sponsorship",
    fitScore: 95,
    expectedReach: "3.8M",
    costEfficiency: "High",
    scores: { opportunity: 95, brandFit: 92, audienceMatch: 88, confidence: 91 },
    tags: ["Sports", "India", "Gen Z"],
  },
  {
    id: "2",
    title: "Sportswear x Women's Cricket Fitness Series",
    description:
      "Training, recovery, and grassroots cricket content can bridge fandom with daily fitness routines.",
    type: "cultural",
    fitScore: 94,
    expectedReach: "12M",
    costEfficiency: "Medium",
    scores: { opportunity: 94, brandFit: 90, audienceMatch: 96, confidence: 88 },
    tags: ["Cricket", "India", "Sports"],
  },
  {
    id: "3",
    title: "Regional Fitness Creator Pods",
    description:
      "Hindi and regional-language creator pods offer stronger trust and lower CPM than celebrity-first campaigns.",
    type: "creator",
    fitScore: 88,
    expectedReach: "2.1M",
    costEfficiency: "High",
    scores: { opportunity: 88, momentum: 132, costEfficiency: 92, confidence: 85 },
    tags: ["Creators", "India", "Regional"],
  },
];

export const EMERGING_NODES = [
  {
    id: "1",
    title: "AI Fitness Coaching",
    subtitle: "Hinglish routines and wearable-led training",
    score: 88.4,
    live: true,
  },
  {
    id: "2",
    title: "Campus Sports Challenges",
    subtitle: "College creator teams and UGC ladders",
    score: 86.2,
    live: false,
  },
  {
    id: "3",
    title: "Women-led Run Clubs",
    subtitle: "Trust-building communities in metro India",
    score: 92.1,
    live: false,
  },
  {
    id: "4",
    title: "Social Sports",
    subtitle: "Pickleball, box cricket, and weekend leagues",
    score: 84.5,
    live: true,
  },
];

export const PULSE_RECOMMENDATIONS = [
  {
    id: "1",
    type: "risk" as const,
    title: "Risk: Celebrity-only launch",
    detail: "High spend without local trust proof",
  },
  {
    id: "2",
    type: "alpha" as const,
    title: "Alpha: Run club sampling",
    detail: "Strong intent and repeat participation",
  },
  {
    id: "3",
    type: "action" as const,
    title: "Generate creator pod strategy",
    detail: "Regional fitness pods can lower acquisition cost",
  },
];
