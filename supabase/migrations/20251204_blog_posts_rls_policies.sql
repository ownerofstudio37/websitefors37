-- Add RLS policies for blog_posts table
-- Date: 2025-12-04
-- Description: Enable RLS and create policies to allow public read of published posts and admin writes

-- ============================================
-- 1. Enable RLS on blog_posts table
-- ============================================
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. Create policies for blog_posts
-- ============================================

-- Allow public read access to published posts only
CREATE POLICY "Allow public read access to published blog_posts"
ON public.blog_posts
FOR SELECT
USING (published = true);

-- Allow all operations for service role (admin operations via API)
-- This allows the admin dashboard to create/update/delete posts
CREATE POLICY "Allow service role full access to blog_posts"
ON public.blog_posts
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Allow authenticated users (if using Supabase auth) to manage posts
CREATE POLICY "Allow authenticated users to manage blog_posts"
ON public.blog_posts
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- 3. Add documentation comments
-- ============================================

COMMENT ON POLICY "Allow public read access to published blog_posts" ON public.blog_posts 
IS 'Public can only see published blog posts';

COMMENT ON POLICY "Allow service role full access to blog_posts" ON public.blog_posts 
IS 'Service role (admin API routes) has full access for admin dashboard operations';

COMMENT ON POLICY "Allow authenticated users to manage blog_posts" ON public.blog_posts 
IS 'Authenticated users can create, update, and delete blog posts via admin dashboard';
