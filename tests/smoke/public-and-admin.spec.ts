import { expect, test } from '@playwright/test'
import fs from 'node:fs/promises'
import path from 'node:path'

const screenshotDir = path.join(process.cwd(), '.playwright-artifacts')

const routes = [
  { name: 'homepage', path: '/' },
  { name: 'services', path: '/services' },
  { name: 'portrait-service', path: '/services/portrait-photography' },
  { name: 'locations', path: '/locations' },
  { name: 'service-area-pinehurst', path: '/local-photographer-pinehurst-tx' },
  { name: 'blog', path: '/blog' },
  { name: 'pricing', path: '/tools/pricing' },
  { name: 'package-recommender', path: '/tools/package-recommender' },
  { name: 'session-prep', path: '/session-prep' },
  { name: 'prep-guide-download', path: '/session-prep/portrait/download' },
  { name: 'booking', path: '/book-a-session' },
  { name: 'admin-login', path: '/login' },
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

test('mobile prelaunch UX surfaces render without overlap', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile UX QA only runs in the mobile project')

  await page.goto('/services', { waitUntil: 'domcontentloaded' })
  await page.getByRole('button', { name: /open main navigation/i }).click()
  await page.getByRole('button', { name: /services submenu toggle/i }).click()
  await expect(page.getByLabel('Main navigation', { exact: true }).getByRole('link', { name: 'Engagement Photography' })).toBeVisible()
  await page.screenshot({ path: path.join(screenshotDir, `${testInfo.project.name}-services-dropdown.png`), fullPage: true })

  await page.goto('/services/engagement-session#concierge', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { name: /proposal \+ engagement concierge/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /pick the engagement experience/i })).toBeVisible()
  await page.screenshot({ path: path.join(screenshotDir, `${testInfo.project.name}-engagement-anchor.png`), fullPage: true })

  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('navigation', { name: /quick actions/i })).toBeVisible()
  await page.screenshot({ path: path.join(screenshotDir, `${testInfo.project.name}-sticky-cta.png`), fullPage: true })

  await page.addInitScript(() => {
    const nativeSetTimeout = window.setTimeout
    window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) => {
      const nextTimeout = typeof timeout === 'number' && timeout > 1000 ? 25 : timeout
      return nativeSetTimeout(handler, nextTimeout, ...args)
    }) as typeof window.setTimeout
  })
  await page.goto('/get-quote', { waitUntil: 'domcontentloaded' })
  await page.evaluate(() => {
    window.localStorage.removeItem('studio37_quote_capture_done')
    window.scrollTo(0, document.documentElement.scrollHeight)
  })
  await expect(page.getByText(/save your quote before you go/i)).toBeVisible()
  await page.screenshot({ path: path.join(screenshotDir, `${testInfo.project.name}-quote-popup.png`), fullPage: true })

  await page.goto('/book-a-session', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { name: /book your session/i })).toBeVisible()
  await expect(page.getByText(/choose booking type/i)).toBeVisible()
  await page.screenshot({ path: path.join(screenshotDir, `${testInfo.project.name}-booking-cta.png`), fullPage: true })
})
