'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, CheckCircle2, Clock, FileText, FolderKanban, Loader2, PackageOpen, TriangleAlert } from 'lucide-react'

type Project = {
  id: string
  project_code: string
  project_name: string
  project_type: string
  status: string
  priority: string
  health_status: string
  overall_progress: number
  client_name?: string
  client_email?: string
  session_date?: string | null
  start_date?: string | null
  target_completion_date?: string | null
}

type Phase = {
  id: string
  name: string
  status: string
  phase_order: number
  tasks?: Task[]
}

type Task = {
  id: string
  title: string
  status: string
  due_date?: string | null
}

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const projectId = params?.id

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [project, setProject] = useState<Project | null>(null)
  const [phases, setPhases] = useState<Phase[]>([])
  const [timeline, setTimeline] = useState<any[]>([])

  useEffect(() => {
    if (!projectId) return
    fetchProject()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId])

  async function fetchProject() {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/projects/${projectId}`)
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to load project')
        return
      }
      setProject(data.project)
      setPhases(data.phases || [])
      setTimeline(data.timeline || [])
    } catch (e) {
      console.error('Failed to load project', e)
      setError('Failed to load project')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-700">
          <Loader2 className="animate-spin" /> Loading project…
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/admin/projects" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-white">
              <ArrowLeft size={18} /> Back to Projects
            </Link>
          </div>
          <div className="bg-white rounded-lg border p-8 text-center">
            <TriangleAlert className="mx-auto mb-3 text-red-600" />
            <p className="text-slate-800 font-semibold">{error || 'Project not found'}</p>
          </div>
        </div>
      </div>
    )
  }

  const progress = Math.max(0, Math.min(100, project.overall_progress || 0))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/projects" className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition-colors">
              <ArrowLeft className="text-slate-700" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
                <FolderKanban className="text-[#b46e14]" /> {project.project_name}
              </h1>
              <p className="text-slate-600 mt-1">Code: {project.project_code} • Type: {project.project_type}</p>
            </div>
          </div>

          <div className="shrink-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-900 text-white">
              {project.status.replace('-', ' ')}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-700">Overall Progress</span>
            <span className="text-sm font-semibold text-slate-900">{progress}%</span>
          </div>
          <div className="h-3 rounded bg-slate-200 overflow-hidden">
            <div className="h-3 bg-[#b46e14]" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Phases & Tasks */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-slate-800 font-semibold">
              <PackageOpen size={18} /> Phases & Tasks
            </div>
            {phases.length === 0 ? (
              <div className="bg-white rounded-lg border p-6 text-slate-600">No phases yet.</div>
            ) : (
              <div className="space-y-4">
                {phases.sort((a,b) => (a.phase_order||0)-(b.phase_order||0)).map((phase) => {
                  const tasks = phase.tasks || []
                  const done = tasks.filter(t => t.status === 'completed').length
                  return (
                    <div key={phase.id} className="bg-white rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">{phase.name}</h3>
                        <span className="text-sm text-slate-600">{done}/{tasks.length} tasks</span>
                      </div>
                      {tasks.length > 0 && (
                        <ul className="mt-3 divide-y">
                          {tasks.map(task => (
                            <li key={task.id} className="py-2 flex items-center justify-between">
                              <div className="flex items-center gap-2 text-slate-800">
                                {task.status === 'completed' ? (
                                  <CheckCircle2 className="text-green-600" size={18} />
                                ) : (
                                  <Clock className="text-slate-400" size={18} />
                                )}
                                <span>{task.title}</span>
                              </div>
                              {task.due_date && (
                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                  <Calendar size={14} /> {new Date(task.due_date).toLocaleDateString()}
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-800 font-semibold">
              <FileText size={18} /> Recent Activity
            </div>
            <div className="bg-white rounded-lg border divide-y">
              {timeline.length === 0 && (
                <div className="p-4 text-slate-600">No activity yet.</div>
              )}
              {timeline.map((e) => (
                <div key={e.id} className="p-4 text-sm">
                  <div className="font-medium text-slate-900">{e.event_title}</div>
                  <div className="text-slate-600">{e.event_description}</div>
                  <div className="text-slate-400 mt-1">{new Date(e.created_at).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
