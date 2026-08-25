import { useState } from 'react'
import { getAnalyticsConsent, setAnalyticsConsent } from '../lib/analytics'

export function ConsentBanner() {
  const [choice, setChoice] = useState(() => getAnalyticsConsent())
  if (choice) return null

  const choose = (value: 'granted' | 'denied') => {
    setAnalyticsConsent(value)
    setChoice(value)
  }

  return <aside className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-3xl rounded-2xl border border-white/15 bg-walnut p-5 text-paper shadow-2xl sm:bottom-5 sm:flex sm:items-center sm:gap-6 sm:p-6"><div className="min-w-0 flex-1"><strong className="font-display text-lg">A small, optional measurement</strong><p className="mt-1 text-sm leading-6 text-paper/65">Allow anonymous usage analytics to help us improve guides. Sign-in and saved projects work either way.</p></div><div className="mt-4 flex gap-2 sm:mt-0"><button onClick={() => choose('denied')} className="rounded-full border border-white/20 px-4 py-3 text-xs font-black text-paper">No thanks</button><button onClick={() => choose('granted')} className="rounded-full bg-amber px-4 py-3 text-xs font-black text-walnut">Allow analytics</button></div></aside>
}
