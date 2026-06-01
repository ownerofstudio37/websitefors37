import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Atascocita TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in Atascocita, TX? Studio37 provides wedding, family portrait, event, and commercial photography near Lake Houston.',
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
      heroImage="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=600&fit=crop"
    />
  )
}
