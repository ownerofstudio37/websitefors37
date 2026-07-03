'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { trackEvent } from '@/lib/analytics'

type Props = ComponentProps<typeof Link> & {
  source: string
}

export default function TrackedPortfolioRequestLink({ source, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent('portfolio_request_click', { source })
        onClick?.(event)
      }}
    />
  )
}
