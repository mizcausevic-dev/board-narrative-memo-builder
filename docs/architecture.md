# Architecture

Board Narrative Memo Builder is a static-friendly TypeScript executive-intelligence layer for the Kinetic Gain board, diligence, and procurement estate.

## Core flow

- `src/data/sampleVerticalBrief.ts` models executive narrative tracks across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness.
- `src/analyze.ts` scores risk, savings potential, investment priority, confidence, and recommendation strength while generating narrative findings.
- `src/services/verticalBriefService.ts` exposes the memo-lane, narrative-gap, investment-posture, and risk-map packets used by both the app and prerender step.
- `src/services/render.ts` turns those packets into board-readable HTML routes plus a sample export.
- `scripts/prerender.ts` produces the static site and JSON payloads for GitHub Pages.

## Output shape

Each track is designed to answer the same executive questions:

- where are we exposed
- where can we save money
- where should we invest
- what story do we tell the board or investors

## Guardrails

- synthetic data only
- read-only public surface
- no tenant credentials or private documents
- no compliance overclaim language
