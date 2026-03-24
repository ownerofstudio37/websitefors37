import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer Bryan TX - Studio37 Photography',
  description:
    'Professional photographer in Bryan, Texas offering wedding, portrait, engagement, event, and commercial photography with transparent pricing.',
  keywords: [
    'photographer Bryan TX',
    'wedding photographer Bryan Texas',
    'portrait photographer Bryan TX',
    'event photography Bryan TX',
    'commercial photographer Bryan TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-bryan-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function LocalPhotographerBryanPage() {
  return (
    <LocalPhotographerCityPage
      city="Bryan"
      stateAbbr="TX"
      county="Brazos County"
      slug="local-photographer-bryan-tx"
      nearbyCities={['College Station, TX', 'Huntsville, TX', 'Montgomery, TX', 'Conroe, TX', 'The Woodlands, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&h=600&fit=crop"
    />
  )
}
