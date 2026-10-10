import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { cityMetaDescriptions } from '@/lib/city-guides'

export const metadata = generateSEOMetadata({
  title: 'Photographer in Cleveland, TX | Studio37',
  description: cityMetaDescriptions['cleveland'],
  keywords: [
    'photographer Cleveland TX',
    'wedding photographer Cleveland Texas',
    'portrait photographer Cleveland TX',
    'family photographer Cleveland TX',
    'event photography Cleveland TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/cleveland',
  pageType: 'service',
})

export const revalidate = 86400

export default function ClevelandPage() {
  return (
    <LocalPhotographerCityPage
      city="Cleveland"
      stateAbbr="TX"
      county="Liberty County"
      slug="cleveland"
      nearbyCities={['Splendora, TX', 'New Caney, TX', 'Conroe, TX', 'Humble, TX', 'Kingwood, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
