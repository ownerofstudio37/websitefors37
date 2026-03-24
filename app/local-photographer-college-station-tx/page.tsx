import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer College Station TX - Studio37 Photography',
  description:
    'Professional photographer in College Station, Texas for weddings, portraits, engagement sessions, events, and commercial photography.',
  keywords: [
    'photographer College Station TX',
    'wedding photographer College Station Texas',
    'portrait photographer College Station TX',
    'event photography College Station TX',
    'commercial photographer College Station TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-college-station-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function LocalPhotographerCollegeStationPage() {
  return (
    <LocalPhotographerCityPage
      city="College Station"
      stateAbbr="TX"
      county="Brazos County"
      slug="local-photographer-college-station-tx"
      nearbyCities={['Bryan, TX', 'Huntsville, TX', 'Montgomery, TX', 'Conroe, TX', 'The Woodlands, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1200&h=600&fit=crop"
    />
  )
}
