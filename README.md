# Commercial AdAlchemy

AI-powered Marketing Intelligence Platform for agencies.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, or [http://localhost:3000/dashboard](http://localhost:3000/dashboard) for the app.

## Documentation

| Doc | Description |
|-----|-------------|
| [docs/FRONTEND.md](docs/FRONTEND.md) | Frontend structure, navigation, API wiring |
| [docs/DEMO-PROMPTS.md](docs/DEMO-PROMPTS.md) | 15 copy-paste briefs for live API demos |
| [docs/PRODUCT-AND-ARCHITECTURE.md](docs/PRODUCT-AND-ARCHITECTURE.md) | Idea, problem, solution, backend flow, tech stack |
| [docs/REUSABLE-PROJECT-BLUEPRINT.md](docs/REUSABLE-PROJECT-BLUEPRINT.md) | Reusable architecture guide for future Anakin + ChatGPT projects |

## Architecture

- **Unified Intelligence Layer** (`src/lib/intelligence/`) — all data sources feed one API
- **Workflow Context** — connected agency flow from Client Brief → Report
- **Design System** — dark editorial glassmorphism from `stitch_commercial_adalchemy/adalchemy/DESIGN.md`

## Environment Variables

Copy `.env.example` to `.env.local`:

```env
ANAKIN_API_KEY=ak-your-key
ANAKIN_WIRE_CHATGPT_ACTION_ID=your-chatgpt-prompt-action-id
GROQ_API_KEY=                          # optional fallback
```

### ChatGPT WIRE (Reasoning Model)

The platform uses **Anakin WIRE → ChatGPT Prompt** as its primary reasoning layer for:

- Brand DNA analysis (Campaign Planner)
- Budget scenario generation
- Campaign concept generation
- Intelligence query interpretation

Wire returns structured output including `answer_text`, `citations`, `search_sources`, and `web_search_triggered` — used to compute confidence scores.

## Core Flow

Client Brief → Brand DNA → Audience → Trends → Creators → Celebrities → Events → Platforms → Opportunities → Budget → Campaign → Report
