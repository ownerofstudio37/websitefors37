import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Wedding Photographer The Woodlands TX | Studio37',
  description:
    'Studio37 provides wedding photography in The Woodlands, TX with timeline planning, two-photographer coverage, and refined edits for modern couples.',
  keywords: [
    'wedding photographer the woodlands tx',
    'the woodlands wedding photography',
    'wedding photography the woodlands',
    'montgomery county wedding photographer',
  ],
  canonicalUrl: 'https://www.studio37.cc/wedding-photographer-the-woodlands-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function WeddingPhotographerTheWoodlandsPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Wedding Photography"
      city="The Woodlands"
      county="Montgomery County"
      pageUrl="https://www.studio37.cc/wedding-photographer-the-woodlands-tx"
      serviceUrl="/services/wedding-photography"
      startingPrice="$1,200"
      intro="For couples planning weddings in The Woodlands, Studio37 combines documentary candids and editorial portraits with full-day coverage support and dependable communication."
      highlights={[
        'Wedding timeline and shot-priority planning before your event',
        'Two-photographer model for fuller ceremony and reception storytelling',
        'Consistent color grading and polished final gallery delivery',
      ]}
      faqs={[
        {
          question: 'Do you cover weddings at venues in and around The Woodlands?',
          answer: 'Yes. We regularly photograph weddings across The Woodlands, Spring, Conroe, and greater Montgomery County.',
        },
        {
          question: 'Is engagement coverage included?',
          answer: 'Engagement sessions are included in select collections and can be added to custom plans.',
        },
        {
          question: 'How soon should we reach out?',
          answer: 'We recommend booking 6-12 months ahead for peak wedding dates.',
        },
      ]}
      nearbyCities={['Spring', 'Conroe', 'Tomball', 'Magnolia', 'Houston']}
    />
  )
}
