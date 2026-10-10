import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { cityMetaDescriptions, cityOgImage } from '@/lib/city-guides'

export const metadata = generateSEOMetadata({
  title: 'Photographer in Humble, TX | Studio37',
  description: cityMetaDescriptions['humble'],
  ogImage: cityOgImage('humble'),
  keywords: [
    'photographer Humble TX',
    'wedding photographer Humble Texas',
    'portrait photographer Humble TX',
    'event photography Humble TX',
    'commercial photographer Humble TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/humble',
  pageType: 'service',
})

export const revalidate = 86400

export default function HumblePage() {
  return (
    <LocalPhotographerCityPage
      city="Humble"
      stateAbbr="TX"
      county="Harris County"
      slug="humble"
      nearbyCities={['Atascocita, TX', 'Kingwood, TX', 'Houston, TX', 'Spring, TX', 'The Woodlands, TX', 'Conroe, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
