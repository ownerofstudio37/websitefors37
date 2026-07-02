import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Local Photographer Tomball TX - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Local photographer in Tomball, TX for weddings, portraits, events, and commercial sessions. Studio37 offers clear package pricing and two-photographer coverage.',
  keywords: [
    'photographer Tomball TX',
    'wedding photographer Tomball Texas',
    'portrait photographer Tomball TX',
    'event photographer Tomball TX',
    'commercial photography Tomball',
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-tomball-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function LocalPhotographerTomballPage() {
  return (
    <LocalPhotographerCityPage
      city="Tomball"
      stateAbbr="TX"
      county="Montgomery County"
      slug="local-photographer-tomball-tx"
      nearbyCities={['Pinehurst, TX', 'The Woodlands, TX', 'Spring, TX', 'Conroe, TX', 'Magnolia, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
