import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { cityMetaDescriptions } from '@/lib/city-guides'

export const metadata = generateSEOMetadata({
  title: 'Photographer in Pinehurst, TX | Studio37',
  description: cityMetaDescriptions['local-photographer-pinehurst-tx'],
  keywords: [
    'photographer Pinehurst TX',
    'photography Pinehurst Texas',
    'wedding photographer Montgomery County',
    'family photographer The Woodlands',
    'professional photographer near me',
    'Pinehurst photography studio',
    'Montgomery County photographer',
    'Texas photography services',
    'local photographer Pinehurst',
    'portrait photographer Texas'
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-pinehurst-tx',
  pageType: 'service'
})

export default function LocalPhotographerPage() {
  return (
    <LocalPhotographerCityPage
      city="Pinehurst"
      stateAbbr="TX"
      county="Montgomery County"
      slug="local-photographer-pinehurst-tx"
      nearbyCities={['The Woodlands, TX', 'Spring, TX', 'Tomball, TX', 'Magnolia, TX', 'Conroe, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
