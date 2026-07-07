-- Preserve scheduled blog publish times.
-- A post is public only when published = true and published_at <= now().

CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.published = true AND OLD.published = false AND NEW.published_at IS NULL THEN
        NEW.published_at = CURRENT_TIMESTAMP;
    ELSIF NEW.published = false THEN
        NEW.published_at = NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP POLICY IF EXISTS "Public can read published blog posts" ON blog_posts;
CREATE POLICY "Public can read published blog posts" ON blog_posts
  FOR SELECT USING (published = true AND (published_at IS NULL OR published_at <= NOW()));

DROP POLICY IF EXISTS "Allow public read access to published blog_posts" ON public.blog_posts;
CREATE POLICY "Allow public read access to published blog_posts"
ON public.blog_posts
FOR SELECT
USING (published = true AND (published_at IS NULL OR published_at <= NOW()));

CREATE INDEX IF NOT EXISTS idx_blog_posts_live_published_at
ON public.blog_posts (published, published_at DESC);

DROP VIEW IF EXISTS public.blog_posts_published;
CREATE VIEW public.blog_posts_published AS
SELECT
  id,
  title,
  slug,
  excerpt,
  content,
  featured_image,
  author,
  category,
  tags,
  published,
  published_at,
  created_at,
  updated_at,
  meta_description,
  meta_keywords
FROM public.blog_posts
WHERE published = true AND (published_at IS NULL OR published_at <= NOW())
ORDER BY published_at DESC NULLS LAST;

GRANT SELECT ON public.blog_posts_published TO anon;
GRANT SELECT ON public.blog_posts_published TO authenticated;
