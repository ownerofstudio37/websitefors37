import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Waller TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in Waller, TX? Studio37 provides wedding, portrait, event, and commercial photography in Northwest Houston.',
  keywords: [
    'photographer Waller TX',
    'wedding photographer Waller Texas',
    'portrait photographer Waller TX',
    'event photography Waller TX',
    'commercial photographer Waller TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/waller',
  pageType: 'service',
})

export const revalidate = 86400

export default function WallerPage() {
  return (
    <LocalPhotographerCityPage
      city="Waller"
      stateAbbr="TX"
      county="Waller County"
      slug="waller"
      nearbyCities={['Hockley, TX', 'Tomball, TX', 'Magnolia, TX', 'Pinehurst, TX', 'Cypress, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
