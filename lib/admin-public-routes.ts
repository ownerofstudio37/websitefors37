import fs from 'node:fs'
import path from 'node:path'

export function collectPublicPageRoutes(dir = path.join(process.cwd(), 'app'), prefix = ''): string[] {
  const routes: string[] = []

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_') || entry.name === 'api' || entry.name === 'admin') continue

    const absolute = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name.startsWith('(')) {
        routes.push(...collectPublicPageRoutes(absolute, prefix))
      } else if (!entry.name.includes('[')) {
        routes.push(...collectPublicPageRoutes(absolute, `${prefix}/${entry.name}`))
      }
    } else if (entry.name === 'page.tsx') {
      routes.push(prefix || '/')
    }
  }

  return Array.from(new Set(routes)).sort((a, b) => a.localeCompare(b))
}
