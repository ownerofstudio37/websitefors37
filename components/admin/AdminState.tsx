'use client'

import type { LucideIcon } from 'lucide-react'
import { Loader2 } from 'lucide-react'

interface AdminStateProps {
  icon?: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  secondaryActionLabel?: string
  onSecondaryAction?: () => void
  tone?: 'default' | 'error'
  loading?: boolean
}

export default function AdminState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  tone = 'default',
  loading = false,
}: AdminStateProps) {
  const isError = tone === 'error'

  return (
    <div
      className={`rounded-lg border px-6 py-12 text-center ${
        isError ? 'border-red-200 bg-red-50' : 'border-dashed border-gray-300 bg-white'
      }`}
    >
      <div
        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-lg ${
          isError ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'
        }`}
      >
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : Icon ? (
          <Icon className="h-6 w-6" />
        ) : null}
      </div>
      <h3 className={`mt-4 text-base font-semibold ${isError ? 'text-red-900' : 'text-gray-900'}`}>
        {title}
      </h3>
      <p className={`mx-auto mt-2 max-w-md text-sm ${isError ? 'text-red-700' : 'text-gray-600'}`}>
        {description}
      </p>
      {(actionLabel || secondaryActionLabel) && (
        <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
          {actionLabel && onAction && (
            <button
              type="button"
              onClick={onAction}
              className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white ${
                isError ? 'bg-red-700 hover:bg-red-800' : 'bg-primary-600 hover:bg-primary-700'
              }`}
            >
              {actionLabel}
            </button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <button
              type="button"
              onClick={onSecondaryAction}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {secondaryActionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
