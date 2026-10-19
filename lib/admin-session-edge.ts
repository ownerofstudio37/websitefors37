// Admin session check that runs in middleware (edge runtime: Web Crypto + fetch, no Node APIs).
// Mirrors lib/auth.ts getAdminUser(): the cookie holds an opaque token; admin_sessions stores its SHA-256.

const SESSION_DAYS = 30
// Extend an active session once it has less than this many days left, so regular use never logs you out.
const RENEW_BELOW_DAYS = 25
const CACHE_MS = 60_000

type CachedSession = { expiresAt: number; checkedAt: number }
const cache = new Map<string, CachedSession>()

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function supabaseHeaders() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  return { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }
}

export type SessionCheck = { valid: false } | { valid: true; expiresAt: Date; renewed: boolean }

// Fallback when the edge runtime can't see the service key: ask the Node session endpoint instead.
async function checkViaSessionRoute(origin: string, token: string): Promise<SessionCheck> {
  try {
    const res = await fetch(`${origin}/api/auth/session`, { headers: { cookie: `admin_session=${token}` }, cache: 'no-store' })
    return res.ok ? { valid: true, expiresAt: new Date(Date.now() + 86_400_000), renewed: false } : { valid: false }
  } catch {
    return { valid: false }
  }
}

export async function checkAdminSession(token: string | undefined, origin: string): Promise<SessionCheck> {
  if (!token || token.length < 32) return { valid: false }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url || !process.env.SUPABASE_SERVICE_ROLE_KEY) return checkViaSessionRoute(origin, token)

  const hash = await sha256Hex(token)
  const now = Date.now()
  const cached = cache.get(hash)
  if (cached && now - cached.checkedAt < CACHE_MS && cached.expiresAt > now) {
    return { valid: true, expiresAt: new Date(cached.expiresAt), renewed: false }
  }

  try {
    const res = await fetch(`${url}/rest/v1/admin_sessions?select=expires_at,revoked&token_hash=eq.${hash}&limit=1`, {
      headers: supabaseHeaders(),
      cache: 'no-store',
    })
    if (!res.ok) return checkViaSessionRoute(origin, token)
    const [row] = (await res.json()) as Array<{ expires_at: string; revoked: boolean }>
    if (!row || row.revoked) {
      cache.delete(hash)
      return { valid: false }
    }
    let expiresAt = new Date(row.expires_at).getTime()
    if (expiresAt <= now) {
      cache.delete(hash)
      return { valid: false }
    }

    let renewed = false
    if (expiresAt - now < RENEW_BELOW_DAYS * 86_400_000) {
      const next = new Date(now + SESSION_DAYS * 86_400_000).toISOString()
      const patch = await fetch(`${url}/rest/v1/admin_sessions?token_hash=eq.${hash}`, {
        method: 'PATCH',
        headers: { ...supabaseHeaders(), Prefer: 'return=minimal' },
        body: JSON.stringify({ expires_at: next, last_used_at: new Date(now).toISOString() }),
      })
      if (patch.ok) {
        expiresAt = new Date(next).getTime()
        renewed = true
      }
    }

    if (cache.size > 500) cache.clear()
    cache.set(hash, { expiresAt, checkedAt: now })
    return { valid: true, expiresAt: new Date(expiresAt), renewed }
  } catch {
    return checkViaSessionRoute(origin, token)
  }
}

export const ADMIN_SESSION_COOKIE = {
  name: 'admin_session',
  options: (expiresAt: Date) => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    // lax (not strict): links into the admin from email or other sites still carry the session.
    sameSite: 'lax' as const,
    path: '/',
    expires: expiresAt,
  }),
}
