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
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
