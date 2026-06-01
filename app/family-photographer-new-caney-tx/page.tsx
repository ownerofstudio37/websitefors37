import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Family Photographer New Caney TX - Studio37 Photography',
  description:
    'Family photographer in New Caney, TX. Studio37 captures genuine family moments at Valley Ranch Town Center, Lake Houston Wilderness Park, and local parks.',
  keywords: [
    'family photographer New Caney TX',
    'family photos New Caney Texas',
    'family portrait photographer New Caney TX',
    'Valley Ranch family photographer',
    'family photographer near New Caney TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/family-photographer-new-caney-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function FamilyPhotographerNewCaneyPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Family Photography"
      city="New Caney"
      stateAbbr="TX"
      county="Montgomery County"
      pageUrl="https://www.studio37.cc/family-photographer-new-caney-tx"
      serviceUrl="https://www.studio37.cc/services/portrait-photography"
      startingPrice="$350"
      intro="New Caney is one of Montgomery County's fastest-growing communities — and Studio37 brings professional family portrait sessions to Valley Ranch, Lake Houston Wilderness Park, and surrounding neighborhoods. Whether it's a milestone session or your annual family update, we deliver relaxed, natural images that reflect your family at this moment in time."
      highlights={[
        { title: 'Valley Ranch Town Center', description: 'The community\'s growing commercial hub offers walkable, modern backdrops with consistent access and open lighting.' },
        { title: 'Lake Houston Wilderness Park', description: 'Dense forest trails and creek corridors create stunning natural-light backdrops for outdoor family lifestyle sessions.' },
        { title: 'All Family Sizes Welcome', description: 'From couples and newborns to multi-generational extended family groups — our sessions are designed for everyone.' },
        { title: 'Two-Photographer Option', description: 'Add a second photographer for larger groups to ensure full simultaneous coverage without missing candid moments.' },
      ]}
      faqs={[
        { question: 'Where do you recommend for family sessions in New Caney?', answer: 'Lake Houston Wilderness Park is our top pick for natural light and scenic variety; Valley Ranch Town Center works well for a modern urban feel.' },
        { question: 'What time of day is best for outdoor family photos?', answer: 'The hour before sunset — golden hour — delivers the most flattering, warm light for outdoor family portraits year-round.' },
        { question: 'How many photos will we receive?', answer: 'Family sessions typically include 40–80 fully edited images depending on session length and group size.' },
        { question: 'Do you serve nearby cities?', answer: 'Yes. We cover Porter, Humble, Spring, Conroe, Kingwood, and greater East Montgomery County.' },
      ]}
      nearbyCities={['Porter', 'Humble', 'Spring', 'Conroe', 'Kingwood']}
    />
  )
}
