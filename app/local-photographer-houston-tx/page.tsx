import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Houston Commercial Photographer Near Me | Studio37',
  description:
    'Houston commercial photographer near me for business content, product photos, architecture, headshots, events, portraits, and brand refresh sessions with clear planning.',
  keywords: [
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
