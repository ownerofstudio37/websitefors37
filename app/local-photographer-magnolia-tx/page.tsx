import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer Magnolia TX - Studio37 Photography',
  description:
    'Professional photographer in Magnolia, Texas for weddings, portraits, engagement, event, and commercial photography. Transparent pricing and local expertise.',
  keywords: [
    'photographer Magnolia TX',
    'wedding photographer Magnolia Texas',
    'portrait photographer Magnolia TX',
    'event photography Magnolia TX',
    'commercial photographer Magnolia TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-magnolia-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function LocalPhotographerMagnoliaPage() {
  return (
    <LocalPhotographerCityPage
      city="Magnolia"
      stateAbbr="TX"
      county="Montgomery County"
      slug="local-photographer-magnolia-tx"
      nearbyCities={['Pinehurst, TX', 'The Woodlands, TX', 'Tomball, TX', 'Conroe, TX', 'Spring, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1200&h=600&fit=crop"
    />
  )
}
