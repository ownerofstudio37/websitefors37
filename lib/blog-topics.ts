import { cityMentions } from '@/lib/city-mentions'
import { geoServiceAreas } from '@/lib/seo-config'

// Blog topic groups, matched on the title (tags are too broad: most posts carry several services).
// The last group catches everything else. Shared by the blog archive and related-post suggestions.
export const BLOG_TOPICS: Array<{ label: string; match: RegExp }> = [
  { label: 'Engagements & Proposals', match: /engagement|proposal/i },
  { label: 'Weddings', match: /wedding|bride|venue|luminaire|elopement|first look|aisle|peach orchard|big sky|iron manor/i },
  { label: 'Events', match: /event|party|corporate mixer|birthday|quince/i },
  { label: 'Business & Marketing', match: /brand|business|seo|ppc|website|marketing|stock|product photo|google maps|reels|template|media library|e-commerce/i },
  { label: 'Portraits & Families', match: /./ },
]

export const blogTopicIndex = (title: string) => BLOG_TOPICS.findIndex((topic) => topic.match.test(title))

type PostLike = { slug: string; title?: string | null; excerpt?: string | null; tags?: string[] | null; published_at?: string | null }

const STOPWORDS = new Set(['studio37', 'studio', 'texas', 'photography', 'photographer', 'photos', 'guide', 'session', 'sessions', 'about', 'their', 'there', 'which', 'where', 'every', 'should', 'your', 'with', 'from', 'that', 'this', 'what', 'when', 'best', 'tips'])
const keywords = (title: string) =>
  new Set((title.toLowerCase().match(/[a-z]{5,}/g) || []).filter((word) => !STOPWORDS.has(word)))
const citiesIn = (post: PostLike) => {
  const text = `${post.title || ''} ${post.excerpt || ''}`
  return new Set(geoServiceAreas.filter((area) => cityMentions(text, area.name) > 0).map((area) => area.name))
}

// Related reading by subject rather than recency: same topic group, same city, shared tags, and shared title
// words, best match first.
function rankRelated<T extends PostLike>(post: PostLike, candidates: T[]) {
  const topic = blogTopicIndex(post.title || '')
  const cities = citiesIn(post)
  const tags = new Set((post.tags || []).map((tag) => tag.toLowerCase()))
  const words = keywords(post.title || '')

  return candidates
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      let score = blogTopicIndex(candidate.title || '') === topic ? 5 : 0
      if ([...citiesIn(candidate)].some((city) => cities.has(city))) score += 3
      score += Math.min(3, (candidate.tags || []).filter((tag) => tags.has(tag.toLowerCase())).length)
      score += Math.min(3, [...keywords(candidate.title || '')].filter((word) => words.has(word)).length)
      return { candidate, score, time: Date.parse(candidate.published_at || '') || 0 }
    })
    .sort((a, b) => b.score - a.score || b.time - a.time)
}

// Picks for every post at once, so no post is left without a link from another post: a post nobody picked
// takes the last slot of the post that ranks it highest (when that slot's post has other links to spare).
// Every page computes the same map from the same post list, so the links are stable.
export function relatedPostsFor<T extends PostLike>(post: PostLike, candidates: T[], limit = 4): T[] {
  const all: PostLike[] = candidates.some((candidate) => candidate.slug === post.slug) ? candidates : [...candidates, post]
  const ranked = new Map(all.map((item) => [item.slug, rankRelated(item, candidates)]))
  const picks = new Map(all.map((item) => [item.slug, ranked.get(item.slug)!.slice(0, limit).map((entry) => entry.candidate)]))
  const inbound = new Map<string, number>(candidates.map((candidate) => [candidate.slug, 0]))
  picks.forEach((list) => list.forEach((item) => inbound.set(item.slug, (inbound.get(item.slug) || 0) + 1)))

  const usedHosts = new Set<string>()
  for (const orphan of candidates.filter((candidate) => inbound.get(candidate.slug) === 0)) {
    const host = all
      .filter((item) => item.slug !== orphan.slug && !usedHosts.has(item.slug))
      .map((item) => {
        const list = picks.get(item.slug)!
        const last = list[list.length - 1]
        const entry = ranked.get(item.slug)!.find((ranking) => ranking.candidate.slug === orphan.slug)
        return { item, list, last, score: entry ? entry.score : -1 }
      })
      .filter(({ list, last }) => list.length === limit && (inbound.get(last.slug) || 0) > 1)
      .sort((a, b) => b.score - a.score)[0]
    if (!host) continue
    usedHosts.add(host.item.slug)
    inbound.set(host.last.slug, (inbound.get(host.last.slug) || 0) - 1)
    host.list[host.list.length - 1] = orphan
    inbound.set(orphan.slug, 1)
  }

  return picks.get(post.slug) || []
}
