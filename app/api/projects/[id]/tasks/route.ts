import { NextRequest, NextResponse } from 'next/server'
import { createLogger } from '@/lib/logger'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const log = createLogger('api/projects/[id]/tasks')

// GET /api/projects/[id]/tasks - Get all tasks for a project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const assigned_to = searchParams.get('assigned_to')
    const phase_id = searchParams.get('phase_id')

    let query = supabaseAdmin
      .from('project_tasks')
      .select(`
        *,
        phase:phase_id(id, name, phase_order),
        assigned_user:assigned_to(id, name, email)
      `)
      .eq('project_id', id)
      .order('created_at', { ascending: false })

    if (status) query = query.eq('status', status)
    if (assigned_to) query = query.eq('assigned_to', assigned_to)
    if (phase_id) query = query.eq('phase_id', phase_id)

    const { data: tasks, error } = await query

    if (error) {
      log.error('Failed to fetch tasks', { error: error.message })
      return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
    }

    return NextResponse.json({ tasks: tasks || [] })
  } catch (error: any) {
    log.error('Error in GET /api/projects/[id]/tasks', undefined, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/projects/[id]/tasks - Create new task
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: project_id } = params
    const body = await request.json()

    const {
      title,
      description,
      task_type,
      status = 'todo',
      priority = 'normal',
      phase_id,
      assigned_to,
      assigned_by,
      due_date,
      estimated_hours,
      checklist,
      tags,
      notes,
      created_by
    } = body

    if (!title) {
      return NextResponse.json({ error: 'Task title is required' }, { status: 400 })
    }

    const { data: task, error } = await supabaseAdmin
      .from('project_tasks')
      .insert({
        project_id,
        phase_id,
        title,
        description,
        task_type,
        status,
        priority,
        assigned_to,
        assigned_by,
        due_date,
        estimated_hours,
        checklist,
        tags,
        notes,
        created_by
      })
      .select(`
        *,
        phase:phase_id(id, name),
        assigned_user:assigned_to(id, name, email)
      `)
      .single()

    if (error) {
      log.error('Failed to create task', { error: error.message })
      return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
    }

    // Log timeline event
    await supabaseAdmin
      .from('project_timeline')
      .insert({
        project_id,
        event_type: 'task_created',
        event_title: 'Task created',
        event_description: `Task "${title}" was created`,
        related_entity_type: 'task',
        related_entity_id: task.id,
        user_id: created_by,
        is_system_generated: true
      })

    log.info('Task created', { task_id: task.id, project_id, title })

    return NextResponse.json({ task }, { status: 201 })
  } catch (error: any) {
    log.error('Error in POST /api/projects/[id]/tasks', undefined, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
