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

function buildFallbackBlocks(topic: string, format: SupportedFormat, audienceProfile = 'leads and clients') {
  if (format === 'pdf-guide') {
    return [
      {
        type: 'cover',
        data: {
          title: topic,
          subtitle: 'Practical steps you can apply immediately',
          category: 'FREE GUIDE',
          author: 'Studio37',
          year: String(new Date().getFullYear()),
        },
      },
      {
        type: 'body-text',
        data: {
          content:
            `This practical guide helps ${audienceProfile} make better decisions about ${topic.toLowerCase()} and take the right next step.\n\nYou will get a simple framework, what-to-prepare checklist, and a rollout plan you can actually use.`,
        },
      },
      {
        type: 'section-header',
        data: {
          number: '01',
          title: 'Set Your Baseline',
          description: `Before changing anything, establish where ${topic.toLowerCase()} performance stands today.`,
        },
      },
      {
        type: 'bullets',
        data: {
          heading: 'Baseline Checklist',
          items: [
            'Define one primary conversion goal and 2 supporting KPIs',
            'Document your current funnel (traffic → lead → close)',
            'Identify your top 3 highest-intent audience segments',
            'Audit top pages/assets by engagement and conversion',
          ],
        },
      },
      {
        type: 'bullets',
        data: {
          heading: 'Questions to Ask Before You Hire',
          items: [
            'What outcomes can you realistically deliver in 30–60 days?',
            'What is included, excluded, and billed separately?',
            'How will progress be reported and how often?',
            'Who owns the assets, data, and deliverables?',
          ],
        },
      },
      {
        type: 'tip-box',
        data: {
          label: 'PRO TIP',
          content: 'Avoid changing everything at once. Keep one control version and run focused improvements in weekly cycles.',
        },
      },
      {
        type: 'section-header',
        data: {
          number: '02',
          title: 'Build a 30-Day Plan',
          description: 'Turn strategy into a repeatable execution system.',
        },
      },
      {
        type: 'feature-cards',
        data: {
          heading: 'Execution Pillars',
          cards: [
            { icon: '🧭', title: 'Positioning', description: 'Clarify your message and offer for each audience segment.' },
            { icon: '⚙️', title: 'Production', description: 'Use templates, SOPs, and weekly publishing cadence.' },
            { icon: '🧪', title: 'Optimization', description: 'Run one controlled test each week and keep the winner.' },
          ],
        },
      },
      {
        type: 'section-header',
        data: {
          number: '03',
          title: 'Measure and Improve',
          description: 'Track outcomes, protect budget, and scale what works.',
        },
      },
      {
        type: 'bullets',
        data: {
          heading: 'Weekly Optimization Actions',
          items: [
            'Review CTR, conversion rate, cost per lead, and close rate',
            'Keep a win/loss log for messaging and creative tests',
            'Double down on channels with best lead quality, not just volume',
            'Refresh weak CTAs and above-the-fold value proposition first',
          ],
        },
      },
      {
        type: 'stats-row',
        data: {
          stats: [
            { value: '1', label: 'Primary KPI' },
            { value: '3', label: 'Weekly Experiments' },
            { value: '30', label: 'Day Cycle' },
          ],
        },
      },
      {
        type: 'quote-callout',
        data: {
          quote: 'Execution beats intention. Build a system, measure what matters, and scale the proven wins.',
          author: 'Studio37 Strategy Team',
        },
      },
      {
        type: 'cta',
        data: {
          heading: 'Want this tailored to your business?',
          subtext: `We can turn this into a custom ${topic.toLowerCase()} plan with scope, timeline, and clear next steps for ${audienceProfile}.`,
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
        title: topic,
        subtitle: 'Actionable framework you can use today',
        category: 'MARKETING TIP',
      },
    },
    {
      type: 'body-text',
      data: {
        content: `If you improve only one part of ${topic.toLowerCase()}, improve clarity first. Clear message + clear next step = stronger lead quality.`,
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
      rawBlocks = buildFallbackBlocks(topic, normalizedFormat, audienceProfile)
    }

    const sanitized = sanitizeBlocks(rawBlocks)

    if (sanitized.length === 0) {
      const fallbackSanitized = sanitizeBlocks(buildFallbackBlocks(topic, normalizedFormat, audienceProfile))
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
