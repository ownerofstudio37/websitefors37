-- Unpublish verification and utility pages from public sitemap
-- These pages are needed for site verification but shouldn't appear in sitemap.xml

UPDATE content_pages 
SET published = false 
WHERE slug IN (
  'algolia-verification',
  'bing-site-auth',
  'google-site-verification',
  'yandex-verification'
) 
OR slug ~ '^a[0-9a-f]{30,}$'; -- Match hexadecimal verification strings

-- Log the changes
DO $$
DECLARE
  affected_count INTEGER;
BEGIN
  GET DIAGNOSTICS affected_count = ROW_COUNT;
  RAISE NOTICE 'Unpublished % verification pages from sitemap', affected_count;
END $$;
