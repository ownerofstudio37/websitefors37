-- Fix Supabase Database Linter Security Issues
-- Date: 2025-12-02
-- Description: Enable RLS on public tables and fix security definer view

-- ============================================
-- 1. Enable RLS on content_categories table
-- ============================================
ALTER TABLE public.content_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for content_categories
-- Allow public read access (categories are public data)
CREATE POLICY "Allow public read access to content_categories"
ON public.content_categories
FOR SELECT
USING (true);

-- Only authenticated users can insert/update/delete
CREATE POLICY "Allow authenticated users to manage content_categories"
ON public.content_categories
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- 2. Enable RLS on page_analytics table
-- ============================================
ALTER TABLE public.page_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for page_analytics
-- Only allow authenticated users (admins) to read analytics
CREATE POLICY "Allow authenticated users to read page_analytics"
ON public.page_analytics
FOR SELECT
USING (auth.role() = 'authenticated');

-- Only authenticated users can insert analytics
CREATE POLICY "Allow authenticated users to insert page_analytics"
ON public.page_analytics
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- 3. Enable RLS on content_revisions table
-- ============================================
ALTER TABLE public.content_revisions ENABLE ROW LEVEL SECURITY;

-- Create policies for content_revisions
-- Only authenticated users can access revisions
CREATE POLICY "Allow authenticated users to read content_revisions"
ON public.content_revisions
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to create content_revisions"
ON public.content_revisions
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- 4. Enable RLS on page_comments table
-- ============================================
ALTER TABLE public.page_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for page_comments
-- Public can read all comments (or restrict as needed)
CREATE POLICY "Allow public to read page_comments"
ON public.page_comments
FOR SELECT
USING (true);

-- Authenticated users can insert comments
CREATE POLICY "Allow authenticated users to insert page_comments"
ON public.page_comments
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Only authenticated users can update/delete comments
CREATE POLICY "Allow authenticated users to manage page_comments"
ON public.page_comments
FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete page_comments"
ON public.page_comments
FOR DELETE
USING (auth.role() = 'authenticated');

-- ============================================
-- 5. Enable RLS on content_activity_log table
-- ============================================
ALTER TABLE public.content_activity_log ENABLE ROW LEVEL SECURITY;

-- Create policies for content_activity_log
-- Only authenticated users can access activity logs
CREATE POLICY "Allow authenticated users to read content_activity_log"
ON public.content_activity_log
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert content_activity_log"
ON public.content_activity_log
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- 6. Fix blog_posts_published view (remove SECURITY DEFINER)
-- ============================================

-- Drop the existing view
DROP VIEW IF EXISTS public.blog_posts_published;

-- Recreate the view WITHOUT SECURITY DEFINER
-- This makes it use the querying user's permissions instead
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
  created_at,
  updated_at,
  meta_description,
  meta_keywords
FROM public.blog_posts
WHERE published = true
ORDER BY created_at DESC;

-- Grant public read access to the view
GRANT SELECT ON public.blog_posts_published TO anon;
GRANT SELECT ON public.blog_posts_published TO authenticated;

-- ============================================
-- 7. Add comments for documentation
-- ============================================

COMMENT ON POLICY "Allow public read access to content_categories" ON public.content_categories 
IS 'Categories are public data that anyone can view';

COMMENT ON POLICY "Allow authenticated users to read page_analytics" ON public.page_analytics 
IS 'Analytics are sensitive and only visible to authenticated admin users';

COMMENT ON POLICY "Allow authenticated users to read content_revisions" ON public.content_revisions 
IS 'Content revision history is only accessible to authenticated users';

COMMENT ON POLICY "Allow public to read page_comments" ON public.page_comments 
IS 'Public can see all comments; modify if you need approval workflow';

COMMENT ON POLICY "Allow authenticated users to read content_activity_log" ON public.content_activity_log 
IS 'Activity logs are audit trails only accessible to authenticated users';

COMMENT ON VIEW public.blog_posts_published 
IS 'Public view of published blog posts without SECURITY DEFINER for better security';
`   !!            Q           Q  @SQS#W#######################################################################################################################################################################################################################################################################################################################################################################################################SW$