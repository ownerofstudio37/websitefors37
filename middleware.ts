import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ADMIN_SESSION_COOKIE, checkAdminSession } from '@/lib/admin-session-edge'

// API routes anyone may call. Everything else under /api needs a valid admin session, so a route
// added later is private by default. Routes marked "own check" verify a secret or signature themselves.
const PUBLIC_API: Array<{ path: RegExp; methods?: string[] }> = [
  { path: /^\/api\/auth\/(login|logout|session|status)$/ },
  { path: /^\/api\/chat(\/respond|\/feedback)?$/ },
  { path: /^\/api\/availability$/, methods: ['GET'] },
  { path: /^\/api\/consultation\/book$/ },
  { path: /^\/api\/quote\/recommend$/ },
  { path: /^\/api\/galleries\/[^/]+\/(access|downloads|favorites)$/ },
  { path: /^\/api\/leads$/, methods: ['POST'] }, // contact and lead forms create leads only
  { path: /^\/api\/blog\/list$/, methods: ['GET'] },
  { path: /^\/api\/(vitals|health)$/ },
  { path: /^\/api\/og$/ },
  { path: /^\/api\/preview$/ }, // own check: only admins get draft mode
  { path: /^\/api\/revalidate$/ }, // own check: secret
  { path: /^\/api\/webhooks\// }, // own check: signature
  { path: /^\/api\/meta-leads$/ }, // own check: verify token + signature
  { path: /^\/api\/appointments\/send-reminders$/ }, // own check: CRON_SECRET
  { path: /^\/api\/leads\/follow-up$/ }, // own check: CRON_SECRET
  { path: /^\/api\/setup-admin$/ }, // own check: ADMIN_SETUP_TOKEN
  { path: /^\/api\/calendar\/callback$/ }, // Google OAuth redirect
]

const isPublicApi = (pathname: string, method: string) =>
  method === 'OPTIONS' || PUBLIC_API.some((rule) => rule.path.test(pathname) && (!rule.methods || rule.methods.includes(method)))

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get(ADMIN_SESSION_COOKIE.name)?.value

  const needsAdmin =
    (pathname.startsWith('/api/') && !isPublicApi(pathname, req.method)) ||
    (pathname.startsWith('/admin') && pathname !== '/admin/login')
  let renewedUntil: Date | null = null

  if (needsAdmin) {
    const session = await checkAdminSession(token, req.nextUrl.origin)
    if (!session.valid) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const loginUrl = new URL('/login', req.url)
      // Preserve original destination to return after login
      loginUrl.searchParams.set('next', `${pathname}${req.nextUrl.search}`)
      const redirect = NextResponse.redirect(loginUrl)
      if (token) redirect.cookies.delete(ADMIN_SESSION_COOKIE.name)
      return redirect
    }
    if (session.renewed) renewedUntil = session.expiresAt
  }

  // Editor previews (?edit=1) need draft mode so the static page renders fresh with draft blocks.
  // Only logged-in admins are sent there; everyone else just gets the normal page.
  if (
    req.nextUrl.searchParams.get('edit') === '1' &&
    token &&
    !req.cookies.has('__prerender_bypass') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/admin')
  ) {
    const previewUrl = new URL('/api/preview', req.url)
    previewUrl.searchParams.set('path', `${pathname}${req.nextUrl.search}`)
    return NextResponse.redirect(previewUrl)
  }

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-studio37-pathname', pathname)
  requestHeaders.set('x-studio37-search', req.nextUrl.search)

  // Default pass-through with essential security headers only (CORS handled per-route)
  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  // Active sessions are extended in place (see lib/admin-session-edge.ts), so the cookie follows.
  if (renewedUntil && token) res.cookies.set(ADMIN_SESSION_COOKIE.name, token, ADMIN_SESSION_COOKIE.options(renewedUntil))
  res.headers.set('X-DNS-Prefetch-Control', 'on')
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  // Do not attach CSP to XML/robots endpoints (sitemaps/robots should stay crawler-friendly)
  const isCrawlerMetadataRoute = pathname.endsWith('.xml') || pathname === '/robots.txt'
  if (!isCrawlerMetadataRoute) {
    // Content Security Policy - Allow Google Tag Manager, Thumbtack, PPA, Full Frame Insurance, and Simple Analytics images
    res.headers.set(
      'Content-Security-Policy',
      "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com https://*.supabase.co https://www.googletagmanager.com https://cdn.thumbtackstatic.com https://ppa.com https://www.ppa.com https://app.fullframeinsurance.com https://queue.simpleanalyticscdn.com https://hubspot-credentials-na1.s3.amazonaws.com;"
    )
  }
  
  return res
}

export const config = {
  matcher: [
    // Apply to all routes for headers
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // Ensure admin protection runs
    '/admin/:path*',
  ],
}
