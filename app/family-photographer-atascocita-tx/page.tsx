import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Family Photographer Atascocita TX - Studio37 Photography',
  description:
    'Family photographer in Atascocita, TX. Studio37 delivers natural family portrait sessions at Lake Houston, Atascocita Commons, and Luce Bayou parkway.',
  keywords: [
    'family photographer Atascocita TX',
    'family photos Atascocita Texas',
    'family portrait photographer Atascocita TX',
    'Lake Houston family photographer',
    'photographer near Atascocita TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/family-photographer-atascocita-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function FamilyPhotographerAtascocitaPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Family Photography"
      city="Atascocita"
      stateAbbr="TX"
      county="Harris County"
      pageUrl="https://www.studio37.cc/family-photographer-atascocita-tx"
      serviceUrl="https://www.studio37.cc/services/portrait-photography"
      startingPrice="$350"
      intro="Atascocita, TX sits along Lake Houston's western shore — giving family photographers access to some of NE Houston's most dramatic waterfront portrait settings. Studio37 delivers professional family sessions at Lake Houston, Atascocita Commons greenways, and Luce Bayou parkway, using the area's open sky, water reflections, and trail corridors to create genuine, memorable family portraits."
      highlights={[
        { title: 'Lake Houston Waterfront', description: 'Sunset sessions at the lake deliver dramatic water reflections, warm horizon light, and an expansive backdrop unlike any suburban park.' },
        { title: 'Atascocita Commons Greenways', description: 'Well-maintained community parks and walking paths provide accessible, versatile outdoor settings for families of all ages.' },
        { title: 'Luce Bayou Parkway', description: 'Natural bayou-side corridors with filtered light, organic textures, and a relaxed, nature-forward atmosphere for lifestyle family work.' },
        { title: 'All Life Stages', description: 'Newborn lifestyle sessions, toddler and young family portraits, milestone sessions, and multi-generational extended family days.' },
      ]}
      faqs={[
        { question: 'Where are the best family portrait locations in Atascocita, TX?', answer: 'Lake Houston waterfront and Atascocita Commons greenways are our top picks — each offers a very different aesthetic for the same community.' },
        { question: 'When is the best time of year for family sessions near Atascocita?', answer: 'Fall (October–November) is our most popular window. Spring (March–April) is excellent for temperature and color variety.' },
        { question: 'Can you photograph large extended family groups?', answer: 'Yes. We accommodate all group sizes and offer a two-photographer option for extended family groups over 20.' },
        { question: 'Do you serve nearby areas?', answer: 'Yes. We cover Humble, Kingwood, Porter, New Caney, Spring, and broader NE Houston and Harris County.' },
      ]}
      nearbyCities={['Humble', 'Kingwood', 'Porter', 'New Caney', 'Spring']}
    />
  )
}
