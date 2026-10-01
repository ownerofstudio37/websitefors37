import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Photographer in Katy, TX | Studio37',
  description:
    'Photographer in Katy, TX for family portraits, weddings, events, engagement sessions, headshots, brand sessions, and business photos with clear local planning.',
  keywords: [
    'photographer Katy TX',
    'wedding photographer Katy Texas',
    'portrait photographer Katy TX',
    'event photography Katy TX',
    'engagement photographer Katy TX',
    'headshot photographer Katy TX',
    'commercial photographer Katy TX',
    'Katy TX photographers',
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-katy-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function LocalPhotographerKatyPage() {
  return (
    <LocalPhotographerCityPage
      city="Katy"
      stateAbbr="TX"
      county="Harris / Fort Bend County"
      slug="local-photographer-katy-tx"
      nearbyCities={['Houston, TX', 'Cypress, TX', 'Tomball, TX', 'Spring, TX', 'The Woodlands, TX', 'Conroe, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
