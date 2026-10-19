'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AdminProtectedProps {
  children: React.ReactNode
}

export default function AdminProtected({ children }: AdminProtectedProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/session', { cache: 'no-store' })
        // Only a real "not logged in" answer sends you to the login page; a temporary error or rate
        // limit keeps you on the page (middleware already blocks anyone without a valid session).
        if (res.status === 401) {
          router.push('/login')
        } else {
          setIsAuthenticated(true)
        }
      } catch {
        setIsAuthenticated(true)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return <>{children}</>
}