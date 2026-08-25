import type { Analytics } from 'firebase/analytics'
import { firebaseApp } from './firebase'

const consentKey = 'btw_analytics_consent'
let analyticsPromise: Promise<Analytics | null> | null = null

export function getAnalyticsConsent() {
  return typeof window !== 'undefined' ? window.localStorage.getItem(consentKey) : null
}

export function setAnalyticsConsent(value: 'granted' | 'denied') {
  window.localStorage.setItem(consentKey, value)
}

async function loadAnalytics() {
  if (!firebaseApp || getAnalyticsConsent() !== 'granted') return null
  if (!analyticsPromise) {
    analyticsPromise = import('firebase/analytics').then(async ({ getAnalytics, isSupported }) =>
      (await isSupported()) ? getAnalytics(firebaseApp) : null,
    )
  }
  return analyticsPromise
}

export async function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  const analytics = await loadAnalytics()
  if (!analytics) return
  const { logEvent } = await import('firebase/analytics')
  logEvent(analytics, name, params)
}
