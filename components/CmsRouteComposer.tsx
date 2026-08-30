import React from 'react'
import { getPageConfigs, getRenderablePageLayout, selectProps } from '@/lib/pageConfigs'

type CmsRouteComposerProps = {
  path: string
  search?: string
  children: React.ReactNode
}

function shouldSkipCmsBridge(path: string) {
  return (
    !path ||
    path === '/' ||
    path.startsWith('/admin') ||
    path.startsWith('/api') ||
    path.startsWith('/_next') ||
    path.startsWith('/gallery/') ||
    path.endsWith('.xml') ||
    path === '/robots.txt'
  )
}

export default async function CmsRouteComposer({ path, search = '', children }: CmsRouteComposerProps) {
  if (shouldSkipCmsBridge(path)) return <>{children}</>

  const useDraft = search.includes('edit=1')
  const layout = await getRenderablePageLayout(path, useDraft)
  if (!layout) return <>{children}</>

  const { MDXBuilderComponents } = await import('@/components/BuilderRuntime')
  const configs = await getPageConfigs(path)
  const renderedBlocks = layout.blocks.map((blk, i) => {
    const Comp: any = (MDXBuilderComponents as any)[blk.type]
    if (!Comp) return null
    const override = blk.id ? configs.get(blk.id) : undefined
    return (
      <div key={blk.id || i} className="relative">
        <Comp {...(blk.props || {})} _overrides={selectProps(override as any, useDraft)} />
      </div>
    )
  })

  if (layout.mode === 'prepend') return <>{renderedBlocks}{children}</>
  if (layout.mode === 'append') return <>{children}{renderedBlocks}</>
  return <>{renderedBlocks}</>
}
