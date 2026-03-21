import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createLogger } from '@/lib/logger'
import { getClientIp, rateLimit } from '@/lib/rateLimit'
import { authErrorResponse, requireAdminRole } from '@/lib/admin-auth'
import { generateBlogPost, generateEmailContent, generateJSON, type EmailContentBlock } from '@/lib/ai-client'

const log = createLogger('api/admin/ai-assistant')

const RequestSchema = z.object({
  taskType: z.enum(['blog-post', 'lead-outreach', 'page-blueprint']),
  prompt: z.string().min(8).max(4000),
  saveDraft: z.boolean().optional().default(false),
  options: z.record(z.any()).optional(),
})

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

async function createUniqueBlogSlug(title: string) {
  const supabase = getSupabaseAdmin()
  const base = slugify(title) || `blog-${Date.now()}`
  let slug = base
  let n = 1

  while (true) {
    const { data } = await supabase.from('blog_posts').select('id').eq('slug', slug).maybeSingle()
    if (!data) return slug
    n += 1
    slug = `${base}-${n}`
  }
}

function fallbackBlogPost(prompt: string, keywords: string[], tone: string) {
  const title = `Studio37 Guide: ${prompt.slice(0, 60).trim()}`
  const excerpt = `A practical Studio37 draft focused on ${keywords.slice(0, 3).join(', ')}.`
  const content = `## Overview\n\n${prompt}\n\n## What to Include\n\n- Audience goal\n- Session context\n- Clear CTA\n\n## Studio37 Recommendations\n\nUse a ${tone} tone, include local context, and end with a clear booking action.`

  return {
    title,
    metaDescription: excerpt.slice(0, 155),
    content,
    tags: keywords.slice(0, 6),
    category: 'guides',
    excerpt,
  }
}

function fallbackOutreachBlocks(prompt: string): EmailContentBlock[] {
  return [
    { type: 'logo', content: { tagline: 'Studio37 Photography' } },
    {
      type: 'hero',
      content: {
        title: 'A quick note from Studio37',
        subtitle: 'We would love to help capture your next milestone.',
        backgroundColor: '#1a1a1a',
        textColor: '#ffffff',
      },
    },
    {
      type: 'text',
      content: {
        text: `Hi {{firstName}},\n\n${prompt}\n\nIf you are open to it, we can share package options and availability this week.`,
      },
    },
    {
      type: 'button',
      content: {
        text: 'Book a Consultation',
        url: 'https://www.studio37.cc/book-a-session',
        backgroundColor: '#b46e14',
        textColor: '#ffffff',
        align: 'center',
      },
    },
    { type: 'social', content: {} },
    { type: 'footer', content: {} },
  ]
}

function fallbackBlueprint(prompt: string) {
  return {
    title: 'Photography Landing Page Blueprint',
    goal: 'Increase consultation bookings',
    sections: [
      {
        type: 'hero',
        title: 'Primary Value Proposition',
        purpose: 'Communicate who this is for and why Studio37 is different',
        keyContent: [prompt, 'Short trust signal', 'Primary CTA button'],
        cta: 'Book a Consultation',
      },
      {
        type: 'services',
        title: 'Packages & Services',
        purpose: 'Help visitors self-qualify quickly',
        keyContent: ['Top 3 offerings', 'Starting price anchor', 'What is included'],
      },
      {
        type: 'testimonials',
        title: 'Client Results',
        purpose: 'Build trust with proof',
        keyContent: ['2-3 testimonials', 'Star rating summary', 'Outcome highlights'],
      },
      {
        type: 'cta',
        title: 'Final Conversion Section',
        purpose: 'Capture lead intent',
        keyContent: ['Simple form', 'Response time promise'],
        cta: 'Request a Quote',
      },
    ],
    seo: {
      metaTitle: 'Studio37 Photography | Book Your Session',
      metaDescription: 'Professional photography with a streamlined booking experience.',
      targetKeywords: ['photography studio', 'book photography session'],
    },
    builderHints: ['Keep hero above the fold', 'Place primary CTA in hero and footer', 'Use real portfolio imagery'],
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdminRole('editor')

    const ip = getClientIp(request.headers)
    const rl = rateLimit(`admin-ai-assistant:${ip}`, { limit: 30, windowMs: 60 * 1000 })
    if (!rl.allowed) {
      return NextResponse.json({ success: false, error: 'Rate limit exceeded' }, { status: 429 })
    }

    const json = await request.json().catch(() => ({}))
    const parsed = RequestSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid request', details: parsed.error.flatten() }, { status: 400 })
    }

    const { taskType, prompt, saveDraft, options } = parsed.data
    const supabase = getSupabaseAdmin()

    if (taskType === 'blog-post') {
      const keywords = Array.isArray(options?.keywords)
        ? options.keywords
        : typeof options?.keywords === 'string'
        ? options.keywords.split(',').map((v: string) => v.trim()).filter(Boolean)
        : ['photography', 'studio37']

      const wordCount = Number(options?.wordCount || 900)
      const tone = (options?.tone as string) || 'professional and friendly'

      let post: any
      let usedFallback = false
      let aiError: string | null = null

      try {
        post = await generateBlogPost(prompt, keywords, wordCount, tone)
      } catch (err: any) {
        usedFallback = true
        aiError = err?.message || 'AI blog generation failed'
        post = fallbackBlogPost(prompt, keywords, tone)
      }

      let savedPost: any = null
      let saveError: string | null = null
      if (saveDraft) {
        const slug = await createUniqueBlogSlug(post.title)
        const { data, error } = await supabase
          .from('blog_posts')
          .insert({
            title: post.title,
            slug,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category || 'photography',
            tags: post.tags || [],
            meta_description: post.metaDescription,
            meta_keywords: keywords,
            published: false,
          })
          .select('*')
          .single()

        if (error) {
          saveError = error.message
          log.warn('AI assistant blog save failed', { error: error.message })
        } else {
          savedPost = data
        }
      }

      return NextResponse.json({
        success: true,
        taskType,
        output: {
          ...post,
          suggestedKeywords: keywords,
        },
        saved: !!savedPost,
        savedResource: savedPost,
        diagnostics: {
          ai: usedFallback ? 'fallback' : 'ok',
          aiError,
          storage: saveDraft ? (savedPost ? 'ok' : 'failed') : 'skipped',
          storageError: saveError,
        },
      })
    }

    if (taskType === 'lead-outreach') {
      let blocks: EmailContentBlock[] = []
      let usedFallback = false
      let aiError: string | null = null

      try {
        blocks = await generateEmailContent(prompt, {
          templateName: (options?.templateName as string) || 'AI Outreach Draft',
          category: 'outreach',
        })
      } catch (err: any) {
        usedFallback = true
        aiError = err?.message || 'AI outreach generation failed'
        blocks = fallbackOutreachBlocks(prompt)
      }

      let savedTemplate: any = null
      let saveError: string | null = null
      if (saveDraft) {
        const templateName = (options?.templateName as string) || 'AI Outreach Draft'
        const baseSlug = slugify(templateName) || 'ai-outreach-draft'

        let slug = baseSlug
        let i = 1
        while (true) {
          const { data } = await supabase.from('email_templates').select('id').eq('slug', slug).maybeSingle()
          if (!data) break
          i += 1
          slug = `${baseSlug}-${i}`
        }

        const { data, error } = await supabase
          .from('email_templates')
          .insert({
            name: templateName,
            slug,
            subject: (options?.subject as string) || 'A quick note from Studio37',
            category: 'outreach',
            html_content: '<p>Generated by AI Admin Assistant. Open in Visual Builder to render/update HTML.</p>',
            text_content: '',
            blocks_json: blocks,
            is_active: true,
            variables: ['firstName', 'email', 'serviceInterest'],
          })
          .select('*')
          .single()

        if (error) {
          saveError = error.message
          log.warn('AI assistant outreach save failed', { error: error.message })
        } else {
          savedTemplate = data
        }
      }

      return NextResponse.json({
        success: true,
        taskType,
        output: {
          blocks,
          suggestedSubject: (options?.subject as string) || 'A quick note from Studio37',
          note: 'Open the saved draft in Email Templates Visual Builder to review and send.',
        },
        saved: !!savedTemplate,
        savedResource: savedTemplate,
        diagnostics: {
          ai: usedFallback ? 'fallback' : 'ok',
          aiError,
          storage: saveDraft ? (savedTemplate ? 'ok' : 'failed') : 'skipped',
          storageError: saveError,
        },
      })
    }

    // page-blueprint
    const blueprintPrompt = `Create a detailed web page blueprint for a photography business admin builder.

User request:
${prompt}

Return strict JSON:
{
  "title": "page title",
  "goal": "primary business conversion goal",
  "sections": [
    {
      "type": "hero|services|gallery|testimonials|cta|faq|contact|custom",
      "title": "section title",
      "purpose": "why this section exists",
      "keyContent": ["bullet", "bullet"],
      "cta": "optional CTA text"
    }
  ],
  "seo": {
    "metaTitle": "",
    "metaDescription": "",
    "targetKeywords": ["", ""]
  },
  "builderHints": ["practical implementation hint"]
}`

    let blueprint: any
    let usedFallback = false
    let aiError: string | null = null

    try {
      blueprint = await generateJSON<any>(blueprintPrompt)
    } catch (err: any) {
      usedFallback = true
      aiError = err?.message || 'AI blueprint generation failed'
      blueprint = fallbackBlueprint(prompt)
    }

    return NextResponse.json({
      success: true,
      taskType,
      output: blueprint,
      saved: false,
      diagnostics: {
        ai: usedFallback ? 'fallback' : 'ok',
        aiError,
        storage: 'skipped',
      },
    })
  } catch (error: any) {
    if (error?.message === 'UNAUTHORIZED' || error?.message === 'FORBIDDEN') {
      return authErrorResponse(error)
    }
    log.error('AI Admin Assistant failed', undefined, error)
    return NextResponse.json({ success: false, error: error?.message || 'Assistant failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdminRole('editor')
    const supabase = getSupabaseAdmin()

    // Auth check
    const authStatus = user ? 'ok' : 'failed'

    // AI key check
    const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || ''
    const aiKeyStatus = apiKey.length > 10 ? 'ok' : 'missing'

    // DB connectivity check
    let dbStatus = 'ok'
    let dbError: string | null = null
    try {
      const { error } = await supabase.from('blog_posts').select('id').limit(1)
      if (error) { dbStatus = 'error'; dbError = error.message }
    } catch (e: any) {
      dbStatus = 'error'
      dbError = e?.message || 'DB check failed'
    }

    return NextResponse.json({
      ok: true,
      user: { email: user.email, role: user.role },
      diagnostics: {
        auth: authStatus,
        aiKey: aiKeyStatus,
        aiKeyHint: apiKey ? `${apiKey.slice(0, 6)}...` : 'not set',
        db: dbStatus,
        dbError,
        envModel: process.env.GOOGLE_GENAI_MODEL || process.env.GEMINI_MODEL || 'default (gemini-1.5-flash)',
      },
    })
  } catch (error: any) {
    if (error?.message === 'UNAUTHORIZED' || error?.message === 'FORBIDDEN') {
      return authErrorResponse(error)
    }
    return NextResponse.json({ ok: false, error: error?.message || 'Health check failed' }, { status: 500 })
  }
}
