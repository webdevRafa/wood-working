const requiredTextFields = [
  'id',
  'slug',
  'canonicalPath',
  'type',
  'status',
  'indexStatus',
  'title',
  'dek',
  'seoTitle',
  'metaDescription',
  'categoryId',
  'clusterId',
  'intent',
  'affiliateDisclosure',
  'authorId',
  'evidenceStatus',
  'createdAt',
  'updatedAt',
]

const allowedTypes = new Set(['project', 'skill', 'troubleshooting', 'review', 'comparison', 'shop', 'material'])
const allowedStatuses = new Set(['draft', 'review', 'published', 'archived'])
const allowedIntents = new Set(['learn', 'build', 'buy'])

function countWords(guide) {
  return [guide.title, guide.dek, ...(guide.sections ?? []).flatMap((section) => [section.heading, ...(section.paragraphs ?? []), ...(section.bullets ?? [])])]
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

export function validateGuides(guides, options = {}) {
  const expectedCount = options.expectedCount
  const errors = []
  const warnings = []

  if (!Array.isArray(guides)) return { errors: ['The content file must contain a JSON array.'], warnings, stats: { count: 0, words: 0 } }
  if (expectedCount && guides.length !== expectedCount) errors.push(`Expected ${expectedCount} guides; found ${guides.length}.`)

  const ids = new Set()
  const slugs = new Set()
  const paths = new Set()
  let words = 0

  for (const [index, guide] of guides.entries()) {
    const label = guide?.id ? `Guide ${guide.id}` : `Guide at index ${index}`
    if (!guide || typeof guide !== 'object') {
      errors.push(`${label} is not an object.`)
      continue
    }

    for (const field of requiredTextFields) {
      if (typeof guide[field] !== 'string' || !guide[field].trim()) errors.push(`${label}: ${field} must be a non-empty string.`)
    }

    if (!/^\d{3}$/.test(guide.id ?? '')) errors.push(`${label}: id must be a zero-padded three-digit string.`)
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(guide.slug ?? '')) errors.push(`${label}: slug must be lowercase kebab-case.`)
    if (!String(guide.canonicalPath ?? '').startsWith('/') || !String(guide.canonicalPath ?? '').endsWith('/')) errors.push(`${label}: canonicalPath must begin and end with a slash.`)
    if (!allowedTypes.has(guide.type)) errors.push(`${label}: unsupported type ${guide.type}.`)
    if (!allowedStatuses.has(guide.status)) errors.push(`${label}: unsupported status ${guide.status}.`)
    if (!allowedIntents.has(guide.intent)) errors.push(`${label}: unsupported intent ${guide.intent}.`)
    if (!['index', 'noindex'].includes(guide.indexStatus)) errors.push(`${label}: indexStatus must be index or noindex.`)
    if (!Array.isArray(guide.tags) || guide.tags.length < 2) errors.push(`${label}: include at least two tags.`)
    if (!Array.isArray(guide.sections) || guide.sections.length < 4) errors.push(`${label}: include at least four substantive sections.`)
    if (!Array.isArray(guide.tools) || !Array.isArray(guide.materials)) errors.push(`${label}: tools and materials must be arrays.`)
    if (!Array.isArray(guide.safetyNotes)) errors.push(`${label}: safetyNotes must be an array.`)
    if (!Array.isArray(guide.naturalOffers)) errors.push(`${label}: naturalOffers must be an array.`)
    if (String(guide.metaDescription ?? '').length > 165) errors.push(`${label}: metaDescription exceeds 165 characters.`)

    for (const section of guide.sections ?? []) {
      if (!section.id || !section.heading || !Array.isArray(section.paragraphs) || section.paragraphs.length === 0) errors.push(`${label}: every section needs id, heading, and at least one paragraph.`)
      if ((section.paragraphs ?? []).some((paragraph) => typeof paragraph !== 'string' || paragraph.trim().length < 40)) warnings.push(`${label}: section ${section.id ?? '(unknown)'} contains a very short paragraph.`)
    }

    const guideWords = countWords(guide)
    words += guideWords
    if (guideWords < 450) warnings.push(`${label}: ${guideWords} words is below the 450-word draft target.`)

    if (guide.status === 'published') {
      if (guide.indexStatus !== 'index') warnings.push(`${label}: published but noindex.`)
      if (guide.evidenceStatus === 'brief') errors.push(`${label}: a brief cannot be published.`)
      if (!Array.isArray(guide.reviewerIds) || guide.reviewerIds.length === 0) errors.push(`${label}: published content needs a reviewer.`)
      if (!Array.isArray(guide.sources) || guide.sources.length === 0) errors.push(`${label}: published content needs sources.`)
    }

    if (ids.has(guide.id)) errors.push(`${label}: duplicate id.`)
    if (slugs.has(guide.slug)) errors.push(`${label}: duplicate slug.`)
    if (paths.has(guide.canonicalPath)) errors.push(`${label}: duplicate canonicalPath.`)
    ids.add(guide.id)
    slugs.add(guide.slug)
    paths.add(guide.canonicalPath)
  }

  return {
    errors,
    warnings,
    stats: {
      count: guides.length,
      words,
      draft: guides.filter((guide) => guide.status === 'draft').length,
      review: guides.filter((guide) => guide.status === 'review').length,
      published: guides.filter((guide) => guide.status === 'published').length,
    },
  }
}
