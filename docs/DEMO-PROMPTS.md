# Demo Prompts — Copy, Paste, and Trigger Live API

Use these prompts in **Campaign Planner → Natural Language** and click **Generate Intelligence**. Each run calls `POST /api/reasoning/analyze`, which triggers Anakin discovery + Groq or ChatGPT WIRE reasoning (cached per brief hash to limit credit burn).

## How to demo API calls repeatedly

1. Open [http://localhost:3000/campaign-planner](http://localhost:3000/campaign-planner)
2. Click a sample chip **or** paste a prompt below
3. Click **Generate Intelligence**
4. Watch **ReasoningBadge** for confidence %, model source, and citation count
5. Change the prompt (brand, budget, audience) and run again — cache key changes → new API call
6. Repeat with different prompts to show dynamic Brand DNA, budget scenarios, and section insights

**Tip:** Edit one word (e.g. budget ₹10Cr → ₹50L) to force a fresh analysis path.

## Environment required for live API

```env
ANAKIN_API_KEY=
ANAKIN_WIRE_CHATGPT_ACTION_ID=
GROQ_API_KEY=
GROQ_MODEL=llama-3.1-8b-instant
```

Without keys, fallback mock runs with **dynamic confidence** (58–94%) based on brief parsing — not a fixed 54%.

---

## 15 ready-to-paste prompts

### 1. Adidas Gen Z Q4
```
Adidas ₹10Cr brand campaign for Gen Z and 18-45 age group in India Q4 2026 — focus on cricket x streetwear crossover.
```

### 2. FitPulse Launch
```
We are launching a fitness wearable in India with ₹10 lakh budget targeting Gen Z in tier-2 cities.
```

### 3. Zomato Run Clubs
```
Zomato wants to sponsor run clubs and marathon communities in Mumbai and Bengaluru with ₹25 lakh for food x fitness.
```

### 4. CRED Premium
```
CRED ₹50 lakh campaign for premium credit card users 25-40 in metro India — creator-led trust, not celebrity-only.
```

### 5. boAt Audio Campus
```
boAt ₹15 lakh campus festival activation across Pune, Delhi, and Bangalore targeting students and first-jobbers.
```

### 6. Myntra Women's Cricket
```
Myntra ₹2Cr women's cricket and athleisure campaign during WPL 2026 — regional language creators preferred.
```

### 7. Zepto Quick Commerce
```
Zepto ₹8 lakh hyperlocal campaign in Hyderabad and Chennai for 10-minute grocery — mom creators and community WhatsApp.
```

### 8. Red Bull Esports
```
Red Bull ₹40 lakh esports and gaming culture push in India 2026 — ESCOM, streamers, and college LAN events.
```

### 9. Decathlon Pickleball
```
Decathlon ₹12 lakh pickleball and social sports meetup sponsorship in Delhi NCR for beginners and families.
```

### 10. Tata Neu Fintech
```
Tata Neu ₹1Cr fintech rewards campaign for young professionals — YouTube explainers plus LinkedIn thought leadership.
```

### 11. Spotify Hinglish
```
Spotify ₹30 lakh Hinglish podcast and reels campaign for indie artists and gym playlists in urban India.
```

### 12. Nike Marathon
```
Nike ₹60 lakh marathon sponsorship bundle — TCS World 10K Bengaluru plus creator race teams and sampling.
```

### 13. D2C Skincare
```
New D2C skincare brand ₹5 lakh launch for women 22-35 in India — Instagram Reels, dermatologist creators, no TV.
```

### 14. EV Two-Wheeler
```
EV two-wheeler startup ₹20 lakh launch in Gujarat and Maharashtra — tier-2 commute story, regional YouTube creators.
```

### 15. Swiggy IPL Food
```
Swiggy ₹3Cr IPL 2026 food delivery campaign — cricket watch parties, celebrity secondary, creator-first in Hindi markets.
```

---

## What changes per prompt

| Output | Behavior |
|--------|----------|
| **Active Brief** | Brand, region, budget parsed from your text |
| **Brand DNA** | Archetype, voice, themes from LLM |
| **Budget scenarios** | 3 allocation options with one recommended |
| **Confidence** | 58–98% from sources + citations + web search flags |
| **Section intelligence** | Audience, trends, creators, celebrities, events, opportunities pages update |

## Confidence scoring (not fixed)

- **Live LLM path:** `computeConfidenceFromWire()` — base 62 + web search + citations + source count + model bonus
- **Fallback path:** `computeFallbackConfidence()` — varies by source count, error state, provider
- **Dashboard ring:** Uses brief-specific score after analyze; market preload shown in neutral text until brief exists

## API endpoints used in demo

| Endpoint | When |
|----------|------|
| `POST /api/reasoning/analyze` | Every Generate Intelligence click |
| `GET /api/intelligence/dashboard` | Dashboard page load (discovery only) |
| `POST /api/reasoning/campaign` | Campaign Generator page |

## Source files

- Prompt definitions: `src/lib/data/sample-prompts.ts`
- UI chips: `src/app/(platform)/campaign-planner/page.tsx`
- Orchestrator: `src/lib/intelligence/orchestrator.ts`
