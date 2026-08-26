import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { GuideCard } from '../components/GuideCard'
import { useContent } from '../context/ContentContext'
import { usePageMeta } from '../hooks/usePageMeta'
import type { GuideType } from '../types/content'

type HubPageProps = {
  eyebrow: string
  title: string
  description: string
  types?: GuideType[]
  categoryIds?: string[]
}

const PAGE_SIZE = 24

export function HubPage({ eyebrow, title, description, types, categoryIds }: HubPageProps) {
  const [query, setQuery] = useState('')
  const [intent, setIntent] = useState('all')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const { guideIndex, loadingLibrary } = useContent()
  usePageMeta(`${title} | Built True Workshop`, description)

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return guideIndex.filter((guide) => {
      const inIntent = intent === 'all' || guide.intent === intent
      const inSearch = !normalized || [guide.title, guide.dek, ...guide.tags].join(' ').toLowerCase().includes(normalized)
      const inScope =
        (!types && !categoryIds) ||
        Boolean(types?.includes(guide.type)) ||
        Boolean(categoryIds?.includes(guide.categoryId))
      return inScope && inIntent && inSearch
    })
  }, [categoryIds, guideIndex, intent, query, types])

  const visibleResults = results.slice(0, visibleCount)

  return (
    <main>
      <section className="border-b border-walnut/10 bg-sawdust py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8"><p className="section-label">{eyebrow}</p><h1 className="mt-4 max-w-4xl font-display text-[clamp(3.2rem,7vw,6rem)] font-black leading-[0.92] tracking-[-0.055em] text-walnut">{title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-steel">{description}</p></div>
      </section>
      <section className="bg-paper py-12 sm:py-16">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex flex-col gap-3 rounded-2xl border border-walnut/10 bg-white p-3 sm:flex-row">
            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-paper px-4"><Search size={18} className="text-pine" /><input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} placeholder={`Search ${title.toLowerCase()}`} className="min-w-0 flex-1 bg-transparent py-3 text-sm font-bold outline-none" /></label>
            <label className="flex items-center gap-2 rounded-xl bg-paper px-4 text-sm font-bold text-steel"><SlidersHorizontal size={17} /><span className="sr-only">Intent</span><select value={intent} onChange={(event) => { setIntent(event.target.value); setVisibleCount(PAGE_SIZE) }} className="bg-transparent py-3 font-bold text-walnut outline-none"><option value="all">All intents</option><option value="learn">Learn</option><option value="build">Build</option><option value="buy">Buy</option></select></label>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-bold text-steel">{results.length} guide{results.length === 1 ? '' : 's'} in this workshop path</p><span className="text-[10px] font-black uppercase tracking-[0.15em] text-pine">{loadingLibrary ? 'Opening the workshop library' : 'Practical guides + connected reading'}</span></div>
          {results.length ? <><div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{visibleResults.map((guide) => <GuideCard key={guide.id} guide={guide} />)}</div>{visibleCount < results.length ? <div className="mt-10 text-center"><button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="rounded-full bg-pine px-7 py-4 text-sm font-black text-white transition hover:bg-[#243f34]">Show 24 more <span className="ml-1 text-white/70">({results.length - visibleCount} remaining)</span></button></div> : null}</> : <div className="mt-6 rounded-2xl border border-dashed border-walnut/25 p-12 text-center"><h2 className="font-display text-2xl font-black text-walnut">No guide matches that filter yet.</h2><p className="mt-2 text-steel">Clear the filters or search another workshop path.</p></div>}
        </div>
      </section>
    </main>
  )
}
