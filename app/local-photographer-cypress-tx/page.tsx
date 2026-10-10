import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { cityMetaDescriptions, cityOgImage } from '@/lib/city-guides'

export const metadata = generateSEOMetadata({
  title: 'Photographer in Cypress, TX | Studio37',
  description: cityMetaDescriptions['local-photographer-cypress-tx'],
  ogImage: cityOgImage('local-photographer-cypress-tx'),
  keywords: [
    'photographer Cypress TX',
    'local photographer Cypress TX',
    'portrait photographer Cypress TX',
    'family photographer Cypress TX',
    'event photographer Cypress TX',
    'Towne Lake photographer',
    'Bridgeland photographer',
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-cypress-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function LocalPhotographerCypressPage() {
  return (
    <LocalPhotographerCityPage
      city="Cypress"
      stateAbbr="TX"
      county="Harris County"
      slug="local-photographer-cypress-tx"
      nearbyCities={['Tomball, TX', 'Spring, TX', 'Katy, TX', 'Hockley, TX', 'Waller, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
