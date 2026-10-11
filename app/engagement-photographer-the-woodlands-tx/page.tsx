import CityServicePage from '@/components/CityServicePage'
import { cityServiceDescription, cityServiceOgImage, cityServiceTitle } from '@/lib/city-service-pages'
import { generateSEOMetadata } from '@/lib/seo-helpers'

const slug = 'engagement-photographer-the-woodlands-tx'
const description = cityServiceDescription(slug)

export const metadata = generateSEOMetadata({
  title: cityServiceTitle(slug),
  description,
  canonicalUrl: `https://www.studio37.cc/${slug}`,
  ogImage: cityServiceOgImage(slug),
  pageType: 'service',
})

export const revalidate = 86400

export default function EngagementPhotographerTheWoodlandsPage() {
  return <CityServicePage slug={slug} description={description} />
}
