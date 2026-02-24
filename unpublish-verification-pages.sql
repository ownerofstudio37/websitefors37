-- Unpublish verification and utility pages from sitemap
UPDATE content_pages 
SET published = false 
WHERE slug IN (
  'algolia-verification',
  'bing-site-auth',
  'google-site-verification',
  'yandex-verification'
) OR slug ~ '^a[0-9a-f]{30,}$';

-- Show affected pages
SELECT slug, published FROM content_pages 
WHERE slug IN (
  'algolia-verification',
  'bing-site-auth',
  'google-site-verification',
  'yandex-verification',
  'a41a3d624e3ac9cb94868de50be953d2'
);
