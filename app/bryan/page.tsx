import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Bryan TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in Bryan, TX? Studio37 provides wedding, portrait, graduation, event, and commercial photography in the Brazos Valley.',
  keywords: [
    'photographer Bryan TX',
    'wedding photographer Bryan Texas',
    'portrait photographer Bryan TX',
    'graduation photographer Bryan TX',
    'event photography Bryan TX',
    'commercial photographer Bryan TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/bryan',
  pageType: 'service',
})

export const revalidate = 86400

export default function BryanPage() {
  return (
    <LocalPhotographerCityPage
      city="Bryan"
      stateAbbr="TX"
      county="Brazos County"
      slug="bryan"
      nearbyCities={['College Station, TX', 'Navasota, TX', 'Huntsville, TX', 'Montgomery, TX', 'Conroe, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
