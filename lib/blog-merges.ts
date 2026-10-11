import blogMerges from './blog-merges.json'

// Slugs of blog posts that were merged into another post and now 301 (see blog-merges.json).
export const mergedBlogSlugs = new Set(Object.keys(blogMerges.redirects))

export const isMergedBlogSlug = (slug: string) => mergedBlogSlugs.has(slug)
