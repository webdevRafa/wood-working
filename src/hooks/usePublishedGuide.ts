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
    async function loadGuide() {
      let guide: Guide | undefined
      if (db) {
        try {
          const snapshot = await getDocs(query(
            collection(db, 'guides'),
            where('slug', '==', slug),
            where('status', 'in', ['review', 'published']),
            limit(1),
          ))
          if (!snapshot.empty) guide = normalizeGuide(snapshot.docs[0].data())
        } catch {
          // The generated article data below is the resilient read-only fallback.
        }
      }
      if (!guide) {
        try {
          const response = await fetch(`/data/guides/${encodeURIComponent(slug)}.json`)
          if (response.ok) guide = normalizeGuide(await response.json() as Record<string, unknown>)
        } catch {
          // A seed guide may still satisfy the request below.
        }
      }
      if (active) setResult({ slug, guide, settled: true })
    }
    void loadGuide()
    return () => {
      active = false
    }
  }, [slug])

  const remoteGuide = result.slug === slug ? result.guide : undefined
  const loading = Boolean(!localGuide && !(result.slug === slug && result.settled))
  return { guide: remoteGuide ?? localGuide, loading }
}
