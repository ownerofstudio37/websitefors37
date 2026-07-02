import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Conroe TX Photography Service Area - Studio37',
  description:
    'Conroe photography service area guide for Studio37 wedding, portrait, event, and commercial coverage near Lake Conroe and Montgomery County.',
  keywords: [
    'photographer Conroe TX',
    'wedding photographer Conroe Texas',
    'portrait photographer Conroe TX',
    'event photography Conroe TX',
    'commercial photographer Conroe',
  ],
  canonicalUrl: 'https://www.studio37.cc/conroe',
  pageType: 'service',
})

export const revalidate = 86400

export default function ConroePage() {
  return (
    <LocalPhotographerCityPage
      city="Conroe"
      stateAbbr="TX"
      county="Montgomery County"
      slug="conroe"
      nearbyCities={['Pinehurst, TX', 'The Woodlands, TX', 'Spring, TX', 'Tomball, TX', 'Magnolia, TX', 'Montgomery, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
