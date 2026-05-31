# Commercial AdAlchemy — Product & Architecture

## The idea

**Commercial AdAlchemy** is an AI-powered marketing intelligence platform built for **agencies and brands operating in India 2026+**. It turns a client brief into actionable campaign intelligence: audience fit, trends, creators, celebrities, events, budget scenarios, and executable strategy — in one unified workflow.

### Problem

Agency teams waste weeks on:

- Fragmented research (spreadsheets, manual creator lists, outdated trend reports)
- Disconnected tools for audience, creators, events, and budget
- Expensive LLM calls repeated across modules with no shared context
- Pitch decks built from gut feel instead of confidence-weighted signals

Indian campaigns add complexity: regional languages, tier-2 growth, cricket culture, creator-first trust, and sponsorship routes that change seasonally.

### Solution

A single **brief → intelligence → action** pipeline:

1. **Scope for free** — discovery across trends, creators, celebrities, events
2. **Reason once** — Anakin live discovery + Groq/ChatGPT combined analysis, cached per brief
3. **Pay for strategy** — Basic (₹10K), Pro (₹50K), Superplan (custom) when ready to execute

---

## How the product works (user flow)

```
Landing (/) → Enter Platform (/dashboard)
    → Campaign Planner: paste brief
    → Generate Intelligence (API)
    → Brand DNA + Budget Optimizer
    → Audience / Trends / Creators / Celebrities / Events (section insights)
    → Opportunity Engine → Campaign Generator → Reports
    → Plans & Pricing when scoping is done
```

### Workflow stages

| Stage | What happens |
|-------|----------------|
| Client Brief | Natural language or structured form |
| Brand DNA | Archetype, voice, positioning, themes |
| Audience Intelligence | Communities, platforms, pain points |
| Trend Discovery | India 2026 momentum signals |
| Creator / Celebrity / Event Discovery | Ranked shortlists with scores |
| Opportunities & Campaign | Hooks, KPIs, timeline |
| Report | Export-ready strategy |

---

## Tech stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind 4 |
| API | Next.js Route Handlers (`src/app/api/`) |
| Discovery | Anakin Search API (WIRE) |
| Reasoning | Groq (preferred) or Anakin WIRE ChatGPT |
| Validation | Zod schemas |
| Caching | In-memory TTL cache (discovery 1h, analysis 30m, dashboard 45m) |
| Rate limiting | `src/lib/api/rate-limit.ts` |

---

## Backend architecture

### Intelligence pipeline

```
                    ┌─────────────────────┐
                    │   Client Brief      │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │ getCachedDiscovery  │  ← Anakin Search (1 discovery call)
                    │ (discovery-cache)   │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
     ┌────────▼────────┐ ┌─────▼─────┐ ┌───────▼────────┐
     │ Groq JSON       │ │ ChatGPT   │ │ Mock fallback  │
     │ (preferred)     │ │ WIRE      │ │ (no keys)      │
     └────────┬────────┘ └─────┬─────┘ └───────┬────────┘
              │                │                │
              └────────────────┼────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │ FullAnalysis JSON   │
                    │ brief, brandDNA,    │
                    │ budgetScenarios,    │
                    │ sections (6)        │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │ CampaignIntelligence│
                    │ + confidence score  │
                    └─────────────────────┘
```

### Key modules

| File | Role |
|------|------|
| `orchestrator.ts` | Credit-optimized full analysis (1 discovery + 1 LLM) |
| `discovery-cache.ts` | Shared Anakin search with TTL |
| `cache.ts` | General TTL cache for dashboard/analysis |
| `pipeline.ts` | Builds intelligence snapshot from analysis |
| `model.ts` | Legacy analyze/campaign + interpret helpers |
| `providers/groq.ts` | Groq API client |
| `providers/wire-chatgpt.ts` | Anakin WIRE ChatGPT action |
| `schemas.ts` | Zod validation + confidence computation |

### API routes

| Route | Purpose |
|-------|---------|
| `POST /api/reasoning/analyze` | Full brief analysis → intelligence |
| `POST /api/reasoning/campaign` | Campaign concept, hooks, KPIs, timeline |
| `GET /api/intelligence/dashboard` | Cached market discovery for dashboard |
| `POST /api/intelligence` | Ad-hoc intelligence query (rate limited) |
| `GET /api/intelligence` | Dashboard snapshot only (no LLM) |

### Credit optimization

- **One discovery call** per brief hash, shared across analyze + campaign
- **One combined LLM prompt** returns brief + brandDNA + budgets + all section insights
- **Dashboard** uses discovery cache only — no LLM on page load
- **Cache keys** include brief content hash to avoid duplicate spend

---

## Data layer

### Static (India 2026 seed)

- 15 creators (Instagram, YouTube, LinkedIn, Twitch, Spotify, WhatsApp)
- 12 celebrities (sports + film)
- 12 events (marathons, IPL, WPL, esports, festivals)
- Trends, audience themes, platform fit scores
- Monetization tier definitions

### Dynamic (from API)

- Brand DNA, budget scenarios, executive summary
- Per-section insights (audience, trends, creators, celebrities, events, opportunities)
- Discovery sources with titles/snippets
- Confidence score derived from wire response metadata

---

## Monetization model

| Tier | Price | For |
|------|-------|-----|
| **Free scoping** | ₹0 | All discovery modules, 15 demo prompts, unlimited brief tries |
| **Basic** | ₹10K/campaign | Strategy doc, audience fit, 3 budget scenarios |
| **Pro** | ₹50K/campaign | Hook bank, timeline, creator/event activation kit |
| **Superplan** | Custom | Automation, production assists, retainer intelligence |

See `/plans` in the app for full deliverable lists and marketing hooks.

---

## Environment variables

```env
ANAKIN_API_KEY=                    # Anakin platform key
ANAKIN_WIRE_CHATGPT_ACTION_ID=     # WIRE ChatGPT action ID
GROQ_API_KEY=                      # Groq API key (preferred reasoning)
GROQ_MODEL=llama-3.1-8b-instant    # Optional model override
```

---

## Deployment notes

- `npm run build` — production build (22+ routes)
- Server components for static pages; client components for workflow/API interactions
- All intelligence runs server-side; API keys never exposed to browser

---

## Related docs

- [FRONTEND.md](./FRONTEND.md) — UI structure, navigation, frontend ↔ API wiring
- [DEMO-PROMPTS.md](./DEMO-PROMPTS.md) — 15 copy-paste prompts for live demos

---

## Vision (India 2026+)

AdAlchemy is designed to become the **operating system for agency pitch and planning** in India: live cultural signals, confidence-weighted recommendations, and a clear path from free intelligence to paid execution — without locking discovery behind a paywall.
