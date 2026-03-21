export type LocationPage = {
  slug: string
  city: string
  county: string
  region: string
  intro: string
  nearbySpots: string[]
}

export const locationPages: LocationPage[] = [
  {
    slug: 'the-woodlands-tx',
    city: 'The Woodlands',
    county: 'Montgomery County',
    region: 'North Houston',
    intro: 'High-demand market with strong intent for weddings, family portraits, and business branding sessions.',
    nearbySpots: ['Waterway', 'Town Green Park', 'Market Street'],
  },
  {
    slug: 'conroe-tx',
    city: 'Conroe',
    county: 'Montgomery County',
    region: 'I-45 North',
    intro: 'Excellent local demand for event, graduation, family, and commercial photography services.',
    nearbySpots: ['Downtown Conroe', 'Lake Conroe', 'Candy Cane Park'],
  },
  {
    slug: 'magnolia-tx',
    city: 'Magnolia',
    county: 'Montgomery County',
    region: 'TX-249 Corridor',
    intro: 'Strong fit for rustic weddings, outdoor portraits, and local small-business branding.',
    nearbySpots: ['Unity Park', 'Magnolia Stroll', 'Westwood North'],
  },
  {
    slug: 'tomball-tx',
    city: 'Tomball',
    county: 'Harris County',
    region: 'Northwest Houston',
    intro: 'Consistent year-round search demand with strong conversion intent for portraits and events.',
    nearbySpots: ['Downtown Tomball', 'Main Street Crossing', 'Kleb Woods'],
  },
  {
    slug: 'spring-tx',
    city: 'Spring',
    county: 'Harris County',
    region: 'North Houston',
    intro: 'Large residential audience with high volume for family photography and senior portraits.',
    nearbySpots: ['Old Town Spring', 'Meyer Park', 'Pundt Park'],
  },
  {
    slug: 'montgomery-tx',
    city: 'Montgomery',
    county: 'Montgomery County',
    region: 'Lake Conroe Area',
    intro: 'Premium wedding and engagement opportunity area with destination-style venues nearby.',
    nearbySpots: ['Historic Downtown', 'Fernland Historical Park', 'Lake Conroe'],
  },
  {
    slug: 'willis-tx',
    city: 'Willis',
    county: 'Montgomery County',
    region: 'I-45 North',
    intro: 'Growing residential demand and lower competition than core metro markets.',
    nearbySpots: ['Lake Conroe North', 'Cedar Creek', 'Downtown Willis'],
  },
  {
    slug: 'new-waverly-tx',
    city: 'New Waverly',
    county: 'Walker County',
    region: 'I-45 Corridor',
    intro: 'Underserved market positioned between Conroe and Huntsville with favorable ranking potential.',
    nearbySpots: ['Sam Houston National Forest', 'Downtown New Waverly', 'Lone Star Hiking Trail'],
  },
  {
    slug: 'huntsville-tx',
    city: 'Huntsville',
    county: 'Walker County',
    region: 'I-45 North',
    intro: 'College and community events create steady photography demand and local SEO upside.',
    nearbySpots: ['Sam Houston State University', 'Downtown Huntsville', 'Huntsville State Park'],
  },
  {
    slug: 'new-caney-tx',
    city: 'New Caney',
    county: 'Montgomery County',
    region: 'East Montgomery County',
    intro: 'Fast-growth area with high intent for family, school milestone, and branding sessions.',
    nearbySpots: ['Valley Ranch', 'Lake Houston Wilderness Park', 'Town Center'],
  },
  {
    slug: 'hockley-tx',
    city: 'Hockley',
    county: 'Harris County',
    region: 'Northwest Fringe',
    intro: 'Strong overlap with Tomball/Magnolia demand and favorable local competition levels.',
    nearbySpots: ['Zube Park', 'Houston Oaks', 'Hockley Trade Days'],
  },
  {
    slug: 'porter-tx',
    city: 'Porter',
    county: 'Montgomery County',
    region: 'East Montgomery County',
    intro: 'High-opportunity suburban market with expanding family and business photography demand.',
    nearbySpots: ['Valley Ranch Town Center', 'Bens Branch', 'Sorters-McClellan'],
  },
  {
    slug: 'splendora-tx',
    city: 'Splendora',
    county: 'Montgomery County',
    region: 'US-59 Corridor',
    intro: 'Lower competition area ideal for capturing long-tail local search intent.',
    nearbySpots: ['Downtown Splendora', 'FM 2090 Corridor', 'Caney Creek area'],
  },
  {
    slug: 'cleveland-tx',
    city: 'Cleveland',
    county: 'Liberty County',
    region: 'Northeast Greater Houston',
    intro: 'Large surrounding residential footprint with rising demand for portrait and event coverage.',
    nearbySpots: ['Downtown Cleveland', 'City Park', 'Trinity River area'],
  },
  {
    slug: 'waller-tx',
    city: 'Waller',
    county: 'Waller County',
    region: 'NW Houston Edge',
    intro: 'Emerging local market with strong potential for wedding and commercial content demand.',
    nearbySpots: ['Downtown Waller', 'Waller County Fairgrounds', 'Fields Store'],
  },
  {
    slug: 'plantersville-tx',
    city: 'Plantersville',
    county: 'Grimes County',
    region: 'Magnolia/College Corridor',
    intro: 'Rural-venue and ranch wedding demand with strong long-tail location intent.',
    nearbySpots: ['FM 1774 Corridor', 'Local ranch venues', 'Navasota River area'],
  },
  {
    slug: 'navasota-tx',
    city: 'Navasota',
    county: 'Grimes County',
    region: 'Brazos Valley Gateway',
    intro: 'Good bridge market between Montgomery County and Brazos Valley search demand.',
    nearbySpots: ['Downtown Navasota', 'Railroad District', 'Washington Avenue'],
  },
  {
    slug: 'bryan-tx',
    city: 'Bryan',
    county: 'Brazos County',
    region: 'Brazos Valley',
    intro: 'Major addressable market with university-adjacent event, graduation, and business content demand.',
    nearbySpots: ['Downtown Bryan', 'Lake Walk', 'Messina Hof area'],
  },
  {
    slug: 'college-station-tx',
    city: 'College Station',
    county: 'Brazos County',
    region: 'Brazos Valley',
    intro: 'High-value local market driven by A&M events, seniors, branding, and weddings.',
    nearbySpots: ['Texas A&M', 'Century Square', 'Research Park'],
  },
  {
    slug: 'cypress-tx',
    city: 'Cypress',
    county: 'Harris County',
    region: 'NW Houston',
    intro: 'Large suburban population with consistent high-converting portrait and family search volume.',
    nearbySpots: ['Towne Lake', 'Bridgeland', 'Cypress Creek'],
  },
  {
    slug: 'kingwood-tx',
    city: 'Kingwood',
    county: 'Harris County',
    region: 'NE Houston',
    intro: 'Established residential market with strong demand for family and school milestone sessions.',
    nearbySpots: ['Town Center Park', 'East End Park', 'Kingwood Drive corridor'],
  },
  {
    slug: 'humble-tx',
    city: 'Humble',
    county: 'Harris County',
    region: 'NE Houston',
    intro: 'Strong event and portrait opportunity area tied to airport corridor growth.',
    nearbySpots: ['Deerbrook area', 'Humble Civic Center', 'Downtown Humble'],
  },
  {
    slug: 'atascocita-tx',
    city: 'Atascocita',
    county: 'Harris County',
    region: 'Lake Houston',
    intro: 'High-intent family and lifestyle portrait market with expanding neighborhoods.',
    nearbySpots: ['Lake Houston', 'Atascocita Commons', 'Lindsay/Luce Bayou area'],
  },
]

export const locationSlugs = locationPages.map((l) => l.slug)

export function getLocationBySlug(slug: string) {
  return locationPages.find((l) => l.slug === slug)
}
