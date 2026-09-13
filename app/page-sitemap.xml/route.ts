import { getSitemapSectionResponse } from '@/lib/sitemap-xml'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export async function GET() {
  return getSitemapSectionResponse('pages')
}
