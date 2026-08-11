import { NextRequest, NextResponse } from 'next/server'
import { authErrorResponse, requireAdminRole } from '@/lib/admin-auth'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

const allowedTypes = new Set(['image_slots', 'recent_work', 'reviews', 'testimonials', 'cta_rules', 'turnaround'])

type PublicContentPayload = {
  key?: unknown
  content_type?: unknown
  value?: unknown
  notes?: unknown
  status?: unknown
}

export async function GET() {
  try {
    await requireAdminRole('editor')
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase
      .from('public_content_overrides')
      .select('key, content_type, value, notes, status, updated_at')
      .order('updated_at', { ascending: false })

    if (error) {
      const missingTable = error.code === '42P01'
      return NextResponse.json({ success: false, missingTable, overrides: [], error: error.message }, { status: missingTable ? 200 : 500 })
    }

    return NextResponse.json({ success: true, overrides: data || [] })
  } catch (error) {
    return authErrorResponse(error)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await requireAdminRole('editor')
    const body = await request.json()
    const overrides: PublicContentPayload[] = Array.isArray(body.overrides) ? body.overrides : []

    const rows = overrides
      .filter((item) => item?.key && typeof item.content_type === 'string' && allowedTypes.has(item.content_type))
      .map((item) => ({
        key: String(item.key),
        content_type: String(item.content_type),
        value: item.value,
        notes: item.notes ? String(item.notes) : null,
        status: item.status === 'draft' || item.status === 'archived' ? item.status : 'published',
        updated_by: admin.id,
      }))

    if (!rows.length) {
      return NextResponse.json({ success: false, error: 'No valid content overrides supplied.' }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('public_content_overrides')
      .upsert(rows, { onConflict: 'key' })
      .select('key, content_type, value, notes, status, updated_at')

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, overrides: data || [] })
  } catch (error) {
    return authErrorResponse(error)
  }
}
