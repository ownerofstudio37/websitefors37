import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Houston TX Photography Service Area - Studio37',
  description:
    'Houston photography service area guide for Studio37 portraits, events, commercial branding, and wedding coverage across Greater Houston.',
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
