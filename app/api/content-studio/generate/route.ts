import { NextResponse, NextRequest } from 'next/server'
import { generateJSON } from '@/lib/ai-client'
import { createLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'
export const maxDuration = 45

const logger = createLogger('content-studio-generate')

type SupportedFormat =
  | 'pdf-guide'
  | 'instagram-square'
  | 'instagram-story'
  | 'facebook-post'
  | 'linkedin-post'

type ServiceContext =
  | 'auto'
  | 'branding-marketing'
  | 'portrait-photography'
  | 'event-photography'
  | 'wedding-photography'
  | 'commercial-photography'

const VALID_FORMATS: SupportedFormat[] = [
  'pdf-guide',
  'instagram-square',
  'instagram-story',
  'facebook-post',
  'linkedin-post',
]

function detectServiceContextFromTopic(topic: string): Exclude<ServiceContext, 'auto'> | null {
  const t = topic.toLowerCase()
  if (/wedding|bride|groom|engagement|elopement/.test(t)) return 'wedding-photography'
  if (/portrait|family|senior|headshot|maternity|newborn/.test(t)) return 'portrait-photography'
  if (/event|corporate event|party|celebration|fundraiser|gala/.test(t)) return 'event-photography'
  if (/commercial|product|brand photo|content library/.test(t)) return 'commercial-photography'
  if (/branding|marketing|seo|lead generation|social media|ppc/.test(t)) return 'branding-marketing'
  return null
}

function buildGuideBlueprint(topic: string, audienceProfile: string, serviceContext: ServiceContext) {
  const inferredContext = serviceContext === 'auto' ? detectServiceContextFromTopic(topic) : serviceContext

  switch (inferredContext) {
    case 'wedding-photography':
      return {
        title: 'Wedding Photography Planning Guide',
        subtitle: 'How to prepare, what to expect, and how to get timeless images',
        intro: `This guide helps ${audienceProfile} plan a smooth wedding photography experience from first consult to final gallery delivery.`,
        checklistHeading: 'Before You Book',
        checklist: [
          'Set priorities: candid moments, portraits, details, family formals',
          'Choose coverage hours based on ceremony + reception timeline',
          'Prepare a family photo list with names and relationships',
          'Share venue lighting constraints and ceremony rules in advance',
        ],
        sectionTwo: 'Build Your Wedding Day Timeline',
        sectionTwoDesc: 'Create a photo-first timeline that protects key moments.',
        pillarsHeading: 'Coverage Pillars',
        pillars: [
          { icon: '📍', title: 'Timeline', description: 'Pad transition time to avoid rushed portraits.' },
          { icon: '👨‍👩‍👧', title: 'Family Flow', description: 'Group family formals by branch for speed.' },
          { icon: '✨', title: 'Golden Hour', description: 'Reserve 15–20 minutes for sunset portraits.' },
        ],
        sectionThree: 'Delivery and Usage Expectations',
        sectionThreeDesc: 'Know what is delivered, when, and how to use it.',
      }
    case 'portrait-photography':
      return {
        title: 'Family Portrait Session Prep Guide',
        subtitle: 'What to wear, how to prepare, and how to get natural photos',
        intro: `This guide helps ${audienceProfile} prepare for portrait sessions so everyone feels comfortable and photos look polished and authentic.`,
        checklistHeading: 'Session Prep Checklist',
        checklist: [
          'Choose outfits with coordinated colors, not identical uniforms',
          'Avoid tiny patterns/logos that distract on camera',
          'Plan around nap/meal times for young children',
          'Bring essentials: wipes, water, snacks, backup outfit',
        ],
        sectionTwo: 'Plan the Session Flow',
        sectionTwoDesc: 'Use a simple flow to keep kids engaged and stress low.',
        pillarsHeading: 'Portrait Success Pillars',
        pillars: [
          { icon: '🧭', title: 'Location', description: 'Pick a low-distraction location with open shade.' },
          { icon: '👕', title: 'Styling', description: 'Use texture and layers for visual depth.' },
          { icon: '🙂', title: 'Energy', description: 'Keep direction playful and movement-based.' },
        ],
        sectionThree: 'After the Session',
        sectionThreeDesc: 'Understand preview, gallery delivery, and image selection.',
      }
    case 'event-photography':
      return {
        title: 'Event Photography Coverage Guide',
        subtitle: 'How to plan shot coverage for smooth, high-impact event documentation',
        intro: `This guide helps ${audienceProfile} map event coverage so key moments, speakers, guests, and brand visuals are captured effectively.`,
        checklistHeading: 'Pre-Event Checklist',
        checklist: [
          'Define must-capture moments and VIP priorities',
          'Share run-of-show with accurate timestamps',
          'Assign on-site point person for real-time coordination',
          'Confirm venue restrictions and access zones',
        ],
        sectionTwo: 'Build a Coverage Plan',
        sectionTwoDesc: 'Distribute coverage across timeline, spaces, and priorities.',
        pillarsHeading: 'Event Coverage Pillars',
        pillars: [
          { icon: '🎤', title: 'Program', description: 'Capture key speaking moments and audience reactions.' },
          { icon: '🤝', title: 'People', description: 'Document networking, sponsor, and guest interactions.' },
          { icon: '🏢', title: 'Brand', description: 'Capture signage, atmosphere, and event details.' },
        ],
        sectionThree: 'Post-Event Delivery',
        sectionThreeDesc: 'Align turnaround timing with your marketing timeline.',
      }
    case 'commercial-photography':
      return {
        title: 'Commercial Photo Production Guide',
        subtitle: 'Plan efficient shoot days for products, team, and brand assets',
        intro: `This guide helps ${audienceProfile} prepare commercial shoots that generate usable marketing assets across web, social, and ads.`,
        checklistHeading: 'Production Checklist',
        checklist: [
          'Define deliverables by channel (web, ads, social, print)',
          'Create shot list by priority and campaign objective',
          'Prepare products/props and confirm talent availability',
          'Align usage rights and licensing before production day',
        ],
        sectionTwo: 'Design Your Shoot Workflow',
        sectionTwoDesc: 'Sequence scenes to maximize output and reduce downtime.',
        pillarsHeading: 'Production Pillars',
        pillars: [
          { icon: '📦', title: 'Shot List', description: 'Prioritize hero shots before variation shots.' },
          { icon: '⏱️', title: 'Pacing', description: 'Block time by set and lighting scenario.' },
          { icon: '📊', title: 'Usage', description: 'Capture crops and ratios for all channels.' },
        ],
        sectionThree: 'Asset Delivery and Deployment',
        sectionThreeDesc: 'Organize final assets by campaign and use case.',
      }
    case 'branding-marketing':
      return {
        title: 'Branding & Marketing Growth Guide',
        subtitle: 'Clarify positioning, improve conversion, and scale predictable growth',
        intro: `This guide helps ${audienceProfile} turn brand strategy into measurable marketing execution with clear priorities and reporting.`,
        checklistHeading: 'Strategy Checklist',
        checklist: [
          'Clarify positioning and ideal customer profile',
          'Define one core offer and one primary CTA',
          'Map a lead flow from traffic to booked consultation',
          'Set weekly KPI review cadence and ownership',
        ],
        sectionTwo: 'Build a 30-Day Execution Plan',
        sectionTwoDesc: 'Run focused weekly experiments tied to business outcomes.',
        pillarsHeading: 'Growth Pillars',
        pillars: [
          { icon: '🧭', title: 'Message', description: 'Lead with outcomes and differentiation.' },
          { icon: '⚙️', title: 'Systems', description: 'Use repeatable production and follow-up workflows.' },
          { icon: '📈', title: 'Optimization', description: 'Scale what converts and cut what does not.' },
        ],
        sectionThree: 'Reporting and Next Steps',
        sectionThreeDesc: 'Translate metrics into clear strategic decisions.',
      }
    default:
      return {
        title: 'Client Strategy Guide',
        subtitle: 'Practical actions, clear priorities, and measurable outcomes',
        intro: `This guide helps ${audienceProfile} make smarter decisions and execute with clarity.`,
        checklistHeading: 'Quick-Start Checklist',
        checklist: [
          'Define your top objective for the next 30 days',
          'Clarify audience, offer, and success metric',
          'Build one weekly execution routine',
          'Review outcomes weekly and optimize quickly',
        ],
        sectionTwo: 'Build Your 30-Day Plan',
        sectionTwoDesc: 'Move from ideas to repeatable execution.',
        pillarsHeading: 'Execution Pillars',
        pillars: [
          { icon: '🎯', title: 'Focus', description: 'Choose highest-impact actions first.' },
          { icon: '⚙️', title: 'Systems', description: 'Use templates and SOPs for consistency.' },
          { icon: '📈', title: 'Optimization', description: 'Test, measure, and scale winners.' },
        ],
        sectionThree: 'Measure and Improve',
        sectionThreeDesc: 'Protect budget and scale what works.',
      }
  }
}

function buildFallbackBlocks(topic: string, format: SupportedFormat, audienceProfile = 'leads and clients', serviceContext: ServiceContext = 'auto') {
  const blueprint = buildGuideBlueprint(topic, audienceProfile, serviceContext)
  const inferredContext = serviceContext === 'auto' ? detectServiceContextFromTopic(topic) : serviceContext
  const isClientPrepGuide = inferredContext === 'portrait-photography' || inferredContext === 'wedding-photography' || inferredContext === 'event-photography'

  const decisionSupportHeading = isClientPrepGuide ? 'Questions to Ask Your Photographer' : 'Questions to Ask Before You Hire'
  const decisionSupportItems = isClientPrepGuide
    ? [
        'What timeline do you recommend for our specific session/event?',
        'How should we prepare outfits, details, and participants beforehand?',
        'What happens if weather, delays, or child mood issues come up?',
        'When do we receive previews, full gallery, and download access?',
      ]
    : [
        'What outcomes can you realistically deliver in 30–60 days?',
        'What is included, excluded, and billed separately?',
        'How will progress be reported and how often?',
        'Who owns the assets, data, and deliverables?',
      ]

  const sectionThreeBulletsHeading = isClientPrepGuide ? 'Day-Of Success Checklist' : 'Weekly Optimization Actions'
  const sectionThreeBullets = isClientPrepGuide
    ? [
        'Arrive 10–15 minutes early to settle in and reduce stress',
        'Bring backup essentials (snacks, water, touch-up items, outfit backup)',
        'Trust direction and stay focused on connection over perfection',
        'Confirm your post-session delivery timeline before leaving',
      ]
    : [
        'Review CTR, conversion rate, cost per lead, and close rate',
        'Keep a win/loss log for messaging and creative tests',
        'Double down on channels with best lead quality, not just volume',
        'Refresh weak CTAs and above-the-fold value proposition first',
      ]

  const statsData = isClientPrepGuide
    ? [
        { value: '1', label: 'Prep Call' },
        { value: '2', label: 'Outfit Options' },
        { value: '24–72h', label: 'Preview Window' },
      ]
    : [
        { value: '1', label: 'Primary KPI' },
        { value: '3', label: 'Weekly Experiments' },
        { value: '30', label: 'Day Cycle' },
      ]

  const quoteText = isClientPrepGuide
    ? 'The best photos come from good preparation, clear expectations, and a relaxed experience on session day.'
    : 'Execution beats intention. Build a system, measure what matters, and scale the proven wins.'
  const quoteAuthor = isClientPrepGuide ? 'Studio37 Photo Team' : 'Studio37 Strategy Team'

  const ctaHeading = isClientPrepGuide ? 'Ready to plan your session?' : 'Want this tailored to your needs?'
  const ctaSubtext = isClientPrepGuide
    ? `We can help ${audienceProfile} plan outfits, timeline, and details so your session feels easy and your images look incredible.`
    : `We can turn this into a custom plan with scope, timeline, and clear next steps for ${audienceProfile}.`

  if (format === 'pdf-guide') {
    return [
      {
        type: 'cover',
        data: {
          title: blueprint.title,
          subtitle: blueprint.subtitle,
          category: 'FREE GUIDE',
          author: 'Studio37',
          year: String(new Date().getFullYear()),
        },
      },
      {
        type: 'body-text',
        data: {
          content: `${blueprint.intro}\n\nYou will get a simple framework, what-to-prepare checklist, and a rollout plan you can actually use.`,
        },
      },
      {
        type: 'section-header',
        data: {
          number: '01',
          title: 'Set Your Baseline',
          description: 'Before changing anything, establish where performance stands today.',
        },
      },
      {
        type: 'bullets',
        data: {
          heading: blueprint.checklistHeading,
          items: blueprint.checklist,
        },
      },
      {
        type: 'bullets',
        data: {
          heading: decisionSupportHeading,
          items: decisionSupportItems,
        },
      },
      {
        type: 'tip-box',
        data: {
          label: 'PRO TIP',
          content: isClientPrepGuide
            ? 'Great images come from calm energy. Keep prep simple, arrive early, and focus on connection over perfect posing.'
            : 'Avoid changing everything at once. Keep one control version and run focused improvements in weekly cycles.',
        },
      },
      {
        type: 'section-header',
        data: {
          number: '02',
          title: blueprint.sectionTwo,
          description: blueprint.sectionTwoDesc,
        },
      },
      {
        type: 'feature-cards',
        data: {
          heading: blueprint.pillarsHeading,
          cards: blueprint.pillars,
        },
      },
      {
        type: 'section-header',
        data: {
          number: '03',
          title: blueprint.sectionThree,
          description: blueprint.sectionThreeDesc,
        },
      },
      {
        type: 'bullets',
        data: {
          heading: sectionThreeBulletsHeading,
          items: sectionThreeBullets,
        },
      },
      {
        type: 'stats-row',
        data: {
          stats: statsData,
        },
      },
      {
        type: 'quote-callout',
        data: {
          quote: quoteText,
          author: quoteAuthor,
        },
      },
      {
        type: 'cta',
        data: {
          heading: ctaHeading,
          subtext: ctaSubtext,
          buttonText: 'Book a Consultation',
          buttonUrl: 'https://studio37.cc/book-consultation',
        },
      },
    ]
  }

  return [
    {
      type: 'cover',
      data: {
        title: blueprint.title,
        subtitle: blueprint.subtitle,
        category: 'MARKETING TIP',
      },
    },
    {
      type: 'body-text',
      data: {
        content: `If you improve one thing first, improve clarity. Clear message + clear next step = stronger lead quality and better client outcomes.`,
      },
    },
    {
      type: 'bullets',
      data: {
        heading: 'Try this today',
        items: [
          'Define one measurable outcome for this week',
          'Rewrite your headline to state a concrete benefit',
          'Use one CTA everywhere to reduce friction',
          'Track response rate before and after the change',
        ],
      },
    },
    {
      type: 'cta',
      data: {
        heading: 'Need help implementing this fast?',
        subtext: 'We can map this into a done-for-you growth plan.',
        buttonText: 'Book a Consultation',
        buttonUrl: 'https://studio37.cc/book-consultation',
      },
    },
  ]
}

function getServiceContextLabel(serviceContext: ServiceContext) {
  switch (serviceContext) {
    case 'branding-marketing':
      return 'Branding & Marketing services'
    case 'portrait-photography':
      return 'Portrait Photography services'
    case 'event-photography':
      return 'Event Photography services'
    case 'wedding-photography':
      return 'Wedding Photography services'
    case 'commercial-photography':
      return 'Commercial Photography services'
    default:
      return 'the service context from the topic brief'
  }
}

function getAudienceGuidance(audience: string, serviceContext: ServiceContext) {
  const hasAudience = typeof audience === 'string' && audience.trim().length > 0
  if (hasAudience) return audience.trim()

  switch (serviceContext) {
    case 'wedding-photography':
      return 'engaged couples, brides, grooms, and family decision-makers'
    case 'portrait-photography':
      return 'families, parents, graduates, and individuals booking portrait sessions'
    case 'event-photography':
      return 'event planners, hosts, and people organizing private or corporate events'
    case 'commercial-photography':
      return 'business owners, marketing teams, and brand managers'
    case 'branding-marketing':
      return 'business owners and marketing leads seeking growth support'
    default:
      return 'leads and existing clients, including families, couples, and business owners depending on the topic'
  }
}

function sanitizeBlocks(blocks: any[]) {
  const allowedTypes = new Set([
    'cover',
    'section-header',
    'body-text',
    'bullets',
    'feature-cards',
    'stats-row',
    'quote-callout',
    'tip-box',
    'cta',
    'divider',
    'spacer',
  ])

  return (Array.isArray(blocks) ? blocks : [])
    .filter((b) => b && typeof b.type === 'string' && allowedTypes.has(b.type))
    .slice(0, 20)
    .map((b, i) => ({
      id: `block-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
      type: b.type as string,
      data: b.data && typeof b.data === 'object' ? b.data : {},
    }))
}

function extractBlockText(block: any): string {
  if (!block || typeof block !== 'object') return ''
  const data = block.data || {}
  const parts: string[] = []
  for (const value of Object.values(data)) {
    if (typeof value === 'string') parts.push(value)
    if (Array.isArray(value)) {
      value.forEach((v: any) => {
        if (typeof v === 'string') parts.push(v)
        if (v && typeof v === 'object') {
          Object.values(v).forEach((sv: any) => {
            if (typeof sv === 'string') parts.push(sv)
          })
        }
      })
    }
  }
  return parts.join(' ').toLowerCase()
}

function shouldFallbackForQuality(rawBlocks: any[], topic: string) {
  if (!Array.isArray(rawBlocks) || rawBlocks.length === 0) return true
  const fullText = rawBlocks.map(extractBlockText).join(' ')
  const normalizedTopic = topic.trim().toLowerCase()

  // If the AI mirrors a long, unedited prompt directly into copy, fallback.
  if (normalizedTopic.length > 40 && fullText.includes(normalizedTopic)) {
    return true
  }

  // Require at least some practical signal words.
  const hasPracticalSignal = /(checklist|timeline|steps|prepare|deliverables|outcomes|kpi|plan|session|coverage)/i.test(fullText)
  if (!hasPracticalSignal) return true

  return false
}

export async function POST(req: NextRequest) {
  try {
    const { topic, audience, tone, format, serviceContext } = await req.json()
    if (!topic) return NextResponse.json({ error: 'topic is required' }, { status: 400 })

    const normalizedServiceContext: ServiceContext = [
      'auto',
      'branding-marketing',
      'portrait-photography',
      'event-photography',
      'wedding-photography',
      'commercial-photography',
    ].includes(serviceContext)
      ? serviceContext
      : 'auto'

    const normalizedFormat: SupportedFormat = VALID_FORMATS.includes(format)
      ? format
      : 'pdf-guide'

    const audienceProfile = getAudienceGuidance(audience, normalizedServiceContext)
    const serviceLabel = getServiceContextLabel(normalizedServiceContext)

    const isPDF = normalizedFormat === 'pdf-guide'

    const blockDocs = isPDF
      ? `Available block types for PDF guides:
- cover: { title, subtitle, category (e.g. "FREE GUIDE"), author, year }
- section-header: { number (string "01","02"...), title, description }
- body-text: { content (plain paragraphs, use \\n\\n for breaks) }
- bullets: { heading (optional), items: string[] (4-7 items) }
- feature-cards: { heading, cards: [{ icon (single emoji), title, description }] (2-4 cards) }
- stats-row: { stats: [{ value, label }] (2-3 stats) }
- quote-callout: { quote, author (optional) }
- tip-box: { label ("PRO TIP" or "KEY INSIGHT" or "IMPORTANT"), content }
- cta: { heading, subtext, buttonText, buttonUrl }
- divider: {}
- spacer: { height: 24 }

Create 10-16 blocks for a complete, content-rich guide. Structure:
  cover → body-text (intro) → section-header + content blocks (repeat 3-5 sections) → stats-row → quote-callout → cta`
      : `Available block types for social posts:
- cover: { title (short, punchy), subtitle (1 line), category (2-3 word label) }
- bullets: { heading (optional), items: string[] (3-5 very short items, max 8 words each) }
- stats-row: { stats: [{ value, label }] (2-3 stats) }
- quote-callout: { quote (max 25 words), author (optional) }
- body-text: { content (1-2 punchy sentences max) }
- cta: { heading (short), subtext (1 line), buttonText, buttonUrl }

Create 3-6 blocks. Keep ALL copy VERY SHORT — this is a visual post, not an article.
Always start with cover. For stories/square: cover → bullets or stats → cta.`

    const systemPrompt = `You are an expert content strategist and conversion copywriter creating ${isPDF ? 'a PDF guide' : 'a social media post'} for Studio37, a photography & marketing agency in Pinehurst, TX.

The content TOPIC is defined by the user's input — do NOT default to photography unless the topic asks for it.
For an SEO guide → write SEO content. For a branding post → write branding content. Etc.

Brand voice: ${tone || 'professional, helpful, confidence-building'}

CONTENT QUALITY RULES (CRITICAL):
- Write practical, specific, expert-level guidance.
- Avoid fluff, vague claims, and generic filler.
- Include real implementation steps, not just theory.
- Prefer action verbs, checklists, and measurable outcomes.
- Include concrete numbers/timeframes where reasonable.
- Never output weak placeholders like "just be consistent" without follow-up specifics.
- Never include irrelevant photography references unless topic explicitly asks for photography.
- For CTA copy: keep concise and business-relevant.
- Rewrite the user's topic into polished, grammatical titles/subheads.
- NEVER copy raw user prompt text verbatim into body copy if it is long or ungrammatical.
- Never produce awkward phrasing like "guide for ... get ... done"; always rewrite into professional English.

LEADS + CLIENTS USEFULNESS RULES (CRITICAL):
- Content must be immediately useful to leads and existing clients.
- Include at least one "what to prepare" or "next steps" checklist.
- Include at least one "decision support" section (questions to ask, mistakes to avoid, scope clarity, timeline expectations).
- Explain outcomes, timeline, and tradeoffs in plain language.
- Keep content practical enough that a client could apply it the same day.

AUDIENCE + SERVICE ADAPTATION RULES (CRITICAL):
- Service context for this request: ${serviceLabel}
- Audience profile for this request: ${audienceProfile}
- Adapt language, examples, objections, and CTAs to this audience.
- If topic is weddings/portraits/events, write for real client buyers (e.g., brides, families, hosts), not generic marketers.
- If topic is branding/commercial/marketing, write for business decision-makers.
- For portrait/wedding/event prep guides, prioritize practical client prep:
  - what to wear
  - what to bring
  - timeline planning
  - how to prepare kids/guests/family members
  - what to expect after the session/event
- Avoid business KPI and marketing-jargon sections unless the service context is branding/commercial.

${blockDocs}

CRITICAL: Return ONLY a valid JSON array of blocks. No markdown fences, no commentary, no wrapper object.
Format: [{ "type": "cover", "data": { ... } }, { "type": "section-header", "data": { ... } }, ...]`

    const userPrompt = `Create content for:
Topic: ${topic}
  Target audience: ${audienceProfile}
  Service context: ${serviceLabel}
Format: ${normalizedFormat}
Tone: ${tone || 'professional, helpful, confidence-building'}`

    let rawBlocks: any[] = []
    try {
      rawBlocks = await generateJSON<any[]>(`${systemPrompt}\n\n${userPrompt}`)
    } catch (aiErr: any) {
      logger.warn('AI generateJSON failed, using fallback blocks', {
        error: aiErr?.message,
        format: normalizedFormat,
        topic,
      })
      rawBlocks = buildFallbackBlocks(topic, normalizedFormat, audienceProfile, normalizedServiceContext)
    }

    if (shouldFallbackForQuality(rawBlocks, topic)) {
      logger.warn('AI output low quality, switching to guided fallback blocks', {
        format: normalizedFormat,
        topic,
        serviceContext: normalizedServiceContext,
      })
      rawBlocks = buildFallbackBlocks(topic, normalizedFormat, audienceProfile, normalizedServiceContext)
    }

    const sanitized = sanitizeBlocks(rawBlocks)

    if (sanitized.length === 0) {
      const fallbackSanitized = sanitizeBlocks(buildFallbackBlocks(topic, normalizedFormat, audienceProfile, normalizedServiceContext))
      if (fallbackSanitized.length > 0) {
        return NextResponse.json({ blocks: fallbackSanitized })
      }
      return NextResponse.json({ error: 'AI returned no valid blocks' }, { status: 500 })
    }

    return NextResponse.json({ blocks: sanitized })
  } catch (err: any) {
    logger.error('Content studio generate failed', { error: err?.message })
    return NextResponse.json({ error: err?.message || 'Generation failed' }, { status: 500 })
  }
}
