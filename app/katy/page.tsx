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
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
