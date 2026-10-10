import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { cityMetaDescriptions } from '@/lib/city-guides'

export const metadata = generateSEOMetadata({
  title: 'Photographer in Atascocita, TX | Studio37',
  description: cityMetaDescriptions['atascocita'],
  keywords: [
    'photographer Atascocita TX',
    'wedding photographer Atascocita Texas',
    'portrait photographer Atascocita TX',
    'family photographer Atascocita TX',
    'event photography Atascocita TX',
    'Lake Houston photographer',
  ],
  canonicalUrl: 'https://www.studio37.cc/atascocita',
  pageType: 'service',
})

export const revalidate = 86400

export default function AtascocitaPage() {
  return (
    <LocalPhotographerCityPage
      city="Atascocita"
      stateAbbr="TX"
      county="Harris County"
      slug="atascocita"
      nearbyCities={['Humble, TX', 'Kingwood, TX', 'Porter, TX', 'New Caney, TX', 'Spring, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
