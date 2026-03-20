
# Copilot Instructions: Studio37

## Big picture
- This repo is a hybrid monorepo: the production Next.js 14 app lives at the root in `app/`, while `apps/web`, `apps/portal`, and `apps/workflow` are workspace packages. Root code relies on hoisted deps from `apps/web`.
- The stack is App Router + TypeScript + Tailwind + Supabase + Netlify. `next.config.js` wraps the app with `@ducanh2912/next-pwa`; `netlify.toml` builds from the repo root on Node 20.
- Supabase is the main integration boundary: website/CMS/CRM data is in tables like `content_pages`, `blog_posts`, `gallery_images`, `leads`, `appointments`, and admin session tables.
- Multi-tenant groundwork exists in `supabase/migrations/2025-11-04_app_ecosystem_schema.sql` and `packages/shared/src/supabase.ts` (`tenant_config`, `app_users`, tenant helpers), but much of the root app still reads studio data directly.

## Workflows that matter
- Use `npm run dev` for the root website, not Turborepo. Use `npm run repo:dev` only when you need multiple workspaces running.
- `npm run build` runs `scripts/generate-sitemap-static.mjs` before `next build`; if build output changes, check sitemap generation first.
- Useful checks are `npm run lint`, `npm run typecheck`, `npm run repo:typecheck`, and `npm run import:training`.
- There is no root test script today; validation is mostly lint/typecheck plus targeted manual route checks.

## Code patterns to follow
- Public pages favor ISR with `export const revalidate = ...`. Example patterns: `app/blog/page.tsx` and `app/[slug]/page.tsx`.
- The blog page fetches `/api/blog/list` from the server instead of querying Supabase directly; this avoids anon/RLS issues while keeping ISR.
- `app/[slug]/page.tsx` is the core CMS route: it reads MDX from `content_pages`, detects builder pages, and dynamically imports `components/BuilderRuntime.tsx` so simple pages do not ship the whole visual editor.
- `components/BuilderRuntime.tsx` is the source of truth for visual-builder blocks. Extend existing block props/patterns instead of inventing a second rendering path.
- Admin routes depend on cookie/session state, so admin layouts/pages commonly export `dynamic = 'force-dynamic'`. See `app/admin/layout.tsx`.
- Admin auth is custom, not Supabase Auth: `middleware.ts` checks the `admin_session` cookie, `components/AdminProtected.tsx` calls `/api/auth/session`, and sessions are stored in `admin_sessions` via `lib/authSession.ts`.

## Supabase and API conventions
- Use `lib/supabase.ts` for anon/public access. It is a singleton with placeholder env fallbacks so builds do not crash when env vars are missing.
- Use `getSupabaseAdmin()` from `lib/supabaseAdmin.ts` only in server code (`app/api/**`). The `apps/web/lib/*` Supabase files are build stubs for workspace builds.
- API handlers usually follow the same shape: `NextRequest`/`NextResponse`, `rateLimit()` + `getClientIp()`, and `createLogger()`. See `app/api/auth/login/route.ts`, `app/api/blog/list/route.ts`, and `app/api/marketing/email/send/route.ts`.
- Prefer lazy SDK initialization inside handlers for env-sensitive services (for example Resend in `app/api/marketing/email/send/route.ts`) to avoid build-time failures.
- `lib/logger.ts` emits structured JSON logs; keep that pattern instead of ad-hoc `console.log` in server routes.

## AI, email, and content-specific guidance
- Reuse `lib/ai-client.ts` for Gemini access. It already centralizes model fallbacks, retries, JSON generation, and presets like `AI_CONFIGS.precise` and `AI_CONFIGS.structured`.
- AI endpoints typically combine Zod validation + rate limiting + `createLogger()`. Good examples are `app/api/chat/respond/route.ts` and `app/api/leads/score/route.ts`.
- Email sending goes through Resend and `lib/emailRenderer.ts`; React Email templates live in `emails/` and are keyed by slug.
- `scripts/import-website-content.ts` pulls CMS/blog/gallery/settings content into chatbot training, so schema changes in those tables often need a matching import-script update.

## Build/debug gotchas
- `next.config.js` intentionally sets `typescript.ignoreBuildErrors = true` and reinjects `eslint.ignoreDuringBuilds = true`; do not assume a successful production build means types are clean.
- Netlify builds with `images.unoptimized` when `NETLIFY=true`; image behavior can differ locally.
- The middleware redirects unauthenticated admin traffic to `/login` (not `/admin/login`), so preserve that route structure when changing auth flows.
- For data-access bugs, check env vars first, then RLS/migrations under `supabase/migrations/`, then whether the route should be using anon Supabase or service-role Supabase.
