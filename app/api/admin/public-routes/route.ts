import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { collectPublicPageRoutes } from '@/lib/admin-public-routes'

export const dynamic = 'force-dynamic'

export async function GET() {
  const authed = await isAuthenticated()
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  return NextResponse.json({ routes: collectPublicPageRoutes() })
}
