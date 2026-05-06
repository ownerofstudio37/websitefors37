
# Copilot Instructions: Studio37

## Big picture
- Treat the root app as production: Next.js App Router in `app/`, `components/`, `lib/`.
- This is a monorepo, but `apps/portal` (minimal portal scaffold) and `apps/workflow` (Expo offline-first app) are secondary.
- Core stack is Next 14 + TypeScript + Supabase + Netlify + PWA wrapper (`next.config.js`, `netlify.toml`).
- Public website content flow is Supabase-driven (`content_pages`, `blog_posts`, `gallery_images`, `leads`, `appointments`, `settings`).
- Multi-app/tenant foundations exist in `supabase/migrations/2025-11-04_app_ecosystem_schema.sql` and `packages/shared/src/supabase.ts`, but root website still mainly uses studio-specific tables.

## Developer workflows that matter
- For website work, use root scripts from `package.json`: `npm run dev`, `build`, `lint`, `typecheck`.
- Build runs `scripts/generate-sitemap-static.mjs` before `next build`; sitemap generation failures block builds.
- `npm run import:training` (`scripts/import-website-content.ts`) should be rerun when CMS/blog/gallery/settings content shape changes.
- Cross-workspace commands are Turbo-based (`repo:dev`, `repo:build`, `repo:typecheck`), but there is no reliable root test suite; use lint/typecheck + manual route/API checks.
- CI file exists but is messy/duplicated (`.github/workflows/ci.yml`), so verify actual local scripts before changing pipeline behavior.

## Rendering and content patterns
- Prefer ISR for public pages with `export const revalidate` (e.g., `app/blog/page.tsx`, `app/[slug]/page.tsx`).
- Blog list page intentionally fetches through server API (`/api/blog/list`) rather than direct page query to avoid anon/RLS surprises.
- `app/[slug]/page.tsx` is the CMS hub: slug validation, `content_pages` fetch, MDX render, location fallback, optional visual-builder rendering.
- If adding or changing builder blocks, extend `components/BuilderRuntime.tsx` + existing editor/runtime flow instead of creating a parallel block system.
- Admin shell is dynamic (`app/admin/layout.tsx` uses `dynamic = 'force-dynamic'`) because auth state is cookie/session-based.

## Auth, data-access, and API conventions
- Admin auth is custom session auth, not Supabase Auth: login in `app/api/auth/login/route.ts`, session records in `admin_sessions` via `lib/authSession.ts`, cookie `admin_session`.
- Middleware protects `/admin/**`, redirects unauthenticated users to `/login` with preserved `next` param (`middleware.ts`).
- Use `lib/supabase.ts` for anon/public access; use `getSupabaseAdmin()` from `lib/supabaseAdmin.ts` only in server routes/actions.
- Do not treat `apps/web/lib/supabase*.ts` as production clients; those are workspace build stubs.
- Common API shape in this repo: Zod/guard checks, `rateLimit()` + `getClientIp()`, structured JSON logs via `createLogger()`, JSON response.
- `lib/rateLimit.ts` is in-memory; limits are best-effort across serverless cold starts.

## AI, email, and integrations
- Reuse `lib/ai-client.ts` for Gemini calls (fallback models, retries, JSON parsing helpers, presets).
- AI endpoints follow validation + throttling + structured logging (`app/api/chat/respond/route.ts`, `app/api/leads/score/route.ts`).
- Email sending uses Resend + template rendering from Supabase (`app/api/marketing/email/send/route.ts`, `lib/emailRenderer.ts`, `lib/emailBuilderRenderer.ts`).
- Keep env-sensitive SDKs lazily instantiated inside handlers (pattern used for Resend) to avoid build-time crashes.

## Build/deploy gotchas
- `next.config.js` forces `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds`; always run lint/typecheck manually before trusting a green build.
- Netlify builds from repo root on Node 20 (`netlify.toml`), with static sitemap redirects and aggressive cache headers.
- Netlify scheduled jobs call production APIs (`/api/appointments/send-reminders`, `/api/leads/follow-up`); preserve cron-secret behavior when editing these routes.
