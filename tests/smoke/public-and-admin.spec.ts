import { expect, test } from '@playwright/test'
import fs from 'node:fs/promises'
import path from 'node:path'

const screenshotDir = path.join(process.cwd(), '.playwright-artifacts')

const routes = [
  { name: 'homepage', path: '/' },
  { name: 'services', path: '/services' },
  { name: 'pricing', path: '/tools/pricing' },
  { name: 'package-recommender', path: '/tools/package-recommender' },
  { name: 'session-prep', path: '/session-prep' },
  { name: 'booking', path: '/book-a-session' },
  { name: 'admin-leads', path: '/admin/leads' },
  { name: 'admin-seo', path: '/admin/seo' },
]

test.beforeAll(async () => {
  await fs.mkdir(screenshotDir, { recursive: true })
})

for (const route of routes) {
  test(`${route.name} renders without a server error`, async ({ page }, testInfo) => {
    const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' })
    expect(response?.status(), `${route.path} should not 500`).toBeLessThan(500)
    await expect(page.locator('body')).toBeVisible()
    await page.screenshot({
      path: path.join(screenshotDir, `${testInfo.project.name}-${route.name}.png`),
      fullPage: true,
    })
  })
}

test('mobile fixed conversion UI does not overlap incoherently', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile overlap audit only runs in the mobile project')

  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(750)

  const fixedBoxes = await page.locator('body *').evaluateAll((elements) => {
    const trackedClassNeedles = [
      'fixed w-full z-50',
      'fixed inset-x-0 bottom-0',
      'fixed bottom-24',
      'fixed bottom-24 right-5',
    ]

    return elements
      .map((element) => {
        const className = String(element.getAttribute('class') || '')
        if (!trackedClassNeedles.some((needle) => className.includes(needle))) return null
        const style = window.getComputedStyle(element)
        if (style.position !== 'fixed' || style.display === 'none' || style.visibility === 'hidden') return null
        const rect = element.getBoundingClientRect()
        if (rect.width < 24 || rect.height < 24) return null
        return {
          tag: element.tagName.toLowerCase(),
          className,
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        }
      })
      .filter(Boolean)
  })

  for (let i = 0; i < fixedBoxes.length; i += 1) {
    for (let j = i + 1; j < fixedBoxes.length; j += 1) {
      const a = fixedBoxes[i]!
      const b = fixedBoxes[j]!
      const xOverlap = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x))
      const yOverlap = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y))
      const overlapArea = xOverlap * yOverlap
      const smallerArea = Math.min(a.width * a.height, b.width * b.height)
      expect(
        overlapArea / smallerArea,
        `fixed elements overlap too much: ${a.tag}.${a.className} and ${b.tag}.${b.className}`
      ).toBeLessThan(0.35)
    }
  }
})
