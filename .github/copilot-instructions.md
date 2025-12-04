
# Copilot Instructions: Studio37 Monorepo (Next.js + Supabase)

**Purpose**: Give AI coding agents the minimum context to be productive AND understand the multi-tenant, white-label architecture that enables client duplication.

**Key Context**: This is a **white-label SaaS in progress** - a fully-featured CRM/CMS/AI platform that can be duplicated for multiple photography studios. The `tenant_config` table enables this. Every feature built must respect `tenant_id` isolation.

## Architecture & Data Flow
- **Monorepo**: Apps in `apps/*` (`workflow`, `portal`, `web`), shared code in `packages/shared`. Main Next.js website/admin is in `app/`. Uses Turbo for parallel builds.
- **Web stack**: Next.js 14 App Router + TypeScript + Tailwind on Netlify. PWA via `@ducanh2912/next-pwa` (disabled in dev).
- **Data layer**: Supabase (PostgreSQL). Public reads use `lib/supabase.ts` (anon key). Service role client uses **lazy singleton pattern** in `lib/supabaseAdmin.ts` via `getSupabaseAdmin()` - **ONLY** import in server API routes under `app/api/**`.
- **Core tables**: `content_pages`, `blog_posts`, `gallery_images`, `settings`, `page_configs`, `admin_users`, `admin_sessions`, `gallery_highlight_sets`, `leads`, `appointments`, `email_campaigns`, `sms_campaigns`, `client_portal_users`, `client_accounts`, `shoots`, `shoot_photos`, `app_users`, `tenant_config`, `ai_processing_jobs`, `app_sessions`, `client_favorites`, `content_categories`, `page_analytics`, `content_revisions`, `page_comments`, `content_activity_log`.

## 🔑 Multi-Tenancy & Client Duplication (CRITICAL FOR BUSINESS)
**This codebase is built for white-label duplication.** Every new client gets their own database tenant.

- **Tenant model**: `tenant_config` table stores `slug` (unique subdomain), `name`, `branding` (colors, logo), `features` (feature flags), `billing` (Stripe).
- **User isolation**: `app_users` has `tenant_id` FK - all users are scoped to a single tenant. `app_access` JSONB controls which apps (workflow, companion, portal, ai_platform) they can use.
- **Data isolation**: Core tables like `shoots`, `client_accounts`, `ai_processing_jobs` have `tenant_id` - Supabase RLS policies enforce read/write by tenant.
- **Duplication checklist**:
  1. ✅ Database schema ready (`2025-11-04_app_ecosystem_schema.sql` + RLS policies in `20251202_fix_security_issues.sql`)
  2. ✅ Tenant utilities in `packages/shared/src/supabase.ts` (`getTenantBySlug`, `getTenantById`, `hasAppAccess`)
  3. ⚠️ **TODO**: Admin UI to create new tenants + onboarding flow (`/admin/setup-tenant` or SaaS dashboard)
  4. ⚠️ **TODO**: Verify all new admin features filter by `tenant_id` when querying DB
- **For development**: Studio37 is default tenant with `slug: 'studio37'`. When cloning for a client, create new `tenant_config` row, then new `app_users` linking to that tenant.

## Dev Workflow
- **Scripts** (`package.json`): `dev`, `build`, `start`, `lint`, `typecheck`. Monorepo: `repo:dev`, `repo:build`, `web:dev`, `workflow:dev`, `import:training`.
- **Env** (`.env.local`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`; server-only: `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_API_KEY` or `GEMINI_API_KEY`, `RESEND_API_KEY`, `TWILIO_*`.
- **Netlify** (`netlify.toml`): Uses `@netlify/plugin-nextjs`, Node 20.x, and aggressive caching headers (1 year for static assets). Images are unoptimized when `NETLIFY=true` in `next.config.js`.
- **Path alias**: Import with `@/*` per `tsconfig.json`.
- **Build quirks**: Service-only env vars get placeholder values during build to prevent exposure. PWA service worker config uses `StaleWhileRevalidate` for Cloudinary images.

## 🚨 BLOCKING ISSUES (Finish These First)
**Current audit (Dec 3, 2025)**: System is 8.7/10 production-ready but missing critical admin tools.

### High Priority (Blocking lead qualification & sales)
1. **AI Lead Scoring** (8-10 hrs) — `/api/leads/score` endpoint to auto-score leads 0-100 based on budget, timeline, engagement. See `FULL_SITE_AUDIT_DEC_2025.md` line 103.
2. **Lead Deduplication** (6-8 hrs) — Unique constraints on `leads(email, phone)` + merge UI. Blocking: duplicate outreach, confused comms.
3. **Security Migration** (pending) — Apply `20251202_fix_security_issues.sql` to enable RLS on all public tables. **Must complete before SaaS launch**.

### Medium Priority (Unfinish admin tools)
4. **Admin Lead Scoring Dashboard** — View AI scores, adjust priorities, bulk actions (`/admin/lead-scoring`)
5. **Campaign Generation** — Auto-generate marketing emails/SMS from lead data + templates
6. **Client Portal Improvements** — Gallery permission controls, payment tracking UI

**Audit file**: `FULL_SITE_AUDIT_DEC_2025.md` has detailed breakdown + effort estimates

## Patterns You'll Reuse

### Public Pages with ISR
Export `revalidate` constant for caching. Use anon Supabase client (`lib/supabase.ts`) to avoid cookie dependencies.
```typescript
export const revalidate = 600 // 10 minutes
const { data } = await supabase.from('table').select('*')
```
Examples: `app/blog/page.tsx`, `app/[slug]/page.tsx`.

### MDX Pages & Visual Blocks
- `app/[slug]/page.tsx` renders MDX content using `next-mdx-remote/rsc` with `rehype-raw` and `rehype-highlight`.
- Visual blocks (Hero, Gallery, etc.) live in `components/BuilderRuntime.tsx`.
- To add a block: export it in `BuilderRuntime.tsx` and register in `MDXBuilderComponents` object.
- Blocks needing server data fetch directly within the component (no createServerComponentClient needed).
- **Enhanced blocks**: VideoHero, BeforeAfterSlider, Timeline, MasonryGallery, AnimatedCounterStats, FilterableGallery, TabbedContent, Accordion, ModalLightbox.

### AI Features Integration
- **Unified AI client**: `lib/ai-client.ts` provides consistent Gemini API access with retry logic, structured JSON outputs, vision support.
- **Model**: Defaults to `gemini-3-pro-preview` with fallbacks. Set via `GOOGLE_GENAI_MODEL` env var.
- **AI endpoints**: `/api/ai/content-suggestions`, `/api/blog/generate`, `/api/gallery/generate-alt-text`, `/api/leads/score`, `/api/gallery/analyze`.
- **Admin components**: `AIBlockSuggestions.tsx` for page builder, AI chatbot training via `/admin/chatbot-training`.
- **Training data**: `scripts/import-website-content.ts` imports site content to Supabase for chatbot context. Run: `npm run import:training`.
- **Pattern**: Import `createAIClient` from `lib/ai-client.ts`, NOT direct `GoogleGenerativeAI` instantiation in API routes.

### Admin Authentication
- **Login flow**: `app/api/auth/login/route.ts` validates credentials → rate limits → bcrypt → creates session → sets httpOnly cookie.
- **Middleware**: `middleware.ts` protects `/admin/**` (except `/admin/login`, `/setup-admin`) by checking `admin_session` cookie.
- **Client guard**: `components/AdminProtected.tsx` fetches `/api/auth/session` to verify auth client-side.
- **Admin layout**: `app/admin/layout.tsx` sets `export const dynamic = 'force-dynamic'` because it depends on cookies/sessions.

### Admin Dashboard Structure & Completion Status
**Location**: `app/admin/` directory. All pages use `force-dynamic` because they depend on sessions/cookies.

**COMPLETED & Functional** ✅
- **Dashboard** (`/admin/dashboard`) — Main hub, analytics overview
- **CRM Features** (`/admin/leads`, `/admin/bookings`, `/admin/calendar`) — Full lead management, appointment booking, SMS inbox
- **Content Management** (`/admin/content`, `/admin/blog`) — Page/blog editor with MDX
- **Gallery** (`/admin/galleries`) — Image management, bulk operations, Cloudinary integration
- **Email & SMS** (`/admin/marketing`, `/admin/email-templates`) — Campaign creation, template editor, Resend/Twilio
- **Client Portals** (`/admin/client-portals`) — Client account creation, project/gallery access management
- **AI Tools** (`/admin/chatbot-training`, `/admin/ai-site-builder`) — Chatbot content import, AI page suggestions

**NEEDS COMPLETION** 🟡 (Priority Order)
- **Lead Scoring Dashboard** (`/admin/lead-scoring`) — Display AI scores, filter by priority, bulk actions. Wire to `/api/leads/score` endpoint.
- **Setup/Onboarding** (`/admin/setup-tenant`) — Create new tenants for client duplication (name, slug, branding). Required for SaaS launch.
- **System Settings** (`/admin/settings`) — Tenant-wide config (brand colors, features, billing). Currently uses global settings.
- **Database Audit** (`/admin/database-migrations`) — UI to run pending migrations (security fixes, schema updates).

**Pattern**: All admin features must query with `tenant_id` filter. Use `getSupabaseAdmin()` in `/api/**` routes, NEVER in components.

### API Routes
- Use `NextRequest`/`NextResponse` for consistency.
- Apply rate limiting with `lib/rateLimit.ts` (in-memory, IP-based).
- Use structured logging with `lib/logger.ts` (JSON output).
- Example pattern from `app/api/auth/login/route.ts`:
  ```typescript
  import { rateLimit, getClientIp } from '@/lib/rateLimit'
  import { createLogger } from '@/lib/logger'
  const log = createLogger('api/auth/login')
  const ip = getClientIp(request.headers)
  const rl = rateLimit(`login:${ip}`, { limit: 5, windowMs: 5 * 60 * 1000 })
  if (!rl.allowed) return NextResponse.json({error: 'Too many attempts'}, {status: 429})
  ```

### Images
- `next.config.js` sets `remotePatterns` for Unsplash, Supabase, Cloudinary.
- Prefer AVIF/WebP formats with long cache TTL (1 year).
- Always use `next/image` (note: unoptimized on Netlify due to serverless).
- **Cloudinary integration**: `lib/cloudinary.ts` and `lib/cloudinaryOptimizer.ts` for image optimization and transformation.

### CRM & Marketing Features
- **Email campaigns**: Use `@react-email/components` templates in `emails/` directory. Send via Resend API (`/api/marketing/email/send`).
- **SMS campaigns**: Twilio integration via `/api/marketing/sms/send`. Auto-formats US phone numbers, calculates costs.
- **Lead scoring**: `/api/leads/score` uses AI to score leads 0-100 with priority levels and next action recommendations.
- **Email templates**: React Email components (BookingConfirmation, SessionReminder, PhotosReady, etc.) rendered via `lib/emailRenderer.ts`.
- **Pattern**: Variable substitution `{{firstName}}`, `{{sessionDate}}` in templates. Store campaigns in `email_campaigns`/`sms_campaigns` tables.

### SEO & PWA
- `app/robots.ts`, `app/sitemap.ts` for SEO.
- `public/manifest.webmanifest`, icons in `public/icons/` for PWA.

## Gotchas (Avoid Footguns!)
- **Never import** `lib/supabaseAdmin.ts` outside `app/api/**` routes. Service role key must stay server-side only. Always use `getSupabaseAdmin()` function, not direct import.
- **Admin pages** with cookies/sessions need `export const dynamic = 'force-dynamic'` (see `app/admin/layout.tsx`).
- **Don't expose server-only env** vars to client. Check `next.config.js` env section for placeholders during build.
- **MDX security**: `rehype-raw` only with sanitized/trusted content (admin-authored CMS pages).
- **Rate limiter**: In-memory store resets on cold starts in serverless. Good for basic protection, not distributed rate limiting.
- **Database migrations**: Must enable RLS on all public tables. Pattern: `ALTER TABLE x ENABLE ROW LEVEL SECURITY;` + create policies. See `supabase/migrations/20251202_fix_security_issues.sql`.
- **Supabase views**: Avoid `SECURITY DEFINER` on views - use querying user's permissions instead to prevent security escalation.

## Quick References
- **ISR example**: `app/blog/page.tsx` (anon Supabase + revalidate export)
- **MDX rendering**: `app/[slug]/page.tsx`, `components/BuilderRuntime.tsx`
- **Auth flow**: `app/api/auth/login/route.ts`, `app/api/auth/session/route.ts`, `middleware.ts`, `components/AdminProtected.tsx`
- **Config files**: `next.config.js`, `netlify.toml`, `tailwind.config.js`, `tsconfig.json`
- **Database**: `supabase/migrations/` for schema changes with RLS policies
- **Utility libs**: `lib/cache.ts` (in-memory cache), `lib/logger.ts` (structured logging), `lib/rateLimit.ts` (IP-based), `lib/authSession.ts` (session management)
- **Additional context**: `README_ECOSYSTEM.md` (monorepo plan), `README.md` (features/quickstart)

Apply changes consistent with these patterns. When in doubt, grep for existing examples before creating new patterns.