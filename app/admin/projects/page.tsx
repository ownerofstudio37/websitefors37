'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  FolderKanban, Plus, Search, AlertCircle, CheckCircle2, Clock
} from 'lucide-react'

interface Project {
  id: string
  project_code: string
  project_name: string
  project_type: string
  status: string
  priority: string
  health_status: string
  overall_progress: number
  session_date: string
  target_completion_date: string
  client_name: string
  project_manager?: { name: string }
  photographer?: { name: string }
  tasks_completed: number
  total_tasks: number
}

const statusColors: Record<string, string> = {
  planning: 'bg-gray-100 text-gray-800',
  scheduled: 'bg-blue-100 text-blue-800',
  'pre-production': 'bg-purple-100 text-purple-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  'post-production': 'bg-orange-100 text-orange-800',
  'client-review': 'bg-pink-100 text-pink-800',
  revisions: 'bg-indigo-100 text-indigo-800',
  'final-delivery': 'bg-green-100 text-green-800',
  completed: 'bg-green-600 text-white',
  'on-hold': 'bg-gray-400 text-white',
  cancelled: 'bg-red-600 text-white'
}

const healthColors: Record<string, string> = {
  'on-track': 'text-green-600',
  'at-risk': 'text-yellow-600',
  delayed: 'text-orange-600',
  blocked: 'text-red-600'
}

export default function ProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [healthFilter, setHealthFilter] = useState<string>('')
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    onTrack: 0,
    atRisk: 0
  })

  useEffect(() => {
    fetchProjects()
  }, [statusFilter, healthFilter])

  async function fetchProjects() {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)
      if (healthFilter) params.append('health_status', healthFilter)
      params.append('limit', '100')

      const res = await fetch(`/api/projects?${params}`)
      const data = await res.json()

      if (res.ok) {
        setProjects(data.projects || [])
        
        const allProjects = data.projects || []
        setStats({
          total: allProjects.length,
          active: allProjects.filter((p: Project) => 
            ['in-progress', 'pre-production', 'post-production'].includes(p.status)
          ).length,
          onTrack: allProjects.filter((p: Project) => p.health_status === 'on-track').length,
          atRisk: allProjects.filter((p: Project) => 
            ['at-risk', 'delayed', 'blocked'].includes(p.health_status)
          ).length
        })
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter(project =>
    project.project_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.project_code?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <FolderKanban className="text-[#b46e14]" size={32} />
              Project Management
            </h1>
            <p className="text-slate-600 mt-1">Track projects from booking through delivery</p>
          </div>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#b46e14] text-white rounded-lg hover:bg-[#a17a07] transition-colors"
          >
            <Plus size={20} />
            New Project
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Projects</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FolderKanban className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stats.active}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">On Track</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.onTrack}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle2 className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">At Risk</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats.atRisk}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="text-red-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b46e14] focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b46e14]"
            >
              <option value="">All Statuses</option>
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={healthFilter}
              onChange={(e) => setHealthFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b46e14]"
            >
              <option value="">All Health Status</option>
              <option value="on-track">On Track</option>
              <option value="at-risk">At Risk</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#b46e14]"></div>
              <p className="text-slate-600 mt-2">Loading...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <FolderKanban className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-600">No projects found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Project</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Client</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Health</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      onClick={() => router.push(`/admin/projects/${project.id}`)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-900">{project.project_name}</p>
                          <p className="text-sm text-slate-500">{project.project_code}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900">{project.client_name || 'N/A'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[project.status]}`}>
                          {project.status.replace(/-/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-medium ${healthColors[project.health_status]}`}>
                          {project.health_status.replace(/-/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-[#b46e14] h-2 rounded-full"
                              style={{ width: `${project.overall_progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-slate-600">{project.overall_progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
