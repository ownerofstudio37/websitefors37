import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Photographer New Waverly TX - Studio37 Photography',
  description:
    'Professional photographer in New Waverly, Texas for weddings, portraits, engagement, event, and commercial photography along the I-45 corridor.',
  keywords: [
    'photographer New Waverly TX',
    'wedding photographer New Waverly Texas',
    'portrait photographer New Waverly TX',
    'event photographer New Waverly TX',
    'commercial photographer New Waverly TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/local-photographer-new-waverly-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function LocalPhotographerNewWaverlyPage() {
  return (
    <LocalPhotographerCityPage
      city="New Waverly"
      stateAbbr="TX"
      county="Walker County"
      slug="local-photographer-new-waverly-tx"
      nearbyCities={['Huntsville, TX', 'Willis, TX', 'Conroe, TX', 'Pinehurst, TX', 'Montgomery, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
