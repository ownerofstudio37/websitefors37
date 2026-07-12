import { expect, test } from '@playwright/test'
import fs from 'node:fs/promises'
import path from 'node:path'

const screenshotDir = path.join(process.cwd(), '.playwright-artifacts')

const routes = [
  { name: 'homepage', path: '/' },
  { name: 'services', path: '/services' },
  { name: 'portrait-service', path: '/services/portrait-photography' },
  { name: 'family-photography', path: '/family-photography' },
  { name: 'senior-portraits', path: '/senior-portraits' },
  { name: 'professional-headshots', path: '/professional-headshots' },
  { name: 'maternity-sessions', path: '/maternity-sessions' },
  { name: 'event-service', path: '/services/event-photography' },
  { name: 'corporate-events', path: '/corporate-events' },
  { name: 'birthday-party', path: '/birthday-party' },
  { name: 'graduation', path: '/graduation' },
  { name: 'fundraiser', path: '/fundraiser' },
  { name: 'anniversary-party', path: '/anniversary-party' },
  { name: 'holiday-party', path: '/holiday-party' },
  { name: 'commercial-service', path: '/services/commercial-photography' },
  { name: 'brand-refresh-sessions', path: '/brand-refresh-sessions' },
  { name: 'locations', path: '/locations' },
  { name: 'service-area-pinehurst', path: '/local-photographer-pinehurst-tx' },
  { name: 'blog', path: '/blog' },
  { name: 'pricing', path: '/tools/pricing' },
  { name: 'package-recommender', path: '/tools/package-recommender' },
  { name: 'session-prep', path: '/session-prep' },
  { name: 'prep-guide-download', path: '/session-prep/portrait/download' },
  { name: 'booking', path: '/book-a-session' },
  { name: 'book-consultation', path: '/book-consultation' },
  { name: 'request-portfolio', path: '/request-portfolio' },
  { name: 'gallery-experience', path: '/gallery-experience' },
  { name: 'admin-login', path: '/login' },
  { name: 'admin-home', path: '/admin' },
  { name: 'admin-leads', path: '/admin/leads' },
  { name: 'admin-seo', path: '/admin/seo' },
  { name: 'admin-projects', path: '/admin/projects' },
  { name: 'admin-galleries', path: '/admin/galleries' },
  { name: 'admin-blog', path: '/admin/blog' },
  { name: 'admin-analytics', path: '/admin/analytics' },
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

test('booking and contact conversion paths stay clear', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.getByRole('link', { name: /book a free studio37 consultation|book free consultation/i }).first().click()
  await expect(page).toHaveURL(/\/book-consultation/)
  await expect(page.getByRole('heading', { name: /book your free consultation/i })).toBeVisible()
  await expect(page.getByText(/consultation vs\. session booking/i)).toBeVisible()

  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.getByRole('link', { name: /find my package|find the best studio37 package/i }).first().click()
  await expect(page).toHaveURL(/\/tools\/package-recommender/)

  await page.goto('/services/portrait-photography', { waitUntil: 'domcontentloaded' })
  await page.getByRole('link', { name: /view family photography/i }).click()
  await expect(page).toHaveURL(/\/family-photography/)
  await expect(page.getByRole('heading', { name: /^family photography$/i })).toBeVisible()
  const familyBookLink = page.getByRole('link', { name: /book consultation/i }).first()
  await familyBookLink.scrollIntoViewIfNeeded()
  await page.mouse.wheel(0, 220)
  await familyBookLink.click()
  await expect(page).toHaveURL(/\/book-consultation/)

  await page.goto('/request-portfolio', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('button', { name: /request tailored portfolio/i })).toBeVisible()
  await expect(page.getByLabel(/project type/i)).toBeVisible()

  await page.goto('/contact', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { name: /contact information/i })).toBeVisible()
  await expect(page.locator('main').getByRole('link', { name: /sales@studio37\.cc/i })).toBeVisible()
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
