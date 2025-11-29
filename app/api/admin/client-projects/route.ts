import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = getSupabaseAdmin()

    const payload = {
      client_user_id: body.client_user_id,
      name: body.name || 'New Project',
      type: body.type || 'portrait',
      description: body.description || null,
      status: body.status || 'pending',
      session_date: body.session_date || null,
      due_date: body.due_date || null,
      package_name: body.package_name || null,
      total_amount_cents: body.total_amount_cents || null,
      paid_amount_cents: body.paid_amount_cents || 0,
      payment_status: body.payment_status || 'pending',
      cover_image_url: body.cover_image_url || null,
      tags: body.tags || []
    }

    if (!payload.client_user_id) {
      return NextResponse.json({ success: false, error: 'client_user_id is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('client_projects')
      .insert(payload)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, project: data }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to create project' }, { status: 500 })
  }
}
