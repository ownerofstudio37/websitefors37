import { getSitemapSectionResponse } from '@/lib/sitemap-xml'

export const revalidate = 3600

export async function GET() {
  return getSitemapSectionResponse('all')
}
