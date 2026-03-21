import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { authErrorResponse, requireAdminRole } from '@/lib/admin-auth'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdminRole('viewer')

    const { id } = params

    const { data, error } = await supabaseAdmin
      .from('email_templates')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, template: data })
  } catch (error: any) {
    if (error?.message === 'UNAUTHORIZED' || error?.message === 'FORBIDDEN') {
      return authErrorResponse(error)
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdminRole('editor')

    const body = await req.json()
    const { id } = params

    const updatePayload = {
      name: body.name,
      subject: body.subject,
      category: body.category,
      html_content: body.html_content,
      text_content: body.text_content,
      is_active: body.is_active,
      variables: body.variables,
      blocks_json: body.blocks_json,
      updated_at: new Date().toISOString(),
    }

    const sanitizedPayload = Object.fromEntries(
      Object.entries(updatePayload).filter(([, value]) => value !== undefined)
    )

    const { data, error } = await supabaseAdmin
      .from('email_templates')
      .update(sanitizedPayload)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, template: data })
  } catch (error: any) {
    if (error?.message === 'UNAUTHORIZED' || error?.message === 'FORBIDDEN') {
      return authErrorResponse(error)
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
