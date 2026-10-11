import ServiceGuidePage from '@/components/ServiceGuidePage'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { serviceGuides } from '@/lib/service-guides'

const guide = serviceGuides['senior-portraits']
const description =
  'Senior portraits in Pinehurst, TX at Kleb Woods, Old Town Tomball, downtown Humble, and campus spots. Outfit planning, two photographers, from $350.'

export const metadata = generateSEOMetadata({
  title: 'Senior Portraits in Pinehurst, TX | Studio37',
  description,
  canonicalUrl: 'https://www.studio37.cc/senior-portraits',
  ogImage: `https://res.cloudinary.com/dmjxho2rl/image/upload/f_jpg,q_auto:best,w_1200,h_630,c_fill,g_auto/${guide.heroImage.id}.jpg`,
  pageType: 'service',
})

export const revalidate = 86400

export default function SeniorPortraitsPage() {
  return <ServiceGuidePage guide={guide} serviceName="Senior Portraits" description={description} />
}
