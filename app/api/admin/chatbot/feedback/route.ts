import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/admin/chatbot/feedback')

export async function GET() {
  try {
    await requireAuth()
    const { data, error } = await supabaseAdmin
      .from('chatbot_feedback')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(25)

    if (error) {
      log.warn('Chatbot feedback table unavailable', { error: error.message })
      return NextResponse.json({ success: true, feedback: [], unavailable: true })
    }

    return NextResponse.json({ success: true, feedback: data || [] })
  } catch (error: any) {
    if (error?.message === 'Unauthorized') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    log.error('Feedback fetch failed', { error: error?.message })
    return NextResponse.json({ success: false, error: 'Failed to load feedback' }, { status: 500 })
  }
}
