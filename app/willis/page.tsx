import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Willis TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in Willis, TX? Studio37 provides wedding, portrait, engagement, event, and commercial photography with transparent pricing.',
  keywords: [
    'photographer Willis TX',
    'wedding photographer Willis Texas',
    'portrait photographer Willis TX',
    'event photography Willis TX',
    'commercial photographer Willis TX',
    'family photographer Willis TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/willis',
  pageType: 'service',
})

export const revalidate = 86400

export default function WillisPage() {
  return (
    <LocalPhotographerCityPage
      city="Willis"
      stateAbbr="TX"
      county="Montgomery County"
      slug="willis"
      nearbyCities={['Conroe, TX', 'Montgomery, TX', 'Pinehurst, TX', 'The Woodlands, TX', 'Huntsville, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
