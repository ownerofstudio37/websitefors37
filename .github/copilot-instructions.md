
# Copilot Instructions: Studio37

## Big picture
- Production app is the root Next.js App Router project (`app/`, `components/`, `lib/`), even though this is an npm workspace monorepo.
- Workspace apps exist but are secondary: `apps/portal` (Next scaffold) and `apps/workflow` (Expo mobile, offline-first SQLite + Supabase) per their READMEs.
- Main runtime stack: Next 14 + TypeScript + Tailwind + Supabase + Netlify + PWA wrapper (`next.config.js`, `netlify.toml`).
- Data boundary is Supabase: CMS/blog/gallery/CRM tables (`content_pages`, `blog_posts`, `gallery_images`, `leads`, `appointments`, etc.).
- Multi-tenant/app-ecosystem foundation is in `supabase/migrations/2025-11-04_app_ecosystem_schema.sql` and `packages/shared/src/supabase.ts`; root website still mostly uses studio-specific tables.

## Developer workflows that matter
- Use root scripts for website work: `npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck` (see root `package.json`).
- `npm run build` always runs `scripts/generate-sitemap-static.mjs` first; sitemap issues can break/alter builds.
- Use Turborepo scripts only for cross-workspace work (`repo:dev`, `repo:typecheck`, etc.).
- No root automated test script currently; practical validation is lint/typecheck + manual route checks.
- `npm run import:training` runs `scripts/import-website-content.ts` and should be considered when CMS/blog/gallery/settings schema changes.

## Code patterns to follow
- Prefer ISR for public content pages via `export const revalidate` (examples: `app/blog/page.tsx`, `app/[slug]/page.tsx`).
- Blog listing intentionally goes through server API (`/api/blog/list`) instead of direct page-level Supabase queries to avoid anon/RLS issues.
- `app/[slug]/page.tsx` is the CMS core: MDX rendering from `content_pages`, location-page fallback, and conditional dynamic import of `components/BuilderRuntime.tsx`.
- Extend visual builder behavior in `components/BuilderRuntime.tsx`; avoid creating parallel block-render systems.
- Admin pages commonly require `dynamic = 'force-dynamic'` because auth/session checks depend on cookies (`app/admin/layout.tsx`, `app/api/auth/session/route.ts`).

## Auth, API, and integration conventions
- Admin auth is custom cookie-session auth, not Supabase Auth: middleware checks `admin_session`, `/api/auth/login` creates hashed sessions in `admin_sessions` via `lib/authSession.ts`.
- Middleware redirects protected admin traffic to `/login` (not `/admin/login`) and preserves `next` query param (`middleware.ts`).
- Use `lib/supabase.ts` for public/anon access (singleton + placeholder env fallbacks). Use `getSupabaseAdmin()` only in server code.
- `apps/web/lib/supabase*.ts` are workspace build stubs; do not treat them as the production data layer.
- Typical API route shape: input validation, `rateLimit()` + `getClientIp()`, structured logs via `createLogger()`, and JSON responses.
- `rateLimit` is in-memory (`lib/rateLimit.ts`), so limits are best-effort across serverless cold starts.
- Prefer lazy SDK creation for env-sensitive services (example: Resend instantiated inside `POST` in `app/api/marketing/email/send/route.ts`).

## AI/email/content specifics
- Reuse `lib/ai-client.ts` for all Gemini usage: model fallback chain, retries, `generateText`, `generateJSON`, `analyzeImage`, and preset configs.
- AI endpoints in this repo typically combine Zod validation + rate limiting + structured logging (see `app/api/chat/respond/route.ts`, `app/api/leads/score/route.ts`).
- Email system uses Resend + template renderers (`lib/emailRenderer.ts`, `lib/emailBuilderRenderer.ts`) with templates stored in Supabase and React Email support.

## Build/deploy gotchas
- `next.config.js` explicitly ignores build-time TypeScript and ESLint failures; run lint/typecheck yourself before trusting a build.
- Netlify runs from repo root on Node 20 (`netlify.toml`) and enables `images.unoptimized` when `NETLIFY=true`.
- Netlify scheduled functions trigger reminder/follow-up routes; treat those API endpoints as cron-driven production paths.
