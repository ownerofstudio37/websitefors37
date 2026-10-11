import { studio37Reviews } from '@/lib/public-content'
import type { CityImage } from '@/lib/city-guides'

// First-hand proof for the service pages, sourced from the Studio37 session records and city page
// master file (October 2026). Same rules as the city guides: sessions never name clients, `verified`
// spots are places Studio37 has photographed, and reviews reuse the published studio37Reviews entries.

export type ServiceSession = {
  description: string
  date?: string
  cityLabel?: string
  cityHref?: string
}

export type ServiceSpot = {
  name: string
  cityLabel: string
  cityHref: string
  why: string
  verified?: boolean
}

export type ServiceProof = {
  eyebrow: string
  heading: string
  secondaryImage: CityImage
  reviewName: string
  sessions: ServiceSession[]
  spotsHeading: string
  spots: ServiceSpot[]
}

const CITY = {
  pinehurst: '/local-photographer-pinehurst-tx',
  magnolia: '/local-photographer-magnolia-tx',
  tomball: '/local-photographer-tomball-tx',
  woodlands: '/local-photographer-the-woodlands-tx',
  conroe: '/local-photographer-conroe-tx',
  spring: '/local-photographer-spring-tx',
  montgomery: '/local-photographer-montgomery-tx',
  cypress: '/local-photographer-cypress-tx',
  houston: '/local-photographer-houston-tx',
  katy: '/local-photographer-katy-tx',
  humble: '/humble',
  bryan: '/local-photographer-bryan-tx',
  collegeStation: '/local-photographer-college-station-tx',
  huntsville: '/local-photographer-huntsville-tx',
  kingwood: '/kingwood',
} as const

export const serviceProof: Record<string, ServiceProof> = {
  wedding: {
    eyebrow: 'Recent weddings',
    heading: 'Weddings we have photographed',
    secondaryImage: { id: 'Untitled-15_vyz4oa', alt: 'Bride with sunflowers and groom in a cowboy hat under a rustic wooden arbor' },
    reviewName: 'Joshua G.',
    sessions: [
      { description: 'A wedding at Magnolia Meadows', date: 'April 2026', cityLabel: 'Magnolia', cityHref: CITY.magnolia },
      { description: 'A backyard wedding', date: 'June 2026', cityLabel: 'Magnolia', cityHref: CITY.magnolia },
      { description: 'A vineyard wedding at Messina Hof', date: 'March 2026', cityLabel: 'Bryan', cityHref: CITY.bryan },
    ],
    spotsHeading: 'Wedding venues in our guides',
    spots: [
      { name: 'Magnolia Meadows', cityLabel: 'Magnolia', cityHref: CITY.magnolia, why: 'Where we photographed an April 2026 wedding.', verified: true },
      { name: 'Messina Hof Winery & Resort', cityLabel: 'Bryan', cityHref: CITY.bryan, why: 'Vineyard rows and a villa; we photographed a wedding here in March 2026.', verified: true },
      { name: 'The Luminaire', cityLabel: 'Montgomery', cityHref: CITY.montgomery, why: 'A 20-acre lakeside estate with an indoor chapel, covered in our venue guides.' },
      { name: 'Big Sky Barn', cityLabel: 'Montgomery', cityHref: CITY.montgomery, why: 'A rustic barn in the piney woods with a light-filled chapel.' },
      { name: 'Lone Star Mansion', cityLabel: 'Pinehurst', cityHref: CITY.pinehurst, why: 'Wrap-around porches and old oaks close to our studio.' },
      { name: 'The Woodlands Resort', cityLabel: 'The Woodlands', cityHref: CITY.woodlands, why: 'A golden-hour terrace made for backlit portraits.' },
    ],
  },
  portrait: {
    eyebrow: 'Recent portrait sessions',
    heading: 'Portrait sessions we have photographed',
    secondaryImage: { id: 'Hotard_Family_Day_2_-_152_1_mcyhw2', alt: 'Family of six walking hand in hand through a grassy field by the water' },
    reviewName: 'Kelsi R.',
    sessions: [
      { description: 'Graduation portraits at Kleb Woods Nature Preserve', date: 'May 2026', cityLabel: 'Tomball', cityHref: CITY.tomball },
      { description: 'A senior session in downtown Humble', date: 'May 2026', cityLabel: 'Humble', cityHref: CITY.humble },
      { description: 'A maternity session at Old Mill Lake', date: 'August 2026', cityLabel: 'Pinehurst', cityHref: CITY.pinehurst },
      { description: 'Family sessions in Houston, Katy, Spring, and Humble', date: '2026' },
      { description: 'A generational family session', date: 'December 2025' },
      { description: 'Professional headshots in Pinehurst', cityLabel: 'Pinehurst', cityHref: CITY.pinehurst },
    ],
    spotsHeading: 'Portrait spots we have photographed',
    spots: [
      { name: 'Kleb Woods Nature Preserve', cityLabel: 'Tomball', cityHref: CITY.tomball, why: 'A historic farmhouse, barn, and boardwalks under dappled oak light.', verified: true },
      { name: 'Mercer Botanic Gardens', cityLabel: 'Humble', cityHref: CITY.humble, why: 'Themed gardens and a free, photographer-friendly sign-in policy.', verified: true },
      { name: 'Unity Park', cityLabel: 'Magnolia', cityHref: CITY.magnolia, why: 'Open fields that turn gold at golden hour.', verified: true },
      { name: 'Juergens Park', cityLabel: 'Tomball', cityHref: CITY.tomball, why: 'Easy parking and the park we use for many family sessions.', verified: true },
      { name: 'Hidden Lake', cityLabel: 'Pinehurst', cityHref: CITY.pinehurst, why: 'Soft lake light close to our studio.', verified: true },
      { name: 'The Woodlands pine trails', cityLabel: 'The Woodlands', cityHref: CITY.woodlands, why: 'Soft, dappled light that flatters kids and expecting parents.', verified: true },
    ],
  },
  event: {
    eyebrow: 'Recent events',
    heading: 'Events we have photographed',
    secondaryImage: { id: 'Alice_Birthday_Party_-_74_zxkulm', alt: 'Guests celebrating at a first birthday party in Houston, TX' },
    reviewName: 'Felipa Q.',
    sessions: [
      { description: 'A 100th birthday celebration', date: 'February 2026', cityLabel: 'The Woodlands', cityHref: CITY.woodlands },
      { description: 'Quinceañera portraits and event coverage', date: 'January 2026', cityLabel: 'Houston', cityHref: CITY.houston },
      { description: 'A first birthday party, outdoors in the rain', date: 'May 2026', cityLabel: 'Houston', cityHref: CITY.houston },
      { description: 'A birthday session', date: 'March 2026', cityLabel: 'Katy', cityHref: CITY.katy },
      { description: 'A birthday session in Austin', date: 'December 2025' },
    ],
    spotsHeading: 'Event venues in our guides',
    spots: [
      { name: 'The Woodlands Country Club', cityLabel: 'The Woodlands', cityHref: CITY.woodlands, why: 'A grand staircase, chandeliers, and a golf course ceremony space.' },
      { name: 'The Vale', cityLabel: 'Conroe', cityHref: CITY.conroe, why: 'A historic downtown chapel and reception hall.' },
      { name: 'The Bell Tower on 34th', cityLabel: 'Houston', cityHref: CITY.houston, why: 'A chandelier ballroom and waterwall courtyard.' },
      { name: 'Palm Royal Villa', cityLabel: 'Katy', cityHref: CITY.katy, why: 'An 8-acre estate with a banquet hall for up to 300.' },
    ],
  },
  commercial: {
    eyebrow: 'Recent business work',
    heading: 'Commercial work we have photographed',
    secondaryImage: { id: 'VB_School_Chris_Faves_-_158_wlcspc', alt: 'Volleyball school staff and members cheering under the school sign' },
    reviewName: 'Ivana M.',
    sessions: [
      { description: 'Brand and community content for a local volleyball school', date: 'May 2026', cityLabel: 'Katy', cityHref: CITY.katy },
      { description: 'Website imagery for a private business' },
      { description: 'Professional headshots in Pinehurst', cityLabel: 'Pinehurst', cityHref: CITY.pinehurst },
    ],
    spotsHeading: 'Business backdrops we plan around',
    spots: [
      { name: 'The Studio37 studio', cityLabel: 'Pinehurst', cityHref: CITY.pinehurst, why: 'An indoor setup for headshots, products, and weather-proof brand sessions.', verified: true },
      { name: 'The Waterway district', cityLabel: 'The Woodlands', cityHref: CITY.woodlands, why: 'Clean modern lines for headshots and brand portraits.', verified: true },
      { name: 'Downtown Conroe', cityLabel: 'Conroe', cityHref: CITY.conroe, why: 'Brick, murals, and courthouse architecture for branding sessions.' },
      { name: 'The Heights', cityLabel: 'Houston', cityHref: CITY.houston, why: 'Vintage storefronts and brick walls; street shots need no permit.' },
    ],
  },
  engagement: {
    eyebrow: 'Engagement locations',
    heading: 'Where we photograph engagements',
    secondaryImage: { id: 'PS379799_ayoxbp', alt: 'Couple embracing among lush green trees' },
    reviewName: 'Ainslee C.',
    sessions: [],
    spotsHeading: 'Engagement spots in our city guides',
    spots: [
      { name: 'Lake Windcrest', cityLabel: 'Magnolia', cityHref: CITY.magnolia, why: 'A clean sunset over the water with wooded shores.', verified: true },
      { name: 'Burroughs Park', cityLabel: 'Tomball', cityHref: CITY.tomball, why: 'Towering pines and a lake that goes gold at sunset.', verified: true },
      { name: 'The Waterway district', cityLabel: 'The Woodlands', cityHref: CITY.woodlands, why: 'Bridges, fountains, and evening light along Riva Row.', verified: true },
      { name: 'Mercer Botanic Gardens', cityLabel: 'Humble', cityHref: CITY.humble, why: 'Garden paths and courtyards with a free photographer sign-in.', verified: true },
      { name: 'Kickerillo-Mischer Preserve', cityLabel: 'Cypress', cityHref: CITY.cypress, why: 'A 40-acre lake that turns gold at sunset.' },
      { name: 'Buffalo Bayou Park', cityLabel: 'Houston', cityHref: CITY.houston, why: 'The Houston skyline at blue hour.' },
    ],
  },
  concierge: {
    eyebrow: 'Recent proposals',
    heading: 'Proposals we have photographed',
    secondaryImage: { id: 'JayKnee3_1_dm2pwk', alt: 'Close-up of a man slipping an engagement ring onto his partner’s finger' },
    reviewName: 'Lisa D.',
    sessions: [
      { description: 'A surprise proposal at Mercer Botanic Gardens', date: 'February 2026', cityLabel: 'Humble', cityHref: CITY.humble },
      { description: 'A proposal at Rose Hill', date: 'July 2026', cityLabel: 'Tomball', cityHref: CITY.tomball },
      { description: 'A proposal', date: 'March 2026', cityLabel: 'College Station', cityHref: CITY.collegeStation },
      { description: 'A surprise proposal at Moody Gardens in Galveston, followed by family photos at Brenner’s on the Bayou' },
      { description: 'A proposal in Galveston', date: 'July 2026' },
      { description: 'A proposal at a winery in San Marcos', date: 'January 2026' },
    ],
    spotsHeading: 'Proposal spots we plan around',
    spots: [
      { name: 'Mercer Botanic Gardens', cityLabel: 'Humble', cityHref: CITY.humble, why: 'Where we photographed a February 2026 surprise proposal.', verified: true },
      { name: 'The Century Tree', cityLabel: 'College Station', cityHref: CITY.collegeStation, why: 'An Aggie proposal tradition under a massive live oak.' },
      { name: 'Northshore Park', cityLabel: 'The Woodlands', cityHref: CITY.woodlands, why: 'A west-facing lakefront made for sunset proposals.' },
      { name: 'Waterpoint Marina', cityLabel: 'Montgomery', cityHref: CITY.montgomery, why: 'Lake Conroe sunsets with masts in the frame.' },
    ],
  },
}

export function getServiceReview(name: string) {
  return studio37Reviews.find((review) => review.name === name)
}

// ---------------------------------------------------------------------------------------------
// Portrait specialty pages (children of /services/portrait-photography).
// ---------------------------------------------------------------------------------------------

// `image` is a Cloudinary public ID.
// image is optional so pages with few distinct photos never repeat one on the same page.
export type ServicePackage = { name: string; price: string; note?: string; image?: string }

export type ServiceGuide = {
  slug: string
  eyebrow: string
  h1: string
  pitch: string
  heroImage: CityImage
  secondaryImage?: CityImage
  packages: ServicePackage[]
  packagesHeading: string
  sessions: ServiceSession[]
  sessionsHeading: string
  spots: ServiceSpot[]
  spotsHeading: string
  intro: string
  planning: string[]
  faqs: Array<{ question: string; answer: string }>
  reviewNames: string[]
  related: Array<{ label: string; href: string }>
  // Show the emailed prep checklist form before the FAQ.
  leadMagnet?: boolean
}

export const PORTRAIT_FAMILY = [
  { label: 'Family photography', href: '/family-photography' },
  { label: 'Senior portraits', href: '/senior-portraits' },
  { label: 'Maternity sessions', href: '/maternity-sessions' },
  { label: 'Professional headshots', href: '/professional-headshots' },
  { label: 'Houston headshots', href: '/headshot-photographer-houston-tx' },
  { label: 'Mini sessions', href: '/mini-sessions' },
]

const DELIVERY_FAQ = {
  question: 'How long does it take to receive our photos?',
  answer:
    'Most portrait galleries are delivered within about three weeks, with optional 24-hour sneak peeks available as an add-on. Galleries arrive in a private digital gallery.',
}
const TWO_PHOTOGRAPHERS_FAQ = {
  question: 'Do portrait sessions include two photographers?',
  answer:
    'Yes. Studio37 sessions are built around two photographers on site, so one person can guide posing and direction while the other catches expressions, details, and candid in-between moments.',
}

export const serviceGuides: Record<string, ServiceGuide> = {
  'senior-portraits': {
    slug: 'senior-portraits',
    leadMagnet: true,
    eyebrow: 'Portrait photography · Seniors',
    h1: 'Senior Portraits in Pinehurst, TX',
    pitch: 'Senior portraits planned around personality, outfit changes, and the spots that fit you, from Kleb Woods and Old Town Tomball to campus traditions.',
    heroImage: { id: 'Untitled-12_hih9qs', alt: 'High school senior in a letterman jacket sitting in the grass by a pond' },
    secondaryImage: { id: 'Untitled-4_1_osac8b', alt: 'Graduate holding a Sam Houston State Bearkats pennant outdoors' },
    packagesHeading: 'Senior portrait sessions',
    packages: [
      { name: 'Classic Session', price: '$350', image: 'Hotard_Family_Day_2_-_763_1_jklpba' },
      { name: 'Style Session', price: '$500', image: 'PS379444_2_1__2_ffgun8' },
      { name: 'Ultimate Session', price: '$750', image: 'PS374813_vuos93' },
    ],
    sessionsHeading: 'Recent senior and graduation sessions',
    sessions: [
      { description: 'Graduation portraits at Kleb Woods Nature Preserve', date: 'May 2026', cityLabel: 'Tomball', cityHref: CITY.tomball },
      { description: 'A senior session in downtown Humble', date: 'May 2026', cityLabel: 'Humble', cityHref: CITY.humble },
      { description: 'A graduation session', date: 'April 2026', cityLabel: 'Spring', cityHref: CITY.spring },
      { description: 'Graduation portraits deep in Magnolia', date: 'March 2026', cityLabel: 'Magnolia', cityHref: CITY.magnolia },
    ],
    spotsHeading: 'Senior portrait spots',
    spots: [
      { name: 'Kleb Woods Nature Preserve', cityLabel: 'Tomball', cityHref: CITY.tomball, why: 'Farmhouse, barn, and boardwalks; where we photographed a May 2026 graduation session.', verified: true },
      { name: 'Downtown Humble', cityLabel: 'Humble', cityHref: CITY.humble, why: 'A walkable downtown strip where we photographed a senior session.', verified: true },
      { name: 'Old Town Tomball and Depot Plaza', cityLabel: 'Tomball', cityHref: CITY.tomball, why: 'Brick storefronts, railroad tracks, and the old train platform.', verified: true },
      { name: 'Historic Magnolia Depot', cityLabel: 'Magnolia', cityHref: CITY.magnolia, why: 'The 1902 depot gives senior portraits small-town character.', verified: true },
      { name: 'Cypress Top Historic Park', cityLabel: 'Cypress', cityHref: CITY.cypress, why: 'Original railroad-town buildings and a bright-yellow depot.' },
      { name: 'Texas A&M and SHSU campuses', cityLabel: 'College Station', cityHref: CITY.collegeStation, why: 'The Century Tree, the Administration Building steps, and SHSU’s tree-lined walks.' },
    ],
    intro:
      'Senior portraits need more than one pretty background. We plan the session around who you are, how many outfits you want, the photos your parents will frame, and the ones you will post, then pick spots that give real variety without spending the session in the car.',
    planning: [
      'Outfit sequencing for casual, dressy, cap-and-gown, sports, or hobby looks.',
      'A shot list that balances parent keepsakes, announcements, yearbook needs, and social posts.',
      'Timing around golden hour so outfit changes stay realistic in Texas heat.',
      'Extra outfit and location changes, hobby sets, best-friend minis, and family add-ons are available.',
    ],
    faqs: [
      {
        question: 'When should seniors book their portrait session?',
        answer: 'May and December graduations are the senior-portrait rush, especially around Texas A&M Ring Day and finals, so we recommend booking a few weeks ahead of those seasons. Fall sessions are a good option for cooler weather and fall color.',
      },
      {
        question: 'Can we include a cap and gown or a sport or hobby?',
        answer: 'Yes. Cap-and-gown images, sports, instruments, and hobby-themed sets are all common. Tell us what matters most and we plan outfit changes around it.',
      },
      {
        question: 'Can you photograph seniors on a college campus?',
        answer: 'Yes. We plan campus sessions at Texas A&M and Sam Houston State, including the Century Tree and the Administration Building. Universities do not publish a general photography policy, so we confirm before booking, and we avoid home football weekends.',
      },
      TWO_PHOTOGRAPHERS_FAQ,
      DELIVERY_FAQ,
    ],
    reviewNames: ['Ainslee C.', 'Kimberly I.'],
    related: [
      { label: 'Graduation party and ceremony coverage', href: '/graduation' },
      { label: 'Unique senior portrait spots in Cypress and Tomball', href: '/blog/unique-senior-portrait-spots-in-cypress-tomball-studio37' },
      { label: 'Portrait session prep guide', href: '/session-prep/portrait' },
    ],
  },
  'maternity-sessions': {
    slug: 'maternity-sessions',
    eyebrow: 'Portrait photography · Maternity',
    h1: 'Maternity Photography in Pinehurst, TX',
    pitch: 'Maternity sessions by the lake, in the pines, or in our indoor studio, with gentle direction for you, your partner, and your kids.',
    heroImage: { id: 'IMG_1503_Original_mtopcp', alt: 'Expecting father kissing his partner’s belly in a pine forest' },
    secondaryImage: { id: 'Untitled-13_convert.io_y6zaft', alt: 'Black and white close-up of expecting parents holding a strip of ultrasound photos' },
    packagesHeading: 'Maternity sessions',
    packages: [
      { name: 'Expectant Glow Package', price: '$350', image: 'Untitled-50_2_convert.io_bht8ge' },
      { name: 'Mother & Child Package', price: '$500', image: 'Untitled_1_zwsrnm' },
      { name: 'Deluxe Maternity Experience', price: '$750', image: 'Untitled-8_2_b18mim' },
    ],
    sessionsHeading: 'Recent maternity sessions',
    sessions: [{ description: 'A maternity session at Old Mill Lake', date: 'August 2026', cityLabel: 'Pinehurst', cityHref: CITY.pinehurst }],
    spotsHeading: 'Maternity spots',
    spots: [
      { name: 'Hidden Lake', cityLabel: 'Pinehurst', cityHref: CITY.pinehurst, why: 'Soft lake light and reflections close to our studio.', verified: true },
      { name: 'The Studio37 studio', cityLabel: 'Pinehurst', cityHref: CITY.pinehurst, why: 'An indoor option for summer heat, storms, or a more intimate session.', verified: true },
      { name: 'Lake Windcrest', cityLabel: 'Magnolia', cityHref: CITY.magnolia, why: 'Wooded shores and a clean sunset over the water.', verified: true },
      { name: 'The Woodlands pine trails', cityLabel: 'The Woodlands', cityHref: CITY.woodlands, why: 'Soft, dappled light under the pines.', verified: true },
      { name: 'W.G. Jones State Forest', cityLabel: 'Conroe', cityHref: CITY.conroe, why: 'Golden hour through tall loblolly pines, with shade on hot afternoons.' },
      { name: 'Kickerillo-Mischer Preserve', cityLabel: 'Cypress', cityHref: CITY.cypress, why: 'A lake that turns gold at sunset.' },
    ],
    intro:
      'A maternity session should feel calm and comfortable. We pick a spot with shade, an easy walk, and a plan B, keep the pace gentle, and leave room for your partner and kids so the photos show the whole family waiting on the newest member.',
    planning: [
      'Locations chosen for shade, short walks, and somewhere to sit between sets.',
      'Golden-hour timing outdoors, or the indoor studio when heat or storms rule out an outdoor session.',
      'Partner and sibling sets included in the Mother & Child and Deluxe packages.',
      'Gown and outfit guidance in your prep guide before the session.',
    ],
    faqs: [
      {
        question: 'Can my partner and kids be in the maternity photos?',
        answer: 'Yes. The Mother & Child package is built around family sets, and the Deluxe experience adds more time and variety for partner and sibling photos.',
      },
      {
        question: 'What if it is too hot or rainy for an outdoor session?',
        answer: 'October through April is the most comfortable outdoor window. In summer we shoot at golden hour or move the session into our indoor studio in Pinehurst.',
      },
      {
        question: 'Where do you photograph maternity sessions?',
        answer: 'Popular spots include Hidden Lake near our Pinehurst studio, Lake Windcrest in Magnolia, The Woodlands pine trails, and W.G. Jones State Forest in Conroe, plus our indoor studio.',
      },
      TWO_PHOTOGRAPHERS_FAQ,
      DELIVERY_FAQ,
    ],
    reviewNames: ['Mansher G.', 'Kimberly I.'],
    related: [
      { label: 'Family photography', href: '/family-photography' },
      { label: 'Portrait session prep guide', href: '/session-prep/portrait' },
    ],
  },
  'family-photography': {
    slug: 'family-photography',
    eyebrow: 'Portrait photography · Families',
    h1: 'Family Photography in Pinehurst, TX',
    pitch: 'Family sessions paced for real kids, planned around shade and parking, at the parks we know best across Montgomery County and Greater Houston.',
    heroImage: { id: 'Hotard_Family_Day_1_-_252-2_fjeggf', alt: 'Family of six posing on a wooded trail under a green canopy' },
    packagesHeading: 'Family sessions',
    packages: [
      { name: 'Petite Package', price: '$350', note: 'Quick and beautiful family session with edited highlights delivered fast.', image: 'Hotard_Family_Day_2_-_152_1_mcyhw2' },
      { name: 'Milestone Package', price: '$500', note: 'Perfect for yearly updates, birthdays, and key family milestones.', image: 'Hotard_Family_Day_2_-_49_1_eernop' },
      { name: 'Legacy Package', price: '$750', note: 'Extended family coverage with multiple combinations and premium retouching.', image: 'Untitled_tpoc5r' },
    ],
    sessionsHeading: 'Recent family sessions',
    sessions: [
      { description: 'Family sessions in Houston', date: 'April and June 2026', cityLabel: 'Houston', cityHref: CITY.houston },
      { description: 'A family session in Katy', date: 'June 2026', cityLabel: 'Katy', cityHref: CITY.katy },
      { description: 'A family session in Spring', date: 'July 2026', cityLabel: 'Spring', cityHref: CITY.spring },
      { description: 'A family session in Humble', date: 'April 2026', cityLabel: 'Humble', cityHref: CITY.humble },
      { description: 'A family mini session at Mercer Botanic Gardens', date: 'January 2026', cityLabel: 'Humble', cityHref: CITY.humble },
      { description: 'A generational family session', date: 'December 2025' },
    ],
    spotsHeading: 'Family session spots',
    spots: [
      { name: 'Juergens Park', cityLabel: 'Tomball', cityHref: CITY.tomball, why: 'Easy parking near the city center, and where we photograph a lot of family sessions.', verified: true },
      { name: 'Unity Park', cityLabel: 'Magnolia', cityHref: CITY.magnolia, why: 'Open fields and mature trees that turn gold at golden hour.', verified: true },
      { name: 'Burroughs Park', cityLabel: 'Tomball', cityHref: CITY.tomball, why: 'Towering pines and a lake that turns gold at sunset.', verified: true },
      { name: 'Mercer Botanic Gardens', cityLabel: 'Humble', cityHref: CITY.humble, why: 'Garden paths and a free photographer sign-in; where we photographed a family mini.', verified: true },
      { name: 'The Woodlands pine trails', cityLabel: 'The Woodlands', cityHref: CITY.woodlands, why: 'Soft, dappled light that flatters kids.', verified: true },
      { name: 'Candy Cane Park', cityLabel: 'Conroe', cityHref: CITY.conroe, why: 'A playground, open fields, and a summer splash pad for little kids.' },
    ],
    intro:
      'Family photos go best when the plan fits real kids. We choose spots with shade, short walks, and easy parking, keep the pace moving before little ones melt down, and use two photographers so one can direct while the other catches the in-between moments parents end up loving most.',
    planning: [
      'Kid-friendly pacing with short sets and breaks built in.',
      'Locations picked for shade, parking, walking distance, and a backup spot.',
      'Extended-family combinations planned ahead with the Legacy package.',
      'What-to-wear guidance in your prep guide, plus our indoor studio for rain or heat.',
    ],
    faqs: [
      {
        question: 'How do you photograph toddlers and young kids?',
        answer: 'We keep sets short, let kids move, and use two photographers so one can play and direct while the other photographs. Locations with shade and space to run make a big difference.',
      },
      {
        question: 'Can we include grandparents and extended family?',
        answer: 'Yes. The Legacy package covers extended families with multiple combinations, and we plan the group list ahead so the session flows quickly.',
      },
      {
        question: 'What is the best time of year for family photos?',
        answer: 'October through April is the most comfortable outdoor window in our area, and bluebonnet season in spring books early. In summer we shoot at golden hour or use our indoor studio.',
      },
      TWO_PHOTOGRAPHERS_FAQ,
      DELIVERY_FAQ,
    ],
    reviewNames: ['Kelsi R.', 'Mansher G.'],
    related: [
      { label: 'Maternity sessions', href: '/maternity-sessions' },
      { label: 'Mini sessions', href: '/mini-sessions' },
      { label: 'Photographing toddlers and pets', href: '/blog/photographing-toddlers-pets-fun-family-photography-tips' },
      { label: 'Portrait session prep guide', href: '/session-prep/portrait' },
    ],
  },
  'professional-headshots': {
    slug: 'professional-headshots',
    eyebrow: 'Portrait photography · Teams & executives',
    h1: 'Team and Executive Headshots in Pinehurst, TX',
    pitch: 'Consistent, polished headshots for teams and executives, in our studio or on-site at your office, with lighting and framing matched across every staff portrait.',
    heroImage: { id: 'IMG_3787_kaecyl', alt: 'Professional headshot of a smiling woman with long hair' },
    secondaryImage: { id: 'Untitled-26_1_m2xd8r', alt: 'Black and white executive portrait of a man in a cowboy hat and western scarf' },
    packagesHeading: 'Headshot packages',
    packages: [
      { name: 'Individual Headshot Package', price: '$350' },
      { name: 'Executive Headshot Package', price: '$500' },
      { name: 'Team Headshot Package', price: '$850' },
    ],
    sessionsHeading: 'Recent business sessions',
    sessions: [
      { description: 'Professional headshots in Pinehurst', cityLabel: 'Pinehurst', cityHref: CITY.pinehurst },
      { description: 'Brand and team content for a local volleyball school', date: 'May 2026', cityLabel: 'Katy', cityHref: CITY.katy },
      { description: 'Website imagery for a private business' },
    ],
    spotsHeading: 'Where we photograph headshots',
    spots: [
      { name: 'The Studio37 studio', cityLabel: 'Pinehurst', cityHref: CITY.pinehurst, why: 'Controlled lighting for a consistent look across every employee.', verified: true },
      { name: 'Your office, on-site', cityLabel: 'Houston area', cityHref: CITY.houston, why: 'We bring the setup to your team and keep framing and lighting consistent.' },
      { name: 'The Waterway district', cityLabel: 'The Woodlands', cityHref: CITY.woodlands, why: 'Clean modern lines for environmental executive portraits.', verified: true },
      { name: 'Downtown Conroe', cityLabel: 'Conroe', cityHref: CITY.conroe, why: 'Brick and courthouse architecture for brand-forward headshots.' },
    ],
    intro:
      'Team headshots only work when they match. We set lighting, background, and framing once, then keep them consistent for every person, whether we photograph your team in our Pinehurst studio or set up on-site at your office.',
    planning: [
      'One consistent lighting and background setup across the whole team.',
      'Scheduling in short slots so staff are away from work for minutes, not hours.',
      'Expression coaching for natural, confident headshots.',
      'Files prepared for LinkedIn, your website, email signatures, and press kits.',
    ],
    faqs: [
      {
        question: 'Can you photograph our team on-site at our office?',
        answer: 'Yes. We can photograph teams on-site and keep framing and lighting consistent across all staff portraits.',
      },
      {
        question: 'Can new hires match our existing team headshots later?',
        answer: 'Yes. We note the lighting, background, and framing from your session so later headshots can match the set.',
      },
      {
        question: 'Can headshots be combined with brand or product photography?',
        answer: 'Yes. We can build one shoot that covers team headshots, lifestyle branding, products, and location content.',
      },
      {
        question: 'How quickly can headshots be delivered?',
        answer: 'Standard delivery is fast, and rush options are available when timelines are tight.',
      },
    ],
    reviewNames: ['Ivana M.', 'Joshua G.'],
    related: [
      { label: 'Individual headshots in Houston', href: '/headshot-photographer-houston-tx' },
      { label: 'Commercial and brand photography', href: '/services/commercial-photography' },
      { label: 'Corporate headshots 101', href: '/blog/corporate-headshots-101-purpose-pricing-delivery-by-studio37' },
    ],
  },
  'headshot-photographer-houston-tx': {
    slug: 'headshot-photographer-houston-tx',
    eyebrow: 'Portrait photography · Individual headshots',
    h1: 'Headshot Photographer in Houston, TX',
    pitch: 'Individual headshots for professionals, founders, and creatives updating LinkedIn, a website, or a media kit, in the studio or on Houston streets with real character.',
    heroImage: { id: 'JoshuaMapson-029_rgc1xu', alt: 'Smiling headshot of a man with locs in a black jacket' },
    packagesHeading: 'Headshot sessions',
    packages: [
      { name: 'Individual Headshot Package', price: '$350' },
      { name: 'Executive Headshot Package', price: '$500' },
    ],
    sessionsHeading: 'Recent sessions',
    sessions: [
      { description: 'A portrait session', date: 'December 2025', cityLabel: 'Houston', cityHref: CITY.houston },
      { description: 'Website imagery for a private business' },
      { description: 'Professional headshots in Pinehurst', cityLabel: 'Pinehurst', cityHref: CITY.pinehurst },
    ],
    spotsHeading: 'Houston headshot backdrops',
    spots: [
      { name: 'The Heights', cityLabel: 'Houston', cityHref: CITY.houston, why: 'Vintage storefronts and brick walls along 19th Street; sidewalk shots need no permit.' },
      { name: 'Gerald D. Hines Waterwall Park', cityLabel: 'Houston', cityHref: CITY.houston, why: 'The 64-foot waterwall in Uptown, best early before crowds.' },
      { name: 'Downtown and Market Square', cityLabel: 'Houston', cityHref: CITY.houston, why: 'Urban texture and blue-hour light downtown.' },
      { name: 'The Studio37 studio', cityLabel: 'Pinehurst', cityHref: CITY.pinehurst, why: 'Clean studio lighting for a classic corporate look.', verified: true },
    ],
    intro:
      'A good headshot looks like you on your best day. We coach expression and posture so the result feels natural, then match the backdrop to how you will use it: clean studio light for corporate profiles, or Houston brick and skyline for a founder or creative brand.',
    planning: [
      'Backdrop matched to the use: studio for corporate profiles, street or skyline for personal brands.',
      'Expression and posture coaching throughout the session.',
      'Outfit guidance so colors and necklines work in a tight crop.',
      'City park permits handled when an outdoor Houston location needs one.',
    ],
    faqs: [
      {
        question: 'Can my headshots be taken outdoors in Houston?',
        answer: 'Yes. The Heights, Uptown’s Waterwall Park, and downtown all work well. Street and sidewalk shots in the Heights need no permit; City of Houston parks require a $154.42 professional permit per park per date, which we arrange.',
      },
      {
        question: 'Are these headshots good for LinkedIn and websites?',
        answer: 'Yes. Final files are prepared for professional web use, LinkedIn, and marketing channels.',
      },
      {
        question: 'Do you also photograph whole teams?',
        answer: 'Yes. Team and executive headshots, including on-site office sessions, are covered on our professional headshots page.',
      },
      {
        question: 'How quickly can headshots be delivered?',
        answer: 'Standard delivery is fast, and rush options are available when timelines are tight.',
      },
    ],
    reviewNames: ['Ivana M.', 'Ainslee C.'],
    related: [
      { label: 'Team and executive headshots', href: '/professional-headshots' },
      { label: 'Photographer in Houston, TX', href: CITY.houston },
      { label: 'Houston headshots and LinkedIn', href: '/blog/houston-glow-up-studio37-headshots---analog-necessity-for-linkedin' },
    ],
  },
}

export function getServiceGuideReviews(guide: ServiceGuide) {
  return guide.reviewNames
    .map((name) => getServiceReview(name))
    .filter((review): review is (typeof studio37Reviews)[number] => Boolean(review))
}
