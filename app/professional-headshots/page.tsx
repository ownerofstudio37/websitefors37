import ServiceGuidePage from '@/components/ServiceGuidePage'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { serviceGuides } from '@/lib/service-guides'

const guide = serviceGuides['professional-headshots']
const description =
  'Team and executive headshots in Pinehurst, TX, in our studio or on-site at your office, with lighting matched across every staff portrait. From $350.'

export const metadata = generateSEOMetadata({
  title: 'Team & Executive Headshots in Pinehurst, TX | Studio37',
  description,
  canonicalUrl: 'https://www.studio37.cc/professional-headshots',
  ogImage: `https://res.cloudinary.com/dmjxho2rl/image/upload/f_jpg,q_auto:best,w_1200,h_630,c_fill,g_auto/${guide.heroImage.id}.jpg`,
  pageType: 'service',
})

export const revalidate = 86400

export default function ProfessionalHeadshotsPage() {
  return <ServiceGuidePage guide={guide} serviceName="Team & Executive Headshots" description={description} />
}
