'use client'

import { CheckCircle2, AlertCircle, X } from 'lucide-react'

interface AdminToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose?: () => void
}

export default function AdminToast({
  message,
  type = 'success',
  onClose,
}: AdminToastProps) {
  const styles = {
    success: 'border-green-200 bg-green-50 text-green-800',
    error: 'border-red-200 bg-red-50 text-red-800',
    info: 'border-blue-200 bg-blue-50 text-blue-800',
  }

  const Icon = type === 'success' ? CheckCircle2 : AlertCircle

  return (
    <div className={`rounded-xl border px-4 py-3 shadow-sm ${styles[type]}`} role="status" aria-live="polite">
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <p className="text-sm font-medium flex-1">{message}</p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss message"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
