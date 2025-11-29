"use client"

import { useState } from 'react'

export default function CreateProjectButton({ clientUserId, onCreated }: { clientUserId: string, onCreated?: (project: any) => void }) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch('/api/admin/client-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_user_id: clientUserId, name: 'New Project' })
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        console.error('Failed to create project', data.error)
        alert(`Failed to create project: ${data.error || res.statusText}`)
        return
      }
      onCreated?.(data.project)
    } catch (err) {
      console.error('Create project error', err)
      alert('Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`inline-block px-4 py-2 rounded-lg text-white ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
    >
      {loading ? 'Creating…' : 'Create First Project'}
    </button>
  )
}
