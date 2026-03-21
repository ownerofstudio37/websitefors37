import { NextResponse, NextRequest } from 'next/server'
import { generateJSON } from '@/lib/ai-client'
import { createLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'
export const maxDuration = 45

const logger = createLogger('content-studio-generate')

export async function POST(req: NextRequest) {
  try {
    const { topic, audience, tone, format } = await req.json()
    if (!topic) return NextResponse.json({ error: 'topic is required' }, { status: 400 })

    const isPDF = format === 'pdf-guide'
    const isSocial = ['instagram-square', 'instagram-story', 'facebook-post', 'linkedin-post'].includes(format)

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

    const systemPrompt = `You are an expert content designer and copywriter creating ${isPDF ? 'a PDF guide' : 'a social media post'} for Studio37, a photography & marketing agency in Pinehurst, TX.

The content TOPIC is defined by the user's input — do NOT default to photography unless the topic asks for it.
For an SEO guide → write SEO content. For a branding post → write branding content. Etc.

Brand voice: ${tone || 'professional, helpful, confidence-building'}

${blockDocs}

CRITICAL: Return ONLY a valid JSON array of blocks. No markdown fences, no commentary, no wrapper object.
Format: [{ "type": "cover", "data": { ... } }, { "type": "section-header", "data": { ... } }, ...]`

    const userPrompt = `Create content for:
Topic: ${topic}
Target audience: ${audience || 'small business owners and entrepreneurs'}
Format: ${format}
Tone: ${tone || 'professional, helpful, confidence-building'}`

    const blocks = await generateJSON<any[]>(
      `${systemPrompt}\n\n${userPrompt}`,
      { config: 'precise', maxOutputTokens: 4000 }
    )

    if (!Array.isArray(blocks)) {
      logger.error('AI did not return array', { format, topic })
      return NextResponse.json({ error: 'AI returned unexpected format' }, { status: 500 })
    }

    const allowedTypes = new Set([
      'cover', 'section-header', 'body-text', 'bullets', 'feature-cards',
      'stats-row', 'quote-callout', 'tip-box', 'cta', 'divider', 'spacer',
    ])

    const sanitized = blocks
      .filter(b => b && typeof b.type === 'string' && allowedTypes.has(b.type))
      .slice(0, 20)
      .map((b, i) => ({
        id: `block-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
        type: b.type as string,
        data: b.data && typeof b.data === 'object' ? b.data : {},
      }))

    if (sanitized.length === 0) {
      return NextResponse.json({ error: 'AI returned no valid blocks' }, { status: 500 })
    }

    return NextResponse.json({ blocks })
  } catch (err: any) {
    logger.error('Content studio generate failed', { error: err?.message })
    return NextResponse.json({ error: err?.message || 'Generation failed' }, { status: 500 })
  }
}
