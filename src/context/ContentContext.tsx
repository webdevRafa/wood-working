import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { guideIndex as seedGuideIndex } from '../data/guides'
import { db } from '../lib/firebase'
import type { GuideIndexItem } from '../types/content'

type ContentContextValue = {
  guideIndex: GuideIndexItem[]
  loadingLibrary: boolean
}

const ContentContext = createContext<ContentContextValue | undefined>(undefined)

function dateString(value: unknown) {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate().toISOString()
  }
  return new Date(0).toISOString()
}

function normalizeIndexItem(data: Record<string, unknown>): GuideIndexItem | undefined {
  if (typeof data.id !== 'string' || typeof data.slug !== 'string' || typeof data.title !== 'string') return undefined
  return { ...data, updatedAt: dateString(data.updatedAt) } as GuideIndexItem
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [libraryGuides, setLibraryGuides] = useState<GuideIndexItem[]>([])
  const [loadingLibrary, setLoadingLibrary] = useState(true)

  useEffect(() => {
    let active = true
    async function loadLibrary() {
      let guides: GuideIndexItem[] = []
      if (db) {
        try {
          const snapshot = await getDocs(query(
            collection(db, 'guideIndex'),
            where('status', 'in', ['review', 'published']),
            limit(500),
          ))
          guides = snapshot.docs
            .map((item) => normalizeIndexItem(item.data()))
            .filter((item): item is GuideIndexItem => item !== undefined)
        } catch {
          // The generated public index below is the resilient read-only fallback.
        }
      }
      if (!guides.length) {
        try {
          const response = await fetch('/data/guide-index.json')
          if (response.ok) {
            const data = await response.json() as Record<string, unknown>[]
            guides = data.map(normalizeIndexItem).filter((item): item is GuideIndexItem => item !== undefined)
          }
        } catch {
          // Seed guides remain available if neither content source can be reached.
        }
      }
      if (active) setLibraryGuides(guides)
    }
    void loadLibrary()
      .finally(() => {
        if (active) setLoadingLibrary(false)
      })
    return () => {
      active = false
    }
  }, [])

  const guideIndex = useMemo(() => {
    const merged = new Map(seedGuideIndex.map((guide) => [guide.id, guide]))
    for (const guide of libraryGuides) {
      const seed = merged.get(guide.id)
      merged.set(guide.id, {
        ...seed,
        ...guide,
        coverImage: guide.coverImage ?? seed?.coverImage,
        coverAlt: guide.coverAlt ?? seed?.coverAlt,
      })
    }
    return [...merged.values()].sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
  }, [libraryGuides])

  return <ContentContext.Provider value={{ guideIndex, loadingLibrary }}>{children}</ContentContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContent() {
  const value = useContext(ContentContext)
  if (!value) throw new Error('useContent must be used inside ContentProvider')
  return value
}
