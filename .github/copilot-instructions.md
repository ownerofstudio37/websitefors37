
# Copilot Instructions: Studio37 Monorepo (Next.js + Supabase)

Purpose: Give AI coding agents the minimum context to be productive in this codebase and avoid common pitfalls.

## Architecture & Data Flow
- **Monorepo**: Apps in `apps/*` (`workflow`, `portal`, `web`), shared code in `packages/shared`. Main Next.js website/admin is in `app/`. Uses Turbo for parallel builds.
- **Web stack**: Next.js 14 App Router + TypeScript + Tailwind on Netlify. PWA via `@ducanh2912/next-pwa` (disabled in dev).
- **Data layer**: Supabase (PostgreSQL). Public reads use `lib/supabase.ts` (anon key). Service role client `lib/supabaseAdmin.ts` is **ONLY** for server API routes under `app/api/**`.
- **Core tables**: `content_pages`, `blog_posts`, `gallery_images`, `settings`, `page_configs`, `admin_users`, `admin_sessions`, `gallery_highlight_sets`, `leads`, `appointments`, `email_campaigns`, `sms_campaigns`, `client_portal_users`, `shoots`, `app_users`.

## Dev Workflow
- **Scripts** (`package.json`): `dev`, `build`, `start`, `lint`, `typecheck`. Monorepo: `repo:dev`, `repo:build`, `web:dev`, `workflow:dev`, `import:training`.
- **Env** (`.env.local`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`; server-only: `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_API_KEY` or `GEMINI_API_KEY`, `RESEND_API_KEY`, `TWILIO_*`.
- **Netlify** (`netlify.toml`): Uses `@netlify/plugin-nextjs` and long-lived caching headers. Images are unoptimized when `NETLIFY=true` in `next.config.js`.
- **Path alias**: Import with `@/*` per `tsconfig.json`.

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
- **Never import** `lib/supabaseAdmin.ts` outside `app/api/**` routes. Service role key must stay server-side only.
- **Admin pages** with cookies/sessions need `export const dynamic = 'force-dynamic'` (see `app/admin/layout.tsx`).
- **Don't expose server-only env** vars to client. Check `next.config.js` env section for placeholders during build.
- **MDX security**: `rehype-raw` only with sanitized/trusted content (admin-authored CMS pages).
- **Rate limiter**: In-memory store resets on cold starts in serverless. Good for basic protection, not distributed rate limiting.

## Quick References
- **ISR example**: `app/blog/page.tsx` (anon Supabase + revalidate export)
- **MDX rendering**: `app/[slug]/page.tsx`, `components/BuilderRuntime.tsx`
- **Auth flow**: `app/api/auth/login/route.ts`, `app/api/auth/session/route.ts`, `middleware.ts`, `components/AdminProtected.tsx`
- **Config files**: `next.config.js`, `netlify.toml`, `tailwind.config.js`, `tsconfig.json`
- **Additional context**: `README_ECOSYSTEM.md` (monorepo plan), `README.md` (features/quickstart)

Apply changes consistent with these patterns. When in doubt, grep for existing examples before creating new patterns.