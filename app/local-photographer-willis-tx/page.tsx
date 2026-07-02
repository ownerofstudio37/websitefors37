import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer Willis TX - Studio37 Photography',
  description:
    'Professional photographer in Willis, Texas for weddings, portraits, engagement, events, and commercial sessions with clear package pricing.',
  keywords: [
    'photographer Willis TX',
    'wedding photographer Willis Texas',
    'portrait photographer Willis TX',
    'event photography Willis TX',
    'commercial photographer Willis TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-willis-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function LocalPhotographerWillisPage() {
  return (
    <LocalPhotographerCityPage
      city="Willis"
      stateAbbr="TX"
      county="Montgomery County"
      slug="local-photographer-willis-tx"
      nearbyCities={['Conroe, TX', 'Montgomery, TX', 'Pinehurst, TX', 'The Woodlands, TX', 'Huntsville, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
