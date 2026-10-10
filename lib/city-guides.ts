import { studio37Reviews } from '@/lib/public-content'

// City-specific content for the local photographer pages, sourced from Studio37's own blog posts,
// session records, and on-the-ground research (Studio37 city page master file, October 2026).
// Rules: `verified` spots are places Studio37 has photographed; everything else is researched and
// must be described as a place we plan sessions around, never as a past shoot.
// Past sessions never name clients. Reviews reuse the already-published studio37Reviews entries.
// Drive times are only published where verified (the research estimates were unreliable).

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

export type CityImage = {
  id: string
  alt: string
}

export type CityGuide = {
  slug: string
  city: string
  county: string
  driveTime?: string
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
  heroImage?: CityImage
  secondaryImage?: CityImage
}

// Christian's stated travel policy (October 2026). There is no published mileage-based travel fee.
export const DESTINATION_TRAVEL_POLICY =
  'Beyond the Houston area, we travel to Galveston for any package, the Austin area for sessions of $750 or more, and Dallas for projects of $2,000 or more.'
const TRAVEL_FEE_RULE = 'We travel throughout Montgomery County and Greater Houston from our Pinehurst studio.'

const MERCER_PERMIT =
  'Mercer allows professional photography free of charge: sign in at the Visitor Center, finish 30 minutes before closing, and no drones.'
const LAKE_HOUSTON_WILDERNESS_PERMIT =
  'Lake Houston Wilderness Park charges $3 per day for visitors ages 13 to 65, and the City of Houston publishes a $154.42 professional photo fee per park per date.'
const USFS_SMALL_SESSION_RULE =
  'In Sam Houston National Forest, small paid portrait sessions (five or fewer people, hand-carried gear, no exclusive use of a site) do not need a permit; larger crews or setups need a Special Use Permit.'
const HUNTSVILLE_STATE_PARK_RULE =
  'Huntsville State Park requires a commercial photography permit from Texas Parks & Wildlife, filed at least 90 days ahead, so we only book it with the permit in hand.'

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
    slug: 'local-photographer-magnolia-tx',
    city: 'Magnolia',
    county: 'Montgomery County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Magnolia is next door to our studio and the town we have written about most: open fields that turn gold at golden hour, a 1902 rail depot, lakes with wooded shores, and pine woods on the way to Sam Houston National Forest. It is where we pair downtown brick with deep pines in a single session.',
    sessions: [
      { description: 'A wedding at Magnolia Meadows', date: 'April 2026' },
      { description: 'A backyard wedding in Magnolia', date: 'June 2026' },
      { description: 'Graduation portraits in Magnolia', date: 'March 2026' },
    ],
    spots: [
      {
        name: 'Unity Park',
        bestFor: 'Families, seniors, and engagements',
        notes: 'Thirty acres of open fields and mature trees. At golden hour the fields turn gold behind your family.',
        verified: true,
      },
      {
        name: 'The Magnolia Stroll',
        bestFor: 'Couples',
        notes: 'A linear trail that mixes brick and greenery, so a walking session gets variety without changing locations.',
        verified: true,
      },
      {
        name: 'Historic Magnolia Depot',
        bestFor: 'Seniors',
        notes: 'The 1902 depot and rail line give senior portraits small-town character. We always keep clients off active tracks.',
        verified: true,
      },
      {
        name: 'Lake Windcrest',
        bestFor: 'Engagements and maternity',
        notes: 'A lake with wooded shores and a clean sunset over the water.',
        verified: true,
      },
      {
        name: 'High Meadow Ranch',
        bestFor: 'Upscale portraits and couples',
        notes: 'Manicured golf club grounds with water features. We coordinate access with the club before the session.',
        verified: true,
      },
      {
        name: 'Downtown Magnolia',
        bestFor: 'Seniors, couples, and branding',
        notes: 'Brick walls and storefronts that pair well with nearby pine woods in one session.',
        verified: true,
      },
      {
        name: 'Sam Houston National Forest',
        bestFor: 'Cinematic couples and portraits',
        notes: 'A short drive from Magnolia for dense woods and moody, cinematic forest light.',
        verified: true,
      },
      {
        name: 'Barns, ranches, and garden centers',
        bestFor: 'Families and couples who want a rustic or greenhouse look',
        notes: 'Private barns, open fields, and ranch estates by arrangement, plus nurseries with soft diffused greenhouse light. Some of our best Magnolia sessions happen on private land.',
        verified: true,
      },
    ],
    venues: [
      { name: 'Magnolia Meadows', description: 'A Magnolia wedding venue where we photographed a wedding in April 2026.', verified: true },
      { name: 'The Luminaire', description: 'A Montgomery County lakeside estate covered in our venue guides.', verified: true },
      { name: 'Big Sky Barn', description: 'A rustic barn venue in the Montgomery County piney woods, featured in our wedding venue guide.', verified: true },
    ],
    seasons: [
      'Bluebonnet season in spring is the busiest time for Magnolia family and portrait sessions, so book early.',
      'Golden hour turns the open fields gold year-round.',
    ],
    permits: [
      'We have not found permit requirements at our Magnolia spots; we still confirm with each park or venue before booking.',
      'Private ranches, barns, and golf club grounds are only used with the owner’s permission.',
    ],
    bookMost: 'Family portraits, engagements, seniors, and venue weddings.',
    reviewNames: ['Kimberly I.', 'Ainslee C.'],
    guides: [
      { label: 'Magnolia’s top 10 photography hotspots', href: '/blog/magnolia-tx-studio37s-top-10-photography-hotspots' },
      { label: 'Bluebonnets and pine trees: Magnolia family photos', href: '/blog/bluebonnets-pine-trees-magnolia-tx-family-photos' },
      { label: 'Top 5 reasons for a Magnolia photoshoot', href: '/blog/top-5-locations-reasons-for-a-magnolia-tx-photoshoot-studio37' },
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
    slug: 'local-photographer-the-woodlands-tx',
    city: 'The Woodlands',
    county: 'Montgomery County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'The Woodlands has two personalities, and we plan sessions around both: pine trails with soft, dappled light for families and maternity, and the Waterway district’s clean modern lines for headshots, seniors, and couples. At golden hour the pines glow and the Waterway reflects the sky, and we tell you the exact start time for your date.',
    sessions: [{ description: 'A 100th birthday celebration in The Woodlands', date: 'February 2026' }],
    spots: [
      {
        name: 'The Woodlands pine trails',
        bestFor: 'Families and maternity',
        notes: 'Soft, dappled light under the pines that stays flattering for kids and expecting parents.',
        verified: true,
      },
      {
        name: 'The Waterway district',
        bestFor: 'Headshots, seniors, and couples',
        notes: 'Clean modern lines, bridges, fountains, and a waterfall along Riva Row. Best at blue hour and into the evening when it is lit.',
        verified: true,
      },
      {
        name: 'Northshore Park',
        address: '2505 Lake Woodlands Dr',
        bestFor: 'Sunset couples and families',
        notes: 'A lakefront park that faces west, which makes it The Woodlands’ sunset spot.',
        timing: 'Free, 5:30 AM to 11 PM; we check the Township event calendar first.',
      },
      {
        name: 'Town Green Park',
        address: '2099 Lake Robbins Dr',
        bestFor: 'Polished portraits and engagements',
        notes: 'A manicured lawn with sculptures and gardens on the Waterway.',
      },
      {
        name: 'Rob Fleming Park',
        bestFor: 'Families',
        notes: 'Trails and open space in the Creekside village with an easygoing family pace.',
      },
      {
        name: 'George Mitchell Preserve',
        bestFor: 'Moody engagements',
        notes: 'About 1,800 acres of deep pine forest for a darker, more cinematic look.',
        timing: 'Mornings are best, with fewer people on the trails.',
      },
    ],
    venues: [
      {
        name: 'The Woodlands Resort & Conference Center',
        description: 'Golf course views and ballrooms; the outdoor terrace at golden hour is made for backlit portraits.',
        verified: true,
      },
      {
        name: 'The Woodlands Country Club',
        description: 'A grand staircase, chandeliers, and a golf course ceremony space.',
        verified: true,
      },
    ],
    seasons: [
      'The pines and the Waterway both work year-round.',
      'Summer heat and humidity push sessions to early morning or golden hour.',
      'Fall color shows up in November and December.',
    ],
    permits: [
      'The Woodlands Township requires a film permit for commercial filming, filed five business days ahead with an insurance certificate.',
      'Still-photography rules for Township parks are not published, so we confirm with Township Parks & Recreation before booking a park session.',
    ],
    reviewNames: ['Cassey E.', 'Kelsi R.'],
    guides: [
      { label: 'The Woodlands portrait guide', href: '/blog/the-woodlands-portrait-guide-expert-tips-by-studio-37' },
      { label: 'From The Woodlands to Tomball: cinematic backdrops', href: '/blog/from-the-woodlands-to-tomball-unearthing-cinematic-backdrops' },
      { label: 'Proposal planning in The Woodlands and Magnolia', href: '/blog/proposal-planning-the-woodlands-magnolia' },
    ],
  },
  {
    slug: 'local-photographer-conroe-tx',
    city: 'Conroe',
    county: 'Montgomery County',
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
  {
    slug: 'local-photographer-spring-tx',
    city: 'Spring',
    county: 'Harris County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Spring sessions usually start with one question: garden, creek, or old town? Mercer Botanic Gardens has the most photographer-friendly policy in the area, Spring Creek Greenway gives shaded trails and creek banks, and Old Town Spring adds historic buildings and a rail depot for seniors and couples.',
    sessions: [
      { description: 'A graduation session in Spring', date: 'April 2026' },
      { description: 'A family session in Spring', date: 'July 2026' },
    ],
    spots: [
      {
        name: 'Mercer Botanic Gardens',
        address: '22306 Aldine Westfield Rd, Humble/Spring',
        bestFor: 'Engagements, couples, families, maternity, and seniors',
        notes: 'Themed gardens, ponds, and courtyards. We have photographed proposals, family sessions, and minis here.',
        timing: 'Right at opening on weekdays, or late afternoon. Free parking fills fast on spring weekends.',
        permit: MERCER_PERMIT,
        verified: true,
      },
      {
        name: 'Pundt Park',
        address: '4129 Spring Creek Dr',
        bestFor: 'Families, maternity, and seniors',
        notes: 'Trails along Spring Creek Greenway with a large free central lot.',
        timing: 'Morning or golden hour.',
      },
      {
        name: 'Old Town Spring',
        address: 'Main St',
        bestFor: 'Couples, branding, and seniors',
        notes: 'Historic buildings and the old rail depot give sessions a rustic, small-town feel.',
        timing: 'Morning or late afternoon; festival weekends get busy.',
      },
      {
        name: 'Rob Fleming Park',
        address: '6055 Creekside Forest Dr',
        bestFor: 'Families, engagements, and seniors',
        notes: 'A pond and open lawns in the Creekside area with on-site parking.',
        timing: 'Golden hour.',
      },
      {
        name: 'George Mitchell Nature Preserve',
        address: '5171 Flintridge Dr, The Woodlands',
        bestFor: 'Nature-loving couples, maternity, and families who hike',
        notes: 'Trail sessions under tall pines just north of Spring.',
        timing: 'Late afternoon on the trails.',
      },
      {
        name: 'Wunderlich Farm',
        bestFor: 'Rustic family and couple portraits',
        notes: 'A historic living-history farm on the outskirts of Spring with a restored barn, farmhouse, and antique equipment. Private site, so we arrange access first.',
      },
      {
        name: 'Meyer Park',
        address: '7700 Cypresswood Dr',
        bestFor: 'Families and sports families',
        notes: 'Fields, a pond, and a gazebo with on-site parking.',
        timing: 'Morning or golden hour.',
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
      'Mercer is strongest from March to May for blooms and again in October and November.',
      'Oak pollen dusts everything in early spring.',
      'Bluebonnet patches show up along Spring Creek Greenway in April.',
      'Summer means heat and mosquitoes near the creek, so we shoot early or late.',
    ],
    permits: [MERCER_PERMIT, 'Other Spring parks do not publish a photography policy, so we confirm before booking.'],
    reviewNames: ['Mansher G.', 'Kimberly I.'],
    guides: [
      { label: 'Spring’s best outdoor portrait locations', href: '/blog/discover-spring-txs-best-outdoor-portrait-locations-with-studio37' },
      { label: 'Mercer Botanic Gardens photography', href: '/blog/mercer-botanical-gardens-photography-why-hire-studio37' },
    ],
  },
  {
    slug: 'local-photographer-montgomery-tx',
    city: 'Montgomery',
    county: 'Montgomery County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Montgomery has the densest cluster of barn and lakeside wedding venues in the area, plus small-town history you can walk through: 1800s log cabins, a historic downtown, and Lake Conroe sunsets at the marina. These are the Montgomery spots and venues we plan around.',
    sessions: [],
    spots: [
      {
        name: 'Memory Park',
        address: 'Behind the Charles B. Stewart Library',
        bestFor: 'Families, seniors, and couples',
        notes: 'A pond trail, koi pond, waterfall, butterfly garden, and wooden fences give real variety in a small footprint, so a full session never looks repetitive.',
        timing: 'Soft morning light is best on the water; comfortable year-round under the trees.',
      },
      {
        name: 'Fernland Historical Park',
        address: '770 Clepper Dr',
        bestFor: 'Engagements, couples, seniors, and history-loving families',
        notes: 'Restored 1800s log cabins and historic homes, including the 1867 Crane Cabin and the Arnold-Simonton House, the oldest home in Montgomery. It sits next to Memory Park, so we often pair them.',
        timing: 'Weekday mornings for empty frames; closed Mondays.',
        permit: 'The City of Montgomery requires a photography permit here, which we arrange before the session.',
      },
      {
        name: 'Cedar Brake Park',
        address: 'TX-105',
        bestFor: 'Families and casual couples or seniors',
        notes: 'Century-old cedars give an old-Texas feel, and the dense shade makes it a real summer option.',
        timing: 'Golden hour under the canopy; we plan around mosquitoes at dusk.',
      },
      {
        name: 'Historic Downtown Montgomery',
        address: 'McCown St and the FM 149 corridor',
        bestFor: 'Seniors, branding, and couples',
        notes: 'Brick storefronts and antique signage with the birthplace-of-Texas small-town feel.',
        timing: 'Morning or late afternoon.',
      },
      {
        name: 'Waterpoint Marina',
        address: '15264 TX-105',
        bestFor: 'Engagements, couples, seniors, and maternity',
        notes: 'A boardwalk, boats, and Lake Conroe sunsets with masts in the frame. Private property, so we get permission from management first.',
        timing: 'Sunset; October and November sunsets are the prettiest.',
      },
    ],
    venues: [
      { name: 'The Luminaire', address: '495 S Pine Lake Rd', description: 'A 20-acre lakeside estate with an indoor chapel, covered in our venue guides.', verified: true },
      { name: 'Big Sky Barn', address: '13576 Forest Ln', description: 'A rustic-chic barn in the piney woods with a light-filled chapel and covered bridge.', verified: true },
      { name: 'Pine Lake Ranch', address: '1951 S Pine Lake Rd', description: 'A ranch with a centuries-old oak ceremony site, a lake, and a renovated reception barn.' },
      { name: 'Olde Dobbin Station', address: '2849 Old Dobbin Rd', description: 'A historic early-1900s pumping station with chapel and outdoor ceremony sites.' },
      { name: 'Miller’s Creek Rustic Events', description: 'A rustic farm-style venue for smaller weddings.' },
    ],
    seasons: [
      'Bluebonnets line FM 149 and TX-105 from late March through April.',
      'Fall is peak wedding season at the barn venues, and October and November dates book out.',
      'The Lake Conroe side is humid with mosquitoes from May to October.',
    ],
    permits: [
      'Fernland Historical Park requires a City of Montgomery photography permit, arranged before the shoot.',
      'Waterpoint Marina is private, so we get permission first.',
      'Other city parks and downtown have no published policy; we confirm before booking.',
    ],
    reviewNames: ['Ainslee C.', 'Joshua G.'],
    guides: [
      { label: 'Montgomery County wedding venues guide', href: '/blog/wedding-venues-montgomery-county-tx-photographer-guide' },
      { label: 'Why The Luminaire is so cinematic', href: '/blog/why-the-luminaire-is-montgomery-countys-most-cinematic-venue' },
      { label: 'Best outdoor portrait locations in Montgomery County', href: '/blog/best-outdoor-portrait-locations-in-montgomery-county-tx-studio37' },
    ],
  },
  {
    slug: 'local-photographer-cypress-tx',
    city: 'Cypress',
    county: 'Harris County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Cypress is master-planned suburbs wrapped in county preserves: farmhouse-and-barn woods at Kleb Woods, a 40-acre lake that turns gold at sunset, and a historic railroad-town park with a bright-yellow depot. These are the Cypress spots we plan sessions around.',
    sessions: [],
    spots: [
      {
        name: 'Kleb Woods Nature Preserve',
        address: '20303 Draper Rd, Tomball (on the Cypress line)',
        bestFor: 'Families, couples, engagements, maternity, and seniors',
        notes: 'An 1896 farmhouse and barn, boardwalks, and dappled oak light. No dogs, even on a leash.',
        timing: 'Weekday mornings are quietest; we plan around the September Hummingbird Festival.',
        verified: true,
      },
      {
        name: 'Kickerillo-Mischer Preserve',
        address: '20215 Chasewood Park Dr',
        bestFor: 'Engagements, couples, families, and maternity',
        notes: '80 acres around 40-acre Marshall Lake, with fishing piers and wooded paths. The lake goes gold at sunset.',
        timing: 'Early morning or sunset; fall weekends get busy with homecoming photos.',
      },
      {
        name: 'Cypress Top Historic Park',
        address: '26026 Hempstead Rd',
        bestFor: 'Seniors, branding, and couples',
        notes: 'Original 19th- and early-20th-century buildings from the 1850s railroad town, including the bright-yellow Cypress Train Depot.',
        timing: 'Morning or late afternoon; quietest midweek.',
      },
      {
        name: 'Little Cypress Creek Preserve',
        address: 'Telge Rd and Spring Cypress Rd',
        bestFor: 'Families, couples, and seniors',
        notes: 'A shaded 1.7-mile loop with free parking.',
        timing: 'Morning.',
      },
      {
        name: 'Cypress Park',
        address: '12925 N Eldridge Pkwy',
        bestFor: 'Families',
        notes: 'A lakeside trail with a bridge gives a water look without leaving the suburbs.',
      },
      {
        name: 'Matzke Park',
        address: '13110 Jones Rd',
        bestFor: 'Families with kids and quick minis',
        notes: 'A butterfly garden that is an official monarch waystation, plus a paved loop and clean restrooms. The loop has little shade, so timing matters.',
        timing: 'Morning or golden hour.',
      },
      {
        name: 'Telge Park and Bud Hadfield Park',
        address: 'Pleasant Grove Rd and Telge Rd',
        bestFor: 'Families with kids, active couples, and seniors',
        notes: 'A playground and pavilion at Telge; wooded trails at Bud Hadfield, which has no restrooms, so we bring bug spray.',
      },
    ],
    venues: [
      { name: 'The Reserve on Cypress Creek', description: 'A 12-acre garden venue with ponds, a stone ceremony platform, and a wooden arbor.' },
      { name: 'Lindsay Lakes', description: 'A 21-acre all-inclusive wedding venue.' },
      { name: 'Rosehill Oaks', description: 'An estate wedding venue.' },
      { name: 'Bridal Oaks', description: 'An estate venue with grand architecture.' },
    ],
    seasons: [
      'Bluebonnets show up along the Highway 290 and Grand Parkway corridors in April.',
      'Preserve trails stay shaded and workable on summer mornings.',
      'Mosquitoes are heavy in the wooded preserves from May to October.',
      'Fall color shows up in the hardwoods in November and December.',
    ],
    permits: [
      'Harris County Precinct 3 and 4 parks do not publish a professional photo policy, so we confirm before booking.',
      'Private HOA parks in master-planned communities are only used when the client has resident access.',
    ],
    reviewNames: ['Ivana M.', 'Cassey E.'],
    guides: [{ label: 'Unique senior portrait spots in Cypress and Tomball', href: '/blog/unique-senior-portrait-spots-in-cypress-tomball-studio37' }],
  },
  {
    slug: 'local-photographer-houston-tx',
    city: 'Houston',
    county: 'Harris County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Houston sessions are about choosing the right backdrop: the skyline from Buffalo Bayou at blue hour, forest trails at the Arboretum, gardens and the reflection pool at Hermann Park, or vintage storefronts in the Heights. Many Houston parks require a paid permit, and we handle that before your session.',
    sessions: [
      { description: 'A surprise proposal at Moody Gardens in Galveston, followed by family photos at Brenner’s on the Bayou' },
      { description: 'Quinceañera portraits and event coverage', date: 'January 2026' },
      { description: 'A first birthday party', date: 'May 2026' },
      { description: 'A generational family session', date: 'December 2025' },
      { description: 'A portrait session', date: 'December 2025' },
      { description: 'Family sessions in Houston', date: 'April and June 2026' },
    ],
    spots: [
      {
        name: 'Brenner’s on the Bayou',
        bestFor: 'Family portraits',
        notes: 'Where we photographed a family session after a client’s surprise proposal.',
        verified: true,
      },
      {
        name: 'Buffalo Bayou Park and Eleanor Tinsley Park',
        address: '1800 Allen Pkwy',
        bestFor: 'Couples, engagements, seniors, and families',
        notes: 'The signature Houston skyline backdrop plus the Sabine Street Bridge.',
        timing: 'Dusk and blue hour, when the skyline lights up.',
      },
      {
        name: 'Houston Arboretum & Nature Center',
        address: '4501 Woodway Dr',
        bestFor: 'Families, couples, engagements, seniors, and maternity',
        notes: '155 acres and 5 miles of shaded forest trails inside Memorial Park.',
        timing: 'Mornings for dappled shade.',
        permit: 'Professional photo permit required: $125 per session or $150 per year. No drones, balloons, or confetti.',
      },
      {
        name: 'Hermann Park',
        address: '6001 Fannin St',
        bestFor: 'Engagements, bridals, and families',
        notes: 'The reflection pool, McGovern Centennial Gardens, and the colonnade.',
        timing: 'Weekday mornings; weekends are packed with other shoots.',
        permit: 'City of Houston permit required ($154.42 per park per date). Professional photography is not allowed in the Japanese Garden.',
      },
      {
        name: 'Memorial Park and the Eastern Glades',
        address: '6501 Memorial Dr area',
        bestFor: 'Families, couples, seniors, and maternity',
        notes: 'Hines Lake boardwalks and a wetland look on the west side.',
        timing: 'Early morning or before sunset.',
        permit: 'The Memorial Park Conservancy requires a permit for professional shoots.',
      },
      {
        name: 'Sam Houston Park',
        address: '1000 Bagby St',
        bestFor: 'Portraits, engagements, and bridals',
        notes: 'Restored 1800s buildings, a pond, and lawns: old-Houston charm downtown.',
        timing: 'Weekday mornings.',
      },
      {
        name: 'Gerald D. Hines Waterwall Park',
        address: '2800 Post Oak Blvd',
        bestFor: 'Engagements, couples, seniors, and maternity',
        notes: 'The 64-foot waterwall is an instant icon in Uptown.',
        timing: 'Early morning, before the crowds.',
      },
      {
        name: 'The Heights',
        address: '19th St and Donovan Park',
        bestFor: 'Couples, engagements, seniors, and branding',
        notes: 'Vintage storefronts and brick walls in the closest in-town district to Pinehurst.',
        timing: 'Golden hour.',
      },
    ],
    venues: [
      { name: 'The Bell Tower on 34th', address: '901 W 34th St', description: 'An Italian-inspired all-inclusive venue with a chandelier ballroom and a 30-foot waterwall courtyard.' },
      { name: 'The Heights Villa', address: '3600 Michaux St', description: 'A ballroom, chapel, and outdoor courtyard for 200-plus guests.' },
      { name: 'Chateau Nouvelle', address: '14525 Champions Dr', description: 'A French-inspired estate with a garden and a ballroom for up to 300.' },
      { name: 'Hidden Pines | Lake Houston', address: '20114 Pinehurst Dr, Atascocita', description: 'A lakefront outdoor ceremony site and indoor chapel for up to 250.' },
    ],
    seasons: [
      'June through September is brutally hot, so we shoot at sunrise or last light.',
      'Mosquitoes are heavy near the bayous and wooded trails.',
      'Fall color is modest and peaks in November and December.',
      'Bluebonnets do not grow in the city; roadside fields west of town are used only with landowner permission.',
    ],
    permits: [
      'City of Houston parks charge $154.42 per park per date for professional photography, filed before the shoot.',
      'The Houston Arboretum sells its own permit ($125 per session or $150 per year), and the Memorial Park Conservancy issues its own.',
      'We build the right permit into your plan before the session.',
    ],
    reviewNames: ['Lisa D.', 'Felipa Q.'],
    guides: [
      { label: 'Houston Arboretum photography guide', href: '/blog/houston-arboretum-photography-studio37s-guide-to-nature-shots' },
      { label: 'Corporate event photography in The Woodlands and Houston', href: '/blog/corporate-event-photography-the-woodlands-houston' },
    ],
  },
  {
    slug: 'local-photographer-katy-tx',
    city: 'Katy',
    county: 'Harris / Fort Bend County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Katy sessions mix lakes, boardwalk sunsets, and Old Katy’s railroad-town charm, with one of the strongest wedding venue lineups west of Houston. These are the Katy spots and venues we plan around.',
    sessions: [
      { description: 'A birthday session', date: 'March 2026' },
      { description: 'A commercial session for a local volleyball school', date: 'May 2026' },
      { description: 'A family session in Katy', date: 'June 2026' },
    ],
    spots: [
      {
        name: 'Mary Jo Peckham Park',
        address: '5597 Gardenia Ln',
        bestFor: 'Families, maternity, and seniors',
        notes: 'A lake, koi pond, walking trails, and a pavilion with plenty of parking.',
        timing: 'Golden hour, or quieter mornings.',
        permit: 'The county recommends a permit for professional photography, which we arrange first.',
      },
      {
        name: 'Rick Rice Park',
        address: '700 Westgreen Blvd',
        bestFor: 'Families, couples, and seniors',
        notes: 'A gazebo over a fountain pond, native plantings, and Francesca’s Garden.',
        timing: 'Morning or golden hour.',
      },
      {
        name: 'Willow Fork Park',
        address: 'Cinco Ranch',
        bestFor: 'Families, engagements, and couples',
        notes: 'A community lake with a pedestrian bridge, known for its sunsets.',
        timing: 'Late afternoon into sunset.',
      },
      {
        name: 'Katy Boardwalk',
        address: '25551 Kingsland Blvd',
        bestFor: 'Engagements, couples, and families',
        notes: 'A waterfront boardwalk with sunsets over the water, herons, and turtles. We keep kids and pets back from the water, where geese can be aggressive.',
        timing: 'Sunset.',
      },
      {
        name: 'Historic Downtown Katy',
        address: 'Avenue B and 3rd St, Old Katy',
        bestFor: 'Couples, seniors, and families',
        notes: 'Railroad heritage buildings with a small-town Texas feel.',
        timing: 'Golden hour.',
      },
      {
        name: 'First Christian Church pumpkin patch',
        address: '22101 Morton Ranch Rd',
        bestFor: 'Fall family sessions',
        notes: 'A seasonal pumpkin patch every October with multiple photo stations.',
        timing: 'October afternoons; we check with the church first.',
      },
    ],
    venues: [
      { name: 'Beckendorff Farms', address: '28533 Morton Rd', description: 'A 160-year-old timber-framed barn on a lake, seating up to 300.' },
      { name: 'Palm Royal Villa', address: '3330 FM 1463', description: 'An 8-acre estate with a banquet hall for up to 300 and an outdoor courtyard.' },
      { name: 'Cottage Charm @ The Romack House', address: '5806 4th St, Old Katy', description: 'A 1905 historic cottage shaded by 100-year-old trees.' },
      { name: 'KTX Legacy Venue', address: '1306 Avenue A, Old Katy', description: 'An outdoor event venue in the heart of Katy.' },
      { name: 'The Springs Katy', address: '4999 Buller Rd, Brookshire', description: 'An Italian-inspired villa and a rustic reserve for up to 320 guests.' },
    ],
    seasons: [
      'Summer heat pushes sessions to early morning or last light.',
      'Fall brings mild weather and the October pumpkin patch.',
      'Winters stay mild and green enough for year-round sessions.',
      'Spring storms can flood the lake parks, so we check conditions after heavy rain.',
    ],
    permits: [
      'Mary Jo Peckham Park: the county recommends a professional photo permit.',
      'Rick Rice and Willow Fork parks have no published policy, so we confirm first.',
      'Street photography in historic downtown generally needs no permit.',
    ],
    reviewNames: ['Alice J.', 'Mansher G.'],
  },
  {
    slug: 'local-photographer-willis-tx',
    city: 'Willis',
    county: 'Montgomery County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Willis sits at the edge of Sam Houston National Forest and the quiet north end of Lake Conroe, so sessions here lean into deep piney woods, morning fog, and big lake sunsets, with rustic barn and lakeside wedding venues close by.',
    sessions: [],
    spots: [
      {
        name: 'Sam Houston National Forest',
        bestFor: 'Adventurous couples, engagements, maternity, and seniors',
        notes: 'About 163,000 acres of piney woods with forest trails, spring wildflowers, and morning fog threading through the pines.',
        timing: 'Early-morning fog or golden hour.',
        permit: USFS_SMALL_SESSION_RULE,
      },
      {
        name: 'Double Lake Recreation Area',
        address: '301 FM 2025',
        bestFor: 'Families, couples, engagements, and maternity',
        notes: 'A 23-acre lake with a forested shoreline and boardwalk, so you get a forest session and a water session without moving the car.',
        access: '$7 per vehicle day-use fee, which is separate from any photo permit.',
      },
      {
        name: 'Lone Star Hiking Trail trailheads',
        bestFor: 'Adventurous couples and seniors who want something different',
        notes: 'Tall pines and a total Texas piney-woods look.',
        timing: 'Mornings, when the trail is emptiest and the light slants through the trees.',
      },
      {
        name: 'Lake Conroe, Willis side',
        bestFor: 'Couples, engagements, and families',
        notes: 'Piers, docks, and big sunsets. The north-lake access points feel less built-up than the Conroe and Montgomery side.',
        timing: 'Sunset; fall evenings are the clearest.',
      },
      {
        name: 'Lindley Park, MLK Park, and Pine Circle Park',
        bestFor: 'Casual family minis',
        notes: 'Simple in-town city parks with open grass and shade trees for quick, low-key sessions.',
      },
    ],
    venues: [
      { name: 'Rustic Rose Events', address: '13629 Rose Rd', description: 'A converted barn with a stone fireplace, a private lake, and forest, for up to 225 guests.' },
      { name: 'The Homestead', address: '16781 Old Danville Rd', description: 'A 22-acre venue with a large great room and veranda for up to 250.' },
      { name: 'Forever 5 Events', address: '11780 Calfee Rd, Conroe', description: 'A modern lakefront venue with 24-foot arches, just south of Willis.' },
    ],
    seasons: [
      'The forest is best in spring for wildflowers and fog, and again in fall.',
      'Summer brings heavy mosquitoes and humidity in the woods, so we shoot early and bring repellent.',
      'During fall hunting season we stay in recreation areas and on designated trails.',
    ],
    permits: [USFS_SMALL_SESSION_RULE, 'Willis city parks do not publish photo rules, and lake access points vary, so we confirm first.'],
    reviewNames: ['Kelsi R.', 'Joshua G.'],
  },
  {
    slug: 'kingwood',
    city: 'Kingwood',
    county: 'Harris County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Kingwood calls itself the Livable Forest, and it earns it: lakefront nature preserves, boardwalks over the San Jacinto River, and more than 75 miles of greenbelt trails under the trees. Mercer Botanic Gardens, where we have photographed proposals and family sessions, is about 15 minutes south.',
    sessions: [],
    spots: [
      {
        name: 'East End Park',
        address: '6500 Kingwood Dr',
        bestFor: 'Families, couples, engagements, seniors, and maternity',
        notes: 'A 158-acre preserve with 2 miles of Lake Houston frontage, boardwalks, and magnolia groves. One of Kingwood’s best sunrise spots.',
        access: 'We confirm the community parking rules before sending clients here.',
      },
      {
        name: 'River Grove Park',
        address: 'San Jacinto Dr',
        bestFor: 'Families and couples',
        notes: 'A boardwalk over the San Jacinto River, a pavilion, and a playground.',
        timing: 'Morning or golden hour.',
      },
      {
        name: 'Creekwood Nature Area',
        address: '3406 Maple Park Dr',
        bestFor: 'Quiet woodland portraits',
        notes: 'A short, shaded trail through pines and oaks. The trailhead lot is small and the creek brings mosquitoes in warm months.',
      },
      {
        name: 'Kingwood Greenbelt trails',
        bestFor: 'Couples, seniors, and active families',
        notes: 'More than 75 miles of paved trails under the tree canopy, open during daylight hours.',
        timing: 'Golden hour.',
      },
      {
        name: 'Mercer Botanic Gardens',
        address: '22306 Aldine Westfield Rd, Humble',
        bestFor: 'Engagements, families, seniors, and maternity',
        notes: 'Themed gardens, bamboo groves, and a fairytale staircase about 15 minutes south, where we have photographed proposals and minis.',
        permit: MERCER_PERMIT,
        verified: true,
      },
      {
        name: 'Lake Houston Wilderness Park',
        address: '25840 FM 1485, New Caney',
        bestFor: 'Families, engagements, and maternity',
        notes: 'Pine forest, Peach Creek, and rustic A-frame cabins just northeast of Kingwood.',
        permit: LAKE_HOUSTON_WILDERNESS_PERMIT,
      },
      {
        name: 'Kingwood Town Center',
        bestFor: 'Couples, engagements, and seniors',
        notes: 'Walkable storefronts with a small-town main-street feel.',
        timing: 'Golden hour.',
      },
    ],
    venues: [
      { name: 'Hidden Pines | Lake Houston', address: '20114 Pinehurst Dr, Atascocita', description: 'A waterfront ceremony site, indoor chapel, and patio cocktail hour for up to 250.' },
      { name: 'The Barn at Four Pines Ranch', address: '21101 FM 2100, Crosby', description: 'A 54-acre ranch with a forest ceremony site by a 9-acre lake.' },
    ],
    seasons: [
      'Mercer is strongest in spring, so we go early.',
      'Bluebonnets show up along the greenbelt edges in April.',
      'East End Park’s riverfront trails can flood after heavy rain.',
      'Summer brings mosquitoes along the water and at Creekwood.',
    ],
    permits: [
      'Kingwood Service Association parks do not publish professional photo fees, so we confirm before booking.',
      MERCER_PERMIT,
      LAKE_HOUSTON_WILDERNESS_PERMIT,
    ],
    reviewNames: ['Kimberly I.', 'Cassey E.'],
    guides: [{ label: 'Mercer Botanic Gardens photography', href: '/blog/mercer-botanical-gardens-photography-why-hire-studio37' }],
  },
  {
    slug: 'humble',
    city: 'Humble',
    county: 'Harris County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Humble is where we have done some of our favorite garden work. Mercer Botanic Gardens is free for professional photographers with a simple sign-in, and we have photographed proposals, minis, and family sessions there, plus senior portraits in downtown Humble.',
    sessions: [
      { description: 'A proposal at Mercer Botanic Gardens', date: 'February 2026' },
      { description: 'A mini session at Mercer Botanic Gardens', date: 'January 2026' },
      { description: 'A senior session in downtown Humble', date: 'May 2026' },
      { description: 'A family session in Humble', date: 'April 2026' },
    ],
    spots: [
      {
        name: 'Mercer Botanic Gardens',
        address: '22306 Aldine Westfield Rd, Humble',
        bestFor: 'Engagements, couples, families, seniors, and maternity',
        notes: 'Tropical gardens and the fairytale staircase. Hours run 8 AM to 5 PM in winter and later in summer.',
        timing: 'Golden hour, or weekday mornings for privacy.',
        permit: MERCER_PERMIT,
        verified: true,
      },
      {
        name: 'Downtown Humble',
        bestFor: 'Seniors and branding',
        notes: 'A walkable downtown strip where we photographed a senior session.',
        verified: true,
      },
      {
        name: 'Jesse H. Jones Park & Nature Center',
        address: '20634 Kenswick Dr',
        bestFor: 'Families, engagements, and seniors',
        notes: 'A 312-acre county park along Spring Creek.',
        timing: 'Golden hour along the creek, or mornings for mist.',
      },
      {
        name: 'Hirsch Memorial Park',
        address: '100 N Houston Ave',
        bestFor: 'Quick family sessions with kids',
        notes: 'A small city park with an on-site lot.',
        timing: 'Late afternoon.',
      },
    ],
    venues: [
      { name: 'Hidden Pines Lake Houston', description: 'A lakefront ceremony site and reception hall on the Atascocita side of Lake Houston.' },
      { name: 'Golf Club of Houston', address: '5860 Wilson Rd', description: 'Upscale fairway weddings.' },
      { name: 'The Barn at Four Pines Ranch', address: 'Crosby', description: 'A lakefront dock, pine-forest clearing, and barn ceremony sites on 54 acres.' },
    ],
    seasons: [
      'Mercer peaks with March blooms.',
      'From May to September we book golden hour to avoid the heat.',
      'Fall color shows up from late October into November.',
    ],
    permits: [MERCER_PERMIT, 'Jesse Jones Park and Hirsch Memorial Park have no published policy, so we confirm first.'],
    reviewNames: ['Ainslee C.', 'Felipa Q.'],
    guides: [{ label: 'Mercer Botanic Gardens photography', href: '/blog/mercer-botanical-gardens-photography-why-hire-studio37' }],
  },
  {
    slug: 'atascocita',
    city: 'Atascocita',
    county: 'Harris County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Atascocita is lake country: Lake Houston shoreline at golden hour, a pond-and-boardwalk park for everyday family sessions, and Mercer Botanic Gardens, where we have photographed proposals and minis, a short drive away.',
    sessions: [],
    spots: [
      {
        name: 'Atascocita Park',
        address: '17302 W Lake Houston Pkwy',
        bestFor: 'Families, kids, and seniors',
        notes: 'A 21-acre park with a pond, boardwalk, and shaded walking loops that stay workable even midday. The pond has a posted alligator warning, so we keep small kids back from the edge.',
        timing: 'Golden hour over the pond.',
      },
      {
        name: 'Lake Houston shoreline',
        bestFor: 'Couples, engagements, and maternity',
        notes: 'The water goes gold at sunset. Public access points vary, so we confirm the specific spot first.',
        timing: 'Golden hour.',
      },
      {
        name: 'Lindsay/Lyons Park and Sports Complex',
        address: '2310 Atascocita Rd',
        bestFor: 'Families with kids and youth sports families',
        notes: 'An inclusive playground, paved trail, and pavilions. It is a sports-complex park rather than a styled garden.',
        timing: 'Golden hour or weekday mornings; game days are loud and crowded.',
      },
      {
        name: 'Mercer Botanic Gardens',
        address: '22306 Aldine Westfield Rd, Humble',
        bestFor: 'Garden couples, engagements, maternity, and seniors',
        notes: 'A short drive away, and a garden we have photographed proposals, minis, and family sessions in.',
        permit: MERCER_PERMIT,
        verified: true,
      },
    ],
    venues: [
      { name: 'Hidden Pines Lake Houston', description: 'A Hill Country-style lakefront wedding venue on Lake Houston for up to 250 guests.' },
    ],
    seasons: [
      'Pond lilies bloom in summer.',
      'From May to September we only shoot golden hour and pack mosquito spray near the pond.',
      'Bluebonnets show up along roadside FM edges in April.',
    ],
    permits: [
      'Harris County Precinct 3 requires written permission for commercial activity in county parks, which we get before booking.',
      MERCER_PERMIT,
    ],
    reviewNames: ['Ivana M.', 'Alice J.'],
  },
  {
    slug: 'local-photographer-hockley-tx',
    city: 'Hockley',
    county: 'Harris County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Hockley has a quiet rural feel and a few genuinely unusual backdrops: the Hockley side of Kleb Woods, a soap box derby hill, miniature-train weekends at Zube Park, and an 1836 historic site where the Texas Army paused on the way to San Jacinto.',
    sessions: [],
    spots: [
      {
        name: 'Kleb Woods Nature Preserve (Hockley entrance)',
        address: '20605 FM 2920',
        bestFor: 'Couples, engagements, maternity, and seniors',
        notes: 'The picnic side of the preserve, trail-connected to the farmhouse. The northern loop passes a bird blind over a wet meadow, and the southern trails pass a bald cypress marsh. No dogs.',
        timing: 'Morning light through the canopy; weekday mornings are quietest.',
        verified: true,
      },
      {
        name: 'Zube Park',
        address: '17560 Roberts Rd',
        bestFor: 'Families with kids',
        notes: 'A 225-acre park with trails, a playground, and a splash pad. On select weekends the Houston Area Live Steamers run free miniature-train rides, a great kid backdrop that also draws crowds.',
        timing: 'Golden hour on the open fields.',
      },
      {
        name: 'Hockley Recreational Complex',
        address: '28515 Old Washington Rd',
        bestFor: 'Quick family sessions, seniors, and kids',
        notes: 'Home of the Greater Houston Soap Box Derby and its 46-foot derby hill, plus a paved trail around a fishing pond.',
        timing: 'Midweek, when races are not running.',
      },
      {
        name: 'New Kentucky Park',
        address: '21710 FM 2920',
        bestFor: 'Seniors and branding with a history hook',
        notes: 'Texas historical markers for the New Kentucky settlement and the Abraham Roberts homesite, where the Texas Army paused in April 1836. Small and quiet: a 20-minute mini or an add-on stop.',
      },
    ],
    venues: [
      { name: '15 Acres', address: '25566 Bradbury Rd', description: 'A full-service venue with an outdoor pond ceremony and a covered terrace.' },
      { name: 'House Estate', address: '15743 House Rd', description: 'A historic Victorian mansion on 18 acres with outdoor ceremony options.' },
      { name: 'Hacienda Las Flores', address: '17411 Roberts Rd', description: 'A banquet hall for weddings and large family events.' },
    ],
    seasons: [
      'Prairie and woodland spots are best from October to April.',
      'Bluebonnets line the FM 2920 corridor in March and April.',
      'Train weekends and the September Kleb Woods Hummingbird Festival are the only real crowd days.',
    ],
    permits: [
      'Kleb Woods: we confirm professional photography with Harris County Precinct 4 for each shoot.',
      'Zube Park, the Recreational Complex, and New Kentucky Park have no published policy, so we confirm first.',
    ],
    reviewNames: ['Joshua G.', 'Kelsi R.'],
  },
  {
    slug: 'waller',
    city: 'Waller',
    county: 'Waller County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Waller has a look you will not find anywhere else we work: open tallgrass prairie and wetlands at the Katy Prairie Preserve, with big skies, spring wildflowers, and fall bird migration. Prairie sessions take careful scheduling, and we plan around the preserve’s limited hours.',
    sessions: [],
    spots: [
      {
        name: 'Indiangrass Preserve',
        address: '31975 Hebert Rd',
        bestFor: 'Engagements, couples, seniors, and branding',
        notes: 'Headquarters of the Katy Prairie Preserve, with tallgrass prairie, wetlands, trails, and a bird blind. Stay on designated trails: it is an active restoration site.',
        timing: 'Public hours are limited (Tuesdays, Fridays, and Saturdays in the morning, plus a monthly first-Sunday evening), so golden hour is usually only possible on that first Sunday.',
      },
      {
        name: 'Matt Cook Memorial Wildlife Viewing Platform',
        bestFor: 'Seniors, nature-loving couples, and family add-ons',
        notes: 'A two-story platform overlooking Warren Lake with big-sky prairie and water.',
        timing: 'Open daily 7 AM to sunset; golden hour.',
      },
      {
        name: 'Binford Circle Park',
        address: '21531 Binford Cir',
        bestFor: 'Quick local family sessions',
        notes: 'A small community park with picnic grounds.',
        timing: 'Late afternoon.',
      },
    ],
    venues: [
      { name: 'Windveil Manor', address: '28622 FM 2920', description: 'A southern-elegance venue on 4 acres with an outdoor ceremony site, secret garden, and ballroom for up to 120.' },
    ],
    seasons: [
      'Open prairie light is harsh at midday, so golden hour is essential.',
      'Spring brings prairie wildflowers; fall migration from September to November brings the bird flocks.',
      'Mosquitoes are out on the prairie from May to October.',
    ],
    permits: [
      'Indiangrass and the viewing platform are Coastal Prairie Conservancy land with no published portrait policy, so we confirm with the Conservancy first.',
      'Binford Circle Park has no published policy; we confirm before booking.',
    ],
    reviewNames: ['Ainslee C.', 'Mansher G.'],
  },
  {
    slug: 'local-photographer-new-caney-tx',
    city: 'New Caney',
    county: 'Montgomery County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'New Caney is home to Lake Houston Wilderness Park, the area’s signature outdoor backdrop: nearly 4,800 acres of pine forest, Peach Creek, rustic A-frame cabins, and river beaches. The dense canopy keeps sessions shaded even in summer.',
    sessions: [],
    spots: [
      {
        name: 'Lake Houston Wilderness Park',
        address: '25840 FM 1485',
        bestFor: 'Engagements, couples, families, seniors, and maternity',
        notes: 'Pine forest, Peach Creek, cabins, river beaches, and a nature center. We check for trail closures after big storms, and alligators are occasionally seen in the waterways.',
        timing: 'Mornings for mist on the creek, golden hour for forest light.',
        permit: LAKE_HOUSTON_WILDERNESS_PERMIT,
      },
      {
        name: 'A.V. "Bull" Sallas Park',
        address: '21675 McCleskey Rd',
        bestFor: 'Families and kids',
        notes: 'A 52-acre county park with a playground, pond and gazebo, and picnic areas.',
        timing: 'Late afternoon into golden hour.',
      },
    ],
    venues: [
      { name: 'The Atrium Center', address: '21575 US-59 N, Suite 200', description: 'An outdoor water-feature ceremony site with an indoor reception space.' },
    ],
    seasons: [
      'The pine canopy keeps the Wilderness Park shaded even in summer.',
      'Bluebonnets show up on the open edges in April.',
      'Mosquitoes are out in the woods and near water from May to October.',
    ],
    permits: [LAKE_HOUSTON_WILDERNESS_PERMIT, 'Sallas Park has no published policy, so we confirm with Montgomery County Precinct 4 first.'],
    reviewNames: ['Cassey E.', 'Ivana M.'],
  },
  {
    slug: 'porter',
    city: 'Porter',
    county: 'Montgomery County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Porter clients usually pick from the best backdrops just around them: Lake Houston Wilderness Park for the woods, Kingwood’s lakefront parks and greenbelt minutes away, and Mercer Botanic Gardens, where we have photographed proposals and family sessions, about 20 minutes south.',
    sessions: [],
    spots: [
      {
        name: 'Lake Houston Wilderness Park',
        address: '25840 FM 1485, New Caney',
        bestFor: 'Families, couples, and seniors who want the woods look',
        notes: 'Just over the Porter line: pine forest, creek, and waterfront in one park.',
        permit: LAKE_HOUSTON_WILDERNESS_PERMIT,
      },
      {
        name: 'Kingwood parks next door',
        bestFor: 'Families, couples, and engagements',
        notes: 'East End Park’s sunrise lakefront, River Grove Park’s boardwalk, and the Kingwood Greenbelt’s forest trails, all minutes from Porter.',
      },
      {
        name: 'Rustling Elms Park',
        address: '5011 Rustling Elms Dr',
        bestFor: 'Families with kids',
        notes: 'A playground, gazebo, and walking trails about 2.5 miles from Porter.',
        timing: 'Late afternoon.',
      },
      {
        name: 'Mercer Botanic Gardens',
        address: '22306 Aldine Westfield Rd, Humble',
        bestFor: 'Engagements, families, and seniors',
        notes: 'About 20 minutes south, and a garden where we have photographed proposals, minis, and family sessions.',
        permit: MERCER_PERMIT,
        verified: true,
      },
    ],
    venues: [
      { name: 'The Rose Garden Wedding Centre Boutique', address: '24141 US-59', description: 'A full-service venue with floral, catering, DJ, and limo services under one roof.' },
      { name: 'Embassy Events Kingwood', address: '24862 US-59 S', description: 'An elegant full-service venue popular for weddings and quinceañeras.' },
    ],
    seasons: [
      'Porter’s parks are friendly year-round, and the Wilderness Park’s pines help in summer.',
      'Spring and fall are quinceañera and wedding season along the US-59 venue corridor.',
      'Mosquitoes are out in the woods and near water from May to October.',
    ],
    permits: [
      LAKE_HOUSTON_WILDERNESS_PERMIT,
      'Amenity centers and lakes in private communities like The Highlands and Woodridge Forest are only used when the client has resident access.',
    ],
    reviewNames: ['Felipa Q.', 'Kimberly I.'],
  },
  {
    slug: 'splendora',
    city: 'Splendora',
    county: 'Montgomery County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Splendora is small-town and easygoing: two clean city parks for family sessions, a barn-and-fountain wedding venue, a string-light pavilion for evening events, and Lake Houston Wilderness Park about seven miles south when you want the pine-forest look.',
    sessions: [],
    spots: [
      {
        name: 'H.L. Patton Memorial Park',
        address: '25300 Roping Pen Rd',
        bestFor: 'Quick family sessions, kids, and short maternity minis',
        notes: 'Arboretum-style greenery, paths, and landscaped beds. It photographs honestly, but it is a quick-session spot rather than a full afternoon.',
        timing: 'Late afternoon to golden hour; open 7:30 AM to 8 PM.',
      },
      {
        name: 'Splendora Heritage Park',
        address: '14917 1st St',
        bestFor: 'Families and kids',
        notes: 'Walking trails, shade trees, and picnic areas.',
        timing: 'Late afternoon or golden hour; the playground crowd owns weekend mornings.',
      },
      {
        name: 'Lake Houston Wilderness Park',
        address: '25840 FM 1485, New Caney (about 7 miles south)',
        bestFor: 'Families, engagements, and seniors',
        notes: 'Pine forest plus Peach Creek and a lake. Older maps may still call it Lake Houston State Park.',
        permit: LAKE_HOUSTON_WILDERNESS_PERMIT,
      },
    ],
    venues: [
      { name: 'Fountain View Farm', address: '24500 Drivers Rd', description: 'An 8-acre barn and farm venue with a pond, three fountains, and an outdoor chapel.' },
      { name: 'Parque Estrada Outdoor Venue', address: '24900 Hill and Dale Ave', description: 'A covered pavilion with string lights for weddings, quinceañeras, and graduations.' },
    ],
    seasons: [
      'Bluebonnets line the FM roads in March and April.',
      'From May to September we only shoot golden hour.',
      'Fall color is modest, from late November into early December.',
    ],
    permits: ['Splendora’s city parks have no published photo policy, so we call before booking.', LAKE_HOUSTON_WILDERNESS_PERMIT],
    reviewNames: ['Alice J.', 'Kelsi R.'],
  },
  {
    slug: 'cleveland',
    city: 'Cleveland',
    county: 'Liberty County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Cleveland pairs simple, convenient city parks with the real prize just east of town: the Sam Houston National Forest corridor, with dense pines and that cinematic dark-green background, where small portrait sessions need no permit.',
    sessions: [],
    spots: [
      {
        name: 'Sam Houston National Forest corridor',
        bestFor: 'Engagements, bridal portraits, and editorial couples',
        notes: 'Dense pines and a towering canopy east of town. Parking is at informal trailhead pull-offs, so we arrive early and hand-carry gear.',
        timing: 'Morning light through the trees or late afternoon; the canopy keeps midday workable.',
        permit: USFS_SMALL_SESSION_RULE,
      },
      {
        name: 'Stancil Park',
        address: 'By the Stancil Expo Center & Arena',
        bestFor: 'Families, kids, and maternity',
        notes: 'The biggest green space in town, with trails, big trees, and open fields that go gold in the evening.',
        timing: 'Late afternoon to golden hour.',
      },
      {
        name: 'Baldwin Park',
        address: 'FM 2025',
        bestFor: 'Engagements and family sessions',
        notes: 'Walking trails and picnic areas: the closest thing Cleveland has to a wooded-walk spot.',
        timing: 'Morning or golden hour.',
      },
      {
        name: 'Old City Park and Campbell Park',
        address: '320 Hubert St and 120 Campbell St',
        bestFor: 'Families, kids, and maternity',
        notes: 'Cleveland’s in-town defaults for quick sessions, with free parking.',
        timing: 'Late afternoon into golden hour.',
      },
    ],
    venues: [],
    seasons: [
      'The piney woods work year-round, with modest fall color from late November.',
      'Bluebonnets line the FM roads in March and April.',
      'Hunting season in the National Forest runs roughly November through January, so we check dates before booking a winter woods session.',
    ],
    permits: [
      USFS_SMALL_SESSION_RULE,
      'City of Cleveland parks publish no photography policy, so we call before booking.',
      HUNTSVILLE_STATE_PARK_RULE,
    ],
    reviewNames: ['Mansher G.', 'Ainslee C.'],
  },
  {
    slug: 'local-photographer-new-waverly-tx',
    city: 'New Waverly',
    county: 'Walker County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'New Waverly is surrounded by Sam Houston National Forest, which is the most photographer-friendly land in our service area: small portrait sessions need no permit. Cagle Recreation Area gives you piney woods and Lake Conroe shoreline in one stop.',
    sessions: [],
    spots: [
      {
        name: 'Cagle Recreation Area',
        address: 'FM 1375 W, on Lake Conroe',
        bestFor: 'Families, couples, engagements, and elopement-style sessions',
        notes: 'Woods portraits first, then the lake at golden hour, all in one place.',
        timing: 'Mornings for mist on the water; golden hour at the lake is the shot.',
        access: 'Unpaved day-use lot with a small day-use fee; we confirm the current fee on arrival.',
      },
      {
        name: 'Big Creek Scenic Area',
        bestFor: 'Adventurous couples and editorial or bridal portraits',
        notes: 'Dense old-growth pine with the moodiest forest light in the area.',
        timing: 'Early morning or late afternoon; bug spray from May to October.',
      },
      {
        name: 'District Ranger Station',
        address: '394 FM 1375 W',
        bestFor: 'A fun add-on stop',
        notes: 'The Smokey Bear metal sculpture is a novelty photo to pair with a Cagle session.',
      },
    ],
    venues: [
      {
        name: 'Field of Flowers',
        address: '115 Marion Ln',
        description: 'A French-Victorian wedding venue on a working flower farm, with an oak ceremony space framed by flower fields. Pairs naturally with pine-forest portraits at Cagle or Big Creek.',
      },
    ],
    seasons: [
      'Wildflower season runs March and April.',
      'Fall color in the forest is modest but real in late November.',
      'Cagle’s lakeshore works at golden hour year-round.',
      'Hunting season runs roughly November through January.',
    ],
    permits: [
      USFS_SMALL_SESSION_RULE,
      'Groups of six to eight may need a free De Minimis authorization from the forest office.',
      HUNTSVILLE_STATE_PARK_RULE,
    ],
    reviewNames: ['Joshua G.', 'Ivana M.'],
  },
  {
    slug: 'local-photographer-huntsville-tx',
    city: 'Huntsville',
    county: 'Walker County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Huntsville offers Lake Raven and piney woods at the state park, the 1840s homes of the Sam Houston Memorial Museum, and the SHSU campus for senior portraits. The state park needs a permit 90 days ahead, so for short notice we plan around the museum grounds and downtown instead.',
    sessions: [],
    spots: [
      {
        name: 'Sam Houston Memorial Museum grounds',
        address: '1836 Sam Houston Ave',
        bestFor: 'Couples, engagements, family portraits, and seniors',
        notes: '15 acres with the 1847 Woodland Home, the 1858 Steamboat House, cabins, a duck pond, and big oaks. Real historic character with no 90-day permit gate.',
        timing: 'Late afternoon; the heavy shade keeps light soft. Closed Mondays.',
      },
      {
        name: 'Huntsville State Park',
        address: '565 Park Road 40 W',
        bestFor: 'Families, SHSU seniors, engagements, and couples',
        notes: '2,083 acres around Lake Raven with more than 21 miles of trails. Alligators live here, so we keep small kids back from the water.',
        timing: 'Golden hour at the lake.',
        permit: HUNTSVILLE_STATE_PARK_RULE,
      },
      {
        name: 'SHSU campus',
        address: 'Sam Houston Ave corridor',
        bestFor: 'Senior and graduation portraits and alumni engagements',
        notes: 'Historic architecture and tree-lined walks.',
      },
      {
        name: 'Downtown Huntsville',
        address: 'Avenue M and University Ave',
        bestFor: 'Seniors, branding headshots, and couples',
        notes: 'Brick streets, small-town storefronts, and a courthouse-square feel.',
        timing: 'Golden hour.',
      },
      {
        name: 'Eastham-Thomason Park',
        address: '1500 7th St',
        bestFor: 'Families, kids, and casual sessions',
        notes: 'A sprawling downtown park with trails, a creek, and painted-bridge artwork.',
        timing: 'Morning or golden hour.',
      },
      {
        name: 'Kate Barr Ross Memorial Park',
        address: '486 TX-75 N',
        bestFor: 'Quick family sessions and kids',
        notes: 'A gazebo and octagonal pavilion give built-in anchors for posed shots. Sports leagues own the evenings, so we book weekday daytime.',
      },
    ],
    venues: [
      { name: 'Sam Houston Memorial Museum', address: '1836 Sam Houston Ave', description: 'Historic homes on museum grounds; we ask about event rental when arranging photography.' },
    ],
    seasons: [
      'The piney woods peak green in spring, with modest fall color from late November.',
      'Lake Raven shorelines are best in spring and fall.',
      'May and December graduation seasons are the SHSU senior-portrait rush.',
      'Texas Renaissance Festival season in October and November adds fall traffic.',
    ],
    permits: [
      HUNTSVILLE_STATE_PARK_RULE,
      'The museum, city parks, and SHSU campus have no published policy, so we call ahead and allow time for answers.',
    ],
    reviewNames: ['Kimberly I.', 'Felipa Q.'],
  },
  {
    slug: 'plantersville',
    city: 'Plantersville',
    county: 'Grimes County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Plantersville is rustic-venue country: French-country chapels, ranch weddings with guest cabins, wildflower roadsides in a good spring, and the Tudor architecture of the Texas Renaissance Festival grounds next door.',
    sessions: [],
    spots: [
      {
        name: 'Plantersville Scenic Byway',
        address: 'FM 1774 and FM 105',
        bestFor: 'Spring family minis and maternity',
        notes: 'Roadside wildflower and bluebonnet fields when the rains cooperate. We stay on public rights-of-way, and in a drought year we scout before selling a bluebonnet session.',
        timing: 'Golden hour only; peak bloom is March and April.',
      },
      {
        name: 'Texas Renaissance Festival grounds',
        address: 'Todd Mission',
        bestFor: 'Engagements and seniors who want something unique',
        notes: 'Tudor architecture that looks like nowhere else in the area. Off-season access goes through the festival directly.',
        timing: 'Festival season (October and November) brings atmosphere and crowds.',
      },
      {
        name: 'P-6 Farms Fall Fest',
        address: '9963 Pooles Rd, Montgomery',
        bestFor: 'Family fall minis and kid-heavy sessions',
        notes: 'A pumpkin patch, corn maze, flower fields, vintage trucks, and restored barns on fall weekends. Admission is ticketed, and we confirm portrait terms with the farm.',
        timing: 'October to early November weekends only.',
      },
      {
        name: 'Plantersville Park',
        address: '11357 Lodge Ln',
        bestFor: 'Quick family sessions and kids',
        notes: 'Green space and a dog park.',
        timing: 'Golden hour.',
      },
    ],
    venues: [
      { name: 'Venue 311', address: '9282 County Rd 311', description: 'A French-country venue with a 2,100-square-foot chapel and outdoor ceremony space.' },
      { name: 'Double Bar B Guest Ranch & Ranch Hall', address: '17695 FM 1774', description: 'A ranch wedding venue with guest cabins, good for full-weekend coverage.' },
      { name: 'Family Farm Event Venue', address: '11351 County Rd 203', description: 'A rustic event and wedding space.' },
      { name: 'Iron Horse Guest Ranch', address: '25896 Iron Horse Ln', description: 'A horseback-riding guest ranch with equine sessions possible by arrangement.' },
    ],
    seasons: [
      'Wildflowers peak along FM 1774 in March and April, depending on rain.',
      'Renaissance Festival season and P-6 Farms Fall Fest fill October and November.',
      'Summer is hot open-field work, so we schedule early or late.',
    ],
    permits: [
      'The town park and venues have no published photo policy; private venues are coordinated directly.',
      'Washington-on-the-Brazos State Historic Site, about 20 minutes west, follows Texas Parks & Wildlife rules, so we contact the site first.',
    ],
    reviewNames: ['Cassey E.', 'Alice J.'],
  },
  {
    slug: 'navasota',
    city: 'Navasota',
    county: 'Grimes County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Navasota gives you hill-country-style ranch sunsets without the drive to Fredericksburg, a former golf course turned city park, and a historic downtown with the Grimes County Courthouse for formal portraits.',
    sessions: [],
    spots: [
      {
        name: 'Buena Vista Ranch',
        address: '2945 FM 3090',
        bestFor: 'Family sessions, maternity, and engagement sunsets',
        notes: 'Hilltop views over wildflower fields and movie-quality sunsets. Private property open to the public on Saturdays with day passes, so we confirm portrait terms with the owners.',
        timing: 'Golden hour to sunset; nothing else is worth the trip.',
      },
      {
        name: 'August Horst Municipal Park',
        address: '100 Veterans Memorial Dr',
        bestFor: 'Families, kids, and seniors',
        notes: 'Navasota’s largest park, a former municipal golf course whose rolling greens photograph like a country club.',
        timing: 'Late afternoon to golden hour.',
      },
      {
        name: 'Downtown Navasota historic district',
        address: 'Railroad St and McAlpine',
        bestFor: 'Seniors, branding, and couples',
        notes: 'Old railroad-town storefronts and the Grimes County Courthouse, a known wedding-photo backdrop.',
        timing: 'Golden hour.',
      },
      {
        name: 'Cleveland Park and Hillside Park',
        address: '500 Cleveland Ave and 900 Hillside Dr',
        bestFor: 'Families, couples, and seniors',
        notes: 'A family park and a hiking-trail park for simpler sessions.',
      },
    ],
    venues: [{ name: 'Buena Vista Ranch', address: '2945 FM 3090', description: 'A ranch with event space; we ask about private portrait arrangements.' }],
    seasons: [
      'Wildflowers at Buena Vista Ranch peak in March and April.',
      'Hilltop sunsets work year-round.',
      'Downtown is most pleasant in spring and fall.',
    ],
    permits: [
      'Navasota city parks have no published photo policy, so we call before booking.',
      'Buena Vista Ranch is private; we confirm portrait terms with the owners.',
    ],
    reviewNames: ['Kelsi R.', 'Mansher G.'],
  },
  {
    slug: 'local-photographer-bryan-tx',
    city: 'Bryan',
    county: 'Brazos County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'Bryan is where we have photographed a wedding at Messina Hof, one of the few vineyard backdrops in the region. Downtown Bryan adds murals and historic storefronts, and Lake Bryan gives waterfront sunsets.',
    sessions: [{ description: 'A wedding at Messina Hof Winery', date: 'March 2026' }],
    spots: [
      {
        name: 'Messina Hof Estate Winery',
        address: '4545 Old Reliance Rd',
        bestFor: 'Engagements, couples, and wedding-day portraits',
        notes: 'Vineyard rows, a villa, and a cellar room. We get written permission from the winery before booking portrait sessions.',
        timing: 'Golden hour in the vines, late spring through harvest.',
        verified: true,
      },
      {
        name: 'Downtown Bryan',
        bestFor: 'Seniors, branding, and couples who want an urban edge',
        notes: 'Murals and historic storefronts with a First Friday arts vibe.',
        timing: 'Golden hour.',
      },
      {
        name: 'Lake Bryan',
        address: '8200 Sandy Point Rd',
        bestFor: 'Couples and maternity',
        notes: 'Waterfront sunsets with a paddleboard and yoga scene.',
        timing: 'Sunset.',
      },
      {
        name: 'Travis Bryan Midtown Park',
        address: '206 W Villa Maria Rd',
        bestFor: 'Families, kids, and casual seniors',
        notes: 'Trails, open lawns, and Country Club Lake.',
        timing: 'Late afternoon; the park closes at 7 PM.',
      },
      {
        name: 'Boonville Heritage Park',
        address: '2421 Boonville Rd',
        bestFor: 'Seniors, rustic couples, and themed sessions',
        notes: 'A historic village with period buildings, open Saturdays only.',
      },
      {
        name: 'Tanglewood, Heritage, and Bonham parks',
        bestFor: 'Families, maternity, and headshots',
        notes: 'A seasonal splash pad at Tanglewood, a downtown public garden at Heritage Park, and garden beds at Bonham Park.',
      },
    ],
    venues: [{ name: 'Messina Hof Winery & Resort', address: '4545 Old Reliance Rd', description: 'Weddings, villa stays, and cellar room events at the vineyard where we have photographed a wedding.', verified: true }],
    seasons: [
      'Vines are fullest from late spring through harvest.',
      'Bluebonnets line rural FM roads in March and April.',
      'Summer heat pushes sessions to morning or last light.',
    ],
    permits: ['Messina Hof requires written permission for portrait sessions.', 'Bryan city parks have no published policy, so we call before booking.'],
    reviewNames: ['Felipa Q.', 'Joshua G.'],
  },
  {
    slug: 'local-photographer-college-station-tx',
    city: 'College Station',
    county: 'Brazos County',
    travelNote: TRAVEL_FEE_RULE,
    intro:
      'College Station sessions revolve around Texas A&M: Century Tree proposals, cap-and-gown portraits at the Administration Building, and Kyle Field. We have photographed a proposal here and a wedding at Messina Hof in nearby Bryan.',
    sessions: [
      { description: 'A proposal in College Station', date: 'March 2026' },
      { description: 'A wedding at Messina Hof in nearby Bryan', date: 'March 2026' },
    ],
    spots: [
      {
        name: 'The Century Tree',
        address: '766 Military Walk, Texas A&M',
        bestFor: 'Engagements, Aggie senior portraits, and first looks',
        notes: 'A massive historic live oak and an Aggie proposal and wedding tradition.',
        timing: 'Late afternoon, backlit through the branches.',
      },
      {
        name: 'Administration Building',
        bestFor: 'Cap-and-gown seniors and bridals',
        notes: 'The front steps, columns, and maroon tile.',
        timing: 'Morning (the steps face east) or golden hour.',
      },
      {
        name: 'Military Walk and Academic Plaza',
        bestFor: 'Seniors and engagements',
        notes: 'A tree-lined central corridor with symmetrical architecture.',
      },
      {
        name: 'Kyle Field exterior',
        bestFor: 'Seniors who want bold school-pride shots',
        notes: 'The stadium exterior is an iconic backdrop; interior and field-level access needs prior Texas A&M approval.',
      },
      {
        name: 'George Bush Presidential Library gardens',
        bestFor: 'Family sessions',
        notes: 'A pond, gazebo, trails, and blooming flowers, with occasional bluebonnets at the entrance. Free.',
        timing: 'Evening golden hour.',
      },
      {
        name: 'The Gardens at Texas A&M',
        bestFor: 'Engagements, seniors, and families',
        notes: 'Vineyard rows and themed garden rooms on west campus.',
      },
    ],
    venues: [
      { name: 'Messina Hof (Bryan)', description: 'The Brazos Valley’s flagship wedding venue, where we have photographed a wedding.', verified: true },
      { name: 'The Boathouse at Millican Reserve', description: 'A 1,000-square-foot lakefront space for intimate weddings and events.' },
    ],
    seasons: [
      'May and December graduations are the senior-portrait rush, so we book around Ring Day and finals.',
      'Bluebonnets show up on campus in spring.',
      'We avoid Texas A&M home football weekends, when campus is gridlocked.',
    ],
    permits: [
      'Texas A&M publishes no general photography permit policy, so we confirm before campus sessions.',
      'Kyle Field interior access requires prior approval.',
    ],
    reviewNames: ['Ainslee C.', 'Kimberly I.'],
  },
]

// One unique photo set per city; no photo is used on two city pages. City names appear in alt text only
// where the session actually happened there.
const cityImages: Record<string, { heroImage: CityImage; secondaryImage?: CityImage }> = {
  'local-photographer-pinehurst-tx': {
    heroImage: { id: 'Untitled_tpoc5r', alt: 'Grandparents holding hands with their extended family gathered behind them by a lake lined with cypress trees' },
    secondaryImage: { id: 'Untitled-12_fzsyvh', alt: 'Couple standing arm in arm on a wooden walkway beside a lake' },
  },
  'local-photographer-conroe-tx': {
    heroImage: { id: 'PS373629_epurd9', alt: 'Two couples laughing together on a lakeshore under a blue sky' },
    secondaryImage: { id: 'Hotard_Family_Day_2_-_763_1_jklpba', alt: 'High school senior holding her 2026 graduation cap tassel' },
  },
  humble: {
    heroImage: { id: 'Jay_Proposal_-_1_12_e7wqsb', alt: 'Newly engaged couple showing the ring under a Will You Marry Me sign at Mercer Botanic Gardens in Humble, TX' },
    secondaryImage: { id: 'Untitled-6_3_kmgp9o', alt: 'Man kneeling to propose on a garden path beside a picnic blanket and flowers' },
  },
  'local-photographer-katy-tx': {
    heroImage: { id: 'VB_School_Chris_Faves_-_28_vdjsiw', alt: 'Volleyball school staff and families in matching pink shirts on the court in Katy, TX' },
    secondaryImage: { id: 'Hotard_Family_Day_2_-_49_1_eernop', alt: 'Black and white family portrait of parents hugging their three daughters by the water' },
  },
  'local-photographer-houston-tx': {
    heroImage: { id: 'Hotard_Family_Day_2_-_152_1_mcyhw2', alt: 'Family of six walking hand in hand through a grassy field by the water' },
    secondaryImage: { id: 'Alice_Birthday_Party_-_74_zxkulm', alt: 'Guests celebrating at a first birthday party in Houston, TX' },
  },
  'local-photographer-bryan-tx': {
    heroImage: { id: 'Untitled-30_fliqiq', alt: 'Bride walking down the aisle with her father at an outdoor vineyard ceremony' },
    secondaryImage: { id: 'KELLY_-_1_11_wgadni', alt: 'Black and white photo of a bride laughing with her father among vineyard rows' },
  },
  'local-photographer-college-station-tx': {
    heroImage: { id: 'PS379781_kttvv3', alt: 'Couple in formal attire smiling at each other under the trees' },
    secondaryImage: { id: 'Hotard_Family_Day_2_-_764_1_b9enxd', alt: 'Black and white senior portrait of a graduate holding her 2026 tassel' },
  },
  'local-photographer-huntsville-tx': {
    heroImage: { id: 'Untitled-4_1_osac8b', alt: 'Graduate holding a Sam Houston State Bearkats pennant outdoors' },
  },
  'local-photographer-magnolia-tx': {
    heroImage: { id: 'PS375315_zyvbbi', alt: 'Woman in a flowing gown in a field of orange wildflowers' },
  },
  'local-photographer-tomball-tx': {
    heroImage: { id: 'PS370397-1_ooxygn', alt: 'Engaged couple leaning against a large oak tree at golden hour' },
  },
  'local-photographer-the-woodlands-tx': {
    heroImage: { id: 'IMG_4555_1_ppdkum', alt: 'Newly engaged woman holding red roses and showing her ring by the water' },
  },
  'local-photographer-spring-tx': {
    heroImage: { id: 'Untitled-8_2_b18mim', alt: 'Couple walking hand in hand on a green garden path' },
  },
  'local-photographer-montgomery-tx': {
    heroImage: { id: 'Untitled-15_vyz4oa', alt: 'Bride with sunflowers and groom in a cowboy hat under a rustic wooden arbor' },
  },
  'local-photographer-cypress-tx': {
    heroImage: { id: 'PS374813_vuos93', alt: 'High school senior smiling among green plants' },
  },
  'local-photographer-willis-tx': {
    heroImage: { id: 'Untitled_1_zwsrnm', alt: 'Expecting parents and their daughter holding ultrasound photos among tall pine trees' },
  },
  'local-photographer-new-waverly-tx': {
    heroImage: { id: 'Untitled-4-3_dvlcs6', alt: 'Brother and sister laughing together on a sandy lakeshore' },
  },
  'local-photographer-new-caney-tx': {
    heroImage: { id: 'Hotard_Family_Day_1_-_252-2_fjeggf', alt: 'Family of six posing on a wooded trail under a green canopy' },
  },
  'local-photographer-hockley-tx': {
    heroImage: { id: 'Untitled-12_hih9qs', alt: 'High school senior in a letterman jacket sitting in the grass by a pond' },
  },
  cleveland: {
    heroImage: { id: 'IMG_1503_Original_mtopcp', alt: 'Expecting father kissing his partner’s belly in a pine forest' },
  },
  kingwood: {
    heroImage: { id: 'PS379799_ayoxbp', alt: 'Couple embracing among lush green trees' },
  },
  atascocita: {
    heroImage: { id: 'IMG_4582_1_lmosd6', alt: 'Mother hugging her two grown daughters among tropical plants' },
  },
  porter: {
    heroImage: { id: 'Untitled-3_2_u4p9kx', alt: 'Parents walking with their two young daughters on a sunny tree-lined path' },
  },
  splendora: {
    heroImage: { id: 'PS379444_2_1_pge2hl', alt: 'Young woman posing among pink azalea blooms' },
  },
  waller: {
    heroImage: { id: 'Untitled-26_1_m2xd8r', alt: 'Black and white portrait of a man in a cowboy hat and western scarf' },
  },
  navasota: {
    heroImage: { id: 'IMG_8313_asvu5g', alt: 'Engaged couple kissing with the engagement ring in view' },
  },
  plantersville: {
    heroImage: { id: 'Untitled-36_mape8j', alt: 'Bride holding sunflowers on a wooden porch with pine trees behind her' },
  },
}

export function getCityGuide(slug: string) {
  const guide = cityGuides.find((item) => item.slug === slug)
  return guide ? { ...guide, ...cityImages[slug] } : undefined
}

export function getCityGuideReviews(guide: CityGuide) {
  return guide.reviewNames
    .map((name) => studio37Reviews.find((review) => review.name === name))
    .filter((review): review is (typeof studio37Reviews)[number] => Boolean(review))
}

export const cityGuideSlugs = cityGuides.map((guide) => guide.slug)

// Search-result descriptions built around each city's signature spots (kept under ~155 characters).
export const cityMetaDescriptions: Record<string, string> = {
  'local-photographer-pinehurst-tx': 'Pinehurst, TX photographer based at our Goodson Loop studio. Lake, pine forest, and greenway sessions with two photographers. Sessions from $350.',
  'local-photographer-magnolia-tx': 'Magnolia, TX photographer for families, seniors, and weddings at Unity Park, the 1902 depot, and Lake Windcrest. Two photographers, sessions from $350.',
  'local-photographer-tomball-tx': 'Tomball, TX photographer for Old Town, Depot Plaza, Burroughs Park, and Kleb Woods sessions. Two photographers on every session, from $350.',
  'local-photographer-the-woodlands-tx': 'The Woodlands photographer for pine-trail family sessions and Waterway portraits, plus resort and country club weddings. Two photographers, from $350.',
  'local-photographer-conroe-tx': 'Conroe, TX photographer for Lake Conroe sunsets, W.G. Jones State Forest, and downtown sessions, plus Conroe wedding venues. Sessions from $350.',
  'local-photographer-spring-tx': 'Spring, TX photographer for Mercer Botanic Gardens, Spring Creek Greenway, and Old Town Spring sessions. Two photographers, sessions from $350.',
  'local-photographer-montgomery-tx': 'Montgomery, TX photographer for Fernland Historical Park, Lake Conroe sunsets, and barn and lakeside weddings. Two photographers, sessions from $350.',
  'local-photographer-cypress-tx': 'Cypress, TX photographer for Kleb Woods, Kickerillo-Mischer Preserve, and Cypress Top Historic Park sessions. Two photographers, from $350.',
  'local-photographer-houston-tx': 'Houston photographer for skyline sessions at Buffalo Bayou, the Arboretum, Hermann Park, and the Heights. We handle park permits. Sessions from $350.',
  'local-photographer-katy-tx': 'Katy, TX photographer for Katy Boardwalk sunsets, Mary Jo Peckham Park, and Old Katy sessions, plus Katy wedding venues. Sessions from $350.',
  'local-photographer-willis-tx': 'Willis, TX photographer for Sam Houston National Forest, Double Lake, and Lake Conroe sessions, plus rustic barn weddings. Sessions from $350.',
  kingwood: 'Kingwood, TX photographer for East End Park, River Grove boardwalk, and greenbelt trail sessions near Lake Houston. Two photographers, from $350.',
  humble: 'Humble, TX photographer for proposals, minis, and family sessions at Mercer Botanic Gardens and downtown Humble. Two photographers, from $350.',
  atascocita: 'Atascocita, TX photographer for Lake Houston shoreline and Atascocita Park sessions, with Mercer Botanic Gardens nearby. Sessions from $350.',
  'local-photographer-hockley-tx': 'Hockley, TX photographer for Kleb Woods, Zube Park, and New Kentucky Park sessions, plus Hockley wedding venues. Two photographers, from $350.',
  waller: 'Waller, TX photographer for tallgrass prairie sessions at the Katy Prairie Preserve and Warren Lake. Two photographers, sessions from $350.',
  'local-photographer-new-caney-tx': 'New Caney, TX photographer for pine forest and Peach Creek sessions at Lake Houston Wilderness Park. Two photographers, sessions from $350.',
  porter: 'Porter, TX photographer for Lake Houston Wilderness Park, Kingwood lakefront parks, and Mercer Botanic Gardens. Two photographers, from $350.',
  splendora: 'Splendora, TX photographer for family sessions at H.L. Patton Park and Heritage Park, plus Fountain View Farm weddings. Sessions from $350.',
  cleveland: 'Cleveland, TX photographer for Sam Houston National Forest pine sessions and Stancil Park family photos. Two photographers, sessions from $350.',
  'local-photographer-new-waverly-tx': 'New Waverly, TX photographer for Cagle Recreation Area lake-and-pines sessions and Big Creek Scenic Area. Two photographers, from $350.',
  'local-photographer-huntsville-tx': 'Huntsville, TX photographer for SHSU senior portraits, Sam Houston Memorial Museum grounds, and Huntsville State Park. Sessions from $350.',
  plantersville: 'Plantersville, TX photographer for wildflower byway minis, Renaissance Festival grounds, and rustic chapel and ranch weddings. From $350.',
  navasota: 'Navasota, TX photographer for Buena Vista Ranch sunsets, downtown courthouse portraits, and August Horst Park. Two photographers, from $350.',
  'local-photographer-bryan-tx': 'Bryan, TX photographer for Messina Hof vineyard weddings and engagements, downtown Bryan murals, and Lake Bryan sunsets. Sessions from $350.',
  'local-photographer-college-station-tx': 'College Station photographer for Century Tree proposals, Texas A&M senior portraits, and Kyle Field sessions. Two photographers, from $350.',
}

export const cityGuideLinks = cityGuides.map((guide) => ({ city: guide.city, href: `/${guide.slug}` }))

// Social share card (1200x630) cropped from the city's own hero photo.
export function cityOgImage(slug: string) {
  const id = cityImages[slug]?.heroImage.id
  return id ? `https://res.cloudinary.com/dmjxho2rl/image/upload/f_jpg,q_auto:best,w_1200,h_630,c_fill,g_auto/${id}.jpg` : undefined
}
