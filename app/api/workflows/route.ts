import { NextRequest, NextResponse } from 'next/server'
import { createLogger } from '@/lib/logger'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const log = createLogger('api/workflows')

// GET /api/workflows - List workflow templates
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectType = searchParams.get('project_type')
    const activeOnly = searchParams.get('active') === 'true'

    let query = supabaseAdmin
      .from('project_workflows')
      .select('*')
      .order('project_type', { ascending: true })

    if (projectType) {
      query = query.eq('project_type', projectType)
    }

    if (activeOnly) {
      query = query.eq('is_active', true)
    }

    const { data: workflows, error } = await query

    if (error) {
      log.error('Failed to fetch workflows', { error: error.message })
      return NextResponse.json({ error: 'Failed to fetch workflows', details: error.message }, { status: 500 })
    }

    return NextResponse.json({ workflows: workflows || [] })
  } catch (error: any) {
    log.error('Error in GET /api/workflows', undefined, error)
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 })
  }
}
