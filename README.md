# Work Partner MVP

Work Partner is a browser-based learning companion MVP built with Vite, React, TypeScript, React Router, Dexie, and Vitest. It combines goal-driven task generation, a virtual pet growth loop, feedback rewards, and local save import/export.

## Getting Started

- `npm install`
- `npm run dev`
- `npm test`
- `npm run build`

## Current MVP Scope

- Dashboard with pet growth summary plus local save import/export controls
- Goals page with new-goal creation flow
- Tasks page with completion flow and experience rewards
- Pet page with wish handling and keep-for-later rewards
- Feedback page with Feynman-style explanation rewards
- IndexedDB repository plus JSON snapshot import/export utilities

## Demo Data

The dashboard seeds a demo snapshot into local IndexedDB when the workspace is empty. That seeded snapshot powers the import/export panel so the MVP can be explored immediately without extra setup.

## Verification Status - 2026-04-01

- Automated test suite passes with the current MVP feature set.
- Production build succeeds with `npm run build`.
- Local dev server startup was confirmed with `npm run dev -- --host 127.0.0.1`.
- A manual browser pass is still recommended for the full export/import round-trip restoration flow.

## Documentation

- Engineering usage: `docs/engineering-usage.md`
- Supplemental requirements design: `docs/plans/2026-04-01-work-partner-supplemental-requirements-design.md`
