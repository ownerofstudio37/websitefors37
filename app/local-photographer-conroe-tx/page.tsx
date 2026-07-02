import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer Conroe TX - Studio37 Photography',
  description:
    'Professional photographer in Conroe, Texas for weddings, portraits, engagement sessions, events, and commercial photography. Serving Montgomery County.',
  keywords: [
    'photographer Conroe TX',
    'wedding photographer Conroe Texas',
    'portrait photographer Conroe TX',
    'event photography Conroe TX',
    'commercial photographer Conroe',
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-conroe-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function LocalPhotographerConroePage() {
  return (
    <LocalPhotographerCityPage
      city="Conroe"
      stateAbbr="TX"
      county="Montgomery County"
      slug="local-photographer-conroe-tx"
      nearbyCities={['Pinehurst, TX', 'The Woodlands, TX', 'Spring, TX', 'Tomball, TX', 'Magnolia, TX', 'Montgomery, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
