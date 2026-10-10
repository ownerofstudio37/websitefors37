import ServiceGuidePage from '@/components/ServiceGuidePage'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { serviceGuides } from '@/lib/service-guides'

const guide = serviceGuides['headshot-photographer-houston-tx']
const description =
  'Individual headshots in Houston, TX for LinkedIn, websites, and media kits, in the studio or in the Heights, Uptown, and downtown. From $350.'

export const metadata = generateSEOMetadata({
  title: 'Headshot Photographer in Houston, TX | Studio37',
  description,
  canonicalUrl: 'https://www.studio37.cc/headshot-photographer-houston-tx',
  ogImage: `https://res.cloudinary.com/dmjxho2rl/image/upload/f_jpg,q_auto:best,w_1200,h_630,c_fill,g_auto/${guide.heroImage.id}.jpg`,
  pageType: 'service',
})

export const revalidate = 86400

export default function HeadshotPhotographerHoustonPage() {
  return <ServiceGuidePage guide={guide} serviceName="Individual Headshots" description={description} />
}
