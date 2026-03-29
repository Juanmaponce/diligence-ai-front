# Diligence AI — Frontend Documentation

## Overview

Diligence AI is a Next.js 16 web application that provides an AI-powered financial due diligence interface. Users upload financial documents (PDFs, spreadsheets, or raw text) and submit natural-language queries. A ReAct agent on the backend processes the documents and returns structured analysis: a risk level, key findings, step-by-step reasoning, and source citations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 + TypeScript |
| Styling | Tailwind CSS v4 + Radix UI |
| Data Fetching | TanStack React Query v5 |
| HTTP Client | Axios |
| Animations | Framer Motion |
| Icons | Lucide React |
| ID Generation | nanoid |

---

## Application Flow

The main interface (`/analyze`) is a **3-step wizard**:

### Step 1 — Upload Documents
Users provide documents in one of two ways:
- **File upload** — drag-and-drop or browse for PDF, XLS, or XLSX files (50 MB max). Files are validated by magic bytes before upload.
- **Raw text** — paste financial document content directly into a textarea (500 KB max).

A metadata form captures optional context: company name, fiscal year, and document type (e.g., Annual Report, Audit Report). A unique Document ID is auto-generated via `nanoid` but can be customized.

### Step 2 — Run Analysis
Users type a due diligence question (up to 5000 characters) or select from example templates. They choose which uploaded documents to include and set the maximum number of reasoning steps (1–10) for the agent.

### Step 3 — View Results
The results page displays:
- **Risk Level** — color-coded badge: Low / Medium / High / Critical
- **Final Answer** — the AI's written response to the query
- **Key Findings** — bulleted list of the most important findings
- **Reasoning Steps** — expandable log of the agent's thought → action → observation chain
- **Sources Used** — badges showing which documents were referenced

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Landing page with feature overview and CTA |
| `/analyze` | Main 3-step analysis wizard |

### API Proxy Routes (server-side)

These Next.js Route Handlers validate inputs and forward requests to the FastAPI backend.

| Route | Method | Purpose |
|---|---|---|
| `/api/proxy/health` | GET | Backend health check (polled every 30 s) |
| `/api/proxy/documents` | POST | Ingest raw text content |
| `/api/proxy/documents/upload` | POST | Upload a file (multipart/form-data) |
| `/api/proxy/analyze` | POST | Submit a query and run agent analysis |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with QueryProvider
│   ├── page.tsx                # Landing page
│   ├── analyze/
│   │   └── page.tsx            # 3-step wizard page
│   └── api/proxy/              # API proxy route handlers
│       ├── health/route.ts
│       ├── documents/route.ts
│       ├── documents/upload/route.ts
│       └── analyze/route.ts
├── components/
│   ├── layout/
│   │   └── Header.tsx          # Sticky nav with health indicator
│   ├── wizard/
│   │   ├── WizardShell.tsx     # Step container with animated indicators
│   │   ├── StepUpload.tsx      # Upload step logic
│   │   ├── StepQuery.tsx       # Query step logic
│   │   └── StepResults.tsx     # Results step logic
│   ├── upload/
│   │   ├── Dropzone.tsx        # Drag-and-drop file input
│   │   ├── RawTextInput.tsx    # Textarea for pasting text
│   │   ├── MetadataForm.tsx    # Company/year/type form
│   │   └── UploadStatus.tsx    # Progress and success/error states
│   ├── query/
│   │   └── QueryForm.tsx       # Query textarea, doc selector, step slider
│   ├── results/
│   │   ├── RiskBadge.tsx       # Color-coded risk level badge
│   │   ├── FinalAnswer.tsx     # AI answer display
│   │   ├── KeyFindings.tsx     # Findings list
│   │   ├── ReasoningSteps.tsx  # Expandable agent reasoning log
│   │   ├── SourcesBadges.tsx   # Source document badges
│   │   └── AnalysisLoading.tsx # Spinner, elapsed timer, skeleton loaders
│   └── ui/                     # Radix-based primitives (button, input, etc.)
├── hooks/
│   ├── useHealthCheck.ts       # Polls /api/proxy/health every 30 s
│   ├── useUploadDocument.ts    # Mutation for file uploads
│   ├── useIngestText.ts        # Mutation for raw text ingestion
│   └── useAnalyze.ts           # Mutation for running analysis (120 s timeout)
├── lib/
│   ├── api-client.ts           # Axios instance with base URL and API key
│   └── utils.ts                # Tailwind class merge utility
├── providers/
│   └── QueryProvider.tsx       # TanStack Query client setup
├── types/
│   └── api.ts                  # TypeScript interfaces for all API shapes
└── constants.ts                # Risk level styles, loading messages, doc types
```

---

## Key Data Types

```typescript
type RiskLevel = "low" | "medium" | "high" | "critical"

interface UploadedDocument {
  doc_id: string
  filename?: string
  source: "file" | "text"
  metadata: { company?: string; year?: number; type?: string }
  chunks_created: number
}

interface AnalyzeResponse {
  reasoning_steps: ReasoningStep[]
  final_answer: string
  risk_level: RiskLevel
  key_findings: string[]
  sources_used: string[]
}

interface ReasoningStep {
  step_number: number
  thought: string
  action: string
  observation: string
}
```

---

## Environment Variables

Create a `.env.local` file at the project root:

```env
API_BASE_URL=http://localhost:8000   # FastAPI backend URL
API_KEY=                             # Optional API key for upstream auth
API_VERSION=v1
```

---

## Running Locally

```bash
npm install
npm run dev        # http://localhost:3000
```

The FastAPI backend must be running at `API_BASE_URL` for analysis features to work. The header displays a live connectivity indicator based on the health check.

---

## Input Validation & Security

- **Document ID** — alphanumeric, hyphens, underscores only; 1–64 characters
- **Query** — required, max 5000 characters
- **Text content** — max 500 KB
- **File types** — PDF, XLS, XLSX only (validated by magic bytes client-side and server-side)
- **File size** — 50 MB max
- **Security headers** — HSTS, X-Frame-Options: DENY, CSP, Permissions-Policy
- **Timeouts** — health: 10 s, text ingest: 60 s, file upload/analyze: 120 s
