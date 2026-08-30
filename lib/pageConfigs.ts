import { supabaseAdmin } from './supabaseAdmin'

export interface PageConfig {
  path: string
  block_id: string
  block_type: string
  props: Record<string, any>
  draft_props?: Record<string, any> | null
  is_published?: boolean
  updated_at: string
}

export type LayoutBlock = {
  id: string // anchor id
  type: string // name of MDXBuilder component, e.g., 'HeroBlock'
  props?: Record<string, any>
}

export type PageLayout = {
  path: string
  blocks: LayoutBlock[]
  mode?: 'replace' | 'prepend' | 'append'
}

/**
 * Fetch all block overrides for a given page path from page_configs.
 * Returns a Map keyed by block_id for easy lookups.
 * Call this in server components or API routes.
 */
export async function getPageConfigs(path: string): Promise<Map<string, PageConfig>> {
  let { data, error } = await supabaseAdmin
    .from('page_configs')
    .select('path, block_id, block_type, props, draft_props, is_published, updated_at')
    .eq('path', path)

  if (error?.code === '42703' || error?.message?.includes('draft_props') || error?.message?.includes('is_published')) {
    const fallback = await supabaseAdmin
      .from('page_configs')
      .select('path, block_id, block_type, props, updated_at')
      .eq('path', path)
    data = fallback.data as any
    error = fallback.error
  }

  if (error) {
    console.error('[getPageConfigs] Error fetching configs for path:', path, error)
    return new Map()
  }

  const map = new Map<string, PageConfig>()
  for (const row of data || []) {
    map.set(row.block_id, row as PageConfig)
  }
  return map
}

/**
 * Get override props for a specific block_id on a page.
 * Returns null if no override exists.
 */
export function getBlockOverride(configs: Map<string, PageConfig>, blockId: string): Record<string, any> | null {
  const config = configs.get(blockId)
  return config ? config.props : null
}

/** Select props based on mode. If useDraft is true and draft_props exist, return draft_props; else props. */
export function selectProps(config: PageConfig | undefined, useDraft: boolean): Record<string, any> | null {
  if (!config) return null
  if (useDraft && config.draft_props && Object.keys(config.draft_props || {}).length > 0) return config.draft_props as any
  return config.props || null
}

/** Fetch layout config (if any) for a page. Uses special block_id '__layout__'. */
export async function getPageLayout(path: string, useDraft = false): Promise<PageLayout | null> {
  let { data, error } = await supabaseAdmin
    .from('page_configs')
    .select('path, block_id, block_type, props, draft_props')
    .eq('path', path)
    .eq('block_id', '__layout__')
    .maybeSingle()

  if (error?.code === '42703' || error?.message?.includes('draft_props')) {
    const fallback = await supabaseAdmin
      .from('page_configs')
      .select('path, block_id, block_type, props')
      .eq('path', path)
      .eq('block_id', '__layout__')
      .maybeSingle()
    data = fallback.data as any
    error = fallback.error
  }

  if (error || !data) return null

  const raw = (useDraft && (data as any).draft_props) ? (data as any).draft_props : (data as any).props
  const blocks = Array.isArray(raw?.blocks) ? raw.blocks as LayoutBlock[] : []
  const mode = ['replace', 'prepend', 'append'].includes(raw?.mode) ? raw.mode : 'replace'
  return { path, blocks, mode }
}

/** Public rendering bridge for hardcoded routes. Drafts only render in explicit edit mode. */
export async function getRenderablePageLayout(path: string, useDraft = false): Promise<PageLayout | null> {
  let { data, error } = await supabaseAdmin
    .from('page_configs')
    .select('path, block_id, block_type, props, draft_props, is_published')
    .eq('path', path)
    .eq('block_id', '__layout__')
    .maybeSingle()

  if (error?.code === '42703' || error?.message?.includes('draft_props') || error?.message?.includes('is_published')) {
    const fallback = await supabaseAdmin
      .from('page_configs')
      .select('path, block_id, block_type, props')
      .eq('path', path)
      .eq('block_id', '__layout__')
      .maybeSingle()
    data = fallback.data as any
    error = fallback.error
  }

  if (error || !data) return null
  if (!useDraft && (data as any).is_published === false) return null

  const raw = (useDraft && (data as any).draft_props) ? (data as any).draft_props : (data as any).props
  const blocks = Array.isArray(raw?.blocks) ? raw.blocks as LayoutBlock[] : []
  if (!blocks.length) return null

  const mode = ['replace', 'prepend', 'append'].includes(raw?.mode) ? raw.mode : 'replace'
  return { path, blocks, mode }
}
