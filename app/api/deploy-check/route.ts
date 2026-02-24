import { NextResponse } from 'next/server'

/**
 * Simple test endpoint to verify deployment
 * Returns current deploy timestamp
 */
export async function GET() {
  return NextResponse.json({
    deployed: new Date().toISOString(),
    message: 'Sitemap fix deployed',
    commit: process.env.COMMIT_REF || 'unknown',
    buildId: process.env.BUILD_ID || 'unknown',
    context: process.env.CONTEXT || 'unknown',
  })
}
