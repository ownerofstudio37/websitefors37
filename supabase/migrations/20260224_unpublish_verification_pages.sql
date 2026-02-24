-- Unpublish verification pages so they don't appear in sitemap
-- These pages should only be accessible for search engine verification

UPDATE content_pages
SET published = false
WHERE slug IN (
  'algolia-verification',
  'a41a3d624e3ac9cb94868de50be953d2',
  'bing-site-auth',
  'google-site-verification',
  'yandex-verification'
)
OR slug ~ '^[a-f0-9]{30,}$'; -- Matches any long hex string (Google verification format)
