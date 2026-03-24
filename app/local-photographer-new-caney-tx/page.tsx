import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer New Caney TX - Studio37 Photography',
  description:
    'Professional photographer in New Caney, Texas for weddings, portraits, engagement sessions, events, and commercial photography.',
  keywords: [
    'photographer New Caney TX',
    'wedding photographer New Caney Texas',
    'portrait photographer New Caney TX',
    'event photography New Caney TX',
    'commercial photography New Caney',
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-new-caney-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function LocalPhotographerNewCaneyPage() {
  return (
    <LocalPhotographerCityPage
      city="New Caney"
      stateAbbr="TX"
      county="Montgomery County"
      slug="local-photographer-new-caney-tx"
      nearbyCities={['The Woodlands, TX', 'Spring, TX', 'Conroe, TX', 'Pinehurst, TX', 'Tomball, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&h=600&fit=crop"
    />
  )
}
