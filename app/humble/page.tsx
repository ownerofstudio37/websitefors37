import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer Humble TX - Studio37 Photography',
  description:
    'Professional photographer in Humble, Texas for weddings, portraits, engagement sessions, events, and commercial photography with transparent pricing.',
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
      heroImage="https://images.unsplash.com/photo-1521310192545-1dd3c1f3f0f2?w=1200&h=600&fit=crop"
    />
  )
}
