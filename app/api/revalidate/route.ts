import { NextRequest, NextResponse } from 'next/server'
import { createLogger } from '@/lib/logger'
import { rateLimit, getClientIp } from '@/lib/rateLimit'
import { revalidatePath, revalidateTag } from 'next/cache'

// Secure on-demand revalidation endpoint
// IMPORTANT: This should be triggered only by admin users or a build hook.
// Avoid calling it from arbitrary client code. If you expose a button, ensure admin session cookie is present.

const log = createLogger('api/revalidate')

const ALLOWED_ORIGINS = [
  'https://studio37.cc',
  'https://www.studio37.cc'
]

function corsHeaders(origin?: string) {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  }
  return {
    'Access-Control-Allow-Origin': 'https://studio37.cc',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
}

// Basic admin auth: require secret header OR existing admin session cookie validated by middleware
// For stronger security, set REVALIDATE_SECRET and send it in x-revalidate-secret header.
function validateAuth(req: NextRequest): boolean {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) {
    // Fallback: rely on admin session cookie already enforced by middleware protecting /admin/**
    // If this endpoint is not protected by middleware, add a secret.
    return true
  }
  const provided = req.headers.get('x-revalidate-secret')
  return provided === secret
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || undefined
  return new NextResponse(null, { headers: corsHeaders(origin) })
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin') || undefined
  const ip = getClientIp(request.headers)
  const rl = rateLimit(`revalidate:${ip}`, { limit: 20, windowMs: 60 * 1000 })
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429, headers: corsHeaders(origin) })
  }

  if (!validateAuth(request)) {
    log.warn('Unauthorized revalidate attempt', { ip })
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders(origin) })
  }

  let body: any = {}
  try {
    body = await request.json()
  } catch {
    // allow empty body
  }

  const { paths = [], tags = [] } = body || {}
  const revalidated: { paths: string[]; tags: string[] } = { paths: [], tags: [] }
  const errors: string[] = []

  // Revalidate paths
  for (const p of paths) {
    try {
      if (typeof p === 'string' && p.startsWith('/')) {
        revalidatePath(p)
        revalidated.paths.push(p)
      } else {
        errors.push(`Invalid path: ${p}`)
      }
    } catch (e: any) {
      errors.push(`Path ${p} failed: ${e?.message || e}`)
    }
  }

  // Revalidate tags
  for (const t of tags) {
    try {
      if (typeof t === 'string' && t.length > 0) {
        revalidateTag(t)
        revalidated.tags.push(t)
      } else {
        errors.push(`Invalid tag: ${t}`)
      }
    } catch (e: any) {
      errors.push(`Tag ${t} failed: ${e?.message || e}`)
    }
  }

  log.info('Revalidate request', { ip, revalidated, errors })

  return NextResponse.json({ success: true, revalidated, errors }, { status: 200, headers: corsHeaders(origin) })
}
 import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/revalidate')

// Simple bearer token auth for on-demand revalidation
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'change-me-in-production'

// CORS headers for admin panel
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(req: NextRequest) {
  try {
    // Check authorization - allow both Bearer token and cookie-based admin sessions
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    // Allow if valid token OR if coming from same origin (admin panel)
    const isValidToken = token === REVALIDATE_SECRET
    const isSameOrigin = req.headers.get('origin')?.includes(req.headers.get('host') || '') || 
                         !req.headers.get('origin') // Same-origin requests may not have Origin header
    
    if (!isValidToken && !isSameOrigin) {
      log.warn('Unauthorized revalidation attempt', { 
        origin: req.headers.get('origin'),
        hasToken: !!token 
      })
      return NextResponse.json({ error: 'Unauthorized' }, { 
        status: 401,
        headers: corsHeaders 
      })
    }

    const body = await req.json()
    const { path, tag, type = 'path' } = body

    if (type === 'path' && path) {
      revalidatePath(path)
      log.info('Revalidated path', { path })
      return NextResponse.json({ revalidated: true, path }, { headers: corsHeaders })
    }

    if (type === 'tag' && tag) {
      revalidateTag(tag)
      log.info('Revalidated tag', { tag })
      return NextResponse.json({ revalidated: true, tag }, { headers: corsHeaders })
    }

    log.warn('Invalid revalidation request', { body })
    return NextResponse.json({ error: 'Invalid request. Provide path or tag.' }, { 
      status: 400,
      headers: corsHeaders 
    })
  } catch (err) {
    log.error('Revalidation failed', undefined, err)
    return NextResponse.json({ error: 'Internal server error' }, { 
      status: 500,
      headers: corsHeaders 
    })
  }
}
