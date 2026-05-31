# AdAlchemy

<p align="center">
  <img src="https://img.shields.io/badge/AI-Marketing%20Intelligence-blue" />
  <img src="https://img.shields.io/badge/Built%20with-Anakin%20Wire-orange" />
  <img src="https://img.shields.io/badge/Next.js-16-black" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue" />
  <img src="https://img.shields.io/badge/Status-Live-success" />
</p>

<p align="center">
  <strong>AI-Powered Marketing Campaign Intelligence & Research Platform</strong>
</p>

<p align="center">
  Transform a simple marketing brief into audience intelligence, trend discovery, creator recommendations, celebrity matching, event sponsorship opportunities, budget optimization, and complete campaign strategies.
</p>

---

## Live Demo

🌐 **Application:** https://adalchemy.vercel.app

🎥 **Demo Video:** https://drive.google.com/file/d/1sDUqlb3PMKBIJacG91TShqSSJAj3hiAS/view?usp=drive_link

---

# Problem

Modern marketing campaigns are still built through fragmented research.

Before launching a campaign, teams often spend days or weeks:

- Researching trends
- Finding creators and influencers
- Tracking celebrities
- Discovering sponsorship opportunities
- Evaluating events
- Understanding audience behavior
- Comparing advertising platforms
- Building campaign strategies
- Allocating budgets

This process is spread across dozens of tools, spreadsheets, reports, websites, social platforms, and AI applications.

The information exists.

The intelligence does not.

---

# Solution

**AdAlchemy** is an AI-powered Marketing Campaign Intelligence Platform that transforms a simple campaign brief into a complete intelligence workflow.

Users provide:

- Brand information
- Campaign goals
- Budget
- Target audience
- Timeline
- Geography

AdAlchemy automatically generates:

- Brand DNA
- Audience Intelligence
- Trend Analysis
- Creator Recommendations
- Celebrity Recommendations
- Event Intelligence
- Sponsorship Opportunities
- Platform Selection
- Budget Allocation
- Campaign Concepts
- Execution Roadmaps
- KPIs and Success Metrics

Instead of spending days researching, teams receive actionable recommendations within minutes.

---

# What Makes AdAlchemy Different

Most marketing tools focus on one problem.

Some help discover creators.

Some help analyze trends.

Some help generate content.

AdAlchemy connects everything together into a single intelligence workflow.

```text
Campaign Brief
        ↓
Brand DNA
        ↓
Audience Intelligence
        ↓
Trend Discovery
        ↓
Creator Discovery
        ↓
Celebrity Discovery
        ↓
Event Intelligence
        ↓
Opportunity Engine
        ↓
Budget Optimization
        ↓
Campaign Generation
        ↓
Strategy Report
```

---

# Built for the Anakin Build-a-thon

AdAlchemy was built during the **Anakin Build-a-thon** using:

### Anakin Wire

Used for structured intelligence gathering across:

- YouTube
- Google Trends
- Reddit
- Google News
- Reuters
- Product Hunt
- Hacker News
- IMDb
- TMDB
- Spotify
- Steam
- Medium
- Substack

### Anakin Search

Used for:

- Topic Discovery
- Trend Discovery
- Market Research
- Opportunity Discovery

### Anakin Agentic Search

Used for:

- Deep Research
- Multi-source Analysis
- Intelligence Validation

### Anakin Scraper

Used for:

- Event Discovery
- Sponsorship Discovery
- Market Research
- Niche Source Extraction

### Anakin Crawler

Used for:

- Deep Topic Exploration
- Ecosystem Mapping
- Relationship Discovery

---

# Product Architecture

```text
                        USER BRIEF
                              │
                              ▼
                 Campaign Intelligence Engine
                              │
      ┌───────────────────────┼───────────────────────┐
      │                       │                       │
      ▼                       ▼                       ▼

 Anakin Search         Wire Intelligence       Crawl & Scrape
 Topic Discovery       Structured Data         Deep Discovery

      │                       │                       │
      └───────────────────────┼───────────────────────┘
                              ▼

                    Intelligence Layer

          Audience • Trends • Creators
          Celebrities • Events • News
          Sponsorship Opportunities

                              ▼

                      Reasoning Layer

                    Groq + ChatGPT WIRE

                              ▼

                     Validation Engine

                  Confidence & Evidence

                              ▼

                  Campaign Intelligence

      Budget • Strategy • Hooks • KPIs
      Concepts • Timelines • Reports
```

---

# Intelligence Architecture

AdAlchemy follows a six-layer intelligence pipeline.

## Layer 1 — Campaign Brief

Collects:

- Brand
- Budget
- Audience
- Goal
- Timeline
- Geography

---

## Layer 2 — Discovery Engine

Discovers:

- Trends
- Communities
- Events
- Creators
- Topics

Using:

- Search
- Crawl
- Scrape
- Wire APIs

---

## Layer 3 — Knowledge Layer

Builds:

- Brand Context
- Audience Context
- Trend Context
- Opportunity Context

---

## Layer 4 — Reasoning Layer

Uses:

- Groq
- ChatGPT via Anakin Wire

To generate:

- Insights
- Recommendations
- Strategies

---

## Layer 5 — Validation Layer

Computes:

- Confidence Scores
- Evidence Strength
- Signal Validation

---

## Layer 6 — Campaign Layer

Generates:

- Campaign Concepts
- Creator Plans
- Sponsorship Strategies
- Budget Allocations
- Execution Roadmaps

---

# Core Features

### Campaign Planner

Transform campaign briefs into intelligence.

### Brand DNA Engine

Generate:

- Brand Archetype
- Brand Voice
- Brand Positioning
- Core Themes

### Audience Intelligence

Discover:

- Communities
- Interests
- Pain Points
- Motivations

### Trend Discovery

Identify:

- Emerging Trends
- Cultural Moments
- Industry Signals

### Creator Intelligence

Recommend:

- Influencers
- Content Creators
- Audience Match Scores

### Celebrity Intelligence

Recommend:

- Athletes
- Actors
- Musicians
- Public Figures

### Event Intelligence

Discover:

- Sports Events
- Festivals
- Conferences
- Sponsorship Opportunities

### Budget Optimizer

Generate:

- Multiple Budget Scenarios
- Resource Allocation Plans
- Expected Impact

### Campaign Generator

Create:

- Campaign Concepts
- Hooks
- Messaging
- Content Ideas
- Timelines
- KPIs

---

# Technology Stack

| Layer | Technology |
|---------|------------|
| Frontend | Next.js 16 |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Validation | Zod |
| AI Reasoning | Groq |
| Discovery | Anakin Search |
| Intelligence | Anakin Wire |
| Deep Research | Agentic Search |
| Extraction | Scraper |
| Discovery Engine | Crawler |
| Deployment | Vercel |

---

# Project Structure

```text
src/
├── app/
│   ├── dashboard/
│   ├── api/
│   └── intelligence/
│
├── components/
│
├── lib/
│   ├── intelligence/
│   ├── providers/
│   ├── cache/
│   └── reasoning/
│
├── hooks/
├── types/
└── utils/
```

---

# Environment Variables

Create a `.env.local` file.

```env
ANAKIN_API_KEY=

ANAKIN_WIRE_CHATGPT_ACTION_ID=

GROQ_API_KEY=

GROQ_MODEL=llama-3.1-8b-instant
```

---

# Local Development

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

Run production server:

```bash
npm start
```

---

# Documentation

| Document | Description |
|-----------|------------|
| docs/FRONTEND.md | Frontend architecture and navigation |
| docs/DEMO-PROMPTS.md | Demo campaign prompts |
| docs/PRODUCT-AND-ARCHITECTURE.md | Product vision and architecture |
| docs/REUSABLE-PROJECT-BLUEPRINT.md | Reusable system blueprint |
| docs/VERCEL-DEPLOYMENT.md | Deployment instructions |

The architecture and workflow described in the project documentation form the foundation of AdAlchemy's intelligence pipeline and campaign workflow. :contentReference[oaicite:0]{index=0}

---

# Vision

AdAlchemy aims to become the operating system for marketing research and campaign planning.

Instead of manually gathering information from dozens of sources, brands and agencies can interact with a single intelligence layer that discovers opportunities, validates signals, and generates actionable marketing strategies.

The long-term vision is simple:

**Give us a brief. Receive a complete campaign intelligence blueprint.**

---

# Author

Built during the **Anakin Build-a-thon 2026**

**Project:** AdAlchemy

**Live Demo:** https://adalchemy.vercel.app

**Demo Video:** https://drive.google.com/file/d/1sDUqlb3PMKBIJacG91TShqSSJAj3hiAS/view?usp=drive_link

---

If you found this project interesting, feel free to star the repository.
