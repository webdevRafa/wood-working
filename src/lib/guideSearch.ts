import type { GuideIndexItem } from '../types/content'

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export function searchGuides(guides: GuideIndexItem[], query: string) {
  const normalizedQuery = normalize(query)
  const published = guides.filter((guide) => guide.status === 'published')

  if (!normalizedQuery) {
    return [...published].sort((a, b) => Number(a.id) - Number(b.id))
  }

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean)

  return published
    .map((guide) => {
      const title = normalize(guide.title)
      const dek = normalize(guide.dek)
      const tags = guide.tags.map(normalize)
      const searchable = `${title} ${dek} ${tags.join(' ')} ${normalize(guide.type)} ${normalize(guide.intent)}`

      if (!tokens.every((token) => searchable.includes(token))) return null

      let score = 0
      if (title === normalizedQuery) score += 180
      if (title.startsWith(normalizedQuery)) score += 90
      if (title.includes(normalizedQuery)) score += 55
      if (tags.some((tag) => tag === normalizedQuery)) score += 45
      if (tags.some((tag) => tag.includes(normalizedQuery))) score += 25

      for (const token of tokens) {
        if (title.split(' ').includes(token)) score += 18
        else if (title.includes(token)) score += 10
        if (tags.some((tag) => tag.includes(token))) score += 8
        if (dek.includes(token)) score += 3
      }

      return { guide, score }
    })
    .filter((result): result is { guide: GuideIndexItem; score: number } => result !== null)
    .sort((a, b) => b.score - a.score || Number(a.guide.id) - Number(b.guide.id))
    .map(({ guide }) => guide)
}
