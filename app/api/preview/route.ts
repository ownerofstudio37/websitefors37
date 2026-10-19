import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { getAdminUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// Turns on Next.js draft mode, then returns to the page. Public pages are static; draft mode is what lets
// an editor's ?edit=1 preview render the page fresh with draft blocks (middleware sends ?edit=1 here).
export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('path') || '/'
  // Same-site paths only.
  const path = raw.startsWith('/') && !raw.startsWith('//') ? raw : '/'
  // Drafts are for logged-in admins; anyone else just sees the published page.
  if (await getAdminUser()) draftMode().enable()
  return NextResponse.redirect(new URL(path, req.url))
}
