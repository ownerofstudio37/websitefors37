import { NextRequest, NextResponse } from 'next/server'
import { createLogger } from '@/lib/logger'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const log = createLogger('api/tasks/[id]')

// PATCH /api/tasks/[id] - Update task
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const updates = await request.json()

    // Get current task for comparison
    const { data: oldTask } = await supabaseAdmin
      .from('project_tasks')
      .select('status, title, project_id')
      .eq('id', id)
      .single()

    // Remove read-only fields
    delete updates.id
    delete updates.created_at
    delete updates.project_id

    const { data: task, error } = await supabaseAdmin
      .from('project_tasks')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        phase:phase_id(id, name),
        assigned_user:assigned_to(id, name, email)
      `)
      .single()

    if (error) {
      log.error('Failed to update task', { error: error.message, id })
      return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
    }

    // Log status change
    if (oldTask && updates.status && oldTask.status !== updates.status) {
      await supabaseAdmin
        .from('project_timeline')
        .insert({
          project_id: oldTask.project_id,
          event_type: 'task_status_changed',
          event_title: 'Task status updated',
          event_description: `Task "${oldTask.title}" changed from ${oldTask.status} to ${updates.status}`,
          related_entity_type: 'task',
          related_entity_id: id,
          metadata: {
            old_status: oldTask.status,
            new_status: updates.status
          },
          is_system_generated: true
        })

      // If task was completed, log it
      if (updates.status === 'completed') {
        await supabaseAdmin
          .from('project_tasks')
          .update({ completed_at: new Date().toISOString() })
          .eq('id', id)
      }
    }

    log.info('Task updated', { task_id: id })

    return NextResponse.json({ task })
  } catch (error: any) {
    log.error('Error in PATCH /api/tasks/[id]', undefined, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/tasks/[id] - Delete task
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const { error } = await supabaseAdmin
      .from('project_tasks')
      .delete()
      .eq('id', id)

    if (error) {
      log.error('Failed to delete task', { error: error.message, id })
      return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 })
    }

    log.info('Task deleted', { task_id: id })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    log.error('Error in DELETE /api/tasks/[id]', undefined, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
