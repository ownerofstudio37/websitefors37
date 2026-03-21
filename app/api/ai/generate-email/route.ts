import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateEmailContent } from '@/lib/ai-client'
import { rateLimit, getClientIp } from '@/lib/rateLimit'
import { createLogger } from '@/lib/logger'
import { authErrorResponse, requireAdminRole } from '@/lib/admin-auth'

const log = createLogger('api/ai/generate-email')

const schema = z.object({
  prompt: z.string().min(10).max(1000),
  templateName: z.string().optional(),
  category: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)

  // Rate limit: 10 AI email generations per minute per IP
  const { success: rateLimitOk } = await rateLimit(ip, 'ai-email-gen', 10, 60)
  if (!rateLimitOk) {
    return NextResponse.json({ error: 'Rate limit exceeded. Please wait before generating again.' }, { status: 429 })
  }

  try {
    await requireAdminRole('editor')

    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request', details: parsed.error.flatten() }, { status: 400 })
    }

    const { prompt, templateName, category } = parsed.data
    log.info('Generating AI email template', { templateName, category, ip })

    const blocks = await generateEmailContent(prompt, { templateName, category })

    log.info('AI email template generated', { blockCount: blocks.length })
    return NextResponse.json({ success: true, blocks })
  } catch (err: any) {
    if (err?.message === 'UNAUTHORIZED' || err?.message === 'FORBIDDEN') {
      return authErrorResponse(err)
    }
    log.error('AI email generation failed', undefined, err)
    return NextResponse.json(
      { error: err?.message || 'AI generation failed. Ensure GOOGLE_API_KEY or GEMINI_API_KEY is set.' },
      { status: 500 }
    )
  }
}
