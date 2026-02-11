import { NextRequest, NextResponse } from 'next/server'
import { Buffer } from 'buffer'
import { AI_CONFIGS, AI_MODELS, MODEL_FALLBACKS, createAIClient } from '@/lib/ai-client'
import { createLogger } from '@/lib/logger'
import { getClientIp, rateLimit } from '@/lib/rateLimit'

const log = createLogger('api/leads/from-screenshot')
const MAX_FILE_SIZE = 8 * 1024 * 1024 // 8 MB guardrail for screenshots
const MAX_RETRIES = 2

type ExtractedLead = {
  name: string
  email: string
  phone?: string
  service_interest?: string
  event_date?: string
  budget_range?: string
  message: string
  source: string
  location?: string
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function generateVisionJSON(params: {
  prompt: string
  base64: string
  mimeType: string
  systemInstruction: string
}) {
  const candidates = [AI_MODELS.VISION, ...MODEL_FALLBACKS].filter(
    (v, i, arr) => !!v && arr.indexOf(v) === i
  )

  let lastError: any

  for (const candidate of candidates) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const model = createAIClient({
          model: candidate,
          config: { ...AI_CONFIGS.structured, responseMimeType: 'application/json', maxOutputTokens: 1500 },
          systemInstruction: params.systemInstruction
        })

        const result = await model.generateContent([
          { text: params.prompt },
          {
            inlineData: {
              data: params.base64,
              mimeType: params.mimeType
            }
          }
        ])

        const raw = result.response.text().trim()
        if (candidate !== AI_MODELS.VISION) {
          log.info('Vision model fallback used', { candidate })
        }
        return raw
      } catch (error: any) {
        lastError = error
        const errorMsg = String(error?.message || error || '')

        if (
          error?.status === 404 ||
          /model(.+)?not (found|available|supported)/i.test(errorMsg)
        ) {
          log.warn('Vision model unavailable, trying next fallback', { candidate, error: errorMsg })
          break
        }

        if ((error?.status === 429 || /rate limit/i.test(errorMsg)) && attempt < MAX_RETRIES) {
          const waitTime = 800 * Math.pow(2, attempt - 1)
          await sleep(waitTime)
          continue
        }

        if ((error?.status >= 500 || /timeout/i.test(errorMsg)) && attempt < MAX_RETRIES) {
          const waitTime = 800 * Math.pow(2, attempt - 1)
          await sleep(waitTime)
          continue
        }

        log.error('Vision extraction failed', { candidate, error: errorMsg })
        break
      }
    }
  }

  throw lastError || new Error('AI vision extraction failed')
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
    const mode = String(formData.get('mode') || 'screenshot')
    const isBusinessCard = mode === 'business-card'

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Image file is required.' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File is too large. Please upload images under 8MB.' }, { status: 413 })
    }

    const mimeType = file.type || 'image/jpeg'
    const buffer = Buffer.from(await file.arrayBuffer())
    const base64 = buffer.toString('base64')

    const systemInstruction = 'You are a careful data-entry assistant. Extract only real lead/contact details visible in the image and respond with COMPLETE valid JSON only. Do not truncate or omit fields.'

    const prompt = isBusinessCard
      ? `Extract contact details from the provided business card photo.
Source hint: ${sourceHint}
Additional context from the admin: ${notes || 'None provided'}

Return ONLY valid JSON with this exact shape:
{
  "name": string | null,
  "email": string | null,
  "phone": string | null,
  "company": string | null,
  "title": string | null,
  "website": string | null,
  "location": string | null, // address or city/state
  "message": string, // short summary of the contact + company
  "source": string // e.g., business-card, referral, event
}

Rules:
- Do not fabricate contact info that is not visible.
- Normalize phone numbers to digits and symbols only (e.g., +1-212-555-1234).
- Keep values concise without labels.
- If a field is not visible, return null.
- message should briefly describe who the contact is and where the card came from.`
      : `Extract lead/contact details from the provided screenshot of a lead platform.
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
  "location": string | null, // city, state, venue, or address
  "message": string, // at least 12 words summarizing the request/quote details
  "source": string // e.g., thumbtack, bark, weddingwire, facebook, screenshot-import
}

Rules:
- Do not fabricate contact info that is not visible.
- Normalize phone numbers to digits and symbols only (e.g., +1-212-555-1234).
- Keep values concise without labels.
- message must summarize what the lead wants (service type, timing, budget hints if present).`

    const raw = await generateVisionJSON({
      prompt,
      base64,
      mimeType,
      systemInstruction
    })

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
      location: (parsed.location || parsed.city || parsed.venue || parsed.address || '').toString().trim(),
      message: (parsed.message || '').toString().trim(),
      source: (parsed.source || sourceHint || 'screenshot-import').toString().trim() || 'screenshot-import'
    }

    if (!extracted.message || extracted.message.length < 12) {
      if (isBusinessCard) {
        const company = (parsed.company || parsed.organization || parsed.business || '').toString().trim()
        const title = (parsed.title || parsed.role || parsed.position || '').toString().trim()
        const website = (parsed.website || parsed.url || parsed.site || '').toString().trim()

        const parts = ['Business card']
        if (extracted.name) parts.push(`from ${extracted.name}`)
        if (company) parts.push(`at ${company}`)
        if (title) parts.push(`(${title})`)
        if (website) parts.push(`Website: ${website}.`)
        if (notes) parts.push(`Notes: ${notes}`)

        extracted.message = parts.join(' ')
        extracted.source = extracted.source || 'business-card'
      } else {
        extracted.message = `Imported from screenshot (${extracted.source}).` + (notes ? ` Notes: ${notes}` : '')
      }
    }

    log.info('Lead data extracted from screenshot', {
      source: extracted.source,
      hasEmail: Boolean(extracted.email),
      hasPhone: Boolean(extracted.phone)
    })

    return NextResponse.json({ extracted, raw })
  } catch (error: any) {
    const errorMsg = String(error?.message || error || '')
    log.error('Screenshot extraction failed', undefined, error)

    if (/Missing GOOGLE_API_KEY|Missing GEMINI_API_KEY/i.test(errorMsg)) {
      return NextResponse.json({ error: 'AI service is not configured. Please set the Gemini API key.' }, { status: 500 })
    }

    return NextResponse.json({ error: 'Failed to extract lead data', details: error?.message }, { status: 500 })
  }
}
