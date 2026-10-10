import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { cityMetaDescriptions, cityOgImage } from '@/lib/city-guides'

export const metadata = generateSEOMetadata({
  title: 'Photographer in Splendora, TX | Studio37',
  description: cityMetaDescriptions['splendora'],
  ogImage: cityOgImage('splendora'),
  keywords: [
    'photographer Splendora TX',
    'wedding photographer Splendora Texas',
    'portrait photographer Splendora TX',
    'event photography Splendora TX',
    'commercial photographer Splendora TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/splendora',
  pageType: 'service',
})

export const revalidate = 86400

export default function SplendoraPage() {
  return (
    <LocalPhotographerCityPage
      city="Splendora"
      stateAbbr="TX"
      county="Montgomery County"
      slug="splendora"
      nearbyCities={['New Caney, TX', 'Cleveland, TX', 'Porter, TX', 'Conroe, TX', 'Humble, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
