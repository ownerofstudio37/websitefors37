import ServiceGuidePage from '@/components/ServiceGuidePage'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { serviceGuides } from '@/lib/service-guides'

const guide = serviceGuides['maternity-sessions']
const description =
  'Maternity photos in Pinehurst, TX by the lake, in the pines, or in our indoor studio, with partner and sibling sets. Two photographers, from $350.'

export const metadata = generateSEOMetadata({
  title: 'Maternity Photographer in Pinehurst, TX | Studio37',
  description,
  canonicalUrl: 'https://www.studio37.cc/maternity-sessions',
  ogImage: `https://res.cloudinary.com/dmjxho2rl/image/upload/f_jpg,q_auto:best,w_1200,h_630,c_fill,g_auto/${guide.heroImage.id}.jpg`,
  pageType: 'service',
})

export const revalidate = 86400

export default function MaternitySessionsPage() {
  return <ServiceGuidePage guide={guide} serviceName="Maternity Session" description={description} />
}
