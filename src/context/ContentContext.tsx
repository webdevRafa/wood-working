import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { guideIndex as seedGuideIndex } from '../data/guides'
import { db } from '../lib/firebase'
import type { GuideIndexItem } from '../types/content'

type ContentContextValue = {
  guideIndex: GuideIndexItem[]
  loadingPublished: boolean
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
  const [publishedGuides, setPublishedGuides] = useState<GuideIndexItem[]>([])
  const [loadingPublished, setLoadingPublished] = useState(Boolean(db))

  useEffect(() => {
    if (!db) return
    let active = true
    const publishedQuery = query(collection(db, 'guideIndex'), where('status', '==', 'published'), limit(500))
    void getDocs(publishedQuery)
      .then((snapshot) => {
        if (!active) return
        setPublishedGuides(
          snapshot.docs
            .map((item) => normalizeIndexItem(item.data()))
            .filter((item): item is GuideIndexItem => item !== undefined),
        )
      })
      .catch(() => {
        // Local editorial previews remain usable if Firebase is unavailable or rules are not deployed yet.
      })
      .finally(() => {
        if (active) setLoadingPublished(false)
      })
    return () => {
      active = false
    }
  }, [])

  const guideIndex = useMemo(() => {
    const merged = new Map(seedGuideIndex.map((guide) => [guide.id, guide]))
    for (const guide of publishedGuides) merged.set(guide.id, guide)
    return [...merged.values()]
  }, [publishedGuides])

  return <ContentContext.Provider value={{ guideIndex, loadingPublished }}>{children}</ContentContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContent() {
  const value = useContext(ContentContext)
  if (!value) throw new Error('useContent must be used inside ContentProvider')
  return value
}
