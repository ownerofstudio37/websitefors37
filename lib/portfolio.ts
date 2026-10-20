import type { GuideTopic } from '@/components/RelatedGuides'

// Portfolio galleries on the main domain, built from photos already on Cloudinary. Width and height are the
// originals (Cloudinary fl_getinfo), so each tile reserves its exact shape before the image loads.
export type PortfolioPhoto = { id: string; alt: string; w: number; h: number }

export type PortfolioCategory = {
  slug: string
  label: string
  title: string
  description: string
  h1: string
  intro: string
  serviceHref: string
  serviceLabel: string
  priceNote: string
  // studio37Reviews `service` values to show on the page, or specific reviewers by name.
  reviewTypes: string[]
  reviewNames?: string[]
  guideTopic: GuideTopic
  photos: PortfolioPhoto[]
}

export const portfolioCategories: PortfolioCategory[] = [
  {
    slug: 'weddings',
    label: 'Weddings',
    title: 'Wedding Photography Portfolio | Pinehurst, TX | Studio37',
    description:
      'Wedding photos by Studio37: vineyard ceremonies, rustic arbors, family moments, and candid details, photographed by two photographers across Pinehurst and Greater Houston.',
    h1: 'Wedding photography portfolio',
    intro:
      'Ceremonies, family moments, and the small details in between. Two photographers cover every wedding, so one can lead portraits while the other catches reactions and candids.',
    serviceHref: '/services/wedding-photography',
    serviceLabel: 'Wedding photography',
    priceNote: 'Collections from $1,200',
    reviewTypes: [],
    guideTopic: 'wedding',
    photos: [
      { id: 'Untitled-30_fliqiq', alt: 'Bride walking down the aisle with her father at an outdoor vineyard ceremony in Bryan, TX', w: 4819, h: 3213 },
      { id: 'Untitled-15_vyz4oa', alt: 'Bride with sunflowers and groom in a cowboy hat under a rustic wooden arbor', w: 2667, h: 4000 },
      { id: 'KELLY_-_1_11_wgadni', alt: 'Black and white photo of a bride laughing with her father among vineyard rows', w: 6000, h: 4000 },
      { id: 'Untitled-36_mape8j', alt: 'Bride holding sunflowers on a wooden porch with pine trees behind her', w: 2667, h: 4000 },
      { id: 'KELLY_-_1_8_1__2_x7leuc', alt: 'Black and white photo of a ring bearer blowing bubbles during an outdoor wedding ceremony', w: 6000, h: 4000 },
    ],
  },
  {
    slug: 'engagements',
    label: 'Engagements and proposals',
    title: 'Engagement and Proposal Photo Portfolio | Studio37',
    description:
      'Engagement sessions and surprise proposals photographed by Studio37, from Mercer Botanic Gardens to golden-hour oaks around Pinehurst, The Woodlands, and Houston.',
    h1: 'Engagement and proposal portfolio',
    intro:
      'Surprise proposals planned down to the hiding spot, and engagement sessions with relaxed direction and golden-hour light. These are real couples from sessions around Montgomery County and Greater Houston.',
    serviceHref: '/services/engagement-session',
    serviceLabel: 'Engagement sessions',
    priceNote: 'Sessions from $450',
    reviewTypes: ['Proposal'],
    reviewNames: ['Lisa D.', 'Astini S.'],
    guideTopic: 'engagement',
    photos: [
      { id: 'Jay_Proposal_-_1_12_e7wqsb', alt: 'Newly engaged couple showing the ring under a Will You Marry Me sign at Mercer Botanic Gardens in Humble, TX', w: 5324, h: 3914 },
      { id: 'KeltonSP-171_rb326n', alt: 'Engaged couple lying in the grass, raising their joined hands to show the engagement ring', w: 2329, h: 3491 },
      { id: 'Untitled-160_convert.io_c7oit0', alt: 'Man kneeling in the grass to propose under a large oak tree', w: 5090, h: 3940 },
      { id: 'PS370397-1_ooxygn', alt: 'Engaged couple leaning against a large oak tree at golden hour', w: 6000, h: 4000 },
      { id: 'IMG_8313_asvu5g', alt: 'Engaged couple kissing with the engagement ring in view', w: 4000, h: 6000 },
      { id: 'Untitled-6_3_kmgp9o', alt: 'Man kneeling to propose on a garden path beside a picnic blanket and flowers', w: 5761, h: 4000 },
      { id: 'JayKnee3_1_dm2pwk', alt: 'Close-up of a man slipping an engagement ring onto his partner’s finger', w: 3840, h: 2160 },
      { id: 'PS372952_gkvxjl', alt: 'Black and white photo of a couple kissing at a bar', w: 4000, h: 6000 },
      { id: 'IMG_4555_1_ppdkum', alt: 'Newly engaged woman holding red roses and showing her ring by the water', w: 5999, h: 4000 },
      { id: 'PS379781_kttvv3', alt: 'Couple in formal attire smiling at each other under the trees', w: 6000, h: 4000 },
      { id: 'PS370262_buzjak', alt: 'Close-up of an engagement ring as a woman holds her partner’s arm', w: 3267, h: 4000 },
      { id: 'Untitled-100_gxzfgy', alt: 'Black and white close-up of an engagement ring on intertwined hands', w: 5847, h: 3898 },
      { id: 'PS379799_ayoxbp', alt: 'Couple embracing among lush green trees', w: 6000, h: 4000 },
      { id: 'Untitled-12_fzsyvh', alt: 'Couple standing arm in arm on a wooden walkway beside a lake', w: 4703, h: 3135 },
    ],
  },
  {
    slug: 'portraits',
    label: 'Portraits and headshots',
    title: 'Portrait and Headshot Portfolio | Pinehurst, TX | Studio37',
    description:
      'Portraits, headshots, and maternity sessions by Studio37: natural light, clear direction, and polished editing for individuals, couples, and professionals near Houston.',
    h1: 'Portrait, headshot, and maternity portfolio',
    intro:
      'Individual portraits, professional headshots, and maternity sessions. One photographer guides posing while the other watches for the expressions in between, so the gallery feels like you on a good day.',
    serviceHref: '/services/portrait-photography',
    serviceLabel: 'Portrait photography',
    priceNote: 'Sessions from $350',
    reviewTypes: ['Portrait'],
    guideTopic: 'portrait',
    photos: [
      { id: 'PS379444_2_1_pge2hl', alt: 'Young woman posing among pink azalea blooms', w: 6000, h: 4000 },
      { id: 'JoshuaMapson-029_rgc1xu', alt: 'Smiling headshot of a man with locs in a black jacket', w: 3983, h: 5974 },
      { id: 'PS375315_zyvbbi', alt: 'Woman in a flowing gown in a field of orange wildflowers', w: 4819, h: 3213 },
      { id: 'IMG_3787_kaecyl', alt: 'Professional headshot of a smiling woman with long hair', w: 2666, h: 4000 },
      { id: 'IMG_1503_Original_mtopcp', alt: 'Expecting father kissing his partner’s belly in a pine forest', w: 2667, h: 4000 },
      { id: 'Untitled-26_1_m2xd8r', alt: 'Black and white portrait of a man in a cowboy hat and western scarf', w: 6000, h: 4000 },
      { id: '54694193043_f9ae5338ca_k_p7pjaz', alt: 'Profile portrait of a young man in a backwards cap against a sunset sky', w: 1280, h: 1920 },
      { id: 'Untitled_1_zwsrnm', alt: 'Expecting parents and their daughter holding ultrasound photos among tall pine trees', w: 5624, h: 4000 },
      { id: 'D9E4E5AE-12BE-498B-B7C1-9CDE7FFC1B59_qiaj3v', alt: 'Headshot of a smiling woman in a black blouse, seated indoors', w: 1440, h: 1919 },
      { id: 'Untitled-50_2_convert.io_bht8ge', alt: 'Expecting couple sitting in a field of bluebonnets holding a strip of ultrasound photos', w: 1536, h: 2304 },
      { id: 'PS379444_2_1__2_ffgun8', alt: 'Young woman glancing up in front of pink azaleas and pine trees', w: 6000, h: 4000 },
      { id: 'Untitled-13_convert.io_y6zaft', alt: 'Black and white close-up of expecting parents holding a strip of ultrasound photos', w: 1536, h: 2304 },
      { id: 'Untitled-8_2_b18mim', alt: 'Couple walking hand in hand on a green garden path', w: 5999, h: 4000 },
    ],
  },
  {
    slug: 'families',
    label: 'Families',
    title: 'Family Photography Portfolio | Pinehurst, TX | Studio37',
    description:
      'Family photos by Studio37: generational portraits, kids, and relaxed outdoor sessions by the water and under the trees around Pinehurst, The Woodlands, and Houston.',
    h1: 'Family photography portfolio',
    intro:
      'Generational portraits, siblings, and parents with little ones. Sessions stay relaxed: we keep kids moving, plan the light, and make sure every combination on your list gets covered.',
    serviceHref: '/family-photography',
    serviceLabel: 'Family photography',
    priceNote: 'Sessions from $350',
    reviewTypes: ['Family'],
    guideTopic: 'family',
    photos: [
      { id: 'Hotard_Family_Day_1_-_252-2_fjeggf', alt: 'Family of six posing on a wooded trail under a green canopy', w: 3285, h: 2190 },
      { id: 'Untitled-3_2_u4p9kx', alt: 'Parents walking with their two young daughters on a sunny tree-lined path', w: 3062, h: 4000 },
      { id: 'Untitled_tpoc5r', alt: 'Grandparents holding hands with their extended family gathered behind them by a lake lined with cypress trees', w: 4938, h: 3135 },
      { id: 'Hotard_Family_Day_2_-_49_1_eernop', alt: 'Black and white family portrait of parents hugging their three daughters by the water', w: 3283, h: 2190 },
      { id: 'Untitled-4-3_dvlcs6', alt: 'Brother and sister laughing together on a sandy lakeshore', w: 2090, h: 3135 },
      { id: 'IMG_4582_1_lmosd6', alt: 'Mother hugging her two grown daughters among tropical plants', w: 6000, h: 4000 },
      { id: 'Hotard_Family_Day_2_-_152_1_mcyhw2', alt: 'Family of six walking hand in hand through a grassy field by the water', w: 2947, h: 2190 },
    ],
  },
  {
    slug: 'seniors',
    label: 'Seniors',
    title: 'Senior Portrait Portfolio | Pinehurst, TX | Studio37',
    description:
      'Senior portraits by Studio37: cap and tassel shots, letterman jackets, college pennants, and natural-light sets planned around each graduate near Pinehurst and Houston.',
    h1: 'Senior portrait portfolio',
    intro:
      'Cap-and-tassel shots, letterman jackets, college colors, and outfit changes planned around the graduate. We pick spots that fit their personality and time the session for soft light.',
    serviceHref: '/senior-portraits',
    serviceLabel: 'Senior portraits',
    priceNote: 'Sessions from $350',
    reviewTypes: ['Portrait'],
    guideTopic: 'senior',
    photos: [
      { id: 'Untitled-12_hih9qs', alt: 'High school senior in a letterman jacket sitting in the grass by a pond', w: 6000, h: 4000 },
      { id: 'PS374813_vuos93', alt: 'High school senior smiling among green plants', w: 2667, h: 4000 },
      { id: 'Hotard_Family_Day_2_-_763_1_jklpba', alt: 'High school senior holding her 2026 graduation cap tassel', w: 5284, h: 3525 },
      { id: 'Untitled-4_1_osac8b', alt: 'Graduate holding a Sam Houston State Bearkats pennant outdoors', w: 2667, h: 4000 },
      { id: 'Katies_Grad_Shoot_-_77_1_convert.io_ayhrsi', alt: 'Graduate in a green dress crouching in a sunlit wooded clearing', w: 6000, h: 4000 },
      { id: 'Hotard_Family_Day_2_-_764_1_b9enxd', alt: 'Black and white senior portrait of a graduate holding her 2026 tassel', w: 5284, h: 3525 },
    ],
  },
  {
    slug: 'events',
    label: 'Events',
    title: 'Event Photography Portfolio | Houston Area | Studio37',
    description:
      'Event photos by Studio37: birthday parties, community and business events, and celebrations, covered by two photographers for both the room and the candid moments.',
    h1: 'Event photography portfolio',
    intro:
      'Birthday parties, business and community events, and celebrations with friends. With two photographers, one covers the room and the program while the other stays on candids and the people who matter most.',
    serviceHref: '/services/event-photography',
    serviceLabel: 'Event photography',
    priceNote: 'Coverage from $600',
    reviewTypes: ['Event'],
    guideTopic: 'event',
    photos: [
      { id: 'IMG_4591_1_r62hly', alt: 'Friends raising their glasses and cheering as a couple kisses at an outdoor celebration', w: 2667, h: 4000 },
      { id: 'VB_School_Chris_Faves_-_28_vdjsiw', alt: 'Volleyball school staff and families in matching pink shirts on the court', w: 4502, h: 3525 },
      { id: 'Alice_Birthday_Party_-_74_zxkulm', alt: 'Guests celebrating at a first birthday party in Houston, TX', w: 5284, h: 3523 },
      { id: 'Untitled-20_dphwwv', alt: 'Father and young daughter laughing courtside at a volleyball school event', w: 4819, h: 3213 },
      { id: 'VB_School_Chris_Faves_-_196_sphhad', alt: 'Volunteers in pink event shirts at a check-in table inside a volleyball facility', w: 5284, h: 3525 },
      { id: 'Alice_Birthday_Party_-_578_dio4ct', alt: 'Guests being served from a catered buffet at a birthday party', w: 5284, h: 3523 },
      { id: 'Untitled-17_uyydac', alt: 'Mother and toddler in matching pink shirts smiling on a volleyball court', w: 4819, h: 3213 },
      { id: 'Untitled_iz4geh', alt: 'Guests in pink shirts laughing together at an indoor community event', w: 4819, h: 3213 },
      { id: 'VB_School_Chris_Faves_-_158_wlcspc', alt: 'Volleyball school staff and members cheering under the school sign', w: 3770, h: 3525 },
    ],
  },
]

export const getPortfolioCategory = (slug: string) => portfolioCategories.find((category) => category.slug === slug)
