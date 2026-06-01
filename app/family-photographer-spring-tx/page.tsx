import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Family Photographer Spring TX - Studio37 Photography',
  description:
    'Family photographer in Spring, TX. Studio37 captures natural, genuine family moments at Old Town Spring, Meyer Park, and Pundt Park. Clear pricing, two-photographer option.',
  keywords: [
    'family photographer Spring TX',
    'family photos Spring Texas',
    'family portrait photographer Spring TX',
    'Old Town Spring family photography',
    'family photographer near Spring TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/family-photographer-spring-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function FamilyPhotographerSpringPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Family Photography"
      city="Spring"
      stateAbbr="TX"
      county="Harris County"
      pageUrl="https://www.studio37.cc/family-photographer-spring-tx"
      serviceUrl="https://www.studio37.cc/services/portrait-photography"
      startingPrice="$350"
      intro="Spring, TX is one of North Houston's most family-dense communities — and Studio37 brings genuine, relaxed family portrait sessions right to your backyard. From the shaded trails at Pundt Park to the charming storefronts of Old Town Spring, we know the best spots and lighting windows to turn your family session into a gallery you'll treasure for decades."
      highlights={[
        { title: 'Old Town Spring Locations', description: 'Iconic storefronts and seasonal décor make Old Town Spring a standout backdrop for family sessions any time of year.' },
        { title: 'Park & Nature Settings', description: 'Meyer Park and Pundt Park offer open fields, creek beds, and tree canopy for natural-light lifestyle portraits.' },
        { title: 'Two-Photographer Option', description: 'Add a second shooter to capture multiple angles and candid moments across the full family group simultaneously.' },
        { title: 'Fast Gallery Delivery', description: '3–5 business day turnaround so you can share, print, and frame your images while the memories are fresh.' },
      ]}
      faqs={[
        { question: 'What locations do you recommend for family sessions in Spring, TX?', answer: 'Old Town Spring, Meyer Park, and Pundt Park are our top picks — each offers different aesthetics from charming urban to natural open-field environments.' },
        { question: 'What is the best time of year for outdoor family photos in Spring?', answer: 'Fall (October–November) and spring (March–April) offer the most comfortable temperatures and best light for outdoor family sessions.' },
        { question: 'How many people can be in a family session?', answer: 'We accommodate all family sizes. Large extended family groups benefit most from our two-photographer option for full coverage.' },
        { question: 'Do you travel to other cities nearby?', answer: 'Yes. We regularly serve The Woodlands, Tomball, Conroe, Pinehurst, and greater Montgomery County.' },
      ]}
      nearbyCities={['The Woodlands', 'Tomball', 'Conroe', 'Pinehurst', 'Houston']}
    />
  )
}
