import { NextRequest, NextResponse } from 'next/server'
import { createLogger } from '@/lib/logger'
import { rateLimit, getClientIp } from '@/lib/rateLimit'

const log = createLogger('api/quote/recommend')

interface QuoteRequest {
  serviceType: string
  guestCount?: number
  eventDate?: string
  duration?: number
  location?: string
  budget?: string
}

interface PackageRecommendation {
  name: string
  price: string
  features: string[]
  bestFor: string
  confidence: number
}

type ServiceType = 'portrait' | 'engagement' | 'wedding' | 'event' | 'commercial'

type PackageOption = {
  key: string
  serviceType: ServiceType
  name: string
  minBudget: number
  maxBudget: number
  durationHours: [number, number]
  guestHint?: [number, number]
  price: string
  features: string[]
  bestFor: string
}

const BUDGET_MIN_MAP: Record<string, number> = {
  'under-500': 0,
  '500-1000': 500,
  '1000-2000': 1000,
  '2000-3500': 2000,
  '3500-5000': 3500,
  '5000-plus': 5000,
}

const PACKAGE_CATALOG: PackageOption[] = [
  {
    key: 'portrait-mini',
    serviceType: 'portrait',
    name: 'Portrait Mini Session',
    minBudget: 350,
    maxBudget: 650,
    durationHours: [0.5, 1],
    price: '$350',
    features: [
      '30-minute portrait session',
      '10+ professionally edited images',
      'Digital gallery delivery',
      'Style & prep guidance included',
      'Fast turnaround and optional print upgrades',
    ],
    bestFor: 'Great for quick portraits, milestones, and seasonal updates.',
  },
  {
    key: 'portrait-standard',
    serviceType: 'portrait',
    name: 'Portrait Standard Session',
    minBudget: 500,
    maxBudget: 1000,
    durationHours: [1, 1.5],
    price: '$500',
    features: [
      '60-minute portrait session',
      '20+ edited images',
      'Multiple looks/outfit changes',
      'Private online gallery',
      '24-hour sneak peek included',
    ],
    bestFor: 'Best value for families, seniors, and couples wanting variety.',
  },
  {
    key: 'portrait-extended',
    serviceType: 'portrait',
    name: 'Portrait Extended Session',
    minBudget: 750,
    maxBudget: 1800,
    durationHours: [1.5, 3],
    price: '$750',
    features: [
      '90-minute session with extra creative direction',
      '35+ edited images',
      'Multiple locations/look transitions',
      'Premium online gallery',
      'Priority turnaround options available',
    ],
    bestFor: 'Ideal for premium portrait storytelling and multiple setups.',
  },
  {
    key: 'engagement-signature',
    serviceType: 'engagement',
    name: 'Engagement Signature Session',
    minBudget: 450,
    maxBudget: 900,
    durationHours: [0.75, 1.25],
    price: '$450',
    features: [
      '45-minute engagement session',
      '15+ edited images',
      'Location planning support',
      'Digital gallery + social-ready crops',
      'Styling and timeline prep guide',
    ],
    bestFor: 'Perfect for save-the-dates and elegant couple portraits.',
  },
  {
    key: 'engagement-premium',
    serviceType: 'engagement',
    name: 'Engagement Premium Session',
    minBudget: 650,
    maxBudget: 1400,
    durationHours: [1, 2],
    price: '$650',
    features: [
      '75-minute engagement session',
      '25+ edited images',
      'Two-location flow planning',
      'Outfit consultation + pose coaching',
      '24-hour sneak peek delivery',
    ],
    bestFor: 'Great for couples who want a fuller story and multiple looks.',
  },
  {
    key: 'engagement-concierge',
    serviceType: 'engagement',
    name: 'Full Service Engagement Concierge',
    minBudget: 1800,
    maxBudget: 100000,
    durationHours: [2, 8],
    price: 'Custom (Consultation Required)',
    features: [
      'Proposal/session concept and full planning support',
      'Location scouting + permits coordination',
      'Decor setup and surprise logistics',
      'Photo + highlight video coverage options',
      'White-glove timeline + vendor coordination',
    ],
    bestFor: 'Designed for custom surprise proposals and luxury engagement experiences with consultation-based planning.',
  },
  {
    key: 'wedding-essential',
    serviceType: 'wedding',
    name: 'Wedding Essential',
    minBudget: 1500,
    maxBudget: 2400,
    durationHours: [4, 6],
    guestHint: [0, 100],
    price: '$1,500',
    features: [
      '4 hours wedding day coverage',
      '50+ professionally edited images',
      'Private digital gallery',
      'Planning call before wedding day',
      'Print ordering options',
    ],
    bestFor: 'Ideal for intimate weddings and essential coverage windows.',
  },
  {
    key: 'wedding-complete',
    serviceType: 'wedding',
    name: 'Wedding Complete',
    minBudget: 2500,
    maxBudget: 3400,
    durationHours: [7, 9],
    guestHint: [50, 180],
    price: '$2,500',
    features: [
      '8 hours wedding coverage',
      '150+ edited images',
      'Engagement session included',
      'Two-photographer signature coverage',
      '24-hour preview + full digital gallery',
    ],
    bestFor: 'Most popular for full-story wedding coverage and engagement photos.',
  },
  {
    key: 'wedding-premium',
    serviceType: 'wedding',
    name: 'Wedding Premium',
    minBudget: 3500,
    maxBudget: 100000,
    durationHours: [9, 14],
    guestHint: [120, 500],
    price: '$3,500+',
    features: [
      'Full day wedding coverage',
      '300+ edited images',
      'Engagement session + heirloom album',
      'Priority editing workflow',
      'Expanded timeline and logistics support',
    ],
    bestFor: 'Best for large celebrations and premium all-day storytelling.',
  },
  {
    key: 'event-basic',
    serviceType: 'event',
    name: 'Event Basic Coverage',
    minBudget: 600,
    maxBudget: 950,
    durationHours: [2, 3],
    guestHint: [0, 80],
    price: '$600',
    features: [
      '2-hour event coverage',
      '50+ edited photos',
      'High-resolution digital delivery',
      '72-hour highlight preview',
      'Private online gallery',
    ],
    bestFor: 'Great for smaller celebrations and focused event coverage.',
  },
  {
    key: 'event-standard',
    serviceType: 'event',
    name: 'Event Standard Coverage',
    minBudget: 1000,
    maxBudget: 1700,
    durationHours: [3.5, 5],
    guestHint: [60, 180],
    price: '$1,000',
    features: [
      '4-hour event coverage',
      '125+ edited photos',
      'Timeline and logistics consultation',
      '24-hour sneak peek',
      'Private digital gallery',
    ],
    bestFor: 'Best fit for multi-segment events needing full key-moment coverage.',
  },
  {
    key: 'event-premium',
    serviceType: 'event',
    name: 'Event Premium Coverage',
    minBudget: 1800,
    maxBudget: 100000,
    durationHours: [6, 10],
    guestHint: [120, 1000],
    price: '$1,800+',
    features: [
      'Up to 8 hours full-day event coverage',
      '250+ edited photos',
      'Two-photographer support',
      'Custom mobile gallery app',
      'Priority delivery workflow',
    ],
    bestFor: 'Perfect for high-guest-count or all-day corporate and social events.',
  },
  {
    key: 'commercial-starter',
    serviceType: 'commercial',
    name: 'Commercial Starter',
    minBudget: 500,
    maxBudget: 900,
    durationHours: [1.5, 3],
    price: '$500',
    features: [
      '2-hour commercial session',
      '20+ edited brand/product images',
      'Commercial usage license included',
      'High-resolution file delivery',
      'Simple shot-list planning support',
    ],
    bestFor: 'Ideal for small businesses needing foundational brand assets.',
  },
  {
    key: 'commercial-professional',
    serviceType: 'commercial',
    name: 'Commercial Professional',
    minBudget: 1000,
    maxBudget: 1800,
    durationHours: [3.5, 5],
    price: '$1,000',
    features: [
      '4-hour commercial production block',
      '50+ edited images',
      'Multiple sets/looks or locations',
      'Brand direction + shot list refinement',
      'Commercial usage licensing included',
    ],
    bestFor: 'Strong fit for active brands and recurring campaign content.',
  },
  {
    key: 'commercial-enterprise',
    serviceType: 'commercial',
    name: 'Commercial Enterprise',
    minBudget: 2000,
    maxBudget: 100000,
    durationHours: [6, 10],
    price: '$2,000+',
    features: [
      'Full-day brand production',
      '100+ edited images',
      'Multiple creative setups + team coverage',
      'Expanded deliverable set for web/social/ads',
      'Priority asset delivery and support',
    ],
    bestFor: 'Best for brands needing high-volume campaign-ready assets.',
  },
]

function normalizeServiceType(raw?: string): ServiceType {
  const value = String(raw || '').toLowerCase()
  if (value.includes('engagement')) return 'engagement'
  if (value.includes('wedding')) return 'wedding'
  if (value.includes('event')) return 'event'
  if (value.includes('commercial')) return 'commercial'
  return 'portrait'
}

function scorePackage(pkg: PackageOption, input: QuoteRequest, budgetMin: number): number {
  let score = 0
  const duration = Number(input.duration || 0)
  const guests = Number(input.guestCount || 0)

  if (budgetMin >= pkg.minBudget && budgetMin <= pkg.maxBudget) score += 5
  if (budgetMin > 0 && budgetMin < pkg.minBudget) score -= 2
  if (budgetMin >= pkg.minBudget - 250 && budgetMin <= pkg.maxBudget + 500) score += 2

  if (duration > 0) {
    if (duration >= pkg.durationHours[0] && duration <= pkg.durationHours[1]) score += 4
    else if (Math.abs(duration - pkg.durationHours[0]) <= 1.5 || Math.abs(duration - pkg.durationHours[1]) <= 1.5) score += 2
  }

  if (pkg.guestHint && guests > 0) {
    if (guests >= pkg.guestHint[0] && guests <= pkg.guestHint[1]) score += 3
    else if (Math.abs(guests - pkg.guestHint[0]) <= 30 || Math.abs(guests - pkg.guestHint[1]) <= 30) score += 1
  }

  return score
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers)
  const rl = rateLimit(`quote-recommend:${ip}`, { limit: 10, windowMs: 60000 })

  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a minute.' },
      { status: 429 }
    )
  }

  try {
    const data: QuoteRequest = await request.json()
    const serviceType = normalizeServiceType(data.serviceType)
    const budgetMin = BUDGET_MIN_MAP[data.budget || ''] ?? 0

    log.info('Generating package recommendation', {
      serviceType,
      budget: data.budget,
      duration: data.duration
    })

    const candidates = PACKAGE_CATALOG.filter((pkg) => pkg.serviceType === serviceType)
    const scored = candidates
      .map((pkg) => ({ pkg, score: scorePackage(pkg, data, budgetMin) }))
      .sort((a, b) => b.score - a.score)

    const selected = scored[0]?.pkg || candidates[0]
    const confidenceBase = scored[0]?.score ?? 6
    const confidence = Math.max(72, Math.min(98, 70 + confidenceBase * 3))

    const recommendation: PackageRecommendation = {
      name: selected.name,
      price: selected.price,
      features: selected.features,
      bestFor: selected.bestFor,
      confidence,
    }

    return NextResponse.json({
      recommendation,
      generated_at: new Date().toISOString()
    })

  } catch (error: any) {
    log.error('Package recommendation failed', {
      error: error?.message,
      stack: error?.stack
    })

    // Fallback recommendation if AI fails
    const fallbackRecommendation: PackageRecommendation = {
      name: 'Portrait Standard Session',
      price: '$500',
      features: [
        '60-minute portrait session',
        '20+ edited images',
        'Multiple outfit looks',
        'Private digital gallery',
        '24-hour sneak peek included'
      ],
      bestFor: 'Most popular package for balanced coverage and value.',
      confidence: 75
    }

    return NextResponse.json({
      recommendation: fallbackRecommendation,
      generated_at: new Date().toISOString(),
      fallback: true
    })
  }
}
