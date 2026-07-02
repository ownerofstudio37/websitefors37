import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Huntsville TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in Huntsville, TX? Studio37 provides wedding, portrait, senior, event, and commercial photography near Sam Houston State University.',
  keywords: [
    'photographer Huntsville TX',
    'wedding photographer Huntsville Texas',
    'portrait photographer Huntsville TX',
    'senior portraits Huntsville TX',
    'event photography Huntsville TX',
    'commercial photographer Huntsville TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/huntsville',
  pageType: 'service',
})

export const revalidate = 86400

export default function HuntsvillePage() {
  return (
    <LocalPhotographerCityPage
      city="Huntsville"
      stateAbbr="TX"
      county="Walker County"
      slug="huntsville"
      nearbyCities={['Willis, TX', 'Conroe, TX', 'Montgomery, TX', 'Pinehurst, TX', 'The Woodlands, TX', 'College Station, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
