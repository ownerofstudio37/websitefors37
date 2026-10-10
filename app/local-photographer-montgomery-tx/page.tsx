import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { cityMetaDescriptions, cityOgImage } from '@/lib/city-guides'

export const metadata = generateSEOMetadata({
  title: 'Photographer in Montgomery, TX | Studio37',
  description: cityMetaDescriptions['local-photographer-montgomery-tx'],
  ogImage: cityOgImage('local-photographer-montgomery-tx'),
  keywords: [
    'photographer Montgomery TX',
    'wedding photographer Montgomery Texas',
    'portrait photography Montgomery TX',
    'event photography Montgomery TX',
    'commercial photographer Montgomery TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-montgomery-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function LocalPhotographerMontgomeryPage() {
  return (
    <LocalPhotographerCityPage
      city="Montgomery"
      stateAbbr="TX"
      county="Montgomery County"
      slug="local-photographer-montgomery-tx"
      nearbyCities={['Pinehurst, TX', 'Conroe, TX', 'Magnolia, TX', 'The Woodlands, TX', 'Spring, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
