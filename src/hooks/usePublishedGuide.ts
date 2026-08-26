import { useEffect, useState } from 'react'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { getGuideBySlug } from '../data/guides'
import { db } from '../lib/firebase'
import type { Guide } from '../types/content'

function dateString(value: unknown) {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate().toISOString()
  }
  return new Date(0).toISOString()
}

function normalizeGuide(data: Record<string, unknown>): Guide {
  return {
    ...data,
    createdAt: dateString(data.createdAt),
    updatedAt: dateString(data.updatedAt),
    publishedAt: data.publishedAt ? dateString(data.publishedAt) : undefined,
  } as Guide
}

export function usePublishedGuide(slug: string) {
  const localGuide = getGuideBySlug(slug)
  const [result, setResult] = useState<{ slug: string; guide?: Guide; settled: boolean }>({ slug: '', settled: false })

  useEffect(() => {
    let active = true
    if (!db) return
    const guideQuery = query(
      collection(db, 'guides'),
      where('slug', '==', slug),
      where('status', 'in', ['draft', 'review', 'published']),
      limit(1),
    )
    void getDocs(guideQuery)
      .then((snapshot) => {
        if (active) setResult({ slug, guide: snapshot.empty ? undefined : normalizeGuide(snapshot.docs[0].data()), settled: true })
      })
      .catch(() => {
        // The local editorial sample is still available while Firebase is offline or awaiting rule deployment.
        if (active) setResult({ slug, settled: true })
      })
    return () => {
      active = false
    }
  }, [slug])

  const remoteGuide = result.slug === slug ? result.guide : undefined
  const loading = Boolean(db && !localGuide && !(result.slug === slug && result.settled))
  return { guide: remoteGuide ?? localGuide, loading }
}
