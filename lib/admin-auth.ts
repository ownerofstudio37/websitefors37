import { NextResponse } from 'next/server'
import { getAdminUser, type AdminUser } from '@/lib/auth'

export type AdminRole = 'viewer' | 'marketer' | 'editor' | 'admin' | 'owner'

const SINGLE_ADMIN_MODE = process.env.SINGLE_ADMIN_MODE === 'true'

const ROLE_WEIGHT: Record<AdminRole, number> = {
  viewer: 10,
  marketer: 20,
  editor: 30,
  admin: 40,
  owner: 50,
}

function normalizeRole(role: string | undefined | null): AdminRole {
  if (SINGLE_ADMIN_MODE) return 'owner'

  const lower = (role || '').toLowerCase().trim()
  if (lower === 'owner') return 'owner'
  if (lower === 'admin') return 'admin'
  if (lower === 'editor') return 'editor'
  if (lower === 'marketer') return 'marketer'
  if (lower === 'viewer') return 'viewer'
  // Legacy roles default to admin for backwards compatibility
  if (lower === 'superadmin' || lower === 'super_admin') return 'owner'
  return 'admin'
}

export function hasRole(userRole: string | undefined, requiredRole: AdminRole) {
  if (SINGLE_ADMIN_MODE) return true

  const user = normalizeRole(userRole)
  return ROLE_WEIGHT[user] >= ROLE_WEIGHT[requiredRole]
}

export async function requireAdminRole(requiredRole: AdminRole): Promise<AdminUser> {
  const user = await getAdminUser()
  if (!user) throw new Error('UNAUTHORIZED')
  if (!hasRole(user.role, requiredRole)) throw new Error('FORBIDDEN')
  return user
}

export function authErrorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : 'UNAUTHORIZED'
  if (message === 'UNAUTHORIZED') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }
  if (message === 'FORBIDDEN') {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  }
  return NextResponse.json({ success: false, error: 'Auth failed' }, { status: 401 })
}
