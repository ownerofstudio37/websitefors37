import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Tomball TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Need a photographer in Tomball, TX? Studio37 offers wedding, portrait, engagement, event, and commercial photography with clear pricing and two-photographer coverage.',
  keywords: [
    'photographer Tomball TX',
    'wedding photographer Tomball Texas',
    'portrait photographer Tomball TX',
    'event photographer Tomball TX',
    'commercial photography Tomball',
  ],
  canonicalUrl: 'https://www.studio37.cc/tomball',
  pageType: 'service',
})

export const revalidate = 86400

export default function TomballPage() {
  return (
    <LocalPhotographerCityPage
      city="Tomball"
      stateAbbr="TX"
      county="Harris County"
      slug="tomball"
      nearbyCities={['Pinehurst, TX', 'The Woodlands, TX', 'Spring, TX', 'Conroe, TX', 'Magnolia, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
