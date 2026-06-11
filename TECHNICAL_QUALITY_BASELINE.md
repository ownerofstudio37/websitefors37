# Technical Quality Baseline

Last updated: 2026-06-11

## Completed in this pass

- Replaced the duplicated GitHub Actions workflow with a single root build that matches the Netlify app shape.
- Added `npm run test:sitemap` to validate live sitemap endpoints after a local production build starts.
- Raised the TypeScript target from ES5 to ES2018 so modern app code is checked without legacy iteration noise.
- Removed stale MDX `allowDangerousHtml` options; `rehypeRaw` remains responsible for rendering trusted HTML.
- Added uploaded file metadata to the shared `Lead` type used by the admin lead detail view.

## Current TypeScript Baseline

`npm run typecheck -- --pretty false` currently reports 145 errors across 34 files.

Largest clusters:

- `components/VisualEditor.tsx`: 72 errors from legacy builder schema drift, missing component types, and narrow literal unions.
- `components/MetaLeadFunnelClient.tsx`: 7 errors around nullable funnel indexes and implicit callback types.
- `components/blocks/InteractiveMapClient.tsx`: 6 errors because Google Maps globals are not typed.
- `app/book-a-session/booking-client-enhanced.tsx`: 5 errors from package union types that exclude `consultation`.
- `components/BuilderRuntime.tsx` and `app/services/commercial-photography/page.tsx`: 4 errors each from content prop shape mismatches.
- API/helper files: several smaller errors around AI client option shapes, Supabase error logging context, and rate-limit return contracts.

## Recommended Follow-Up Order

1. Split `VisualEditor` schema/type repair into its own branch because it is the largest and riskiest cluster.
2. Add Google Maps ambient types for `InteractiveMapClient`.
3. Normalize booking package unions so consultation logic is represented in the type model.
4. Align AI helper option types with the current `lib/ai-client.ts` public contract.
5. Fix Supabase/PostgREST error logging wrappers so API routes can pass typed context consistently.
