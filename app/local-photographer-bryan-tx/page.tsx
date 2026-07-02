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
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
