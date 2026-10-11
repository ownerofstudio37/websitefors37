import ServiceGuidePage from '@/components/ServiceGuidePage'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { serviceGuides } from '@/lib/service-guides'

const guide = serviceGuides['family-photography']
const description =
  'Family photos in Pinehurst, TX paced for real kids at Juergens Park, Unity Park, Mercer, and The Woodlands pines. Two photographers, from $350.'

export const metadata = generateSEOMetadata({
  title: 'Family Photographer in Pinehurst, TX | Studio37',
  description,
  canonicalUrl: 'https://www.studio37.cc/family-photography',
  ogImage: `https://res.cloudinary.com/dmjxho2rl/image/upload/f_jpg,q_auto:best,w_1200,h_630,c_fill,g_auto/${guide.heroImage.id}.jpg`,
  pageType: 'service',
})

export const revalidate = 86400

export default function FamilyPhotographyPage() {
  return <ServiceGuidePage guide={guide} serviceName="Family Photography" description={description} />
}
