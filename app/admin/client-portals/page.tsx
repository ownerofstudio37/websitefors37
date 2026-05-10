'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface ClientUser {
  id: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  is_active: boolean
  last_login_at?: string
  login_count: number
  created_at: string
  project_count?: number
  active_projects?: number
  lead?: {
    name: string
    status: string
  }
}

export default function ClientPortalsPage() {
  const [users, setUsers] = useState<ClientUser[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [resetTarget, setResetTarget] = useState<ClientUser | null>(null)
  const [resetPassword, setResetPassword] = useState('')
  const [resetting, setResetting] = useState(false)
  const [resetMsg, setResetMsg] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/client-portals')
      const data = await res.json()
      if (data.success) {
        setUsers(data.users)
      }
    } catch (e) {
      console.error('Failed to load users:', e)
    } finally {
      setLoading(false)
    }
  }

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
      const handleResetPassword = async () => {
        if (!resetTarget || !resetPassword) return
        setResetting(true)
        setResetMsg(null)
        try {
          const res = await fetch(`/api/admin/client-portals/${resetTarget.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: resetPassword }),
          })
          const data = await res.json()
          if (res.ok && data.success !== false) {
            setResetMsg('Password updated successfully.')
            setResetPassword('')
            setTimeout(() => { setResetTarget(null); setResetMsg(null) }, 1500)
          } else {
            setResetMsg(data.error || 'Failed to update password.')
          }
        } catch (e: any) {
          setResetMsg('Error: ' + (e?.message || 'unknown'))
        } finally {
          setResetting(false)
        }
      }

    try {
      const res = await fetch(`/api/admin/client-portals/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentStatus })
      })
      if (res.ok) {
        fetchUsers()
      }
    } catch (e) {
      alert('Failed to toggle user status')
    }
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Never'
    return new Date(dateStr).toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <Link href="/admin" className="text-blue-600 hover:underline text-sm">← Back to Admin</Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">Client Portals</h1>
            <p className="text-sm text-gray-600 mt-1">Manage client portal access and projects</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
          >
            + Create Portal Access
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-gray-900">{users.length}</div>
            <div className="text-sm text-gray-600">Total Portal Users</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-green-600">{users.filter(u => u.is_active).length}</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-blue-600">
              {users.reduce((sum, u) => sum + (u.active_projects || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-purple-600">
              {users.reduce((sum, u) => sum + (u.login_count || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Logins</div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading portal users...</p>
          </div>
        )}

        {!loading && (
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Projects</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Last Login</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {user.first_name && user.last_name 
                          ? `${user.first_name} ${user.last_name}`
                          : user.lead?.name || 'Unknown'}
                      </div>
                      {user.phone && (
                        <div className="text-xs text-gray-500">{user.phone}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleUserStatus(user.id, user.is_active)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.is_active
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        } transition`}
                      >
                        {user.is_active ? '✓ Active' : '✗ Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900 font-medium">
                        {user.project_count || 0} total
                      </div>
                      {(user.active_projects || 0) > 0 && (
                        <div className="text-xs text-green-600">
                          {user.active_projects} active
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600">{formatDate(user.last_login_at)}</div>
                      <div className="text-xs text-gray-500">{user.login_count} logins</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/client-portals/${user.id}`}
                          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/client-portals/${user.id}/projects`}
                          className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                        >
                          Projects
                                                <button
                                                  onClick={() => { setResetTarget(user); setResetPassword(''); setResetMsg(null) }}
                                                  className="text-sm text-amber-600 hover:text-amber-800 font-medium"
                                                >
                                                  Reset PW
                                                </button>
                                {/* Reset Password Modal */}
                                {resetTarget && (
                                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                                    <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl">
                                      <h3 className="text-lg font-bold text-gray-900 mb-1">Reset Password</h3>
                                      <p className="text-sm text-gray-600 mb-4">
                                        Set a new password for <strong>{resetTarget.email}</strong>
                                      </p>
                                      <input
                                        type="password"
                                        placeholder="New password (min 8 chars)"
                                        value={resetPassword}
                                        onChange={(e) => setResetPassword(e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
                                      />
                                      {resetMsg && (
                                        <p className={`text-sm mb-3 ${resetMsg.includes('success') ? 'text-green-700' : 'text-red-600'}`}>{resetMsg}</p>
                                      )}
                                      <div className="flex gap-3">
                                        <button onClick={() => setResetTarget(null)} className="flex-1 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition">Cancel</button>
                                        <button
                                          onClick={handleResetPassword}
                                          disabled={resetting || resetPassword.length < 8}
                                          className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm hover:bg-amber-700 disabled:opacity-60 transition"
                                        >
                                          {resetting ? 'Saving…' : 'Update Password'}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}

                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg mb-2">No client portal users yet</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Create the first one
                </button>
              </div>
            )}
          </div>
        )}

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Create Client Portal Access</h3>
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  try {
                    const res = await fetch('/api/admin/client-portals', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        email: formData.get('email'),
                        password: formData.get('password'),
                        first_name: formData.get('first_name'),
                        last_name: formData.get('last_name'),
                        phone: formData.get('phone'),
                        is_active: true
                      })
                    })
                    const data = await res.json()
                    if (data.success) {
                      setShowAddModal(false)
                      fetchUsers()
                      alert('Client portal access created! Send the login credentials to the client.')
                    } else {
                      alert('Failed: ' + data.error)
                    }
                  } catch (error) {
                    alert('Error creating portal access')
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    name="first_name"
                    required
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="last_name"
                    required
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="Min 8 characters"
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                  💡 The client will use this email and password to access their portal at /portal/login
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
                  >
                    Create Access
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
