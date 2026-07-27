import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { getClientIp, rateLimit } from '@/lib/rateLimit'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/chat/feedback')

const FeedbackSchema = z.object({
  rating: z.enum(['good', 'bad']),
  userMessage: z.string().max(2000).optional(),
  botResponse: z.string().max(4000),
  intent: z.string().max(80).optional(),
  pageUrl: z.string().max(500).optional(),
  notes: z.string().max(1000).optional(),
})

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers)
  const rl = rateLimit(`chat-feedback:${ip}`, { limit: 20, windowMs: 60 * 1000 })
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Too many feedback requests' }, { status: 429 })
  }

  const parsed = FeedbackSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid feedback payload' }, { status: 400 })
  }

  try {
    const { error } = await supabaseAdmin.from('chatbot_feedback').insert({
      rating: parsed.data.rating,
      user_message: parsed.data.userMessage || null,
      bot_response: parsed.data.botResponse,
      intent: parsed.data.intent || null,
      page_url: parsed.data.pageUrl || null,
      notes: parsed.data.notes || null,
    })

    if (error) {
      log.warn('Chatbot feedback table unavailable', { error: error.message })
      return NextResponse.json({ success: true, stored: false })
    }

    return NextResponse.json({ success: true, stored: true })
  } catch (error: any) {
    log.warn('Chatbot feedback skipped', { error: error?.message })
    return NextResponse.json({ success: true, stored: false })
  }
}
