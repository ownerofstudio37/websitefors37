import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Family Photographer Cleveland TX - Studio37 Photography',
  description:
    'Family photographer in Cleveland, TX. Studio37 delivers natural family portrait sessions at City Park, Trinity River area, and local outdoor settings.',
  keywords: [
    'family photographer Cleveland TX',
    'family photos Cleveland Texas',
    'family portrait photographer Cleveland TX',
    'photographer near Cleveland TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/family-photographer-cleveland-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function FamilyPhotographerClevelandPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Family Photography"
      city="Cleveland"
      stateAbbr="TX"
      county="Liberty County"
      pageUrl="https://www.studio37.cc/family-photographer-cleveland-tx"
      serviceUrl="https://www.studio37.cc/services/portrait-photography"
      startingPrice="$350"
      intro="Cleveland, TX serves a wide residential footprint across Liberty County and surrounding areas — and Studio37 brings professional family portrait sessions right to your community. From open park greens at City Park to the natural Trinity River corridor, we match your family's personality to the right setting for images that feel authentic and timeless."
      highlights={[
        { title: 'City Park Open Greens', description: 'Large, open park grounds with consistent natural light and easy access for families with young children.' },
        { title: 'Trinity River Corridor', description: 'Natural riverside scenery with organic textures and water features for a dramatic, nature-forward family backdrop.' },
        { title: 'Relaxed Family Direction', description: 'We use natural movement prompts and candid-focused session flow so even camera-shy family members feel comfortable.' },
        { title: 'All Ages Welcome', description: 'From newborns and toddlers to teenagers and multi-generational groups — we photograph every stage of family life.' },
      ]}
      faqs={[
        { question: 'What are the best outdoor photo locations in Cleveland, TX?', answer: 'City Park open greens and the Trinity River area are our top picks for light quality and scenic variety.' },
        { question: 'How do you handle young children in portrait sessions?', answer: 'We use flexible timing, movement-based prompts, and brief breaks to keep young children comfortable and engaged throughout.' },
        { question: 'What time of year is best for outdoor family sessions near Cleveland?', answer: 'Spring (March–April) and fall (October–November) deliver the best light and temperature conditions.' },
        { question: 'Do you serve nearby areas?', answer: 'Yes. We cover Splendora, New Caney, Humble, Kingwood, and surrounding Liberty and Montgomery County communities.' },
      ]}
      nearbyCities={['Splendora', 'New Caney', 'Humble', 'Kingwood', 'Conroe']}
    />
  )
}
