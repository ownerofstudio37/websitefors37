import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer The Woodlands TX - Studio37 Photography',
  description:
    'Professional photographer in The Woodlands, Texas for weddings, portraits, engagement, event, and commercial sessions. Transparent pricing and Montgomery County coverage.',
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
      heroImage="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=600&fit=crop"
    />
  )
}
