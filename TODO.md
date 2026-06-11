# Studio37 UX/UI, SEO, and Feature TODO

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
- [ ] Add a ShootProof-aware gallery launch page that explains the external gallery experience and routes visitors to `https://gallery.studio37.cc`.
- [ ] Add curated recent-work highlights managed inside the Studio37 site, without depending on ShootProof tags or APIs.
- [ ] Add quote/booking abandonment capture with email/SMS follow-up.
- [ ] Add richer service-area landing modules for top markets and high-intent services.
- [ ] Add downloadable prep-guide lead magnets for portraits, weddings, events, and commercial shoots.
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
