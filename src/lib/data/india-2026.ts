import {
  EXTRA_CREATORS,
  EXTRA_CELEBRITIES,
  EXTRA_EVENTS,
  EXPANDED_MONETIZATION_PLANS,
  PLATFORM_STATS,
} from "@/lib/data/india-2026-extra";

export { PLATFORM_STATS };

const commonsImage = (file: string, width = 900) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

export const TRUSTED_BRANDS = [
  "Nike",
  "Adidas",
  "Tata Neu",
  "Zomato",
  "Swiggy",
  "boAt",
  "Myntra",
  "CRED",
  "Zepto",
  "Red Bull",
  "Decathlon",
  "Spotify",
];

export const INDIA_2026_AUDIENCE = {
  interests: [
    "Fitness wearables",
    "Run clubs",
    "Cricket fitness",
    "Affordable premium gear",
    "Creator-led challenges",
    "AI coaching",
    "Regional language reels",
  ],
  communities: [
    "Bengaluru weekend run clubs",
    "Mumbai marathon training groups",
    "Delhi NCR pickleball circles",
    "Tier-2 gym transformation pages",
    "College sports and esports societies",
  ],
  painPoints: [
    "High-performance products feel built for metros, not local training routines.",
    "Gen Z audiences distrust celebrity-only campaigns without creator proof.",
    "Fitness messaging often ignores women, beginners, and regional languages.",
  ],
  desires: [
    "Visible progress stories from people like them.",
    "Community events they can join, not just watch.",
    "Clear value for money and aspirational but reachable creators.",
  ],
  platforms: [
    { name: "Instagram Reels", match: 94, efficiency: "High", role: "Fast hooks, UGC challenges, creator proof" },
    { name: "YouTube Shorts", match: 91, efficiency: "High", role: "Transformation arcs and explainer-led discovery" },
    { name: "YouTube Long-form", match: 86, efficiency: "Medium", role: "Product tests, fitness plans, creator trust" },
    { name: "WhatsApp Communities", match: 79, efficiency: "High", role: "Run club invites, referrals, event reminders" },
    { name: "Reddit and forums", match: 72, efficiency: "Medium", role: "Authenticity checks and early objection mining" },
  ],
  themes: [
    "Beginner-friendly fitness",
    "Women-led sports communities",
    "Tier-2 ambition",
    "Cricket-to-fitness crossover",
    "Campus sports energy",
  ],
};

export const INDIA_2026_TRENDS = [
  {
    name: "Run clubs as social fitness",
    region: "Mumbai, Bengaluru, Pune, Delhi NCR",
    growth: "+48%",
    lifecycle: "Rising",
    score: 94,
    niche: "Community fitness",
    source: "Marathon sponsorship, creator and city-community signals",
  },
  {
    name: "Women's cricket training culture",
    region: "Pan-India",
    growth: "+42%",
    lifecycle: "Rising",
    score: 92,
    niche: "Sports aspiration",
    source: "Cricket fandom, athlete content, sportswear demand",
  },
  {
    name: "AI fitness coaching in Hinglish",
    region: "Urban and tier-2 India",
    growth: "+37%",
    lifecycle: "Emerging",
    score: 88,
    niche: "AI wellness",
    source: "Search, app-store, YouTube explainer signals",
  },
  {
    name: "Pickleball and social sport meetups",
    region: "Delhi NCR, Mumbai, Bengaluru",
    growth: "+67%",
    lifecycle: "Emerging",
    score: 84,
    niche: "Niche sport",
    source: "Club listings, social posts, local event calendars",
  },
  {
    name: "Creator-led campus challenges",
    region: "Top 20 college cities",
    growth: "+51%",
    lifecycle: "Rising",
    score: 86,
    niche: "Youth activation",
    source: "Campus festivals, creator commerce, reels participation",
  },
];

const BASE_CREATORS = [
  {
    name: "Bhuvan Bam",
    handle: "@bhuvan.bam22",
    niche: "Comedy, music, youth culture and long-form creator storytelling",
    city: "Delhi",
    audience: "18-30, Hindi digital entertainment fans",
    followers: "25M+",
    engagement: "High",
    cost: "Premium creator",
    image: commonsImage("Bhuvan Bam at the Jio MAMI Film Festival 2023.jpg"),
    scores: [
      { type: "attention" as const, value: 84, label: "Attention" },
      { type: "momentum" as const, value: 156, label: "Momentum" },
      { type: "brandFit" as const, value: 94, label: "Brand Match" },
    ],
  },
  {
    name: "Prajakta Koli",
    handle: "@mostlysane",
    niche: "Comedy, lifestyle, youth culture and women-led creator media",
    city: "Mumbai",
    audience: "Gen Z and young millennial entertainment audiences",
    followers: "8M+",
    engagement: "High",
    cost: "Premium creator",
    image: commonsImage("Prajakta Koli, March 31, 2018.jpg"),
    scores: [
      { type: "attention" as const, value: 88, label: "Attention" },
      { type: "momentum" as const, value: 121, label: "Momentum" },
      { type: "brandFit" as const, value: 96, label: "Brand Match" },
    ],
  },
  {
    name: "CarryMinati",
    handle: "@carryminati",
    niche: "Gaming, roast comedy, youth internet culture",
    city: "Faridabad",
    audience: "Gamers and youth entertainment fans 16-28",
    followers: "40M+",
    engagement: "High",
    cost: "Premium creator",
    image: commonsImage("Carryminati 2022.jpg"),
    scores: [
      { type: "attention" as const, value: 91, label: "Attention" },
      { type: "momentum" as const, value: 104, label: "Momentum" },
      { type: "brandFit" as const, value: 89, label: "Brand Match" },
    ],
  },
  {
    name: "Kusha Kapila",
    handle: "@kushakapila",
    niche: "Comedy, fashion, beauty and culture-led brand integrations",
    city: "Delhi / Mumbai",
    audience: "Women 18-34, fashion, beauty and pop culture",
    followers: "3M+",
    engagement: "High",
    cost: "Premium creator",
    image: commonsImage("Kusha Kapila spotted promoting Amazon miniTV’s Case Toh Banta Hai.jpg"),
    scores: [
      { type: "attention" as const, value: 80, label: "Attention" },
      { type: "momentum" as const, value: 132, label: "Momentum" },
      { type: "brandFit" as const, value: 92, label: "Brand Match" },
    ],
  },
];

export const INDIA_2026_CREATORS = [
  ...BASE_CREATORS.map((c) => ({
    ...c,
    platforms: ["Instagram", "YouTube"] as string[],
    contentTypes: ["Reels", "Long-form"],
    avgViews: "150K+",
  })),
  ...EXTRA_CREATORS,
];

const BASE_CELEBRITIES = [
  {
    name: "Neeraj Chopra",
    narrative: "Performance athletics, national pride, low-risk credibility",
    popularity: 91,
    momentum: 34,
    brandFit: 97,
    risk: 8,
    cost: "Tier 1 sports",
    image: commonsImage("Neeraj Chopra Budapest 2023.jpg"),
  },
  {
    name: "Deepika Padukone",
    narrative: "Wellness, fashion, premium lifestyle and mass awareness",
    popularity: 92,
    momentum: 12,
    brandFit: 86,
    risk: 18,
    cost: "Tier 1 film",
    image: commonsImage("Deepika Padukone (2014).jpg"),
  },
  {
    name: "Ranveer Singh",
    narrative: "High-energy youth culture, sport-fashion crossover",
    popularity: 94,
    momentum: 15,
    brandFit: 84,
    risk: 24,
    cost: "Tier 1 film",
    image: commonsImage("Ranveer Singh (51914787844) (cropped).jpg"),
  },
  {
    name: "Smriti Mandhana",
    narrative: "Women's cricket, aspiration and inclusive sports storytelling",
    popularity: 86,
    momentum: 39,
    brandFit: 93,
    risk: 10,
    cost: "Tier 2 sports",
    image: commonsImage("Smriti Mandhana.jpg"),
  },
];

export const INDIA_2026_CELEBRITIES = [
  ...BASE_CELEBRITIES.map((c) => ({ ...c, category: "Sports & Film" })),
  ...EXTRA_CELEBRITIES,
];

const BASE_EVENTS = [
  {
    name: "TCS World 10K Bengaluru 2026",
    location: "Bengaluru, India",
    audience: "Runners, young professionals, wellness communities",
    sponsorLandscape: "Running gear, hydration and community zones",
    brandFit: 95,
    reach: "3.8M",
    cost: "Rs 18L-35L",
    image: commonsImage("Open10K.jpg"),
  },
  {
    name: "Vedanta Delhi Half Marathon 2026",
    location: "New Delhi, India",
    audience: "40K+ race participants and city fitness viewers",
    sponsorLandscape: "Activation booths, route branding, creator race teams",
    brandFit: 93,
    reach: "4.6M",
    cost: "Rs 22L-45L",
    image: commonsImage("ADHM-finish-2016.jpg"),
  },
  {
    name: "ESCOM 2026",
    location: "New Delhi, India",
    audience: "Esports fans, creators, youth-tech partners",
    sponsorLandscape: "Exhibition, award, stream and creator lounge packages",
    brandFit: 78,
    reach: "2.4M",
    cost: "Rs 8L-20L",
    image: commonsImage("Podczas Intel Extreme Masters (8465487906).jpg"),
  },
  {
    name: "OJASS 2026",
    location: "NIT Jamshedpur, India",
    audience: "25K+ campus footfall and 100+ institutions",
    sponsorLandscape: "Stage integrations, youth sampling, campus creator content",
    brandFit: 82,
    reach: "5M digital impressions",
    cost: "Rs 5L-18L",
    image: commonsImage("NIT Jamshedpur.jpg"),
  },
];

export const INDIA_2026_EVENTS = [...BASE_EVENTS, ...EXTRA_EVENTS];

export const MONETIZATION_PLANS = EXPANDED_MONETIZATION_PLANS;
