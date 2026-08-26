import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { guides as reviewedGuides } from '../src/data/guides'
import type { Guide } from '../src/types/content'

const fileArgIndex = process.argv.indexOf('--file')
const file = resolve(fileArgIndex >= 0 ? process.argv[fileArgIndex + 1] : 'content/guides.json')
const existingGuides = JSON.parse(await readFile(file, 'utf8')) as Guide[]
const reviewedById = new Map(reviewedGuides.map((guide) => [guide.id, guide]))
const launchIds = [...reviewedById.keys()]
const now = new Date().toISOString()

const relatedLaunchGuides: Record<string, string[]> = {
  '001': ['002', '101', '301'],
  '002': ['001', '151', '176'],
  '031': ['001', '276', '301'],
  '101': ['001', '002', '151'],
  '151': ['002', '101', '176'],
  '176': ['002', '031', '151'],
  '276': ['001', '031', '301'],
  '301': ['001', '031', '276'],
}

const editorialFields: Array<keyof Guide> = [
  'title',
  'dek',
  'seoTitle',
  'metaDescription',
  'intent',
  'skillLevel',
  'activeMinutes',
  'totalMinutes',
  'costBand',
  'dimensions',
  'sections',
  'tools',
  'materials',
  'cutList',
  'safetyNotes',
  'affiliateDisclosure',
  'naturalOffers',
  'prerequisiteIds',
  'authorId',
  'reviewerIds',
  'evidenceStatus',
  'sources',
]

const curated = existingGuides.map((existing) => {
  const reviewed = reviewedById.get(existing.id)
  if (!reviewed) {
    const draft: Guide = {
      ...existing,
      status: 'review',
      indexStatus: 'noindex',
      evidenceStatus: 'brief',
      reviewerIds: [],
      sources: [],
      updatedAt: now,
      contentVersion: 3,
    }
    delete draft.publishedAt
    return draft
  }

  const published = { ...existing } as Guide
  for (const field of editorialFields) {
    if (reviewed[field] === undefined) delete published[field]
    else Object.assign(published, { [field]: structuredClone(reviewed[field]) })
  }
  published.slug = existing.slug
  published.canonicalPath = existing.canonicalPath
  published.coverImage = existing.coverImage ?? reviewed.coverImage
  published.coverAlt = existing.coverAlt ?? reviewed.coverAlt
  published.relatedGuideIds = relatedLaunchGuides[existing.id]
  published.status = 'published'
  published.indexStatus = 'index'
  published.evidenceStatus = 'research-reviewed'
  published.reviewerIds = ['built-true-editorial-review']
  published.updatedAt = now
  published.publishedAt = now
  published.contentVersion = 3
  return published
})

await writeFile(file, `${JSON.stringify(curated, null, 2)}\n`, 'utf8')
console.log(`Curated ${launchIds.length} source-backed launch guides and retained ${curated.length - launchIds.length} accessible working drafts as noindex.`)
