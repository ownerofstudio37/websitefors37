import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Wedding Photographer Tomball TX | Studio37',
  description:
    'Studio37 offers wedding photography in Tomball, TX with two-photographer coverage, timeline planning support, and polished storytelling galleries.',
  keywords: [
    'wedding photographer tomball tx',
    'tomball wedding photography',
    'wedding photography tomball texas',
    'tomball tx wedding photos',
  ],
  canonicalUrl: 'https://www.studio37.cc/wedding-photographer-tomball-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function WeddingPhotographerTomballPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Wedding Photography"
      city="Tomball"
      county="Harris County"
      pageUrl="https://www.studio37.cc/wedding-photographer-tomball-tx"
      serviceUrl="/services/wedding-photography"
      startingPrice="$1,200"
      intro="Studio37 provides Tomball wedding coverage built around timeline clarity, emotional storytelling, and detail-rich galleries couples can relive for years."
      highlights={[
        'Ceremony, portraits, and reception coverage with clear timeline pacing',
        'Two-photographer model for complete scene and reaction capture',
        'Fast previews and consistent full-gallery delivery workflow',
      ]}
      faqs={[
        {
          question: 'What is the starting investment for Tomball wedding photography?',
          answer: 'Wedding collections start at $1,200 and scale based on coverage hours and deliverables.',
        },
        {
          question: 'Do you also cover nearby venues outside Tomball?',
          answer: 'Yes. We frequently cover weddings in Pinehurst, Magnolia, Spring, and The Woodlands.',
        },
        {
          question: 'Can we add engagement coverage?',
          answer: 'Yes. Engagement sessions are available as part of select collections or custom planning.',
        },
      ]}
      nearbyCities={['Pinehurst', 'Magnolia', 'Spring', 'The Woodlands', 'Houston']}
    />
  )
}
