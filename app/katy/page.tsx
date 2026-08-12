import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Katy TX Photographer Near Me for Portraits & Events | Studio37',
  description:
    'Katy TX photographer near me for family portraits, weddings, events, engagement sessions, and business photos with clear pricing, nearby planning, and polished galleries.',
  keywords: [
    'photographer Katy TX',
    'wedding photographer Katy Texas',
    'portrait photographer Katy TX',
    'event photography Katy TX',
    'commercial photographer Katy TX',
    'photographer near me Katy TX',
    'Katy TX photographers',
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
