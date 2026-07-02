import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Kingwood TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in Kingwood, TX? Studio37 provides wedding, family portrait, event, and commercial photography in NE Houston.',
  keywords: [
    'photographer Kingwood TX',
    'wedding photographer Kingwood Texas',
    'portrait photographer Kingwood TX',
    'family photographer Kingwood TX',
    'event photography Kingwood TX',
    'commercial photographer Kingwood TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/kingwood',
  pageType: 'service',
})

export const revalidate = 86400

export default function KingwoodPage() {
  return (
    <LocalPhotographerCityPage
      city="Kingwood"
      stateAbbr="TX"
      county="Harris County"
      slug="kingwood"
      nearbyCities={['Humble, TX', 'Atascocita, TX', 'Porter, TX', 'New Caney, TX', 'Spring, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
