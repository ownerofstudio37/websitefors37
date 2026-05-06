import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer Houston TX - Studio37 Photography',
  description:
    'Professional photographer in Houston, Texas for weddings, portraits, engagement sessions, events, and commercial photography with clear package pricing.',
  keywords: [
    'photographer Houston TX',
    'wedding photographer Houston Texas',
    'portrait photographer Houston TX',
    'event photography Houston TX',
    'commercial photographer Houston TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/houston',
  pageType: 'service',
})

export const revalidate = 86400

export default function HoustonPage() {
  return (
    <LocalPhotographerCityPage
      city="Houston"
      stateAbbr="TX"
      county="Harris County"
      slug="houston"
      nearbyCities={['The Woodlands, TX', 'Spring, TX', 'Conroe, TX', 'Tomball, TX', 'Pinehurst, TX', 'Katy, TX']}
      heroImage="https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=1200&h=600&fit=crop"
    />
  )
}
