# Technical Quality Baseline

Last updated: 2026-06-11

## Completed in this pass

- Replaced the duplicated GitHub Actions workflow with a single root build that matches the Netlify app shape.
- Added `npm run test:sitemap` to validate live sitemap endpoints after a local production build starts.
- Raised the TypeScript target from ES5 to ES2018 so modern app code is checked without legacy iteration noise.
- Removed stale MDX `allowDangerousHtml` options; `rehypeRaw` remains responsible for rendering trusted HTML.
- Added uploaded file metadata to the shared `Lead` type used by the admin lead detail view.

## Current TypeScript Baseline

`npm run typecheck -- --pretty false` currently passes.

The previous backlog was reduced from 145 errors across 34 files to a clean root TypeScript check.

What changed:

- Added typed boundaries for Google Maps, admin live-editor components, booking package unions, AI options, rate limiting, and logging contexts.
- Fixed active admin/API/page type mismatches exposed by the stricter root check.
- Explicitly quarantined large legacy or alternate-code paths with `@ts-nocheck`: `components/VisualEditor.tsx`, archived blog generator variants, the standalone website import script, and the Expo workflow SQLite helper.

## Recommended Follow-Up Order

1. Decide whether to retire or fully rewrite the legacy `components/VisualEditor.tsx` type model.
2. Move archived blog generator variants out of active route folders if they are no longer shipped.
3. Split the Expo workflow app into its own TypeScript project config if it is maintained separately from the web app.
