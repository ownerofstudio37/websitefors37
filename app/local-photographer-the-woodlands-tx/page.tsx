import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { cityMetaDescriptions } from '@/lib/city-guides'

export const metadata = generateSEOMetadata({
  title: 'Photographer in The Woodlands, TX | Studio37',
  description: cityMetaDescriptions['local-photographer-the-woodlands-tx'],
  keywords: [
    'photographer The Woodlands TX',
    'wedding photographer The Woodlands',
    'portrait photography The Woodlands Texas',
    'event photography Montgomery County',
    'commercial photographer The Woodlands',
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-the-woodlands-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function LocalPhotographerTheWoodlandsPage() {
  return (
    <LocalPhotographerCityPage
      city="The Woodlands"
      stateAbbr="TX"
      county="Montgomery County"
      slug="local-photographer-the-woodlands-tx"
      nearbyCities={['Pinehurst, TX', 'Spring, TX', 'Tomball, TX', 'Conroe, TX', 'Magnolia, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
