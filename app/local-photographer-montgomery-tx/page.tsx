import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer Montgomery TX - Studio37 Photography',
  description:
    'Professional photographer in Montgomery, Texas for weddings, portraits, engagement, event, and commercial sessions with transparent pricing.',
  keywords: [
    'photographer Montgomery TX',
    'wedding photographer Montgomery Texas',
    'portrait photography Montgomery TX',
    'event photography Montgomery TX',
    'commercial photographer Montgomery TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-montgomery-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function LocalPhotographerMontgomeryPage() {
  return (
    <LocalPhotographerCityPage
      city="Montgomery"
      stateAbbr="TX"
      county="Montgomery County"
      slug="local-photographer-montgomery-tx"
      nearbyCities={['Pinehurst, TX', 'Conroe, TX', 'Magnolia, TX', 'The Woodlands, TX', 'Spring, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=600&fit=crop"
    />
  )
}
