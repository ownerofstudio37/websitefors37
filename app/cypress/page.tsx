import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Cypress TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in Cypress, TX? Studio37 provides wedding, portrait, family, event, and commercial photography in Northwest Houston.',
  keywords: [
    'photographer Cypress TX',
    'wedding photographer Cypress Texas',
    'portrait photographer Cypress TX',
    'family photographer Cypress TX',
    'event photography Cypress TX',
    'commercial photographer Cypress TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/cypress',
  pageType: 'service',
})

export const revalidate = 86400

export default function CypressPage() {
  return (
    <LocalPhotographerCityPage
      city="Cypress"
      stateAbbr="TX"
      county="Harris County"
      slug="cypress"
      nearbyCities={['Tomball, TX', 'Spring, TX', 'Katy, TX', 'Hockley, TX', 'Waller, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=1200&h=600&fit=crop"
    />
  )
}
