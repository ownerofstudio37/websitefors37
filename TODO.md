# Studio37 UX/UI, SEO, and Feature TODO

## Public Site UX/UI

- [ ] Add consistent sticky/mobile CTAs for booking, pricing, and gallery.
- [ ] Add clearer package comparison sections across key service pages.
- [ ] Add a "what happens next" booking flow section after every major CTA.
- [ ] Add stronger portfolio proof near service-page CTAs, linking to `https://gallery.studio37.cc`.
- [ ] Add above-the-fold trust signals: awards, review count, recent work, delivery timeline, and service-area confidence.
- [ ] Make location pages feel less templated with city-specific images, nearby venue examples, and service-specific internal links.
- [ ] Improve portfolio/gallery calls-to-action so all public-facing gallery and portfolio links point to `https://gallery.studio37.cc`.

## Public Site Features

- [ ] Build an interactive package recommender that routes users to booking with a prefilled package/service.
- [ ] Add portfolio filtering on the gallery subdomain by service, city, venue type, and visual style.
- [ ] Add automated "recent work" blocks powered by gallery tags.
- [ ] Add quote/booking abandonment capture with email/SMS follow-up.
- [ ] Add richer service-area landing modules for top markets and high-intent services.

## Admin Dashboard UX/UI

- [x] Consolidate overlapping content/editor/page-builder tools into a clearer primary editing flow.
- [x] Add a unified command/search palette for leads, pages, galleries, settings, and admin tools.
- [x] Add a "today" operations view: new leads, stale follow-ups, upcoming appointments, campaigns due, broken SEO items.
- [x] Add clearer admin navigation grouping for content, gallery, CRM, marketing, SEO, and settings.
- [ ] Add empty/loading/error states across admin dashboards that explain the next action.

## Admin Features

- [ ] Add a lead timeline showing forms, SMS, emails, quotes, bookings, and gallery activity in one view.
- [ ] Add an SEO issue queue with status, owner, fix action, and recheck action.
- [x] Add a sitemap health card showing URL count, last check time, excluded URLs, required URL coverage, and robots discovery status.
- [ ] Add gallery-subdomain link management for client galleries, share links, and gallery previews.
- [ ] Add quick actions from lead records: send quote, schedule session, create gallery, send prep guide, request review.

## SEO

- [ ] Submit `https://www.studio37.cc/sitemap.xml` and `https://www.studio37.cc/sitemap_index.xml` in Google Search Console.
- [ ] Monitor sitemap submitted/indexed counts after deployment.
- [ ] Add canonical checks to the admin SEO dashboard.
- [ ] Add structured data checks for service pages, location pages, blog posts, FAQs, and local business schema.
- [ ] Add automated detection for redirected URLs that accidentally enter the sitemap.
- [ ] Add unique city/service copy and image metadata for top local SEO pages.

## Technical Quality

- [ ] Work through the current repo-wide TypeScript backlog now that `tsconfig.json` checks source files.
- [x] Mark dynamic API routes explicitly dynamic where Next probes them during build.
- [ ] Review CI configuration because GitHub Actions currently appears out of sync with the Netlify root app build.
- [ ] Add a lightweight sitemap endpoint test that verifies XML validity, URL count, excluded paths, and required URLs.
