'use client'

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

function safeJsonParse(value: string | null): JsonValue | undefined {
  if (!value) return undefined
  try {
    return JSON.parse(value) as JsonValue
  } catch {
    return undefined
  }
}

function queryObject(searchParams: URLSearchParams) {
  return Array.from(searchParams.entries()).reduce<Record<string, string>>((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {})
}

export function getLeadContext(extra?: Record<string, JsonValue | undefined>) {
  if (typeof window === 'undefined') return extra || {}

  const url = new URL(window.location.href)
  const query = queryObject(url.searchParams)
  const landingPageKey = 'studio37_landing_page'
  const existingLandingPage = window.localStorage.getItem(landingPageKey)
  const landingPage = existingLandingPage || window.location.href

  if (!existingLandingPage) {
    window.localStorage.setItem(landingPageKey, landingPage)
  }

  const context: Record<string, JsonValue | undefined> = {
    page_url: window.location.href,
    pathname: window.location.pathname,
    landing_page: landingPage,
    referrer: document.referrer || undefined,
    query_params: Object.keys(query).length ? query : undefined,
    selected_package: safeJsonParse(window.sessionStorage.getItem('studio37_package_context')),
    calculator_context: safeJsonParse(window.sessionStorage.getItem('studio37_pricing_context')),
    ...extra,
  }

  UTM_KEYS.forEach((key) => {
    context[key] = url.searchParams.get(key) || window.localStorage.getItem(`studio37_${key}`) || undefined
    if (url.searchParams.get(key)) {
      window.localStorage.setItem(`studio37_${key}`, url.searchParams.get(key) || '')
    }
  })

  return Object.fromEntries(Object.entries(context).filter(([, value]) => value !== undefined))
}

export function withLeadContext<T extends Record<string, unknown>>(payload: T, extra?: Record<string, JsonValue | undefined>) {
  const sourceMetadata = getLeadContext(extra)

  return {
    ...payload,
    page_url: typeof sourceMetadata.page_url === 'string' ? sourceMetadata.page_url : undefined,
    landing_page: typeof sourceMetadata.landing_page === 'string' ? sourceMetadata.landing_page : undefined,
    referrer: typeof sourceMetadata.referrer === 'string' ? sourceMetadata.referrer : undefined,
    utm_source: typeof sourceMetadata.utm_source === 'string' ? sourceMetadata.utm_source : undefined,
    utm_medium: typeof sourceMetadata.utm_medium === 'string' ? sourceMetadata.utm_medium : undefined,
    utm_campaign: typeof sourceMetadata.utm_campaign === 'string' ? sourceMetadata.utm_campaign : undefined,
    utm_term: typeof sourceMetadata.utm_term === 'string' ? sourceMetadata.utm_term : undefined,
    utm_content: typeof sourceMetadata.utm_content === 'string' ? sourceMetadata.utm_content : undefined,
    source_metadata: sourceMetadata,
  }
}
