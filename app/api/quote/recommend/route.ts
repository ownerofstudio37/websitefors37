import { NextRequest, NextResponse } from 'next/server'
import { createLogger } from '@/lib/logger'
import { rateLimit, getClientIp } from '@/lib/rateLimit'
import { createAIClient, AI_CONFIGS } from '@/lib/ai-client'

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

    log.info('Generating package recommendation', {
      serviceType: data.serviceType,
      budget: data.budget,
      duration: data.duration
    })

    // Create AI prompt for package recommendation
    const prompt = `You are a photography business consultant for Studio37, a professional photography studio in Pinehurst, TX.

Based on this client's requirements, recommend the perfect photography package:

Service Type: ${data.serviceType}
${data.guestCount ? `Guest Count: ${data.guestCount}` : ''}
${data.duration ? `Duration: ${data.duration} hours` : ''}
${data.location ? `Location: ${data.location}` : ''}
Budget Range: ${data.budget}
${data.eventDate ? `Event Date: ${data.eventDate}` : ''}

Our Package Options:
1. Essential Package ($200-500): Mini sessions, 1-2 hours, 15-50 photos
2. Standard Package ($500-1000): Standard sessions, 2-4 hours, 30-100 photos, multiple looks
3. Complete Package ($1000-2500): Full coverage, 4-8 hours, 100-200 photos, engagement session
4. Premium Package ($2500-4000): Full day, 8+ hours, 200+ photos, two photographers, album
5. Enterprise/Custom ($4000+): Multi-day, unlimited hours, full team, video, complete deliverables

Consider:
- Service type (weddings need more coverage than portraits)
- Duration requirements
- Guest count (more people = need for second photographer)
- Budget constraints
- Client expectations for this service type

Return ONLY valid JSON with this structure:
{
  "name": "Package name that matches the client's needs",
  "price": "Starting price (e.g., '$1,500' or '$2,500-$3,500')",
  "features": [
    "Key feature 1 relevant to their service",
    "Key feature 2 (be specific about coverage hours)",
    "Key feature 3 (mention photo count)",
    "Key feature 4 (special includes like engagement session, album, etc)",
    "Key feature 5 (delivery timeframe or bonus)"
  ],
  "bestFor": "One sentence why this package is perfect for them",
  "confidence": 85
}

Confidence score (0-100) based on how well the package matches their needs and budget.`

    const model = createAIClient({
      config: AI_CONFIGS.structured
    })

    const result = await model.generateContent(prompt)
    const text = result.response.text().trim()

    log.info('AI recommendation generated', { 
      length: text.length,
      preview: text.substring(0, 100)
    })

    const recommendation: PackageRecommendation = JSON.parse(text)

    // Validate recommendation structure
    if (!recommendation.name || !recommendation.price || !recommendation.features || !recommendation.bestFor) {
      throw new Error('Invalid recommendation structure')
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
      name: 'Complete Package',
      price: '$2,500',
      features: [
        '8 hours of professional coverage',
        '150+ beautifully edited photos',
        'High-resolution digital gallery',
        'Engagement or pre-session included',
        'Professional print options available'
      ],
      bestFor: 'Most popular choice for comprehensive coverage',
      confidence: 75
    }

    return NextResponse.json({
      recommendation: fallbackRecommendation,
      generated_at: new Date().toISOString(),
      fallback: true
    })
  }
}
