import LocalPhotographerCityPage from '@/components/LocalPhotographerCityPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Plantersville TX Photographer - Wedding, Portrait & Event Photography | Studio37',
  description:
    'Looking for a photographer in Plantersville, TX? Studio37 specializes in ranch and barn weddings, outdoor portraits, and event photography in Grimes County.',
  keywords: [
    'photographer Plantersville TX',
    'wedding photographer Plantersville Texas',
    'ranch wedding photographer Plantersville',
    'barn wedding photographer Texas',
    'portrait photographer Plantersville TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/plantersville',
  pageType: 'service',
})

export const revalidate = 86400

export default function PlantersvillePage() {
  return (
    <LocalPhotographerCityPage
      city="Plantersville"
      stateAbbr="TX"
      county="Grimes County"
      slug="plantersville"
      nearbyCities={['Magnolia, TX', 'Navasota, TX', 'Conroe, TX', 'Pinehurst, TX', 'Montgomery, TX', 'Houston, TX']}
      heroImage="https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1400,c_limit/v1778033088/PS379444_2_1_pge2hl.jpg"
    />
  )
}
