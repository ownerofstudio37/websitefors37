import type { MetadataRoute } from 'next'
import { businessInfo } from '@/lib/seo-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'],
    },
    sitemap: [
      `${businessInfo.contact.website}/sitemap_index.xml`,
      `${businessInfo.contact.website}/sitemap.xml`,
      `${businessInfo.contact.website}/sitemap-static.xml`,
    ],
  }
}