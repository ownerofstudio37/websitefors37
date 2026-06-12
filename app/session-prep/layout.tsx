import ComparePackagesCTA from '@/components/ComparePackagesCTA'
import type React from 'react'

export default function SessionPrepLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="container mx-auto px-4 pb-16">
        <ComparePackagesCTA context="your prepared session" />
      </div>
    </>
  )
}
