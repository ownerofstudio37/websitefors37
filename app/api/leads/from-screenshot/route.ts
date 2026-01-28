import { NextRequest, NextResponse } from 'next/server'
import { Buffer } from 'buffer'
import { AI_CONFIGS, AI_MODELS, createAIClient } from '@/lib/ai-client'
import { createLogger } from '@/lib/logger'
import { getClientIp, rateLimit } from '@/lib/rateLimit'

const log = createLogger('api/leads/from-screenshot')
const MAX_FILE_SIZE = 8 * 1024 * 1024 // 8 MB guardrail for screenshots

type ExtractedLead = {
  name: string
  email: string
  phone?: string
  service_interest?: string
  event_date?: string
  budget_range?: string
  message: string
  source: string
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers)
    const rl = rateLimit(`lead-screenshot:${ip}`, { limit: 12, windowMs: 60 * 1000 })
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please slow down.' }, { status: 429 })
    }

    const formData = await req.formData()
    const file = formData.get('file')
    const sourceHint = String(formData.get('source') || 'screenshot-import')
    const notes = String(formData.get('notes') || '')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Image file is required.' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File is too large. Please upload images under 8MB.' }, { status: 413 })
    }

    const mimeType = file.type || 'image/jpeg'
    const buffer = Buffer.from(await file.arrayBuffer())
    const base64 = buffer.toString('base64')

    const model = createAIClient({
      model: AI_MODELS.VISION,
      config: { ...AI_CONFIGS.structured, responseMimeType: 'application/json', maxOutputTokens: 1500 },
      systemInstruction: 'You are a careful data-entry assistant. Extract only real lead/contact details visible in the screenshot and respond with COMPLETE valid JSON only. Do not truncate or omit fields.'
    })

    const prompt = `Extract lead/contact details from the provided screenshot of a lead platform.
Source hint: ${sourceHint}
Additional context from the admin: ${notes || 'None provided'}

Return ONLY valid JSON with this exact shape:
{
  "name": string | null,
  "email": string | null,
  "phone": string | null,
  "service_interest": string | null,
  "event_date": string | null,
  "budget_range": string | null,
  "message": string, // at least 12 words summarizing the request/quote details
  "source": string // e.g., thumbtack, bark, weddingwire, facebook, screenshot-import
}

Rules:
- Do not fabricate contact info that is not visible.
- Normalize phone numbers to digits and symbols only (e.g., +1-212-555-1234).
- Keep values concise without labels.
- message must summarize what the lead wants (service type, timing, budget hints if present).`

    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          data: base64,
          mimeType
        }
      }
    ])

    const raw = result.response.text().trim()

    let parsed: any
    try {
      parsed = JSON.parse(raw)
    } catch (error) {
      // Try to fix incomplete JSON by closing any open structures
      log.warn('Failed to parse AI JSON, attempting repair', { raw, error: String(error) })
      
      let repaired = raw
      // Close any unclosed objects
      if (raw.includes('{') && !raw.endsWith('}')) {
        const openBraces = (raw.match(/{/g) || []).length
        const closeBraces = (raw.match(/}/g) || []).length
        repaired = raw + '}'.repeat(openBraces - closeBraces)
      }
      
      try {
        parsed = JSON.parse(repaired)
      } catch (retryError) {
        log.error('Failed to repair and parse AI JSON', { raw, repaired }, retryError)
        return NextResponse.json({ error: 'Could not read data from screenshot. The AI response was incomplete. Please try again.' }, { status: 500 })
      }
    }

    const extracted: ExtractedLead = {
      name: (parsed.name || '').toString().trim(),
      email: (parsed.email || '').toString().trim(),
      phone: (parsed.phone || '').toString().trim(),
      service_interest: (parsed.service_interest || parsed.service || '').toString().trim(),
      event_date: (parsed.event_date || parsed.date || '').toString().trim(),
      budget_range: (parsed.budget_range || parsed.budget || '').toString().trim(),
      message: (parsed.message || '').toString().trim(),
      source: (parsed.source || sourceHint || 'screenshot-import').toString().trim() || 'screenshot-import'
    }

    if (!extracted.message || extracted.message.length < 12) {
      extracted.message = `Imported from screenshot (${extracted.source}).` + (notes ? ` Notes: ${notes}` : '')
    }

    log.info('Lead data extracted from screenshot', {
      source: extracted.source,
      hasEmail: Boolean(extracted.email),
      hasPhone: Boolean(extracted.phone)
    })

    return NextResponse.json({ extracted, raw })
  } catch (error: any) {
    log.error('Screenshot extraction failed', undefined, error)
    return NextResponse.json({ error: 'Failed to extract lead data', details: error?.message }, { status: 500 })
  }
}
