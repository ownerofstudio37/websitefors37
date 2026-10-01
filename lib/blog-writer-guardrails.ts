export type BlogWriterBrief = {
  topic: string
  keywords: string[]
  wordCount: number
  tone?: string
  outline?: string
  reader?: string
  linkTarget?: string
  localSpecifics?: string[]
}

export type BlogWriterPost = {
  title: string
  seoTitle?: string
  metaDescription: string
  content: string
  tags: string[]
  category: string
  excerpt: string
  warnings?: string[]
}

export const APPROVED_LOCAL_SPECIFICS = [
  'Pinehurst',
  'The Woodlands',
  'Conroe',
  'Magnolia',
  'Tomball',
  'Spring',
  'Montgomery',
  'Montgomery County',
  'Willis',
  'New Caney',
  'Hockley',
  'Huntsville',
  'Houston',
  'Greater Houston',
  'Northwest Houston',
  'I-45 corridor',
  'Town Green Park',
  'Market Street',
  'Waterway Square',
  'The Woodlands Waterway',
  'Rob Fleming Park',
  'Lake Conroe',
  'Fernland Historical Park',
  'Unity Park',
  'Burroughs Park',
  'Kleb Woods Nature Preserve',
  'Mercer Botanic Gardens',
  'WG Jones State Forest',
  'Old Town Spring',
]

const bannedOpeners = [
  /in today's fast[-\s]?paced digital landscape/gi,
  /at studio37, we pride ourselves/gi,
  /we pride ourselves/gi,
]

const monthDatePattern = /\b(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+\d{1,2}(?:,\s*\d{4})?\b/gi
const numericDatePattern = /\b\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?\b/g
const yearPattern = /\b20(?:2[0-9]|3[0-9])\b/g
const pricePattern = /\$\s?\d[\d,]*(?:\.\d{2})?/g
const statPattern = /\b\d+(?:\.\d+)?\s?(?:%|percent|x|times|keywords|clicks|leads|bookings|sessions)\b/gi
const markdownLinkPattern = /\[([^\]]+)\]\(([^)]+)\)/g

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function countWords(value: string) {
  return (value.match(/\b[\w'-]+\b/g) || []).length
}

function normalizeLinkTarget(value?: string) {
  if (!value) return ''
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (/^https?:\/\/(?:www\.)?studio37\.cc\//i.test(trimmed)) {
    return trimmed.replace(/^https?:\/\/(?:www\.)?studio37\.cc/i, '')
  }
  if (/^https?:\/\//i.test(trimmed)) return ''
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

function keywordRegex(keyword: string) {
  return new RegExp(escapeRegExp(keyword), 'i')
}

function getFirstHundredWords(markdown: string) {
  return (markdown.match(/\b[\w'-]+\b/g) || []).slice(0, 100).join(' ')
}

function hasFaq(markdown: string) {
  return /^##\s+(?:FAQ|Frequently Asked Questions)\s*$/im.test(markdown)
}

function buildFaq(primaryKeyword: string, topic: string) {
  return `## FAQ

### How early should I plan ${primaryKeyword}?

Start once you know the season, city, and general goal for the session. We can help narrow the timing around light, location flow, and how the photos will be used.

### What should I bring to ${primaryKeyword}?

Bring simple outfit options, any must-have props, comfortable shoes for walking, and a short list of people or details that matter most.

### Where should we do ${primaryKeyword}?

The right spot depends on your city, the light, the walking distance, and the look you want. Pinehurst, The Woodlands, Conroe, Magnolia, and Greater Houston all give us different planning options.

### Can Studio37 help with planning?

Yes. We help with timing, location fit, pacing, posing, and the practical little details that keep the session calm.

### What is the next step after reading about ${topic}?

Pick the package or session direction that fits best, then send us the city, preferred season, and any important constraints so we can help confirm the plan.`
}

function insertAfterH1(markdown: string, insertion: string) {
  const lines = markdown.split('\n')
  const h1Index = lines.findIndex((line) => /^#\s+/.test(line))
  if (h1Index === -1) return `${insertion}\n\n${markdown}`
  lines.splice(h1Index + 1, 0, '', insertion)
  return lines.join('\n').replace(/\n{3,}/g, '\n\n')
}

function enforceSingleRelativeLink(markdown: string, primaryKeyword: string, linkTarget?: string) {
  const target = normalizeLinkTarget(linkTarget)
  let out = markdown.replace(markdownLinkPattern, (full, anchor, href) => {
    const normalizedHref = normalizeLinkTarget(href)
    if (target && normalizedHref === target && new RegExp(`^${escapeRegExp(primaryKeyword)}$`, 'i').test(anchor.trim())) {
      return full
    }
    return anchor
  })

  if (!target) return out

  const existingTargetLink = new RegExp(`\\[${escapeRegExp(primaryKeyword)}\\]\\(${escapeRegExp(target)}\\)`, 'i')
  if (existingTargetLink.test(out)) return out

  const plainKeyword = keywordRegex(primaryKeyword)
  const lines = out.split('\n')
  const bodyLineIndex = lines.findIndex((line) => !/^#{1,6}\s+/.test(line) && plainKeyword.test(line))
  if (bodyLineIndex !== -1) {
    lines[bodyLineIndex] = lines[bodyLineIndex].replace(plainKeyword, `[${primaryKeyword}](${target})`)
    return lines.join('\n')
  }

  return insertAfterH1(out, `If you are comparing [${primaryKeyword}](${target}), start with the session goal, the city, and the season before choosing a date.`)
}

function buildWarnings(content: string) {
  const warnings = new Set<string>()
  const dateMatches = [
    ...(content.match(monthDatePattern) || []),
    ...(content.match(numericDatePattern) || []),
    ...(content.match(yearPattern) || []),
  ]
  if (dateMatches.length) {
    warnings.add(`Review time-sensitive claims before publishing: ${Array.from(new Set(dateMatches)).slice(0, 6).join(', ')}.`)
  }

  const prices = content.match(pricePattern) || []
  if (prices.length) {
    warnings.add(`Verify pricing before publishing: ${Array.from(new Set(prices)).slice(0, 6).join(', ')}.`)
  }

  const stats = content.match(statPattern) || []
  if (stats.length) {
    warnings.add(`Verify stats/results have a source before publishing: ${Array.from(new Set(stats)).slice(0, 6).join(', ')}.`)
  }

  return Array.from(warnings)
}

function removeBannedVoice(value: string) {
  return bannedOpeners.reduce((text, pattern) => text.replace(pattern, 'Here is the practical part'), value)
}

export function applyBlogWriterGuardrails(post: BlogWriterPost, brief: BlogWriterBrief): BlogWriterPost {
  const primaryKeyword = brief.keywords.find(Boolean)?.trim() || brief.topic.trim()
  const keyword = primaryKeyword || 'Studio37 photography'
  const keywordRe = keywordRegex(keyword)
  const requestedLocalSpecifics = (brief.localSpecifics || []).filter((item) => APPROVED_LOCAL_SPECIFICS.includes(item))
  const warnings = new Set([...(post.warnings || [])])

  let title = removeBannedVoice(post.title || brief.topic).trim()
  if (!keywordRe.test(title)) {
    title = keyword.length <= 58 ? keyword : `${keyword.slice(0, 57).trim()}...`
  }

  let seoTitle = removeBannedVoice(post.seoTitle || title).trim()
  if (!keywordRe.test(seoTitle)) seoTitle = title
  if (seoTitle.length > 60) seoTitle = seoTitle.slice(0, 57).trim().replace(/[|,-]\s*$/, '') + '...'

  let content = removeBannedVoice(post.content || '').trim()
  if (!/^#\s+/m.test(content)) {
    content = `# ${title}\n\n${content}`
  }
  content = content.replace(/^#\s+(.+)$/m, (full, heading) => (keywordRe.test(heading) ? full : `# ${title}`))

  if (!keywordRe.test(getFirstHundredWords(content))) {
    content = insertAfterH1(content, `If you are comparing ${keyword}, start with the season, the city, and the kind of images you actually need.`)
  }

  const h2Pattern = new RegExp(`^##\\s+.*${escapeRegExp(keyword)}.*$`, 'im')
  if (!h2Pattern.test(content)) {
    content = insertAfterH1(content, `## ${keyword}: what to know first`)
  }

  content = enforceSingleRelativeLink(content, keyword, brief.linkTarget)

  if (!hasFaq(content)) {
    content = `${content.replace(/\s+$/, '')}\n\n${buildFaq(keyword, brief.topic)}`
  }

  const localProof = requestedLocalSpecifics.length
    ? requestedLocalSpecifics
    : ['Pinehurst', 'The Woodlands', 'Greater Houston']
  const missingLocal = localProof.filter((item) => !new RegExp(`\\b${escapeRegExp(item)}\\b`, 'i').test(content))
  if (missingLocal.length) {
    content = insertAfterH1(
      content,
      `For local planning, we usually think about ${localProof.slice(0, 3).join(', ')} because light, parking, walking distance, and weather can change the session plan fast.`
    )
  }

  const wordTotal = countWords(content)
  if (brief.wordCount >= 1800 && wordTotal < 1800) {
    warnings.add(`Draft is ${wordTotal} words; requested 1,800+ words. Add depth before publishing or regenerate.`)
  }

  buildWarnings(content).forEach((warning) => warnings.add(warning))

  return {
    ...post,
    title,
    seoTitle,
    metaDescription: removeBannedVoice(post.metaDescription || '').slice(0, 170),
    content: content.replace(/\n{3,}/g, '\n\n').trim(),
    excerpt: removeBannedVoice(post.excerpt || '').slice(0, 220),
    tags: Array.isArray(post.tags) ? post.tags : [],
    category: post.category || 'guides',
    warnings: Array.from(warnings),
  }
}

export function buildBlogWriterWarningBanner(warnings?: string[]) {
  if (!warnings?.length) return ''
  return `> **Human review needed before publishing:** ${warnings.join(' ')}\n\n`
}
