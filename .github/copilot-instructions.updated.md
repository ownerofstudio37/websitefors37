# Copilot Instructions: Studio37 Monorepo (Next.js + Supabase)

Purpose: Short, actionable guidance so AI agents can be productive immediately.

- Quick context: White-label multi-tenant SaaS. Every feature must respect tenant isolation (`tenant_id`) — see `supabase/migrations/` and `packages/shared/src/supabase.ts` (tenant helpers).

- Dev commands:
  - `npm run repo:dev` — start all workspaces (turbo)
  - `npm run dev` — run Next app from repo root
  - `npm run build` / `npm run lint` / `npm run typecheck`
  - `npm run import:training` — imports sample site training data

- Core patterns (must-follow):
  - Use `lib/supabase.ts` (anon) in client code and **only** call `getSupabaseAdmin()` from `lib/supabaseAdmin.ts` inside server API routes (`app/api/**`). **Never** import `supabaseAdmin` into components. (Note: `apps/web/lib/supabaseAdmin.ts` is a build-time stub.)
  - Multi-tenancy: Always filter reads/writes by `tenant_id`. `tenant_config` drives tenant metadata (slug, branding, features).
  - Admin pages that depend on sessions must export `export const dynamic = 'force-dynamic'`.
  - ISR pattern: export `revalidate` in pages that read from Supabase (example: `app/blog/page.tsx`).

- AI & integrations:
  - Single AI client: `lib/ai-client.ts` (use `AI_CONFIGS` and `MODEL_FALLBACKS`). Set `GOOGLE_GENAI_MODEL` in env.
  - Email/SMS: Resend via `/api/marketing/email/send`, Twilio via `/api/marketing/sms/send`. Templates live in `emails/` and render via `lib/emailRenderer.ts`.
  - Cloudinary helper: `lib/cloudinary.ts` for uploads/transformations.

- Security & migrations:
  - Migrations under `supabase/migrations/`. RLS policies are required for tenant isolation — check RLS if writes fail. Ensure `SUPABASE_SERVICE_ROLE_KEY` is available to server routes.

- Where to look first (examples):
  - Admin auth & middleware: `app/api/auth/login/route.ts`, `middleware.ts`, `components/AdminProtected.tsx`
  - Tenant utilities: `packages/shared/src/supabase.ts`
  - AI features: `lib/ai-client.ts` and `/api/leads/score`
  - Visual builder & MDX: `app/[slug]/page.tsx`, `components/BuilderRuntime.tsx`

- Gotchas (do not break these):
  - Do not import `getSupabaseAdmin()` into client code.
  - Root `package.json` is a monorepo entry — many deps are hoisted to workspaces.
  - Netlify builds set `next/image` to unoptimized; verify image behavior in `next.config.js`.

- Quick debugging checklist:
  - Reproduce locally (`npm run dev` / `repo:dev`) → check browser console, API response, server logs (`lib/logger.ts`), Supabase logs.
  - For rate-limited endpoints, review `lib/rateLimit.ts`.

If anything in these instructions is unclear or you want additional examples (DB schema, RLS policy snippets, tenant onboarding flow), tell me which area to expand and I’ll iterate. ✅
