
# Copilot Instructions: Studio37 Monorepo (Next.js + Supabase)

**Purpose**: Give AI coding agents the minimum context to be productive AND understand the multi-tenant, white-label architecture that enables client duplication.

**Key Context**: This is a **white-label SaaS in progress** - a fully-featured CRM/CMS/AI platform that can be duplicated for multiple photography studios. The `tenant_config` table enables this. Every feature built must respect `tenant_id` isolation.

## Architecture & Data Flow
- **Hybrid Monorepo**: 
  - **Main App**: Root `app/` directory (Next.js 14 App Router).
  - **Workspaces**: `apps/*` (`workflow`, `portal`, `web`) and `packages/shared`.
  - **Dependencies**: Root relies on hoisted dependencies from workspaces (e.g., `next` from `apps/web`).
- **Web stack**: Next.js 14 App Router + TypeScript + Tailwind on Netlify. PWA via `@ducanh2912/next-pwa`.
- **Data layer**: Supabase (PostgreSQL). Public reads use `lib/supabase.ts` (anon key). Service role client uses **lazy singleton pattern** in `lib/supabaseAdmin.ts` via `getSupabaseAdmin()` - **ONLY** import in server API routes under `app/api/**`.
- **Core tables**: `content_pages`, `blog_posts`, `gallery_images`, `settings`, `page_configs`, `admin_users`, `admin_sessions`, `leads`, `appointments`, `email_campaigns`, `sms_campaigns`, `client_portal_users`, `client_accounts`, `shoots`, `tenant_config`, `ai_processing_jobs`.

## 🔑 Multi-Tenancy & Client Duplication (CRITICAL FOR BUSINESS)
**This codebase is built for white-label duplication.** Every new client gets their own database tenant.

- **Tenant model**: `tenant_config` table stores `slug` (unique subdomain), `name`, `branding`, `features`, `billing`.
- **User isolation**: `app_users` has `tenant_id` FK. `app_access` JSONB controls app access.
- **Data isolation**: Core tables have `tenant_id`. RLS policies enforce read/write by tenant.
- **Duplication checklist**:
  1. ✅ Database schema ready (`2025-11-04_app_ecosystem_schema.sql`).
  2. ✅ Tenant utilities in `packages/shared/src/supabase.ts`.
  3. ⚠️ **TODO**: Admin UI to create new tenants (`/admin/setup-tenant`).
  4. ⚠️ **TODO**: Verify all new admin features filter by `tenant_id`.

## Dev Workflow
- **Scripts**: `npm run dev` (runs `next dev` in root). `npm run repo:dev` (runs turbo).
- **Env**: `.env.local` for secrets. `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_GENAI_MODEL`.
- **Netlify**: Uses `@netlify/plugin-nextjs`. Images unoptimized when `NETLIFY=true`.
- **Path alias**: Import with `@/*` per `tsconfig.json`.

## 🚨 BLOCKING ISSUES (Finish These First)
**Current Status (Dec 12, 2025)**: System is maturing. Lead scoring is implemented.

### High Priority
1. **Lead Deduplication** (6-8 hrs) — Unique constraints on `leads(email, phone)` + merge UI.
2. **Security Migration** (pending) — Apply `20251202_fix_security_issues.sql` to enable RLS on all public tables. **Must complete before SaaS launch**.

### Medium Priority
3. **Admin Lead Scoring Dashboard** — View AI scores (`/admin/lead-scoring`).
4. **Campaign Generation** — Auto-generate marketing emails/SMS.
5. **Client Portal Improvements** — Gallery permission controls.

## Patterns You'll Reuse

### Public Pages with ISR
Export `revalidate` constant. Use anon Supabase client.
```typescript
export const revalidate = 600 // 10 minutes
const { data } = await supabase.from('table').select('*')
```

### MDX Pages & Visual Blocks
- `app/[slug]/page.tsx` renders MDX.
- Visual blocks in `components/BuilderRuntime.tsx`.
- **Enhanced blocks**: VideoHero, BeforeAfterSlider, Timeline, MasonryGallery, AnimatedCounterStats.

### AI Features Integration
- **Unified AI client**: `lib/ai-client.ts`.
- **Model**: Defaults to `gemini-2.5-flash` (via `GOOGLE_GENAI_MODEL`).
- **Pattern**: Import `createAIClient` from `lib/ai-client.ts`.
- **Endpoints**: `/api/leads/score` (Implemented), `/api/blog/generate`, `/api/gallery/analyze`.

### Admin Authentication
- **Login**: `app/api/auth/login/route.ts`.
- **Middleware**: `middleware.ts` protects `/admin/**`.
- **Client guard**: `components/AdminProtected.tsx`.
- **Admin layout**: `app/admin/layout.tsx` uses `export const dynamic = 'force-dynamic'`.

### API Routes
- Use `NextRequest`/`NextResponse`.
- Apply rate limiting with `lib/rateLimit.ts`.
- Use structured logging with `lib/logger.ts`.

### Images
- `next/image` with `unoptimized: true` on Netlify.
- **Cloudinary**: `lib/cloudinary.ts` for optimization.

### CRM & Marketing Features
- **Email campaigns**: Use `@react-email/components` templates in `emails/` directory. Send via Resend API (`/api/marketing/email/send`).
- **One-off Emails**: Use `/api/marketing/email/send` with `html` body for ad-hoc messages (e.g., Admin "Compose" modal). Always log to `communication_logs`.
- **SMS campaigns**: Twilio integration via `/api/marketing/sms/send`. Auto-formats US phone numbers, calculates costs.
- **Lead scoring**: `/api/leads/score` uses AI to score leads 0-100 with priority levels and next action recommendations.
- **Email templates**: React Email components (BookingConfirmation, SessionReminder, PhotosReady, etc.) rendered via `lib/emailRenderer.ts`.
- **Pattern**: Variable substitution `{{firstName}}`, `{{sessionDate}}` in templates. Store campaigns in `email_campaigns`/`sms_campaigns` tables.

### Admin Dashboard Structure & Completion Status
**Location**: `app/admin/` directory. All pages use `force-dynamic` because they depend on sessions/cookies.

**COMPLETED & Functional** ✅
- **Dashboard** (`/admin/dashboard`) — Main hub, analytics overview
- **CRM Features** (`/admin/leads`, `/admin/bookings`, `/admin/calendar`) — Full lead management (including "Compose" email), appointment booking, SMS inbox
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

### SEO & PWA
- `app/robots.ts`, `app/sitemap.ts` for SEO.
- `public/manifest.webmanifest`, icons in `public/icons/` for PWA.

## Gotchas (Avoid Footguns!)
- **Service Role Key**: NEVER import `lib/supabaseAdmin.ts` in client components. Use only in `app/api/**`.
- **Admin Pages**: Must use `force-dynamic` if using cookies/sessions.
- **Root Dependencies**: The root `package.json` relies on hoisted dependencies from workspaces. Do not be alarmed if `next` is missing from root `dependencies`.
- **Database Migrations**: Must enable RLS on all public tables.

## Quick References
- **ISR example**: `app/blog/page.tsx` (anon Supabase + revalidate export)
- **MDX rendering**: `app/[slug]/page.tsx`, `components/BuilderRuntime.tsx`
- **Auth flow**: `app/api/auth/login/route.ts`, `app/api/auth/session/route.ts`, `middleware.ts`, `components/AdminProtected.tsx`
- **Config files**: `next.config.js`, `netlify.toml`, `tailwind.config.js`, `tsconfig.json`
- **Database**: `supabase/migrations/` for schema changes with RLS policies
- **Utility libs**: `lib/cache.ts` (in-memory cache), `lib/logger.ts` (structured logging), `lib/rateLimit.ts` (IP-based), `lib/authSession.ts` (session management)
- **Additional context**: `README_ECOSYSTEM.md` (monorepo plan), `README.md` (features/quickstart)

Apply changes consistent with these patterns. When in doubt, grep for existing examples before creating new patterns.
