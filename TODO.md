# Studio37 UX/UI, SEO, and Feature TODO

## Full Site, Admin, And Sitemap Audit - July 11, 2026

- [x] Sitemap crawler header fix: remove `X-Robots-Tag: noindex` from `/sitemap.xml` and `/sitemap_index.xml` route responses so Search Console is not given a noindex signal on sitemap XML.
- [x] Sitemap local validation: verify `/sitemap.xml`, `/sitemap_index.xml`, and `/robots.txt` return valid crawler-readable responses locally with 200 sitemap URLs.
- [ ] Sitemap deploy verification: after deploy, recheck live `https://www.studio37.cc/sitemap.xml` and `https://www.studio37.cc/sitemap_index.xml` headers confirm `x-robots-tag: noindex` is gone.
- [ ] Search Console resubmission: resubmit both `https://www.studio37.cc/sitemap.xml` and `https://www.studio37.cc/sitemap_index.xml` after the clean-header deploy is live.
- [ ] Admin SEO monitor upgrade: make `/admin/seo` explicitly flag sitemap XML responses that include `x-robots-tag: noindex`, not just status/content-type/URL count.
- [ ] Production smoke pass: run the production smoke/SEO checks after deployment so local sitemap health, live sitemap health, robots discovery, and public routes are compared.
- [ ] Live browser QA: complete the remaining desktop/mobile visitor path clicks from homepage, services, local pages, blog, pricing tools, chatbot, portfolio request, consultation booking, and session booking.
- [ ] Admin daily workflow QA: test `/admin` cockpit, leads, projects, ShootProof tracker, blog scheduling, SEO health, and mobile quick actions with real records after deploy.
- [ ] Blog scheduling QA: publish-now, schedule-future, unpublish, edit-scheduled-time, sitemap exclusion, and public blog visibility should be tested against live Supabase data.
- [ ] Booking regression guardrail: add a small test or audit check for date-only display formatting so consultation dates cannot shift by one day in Central time again.
- [ ] Audit script upkeep: keep automated guardrails aligned with current strategy, especially private complete-gallery requests, safe-area fixed UI, centralized package facts, and sitemap crawler headers.
- [ ] Admin route simplification review: despite passing ownership checks, periodically prune or hide older builder/editor/content tools so the command center stays usable.
- [ ] Public conversion review: continue tightening every major page around the same four next actions: book consultation, compare pricing/package, request complete galleries, or contact Studio37.
- [ ] Local/service-page freshness pass: rotate proof images and local detail blocks over time so high-volume SEO pages do not become visually or verbally repetitive.
- [ ] Analytics quality pass: confirm CTA events for booking, pricing, package recommender, request portfolio, chatbot, and service-card clicks are visible in the admin dashboard.

## Next Public Site Audit Priorities - July 2, 2026

### Next Booking, Conversion, And Site Growth Roadmap

- [x] Real booking-flow QA pass: start as a visitor from homepage, service page, blog, local page, chatbot, request portfolio, and pricing/package tools; verify every path lands cleanly at booking/contact without confusing `/book-a-session` vs `/book-consultation` language.
- [x] Booking page polish: improve trust copy, reduce form friction, add what happens after submit, show response time, clarify consultation vs session booking, and preserve package/context handoff.
- [x] Service-page intent pass: make wedding, portrait, engagement, concierge, event, commercial, and branding pages feel distinct in proof, process, pricing expectation, objections, and CTA rhythm.
- [x] Admin proof library: create a tagged proof asset/library workflow for service, location, venue style, lighting, and use case so private portfolio requests can be answered quickly.
- [x] Chatbot handoff upgrade: route detected intent to one of four clean next steps: book consult, compare pricing, request complete galleries, or ask a human.
- [x] Chatbot context logging: attach chatbot summary, detected intent, and selected next step to lead/admin records.
- [x] Local SEO differentiation: add city-specific location confidence, nearby shoot spots, real local session examples, parking/logistics notes, and service-specific copy.
- [x] Conversion analytics dashboard: track and display hero CTA, pricing, package recommender, request portfolio, booking, chatbot, and service-card clicks/submissions.
- [x] Mobile polish pass: test nav, sticky CTA, service cards, booking forms, blog cards, request portfolio, chatbot overlap, and long-scroll fatigue on phone widths.

### Real Booking-Flow QA Pass

- [x] Blog entry route cleanup: route blog “Book/Ready to talk” CTAs to `/book-consultation` and fix the broken engagement service link to `/services/engagement-session`.
- [x] Chatbot booking link cleanup: align “book a consultation” chatbot guidance and quick replies with `/book-consultation` instead of `/book-a-session`.
- [x] Mobile sticky CTA cleanup: route the mobile “Book consult” action to `/book-consultation`.
- [x] Pricing/package wording cleanup: keep pricing and package tools pointed at `/book-a-session` for package-context handoff, but label the action as session booking instead of generic booking/consultation.
- [x] Homepage path QA: confirm hero consultation, package recommender, and featured-work paths land with clear next actions.
- [x] Service page path QA: confirm wedding, portrait, engagement, concierge, event, commercial, and branding CTAs separate consult, session booking, quote, and gallery request intent.
- [x] Local page path QA: confirm local/service-area CTAs route to session booking, consultation, contact, package tools, and request portfolio with clear labels.
- [x] Request-portfolio path QA: confirm success-state CTAs route to consultation and featured work with no ambiguity.
- [x] Pricing/package tool path QA: confirm selected package context survives into `/book-a-session` and does not imply a final quote.
- [ ] Live browser QA: click the full visitor paths on desktop and mobile once the local server is running.

### Next Admin Dash / Tools Roadmap

- [x] Admin Command Center: turn `/admin` into a daily cockpit with today’s leads, overdue follow-ups, upcoming shoots, gallery delivery status, and SEO/site alerts.
- [x] Lead Workspace Upgrade: add dashboard-level lead quick actions for email, project creation, and portfolio sending, plus stronger service/source context.
- [x] AI Page Builder Preview QA: after generation, run a publish-readiness checklist for missing CTA, generic copy, no real image, weak SEO title, mobile risk, missing proof, and missing local context.
- [x] AI Page Builder Preview QA: show pass/warn/fail badges before publishing so generated pages can be corrected before going live.
- [x] Admin Tool Ownership Cleanup: surface Primary, Strategic, Legacy, Internal, Experimental, and Backup badges in command palette, dashboard cards, and operations inventory.
- [x] Booking + Project Pipeline: connect inquiry → quote → booking → project → gallery delivery with lifecycle shortcuts on `/admin`.
- [x] Notification System: add actionable dashboard alerts for stale leads, gallery delivery review, SEO/site health, and weekly bookings.
- [x] Admin Mobile Pass: add phone-friendly quick actions for responding to leads, calling, viewing bookings, and checking gallery links.
- [x] Client Gallery Tool: make `/admin/galleries` the polished delivery hub for creating private galleries, copying gallery.studio37.cc links, emailing clients, tracking status, and confirming delivery readiness.
- [x] Client Gallery Tool: add gallery delivery checklist states for access code, client email, expiration/download settings, image count, preview link, email ready, and follow-up readiness.

### Lead Workspace Upgrade 2.0

- [x] Lead detail workspace: create a richer lead view with contact info, service interest, source attribution, status, budget/timing notes, and last activity.
- [x] Lead timeline: show chatbot messages, form submissions, package recommender events, portfolio requests, quote captures, emails, and manual follow-up notes in one chronological feed.
- [x] Suggested next action: add a clear recommendation for each lead such as call, text, email, send portfolio, send quote, schedule consult, or create project.
- [x] Package fit: surface likely package/service fit based on lead source, selected service, budget clues, session type, and chatbot context.
- [x] One-click actions: add shortcuts to email, call, text, send booking link, send tailored portfolio, create project, and mark follow-up complete.
- [x] Portfolio request handoff: connect `/request-portfolio` submissions to the lead workspace with requested project type, delivery status, and send-history.
- [x] Lead priority cues: flag hot, stale, incomplete-contact, high-intent, and needs-response leads so the admin knows what to handle first.
- [x] Mobile lead workflow: make the lead workspace usable from a phone for quick call/text/email/follow-up actions.

### Next Lead/Admin Steps

- [x] Lead workspace live QA: test `/admin/leads` with real lead records, empty contact fields, portfolio requests, phone-only leads, and converted leads.
- [x] Lead action persistence: add structured tracking for portfolio sent, quote sent, booking link sent, project created, and follow-up completed instead of relying only on communication notes.
- [x] Lead detail route: consider adding `/admin/leads/[id]` so lead records can be linked directly from alerts, emails, dashboards, and mobile bookmarks.
- [x] Project pipeline connection: turn the create-project shortcut into a prefilled inquiry → project flow using the lead’s contact, service, date, budget, source, and notes.
- [x] Portfolio send workflow: create a dedicated send-portfolio modal with project type, sample gallery choice, message template, send status, and timeline logging.
- [x] Follow-up scheduling: add next-follow-up editing from the lead workspace with dashboard alerts for overdue follow-ups.
- [x] Lead intelligence refinement: replace heuristic package fit with a stored score/source metadata model once enough real lead data accumulates.
- [x] Mobile admin walkthrough: QA lead scanning, call/text/email, send portfolio, and follow-up completion on phone widths.

### Project + Gallery Pipeline Upgrade

- [x] Admin Lead Workflow QA: test a real-ish lead through `/admin/leads` → lead detail → send tailored portfolio → schedule follow-up → create project → verify project prefill.
- [x] Project pipeline polish: refine `/admin/projects/new` so the lead-conversion flow feels like a continuation of the lead workspace instead of a separate legacy form.
- [x] Project pipeline polish: replace remaining project creation browser alerts with inline admin errors and success states.
- [x] Project to gallery handoff: add a clear create-gallery path from project records using client name, email, service type, session date, and project context.
- [x] Gallery delivery workflow: connect project → gallery delivery checklist → gallery link send → delivery follow-up.
- [x] Dashboard alerts: surface overdue follow-ups, portfolio drafts, quotes started but not sent, projects created from leads, and gallery delivery tasks on `/admin`.
- [x] Structured action review: confirm quote, portfolio, booking, gallery, project, prep, review, and follow-up metadata appears consistently in communication logs.
- [x] Mobile workflow QA: test the full lead → project → gallery flow on phone widths for tap targets, modal fit, and action clarity.

### Next Tools + Public Site Audit Priorities

- [x] ShootProof Delivery Tracker 2.0: make `/admin/galleries` purely a ShootProof delivery tracker with actual ShootProof gallery URL, invoice status, contract status, client notified, follow-up sent, delivered status, and no wording that implies Studio37 hosts the galleries.
- [x] Admin Tool Cleanup: clean up older internal tools with rough patterns, especially legacy gallery/image tools, legacy visual editor, page builder v1/v2 overlap, client portals, and database migrations.
- [x] Project List Reliability: harden project list/detail UX with inline API errors, refresh buttons, recently-created success state, and empty-state copy that explains active filters.
- [x] Lead → ShootProof → Follow-Up Workflow: connect lead → project → ShootProof dashboard/link tracking → delivery follow-up task on `/admin`.
- [x] Booking Friction Audit: manually test mobile booking for package clarity, form length, calendar slot confidence, error states, and confirmation copy.
- [x] Commercial/Branding Page: improve the temporary commercial portfolio state with request-sample-gallery CTA, usage/licensing clarity, deliverable examples, and honest portfolio-in-progress copy.
- [x] Blog Facelift Round 2: improve blog category navigation, article card hierarchy, "read this before booking" positioning, and internal links to services and booking.

### Next Feature QA Priorities

- [x] Lead → Project → ShootProof Tracker: create a fake lead, turn it into a project, open the project, click Track Delivery, paste a ShootProof/gallery URL, save it, refresh, and confirm it still appears.
- [x] Booking Flow QA: test mobile and desktop booking for consultation, package booking, custom booking, confirmation copy, email/lead creation, and error states.
- [x] Chatbot Conversion QA: ask about finished galleries, pricing, engagement sessions, weddings, commercial work, and booking help; confirm gallery requests route to `gallery.studio37.cc` and lead-capture requests route to the portfolio request flow.
- [x] Public Site Conversion Pass: click homepage → services → pricing/recommender → booking and make sure every step has an obvious next action.
- [x] Admin Cockpit Polish: make `/admin` feel more like the daily command center with hot leads, upcoming shoots, projects needing delivery, blog drafts, and SEO alerts.

### Portfolio Request Flow Polish

- [x] Public request page polish: make `/request-portfolio` clearly explain that visitors can describe what they are planning and Studio37 will send relevant complete galleries privately.
- [x] Request form fields: capture project type, location/city, date or timeline, what they want to compare, email, and phone.
- [x] Admin lead handoff: make portfolio requests show in `/admin/leads` with a clear `Complete gallery request` label, project type, and send status.
- [x] Response workflow: add template options for `Wedding full gallery`, `Portrait session gallery`, `Event coverage sample`, and `Commercial sample set`.
- [x] Chatbot alignment: when someone asks to see a full gallery, explain that the public link is a curated preview and offer the complete gallery request form.
- [x] Analytics/conversion tracking: track clicks to `/request-portfolio`, submissions, and requested service type.

### Focused Portfolio Request Conversion Audit

- [x] Audit homepage → service page → featured work/request galleries → `/request-portfolio` → admin lead handoff for conversion clarity.
- [x] Audit mobile and desktop wording for `Featured Work`, `Complete Galleries`, `Request Portfolio`, and related CTAs so the distinction is obvious.
- [x] Audit `/request-portfolio` form friction, field order, success state, error state, and trust copy.
- [x] Audit chatbot responses for full-gallery, sample-gallery, pricing, service, and booking prompts.
- [x] Audit `/admin/leads` portfolio request handling for visibility, priority cues, response templates, send logging, and follow-up.
- [x] Audit SEO/content language so public pages do not imply the public gallery contains full galleries.

### Focused Portfolio Request Conversion Audit Findings

- [x] Portfolio proof component cleanup: update `components/PortraitHighlightGallery.tsx` so its CTA copy says `Featured Work` or `Request Complete Galleries`, not `View Full Portfolio`, and route complete-gallery intent to `/request-portfolio`.
- [x] Legacy/editor template cleanup: update remaining VisualEditor and builder defaults that still use `View Portfolio`, `View Gallery`, or direct `gallery.studio37.cc` as the proof CTA so newly generated sections inherit the private-request strategy.
- [x] Prep guide CTA alignment: update prep guide download/lead magnet copy so `gallery.studio37.cc` is described as featured work and complete gallery requests point to `/request-portfolio`.
- [x] Request form accessibility polish: replace placeholder-only fields in `PortfolioRequestForm` with visible labels/help text, especially for project type, location, timeline, comparison goal, and notes.
- [x] Request form trust polish: add a privacy/reassurance line explaining that complete galleries are sent privately and contact info is used only for follow-up.
- [x] Request success state polish: add next actions after submit, such as `Book a consultation`, `View featured work`, and expected response timing.
- [x] Admin lead list polish: rename generic `Portfolio` quick-action buttons to `Send Galleries` or `Complete Gallery Request` where the workflow is specifically about private gallery examples.
- [x] Admin response template polish: replace the quote email line `View recent work: https://gallery.studio37.cc` with `View featured work` plus `request/receive private complete galleries` language.
- [x] SEO polish: update `/request-portfolio` metadata title from `Request a Studio37 Portfolio Gallery` to emphasize `Private Complete Galleries` and tailored proof sets.
- [x] Analytics polish: add a distinct click event for portfolio request CTA clicks before form view/submit, so CTA effectiveness can be separated from page landings.

### Wide UI/UX, Admin, SEO, Design, And Conversion Audit

- [x] UI/UX audit: review homepage, services, local pages, blog, booking, request-portfolio, and core admin flows across desktop and mobile.
- [x] Admin audit: review `/admin`, leads, bookings, projects, gallery tracker, blog tools, AI Page Builder, navigation, SEO, and legacy-tool visibility.
- [x] SEO audit: review titles, descriptions, internal links, sitemap/robots behavior, local/service page differentiation, and conversion-intent keywords.
- [x] Design audit: identify sections that feel less polished than the homepage, too dense, misaligned, or visually inconsistent.
- [x] Conversion audit: verify each major public route has a clear next click to consult, package/pricing, request portfolio, or contact.
- [x] Performance/accessibility audit: check image weight, lazy loading, layout shift, mobile tap targets, headings, alt text, and form accessibility.

### Wide UI/UX, Admin, SEO, Design, And Conversion Audit Findings

- [x] Public route containment: replace the hard `/portfolio` and `/gallery` external redirects with an internal bridge page that explains featured work, complete private galleries, and the request flow before sending visitors off-site.
- [x] Gallery-link governance: classify every remaining `gallery.studio37.cc` link as `Featured Work`, `Client Delivery`, `ShootProof Admin`, or `Legacy Placeholder` so public CTAs, admin delivery links, and builder samples stop blending together.
- [x] AI Page Builder proof CTA cleanup: update `app/api/site/generate/route.ts`, `BuilderRuntime`, legacy VisualEditor placeholders, and block template sample data so generated pages prefer `/request-portfolio` for proof CTAs and use the public gallery only as featured work.
- [x] Admin dashboard CTA wording: rename the generic `/admin` recent-lead `Portfolio` quick action to `Send Galleries` or `Complete Gallery Request` so the admin flow matches the private-gallery strategy.
- [x] Admin email/template split: separate client gallery delivery templates from public featured-work/private complete-gallery request templates; current lead and marketing templates still mix `gallery.studio37.cc` with proof-request language.
- [x] Request-portfolio SEO expansion: add FAQ/schema content for curated public preview, private complete galleries, response timing, privacy, and tailored proof sets.
- [x] Blog conversion pass: add consistent article-level CTAs for booking, pricing/package comparison, and requesting complete galleries so education traffic has an obvious next click.
- [x] Service/local CTA hierarchy QA: verify each service and city page has the same conversion triad: book consult, compare pricing/package, and request complete galleries.
- [x] Form accessibility sweep: audit booking, contact, quote, prep guide, and lead capture forms for visible labels, mobile-friendly inputs, inline errors, and useful success next steps.
- [x] Mobile sticky CTA QA: test sticky CTA labels, safe-area spacing, and tap targets on homepage, services, local pages, blog, booking, and request-portfolio.
- [x] Design consistency pass: identify older admin/public sections whose typography, radius, shadows, spacing, or empty states do not match the polished homepage and request-portfolio styling.
- [x] Admin mobile operations pass: test lead triage, send galleries, create project, open ShootProof, update follow-ups, and review alerts at phone widths.
- [x] Performance/layout pass: review image sizing, lazy-load reserve heights, and above-the-fold section weights on homepage, services, local pages, blog, and request-portfolio to reduce layout shift.

### Expansive Admin Audit - July 2, 2026

- [x] Admin route consolidation: inventory all 60 admin-facing route/client files and decide which are primary, legacy, experimental, backup, internal, strategic, utility, or active.
- [x] Admin dashboard cleanup: redirect duplicate dashboard surfaces (`/admin/dashboard`, `redirect-page`) to `/admin` so `/admin` is the single trusted control center.
- [x] Admin navigation cleanup: hide or badge experimental/legacy tools in the sidebar and dashboard, especially old gallery, content, page-builder-v2, block-editor, editor-test, database migrations, and backup routes.
- [x] Admin gallery consolidation: clarify ownership between `/admin/gallery` and `/admin/galleries`; make client delivery/gallery.studio37.cc workflows the primary path and mark the old image manager as legacy.
- [x] Admin content/editor consolidation: choose Content Hub, AI Page Builder, and Visual Page Builder as the strategic path; move older live/content/gallery editor paths out of primary navigation.
- [x] Admin browser-dialog cleanup: replace active quick-win `alert()` usage in AI block suggestions, template selector, and lead scoring; catalog remaining legacy/internal browser-dialog cleanup behind route ownership.
- [x] Admin destructive-action safety: add route ownership notes for migration, legacy gallery, live-editor import, page-builder cache, client portal, and project creation risk areas so dangerous tools are not promoted as primary.
- [x] Admin notification consistency: move quick-win copy and lead-scoring feedback to inline/toast patterns and guard additional cleanup through the expanded audit.
- [x] Admin data quality: identify duplicate/mock dashboard risk and collapse the old `/admin/dashboard` surface into `/admin`.
- [x] Admin mobile QA: preserve mobile admin nav/search patterns while reducing primary navigation clutter from legacy/internal tools.
- [x] Admin forms polish: identify active forms needing deeper validation and keep risky/internal tools out of primary routes until polished.
- [x] Admin empty/error states: preserve current AdminState guardrails and add lower-use tools to the route ownership audit for future standardization.
- [x] Admin security review: classify auth-sensitive tools such as migrations, revalidation, gallery mutation, chatbot import, marketing sends, and portals as internal/active review surfaces.
- [x] Admin external-link review: keep gallery.studio37.cc explicit in client gallery ownership and command palette copy.
- [x] Admin performance review: keep heavy legacy/experimental builders out of primary nav and preserve the AI/visual builder path as the strategic investment.
- [x] Admin audit automation: expand `audit:admin-operations` into checks for route ownership, browser dialogs, debug logs, dashboard redirects, AI Page Builder positioning, gallery host consistency, and deprecated admin files.

### AI Page Builder Quality

- [x] AI Page Builder: keep as an active strategic tool, not a removal candidate; position it as the premium page draft generator.
- [x] AI Page Builder: improve generated page quality through stronger visual builder components, section presets, spacing rules, image handling, CTA hierarchy, and responsive defaults.
- [x] AI Page Builder: add homepage-quality templates for service pages, local landing pages, blog landing pages, campaign pages, lead magnets, and commercial/branding pages.
- [x] AI Page Builder: add guardrails so generated pages avoid generic copy, weak stock-looking visuals, poor mobile spacing, and unclear conversion paths.

### Chatbot And Admin Tools Audit

- [x] Chatbot: keep portfolio/gallery links pointed to `https://gallery.studio37.cc`, but update link copy so users understand it opens the ShootProof gallery experience.
- [x] Chatbot: align the AI prompt pricing ranges with current public pricing and package positioning so it does not quote stale portrait, event, wedding, or commercial ranges.
- [x] Chatbot: fix image upload context so `imageAnalysisContext` is actually included in the AI prompt before generation.
- [x] Chatbot: replace image upload `alert()` calls with inline error states inside the chat window.
- [x] Chatbot: require or strongly prompt for email/phone before quote-form submission so chat quote leads do not arrive without usable contact info.
- [x] Chatbot: add a short fallback path when AI generation fails that routes users to book consultation, services, pricing, or phone contact without sounding broken.
- [x] Chatbot: audit legacy `components/ChatBot.tsx` and `app/api/chat/route.ts`; confirmed public mount uses `EnhancedChatBot` and `/api/chat/respond`.
- [x] Admin audit: expand `audit:admin-operations` to include galleries, gallery image editor, marketing templates, database migrations, page builder, live editor, client portals, lead scoring, chatbot training, chatbot mount, and admin route ownership.
- [x] Admin UX: replace remaining browser `alert()`, `confirm()`, and `prompt()` calls in high-use gallery, template, and chatbot-training tools with shared toast/confirm patterns.
- [x] Admin cleanup: remove production `console.log` debug output from leads, page builder, live editor, gallery clean page, and backup admin pages.
- [x] Admin safety: add stronger destructive-action confirmation copy for gallery deletion, image deletion, template deletion, and chatbot content re-import flows.
- [x] Admin navigation: verify old builder/editor routes are either clearly labeled as legacy or hidden from the primary admin path.

### Local Page Differentiation Pass

- [x] Add a real Studio37 proof block to local photographer pages so they feel less templated.
- [x] Improve local/service-area hero image rotation so nearby pages do not all rely on the same visual treatment.
- [x] Add stronger nearby location confidence by market: favorite local backdrops, parking/walking notes, best light windows, and seasonal planning guidance.
- [x] Add more service-specific local copy so wedding, portrait, family, engagement, event, and commercial local pages feel intentionally matched to the search intent.

### Mobile Nav / Logo Final Polish

- [x] Restore the public polish audit guardrail for logo sizing and scroll-state behavior.
- [x] Fine-tune mobile header spacing, tap targets, and menu rhythm on 390px, 430px, and tablet widths.
- [x] Recheck logo size and scroll transition on light pages, dark hero pages, and long service pages.

### Homepage Performance / Layout Pass

- [x] Increase homepage lazy-section reserved height to reduce layout jump and satisfy the performance guardrail.
- [x] Review each homepage `LazyMount` section visually and set reserved heights based on real rendered content instead of one default value.
- [x] Re-run homepage desktop/mobile screenshots after lazy-height tuning to confirm spacing still feels intentional.

### Commercial Service Temporary State

- [x] Replace the removed commercial showcase with a slim, polished "commercial portfolio is being curated / request sample gallery" CTA.
- [x] Keep commercial service trust intact with real process proof: usage planning, delivery expectations, licensing support, and brand-ready exports.
- [x] Add an admin/content note for the future commercial portfolio rebuild once stronger work samples are ready.

### Booking Confidence Pass

- [x] Add one more trust layer near booking: what happens after inquiry, delivery expectations, two-photographer promise, and consultation reassurance.
- [x] Make booking fallback paths clearer for visitors who are unsure of package, date, or final service type.
- [x] Re-run booking mobile/desktop QA to confirm trust modules do not add friction or crowd the form.

## Public Site Improvement Backlog - June 30, 2026

### Navigation And Service Positioning

- [x] Add Engagement Photography to the Services dropdown and point it to the engagement service page.
- [x] Add Concierge Services to the Services dropdown and point it to a dedicated concierge landing page.
- [x] Create a dedicated Concierge Services landing page if concierge search demand grows beyond the engagement page anchor.
- [x] Add homepage entry points for Engagement Photography and Concierge Services above or near the main service grid.
- [x] Add internal links from wedding, proposal, session prep, and location pages into Engagement Photography and Concierge Services.

### General Public Site Improvements

- [x] Tighten homepage first-viewport copy so the main offer, service area, and booking path are clear in under 5 seconds.
- [x] Add a public proof strip with review count, delivery timeline, insurance/PPA trust, and two-photographer value.
- [x] Add service-specific portfolio snippets to wedding, portrait, event, commercial, and branding pages.
- [x] Improve footer service links so every major service page is reachable without using the top nav.
- [x] Add a lightweight "not sure what to book?" route from homepage, services, pricing, and contact into the package recommender.
- [x] Audit mobile spacing for sticky CTA, chatbot, newsletter modal, and quote capture on 390px-wide screens.
- [x] Add schema and metadata QA for new service pages before each deploy.
- [x] Review Cloudinary hero crops and image quality on the homepage and top service pages.

### Conversion Improvements

- [x] Add a short concierge inquiry flow that captures proposal date, location ideas, budget range, privacy needs, decor needs, and photo/video preference.
- [x] Add "starting at" or "custom planning starts with a consult" microcopy near concierge CTAs so visitors understand pricing expectations.
- [x] Add service-specific testimonials for engagement, proposal, and concierge clients near the booking CTAs.
- [x] Track nav clicks, concierge CTA clicks, quote starts, and booking starts as separate conversion events.
- [x] Add abandoned inquiry follow-up for visitors who open concierge or engagement quote flows but do not submit.

### SEO And Content

- [x] Build local engagement/proposal pages for The Woodlands, Magnolia, Montgomery, Conroe, Tomball, and Houston.
- [x] Add FAQ schema for proposal photography, engagement photography pricing, concierge planning, and photo/video coverage.
- [x] Add recent engagement/proposal portfolio examples with strong alt text and links to `https://gallery.studio37.cc`.
- [x] Publish blog posts targeting proposal planning, engagement session locations, what to wear, and golden-hour engagement photos.
- [x] Audit title/meta uniqueness across engagement, wedding, portrait, and city landing pages to avoid repeated templates.

### UX And Performance

- [x] Run mobile screenshot QA for the Services dropdown, engagement page anchor jump, sticky CTA, quote popup, and booking CTA.
- [x] Improve image selection and crop QA on engagement and concierge sections so the first viewport feels premium and specific.
- [x] Add a compact "choose your engagement path" module: session only, proposal coverage, full concierge, photo + video.
- [x] Review Core Web Vitals for public service pages and reduce above-the-fold image weight where needed.

## Fresh Audit Backlog - June 25, 2026

Audit notes: `npm run audit:seo-assets` passed across public metadata/source files; `npm run typecheck -- --pretty false` passed; `npm run verify:seo` currently fails because the live `sitemap_index.xml` is being served stale from production cache; `npm run lint` currently fails on one admin lint error in `app/admin/appointment-reminders/page.tsx`.

### SEO

- [x] Fix production sitemap cache staleness: `npm run verify:seo` reports `sitemap_index.xml` served with `age=1359` while cache headers advertise `s-maxage=600`; make sitemap endpoints dynamic/no-store or add deploy-time purge/revalidation so Google does not see stale sitemap indexes.
- [x] Add explicit noindex/canonical/redirect policy coverage for utility or private pages that currently lack local metadata handling: `/login`, `/setup-admin`, `/gallery/[accessCode]`, `/gallery`, and `/portfolio`.
- [x] Add Search Console and live sitemap cache monitoring to the admin SEO dashboard, including cache age, `cache-status`, `x-nf-cache` when available, last production verification time, and a one-click recheck.
- [x] Add structured-data validation for seasonal and prep-guide lead magnet pages: `/mini-sessions`, `/brand-refresh-sessions`, `/senior-portraits`, `/holiday-party-photography`, `/graduation-photography`, and `/session-prep/*/download`.
- [x] Add a canonical conflict report for short city routes, `/locations/[slug]`, and generated `local-photographer-*` pages so similar city/service landing pages cannot compete in search.
- [x] Add image SEO QA for public Cloudinary assets: descriptive alt text, minimum dimensions, expected transform quality, and no accidental low-quality compression on large hero/recent-work/gallery cards.
- [x] Add a route metadata test that fails when a public `app/**/page.tsx` has neither `metadata`/`generateMetadata` nor an explicit noindex/redirect classification.

### UI/UX

- [x] Run screenshot QA at 390px, 768px, and 1440px for homepage, service pages, pricing calculator, package recommender, prep-guide download pages, booking, and admin login; create fixes for text overflow, CTA overlap, and awkward crop issues.
- [x] Refine service-area market cards to sound more client-facing and less internal/SEO-oriented: fewer slash-separated city lists, more natural labels, and clearer paths into service or city pages.
- [x] Add high-quality image guardrails to recent-work and gallery modules so rendered cards request enough Cloudinary width/quality for retina desktop displays without overloading mobile.
- [x] Add accessibility QA for public conversion surfaces: keyboard focus states for filter pills, aria labels for external gallery links, skip-to-content visibility, and reduced-motion support for animated/hover sections.
- [x] Replace any remaining visible copy that sounds like internal site strategy, such as "modules" or "high-intent", with language a photography client would naturally understand.
- [x] Add friendly empty/error states for public lead magnets, pricing/recommender save flows, and availability confidence when APIs fail or network requests time out.

### Conversion And Lead Capture

- [x] Add a lead-source dashboard for save quote, prep-guide downloads, package recommender CTAs, pricing CTAs, campaign pages, and gallery handoff clicks.
- [x] Persist pricing calculator and package recommender interactions as lead timeline events, not only analytics events or browser session data.
- [x] Add conversion QA for every seasonal page: above-fold CTA, booking prefill, lead context, source metadata, thank-you copy, and autoresponse template.
- [x] Add editable A/B copy hooks for homepage CTAs, service CTAs, package recommender intro text, and quote-capture popup headlines without code changes.
- [x] Add abandoned booking recovery for visitors who choose a package or slot but do not complete appointment creation.
- [x] Add follow-up segmentation for lead magnets so portrait, wedding, event, and commercial guide requests trigger different admin tasks and email copy.

### Admin And Operations

- [x] Replace browser `alert()` and `confirm()` usage in admin workflows with shared `AdminToast` and `AdminConfirmDialog` patterns across calendar, projects, inbox, theme, editor, and blog tools.
- [x] Fix the lint-blocking issue in `app/admin/appointment-reminders/page.tsx:134` and add focused lint coverage to CI so admin lint regressions are caught before deploy.
- [x] Replace raw JSON textarea block editors in `app/admin/editor/EditorFormClient.tsx` with structured repeatable controls and validation for FAQ, services, stats, pricing, and feature-list blocks.
- [x] Add a real preview or remove the dead placeholder state in `app/admin/site-editor/page.tsx` that currently says "Preview coming soon for this page."
- [x] Remove debug console output from admin AI/blog generation and show raw AI diagnostics only in a collapsible admin-only error panel.
- [x] Add an admin recent-work manager backed by shared public-content/CMS data with feature toggle, ordering, image quality controls, alt text, service tag, and `https://gallery.studio37.cc` link validation.
- [x] Add an admin lead-magnet report with requests by guide, source page, UTM, follow-up status, and conversion to booking.
- [x] Add admin route inventory cleanup for legacy or overlapping editors (`content`, `content-enhanced`, `page-builder`, `live-editor`, `visual-editor`, `site-editor`) so the preferred editing tool is obvious.

### Technical Quality And Performance

- [x] Add CI/deploy workflow coverage for `typecheck`, focused lint, `audit:seo-assets`, local sitemap endpoint tests, and production `verify:seo` after deploy.
- [x] Add Playwright smoke and screenshot tests for homepage, services, tools/pricing, package recommender, prep guides, booking, admin leads, and admin SEO.
- [x] Add Cloudinary URL helper tests to prevent undersized widths or low-quality transforms on large public image cards.
- [x] Split heavy admin editors and builders behind dynamic imports and track admin route JavaScript budgets separately from public-site budgets.
- [x] Build an internal link checker for public routes plus expected external links to `https://gallery.studio37.cc`.
- [x] Add fixed-element overlap tests for chatbot, sticky CTA, quote popup, mobile nav, and booking CTA on small screens.
- [x] Add header/CSP regression checks for homepage HTML, robots, sitemap XML, admin pages, and API responses.

## Fresh Audit Backlog - June 11, 2026

### UI/UX

- [x] Audit the live CMS/page-builder homepage against the source fallback homepage so critical sections like package recommender, curated recent work, and service-area modules are guaranteed to render even when a stored layout exists.
- [x] Add a compact first-viewport "choose your path" module for Portrait, Wedding, Event, Commercial, and Branding so visitors can self-segment before reading long homepage copy.
- [x] Reduce homepage cognitive load by moving dense SEO copy below stronger scannable cards, FAQs, or accordions.
- [x] Add clear "starting at" pricing microcopy near every major service CTA, with a link to `/tools/pricing` or `/tools/package-recommender`.
- [x] Improve mobile sticky CTA behavior so the chatbot, save-quote popup, and sticky action bar never stack over each other on small screens.
- [x] Add visible active states and descriptive helper text for dropdown navigation on service and service-area menus.
- [x] Add service-specific "what to expect" cards above the fold on high-intent pages instead of relying only on long-form page copy.
- [x] Add trust proof near the booking form itself: review count, insurance/PPA, delivery timeline, and two-photographer promise.
- [x] Add a lightweight gallery handoff page or modal explaining that final galleries open on ShootProof at `https://gallery.studio37.cc`.

### SEO

- [x] Add `/tools/package-recommender` to the sitemap and required sitemap endpoint test coverage.
- [x] Add metadata and sitemap coverage for any future ShootProof handoff/gallery explainer page while keeping `/gallery` and `/portfolio` redirects out of the sitemap.
- [x] Recheck Netlify/Next sitemap cache behavior because live sitemap headers show very old cache age even when `lastmod` is current.
- [x] Add a deployment verification script that compares live sitemap URLs against `lib/sitemap-data.ts` required URLs after every push.
- [x] Add FAQ schema to package recommender, pricing, and session prep hub pages.
- [x] Add SoftwareApplication or WebApplication schema for `/tools/pricing` and `/tools/package-recommender`.
- [x] Add BreadcrumbList schema to pricing, package recommender, service-area index, and prep-guide pages.
- [x] Standardize local landing page canonical strategy so short city redirects and canonical destination pages cannot compete.
- [x] Add image metadata audit coverage for Cloudinary assets used in public conversion sections and recent-work cards.
- [x] Add internal links from top location pages to package recommender, pricing tool, and relevant prep guides.
- [x] Review title/meta uniqueness across generated city/service pages to reduce template similarity.
- [x] Add indexability checks for newly added tools and lead magnet pages in the admin SEO dashboard.

### Conversion And Lead Capture

- [x] Refine save-quote popup timing and triggers by page type, with less aggressive behavior on first-page visitors.
- [x] Add analytics events for package recommender selections, pricing duration changes, save-quote opens/submits/dismissals, and prep-guide downloads.
- [x] Send admin notifications with richer context from save-quote captures: page URL, selected package if present, calculator query params, and referrer.
- [x] Make the client-facing save-quote auto-response a dedicated template instead of reusing generic contact confirmation.
- [x] Add UTM/source capture to lead submissions and persist it in lead records.
- [x] Add calendar availability confidence near booking CTAs, even if the exact slot is selected later.
- [x] Add a "compare packages" CTA after blog posts and session-prep pages.

### Content And Public Features

- [x] Build the ShootProof-aware gallery launch page noted above, with expectations for downloads, favorites, sharing, print options, and client access.
- [x] Add curated recent-work management data in code or CMS so recent-work cards are not hard-coded in a component long term.
- [x] Create service-specific prep-guide download pages for Portrait, Wedding, Event, and Commercial instead of a single hub-only lead magnet.
- [x] Add "best locations for photos" sections for top markets: Pinehurst, The Woodlands, Conroe, Magnolia, Tomball, Spring, Montgomery, Bryan, and College Station.
- [x] Add venue-style examples for weddings and events without naming unsupported venues as partners.
- [x] Add a content block for turnaround expectations by service: sneak peeks, highlights, final gallery, rush options.
- [x] Add seasonal campaign pages for mini sessions, senior portraits, holiday parties, graduations, and brand refreshes.
- [x] Add testimonial modules mapped by service type instead of one generic testimonial pool.

### Admin And Operations

- [x] Add a CMS/admin toggle to feature or reorder recent-work cards without editing code.
- [x] Add an admin view for lead magnets showing guide requests, conversion source, and follow-up status.
- [x] Add admin alerting when sitemap required URLs are missing from live production.
- [x] Add a "public launch checklist" in admin for new pages: metadata, schema, sitemap, internal links, CTA, analytics event, and visual QA.
- [x] Add a reusable email template specifically for saved quote follow-up.
- [x] Add lead timeline events for package recommender selections and prep-guide downloads.

### Public Polish And Mobile Optimization

- [x] Remove nav logo placeholder swap by hydrating the header with the real Studio37 Cloudinary logo on first paint.
- [x] Make recent-work gallery CTAs uniform across every highlighted card.
- [x] Make service-card images and titles link to the matching service pages while keeping Learn More and pricing-tool actions.
- [x] Add mobile screenshot QA coverage for blog, service pages, and the Pinehurst service-area page.
- [x] Add an automated public polish audit for logo hydration, card links, gallery CTA consistency, and mobile route coverage.
- [x] Run local mobile screenshots for homepage, services, blog, and `/local-photographer-pinehurst-tx`.
- [x] Normalize shared service-area and blog-list spacing/type scale to better match the homepage system.
- [x] Review mobile header, sticky CTA, chat, save-quote, and pricing-tool stacking across 390px, 430px, and tablet widths.
- [x] Reduce above-the-fold mobile payload on public pages by deferring quote capture and chat widgets until eligible/idle states.
- [x] Add visual screenshot snapshots for the most important public routes.
- [x] Add repeatable local/mobile screenshot artifacts for homepage, services, blog, and `/local-photographer-pinehurst-tx` so post-deploy comparison has a source of truth.

### Technical Quality And Performance

- [x] Reduce homepage client JS by reviewing dynamic imports, page-builder hydration, and chatbot/save-quote mounting behavior.
- [x] Add Playwright smoke tests for homepage, services, pricing, package recommender, session prep, locations, and booking.
- [x] Add visual regression screenshots for mobile sticky CTA, save-quote popup, and navigation dropdowns.
- [x] Add a link checker for internal public links plus expected external links to `https://gallery.studio37.cc`.
- [x] Add automated checks for overlapping fixed UI elements on mobile.
- [x] Add a production smoke test that fetches live headers for homepage, robots, sitemap, and top conversion pages after deploy.
- [x] Review CSP differences between homepage HTML responses and static XML/text endpoints to keep security consistent without breaking analytics or widgets.

### Live UX Audit - Services Flow

- [x] Rework the "What To Expect" module so it feels like a premium process strip instead of four generic cards.
- [x] Move or restyle the module so it supports the services hero instead of visually competing with it at the top of `/services`.
- [x] Add mobile bottom padding or layout protection so the sticky CTA does not cover the final "Gallery" card copy.
- [x] Improve desktop spacing around the fixed header so the nav/logo never overlaps the module heading or package CTA.
- [x] Make the process steps more cohesive: numbered flow, connecting line, tighter copy, and consistent vertical rhythm.
- [x] Consider service-aware copy for portrait, wedding, event, commercial, engagement, and concierge pages instead of the same generic wording everywhere.
- [x] Re-test desktop and mobile screenshots for `/services` and `/services/portrait-photography` after the module redesign.

### Live Mobile Walkthrough Findings

- [x] Homepage: reduce above-fold compression so hero, trust badges, and first CTA feel less cramped on 390px screens.
- [x] Homepage: verify recent-work images are real assets; gray blocks were screenshot timing, not missing content.
- [x] Services: verify service-card images are real assets; gray blocks were screenshot timing, not missing content.
- [x] Services: shorten the mobile scroll before the user reaches the primary service cards by moving the process module below service content.
- [x] Blog: limit the first mobile archive pass to the latest articles so the page is not an extremely long unbroken scroll.
- [x] Blog: tighten post-card vertical rhythm so cards feel editorial instead of repetitive CMS output.
- [x] Booking: hide sticky quick actions/chat while the booking form is active so they do not cover form controls.
- [x] Pricing: hide sticky quick actions/chat around calculator summary and "Continue to Book" controls.
- [x] Package recommender: hide sticky quick actions/chat while visitors are choosing package options.
- [x] Pinehurst/local pages: reduce mobile page length pressure by adding a compact section navigator.
- [x] Pinehurst/local pages: prevent sticky/chat overlap with above-fold booking/gallery CTAs through the cross-site interactive-route visibility rule.
- [x] Cross-site mobile: define a single rule for sticky CTA + chat visibility on interactive tools and forms.
- [x] Re-run mobile screenshots for homepage, services, blog, Pinehurst, booking, pricing, and package recommender after fixes.

### Live Desktop Walkthrough Findings

- [x] Header: improve nav/logo contrast on light desktop pages like pricing, package recommender, session prep, locations, and booking.
- [x] Header: prevent the desktop nav and large "Book a Session" pill from visually crowding page titles on tool/form pages.
- [x] Homepage: reduce the oversized blank vertical gaps between recent work, local proof, quote form, process, and credentials.
- [x] Homepage: tighten the recent-work desktop grid so five cards do not leave an awkward empty third-column slot.
- [x] Services: verify loaded gallery images in the desktop "Curated highlights" module; replace gray capture states with stable image fallbacks if needed.
- [x] Services: reduce section repetition after the service cards so process, highlights, finished-gallery, and final-gallery modules feel like one guided flow.
- [x] Blog: replace gray article image states with stable fallbacks or lazy-load placeholders that feel intentional on desktop.
- [x] Blog: add desktop filtering/search or featured grouping so the 18-card archive does not feel like a long CMS wall.
- [x] Pricing/package recommender: make the top spacing account for the fixed header and increase nav legibility against white backgrounds.
- [x] Pricing/package recommender: add a stronger secondary proof/next-step module so the page does not jump from tool to FAQ to footer.
- [x] Booking: reduce the large empty desktop area below the booking form and add helpful proof, expectations, or contact fallback content.
- [x] Booking: make the date/time card and client info card feel like one cohesive booking workflow on wide screens.
- [x] Local/service-area pages: keep the new section navigator, but make desktop anchors feel more premium than small utility pills.
- [x] Locations: add a quick search/filter for long city lists so desktop visitors can find their market faster.
- [x] Session prep: rebalance the top card grid so five prep guide cards do not leave the final row feeling incomplete.
- [x] Footer: review desktop footer CTA scale and spacing on short tool pages so it supports conversion without overpowering the main task.
- [x] Re-run desktop screenshots for homepage, services, blog, Pinehurst, booking, pricing, package recommender, session prep, and locations after fixes.

### Homepage / Service-Page Conversion Pass

- [x] Homepage hero: make the primary CTA the clearest low-friction next step, with quote/package/gallery as secondary options.
- [x] Homepage hero: add a short decision cue so visitors know whether to book, price, or browse before scrolling.
- [x] Homepage path cards: make the next click obvious for known service type vs unsure visitors.
- [x] Service cards: strengthen hierarchy between service detail, package/pricing fit, and booking next step.
- [x] Service cards: keep photography services prioritized while still including branding and marketing.
- [x] Pricing/package recommender: keep recommender near service discovery and pricing near service comparison.
- [x] Sticky CTA: tune labels so mobile visitors understand Book, Price, and Gallery actions instantly.
- [x] Booking page: reduce friction by clarifying consultation/package/custom choices before date selection.
- [x] Booking page: add reassurance copy near the form so visitors know what happens after confirming.
- [x] Re-run homepage, services, pricing, recommender, and booking smoke checks after conversion copy/layout changes.

## Public Site UX/UI

- [x] Add consistent sticky/mobile CTAs for booking, pricing, and gallery.
- [x] Add clearer package comparison sections across key service pages.
- [x] Add a "what happens next" booking flow section after every major CTA.
- [x] Add stronger portfolio proof near service-page CTAs, linking to `https://gallery.studio37.cc`.
- [x] Add above-the-fold trust signals: awards, review count, recent work, delivery timeline, and service-area confidence.
- [x] Make location pages feel less templated with city-specific images, nearby venue examples, and service-specific internal links.
- [x] Improve portfolio/gallery calls-to-action so all public-facing gallery and portfolio links point to `https://gallery.studio37.cc`.

## Public Site Features

- [x] Build an interactive package recommender that routes users to booking with a prefilled package/service.
- [x] Add a ShootProof-aware gallery launch page that explains the external gallery experience and routes visitors to `https://gallery.studio37.cc`.
- [x] Add curated recent-work highlights managed inside the Studio37 site, without depending on ShootProof tags or APIs.
- [x] Add quote/booking abandonment capture with email/SMS follow-up.
- [x] Add richer service-area landing modules for top markets and high-intent services.
- [x] Add downloadable prep-guide lead magnets for portraits, weddings, events, and commercial shoots.
- [x] Add a service matcher CTA to homepage and service pages that sends visitors into the package recommender.

## Admin Dashboard UX/UI

- [x] Consolidate overlapping content/editor/page-builder tools into a clearer primary editing flow.
- [x] Add a unified command/search palette for leads, pages, galleries, settings, and admin tools.
- [x] Add a "today" operations view: new leads, stale follow-ups, upcoming appointments, campaigns due, broken SEO items.
- [x] Add clearer admin navigation grouping for content, gallery, CRM, marketing, SEO, and settings.
- [x] Add empty/loading/error states across admin dashboards that explain the next action.

## Admin Features

- [x] Add a lead timeline showing forms, SMS, emails, quotes, bookings, and gallery activity in one view.
- [x] Add an SEO issue queue with status, owner, fix action, and recheck action.
- [x] Add a sitemap health card showing URL count, last check time, excluded URLs, required URL coverage, and robots discovery status.
- [x] Add gallery-subdomain link management for client galleries, share links, and gallery previews.
- [x] Add quick actions from lead records: send quote, schedule session, create gallery, send prep guide, request review.

## SEO

- [x] Add Search Console submission workflow for `https://www.studio37.cc/sitemap.xml` and `https://www.studio37.cc/sitemap_index.xml`.
- [x] Monitor sitemap submitted/indexed counts after deployment.
- [x] Add canonical checks to the admin SEO dashboard.
- [x] Add structured data checks for service pages, location pages, blog posts, FAQs, and local business schema.
- [x] Add automated detection for redirected URLs that accidentally enter the sitemap.
- [x] Add unique city/service copy and image metadata checks for top local SEO pages.

## Technical Quality

- [x] Work through the current repo-wide TypeScript backlog now that `tsconfig.json` checks source files.
- [x] Mark dynamic API routes explicitly dynamic where Next probes them during build.
- [x] Review CI configuration because GitHub Actions currently appears out of sync with the Netlify root app build.
- [x] Add a lightweight sitemap endpoint test that verifies XML validity, URL count, excluded paths, and required URLs.

## TypeScript Follow-Up

- [x] Repair `components/VisualEditor.tsx` builder schema drift and missing component type references.
- [x] Add Google Maps ambient typing for `components/blocks/InteractiveMapClient.tsx`.
- [x] Normalize booking package unions so consultation package logic is type-safe.
- [x] Align AI route option payloads with the current `lib/ai-client.ts` contract.
- [x] Standardize Supabase/PostgREST error logging context types in API routes.
