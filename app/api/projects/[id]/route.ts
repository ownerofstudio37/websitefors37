import { NextRequest, NextResponse } from 'next/server'
import { createLogger } from '@/lib/logger'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const log = createLogger('api/projects/[id]')

// GET /api/projects/[id] - Get project details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const { data: project, error } = await supabaseAdmin
      .from('project_management')
      .select(`
        *,
        lead:lead_id(id, name, email, phone, status, budget_range, service_interest),
        appointment:appointment_id(id, appointment_date, appointment_time, status),
        client_project:client_project_id(
          id, name, type, description, status, session_date, due_date,
          package_name, total_amount_cents, paid_amount_cents, payment_status,
          cover_image_url, tags, metadata
        ),
        workflow:workflow_id(id, name, description, project_type),
        project_manager:project_manager_id(id, name, email),
        photographer:assigned_photographer_id(id, name, email),
        editor:assigned_editor_id(id, name, email)
      `)
      .eq('id', id)
      .single()

    if (error || !project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Fetch phases with tasks
    const { data: phases } = await supabaseAdmin
      .from('project_phases')
      .select(`
        *,
        tasks:project_tasks(*)
      `)
      .eq('project_id', id)
      .order('phase_order')

    // Fetch milestones
    const { data: milestones } = await supabaseAdmin
      .from('project_milestones')
      .select('*')
      .eq('project_id', id)
      .order('target_date')

    // Fetch recent timeline events
    const { data: timeline } = await supabaseAdmin
      .from('project_timeline')
      .select('*')
      .eq('project_id', id)
      .order('created_at', { ascending: false })
      .limit(50)

    // Fetch recent comments
    const { data: comments } = await supabaseAdmin
      .from('project_comments')
      .select('*')
      .eq('project_id', id)
      .is('task_id', null)
      .is('phase_id', null)
      .order('created_at', { ascending: false })
      .limit(20)

    // Fetch project files
    const { data: files } = await supabaseAdmin
      .from('project_files')
      .select('*')
      .eq('project_id', id)
      .is('deleted_at', null)
      .order('uploaded_at', { ascending: false })

    return NextResponse.json({
      project,
      phases: phases || [],
      milestones: milestones || [],
      timeline: timeline || [],
      comments: comments || [],
      files: files || []
    })
  } catch (error: any) {
    log.error('Error in GET /api/projects/[id]', undefined, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/projects/[id] - Update project
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const updates = await request.json()

    // Remove read-only fields
    delete updates.id
    delete updates.created_at
    delete updates.project_code

    const { data: project, error } = await supabaseAdmin
      .from('project_management')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      log.error('Failed to update project', { error: error.message, id })
      return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
    }

    log.info('Project updated', { project_id: id })

    return NextResponse.json({ project })
  } catch (error: any) {
    log.error('Error in PATCH /api/projects/[id]', undefined, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/projects/[id] - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const { error } = await supabaseAdmin
      .from('project_management')
      .delete()
      .eq('id', id)

    if (error) {
      log.error('Failed to delete project', { error: error.message, id })
      return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
    }

    log.info('Project deleted', { project_id: id })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    log.error('Error in DELETE /api/projects/[id]', undefined, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
