import { NextRequest, NextResponse } from 'next/server'
import { Buffer } from 'buffer'
import { createAIClient, AI_CONFIGS } from '@/lib/ai-client'
import { getClientIp, rateLimit } from '@/lib/rateLimit'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/leads/extract')
const MAX_FILES = 5
const MAX_FILE_BYTES = 6 * 1024 * 1024 // 6 MB safety cap

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function extractEmail(raw: string) {
  const match = raw.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
  return match ? match[0] : undefined
}

function extractPhone(raw: string) {
  const match = raw.match(/(\+?1?[-.\s\(\)]?\d{3}[-.\s\)]?\d{3}[-.\s]?\d{4})/)
  return match ? match[0] : undefined
}

function normalizeLead(parsed: any, rawText: string, source: string | null, fileName: string) {
  const fallbackEmail = extractEmail(rawText)
  const fallbackPhone = extractPhone(rawText)

  return {
    name: parsed?.name || parsed?.full_name || '',
    email: parsed?.email || fallbackEmail || '',
    phone: parsed?.phone || parsed?.phone_number || fallbackPhone || '',
    service_interest: parsed?.service_interest || parsed?.service || 'General',
    budget_range: parsed?.budget_range || parsed?.budget || '',
    event_date: parsed?.event_date || parsed?.date || '',
    message: parsed?.message || parsed?.notes || 'Captured from screenshot',
    source: parsed?.source || source || 'thumbtack-screenshot',
    extracted_text: rawText || '',
    source_metadata: {
      fileName,
      platform: parsed?.platform || source || 'thumbtack',
      rawConfidence: parsed?.confidence || null,
      secondary_contacts: parsed?.additional_contacts || null,
    },
  }
}

async function parseScreenshot(file: File, source: string | null) {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const mimeType = file.type || 'image/jpeg'

  const prompt = `You are extracting lead details from a screenshot (e.g., Thumbtack lead inbox).
Return ONLY valid JSON with these keys:
{
  "name": string,
  "email": string | null,
  "phone": string | null,
  "service_interest": string | null,
  "budget_range": string | null,
  "event_date": string | null,
  "message": string | null,
  "source": string | null,
  "raw_text": string,
  "platform": string | null,
  "additional_contacts": string[] | null,
  "confidence": number | null
}
Keep punctuation as-is and avoid adding text not present. If a field is missing, use null. Do not wrap in markdown.`

  const model = createAIClient({
    model: 'gemini-2.5-flash',
    config: AI_CONFIGS.structured,
  })

  const imagePart = {
    inlineData: {
      data: buffer.toString('base64'),
      mimeType,
    },
  }

  const result = await model.generateContent([{ text: prompt }, imagePart])
  const text = result.response.text().trim()

  let parsed: any
  try {
    parsed = JSON.parse(text)
  } catch (err) {
    log.error('Failed to parse AI JSON', { text, file: file.name, err })
    throw new Error('AI returned invalid JSON')
  }

  const rawText = parsed.raw_text || parsed.rawText || ''
  return normalizeLead(parsed, rawText, source, file.name)
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers)
    const rl = rateLimit(`lead-extract:${ip}`, { limit: 5, windowMs: 5 * 60 * 1000 })
    if (!rl.allowed) {
      const retryAfter = Math.max(1, Math.ceil((rl.resetAt - Date.now()) / 1000))
      return new NextResponse(JSON.stringify({ error: 'Too many requests. Please wait and retry.' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Retry-After': String(retryAfter) },
      })
    }

    const formData = await req.formData()
    const files = formData.getAll('files').filter((f): f is File => f instanceof File)
    const source = (formData.get('source') as string | null) || null

    if (!files.length) {
      return NextResponse.json({ error: 'No files provided. Use form-data with files[]' }, { status: 400, headers: corsHeaders })
    }
    if (files.length > MAX_FILES) {
      return NextResponse.json({ error: `Too many files. Max ${MAX_FILES}.` }, { status: 400, headers: corsHeaders })
    }

    for (const f of files) {
      if (f.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: `${f.name} is too large. Max 6MB per file.` }, { status: 400, headers: corsHeaders })
      }
      if (!f.type.startsWith('image/')) {
        return NextResponse.json({ error: `${f.name} is not an image.` }, { status: 400, headers: corsHeaders })
      }
    }

    const results = [] as any[]
    for (const file of files) {
      try {
        const lead = await parseScreenshot(file, source)
        results.push({ file: file.name, lead })
      } catch (err: any) {
        log.error('Extraction failed', { file: file.name, error: err?.message })
        results.push({ file: file.name, error: err?.message || 'Extraction failed' })
      }
    }

    return NextResponse.json({ results }, { headers: corsHeaders })
  } catch (error: any) {
    log.error('Lead extraction error', { error: error?.message })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders })
  }
}
