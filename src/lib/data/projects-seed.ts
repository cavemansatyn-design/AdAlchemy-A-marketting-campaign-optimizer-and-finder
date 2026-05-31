import type { WorkflowProject } from "@/lib/types/workflow";
import type { CampaignIntelligence } from "@/lib/types/campaign-intelligence";

const nikeIntelligence: CampaignIntelligence = {
  executiveSummary:
    "Nike India can dominate IPL 2026 by pairing cricket watch-party culture with marathon creator teams in Bengaluru and Mumbai. With ₹60 lakh, a creator-first IPL + TCS 10K bundle beats celebrity-only TV — Virat Kohli for credibility, Harsha Bhogle and Prajakta Koli for proof, and IPL Watch Party Circuit for sampling at scale.",
  sections: {
    audience: {
      title: "Audience Intelligence",
      body: "Cricket fans 18-40 in metro and tier-2 India are active in IPL watch parties, run clubs, and sneaker culture communities. They distrust pure celebrity ads without creator proof. Nike should lead with race teams, training reels, and Hindi-market cricket creators before mass TV.",
    },
    trends: {
      title: "Trend Radar",
      body: "Women's cricket training culture (+42%), run clubs as social fitness (+48%), and creator-led campus challenges (+51%) align with Nike's performance narrative. IPL 2026 watch-party culture is the highest-momentum sponsorship window in Q2.",
    },
    creators: {
      title: "Creator Intelligence",
      body: "Priority pod: Harsha Bhogle (cricket analysis), Prajakta Koli (youth creator media), Bhuvan Bam (Hindi entertainment), and Mandira Bedi (fitness + cricket culture). Bundle cost: ₹12–18L for a 6-week IPL + marathon arc.",
    },
    celebrities: {
      title: "Celebrity Intelligence",
      body: "Virat Kohli (Tier 1 cricket, 96 popularity) for master brand film; Hardik Pandya for IPL energy; Smriti Mandhana for women's sports crossover. Use celebrities as anchors — not the whole budget — with creator layers for trust.",
    },
    events: {
      title: "Event Intelligence",
      body: "IPL 2026 Watch Party Circuit (₹40L–1.2Cr reach 85M), TCS World 10K Bengaluru (₹18–35L), WPL 2026 Festival (₹25–55L). Recommended: IPL sampling + 10K creator race teams under ₹60L total.",
    },
    opportunities: {
      title: "Opportunity Engine",
      body: "Top play: Nike Race Team × IPL watch parties × regional creator squads. Projected reach 22M+ with 8.2% engagement on Reels/Shorts. Confidence 91% based on 14 live discovery APIs and cricket-fitness signal overlap.",
    },
  },
  discoverySources: [
    {
      title: "India's Sports Sponsorship Industry Soars to $2 Billion",
      url: "https://example.com/sports-sponsorship-india",
      snippet: "Cricket and fitness categories lead 2026 brand spend.",
    },
    {
      title: "IPL 2026 brand activation guide India",
      url: "https://example.com/ipl-marketing",
      snippet: "Creator-first beats TV-only for Gen Z cricket audiences.",
    },
  ],
  meta: {
    webSearchTriggered: true,
    citations: [{ title: "IPL sponsorship trends 2026" }],
    searchSources: Array.from({ length: 14 }, (_, i) => ({
      title: `Nike India discovery sweep ${i + 1}`,
    })),
    source: "anakin-wire-chatgpt",
    apiCallCount: 14,
    backgroundQueries: 12,
  },
  generatedAt: "2026-05-28T10:00:00.000Z",
};

export const SEED_PROJECTS: WorkflowProject[] = [
  {
    id: "nike-ipl",
    name: "Nike IPL Strategy",
    brief: {
      brand: "Nike",
      industry: "Sportswear & Athleisure",
      audience: "Cricket fans 18-40, runners, Gen Z sneaker culture",
      region: "India — Mumbai, Bengaluru, Delhi NCR, Kolkata",
      budget: "₹60 lakh",
      goals: "IPL 2026 visibility + marathon creator teams + tier-2 sneaker aspiration",
      timeline: "IPL Q2 2026 + TCS 10K Bengaluru",
      naturalLanguage:
        "Nike ₹60 lakh marathon sponsorship bundle — TCS World 10K Bengaluru plus creator race teams and IPL watch party sampling India 2026",
    },
    brandDNA: {
      values: ["Performance", "Inclusivity", "Community movement"],
      personality: "Bold, athletic, inclusive challenger",
      archetype: "The Hero",
      coreThemes: ["Cricket x fitness", "Race day energy", "Creator proof", "Tier-2 ambition"],
      brandVoice: "Direct, motivational, culturally sharp Hinglish",
      audienceProfile: "Urban and tier-2 youth who live sport on phones first",
      positioning: "India's movement brand — from IPL nights to morning runs",
    },
    budgetScenarios: [
      {
        id: "a",
        label: "Creator-first IPL",
        reach: "18M",
        engagement: "8.4%",
        efficiency: "High",
        recommended: true,
        rationale: "Cricket creators + watch parties under ₹45L; reserve ₹15L for 10K race teams.",
      },
      {
        id: "b",
        label: "Celebrity anchor",
        reach: "32M",
        engagement: "5.1%",
        efficiency: "Medium",
        recommended: false,
        rationale: "Virat film + limited creator support — high reach, lower engagement.",
      },
      {
        id: "c",
        label: "Event-heavy",
        reach: "12M",
        engagement: "9.2%",
        efficiency: "High",
        recommended: false,
        rationale: "TCS 10K + WPL zones — deep community, narrower reach.",
      },
    ],
    intelligence: nikeIntelligence,
    pipelineStatus: "ready",
    currentStage: "opportunities",
    completedStages: [
      "brief",
      "brand-dna",
      "audience",
      "trends",
      "creators",
      "celebrities",
      "events",
    ],
    createdAt: "2026-05-27T08:00:00.000Z",
    updatedAt: "2026-05-29T14:30:00.000Z",
  },
  {
    id: "fitpulse",
    name: "FitPulse Launch",
    brief: {
      brand: "FitPulse",
      industry: "Fitness & Wearables",
      audience: "Gen Z tier-2 cities",
      region: "India",
      budget: "₹10 lakh",
      goals: "Wearable launch awareness",
      timeline: "Q3 2026",
    },
    brandDNA: {
      values: ["Progress", "Accessibility"],
      personality: "Encouraging, tech-forward",
      archetype: "The Caregiver",
      coreThemes: ["Beginner fitness", "Wearable proof"],
      brandVoice: "Friendly Hinglish coach",
      audienceProfile: "First-time fitness trackers in tier-2",
      positioning: "Affordable performance for every city",
    },
    budgetScenarios: [
      {
        id: "a",
        label: "Regional creators",
        reach: "4.2M",
        engagement: "7.1%",
        efficiency: "High",
        recommended: true,
      },
    ],
    intelligence: null,
    pipelineStatus: "ready",
    currentStage: "campaign",
    completedStages: ["brief", "brand-dna", "audience", "trends", "creators"],
    createdAt: "2026-05-29T06:00:00.000Z",
    updatedAt: "2026-05-30T08:00:00.000Z",
  },
  {
    id: "zenith-q4",
    name: "Urban Wellness Q4",
    brief: {
      brand: "Zenith Health",
      industry: "Wellness & Supplements",
      audience: "Women 25-35 urban India",
      region: "Metro India",
      budget: "₹25 lakh",
      goals: "Q4 festive wellness push",
      timeline: "Q4 2026",
    },
    brandDNA: {
      values: ["Trust", "Science-backed wellness"],
      personality: "Calm, credible",
      archetype: "The Sage",
      coreThemes: ["Women's wellness", "Festive self-care"],
      brandVoice: "Expert yet warm",
      audienceProfile: "Working women seeking credible supplements",
      positioning: "Premium wellness without influencer noise",
    },
    budgetScenarios: [],
    intelligence: null,
    pipelineStatus: "idle",
    currentStage: "audience",
    completedStages: ["brief", "brand-dna"],
    createdAt: "2026-05-25T12:00:00.000Z",
    updatedAt: "2026-05-28T09:00:00.000Z",
  },
];

export const PROJECT_LIST_META = SEED_PROJECTS.map((p) => ({
  id: p.id,
  name: p.name,
  client: p.brief?.brand ?? "—",
  stage: stageLabel(p.currentStage),
  updated: relativeUpdated(p.updatedAt),
  budget: p.brief?.budget,
  confidence: p.intelligence
    ? `${Math.min(88 + Math.floor((p.intelligence.meta.apiCallCount ?? 12) / 2), 97)}%`
    : p.pipelineStatus === "ready"
      ? "76%"
      : "—",
}));

function stageLabel(stage: WorkflowProject["currentStage"]): string {
  const map: Partial<Record<WorkflowProject["currentStage"], string>> = {
    brief: "Client Brief",
    "brand-dna": "Brand DNA",
    audience: "Audience Intelligence",
    trends: "Trend Discovery",
    creators: "Creator Discovery",
    celebrities: "Celebrity Discovery",
    events: "Event Discovery",
    opportunities: "Opportunity Discovery",
    campaign: "Campaign Generation",
    report: "Agency Report",
  };
  return map[stage] ?? stage.replace("-", " ");
}

function relativeUpdated(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function getSeedProject(id: string): WorkflowProject | undefined {
  return SEED_PROJECTS.find((p) => p.id === id);
}
