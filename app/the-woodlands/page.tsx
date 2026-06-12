import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'The Woodlands TX Photography Service Area - Studio37',
  description:
    'The Woodlands photography service area guide for Studio37 weddings, portraits, events, and brand content around Market Street and the Waterway.',
  keywords: [
    'photographer The Woodlands TX',
    'wedding photographer The Woodlands Texas',
    'portrait photographer The Woodlands TX',
    'event photography The Woodlands TX',
    'commercial photographer The Woodlands TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/the-woodlands',
  pageType: 'service',
})

export const revalidate = 86400

export default function TheWoodlandsPage() {
  return (
    <LocalPhotographerCityPage
      city="The Woodlands"
      stateAbbr="TX"
      county="Montgomery County"
      slug="the-woodlands"
      nearbyCities={['Spring, TX', 'Pinehurst, TX', 'Tomball, TX', 'Conroe, TX', 'Magnolia, TX', 'Houston, TX']}
      heroImage="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1200&h=600&fit=crop"
    />
  )
}
