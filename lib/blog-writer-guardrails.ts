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

const pricePattern = /\$\s?\d[\d,]*(?:\.\d{2})?/g
const statPattern = /\b\d+(?:\.\d+)?\s?(?:%|percent|x|times|keywords|clicks|leads|bookings|sessions)\b/gi
const markdownLinkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
const faqHeadingPattern = /^##\s+.*(?:faq|faqs|frequently asked questions).*$\n?/gim
const riskyDatePattern = /\b(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+\d{1,2}(?:,\s*\d{4})?\b|\b\d{1,2}\/\d{1,2}(?:\/\d{2,4})?\b|\b20\d{2}-\d{1,2}-\d{1,2}\b/gi
const availabilityPattern = /\b(?:available|availability|booking|bookings|spots|slots|openings)\b[^.!?\n]*(?:available|open|left|remaining|limited|filling|gone|sold out|deadline|close[sd]?|end[sd]?)\b|\b(?:only|last)\s+\d+\s+(?:spots|slots|openings)\b/gi

const titleMinorWords = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'from', 'in', 'nor', 'of', 'on', 'or', 'per', 'the', 'to', 'vs', 'via', 'with'])

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

function toTitleCase(value: string) {
  const words = value
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')

  return words
    .map((word, index) => {
      if (/^\d{4}$/.test(word)) return word
      const clean = word.replace(/[^a-z0-9]/gi, '')
      const lower = word.toLowerCase()
      const upperKnown = clean.toUpperCase()
      if (['TX', 'SEO', 'PPC', 'FAQ', 'FAQs', 'AI'].includes(upperKnown)) {
        return word.replace(clean, upperKnown)
      }
      const previousStartsNewPhrase = index > 0 && /[:.!?]$/.test(words[index - 1])
      if (titleMinorWords.has(lower) && index !== 0 && index !== words.length - 1 && !previousStartsNewPhrase) return lower
      return word.replace(/[A-Za-z][A-Za-z']*/g, (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    })
    .join(' ')
    .replace(/\bthe Woodlands\b/g, 'The Woodlands')
    .replace(/\bgreater Houston\b/g, 'Greater Houston')
}

function buildDisplayTitle(topic: string, fallback: string) {
  const source = topic?.trim() || fallback
  return toTitleCase(source)
}

function buildFaq(primaryKeyword: string, topic: string) {
  return `## FAQ

### How early should I plan ${primaryKeyword}?

Start once you know the season, city, and general goal for the session. We can help narrow the timing around light, location flow, and how the photos will be used.

### What should I bring?

Bring simple outfit options, any must-have props, comfortable shoes for walking, and a short list of people or details that matter most.

### Where should we do the session?

The right spot depends on your city, the light, the walking distance, and the look you want. Pinehurst, The Woodlands, Conroe, Magnolia, and Greater Houston all give us different planning options.

### What if my family needs extra direction?

That is normal. We guide posing, pacing, and little transitions so nobody has to arrive knowing what to do with their hands. Hands are weird. We plan for that.

### How do I know if this session type is enough?

Think about your goal first. If you need a focused seasonal update, a shorter session can work well. If you need multiple outfits, extended family combinations, or a slower pace, a full session may fit better.

### What is the next step?

Pick the package or session direction that fits best, then send us the city, preferred season, and any important constraints so we can help confirm the plan.`
}

function replaceFaq(markdown: string, faqMarkdown: string) {
  let out = markdown
  let match: RegExpExecArray | null
  faqHeadingPattern.lastIndex = 0

  while ((match = faqHeadingPattern.exec(out)) !== null) {
    const start = match.index
    const afterHeading = start + match[0].length
    const rest = out.slice(afterHeading)
    const nextH2Match = rest.match(/^##\s+/m)
    const end = nextH2Match?.index !== undefined ? afterHeading + nextH2Match.index : out.length
    out = `${out.slice(0, start).replace(/\s+$/, '')}\n\n${out.slice(end).replace(/^\s+/, '')}`.trim()
    faqHeadingPattern.lastIndex = 0
  }

  return `${out.replace(/\s+$/, '')}\n\n${faqMarkdown}`
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
  const riskyDates = content.match(riskyDatePattern) || []
  if (riskyDates.length) {
    warnings.add(`Review exact date claim(s): ${Array.from(new Set(riskyDates)).slice(0, 6).join(', ')}.`)
  }

  const availabilityClaims = content.match(availabilityPattern) || []
  if (availabilityClaims.length) {
    warnings.add(`Review availability claim(s): ${Array.from(new Set(availabilityClaims)).slice(0, 3).join(' | ')}.`)
  }

  const stats = content.match(statPattern) || []
  if (stats.length) {
    warnings.add(`Verify sourced stat/result claim(s): ${Array.from(new Set(stats)).slice(0, 6).join(', ')}.`)
  }

  return Array.from(warnings)
}

function removeBannedVoice(value: string) {
  return bannedOpeners.reduce((text, pattern) => text.replace(pattern, 'Here is the practical part'), value)
}

function truncateAtWord(value: string, maxLength: number) {
  const clean = (value || '').trim()
  if (clean.length <= maxLength) return clean
  const truncated = clean.slice(0, maxLength + 1)
  const wordBoundary = truncated.search(/\s+\S*$/)
  const safe = wordBoundary > 40 ? truncated.slice(0, wordBoundary) : clean.slice(0, maxLength)
  return safe.replace(/[.,;:!?-]\s*$/, '').trim()
}

function allowedPricesForBrief(brief: BlogWriterBrief) {
  const haystack = `${brief.topic} ${brief.keywords.join(' ')} ${brief.outline || ''}`.toLowerCase()
  const allowed = new Set<string>()
  if (/wedding|elopement/.test(haystack)) allowed.add('$1,200')
  if (/portrait|family|senior|headshot/.test(haystack)) allowed.add('$350')
  if (/\bevent|party|fundraiser|graduation/.test(haystack)) allowed.add('$600')
  if (/commercial|brand|business/.test(haystack)) allowed.add('$500')
  return allowed
}

function removeUnapprovedPrices(content: string, brief: BlogWriterBrief, warnings: Set<string>) {
  const allowed = allowedPricesForBrief(brief)
  let removedPrices: string[] = []

  const paragraphs = content.split(/(\n{2,})/)
  const cleaned = paragraphs.map((part) => {
    if (/^\n{2,}$/.test(part) || !pricePattern.test(part)) {
      pricePattern.lastIndex = 0
      return part
    }
    pricePattern.lastIndex = 0
    const prices = Array.from(part.matchAll(pricePattern)).map((match) => match[0].replace(/\s+/g, ''))
    const unapproved = prices.filter((price) => !allowed.has(price))
    if (!unapproved.length) return part
    removedPrices = [...removedPrices, ...unapproved]
    return part
      .split(/(?<=[.!?])\s+/)
      .filter((sentence) => {
        const sentencePrices = Array.from(sentence.matchAll(pricePattern)).map((match) => match[0].replace(/\s+/g, ''))
        return sentencePrices.length === 0 || sentencePrices.every((price) => allowed.has(price))
      })
      .join(' ')
  }).join('')

  if (removedPrices.length) {
    warnings.add(`Removed unapproved pricing claims before draft return: ${Array.from(new Set(removedPrices)).join(', ')}.`)
  }

  return cleaned.replace(/\n{3,}/g, '\n\n').trim()
}

export function applyBlogWriterGuardrails(post: BlogWriterPost, brief: BlogWriterBrief): BlogWriterPost {
  const primaryKeyword = brief.keywords.find(Boolean)?.trim() || brief.topic.trim()
  const keyword = primaryKeyword || 'Studio37 photography'
  const keywordRe = keywordRegex(keyword)
  const requestedLocalSpecifics = (brief.localSpecifics || []).filter((item) => APPROVED_LOCAL_SPECIFICS.includes(item))
  const warnings = new Set([...(post.warnings || [])])

  let title = buildDisplayTitle(removeBannedVoice(brief.topic || post.title || keyword), keyword)

  let seoTitle = removeBannedVoice(post.seoTitle || title).trim()
  if (!keywordRe.test(seoTitle)) seoTitle = keyword
  if (seoTitle.length > 60) seoTitle = seoTitle.slice(0, 57).trim().replace(/[|,-]\s*$/, '') + '...'

  let content = removeBannedVoice(post.content || '').trim()
  if (!/^#\s+/m.test(content)) {
    content = `# ${keyword}\n\n${content}`
  }
  content = content.replace(/^#\s+(.+)$/m, (full, heading) => (keywordRe.test(heading) ? full : `# ${keyword}`))

  if (!keywordRe.test(getFirstHundredWords(content))) {
    content = insertAfterH1(content, `If you are comparing ${keyword}, start with the season, the city, and the kind of images you actually need.`)
  }

  const h2Pattern = new RegExp(`^##\\s+.*${escapeRegExp(keyword)}.*$`, 'im')
  if (!h2Pattern.test(content)) {
    content = insertAfterH1(content, `## ${keyword}: what to know first`)
  }

  content = enforceSingleRelativeLink(content, keyword, brief.linkTarget)
  content = removeUnapprovedPrices(content, brief, warnings)

  content = replaceFaq(content, buildFaq(keyword, brief.topic))

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

  buildWarnings(content).forEach((warning) => warnings.add(warning))

  return {
    ...post,
    title,
    seoTitle,
    metaDescription: truncateAtWord(removeBannedVoice(post.metaDescription || ''), 160),
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
