import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer Spring TX - Studio37 Photography',
  description:
    'Professional photographer in Spring, Texas for weddings, portraits, engagement, events, and commercial work. Serving Montgomery County with clear package pricing.',
  keywords: [
    'photographer Spring TX',
    'wedding photographer Spring Texas',
    'portrait photographer Spring TX',
    'event photography Spring TX',
    'commercial photography Spring Texas',
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-spring-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function LocalPhotographerSpringPage() {
  return (
    <LocalPhotographerCityPage
      city="Spring"
      stateAbbr="TX"
      county="Montgomery County"
      slug="local-photographer-spring-tx"
      nearbyCities={['Pinehurst, TX', 'The Woodlands, TX', 'Tomball, TX', 'Conroe, TX', 'Magnolia, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
