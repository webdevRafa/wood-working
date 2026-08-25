export type GuideType =
  | 'project'
  | 'skill'
  | 'troubleshooting'
  | 'review'
  | 'comparison'
  | 'shop'
  | 'material'

export type GuideStatus = 'draft' | 'review' | 'published' | 'archived'
export type GuideIntent = 'learn' | 'build' | 'buy'
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export type GuideSection = {
  id: string
  heading: string
  paragraphs: string[]
  bullets?: string[]
  callout?: {
    tone: 'tip' | 'warning' | 'decision'
    title: string
    body: string
  }
}

export type ToolRequirement = {
  name: string
  required: boolean
  purpose: string
  substitute?: string
}

export type MaterialRequirement = {
  name: string
  quantity: string
  notes?: string
}

export type CutItem = {
  part: string
  quantity: number
  thickness: string
  width: string
  length: string
  notes?: string
}

export type Guide = {
  id: string
  slug: string
  canonicalPath: string
  type: GuideType
  status: GuideStatus
  indexStatus: 'index' | 'noindex'
  title: string
  dek: string
  seoTitle: string
  metaDescription: string
  categoryId: string
  clusterId: string
  tags: string[]
  intent: GuideIntent
  skillLevel?: SkillLevel
  activeMinutes?: number
  totalMinutes?: number
  costBand?: 1 | 2 | 3 | 4
  dimensions?: { imperial: string; metric: string }
  sections: GuideSection[]
  tools: ToolRequirement[]
  materials: MaterialRequirement[]
  cutList?: CutItem[]
  safetyNotes: string[]
  affiliateDisclosure: string
  naturalOffers: string[]
  prerequisiteIds: string[]
  relatedGuideIds: string[]
  authorId: string
  reviewerIds: string[]
  evidenceStatus: 'brief' | 'research-reviewed' | 'shop-verified'
  sources: Array<{ title: string; url: string }>
  createdAt: string
  updatedAt: string
  publishedAt?: string
  contentVersion: number
}

export type GuideIndexItem = Pick<
  Guide,
  | 'id'
  | 'slug'
  | 'canonicalPath'
  | 'type'
  | 'status'
  | 'indexStatus'
  | 'title'
  | 'dek'
  | 'categoryId'
  | 'clusterId'
  | 'tags'
  | 'intent'
  | 'skillLevel'
  | 'activeMinutes'
  | 'totalMinutes'
  | 'costBand'
  | 'evidenceStatus'
  | 'updatedAt'
>
