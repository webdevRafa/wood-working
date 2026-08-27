import type { GuideIndexItem } from '../types/content'

export type PlanCategory = {
  id: string
  label: string
  description: string
  categoryIds?: string[]
  terms?: string[]
}

export const planCategories: PlanCategory[] = [
  { id: 'living-room', label: 'Living room', description: 'Coffee tables, media furniture, bookcases, and small-space pieces.', categoryIds: ['living-room-furniture-and-media'] },
  { id: 'bedroom-office', label: 'Bedroom & office', description: 'Beds, desks, nightstands, organizers, and work-from-home storage.', categoryIds: ['bedroom-storage-and-home-office'] },
  { id: 'kitchen-bath', label: 'Kitchen & bath', description: 'Cabinets, vanities, islands, utility storage, and built-ins.', categoryIds: ['kitchen-bath-cabinetry-and-built-ins'] },
  { id: 'tables-seating', label: 'Tables & seating', description: 'Dining tables, benches, stools, chairs, and occasional tables.', categoryIds: ['tables-seating-and-dining'] },
  { id: 'outdoor-garden', label: 'Outdoor & garden', description: 'Planters, patio furniture, garden structures, and weather-aware builds.', categoryIds: ['outdoor-deck-patio-and-garden-builds'] },
  { id: 'workshop', label: 'Workshop', description: 'Workbenches, jigs, machine support, storage, and workholding.', categoryIds: ['shop-layout-storage-and-organization', 'workbenches-jigs-and-workholding', 'dust-safety-lighting-and-shop-utilities'] },
  { id: 'storage-shelves', label: 'Storage & shelves', description: 'Wall shelves, cabinets, carts, organizers, and space-saving storage.', terms: ['shelf', 'shelves', 'storage', 'organizer', 'cabinet', 'cart'] },
  { id: 'entryway-utility', label: 'Entryway & utility', description: 'Benches, shoe storage, coat organization, laundry, and mudroom projects.', terms: ['entry', 'shoe', 'coat', 'mudroom', 'laundry', 'utility'] },
  { id: 'garage', label: 'Garage', description: 'Mobile workstations, folding surfaces, wall storage, and shop infrastructure.', terms: ['garage', 'mobile', 'folding', 'wall storage', 'tool cart', 'outfeed'] },
  { id: 'decor-gifts', label: 'Decor & gifts', description: 'Serving boards, frames, keepsakes, toys, and scrap-friendly builds.', categoryIds: ['gifts-decor-kids-and-scrap-wood-projects'] },
  { id: 'kids-pets', label: 'Kids & pets', description: 'Durable, cleanable furniture and practical projects for family life.', terms: ['kid', 'child', 'toy', 'pet', 'dog', 'cat'] },
  { id: 'beginner-weekend', label: 'Beginner weekend', description: 'Forgiving builds with modest tool needs and a manageable first scope.', terms: ['beginner', 'simple', 'first', 'weekend', 'one afternoon'] },
]

export function matchesPlanCategory(guide: GuideIndexItem, category: PlanCategory) {
  if (guide.type !== 'project' || guide.status !== 'published') return false
  if (category.categoryIds?.includes(guide.categoryId)) return true
  const haystack = [guide.title, guide.dek, guide.categoryId, guide.clusterId, ...guide.tags].join(' ').toLowerCase()
  return Boolean(category.terms?.some((term) => haystack.includes(term.toLowerCase())))
}
