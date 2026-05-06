import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer Katy TX - Studio37 Photography',
  description:
    'Professional photographer in Katy, Texas for weddings, portraits, engagement sessions, events, and commercial photography with clear package pricing.',
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
