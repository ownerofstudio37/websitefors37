import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase
      .from('client_projects')
      .select('*')
      .eq('client_user_id', params.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, projects: data || [] })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to fetch projects' }, { status: 500 })
  }
}
