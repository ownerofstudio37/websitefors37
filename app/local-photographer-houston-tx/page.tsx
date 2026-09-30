import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Commercial Photography Studio in Houston, TX | Studio37',
  description:
    'Photography services in Houston, TX from a commercial photography studio for business content, product photos, headshots, events, portraits, and brand refresh sessions.',
  keywords: [
    'photography services Houston TX',
    'commercial photography studio Houston',
    'photographer Houston TX',
    'wedding photographer Houston Texas',
    'portrait photographer Houston TX',
    'event photography Houston TX',
    'commercial photographer Houston TX',
    'houston commercial photography',
    'commercial photographer near me',
    'business photographer Houston',
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-houston-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function LocalPhotographerHoustonPage() {
  return (
    <LocalPhotographerCityPage
      city="Houston"
      stateAbbr="TX"
      county="Harris County"
      slug="local-photographer-houston-tx"
      nearbyCities={['The Woodlands, TX', 'Spring, TX', 'Conroe, TX', 'Tomball, TX', 'Pinehurst, TX', 'College Station, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
