import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { cityMetaDescriptions, cityOgImage } from '@/lib/city-guides'

export const metadata = generateSEOMetadata({
  title: 'Photographer in Porter, TX | Studio37',
  description: cityMetaDescriptions['porter'],
  ogImage: cityOgImage('porter'),
  keywords: [
    'photographer Porter TX',
    'wedding photographer Porter Texas',
    'portrait photographer Porter TX',
    'family photographer Porter TX',
    'event photography Porter TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/porter',
  pageType: 'service',
})

export const revalidate = 86400

export default function PorterPage() {
  return (
    <LocalPhotographerCityPage
      city="Porter"
      stateAbbr="TX"
      county="Montgomery County"
      slug="porter"
      nearbyCities={['New Caney, TX', 'Humble, TX', 'Spring, TX', 'Conroe, TX', 'Kingwood, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
