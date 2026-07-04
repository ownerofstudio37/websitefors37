type PackageFact = {
  name: string
  price: string
  duration: string
  photos: string
  features: string[]
  note?: string
}

type ServiceFact = {
  name: string
  slug: string
  types: string[]
  description: string
  packages: Record<string, PackageFact>
  serviceAreas: string[]
}

export const studio37ServiceFacts: ServiceFact[] = [
  {
    name: "Wedding Photography",
    slug: "wedding-photography",
    types: ["Micro elopements", "Wedding day coverage", "Engagement sessions", "Timeline planning"],
    description:
      "Wedding photography starts at $1,200 for Micro / Elopement coverage. Every wedding collection includes the Duo Experience with both Studio37 photographers on site.",
    packages: {
      microElopement: {
        name: "Micro / Elopement",
        price: "$1,200",
        duration: "3 hours",
        photos: "150+ edited photos",
        features: [
          "Guest count under 30",
          "Duo Experience: both photographers on site",
          "48-hour sneak peek",
          "Private digital gallery + print release",
        ],
        note: "This is 3 hours, not 2 hours.",
      },
      essential: {
        name: "Essential Coverage",
        price: "$2,200",
        duration: "6 hours",
        photos: "300+ edited photos",
        features: ["Duo Experience", "48-hour First Look sneak peek", "Private digital gallery"],
      },
      complete: {
        name: "Complete Collection",
        price: "$3,200",
        duration: "8 hours",
        photos: "500+ edited photos",
        features: ["Complimentary engagement session", "24-hour Highlights Gallery", "Custom timeline consultation"],
      },
      premium: {
        name: "Premium Collection",
        price: "$4,500",
        duration: "10+ hours",
        photos: "700+ edited photos",
        features: ["Engagement plus bridal or rehearsal coverage", "Priority 3-week gallery delivery", "$200 heirloom album credit"],
      },
    },
    serviceAreas: ["Pinehurst TX", "The Woodlands TX", "Montgomery County TX", "Tomball TX", "Magnolia TX", "Greater Houston"],
  },
  {
    name: "Portrait Photography",
    slug: "portrait-photography",
    types: ["Family portraits", "Senior portraits", "Headshots", "Maternity sessions"],
    description:
      "Portrait sessions start at $350 with polished direction, professional editing, and private gallery delivery.",
    packages: {
      mini: { name: "Portrait Mini Session", price: "$350", duration: "30 minutes", photos: "15+ edited photos", features: ["Digital gallery", "Professional editing"] },
      standard: { name: "Portrait Standard Session", price: "$500", duration: "60 minutes", photos: "30+ edited photos", features: ["Multiple looks", "Digital gallery", "Professional editing"] },
      extended: { name: "Portrait Extended Session", price: "$750", duration: "90 minutes", photos: "50+ edited photos", features: ["More variety", "Multiple looks", "Digital gallery", "Professional editing"] },
    },
    serviceAreas: ["Pinehurst TX", "The Woodlands TX", "Montgomery TX", "Tomball TX", "Magnolia TX", "Conroe TX", "Greater Houston"],
  },
  {
    name: "Event Photography",
    slug: "event-photography",
    types: ["Corporate events", "Birthday parties", "Graduations", "Special occasions"],
    description:
      "Event photography starts at $600 and is planned around the timeline, important people, and must-have coverage moments.",
    packages: {
      basic: { name: "Event Basic Coverage", price: "$600", duration: "2 hours", photos: "50+ edited photos", features: ["72-hour highlights", "Private gallery"] },
      standard: { name: "Event Standard Coverage", price: "$1,000", duration: "4 hours", photos: "125+ edited photos", features: ["24-hour sneak peek", "Logistics consultation"] },
      premium: { name: "Event Premium Coverage", price: "$1,800", duration: "6 hours", photos: "250+ edited photos", features: ["Timeline support", "Private digital gallery"] },
    },
    serviceAreas: ["Pinehurst TX", "The Woodlands TX", "Montgomery County TX", "Greater Houston"],
  },
  {
    name: "Commercial Photography",
    slug: "commercial-photography",
    types: ["Business content", "Product photography", "Team headshots", "Brand photography"],
    description:
      "Commercial photography starts at $500 and includes commercial usage terms for business-ready images.",
    packages: {
      express: { name: "Business Express", price: "$500", duration: "1 hour", photos: "15+ edited images", features: ["Full commercial usage", "48-hour turnaround"] },
      starter: { name: "Brand Starter", price: "$850", duration: "2 hours", photos: "30+ edited images", features: ["Brand style brief", "Full commercial usage"] },
      library: { name: "Content Library", price: "$1,500", duration: "4 hours", photos: "75+ edited images", features: ["Brand strategy session", "24-hour sneak peek"] },
      full: { name: "Full Brand Story", price: "$2,800", duration: "8 hours", photos: "150+ edited images", features: ["Branding audit", "Behind-the-scenes reel"] },
    },
    serviceAreas: ["Pinehurst TX", "The Woodlands TX", "Montgomery County TX", "Greater Houston"],
  },
]

export function getPackageFactsPrompt() {
  return studio37ServiceFacts
    .map((service) => {
      const packages = Object.values(service.packages)
        .map((pkg) => {
          const note = pkg.note ? ` Important: ${pkg.note}` : ""
          return `- ${pkg.name}: ${pkg.price}, ${pkg.duration}, ${pkg.photos}. Includes ${pkg.features.join("; ")}.${note}`
        })
        .join("\n")

      return `**${service.name}**\n${service.description}\n${packages}`
    })
    .join("\n\n")
}
