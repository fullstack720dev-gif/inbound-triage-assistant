# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This repo is currently just a freshly scaffolded Next.js app (`create-next-app` boilerplate, single commit). The actual product to build is specified in `docs/assessment-brief.md` — a take-home exercise called the **"Inbound Triage Assistant."** Read that file in full before doing any feature work; it is the source of truth for scope, constraints, and deliverables, not this file.

Brief summary of the target build: a small tool that reads a fixed set of ~13 inbound messages (`inbound.json`, sample data included in the brief's Appendix A), calls an LLM once per message to produce a structured triage result (summary, category, priority, suggested next action), and displays results in a simple front end. It must keep working when a message is malformed or the LLM call fails.

Deliverables per the brief include a `prompts/` folder (prompt text + a few lines on structure/validation approach), a `RATIONALE.md` or README section answering the brief's Engineering Rationale questions, and a `.env.example` with no real secrets committed.

## Project rules

These are project-specific decisions that override or narrow the brief's open choices. Follow them without re-asking:

- Build the **smallest valid solution** that satisfies the assessment brief — no gold-plating.
- Stack is fixed: **Next.js, React, TypeScript, App Router**.
- Use **pnpm** for every package and script command (`pnpm add`, `pnpm dev`, `pnpm lint`, etc.) — never `npm`/`yarn`/`npx`.
- The **LLM API key must stay server-side** — never shipped to the browser or referenced from client components.
- **Data source is a local JSON file** (`inbound.json`) — no Airtable, no SQLite, no external DB.
- **Validate all LLM structured output** (e.g. with `zod`) before trusting or displaying it.
- **Handle malformed messages and API errors per item** — one bad item must never take down the list or the rest of the run.
- **Do not add**: authentication, deployment/Docker setup, telemetry, multi-user functionality, RAG, a vector database, or any other feature not called for by the brief.
- **Work in small stages.** Before starting each implementation stage, explain the plan for that stage first.
- **After each stage**, run `pnpm lint` and `pnpm build` and resolve any failures before moving on.
- **Do not create Git commits or push code** unless explicitly requested for that specific action.
- **Do not write a fake/example model-error case or a final Engineering Rationale** until after the app has actually been run against the real data and the real model output has been reviewed — those sections must reflect genuine observed behavior, not a plausible-sounding guess.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml` / `pnpm-workspace.yaml`).

```bash
pnpm dev      # start dev server (Next.js, default port 3000)
pnpm build    # production build
pnpm start    # run production build
pnpm lint     # eslint (flat config, eslint.config.mjs)
```

There is no test runner configured in `package.json` yet — if tests are added, wire the command into `package.json` and document it here.

## Architecture

- **Next.js 16, App Router, TypeScript, React 19.** Entry point is `app/layout.tsx` (root layout, Geist fonts) and `app/page.tsx` (home page) — both currently unmodified boilerplate.
- **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss` (see `postcss.config.mjs`); no separate `tailwind.config` file is needed under v4's CSS-first config (check `app/globals.css` for `@theme`/tokens when styling).
- **Path alias:** `@/*` maps to the repo root (`tsconfig.json`).
- **ESLint:** flat config (`eslint.config.mjs`) extending `eslint-config-next`'s core-web-vitals and typescript rule sets.
- **LLM integration dependency already installed:** `@anthropic-ai/sdk` — the intended provider is Claude, called from server-side code only (API route handler under `app/api/**/route.ts` is the natural place). `zod` is installed for validating/parsing the LLM's structured JSON output — use it to enforce the triage schema (summary/category/priority/next action) and to gracefully reject malformed model output rather than trusting it blindly.
- No data-fetching, state-management, or component library conventions exist yet — the first feature PR will establish them. Prefer Server Components/Route Handlers for the LLM call and any file/DB access; keep client components limited to interactive UI (list, filters, loading/error states).
