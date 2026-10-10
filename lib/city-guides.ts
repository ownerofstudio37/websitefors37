import { studio37Reviews } from '@/lib/public-content'

// City-specific content for the local photographer pages, sourced from Studio37's own blog posts,
// session records, and on-the-ground research (Studio37 city page master file, October 2026).
// Rules: `verified` spots are places Studio37 has photographed or written about; everything else is
// researched and must be described as a place we plan sessions around, never as a past shoot.
// Past sessions never name clients. Reviews reuse the already-published studio37Reviews entries.

export type CitySpot = {
  name: string
  address?: string
  bestFor: string
  notes: string
  timing?: string
  access?: string
  permit?: string
  verified?: boolean
}

export type CityVenue = {
  name: string
  address?: string
  description: string
  verified?: boolean
}

export type CitySession = {
  description: string
  date?: string
  href?: string
}

export type CityGuide = {
  slug: string
  city: string
  county: string
  driveTime: string
  travelNote: string
  intro: string
  sessions: CitySession[]
  spots: CitySpot[]
  venues: CityVenue[]
  seasons: string[]
  permits: string[]
  bookMost?: string
  reviewNames: string[]
  guides?: Array<{ label: string; href: string }>
}

const TRAVEL_FEE_RULE = 'Travel fees only apply to venues more than 50 miles from our Pinehurst studio.'

const cityGuides: CityGuide[] = [
  {
    slug: 'local-photographer-pinehurst-tx',
    city: 'Pinehurst',
    county: 'Montgomery County',
    driveTime: 'Home base: our studio is at 1701 Goodson Loop in Pinehurst.',
    travelNote: 'No travel fee for Pinehurst sessions.',
    intro:
      'Pinehurst is home for Studio37. Sessions here have no drive time and no travel fee, and our indoor studio is minutes away if the weather turns. Within a short drive we can work lake light, deep pine forest, and creek-side greenway trails, so one session can look very different from the next.',
    sessions: [
      {
        description: 'A lakeside outdoor session at Hidden Lake, written up on our blog',
        href: '/blog/finding-the-pixels-in-pinehurst-our-hidden-lake-shoot-a-15-off-outdoor-session-deal',
      },
      { description: 'A maternity session at Old Mill Lake', date: 'August 2026' },
      { description: 'Professional headshots in Pinehurst' },
    ],
    spots: [
      {
        name: 'Hidden Lake',
        bestFor: 'Couples, families, and portraits that want water in the frame',
        notes: 'Close to our studio: soft lake light, reflections, and natural textures for relaxed outdoor sessions.',
        verified: true,
      },
      {
        name: 'The Studio37 studio',
        address: '1701 Goodson Loop, Pinehurst',
        bestFor: 'Headshots, branding, and rain-day backups',
        notes: 'An indoor setup we can move any session into when Texas weather does not cooperate.',
        verified: true,
      },
      {
        name: 'W.G. Jones State Forest',
        address: '1328 FM 1488, Conroe (about 13 miles)',
        bestFor: 'Families, couples, and seniors who want a forest look',
        notes: '1,722 acres of loblolly pines with about 15 miles of trails and two lakes. Free to visit.',
        permit: 'No published photo permit; we confirm with the Texas A&M Forest Service before booking.',
      },
      {
        name: 'Spring Creek Greenway',
        bestFor: 'Shaded portraits and walking engagement sessions',
        notes: 'Part of the longest connected urban greenway in the country, with deep tree cover and creek banks. Free.',
      },
      {
        name: 'Spring Creek Park',
        address: 'Harris County, about 6.5 miles away',
        bestFor: 'Families and creek-side portraits',
        notes: 'A 114-acre county park with trails, the creek, and pavilions for shade breaks.',
        timing: 'Open 7 AM to 10 PM; free.',
      },
    ],
    venues: [
      {
        name: 'Lone Star Mansion',
        description: 'A historic venue in the Pinehurst area with wrap-around porches and old oaks, featured in our wedding venue guide.',
        verified: true,
      },
    ],
    seasons: [
      'October through April is the most flexible window for outdoor sessions.',
      'Our indoor studio is the backup when heat or storms rule out an outdoor session.',
    ],
    permits: [
      'We have not run into permit requirements at our Pinehurst spots, and we still confirm with each venue before a session.',
      'W.G. Jones State Forest does not publish a photo permit; we check with the Texas A&M Forest Service ahead of time.',
    ],
    bookMost: 'Portraits, family sessions, engagements, small events, and local weddings.',
    reviewNames: ['Kelsi R.', 'Ivana M.'],
    guides: [
      { label: 'Our Hidden Lake shoot in Pinehurst', href: '/blog/finding-the-pixels-in-pinehurst-our-hidden-lake-shoot-a-15-off-outdoor-session-deal' },
      { label: 'Why two wedding photographers matter in Pinehurst', href: '/blog/the-unseen-value-why-two-wedding-photographers-are-essential-for-your-pinehurst-tx-day' },
    ],
  },
  {
    slug: 'local-photographer-tomball-tx',
    city: 'Tomball',
    county: 'Harris County',
    driveTime: 'About 20 minutes from our Pinehurst studio.',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Tomball gives us two looks in one short drive: Old Town brick, storefronts, and railroad tracks, and tall-pine parks with water that turns gold at sunset. We have photographed and written about these Tomball spots, so we can match the location to the session before you book.',
    sessions: [
      { description: 'A graduation session at Kleb Woods Nature Preserve', date: 'May 2026' },
      { description: 'A proposal at Rose Hill in the Tomball area', date: 'July 2026' },
    ],
    spots: [
      {
        name: 'Old Town Tomball',
        bestFor: 'Seniors and couples',
        notes: 'Brick storefronts and railroad tracks. The most versatile spot in town for an editorial look.',
        verified: true,
      },
      {
        name: 'Tomball Depot Plaza',
        bestFor: 'Seniors, couples, and classic small-town portraits',
        notes: 'The old train station platform and tracks. It is iconic and popular, so we time sessions around the crowds.',
        verified: true,
      },
      {
        name: 'Burroughs Park',
        bestFor: 'Families, engagements, and golden-hour portraits',
        notes: 'A Harris County park with towering pines, trails, and a lake that turns gold at sunset.',
        verified: true,
      },
      {
        name: 'Juergens Park',
        bestFor: 'Family sessions',
        notes: 'Near the city center with easy parking. We photograph a lot of family sessions here.',
        verified: true,
      },
      {
        name: 'Kleb Woods Nature Preserve',
        address: '20303 Draper Rd, Tomball',
        bestFor: 'Graduates, families, and couples who want a farmhouse-and-woods look',
        notes: '133.5 acres with a historic farmhouse and barn, ponds, and boardwalks. Bring bug spray in warm months.',
        timing: 'Weekday mornings are the quietest.',
        permit: 'Professional photography may need permission; we confirm with Harris County Precinct 4 for each shoot.',
        verified: true,
      },
      {
        name: 'Spring Creek Park',
        address: '15012 Brown Rd',
        bestFor: 'Creek-side portraits and engagements',
        notes: 'A 114-acre Harris County park along the creek. Free, open 7 AM to 10 PM, and busy on weekends.',
      },
    ],
    venues: [
      {
        name: 'Hawthorne House',
        description: 'A boutique venue in the Spring and Tomball area with gardens and Victorian architecture, featured in our wedding venue guide.',
        verified: true,
      },
    ],
    seasons: [
      'The pines photograph well year-round.',
      'Bluebonnets bloom from mid-March to mid-April.',
      'Fall color shows up in November and December.',
      'Summer brings heat and mosquitoes, so we shoot early or late and pack bug spray.',
    ],
    permits: [
      'Kleb Woods: we confirm professional photography with Harris County Precinct 4 before each session.',
      'Old Town and the city parks: we confirm any rules before booking.',
    ],
    reviewNames: ['Joshua G.', 'Mansher G.'],
    guides: [
      { label: 'Top 5 Tomball photoshoot locations', href: '/blog/top-5-locations-for-a-tomball-tx-photoshoot-studio37' },
      { label: 'Best Tomball portrait session locations', href: '/blog/best-tomball-texas-portrait-session-locations-studio37-guide' },
      { label: 'Styling Tomball family portraits for the pine woods', href: '/blog/tomball-family-portraits-styling-for-texas-pine-woods-with-studio37' },
    ],
  },
  {
    slug: 'local-photographer-conroe-tx',
    city: 'Conroe',
    county: 'Montgomery County',
    driveTime: 'About 10 to 15 minutes from our Pinehurst studio.',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Conroe sits a short drive north of our studio and packs a lot of range into one city: a 1,700-acre pine forest, Lake Conroe sunsets, a historic downtown with brick and murals, and one of the densest clusters of wedding venues in Montgomery County. These are the Conroe spots we plan sessions around and what each one is best for.',
    sessions: [],
    spots: [
      {
        name: 'W.G. Jones State Forest',
        address: '1328 FM 1488, Conroe',
        bestFor: 'Families, couples, engagements, seniors, and maternity',
        notes: 'Over 1,700 acres of loblolly pines with two lakes and 15 miles of trails. Golden hour through the pines is the signature shot, and the canopy keeps shade even on hot afternoons.',
        access: 'Two free lots with a self-serve kiosk; no restrooms, so plan ahead.',
        permit: 'Professional sessions need a permit from the Texas A&M Forest Service; we arrange it before booking.',
      },
      {
        name: 'Lake Conroe waterfront',
        address: 'Public shoreline near the Waterpoint area',
        bestFor: 'Engagements, couples, seniors, and maternity',
        notes: 'Sunset over open water with boats in the frame. Good shoreline goes fast at golden hour, so we scout the access point before you arrive.',
        access: 'Parking varies by access point and some lots fill on summer weekends.',
      },
      {
        name: 'Candy Cane Park',
        address: '1204 Candy Cane Ln, Conroe',
        bestFor: 'Families with little kids',
        notes: 'Playground, open fields, and a summer splash pad. Open grass reads flat at midday, so we work the shaded edges.',
        timing: 'Morning or golden hour; the big free lot crowds on weekends.',
      },
      {
        name: 'Downtown Conroe',
        address: 'Main Street and Heritage Place by the courthouse',
        bestFor: 'Seniors, branding, and couples who want urban texture',
        notes: 'Brick buildings, murals, alleyways, and courthouse architecture. December string lights make warm evening backgrounds.',
        timing: 'Morning or late afternoon, before buildings shade the street into flat light.',
      },
      {
        name: 'Carl Barton Jr. Park',
        address: '2500 S Loop 336 E, Conroe',
        bestFor: 'Families, sports families, and mini sessions',
        notes: "Conroe's largest city park, over 200 acres. The loop around the fishing pond photographs better than you would expect from a sports park.",
        timing: 'Morning or golden hour; avoid game nights and weekends when the fields are full.',
      },
    ],
    venues: [
      { name: 'The Pavilion at Lago Bella', address: '13830 Willis Waukegan Rd', description: 'A rustic lakeside estate with a private lake and an island gazebo.' },
      { name: 'Madera Estates', address: '3201 N Frazier St', description: 'A Spanish-inspired luxury venue with gardens and grand architecture.' },
      { name: 'The Vale', address: '200 E Phillips St', description: 'A historic downtown chapel and reception hall with courtyards for portrait breaks.' },
      { name: 'The Gardens at Madeley Manor', address: '915 N Frazier St', description: 'A restored 1930s manor with an English conservatory and gardens.' },
      { name: 'The Carriage House Houston', address: '3845 Sapp Rd, Conroe', description: 'A garden venue known for its red door, pond, and rope swing.' },
    ],
    seasons: [
      'Bluebonnets and wildflowers line nearby roadsides from mid-March to mid-April.',
      'Lake humidity and mosquitoes run May through October near the water.',
      'The Jones Forest canopy keeps summer sessions shaded.',
      'Fall color from sweetgum and oaks shows up in November and December.',
    ],
    permits: [
      'W.G. Jones State Forest: professional permits come from the Texas A&M Forest Service, and we arrange them before your session.',
      'Conroe city parks and downtown: no published photography policy, so we confirm before booking.',
    ],
    reviewNames: ['Felipa Q.', 'Alice J.'],
  },
]

export function getCityGuide(slug: string) {
  return cityGuides.find((guide) => guide.slug === slug)
}

export function getCityGuideReviews(guide: CityGuide) {
  return guide.reviewNames
    .map((name) => studio37Reviews.find((review) => review.name === name))
    .filter((review): review is (typeof studio37Reviews)[number] => Boolean(review))
}
