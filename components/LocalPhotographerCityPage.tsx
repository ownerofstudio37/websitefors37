import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star, Users, Camera, Award, CheckCircle } from 'lucide-react'
import FAQSection from '@/components/FAQSection'
import GoogleBusinessWidget from '@/components/GoogleBusinessWidget'
import { generateEnhancedLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { generateFAQSchema } from '@/lib/seo-helpers'

type LocalPhotographerCityPageProps = {
  city: string
  stateAbbr: string
  county: string
  slug: string
  nearbyCities: string[]
  heroImage: string
}

const STARTING_PRICES = {
  portrait: '$350',
  engagement: '$450',
  event: '$600',
  wedding: '$1,200',
  commercial: '$500',
}

type CityProfile = {
  venueHighlights: string[]
  bestLightWindow: string
  seasonalTip: string
}

const CITY_PROFILES: Record<string, CityProfile> = {
  'katy': {
    venueHighlights: ['LaCenterra corridors', 'Mary Jo Peckham Park', 'Cinco Ranch trails'],
    bestLightWindow: '60-90 minutes before sunset for clean sky tones and softer skin rendering.',
    seasonalTip: 'Spring and late fall are strongest for family and engagement sessions due to milder heat and cleaner outdoor color.',
  },
  'tomball': {
    venueHighlights: ['Downtown Tomball storefront blocks', 'Kleb Woods trails', 'Burroughs Park edges'],
    bestLightWindow: 'Golden hour with a pre-sunset warm-up set for candid movement and wider environmental portraits.',
    seasonalTip: 'Holiday mini-session demand spikes early; late September to early November books fastest.',
  },
  'the woodlands': {
    venueHighlights: ['Waterway boardwalk', 'Town Green Park', 'Market Street architecture'],
    bestLightWindow: 'Early morning for cleaner foot traffic in high-density zones and evening for cinematic glow.',
    seasonalTip: 'Winter and spring work well for polished editorial portraits with lower humidity and manageable crowds.',
  },
  'conroe': {
    venueHighlights: ['Historic downtown facades', 'Lake Conroe access points', 'Candy Cane Park greens'],
    bestLightWindow: 'Late afternoon to sunset for balanced lake reflections and natural skin tones.',
    seasonalTip: 'For graduation and family sessions, peak booking period is March through May.',
  },
  'magnolia': {
    venueHighlights: ['Unity Park pockets', 'Pine-lined corridors', 'Rural venue landscapes'],
    bestLightWindow: 'Sunset and immediate blue hour for warm highlights with deep pine-green contrast.',
    seasonalTip: 'Bluebonnet season drives spring portrait demand and usually requires earlier reservation windows.',
  },
  'houston': {
    venueHighlights: ['Buffalo Bayou viewpoints', 'Museum District architecture', 'Inner Loop urban backdrops'],
    bestLightWindow: 'Early morning downtown and sunset in park settings to avoid harsh midday contrast.',
    seasonalTip: 'Summer sessions often perform best with early call times and shaded location strategy.',
  },
  'pinehurst': {
    venueHighlights: ['Goodson Loop district', 'Nearby wooded trails', 'Private local venues'],
    bestLightWindow: 'Late-day light windows for warm, film-inspired tones and smooth highlight roll-off.',
    seasonalTip: 'October through April offers the most flexible planning windows for outdoor sessions.',
  },
  'humble': {
    venueHighlights: ['Old Humble district', 'Deerbrook corridor aesthetics', 'Lake Houston-adjacent spots'],
    bestLightWindow: 'Golden hour with short movement-based sets for natural, energetic images.',
    seasonalTip: 'Fall and spring are strongest for family portraits because of temperature and wardrobe flexibility.',
  },
  'spring': {
    venueHighlights: ['Old Town Spring shops', 'Meyer Park open fields', 'Pundt Park creek beds'],
    bestLightWindow: 'Late afternoon to golden hour for warm park tones and open sky gradients.',
    seasonalTip: 'Spring and fall are highest-demand periods; book family sessions by August for October dates.',
  },
  'montgomery': {
    venueHighlights: ['Historic Downtown square', 'Fernland Historical Park', 'Lake Conroe lakeside paths'],
    bestLightWindow: 'Sunset for lake reflections and warm tones that complement historic architecture.',
    seasonalTip: 'Premium wedding venue market — weekend bookings fill early; consult 9-12 months out for ceremonies.',
  },
  'willis': {
    venueHighlights: ['Cedar Creek greenbelts', 'Downtown Willis storefronts', 'Lake Conroe North shoreline'],
    bestLightWindow: 'Golden hour and blue hour for lake-adjacent sessions with minimal crowd interference.',
    seasonalTip: 'Spring and fall are the sweet spots for outdoor portraits with lower humidity and soft foliage.',
  },
  'huntsville': {
    venueHighlights: ['Sam Houston State University campus', 'Huntsville State Park pines', 'Downtown Huntsville square'],
    bestLightWindow: 'Morning light on campus for clean editorial tones; late afternoon in the park for lifestyle work.',
    seasonalTip: 'Graduation season (May) and fall semester portrait demand peak simultaneously — reserve early.',
  },
  'new caney': {
    venueHighlights: ['Valley Ranch Town Center', 'Lake Houston Wilderness Park trails', 'Community park corridors'],
    bestLightWindow: 'Late afternoon for warm tones in open park and residential settings.',
    seasonalTip: 'Fast-growing community — fall family portrait demand builds quickly each September.',
  },
  'hockley': {
    venueHighlights: ['Zube Park open spaces', 'Houston Oaks venue grounds', 'Rural pasture corridors'],
    bestLightWindow: 'Sunset across open pasture for wide golden-hour compositions with minimal obstruction.',
    seasonalTip: 'Overlaps with Tomball and Magnolia demand — late summer booking is common for fall sessions.',
  },
  'porter': {
    venueHighlights: ['Valley Ranch Town Center', 'Bens Branch greenways', 'Sorters-McClellan corridors'],
    bestLightWindow: 'Golden hour in open residential and park settings for lifestyle and family work.',
    seasonalTip: 'Expanding family base drives strong fall portrait demand — book September by early August.',
  },
  'splendora': {
    venueHighlights: ['Downtown Splendora storefronts', 'FM 2090 open fields', 'Caney Creek access points'],
    bestLightWindow: 'Late afternoon for open-field golden hour with minimal foot traffic.',
    seasonalTip: 'Lower competition market — mid-week sessions available year-round with flexible scheduling.',
  },
  'cleveland': {
    venueHighlights: ['City Park open greens', 'Trinity River area', 'Downtown Cleveland facades'],
    bestLightWindow: 'Late afternoon and sunset for flattering natural light in open park settings.',
    seasonalTip: 'Spring and fall deliver best conditions for outdoor family and event sessions.',
  },
  'waller': {
    venueHighlights: ['Waller County Fairgrounds', 'Fields Store rural landscapes', 'Downtown Waller streetscapes'],
    bestLightWindow: 'Sunset across open terrain for wide, romantic compositions.',
    seasonalTip: 'Emerging wedding market — fall and spring ceremonies are growing in this corridor.',
  },
  'plantersville': {
    venueHighlights: ['FM 1774 ranch venue corridor', 'Navasota River bottomland', 'Rustic barn and pasture venues'],
    bestLightWindow: 'Golden hour in open country for sweeping landscape and wide ceremony backdrops.',
    seasonalTip: 'Ranch wedding demand peaks April–June and October–November; reserve 9+ months out.',
  },
  'navasota': {
    venueHighlights: ['Downtown Navasota Railroad District', 'Washington Avenue heritage facades', 'Local ranch venues'],
    bestLightWindow: 'Late afternoon for warm heritage-brick tones and open-sky ceremony setups.',
    seasonalTip: 'Bridge market between Montgomery County and Brazos Valley — flexible booking windows available.',
  },
  'bryan': {
    venueHighlights: ['Downtown Bryan historic district', 'Lake Walk waterfront', 'Messina Hof Wine Estate'],
    bestLightWindow: 'Evening light in the historic district for warm brick tones and cinematic depth.',
    seasonalTip: 'University proximity drives May graduation demand — confirm portrait dates 3-4 months ahead.',
  },
  'college station': {
    venueHighlights: ['Texas A&M campus architecture', 'Century Square plaza', 'Research Park greenways'],
    bestLightWindow: 'Morning on campus for clean editorial tones; sunset at Century Square for lifestyle work.',
    seasonalTip: 'A&M event calendar drives high demand — graduation, Aggie weddings, and Greek events fill dates fast.',
  },
  'cypress': {
    venueHighlights: ['Towne Lake waterfront', 'Bridgeland community parks', 'Cypress Creek greenbelt'],
    bestLightWindow: 'Sunset at Towne Lake for water reflections and warm residential backdrop lighting.',
    seasonalTip: 'Large suburban population — fall family portrait weekends fill 6-8 weeks in advance.',
  },
  'kingwood': {
    venueHighlights: ['Town Center Park trails', 'East End Park open fields', 'Kingwood Drive greenway corridor'],
    bestLightWindow: 'Late afternoon in park settings for natural dappled light through tree canopy.',
    seasonalTip: 'Established residential community with high milestone photography demand — book spring sessions early.',
  },
  'atascocita': {
    venueHighlights: ['Lake Houston waterfront', 'Atascocita Commons greenways', 'Luce Bayou parkway'],
    bestLightWindow: 'Sunset at Lake Houston for dramatic waterfront reflections and warm horizon tones.',
    seasonalTip: 'High-intent family and lifestyle market — fall bookings are the most competitive period.',
  },
  'new waverly': {
    venueHighlights: ['Sam Houston National Forest trailheads', 'Downtown New Waverly', 'Lone Star Hiking Trail'],
    bestLightWindow: 'Forest morning light for soft filtered tones and natural textures.',
    seasonalTip: 'Lower competition and quieter scheduling windows make this ideal for custom portrait experiences.',
  },
}

const CITY_SERVICE_GUIDES: Record<string, Array<{ label: string; href: string }>> = {
  'katy': [
    { label: 'Wedding Photographer Katy, TX', href: '/wedding-photographer-katy-tx' },
    { label: 'Portrait Photographer Katy, TX', href: '/portrait-photographer-katy-tx' },
  ],
  'the woodlands': [
    { label: 'Wedding Photographer The Woodlands, TX', href: '/wedding-photographer-the-woodlands-tx' },
  ],
  'conroe': [
    { label: 'Portrait Photographer Conroe, TX', href: '/portrait-photographer-conroe-tx' },
  ],
  'magnolia': [
    { label: 'Family Photographer Magnolia, TX', href: '/family-photographer-magnolia-tx' },
  ],
  'houston': [
    { label: 'Headshot Photographer Houston, TX', href: '/headshot-photographer-houston-tx' },
  ],
  'tomball': [
    { label: 'Wedding Photographer Tomball, TX', href: '/wedding-photographer-tomball-tx' },
  ],
  'spring': [
    { label: 'Family Photographer Spring, TX', href: '/family-photographer-spring-tx' },
  ],
  'montgomery': [
    { label: 'Wedding Photographer Montgomery, TX', href: '/wedding-photographer-montgomery-tx' },
  ],
  'willis': [
    { label: 'Portrait Photographer Willis, TX', href: '/portrait-photographer-willis-tx' },
  ],
  'huntsville': [
    { label: 'Portrait Photographer Huntsville, TX', href: '/portrait-photographer-huntsville-tx' },
  ],
  'new caney': [
    { label: 'Family Photographer New Caney, TX', href: '/family-photographer-new-caney-tx' },
  ],
  'hockley': [
    { label: 'Portrait Photographer Hockley, TX', href: '/portrait-photographer-hockley-tx' },
  ],
  'porter': [
    { label: 'Family Photographer Porter, TX', href: '/family-photographer-porter-tx' },
  ],
  'splendora': [
    { label: 'Portrait Photographer Splendora, TX', href: '/portrait-photographer-splendora-tx' },
  ],
  'cleveland': [
    { label: 'Family Photographer Cleveland, TX', href: '/family-photographer-cleveland-tx' },
  ],
  'waller': [
    { label: 'Wedding Photographer Waller, TX', href: '/wedding-photographer-waller-tx' },
  ],
  'plantersville': [
    { label: 'Wedding Photographer Plantersville, TX', href: '/wedding-photographer-plantersville-tx' },
  ],
  'navasota': [
    { label: 'Wedding Photographer Navasota, TX', href: '/wedding-photographer-navasota-tx' },
  ],
  'bryan': [
    { label: 'Wedding Photographer Bryan, TX', href: '/wedding-photographer-bryan-tx' },
  ],
  'college station': [
    { label: 'Wedding Photographer College Station, TX', href: '/wedding-photographer-college-station-tx' },
  ],
  'cypress': [
    { label: 'Portrait Photographer Cypress, TX', href: '/portrait-photographer-cypress-tx' },
  ],
  'kingwood': [
    { label: 'Family Photographer Kingwood, TX', href: '/family-photographer-kingwood-tx' },
  ],
  'atascocita': [
    { label: 'Family Photographer Atascocita, TX', href: '/family-photographer-atascocita-tx' },
  ],
  'humble': [
    { label: 'Portrait Photographer Humble, TX', href: '/portrait-photographer-humble-tx' },
  ],
  'new waverly': [
    { label: 'Portrait Photographer New Waverly, TX', href: '/portrait-photographer-new-waverly-tx' },
  ],
}

export default function LocalPhotographerCityPage({
  city,
  stateAbbr,
  county,
  slug,
  nearbyCities,
  heroImage,
}: LocalPhotographerCityPageProps) {
  const cityLabel = `${city}, ${stateAbbr}`
  const cityKey = city.toLowerCase()
  const cityProfile = CITY_PROFILES[cityKey]
  const serviceGuides = CITY_SERVICE_GUIDES[cityKey] || []

  const localBusinessSchema = generateEnhancedLocalBusinessSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.studio37.cc' },
    { name: `Local Photographer ${cityLabel}`, url: `https://www.studio37.cc/${slug}` },
  ])

  const cityFaqs = [
    {
      question: `What are your photography rates in ${city}, ${stateAbbr}?`,
      answer: `Current starting prices are: portraits ${STARTING_PRICES.portrait}, engagement sessions ${STARTING_PRICES.engagement}, event coverage ${STARTING_PRICES.event}, wedding coverage ${STARTING_PRICES.wedding}, and commercial sessions ${STARTING_PRICES.commercial}.`,
    },
    {
      question: `Do you travel outside of ${city}?`,
      answer: `Yes. We regularly serve clients across ${county}, including ${nearbyCities.slice(0, 4).join(', ')} and surrounding areas.`,
    },
    {
      question: 'How far in advance should I book?',
      answer:
        'Weddings are best booked 6-12 months in advance. Most portrait and event sessions can typically be booked 2-4 weeks out based on availability.',
    },
  ]

  const faqSchema = generateFAQSchema(cityFaqs)

  const faqTitle = `Frequently Asked Questions - ${city} Photographer`

  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={heroImage}
            alt={`Professional photographer in ${cityLabel}`}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-blue-300" />
              <span className="text-blue-200">Proudly serving {cityLabel} & {county}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Photographer in {cityLabel} for Weddings, Portraits &amp; Events</h1>
            <p className="text-xl mb-6 text-gray-200">
              Looking for a trusted photographer in {cityLabel}? Studio37 delivers wedding, portrait, engagement, event, and commercial photography for families and businesses across {county}.
              We bring a two-photographer team and clear pricing on every session.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-a-session"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
              >
                Book Your Session
              </Link>


              <Link
                href="/gallery"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors text-center"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Clients in {city} Choose Studio37</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine local knowledge, professional direction, and fast delivery to create photos you will actually use and love.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-14">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-2">5.0★</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">500+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-purple-600 mb-2">1000+</h3>
              <p className="text-gray-600">Sessions Completed</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-amber-600 mb-2">Local</h3>
              <p className="text-gray-600">Area Expertise</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[
                'Two-photographer coverage included in our core service model',
                'Clear, published package pricing aligned with our main services pages',
                'Fast turnaround with sneak peeks for most session types',
                'Local venue and location knowledge across Montgomery County',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
            <div>
              <GoogleBusinessWidget />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="eyebrow mb-4">Pricing</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Services & Starting Prices in {city}</h2>
            <p className="text-lg text-stone-600">
              Designed to match our main service pages with clearer package details. Final pricing may increase based on hours, travel, add-ons, and deliverables.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <Link href="/services/portrait-photography" className="group surface-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <span className="text-3xl">👨‍👩‍👧‍👦</span>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Portrait Photography</h3>
                <p className="text-sm uppercase tracking-wide text-blue-700 font-semibold mb-3">Starting at {STARTING_PRICES.portrait}</p>
                <p className="text-gray-600 mb-4">Family portraits, seniors, maternity, and professional headshots around {cityLabel}.</p>
                <ul className="text-sm text-stone-600 space-y-1 mb-4">
                  <li>• Guided posing + location planning</li>
                  <li>• Professionally edited gallery</li>
                  <li>• Print and sharing rights</li>
                </ul>
                <span className="font-medium text-blue-700">Learn More</span>
              </div>
            </Link>

            <Link href="/services/engagement-session" className="group surface-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors">
                  <span className="text-3xl">💖</span>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Engagement Sessions</h3>
                <p className="text-sm uppercase tracking-wide text-pink-700 font-semibold mb-3">Starting at {STARTING_PRICES.engagement}</p>
                <p className="text-gray-600 mb-4">Romantic save-the-date sessions and proposal-friendly planning support.</p>
                <ul className="text-sm text-stone-600 space-y-1 mb-4">
                  <li>• Style and concept guidance</li>
                  <li>• Golden-hour timeline support</li>
                  <li>• Multi-location options available</li>
                </ul>
                <span className="font-medium text-pink-700">Learn More</span>
              </div>
            </Link>

            <Link href="/services/event-photography" className="group surface-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Event Photography</h3>
                <p className="text-sm uppercase tracking-wide text-green-700 font-semibold mb-3">Starting at {STARTING_PRICES.event}</p>
                <p className="text-gray-600 mb-4">Corporate events, birthday parties, private celebrations, and community events.</p>
                <ul className="text-sm text-stone-600 space-y-1 mb-4">
                  <li>• Candid + key moment coverage</li>
                  <li>• Team portraits on request</li>
                  <li>• Fast post-event gallery delivery</li>
                </ul>
                <span className="font-medium text-green-700">Learn More</span>
              </div>
            </Link>

            <Link href="/services/wedding-photography" className="group surface-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="bg-rose-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-200 transition-colors">
                  <span className="text-3xl">💍</span>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Wedding Photography</h3>
                <p className="text-sm uppercase tracking-wide text-rose-700 font-semibold mb-3">Starting at {STARTING_PRICES.wedding}</p>
                <p className="text-gray-600 mb-4">Full-day storytelling for weddings in {cityLabel} and across {county}.</p>
                <ul className="text-sm text-stone-600 space-y-1 mb-4">
                  <li>• Timeline planning assistance</li>
                  <li>• Two-photographer team model</li>
                  <li>• Sneak peeks + full gallery delivery</li>
                </ul>
                <span className="font-medium text-rose-700">Learn More</span>
              </div>
            </Link>

            <Link href="/services/commercial-photography" className="group surface-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors">
                  <span className="text-3xl">🏢</span>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Commercial Photography</h3>
                <p className="text-sm uppercase tracking-wide text-gray-700 font-semibold mb-3">Starting at {STARTING_PRICES.commercial}</p>
                <p className="text-gray-600 mb-4">Branding sessions, products, headshots, and business content for local teams.</p>
                <ul className="text-sm text-stone-600 space-y-1 mb-4">
                  <li>• Brand-consistent image direction</li>
                  <li>• Website + social-ready exports</li>
                  <li>• Licensing support available</li>
                </ul>
                <span className="font-medium text-gray-700">Learn More</span>
              </div>
            </Link>
          </div>

          <div className="mt-8 bg-amber-50 border-y border-amber-200/80 rounded-xl p-4">
            <p className="text-center text-amber-900 font-medium">
              Two photographers on site — for the price of one. More coverage, more moments, same rate.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div className="section-soft p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Consultation</h3>
                    <p className="text-stone-600 leading-7">
                      We align on your goals, budget, style preferences, and timeline for your {cityLabel} session.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Planning & Prep</h3>
                    <p className="text-gray-600">
                      We map locations, timing, shot priorities, and any special requests so shoot day runs smoothly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Photography Day</h3>
                    <p className="text-gray-600">
                      Our team captures the must-have images plus candid moments that tell your story naturally.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Editing & Delivery</h3>
                    <p className="text-gray-600">
                      You receive an edited gallery ready for sharing, prints, and marketing use (if commercial).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-soft p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-6">Why Choose Studio37</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Experienced Local Team</h3>
                    <p className="text-stone-600">We know popular venues, parks, and lighting conditions across {county}.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Clear Starting Prices</h3>
                    <p className="text-gray-600">Published rates stay aligned with our core service pages for consistency.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Two-Photographer Coverage</h3>
                    <p className="text-gray-600">More angles and more key moments without a complicated upgrade structure.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Fast Turnaround</h3>
                    <p className="text-gray-600">Sneak peeks and polished edits are delivered quickly so you can use your images right away.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Guided Experience</h3>
                    <p className="text-gray-600">From planning through delivery, we keep communication simple and supportive.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {cityProfile && (
        <section className="py-12 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Local Planning Tips for {cityLabel} Sessions</h2>
              <p className="text-gray-700 mb-6">
                We tailor every shoot plan to local conditions in {cityLabel} so timelines, location flow, and lighting decisions translate to stronger final galleries.
              </p>

              <div className="grid md:grid-cols-3 gap-5">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">Venue Highlights</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {cityProfile.venueHighlights.map((venue) => (
                      <li key={venue}>• {venue}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">Best Light Window</h3>
                  <p className="text-sm text-gray-700">{cityProfile.bestLightWindow}</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">Seasonal Strategy</h3>
                  <p className="text-sm text-gray-700">{cityProfile.seasonalTip}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Areas We Serve Nearby</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[cityLabel, ...nearbyCities].map((area) => (
              <div key={area} className="bg-gray-50 p-5 rounded-lg text-center">
                <h3 className="font-semibold text-gray-800">{area}</h3>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/contact" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold">
              Ask about your location →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-stone-50 border-y border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Explore Services & City Pages</h2>
            <p className="text-gray-700 mb-6">
              Compare services, browse nearby city landing pages, and find the best fit for your timeline and budget.
            </p>

            <div className="flex flex-wrap gap-3 text-sm mb-4">
              <Link href="/services" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">All Services</Link>
              <Link href="/locations" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">All Service Areas</Link>
              <Link href="/services/wedding-photography" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Wedding</Link>
              <Link href="/services/portrait-photography" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Portrait</Link>
              <Link href="/services/event-photography" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Event</Link>
              <Link href="/services/commercial-photography" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Commercial</Link>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/local-photographer-pinehurst-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Pinehurst</Link>
              <Link href="/local-photographer-magnolia-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Magnolia</Link>
              <Link href="/local-photographer-the-woodlands-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">The Woodlands</Link>
              <Link href="/local-photographer-spring-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Spring</Link>
              <Link href="/local-photographer-tomball-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Tomball</Link>
              <Link href="/local-photographer-conroe-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Conroe</Link>
              <Link href="/local-photographer-montgomery-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Montgomery</Link>
              <Link href="/local-photographer-willis-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Willis</Link>
              <Link href="/local-photographer-huntsville-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Huntsville</Link>
              <Link href="/local-photographer-new-caney-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">New Caney</Link>
              <Link href="/local-photographer-hockley-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Hockley</Link>
              <Link href="/local-photographer-bryan-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Bryan</Link>
              <Link href="/local-photographer-college-station-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">College Station</Link>
              <Link href="/local-photographer-houston-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Houston</Link>
            </div>

            {serviceGuides.length > 0 && (
              <div className="mt-6">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Popular {city} Service Guides</h3>
                <div className="flex flex-wrap gap-3 text-sm">
                  {serviceGuides.map((guide) => (
                    <Link
                      key={guide.href}
                      href={guide.href}
                      className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-primary-300"
                    >
                      {guide.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <FAQSection
        title={faqTitle}
        faqs={cityFaqs}
      />

      <section className="py-16 bg-gradient-to-r from-primary-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Book a Photographer in {cityLabel}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tell us what you need and we will recommend the right package and timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-a-session" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Book a Session
            </Link>
            <Link href="/get-quote" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              Get Instant Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
