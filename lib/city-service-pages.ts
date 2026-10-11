import { studio37Reviews } from '@/lib/public-content'
import { type CityGuide, type CityImage, type CitySession, type CitySpot, cityGuideLinks, getCityGuide, getCityGuideReviews } from '@/lib/city-guides'
import { type ServiceSession, serviceProof } from '@/lib/service-guides'

// City x service landing pages (e.g. /wedding-photographer-navasota-tx). Everything local on these pages
// comes from the verified city guide data in lib/city-guides.ts, filtered to what fits the service, so
// they never repeat unverified claims and never duplicate the city page itself.

export type CityServiceKey = 'wedding' | 'engagement' | 'family' | 'portrait'

type Review = (typeof studio37Reviews)[number]

type CityServiceConfig = {
  label: string
  // "Wedding Photographer" for titles and H1s.
  role: string
  // "wedding photos" / "engagement photos" for questions and headings.
  photos: string
  // "weddings" for the recent-work heading.
  recent: string
  mainHref: string
  price: string
  // Which spots and sessions in the city guide fit this service.
  spotMatch: RegExp
  sessionMatch: RegExp
  reviewTypes: string[]
  proofKey: keyof typeof serviceProof
  pitch: (city: string) => string
  steps: Array<{ title: string; body: string }>
  extraFaq: (city: string, guide: CityGuide) => { question: string; answer: string }
  related: Array<{ label: string; href: string }>
}

export const cityServiceConfig: Record<CityServiceKey, CityServiceConfig> = {
  wedding: {
    label: 'Wedding Photography',
    role: 'Wedding Photographer',
    photos: 'wedding photos',
    recent: 'weddings',
    mainHref: '/services/wedding-photography',
    price: '$1,200',
    spotMatch: /couple|engage|bridal|wedding/i,
    sessionMatch: /wedding|bridal/i,
    reviewTypes: ['Proposal', 'Portrait'],
    proofKey: 'wedding',
    pitch: (city) =>
      `Two photographers for your ${city} wedding, from getting ready to the send-off, with couple portraits planned around the light and the spots that fit your day.`,
    steps: [
      { title: 'Timeline call', body: 'We build the photo timeline with you and your planner: first look, family formals, golden-hour portraits, and the exit.' },
      { title: 'Two photographers on the day', body: 'Every collection includes two photographers, so the ceremony is covered from two angles and guest moments are not missed during formals.' },
      { title: 'Sneak peek, then the gallery', body: 'A 48-hour sneak peek comes first, followed by the full edited gallery in a private online gallery.' },
    ],
    extraFaq: (city, guide) =>
      guide.venues.length
        ? {
            question: `Which wedding venues near ${city} do you plan around?`,
            answer: `Venues in our ${city} planning notes include ${listWithAnd(guide.venues.map((venue) => venue.name))}. If your venue is not listed, we scout it with you before the day. Every collection includes two photographers.`,
          }
        : {
            question: `How many photographers come to a ${city} wedding?`,
            answer: `Two. Every Studio37 wedding collection includes two photographers, so ${city} ceremonies are covered from both sides and candid guest moments are not missed while formals are happening.`,
          },
    related: [
      { label: 'Wedding collections and pricing', href: '/services/wedding-photography' },
      { label: 'Engagement sessions', href: '/services/engagement-session' },
      { label: 'Proposal planning', href: '/services/concierge-services' },
    ],
  },
  engagement: {
    label: 'Engagement Photography',
    role: 'Engagement Photographer',
    photos: 'engagement photos',
    recent: 'proposals and engagements',
    mainHref: '/services/engagement-session',
    price: '$450',
    spotMatch: /couple|engage|proposal/i,
    sessionMatch: /proposal|engage/i,
    reviewTypes: ['Proposal', 'Portrait'],
    proofKey: 'engagement',
    pitch: (city) =>
      `Golden-hour engagement sessions in ${city} with relaxed direction, two photographers, and spots picked for the look you want on your save-the-dates.`,
    steps: [
      { title: 'Pick the look', body: 'Tell us whether you want garden, water, downtown, or open-field photos, and we suggest the spot and the time of day.' },
      { title: 'Relaxed direction', body: 'We guide you with simple prompts instead of stiff posing, so the photos look like the two of you.' },
      { title: 'Save-the-date ready', body: 'Your gallery includes wide, close, and candid frames sized for announcements, save-the-dates, and prints.' },
    ],
    extraFaq: (city) => ({
      question: `Can you help plan a surprise proposal in ${city}?`,
      answer: `Yes. Our proposal planning service covers location scouting, privacy planning, decor guidance, and run-of-show timing in ${city}, plus photo or video coverage of the moment. Planning is quoted after a short call, and engagement sessions start at $450.`,
    }),
    related: [
      { label: 'Engagement sessions and pricing', href: '/services/engagement-session' },
      { label: 'Surprise proposal planning', href: '/services/concierge-services' },
      { label: 'Wedding photography', href: '/services/wedding-photography' },
    ],
  },
  family: {
    label: 'Family Photography',
    role: 'Family Photographer',
    photos: 'family photos',
    recent: 'family sessions',
    mainHref: '/family-photography',
    price: '$350',
    spotMatch: /famil|kid|child|maternity|mini/i,
    sessionMatch: /family|maternity|mini|kid/i,
    reviewTypes: ['Family', 'Portrait'],
    proofKey: 'portrait',
    pitch: (city) =>
      `Family sessions in ${city} paced for kids, with shade, short walks, and two photographers so someone is always ready when the real smiles happen.`,
    steps: [
      { title: 'Plan around the kids', body: 'We schedule around naps and the best light, and pick a spot with easy parking and short walks.' },
      { title: 'Play, then portraits', body: 'We start with movement and games, then fit in the posed group shots once everyone is warmed up.' },
      { title: 'Every combination', body: 'Your gallery covers the whole family, siblings, parents, and candid moments, ready for prints and cards.' },
    ],
    extraFaq: (city) => ({
      question: `Can grandparents and extended family join a ${city} session?`,
      answer: `Yes. Extended family sessions with multiple groupings are our Legacy Package, starting at $750. Smaller family sessions start at $350, and every session includes two photographers.`,
    }),
    related: [
      { label: 'Family photography packages', href: '/family-photography' },
      { label: 'Maternity sessions', href: '/maternity-sessions' },
      { label: 'Mini sessions', href: '/mini-sessions' },
    ],
  },
  portrait: {
    label: 'Portrait Photography',
    role: 'Portrait Photographer',
    photos: 'portraits',
    recent: 'portrait sessions',
    mainHref: '/services/portrait-photography',
    price: '$350',
    spotMatch: /senior|portrait|branding|headshot|maternity|individual/i,
    sessionMatch: /senior|graduat|portrait|headshot|maternity|mini|outdoor session/i,
    reviewTypes: ['Portrait', 'Family'],
    proofKey: 'portrait',
    pitch: (city) =>
      `Senior, maternity, branding, and personal portraits in ${city} with guided posing, outfit help, and two photographers on every session.`,
    steps: [
      { title: 'Choose your session', body: 'Senior, maternity, headshot, or personal branding: we match the spot, outfits, and timing to how you will use the photos.' },
      { title: 'Guided posing', body: 'We direct every pose and expression, so you never have to guess what to do with your hands.' },
      { title: 'Retouched favorites', body: 'You get a gallery with variety plus retouched favorites, cropped for prints, announcements, and profiles.' },
    ],
    extraFaq: (city) => ({
      question: `Do you photograph seniors, maternity, and headshots in ${city}?`,
      answer: `Yes. Senior portraits, maternity sessions, and individual headshots all start at $350, with team and executive headshot packages for businesses. We pick the ${city} spot to match the session.`,
    }),
    related: [
      { label: 'Senior portraits', href: '/senior-portraits' },
      { label: 'Maternity sessions', href: '/maternity-sessions' },
      { label: 'Professional headshots', href: '/professional-headshots' },
    ],
  },
}

type CityServicePageData = {
  service: CityServiceKey
  city: string
  heroImage: CityImage
  nearby: string[]
}

// Hero photos: the city's own photo when it fits the service, otherwise a different photo for each page
// of the same service.
export const cityServicePages: Record<string, CityServicePageData> = {
  'wedding-photographer-bryan-tx': {
    service: 'wedding',
    city: 'Bryan',
    heroImage: { id: 'Untitled-30_fliqiq', alt: 'Bride walking down the aisle with her father at an outdoor vineyard ceremony in Bryan, TX' },
    nearby: ['College Station', 'Navasota', 'Huntsville', 'Conroe', 'Houston'],
  },
  'wedding-photographer-college-station-tx': {
    service: 'wedding',
    city: 'College Station',
    heroImage: { id: 'KELLY_-_1_11_wgadni', alt: 'Black and white photo of a bride laughing with her father among vineyard rows' },
    nearby: ['Bryan', 'Navasota', 'Huntsville', 'Montgomery', 'Houston'],
  },
  'wedding-photographer-katy-tx': {
    service: 'wedding',
    city: 'Katy',
    heroImage: { id: 'Untitled-12_fzsyvh', alt: 'Couple standing arm in arm on a wooden walkway beside a lake' },
    nearby: ['Houston', 'Cypress', 'Tomball', 'Spring', 'The Woodlands'],
  },
  'wedding-photographer-montgomery-tx': {
    service: 'wedding',
    city: 'Montgomery',
    heroImage: { id: 'Untitled-15_vyz4oa', alt: 'Bride with sunflowers and groom in a cowboy hat under a rustic wooden arbor' },
    nearby: ['Conroe', 'Magnolia', 'Pinehurst', 'The Woodlands', 'Willis'],
  },
  'wedding-photographer-navasota-tx': {
    service: 'wedding',
    city: 'Navasota',
    heroImage: { id: 'IMG_8313_asvu5g', alt: 'Couple kissing with the engagement ring in view' },
    nearby: ['Plantersville', 'Bryan', 'College Station', 'Magnolia', 'Montgomery'],
  },
  'wedding-photographer-plantersville-tx': {
    service: 'wedding',
    city: 'Plantersville',
    heroImage: { id: 'Untitled-36_mape8j', alt: 'Bride holding sunflowers on a wooden porch with pine trees behind her' },
    nearby: ['Magnolia', 'Navasota', 'Montgomery', 'Conroe', 'Bryan'],
  },
  'wedding-photographer-the-woodlands-tx': {
    service: 'wedding',
    city: 'The Woodlands',
    heroImage: { id: 'PS379781_kttvv3', alt: 'Couple in formal attire smiling at each other under the trees' },
    nearby: ['Spring', 'Conroe', 'Tomball', 'Magnolia', 'Houston'],
  },
  'wedding-photographer-tomball-tx': {
    service: 'wedding',
    city: 'Tomball',
    heroImage: { id: 'PS379799_ayoxbp', alt: 'Couple embracing among lush green trees' },
    nearby: ['Pinehurst', 'Magnolia', 'Spring', 'The Woodlands', 'Houston'],
  },
  'wedding-photographer-waller-tx': {
    service: 'wedding',
    city: 'Waller',
    heroImage: { id: 'KELLY_-_1_8_1__2_x7leuc', alt: 'Black and white photo of a ring bearer blowing bubbles during an outdoor wedding ceremony' },
    nearby: ['Hockley', 'Tomball', 'Magnolia', 'Cypress', 'Pinehurst'],
  },
  'engagement-photographer-conroe-tx': {
    service: 'engagement',
    city: 'Conroe',
    heroImage: { id: 'Untitled-100_gxzfgy', alt: 'Black and white close-up of an engagement ring on intertwined hands' },
    nearby: ['Montgomery', 'The Woodlands', 'Willis', 'Magnolia', 'Pinehurst'],
  },
  'engagement-photographer-houston-tx': {
    service: 'engagement',
    city: 'Houston',
    heroImage: {
      id: 'Jay_Proposal_-_1_12_e7wqsb',
      alt: 'Newly engaged couple showing the ring under a Will You Marry Me sign at Mercer Botanic Gardens',
    },
    nearby: ['The Woodlands', 'Tomball', 'Spring', 'Katy', 'Cypress'],
  },
  'engagement-photographer-magnolia-tx': {
    service: 'engagement',
    city: 'Magnolia',
    heroImage: { id: 'Untitled-6_3_kmgp9o', alt: 'Man kneeling to propose on a garden path beside a picnic blanket and flowers' },
    nearby: ['Pinehurst', 'The Woodlands', 'Tomball', 'Montgomery', 'Conroe'],
  },
  'engagement-photographer-montgomery-tx': {
    service: 'engagement',
    city: 'Montgomery',
    heroImage: { id: 'JayKnee3_1_dm2pwk', alt: 'Close-up of a ring being slipped on during a proposal' },
    nearby: ['Conroe', 'Pinehurst', 'Magnolia', 'The Woodlands', 'Willis'],
  },
  'engagement-photographer-the-woodlands-tx': {
    service: 'engagement',
    city: 'The Woodlands',
    heroImage: { id: 'IMG_4555_1_ppdkum', alt: 'Newly engaged woman holding red roses and showing her ring by the water' },
    nearby: ['Pinehurst', 'Magnolia', 'Spring', 'Conroe', 'Houston'],
  },
  'engagement-photographer-tomball-tx': {
    service: 'engagement',
    city: 'Tomball',
    heroImage: { id: 'PS370397-1_ooxygn', alt: 'Engaged couple leaning against a large oak tree at golden hour' },
    nearby: ['Magnolia', 'Spring', 'The Woodlands', 'Pinehurst', 'Houston'],
  },
  'family-photographer-atascocita-tx': {
    service: 'family',
    city: 'Atascocita',
    heroImage: { id: 'IMG_4582_1_lmosd6', alt: 'Mother hugging her two grown daughters among tropical plants' },
    nearby: ['Humble', 'Kingwood', 'Porter', 'New Caney', 'Spring'],
  },
  'family-photographer-cleveland-tx': {
    service: 'family',
    city: 'Cleveland',
    heroImage: { id: 'Hotard_Family_Day_2_-_49_1_eernop', alt: 'Black and white family portrait of parents hugging their three daughters by the water' },
    nearby: ['Splendora', 'New Caney', 'Humble', 'Kingwood', 'Conroe'],
  },
  'family-photographer-kingwood-tx': {
    service: 'family',
    city: 'Kingwood',
    heroImage: { id: 'Hotard_Family_Day_2_-_152_1_mcyhw2', alt: 'Family of six walking hand in hand through a grassy field by the water' },
    nearby: ['Humble', 'Atascocita', 'Porter', 'New Caney', 'Spring'],
  },
  'family-photographer-magnolia-tx': {
    service: 'family',
    city: 'Magnolia',
    heroImage: { id: 'Untitled_tpoc5r', alt: 'Grandparents holding hands with their extended family gathered behind them by a lake' },
    nearby: ['Pinehurst', 'The Woodlands', 'Conroe', 'Tomball', 'Montgomery'],
  },
  'family-photographer-new-caney-tx': {
    service: 'family',
    city: 'New Caney',
    heroImage: { id: 'Hotard_Family_Day_1_-_252-2_fjeggf', alt: 'Family of six posing on a wooded trail under a green canopy' },
    nearby: ['Porter', 'Humble', 'Spring', 'Conroe', 'Kingwood'],
  },
  'family-photographer-porter-tx': {
    service: 'family',
    city: 'Porter',
    heroImage: { id: 'Untitled-3_2_u4p9kx', alt: 'Parents walking with their two young daughters on a sunny tree-lined path' },
    nearby: ['New Caney', 'Humble', 'Kingwood', 'Spring', 'Conroe'],
  },
  'family-photographer-spring-tx': {
    service: 'family',
    city: 'Spring',
    heroImage: { id: 'Untitled-4-3_dvlcs6', alt: 'Brother and sister laughing together on a sandy lakeshore' },
    nearby: ['The Woodlands', 'Tomball', 'Conroe', 'Pinehurst', 'Houston'],
  },
  'portrait-photographer-conroe-tx': {
    service: 'portrait',
    city: 'Conroe',
    heroImage: { id: 'Hotard_Family_Day_2_-_763_1_jklpba', alt: 'High school senior holding her 2026 graduation cap tassel' },
    nearby: ['The Woodlands', 'Magnolia', 'Montgomery', 'Willis', 'Spring'],
  },
  'portrait-photographer-cypress-tx': {
    service: 'portrait',
    city: 'Cypress',
    heroImage: { id: 'PS374813_vuos93', alt: 'High school senior smiling among green plants' },
    nearby: ['Tomball', 'Spring', 'Katy', 'Hockley', 'Houston'],
  },
  'portrait-photographer-hockley-tx': {
    service: 'portrait',
    city: 'Hockley',
    heroImage: { id: 'Untitled-12_hih9qs', alt: 'High school senior in a letterman jacket sitting in the grass by a pond' },
    nearby: ['Tomball', 'Magnolia', 'Waller', 'Pinehurst', 'Cypress'],
  },
  'portrait-photographer-humble-tx': {
    service: 'portrait',
    city: 'Humble',
    heroImage: { id: 'JoshuaMapson-029_rgc1xu', alt: 'Smiling man in a leather jacket for an outdoor headshot' },
    nearby: ['Kingwood', 'Atascocita', 'Spring', 'Porter', 'Houston'],
  },
  'portrait-photographer-huntsville-tx': {
    service: 'portrait',
    city: 'Huntsville',
    heroImage: { id: 'Untitled-4_1_osac8b', alt: 'Graduate holding a Sam Houston State Bearkats pennant outdoors' },
    nearby: ['Willis', 'Conroe', 'Montgomery', 'Pinehurst', 'College Station'],
  },
  'portrait-photographer-katy-tx': {
    service: 'portrait',
    city: 'Katy',
    heroImage: { id: 'Hotard_Family_Day_2_-_764_1_b9enxd', alt: 'Black and white senior portrait of a graduate holding her 2026 tassel' },
    nearby: ['Houston', 'Cypress', 'Tomball', 'Spring', 'The Woodlands'],
  },
  'portrait-photographer-new-waverly-tx': {
    service: 'portrait',
    city: 'New Waverly',
    heroImage: { id: 'PS375315_zyvbbi', alt: 'Woman in a flowing gown in a field of orange wildflowers' },
    nearby: ['Huntsville', 'Willis', 'Conroe', 'Pinehurst', 'Montgomery'],
  },
  'portrait-photographer-splendora-tx': {
    service: 'portrait',
    city: 'Splendora',
    heroImage: { id: 'PS379444_2_1_pge2hl', alt: 'Young woman posing among pink azalea blooms' },
    nearby: ['New Caney', 'Porter', 'Cleveland', 'Humble', 'Conroe'],
  },
  'portrait-photographer-willis-tx': {
    service: 'portrait',
    city: 'Willis',
    heroImage: { id: 'Untitled_1_zwsrnm', alt: 'Expecting parents and their daughter holding ultrasound photos among tall pine trees' },
    nearby: ['Conroe', 'Montgomery', 'Pinehurst', 'The Woodlands', 'Huntsville'],
  },
}

export function listWithAnd(items: string[]) {
  if (items.length < 2) return items.join('')
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
}

const cityHref = (city: string) => cityGuideLinks.find((link) => link.city === city)?.href

export function cityServiceSlug(service: CityServiceKey, city: string) {
  return Object.keys(cityServicePages).find((slug) => cityServicePages[slug].service === service && cityServicePages[slug].city === city)
}

const SPOT_PRIORITY: CityServiceKey[] = ['wedding', 'engagement', 'portrait', 'family']
const byVerified = (spots: CitySpot[]) => [...spots.filter((spot) => spot.verified), ...spots.filter((spot) => !spot.verified)]

// Spots that suit the service first (places we have shot ahead of researched ones), topped up with the
// rest of the city's spots so thinner cities still show at least three. When the same city has another
// service page earlier in SPOT_PRIORITY, its top three spots go to the back of this list so the two
// pages lead with different places.
function pickSpots(slug: string, guide: CityGuide, depth = 0): CitySpot[] {
  const page = cityServicePages[slug]
  const match = cityServiceConfig[page.service].spotMatch
  const matching = byVerified(guide.spots.filter((spot) => match.test(spot.bestFor)))
  const others = byVerified(guide.spots.filter((spot) => !match.test(spot.bestFor)))
  let spots = matching.length >= 3 ? matching : [...matching, ...others].slice(0, Math.max(3, matching.length))
  if (depth > 0) return spots
  const rival = Object.keys(cityServicePages).find(
    (other) =>
      cityServicePages[other].city === page.city &&
      SPOT_PRIORITY.indexOf(cityServicePages[other].service) < SPOT_PRIORITY.indexOf(page.service)
  )
  if (rival) {
    const taken = new Set(pickSpots(rival, guide, 1).slice(0, 3).map((spot) => spot.name))
    const fresh = [...matching, ...others].filter((spot) => !taken.has(spot.name))
    spots = [...fresh, ...spots.filter((spot) => taken.has(spot.name))].slice(0, Math.max(spots.length, 3))
  }
  return spots
}

// Everything the page renders, derived from the page entry and the city's guide.
export function getCityServicePage(slug: string) {
  const page = cityServicePages[slug]
  if (!page) return undefined
  const guideHref = cityHref(page.city)
  const guide = guideHref ? getCityGuide(guideHref.slice(1)) : undefined
  if (!guide || !guideHref) return undefined
  const config = cityServiceConfig[page.service]

  const spots = pickSpots(slug, guide)

  const citySessions: CitySession[] = guide.sessions.filter((session) => config.sessionMatch.test(session.description))
  // No matching session in this city yet: show matching sessions from the nearby cities' guides, then
  // the service's own proof list as a last resort.
  const fromNearby: ServiceSession[] = page.nearby.flatMap((nearbyCity) => {
    const href = cityHref(nearbyCity)
    const nearbyGuide = href ? getCityGuide(href.slice(1)) : undefined
    return (nearbyGuide?.sessions || [])
      // "...in nearby Bryan" entries repeat another city's session, so they would show up twice.
      .filter((session) => config.sessionMatch.test(session.description) && !/\bnearby\b/i.test(session.description))
      .map((session) => ({ description: session.description, date: session.date, cityLabel: nearbyCity, cityHref: href }))
  })
  const nearbySessions: ServiceSession[] = citySessions.length
    ? []
    : (fromNearby.length ? fromNearby : serviceProof[config.proofKey].sessions).slice(0, 4)

  // A review from this city's guide when one fits the service; otherwise rotate through every review that
  // fits, so neighboring pages do not all show the same quote.
  const cityReviews = getCityGuideReviews(guide)
  const fitting = studio37Reviews.filter((item) => config.reviewTypes.includes(item.service))
  const review: Review | undefined =
    config.reviewTypes.map((type) => cityReviews.find((item) => item.service === type)).find(Boolean) ||
    fitting[Object.keys(cityServicePages).indexOf(slug) % fitting.length]

  const siblings = Object.entries(cityServicePages)
    .filter(([other, data]) => data.service === page.service && other !== slug)
    .map(([other, data]) => ({ label: data.city, href: `/${other}` }))
  const sameCity = Object.entries(cityServicePages)
    .filter(([other, data]) => data.city === page.city && other !== slug)
    .map(([other, data]) => ({ label: `${cityServiceConfig[data.service].label} in ${data.city}`, href: `/${other}` }))
  const nearby = page.nearby.map((city) => {
    const sibling = cityServiceSlug(page.service, city)
    return { label: city, href: sibling ? `/${sibling}` : cityHref(city) }
  })

  return { slug, ...page, config, guide, guideHref, spots, citySessions, nearbySessions, review, siblings, sameCity, nearby }
}

export function cityServiceTitle(slug: string) {
  const page = cityServicePages[slug]
  return `${cityServiceConfig[page.service].role} in ${page.city}, TX | Studio37`
}

export function cityServiceDescription(slug: string) {
  const data = getCityServicePage(slug)
  if (!data) return ''
  const names = data.spots.slice(0, 2).map((spot) => spot.name)
  const build = (spots: string[]) =>
    `${data.config.role} in ${data.city}, TX: ${data.config.photos} at ${listWithAnd(spots)}. Two photographers, from ${data.config.price}.`
  // Long spot names can push two of them past the ~155-character snippet limit.
  return build(names).length <= 150 ? build(names) : build(names.slice(0, 1))
}

export function cityServiceOgImage(slug: string) {
  const id = cityServicePages[slug]?.heroImage.id
  return `https://res.cloudinary.com/dmjxho2rl/image/upload/f_jpg,q_auto:best,w_1200,h_630,c_fill,g_auto/${id}.jpg`
}

// City-service pages for one city, used to link them from the city guide.
export function cityServiceLinksFor(city: string) {
  return Object.entries(cityServicePages)
    .filter(([, data]) => data.city === city)
    .map(([slug, data]) => ({ label: `${cityServiceConfig[data.service].label} in ${data.city}`, href: `/${slug}` }))
}
