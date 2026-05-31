# Reusable AI Project Blueprint

Use this as the starter README for future projects that follow the same shape as Commercial AdAlchemy: a polished Next.js UI, a backend intelligence layer, Anakin API discovery, ChatGPT/Groq reasoning, cached results, and real-world media.

## Core Architecture

```txt
User interface
  -> Next.js API route
  -> validate and rate-limit request
  -> cached discovery/search through Anakin
  -> optional extra backend API calls
  -> reasoning model: Groq or Anakin WIRE ChatGPT
  -> Zod validation / JSON cleanup
  -> normalized app data
  -> React context or page state renders UI
```

The frontend should never call Anakin, ChatGPT, Groq, search APIs, scraping APIs, or paid APIs directly. The browser sends a clean product request to `/api/...`; the backend owns secrets, prompt construction, retries, caching, source handling, and response validation.

## Folder Pattern

```txt
src/
  app/
    (marketing)/             public landing pages
    (platform)/              actual product UI
    api/                     backend route handlers
  components/
    layout/                  sidebar, header, nav, progress
    ui/                      reusable buttons, cards, badges, image wrappers
    intelligence/            reusable AI result panels
  context/                   workflow or project state
  lib/
    api/                     validation, rate limiting, safe errors
    data/                    seed catalogs and demo prompts
    intelligence/            providers, cache, orchestration, prompts, schemas
    types/                   shared app types
```

Keep the product UI in route groups such as `(platform)` and keep backend code under `src/lib/intelligence`. That separation makes it easy to reuse the architecture for another domain without dragging UI decisions into provider logic.

## Backend Connection

Every AI feature should follow this contract:

1. Frontend sends a small typed payload.
2. API route sanitizes text and rejects bad input.
3. API route rate-limits by client/IP/session.
4. Orchestrator builds one combined job for the backend.
5. Discovery/search runs first and is cached by brief/query hash.
6. Reasoning model receives source evidence plus strict output instructions.
7. Backend parses and validates with Zod.
8. Frontend receives ready-to-render JSON, not raw model text.

Example routes:

```txt
POST /api/reasoning/analyze       full project/brief analysis
POST /api/reasoning/campaign      campaign or plan generation
GET  /api/intelligence/dashboard  cached dashboard snapshot, no LLM spend
POST /api/intelligence            ad-hoc search/reasoning query
```

## Provider Strategy

Use providers as small wrappers:

```txt
providers/anakin-discovery.ts     search/live source discovery
providers/wire-chatgpt.ts         Anakin WIRE ChatGPT prompt action
providers/groq.ts                 cheap/fast structured reasoning
```

Recommended behavior:

- Use Anakin discovery for live sources, news, creators, events, products, and source URLs.
- Use Groq or another fast JSON model for structured output when sources are already available.
- Use Anakin WIRE ChatGPT when you need ChatGPT browsing/reasoning behavior.
- Keep provider files boring: accept input, call API, return normalized data, throw useful errors.
- Keep prompt logic in `prompts.ts`, not inside route handlers.

## Environment Variables

```env
ANAKIN_API_KEY=
ANAKIN_WIRE_CHATGPT_ACTION_ID=
GROQ_API_KEY=
GROQ_MODEL=llama-3.1-8b-instant
```

Rules:

- Never expose these in client components.
- Never prefix secret keys with `NEXT_PUBLIC_`.
- Read them only from backend modules.
- Put placeholder names in `.env.example`, real keys in `.env.local`.

## Prompt Design

Prompts should not be fake demo text hidden inside the product. They should be reusable instructions that force the model to work from user input and source evidence.

Good prompt rules:

- Include the user brief exactly once.
- Include live source snippets separately from instructions.
- Ask for strict JSON with known keys.
- Tell the model to say `unknown` or use low confidence when evidence is missing.
- Ban invented statistics, fake citations, and fake names.
- Request `sourceUrl`, `sourceTitle`, and `reason` for recommendations.

Bad patterns:

- Hardcoding impressive-sounding insights into prompts.
- Asking for "viral" or "best" without evidence.
- Letting the model invent creator handles, event dates, prices, or follower counts.
- Rendering raw model prose directly in UI.
- Calling many APIs from the browser to make the app look live.

## Avoiding Fake-Looking Results

The app feels fake when seed data is generic, images are random, numbers have no source, and the model always sounds confident. For realistic projects:

- Store `sourceUrl`, `sourceTitle`, `sourceDate`, and `confidence` with every item.
- Show "verified", "estimated", or "fallback" states in the UI.
- Separate static seed data from live API results.
- Prefer fewer real items over many invented items.
- Make fallback data visibly conservative.
- Cache live results, but include `generatedAt` so users know freshness.

## Real Image Policy

Do not use random AI-generated photos for real events, creators, celebrities, products, or places. It breaks trust immediately.

Use this data shape:

```ts
type MediaAsset = {
  imageUrl: string;
  imageSourceUrl: string;
  imageCredit?: string;
  imageLicense?: string;
  imageVerifiedAt: string;
  imageKind: "official" | "wikimedia" | "press" | "social" | "fallback";
};
```

Source priority:

1. Official event, creator, celebrity, brand, venue, or team website.
2. Official press kit or media kit.
3. Wikimedia Commons when licensing is clear.
4. Official social profile image when terms allow it.
5. Neutral fallback category image only when no real image is available.

Implementation notes:

- Keep image discovery on the backend.
- Do not hotlink random web images without checking usage rights.
- Store the source page, not just the image URL.
- Use `SafeImage` or an equivalent wrapper for broken images.
- Label fallback images internally so they are not confused with verified real photos.
- For celebrities and creators, prefer verified profile/headshot pages over generic stock portraits.
- For events, prefer official event galleries, venue pages, press photos, or Wikimedia photos of the actual venue/event.

## Calling Many APIs Without Chaos

It is okay for the backend to call many APIs, but it should be deliberate and invisible to the UI.

Use this pattern:

```txt
frontend request
  -> orchestrator
  -> one required discovery call
  -> optional parallel enrichment calls
  -> merge/dedupe sources
  -> one reasoning call
  -> cache final result
```

Guardrails:

- Deduplicate queries before calling providers.
- Set per-provider timeouts.
- Cache by normalized query/brief hash.
- Put expensive enrichments behind feature flags or background jobs.
- Return partial results if one enrichment fails.
- Track `apiCallCount`, `cacheHit`, and `sourceCount` in metadata.
- Never let a page load trigger expensive LLM calls unless the user clicked an action.

## UI Construction

The UI should be built around real workflows, not a landing-page shell.

Recommended structure:

- Marketing route: short pitch, trust, CTA.
- Platform route: sidebar, dashboard, workflow modules.
- Workflow context: stores the current brief/project and AI output.
- Section pages: render static catalog plus brief-specific intelligence.
- Badges: show source, confidence, citations, cache status.
- Empty states: ask for a brief or show conservative seed data.

For each module, define:

```txt
What user enters
What API route is called
What JSON shape returns
What component renders it
What fallback appears if API fails
```

## Validation And Types

Use shared schemas for model output. Treat model responses as untrusted input.

Checklist:

- `schemas.ts` defines strict output shape.
- API routes parse request bodies with helpers in `lib/api/validate.ts`.
- Backend strips unsafe text length and unexpected fields.
- UI components receive typed props, not loose `any`.
- Unknown or missing data renders gracefully.

## Caching And Cost Control

Use separate TTLs:

```txt
discovery:  1 hour
analysis:   30 minutes
dashboard:  45 minutes
campaign:   30 minutes
```

Cost rules:

- Dashboard should use cached discovery only.
- Full analysis should combine sections into one model call.
- Campaign generation should reuse the same discovery cache.
- Keep a mock/fallback path for development without keys.
- Log cache hits during development.

## New Project Checklist

1. Create Next.js app with App Router, TypeScript, Tailwind, and route groups.
2. Add `.env.example` for Anakin, ChatGPT WIRE, and optional Groq.
3. Build `lib/intelligence/providers/*` wrappers.
4. Build `lib/intelligence/cache.ts`, `prompts.ts`, `schemas.ts`, and `orchestrator.ts`.
5. Add API routes that only call orchestrator functions.
6. Add workflow context for the main user journey.
7. Build UI pages from reusable cards, badges, catalog panels, and result panels.
8. Add seed data, clearly marked as fallback.
9. Add real media fields and source metadata before showing real people/events.
10. Test with no keys, partial keys, and full live keys.
11. Verify the app does not leak secrets to client bundles.
12. Run lint/build before handoff.

## Copy This Principle

The product should feel like:

```txt
real user input
  + real sources
  + backend-controlled API calls
  + validated structured reasoning
  + honest confidence labels
  + real photos with source metadata
```

Not like:

```txt
fake prompt
  + random image
  + invented numbers
  + direct browser API calls
  + always-confident AI prose
```

