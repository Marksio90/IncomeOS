# IncomeOS — Your AI-Powered Income Operating System

IncomeOS connects skills diagnosis, monetization path selection, artifact creation, workflow automation, and revenue monitoring in a single AI-driven platform. Built for creators, freelancers, and solopreneurs.

## Architecture

```
frontend/          Next.js 15 (App Router) + Tailwind CSS + shadcn/ui
backend/           FastAPI + OpenAI Agents (Python)
supabase/          Database schema (PostgreSQL + pgvector)
```

### Tech Stack

**Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, Zustand, Vercel AI SDK

**Backend:** FastAPI, OpenAI Agents SDK, Pydantic, Celery + Redis, SSE streaming

**Data:** Supabase (PostgreSQL + pgvector), Redis

**Auth:** Clerk | **Payments:** Stripe | **Deployment:** Vercel + Railway

## Core Features

| Feature | Description |
|---------|-------------|
| **Skills Diagnosis** | AI analyzes your skills and scores monetization potential |
| **Monetization Paths** | Personalized revenue stream recommendations with implementation plans |
| **Content Creation** | AI agents create courses, templates, marketing materials |
| **Workflow Automation** | Automate repetitive income-generating tasks |
| **Revenue Monitoring** | Unified dashboard tracking all income streams |
| **AI Coach** | 24/7 AI advisor for personalized income optimization |

## AI Agent System

Hierarchical supervisor architecture with 4 agents:

- **Router Agent** — Classifies user intent (fast model, low cost)
- **Skills Diagnosis Agent** — Analyzes skills and monetization potential
- **Content Creation Agent** — Generates courses, templates, and marketing content
- **Revenue Tracking Agent** — Analyzes income data and suggests optimizations

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.11+
- Redis (for task queue)

### Backend

```bash
cd backend
cp .env.example .env    # Fill in your API keys
pip install -e ".[dev]"
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
cp .env.example .env.local    # Fill in your keys
npm install
npm run dev
```

### Docker

```bash
docker compose up
```

### Running Tests

```bash
cd backend
pytest tests/ -v
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/skills/diagnose` | Run AI skills diagnosis |
| GET | `/api/v1/skills/profile` | Get skill profile |
| GET | `/api/v1/monetization/paths` | Get monetization recommendations |
| POST | `/api/v1/monetization/paths/{id}/plan` | Generate implementation plan |
| GET | `/api/v1/revenue/overview` | Revenue dashboard data |
| GET | `/api/v1/revenue/insights` | AI revenue insights |
| POST | `/api/v1/chat/message` | Send message to AI Coach |
| GET | `/api/v1/workflows/` | List workflows |
| POST | `/api/v1/workflows/` | Create workflow |
| GET | `/api/v1/user/profile` | Get user profile |
| GET | `/api/v1/user/credits` | Get AI credit balance |

## Pricing Tiers

| Tier | Price | AI Credits | Workflows |
|------|-------|------------|-----------|
| Explorer | Free | 50/month | 3 |
| Builder | $29/month | 500/month | 5 |
| Operator | $49/month | 2,000/month | 25 |
| CEO | $99/month | 5,000/month | Unlimited |

## Project Structure

```
IncomeOS/
├── frontend/
│   ├── src/
│   │   ├── app/                  # Next.js App Router pages
│   │   │   ├── dashboard/        # Dashboard (overview, skills, monetize, revenue, chat, workflows, settings)
│   │   │   ├── layout.tsx        # Root layout
│   │   │   └── page.tsx          # Landing page
│   │   ├── components/
│   │   │   └── ui/               # shadcn/ui components
│   │   ├── lib/                  # Utilities and API client
│   │   └── stores/               # Zustand state management
│   ├── package.json
│   └── next.config.ts
├── backend/
│   ├── app/
│   │   ├── agents/               # AI agent system
│   │   │   ├── orchestrator.py   # Agent pipeline orchestrator
│   │   │   ├── router.py         # Intent classification agent
│   │   │   ├── skills_diagnosis.py
│   │   │   ├── content_creation.py
│   │   │   └── revenue_tracking.py
│   │   ├── api/                  # FastAPI route handlers
│   │   ├── core/                 # Config and dependencies
│   │   ├── schemas/              # Pydantic request/response models
│   │   └── main.py              # FastAPI application
│   ├── tests/
│   └── pyproject.toml
├── supabase/
│   └── schema.sql                # Database schema with RLS
├── docker-compose.yml
└── .github/workflows/ci.yml
```

## Regulatory Compliance

- **EU AI Act:** Limited risk classification with Article 50 transparency compliance
- **GDPR:** Data processing via business API (no model training on user data)
- **FTC:** No income guarantees — all suggestions framed as educational tools
- **Disclaimers:** Present throughout the platform on all revenue estimates

## License

MIT
