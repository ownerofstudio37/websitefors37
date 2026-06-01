import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Spring TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in Spring, TX? Studio37 provides wedding, portrait, family, event, and commercial photography with transparent pricing and two-photographer coverage.',
  keywords: [
    'photographer Spring TX',
    'wedding photographer Spring Texas',
    'portrait photographer Spring TX',
    'family photographer Spring TX',
    'event photography Spring TX',
    'commercial photographer Spring TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/spring',
  pageType: 'service',
})

export const revalidate = 86400

export default function SpringPage() {
  return (
    <LocalPhotographerCityPage
      city="Spring"
      stateAbbr="TX"
      county="Harris County"
      slug="spring"
      nearbyCities={['Pinehurst, TX', 'The Woodlands, TX', 'Tomball, TX', 'Conroe, TX', 'Magnolia, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&h=600&fit=crop"
    />
  )
}
