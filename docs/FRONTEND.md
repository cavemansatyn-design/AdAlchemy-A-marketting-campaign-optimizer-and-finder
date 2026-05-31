# Frontend Architecture — Commercial AdAlchemy

This document explains how the frontend is built, how navigation works, and how it connects to the backend intelligence layer.

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS 4, custom design tokens (dark editorial theme) |
| Fonts | Geist Sans/Mono + Playfair Display (display headlines) |
| Icons | Material Symbols Outlined |

## Project structure

```
src/
├── app/
│   ├── (marketing)/          # Public landing — no sidebar
│   │   ├── layout.tsx
│   │   └── page.tsx          # / — hero, features, CTA
│   └── (platform)/           # Authenticated-style app shell
│       ├── layout.tsx        # Sidebar + BrandMarquee + WorkflowProvider
│       ├── dashboard/        # /dashboard — intelligence home
│       ├── campaign-planner/ # Brief entry + Brand DNA
│       ├── audience/         # … workflow modules
│       ├── creators/
│       ├── celebrities/
│       ├── events/
│       ├── plans/
│       └── …
├── components/
│   ├── layout/               # AppHeader, Sidebar, WorkflowProgress
│   ├── dashboard/            # DashboardView
│   ├── intelligence/         # SectionIntelligence (brief-driven insights)
│   └── ui/                   # GlassCard, ScoreBadge, ReasoningBadge
├── context/
│   └── WorkflowContext.tsx   # Global campaign state
└── lib/
    ├── navigation.ts         # MAIN_NAV sidebar items
    ├── data/                 # India 2026 seed data, sample prompts
    └── intelligence/         # Server-side pipeline (called via API routes)
```

## Route groups

### Marketing (`/`)

- **Purpose:** Landing page explaining the product, problem, and how AdAlchemy helps agencies.
- **Layout:** Full-width, no sidebar.
- **CTAs:** Enter Platform → `/dashboard`, Start Brief → `/campaign-planner`, Plans → `/plans`.

### Platform (`/dashboard`, `/campaign-planner`, …)

- **Layout:** Left sidebar (`Sidebar.tsx`), top `BrandMarquee`, `WorkflowProvider` wrapping all pages.
- **Header:** `AppHeader` per page with title and optional Execute action.

## UI navigation plan

### Primary sidebar (`MAIN_NAV` in `src/lib/navigation.ts`)

| Label | Route | Workflow stage |
|-------|-------|----------------|
| Dashboard | `/dashboard` | — |
| Campaign Planner | `/campaign-planner` | brief |
| Audience Intelligence | `/audience` | audience |
| Creator Intelligence | `/creators` | creators |
| Celebrity Intelligence | `/celebrities` | celebrities |
| Event Intelligence | `/events` | events |
| Platform Intelligence | `/platforms` | platforms |
| Trend Radar | `/trends` | trends |
| Culture Radar | `/culture` | — |
| Opportunity Engine | `/opportunities` | opportunities |
| Campaign Generator | `/generator` | campaign |
| Plans & Pricing | `/plans` | — |
| Reports | `/reports` | report |
| Projects | `/projects` | — |
| Settings | `/settings` | — |

### Workflow stepper (`WorkflowProgress`)

Shown on workflow pages. Stages from `WORKFLOW_STAGES`:

1. Client Brief → `/campaign-planner`
2. Brand DNA → `/campaign-planner` (same page, post-analysis)
3. Audience Intelligence → `/audience`
4. Trend Discovery → `/trends`
5. Creator Discovery → `/creators`
6. Celebrity Discovery → `/celebrities`
7. Event Discovery → `/events`

**Completion rules (fixed):**

- Green checkmarks appear only for stages in `completedStages`.
- Navigating via stepper links does **not** auto-complete stages.
- `completeStage()` is called explicitly (e.g. “Continue to Audience” after Brand DNA).
- `goToStage()` only updates the active highlight.

## State management

`WorkflowContext` holds:

- `brief`, `brandDNA`, `budgetScenarios`
- `intelligence` (full `CampaignIntelligence` from API)
- `currentStage`, `completedStages`
- `pipelineStatus`: idle | loading | ready

Key actions:

- `setAnalysisResult()` — after `POST /api/reasoning/analyze`; marks **brief** complete, moves to brand-dna.
- `setIntelligence()` — attaches section insights to all modules.
- `completeStage()` / `goToStage()` — user-driven progress.

## Backend connection (frontend → API)

| Frontend action | API route | Method |
|-----------------|-----------|--------|
| Generate Intelligence (Campaign Planner) | `/api/reasoning/analyze` | POST |
| Campaign Generator | `/api/reasoning/campaign` | POST |
| Dashboard load | `/api/intelligence/dashboard` | GET |
| Intelligence search | `/api/intelligence` | GET / POST |

### Analyze flow (Campaign Planner)

```
User brief (natural or structured)
    → POST /api/reasoning/analyze
    → orchestrator.runFullAnalysis()
        → Anakin discovery (cached)
        → Groq OR ChatGPT WIRE (single combined JSON call)
    → Response: brief, brandDNA, budgetScenarios, intelligence, confidence, meta
    → WorkflowContext.setAnalysisResult + setIntelligence
    → SectionIntelligence on each module reads project.intelligence.sections.*
```

### Dashboard flow

```
DashboardView mount
    → GET /api/intelligence/dashboard
    → Cached Anakin discovery (no LLM burn)
    → Metrics, feed, hero headline from live sources
    → Confidence ring uses brief-specific score when user has run analyze
```

## Data on the frontend

1. **Static seed data** — `src/lib/data/india-2026.ts` + `india-2026-extra.ts`  
   Creators, celebrities, events, trends, monetization plans, platform stats.

2. **Sample prompts** — `src/lib/data/sample-prompts.ts`  
   15 copy-paste briefs on Campaign Planner.

3. **Dynamic intelligence** — from API after brief analysis; rendered by `SectionIntelligence` per section.

4. **Fallback mocks** — `mock-dashboard.ts` when discovery API unavailable.

## Key UI components

- **GlassCard** — primary surface container (dark glass aesthetic).
- **ReasoningBadge** — model source, citations count, dynamic confidence %.
- **ScoreBadge / ScoreRing** — proprietary-style scores.
- **SectionIntelligence** — brief-driven paragraph at top of intelligence pages.
- **BrandMarquee** — trusted brand ticker in platform layout.

## Running locally

```bash
cd commercial-adalchemy
npm install
npm run dev    # http://localhost:3000 — landing
               # http://localhost:3000/dashboard — app
```

Configure `.env.local` for live reasoning (see root README or PRODUCT doc).

## Design notes

- Dark background, gold primary accent, green for verified/complete states.
- Display headlines use Playfair; data labels use mono (`font-data-mono`).
- Workflow labels use `whitespace-nowrap` + horizontal scroll to avoid truncation.
- Dashboard hero uses flex layout (no absolute positioning) to prevent score ring clipping.
