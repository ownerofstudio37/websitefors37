import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Katy TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in Katy, TX? Studio37 provides wedding, portrait, engagement, event, and commercial photography with transparent pricing and two-photographer coverage.',
  keywords: [
    'photographer Katy TX',
    'wedding photographer Katy Texas',
    'portrait photographer Katy TX',
    'event photography Katy TX',
    'commercial photographer Katy TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/katy',
  pageType: 'service',
})

export const revalidate = 86400

export default function KatyPage() {
  return (
    <LocalPhotographerCityPage
      city="Katy"
      stateAbbr="TX"
      county="Harris / Fort Bend County"
      slug="katy"
      nearbyCities={['Houston, TX', 'Cypress, TX', 'Tomball, TX', 'Spring, TX', 'The Woodlands, TX', 'Conroe, TX']}
      heroImage="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&h=600&fit=crop"
    />
  )
}
