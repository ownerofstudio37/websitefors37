import { NextRequest, NextResponse } from 'next/server'
import { createLogger } from '@/lib/logger'
import { rateLimit, getClientIp } from '@/lib/rateLimit'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const log = createLogger('api/projects')

// GET /api/projects - List all projects
export async function GET(request: NextRequest) {
  const ip = getClientIp(request.headers)
  const rl = rateLimit(`projects-get:${ip}`, { limit: 100, windowMs: 60 * 1000 })
  
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const health = searchParams.get('health_status')
    const assignedTo = searchParams.get('assigned_to')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabaseAdmin
      .from('project_management')
      .select(`
        *,
        lead:lead_id(id, name, email, phone, status),
        appointment:appointment_id(id, appointment_date, appointment_time),
        client_project:client_project_id(id, name, status, session_date),
        workflow:workflow_id(id, name, project_type),
        project_manager:project_manager_id(id, name, email),
        photographer:assigned_photographer_id(id, name, email),
        editor:assigned_editor_id(id, name, email)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) query = query.eq('status', status)
    if (priority) query = query.eq('priority', priority)
    if (health) query = query.eq('health_status', health)
    if (assignedTo) {
      query = query.or(`project_manager_id.eq.${assignedTo},assigned_photographer_id.eq.${assignedTo},assigned_editor_id.eq.${assignedTo}`)
    }

    const { data: projects, error, count } = await query

    if (error) {
      log.error('Failed to fetch projects', { error: error.message })
      return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
    }

    return NextResponse.json({
      projects: projects || [],
      pagination: {
        total: count || projects?.length || 0,
        limit,
        offset,
        hasMore: (projects?.length || 0) === limit
      }
    })
  } catch (error: any) {
    log.error('Error in GET /api/projects', undefined, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/projects - Create new project
export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers)
  const rl = rateLimit(`projects-post:${ip}`, { limit: 20, windowMs: 60 * 1000 })
  
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const {
      project_name,
      project_type,
      lead_id,
      appointment_id,
      client_project_id,
      workflow_id,
      status = 'planning',
      priority = 'normal',
      start_date,
      target_completion_date,
      session_date,
      project_manager_id,
      assigned_photographer_id,
      assigned_editor_id,
      client_name,
      client_email,
      client_phone,
      description,
      notes,
      tags,
      metadata,
      created_by
    } = body

    // Validation
    if (!project_name || !project_type) {
      return NextResponse.json(
        { error: 'project_name and project_type are required' },
        { status: 400 }
      )
    }

    // Create project
    const { data: project, error: projectError } = await supabaseAdmin
      .from('project_management')
      .insert({
        project_name,
        project_type,
        lead_id,
        appointment_id,
        client_project_id,
        workflow_id,
        status,
        priority,
        start_date,
        target_completion_date,
        session_date,
        project_manager_id,
        assigned_photographer_id,
        assigned_editor_id,
        client_name,
        client_email,
        client_phone,
        description,
        notes,
        tags,
        metadata,
        created_by
      })
      .select()
      .single()

    if (projectError) {
      log.error('Failed to create project', { error: projectError.message })
      return NextResponse.json({ 
        error: 'Failed to create project', 
        details: projectError.message,
        hint: projectError.hint || 'Make sure the database migration has been run'
      }, { status: 500 })
    }

    // If workflow_id is provided, create phases and tasks from template
    if (workflow_id) {
      const { data: workflow } = await supabaseAdmin
        .from('project_workflows')
        .select('default_phases, default_tasks')
        .eq('id', workflow_id)
        .single()

      if (workflow?.default_phases) {
        const phases = workflow.default_phases as any[]
        
        // Create phases
        const phasesData = phases.map((phase: any, index: number) => ({
          project_id: project.id,
          name: phase.name,
          phase_order: phase.order || index + 1,
          duration_days: phase.duration_days
        }))

        const { data: createdPhases } = await supabaseAdmin
          .from('project_phases')
          .insert(phasesData)
          .select()

        // Create tasks from template
        if (workflow.default_tasks && createdPhases) {
          const tasks = workflow.default_tasks as any[]
          const phaseMap = new Map(
            createdPhases.map((p: any) => [p.name, p.id])
          )

          const tasksData = tasks.map((task: any) => ({
            project_id: project.id,
            phase_id: phaseMap.get(task.phase),
            title: task.name,
            task_type: task.phase?.toLowerCase().replace(/\s+/g, '-'),
            due_date: start_date
              ? new Date(new Date(start_date).getTime() + (task.due_offset_days || 0) * 86400000).toISOString()
              : null
          }))

          await supabaseAdmin
            .from('project_tasks')
            .insert(tasksData)
        }
      }
    }

    // Log timeline event
    await supabaseAdmin
      .from('project_timeline')
      .insert({
        project_id: project.id,
        event_type: 'project_created',
        event_title: 'Project created',
        event_description: `Project "${project_name}" was created`,
        user_id: created_by,
        is_system_generated: true
      })

    log.info('Project created', { project_id: project.id, project_name })

    return NextResponse.json({ project }, { status: 201 })
  } catch (error: any) {
    log.error('Error in POST /api/projects', undefined, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
