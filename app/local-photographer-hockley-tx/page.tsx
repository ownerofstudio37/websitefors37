import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer Hockley TX - Studio37 Photography',
  description:
    'Professional photographer in Hockley, Texas for weddings, portraits, engagement, events, and commercial photography with transparent pricing.',
  keywords: [
    'photographer Hockley TX',
    'wedding photographer Hockley Texas',
    'portrait photographer Hockley TX',
    'event photography Hockley TX',
    'commercial photographer Hockley TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-hockley-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function LocalPhotographerHockleyPage() {
  return (
    <LocalPhotographerCityPage
      city="Hockley"
      stateAbbr="TX"
      county="Waller County"
      slug="local-photographer-hockley-tx"
      nearbyCities={['Tomball, TX', 'Magnolia, TX', 'The Woodlands, TX', 'Spring, TX', 'Pinehurst, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
