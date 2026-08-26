import { useMemo, useState } from 'react'
import { LibraryBig, Search, SlidersHorizontal, X } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { GuideCard } from '../components/GuideCard'
import { useContent } from '../context/ContentContext'
import { searchGuides } from '../lib/guideSearch'
import { usePageMeta } from '../hooks/usePageMeta'

const scopeOptions = [
  { value: 'all', label: 'All guides' },
  { value: 'projects', label: 'Projects' },
  { value: 'skills', label: 'Skills' },
  { value: 'tools', label: 'Tools' },
  { value: 'shop', label: 'Shop setup' },
  { value: 'materials', label: 'Materials' },
] as const

const suggestedSearches = ['beginner projects', 'table saw', 'small shop', 'joinery', 'wood finishing']

function matchesScope(type: string, scope: string) {
  if (scope === 'all') return true
  if (scope === 'projects') return type === 'project'
  if (scope === 'skills') return type === 'skill' || type === 'troubleshooting'
  if (scope === 'tools') return type === 'review' || type === 'comparison'
  if (scope === 'shop') return type === 'shop'
  if (scope === 'materials') return type === 'material'
  return true
}

export function SearchPage() {
  const { guideIndex, loadingLibrary } = useContent()
  const [searchParams, setSearchParams] = useSearchParams()
  const [visibleCount, setVisibleCount] = useState(24)
  const query = searchParams.get('q') ?? ''
  const scope = searchParams.get('scope') ?? 'all'
  const intent = searchParams.get('intent') ?? 'all'

  usePageMeta(
    'Search 500 Woodworking Guides | Built True Workshop',
    'Search the complete Built True Workshop library by project, skill, tool decision, shop setup, material, and intent.',
    true,
  )

  const publishedCount = useMemo(
    () => guideIndex.filter((guide) => guide.status === 'published').length,
    [guideIndex],
  )

  const results = useMemo(
    () =>
      searchGuides(guideIndex, query).filter(
        (guide) => matchesScope(guide.type, scope) && (intent === 'all' || guide.intent === intent),
      ),
    [guideIndex, intent, query, scope],
  )

  const updateParam = (name: string, value: string, emptyValue = '') => {
    const next = new URLSearchParams(searchParams)
    if (!value || value === emptyValue) next.delete(name)
    else next.set(name, value)
    setVisibleCount(24)
    setSearchParams(next, { replace: true })
  }

  const chooseSuggestion = (suggestion: string) => {
    const next = new URLSearchParams(searchParams)
    next.set('q', suggestion)
    setVisibleCount(24)
    setSearchParams(next, { replace: true })
  }

  return (
    <main>
      <section className="border-b border-walnut/10 bg-sawdust/55">
        <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 sm:py-16">
          <div className="flex max-w-3xl items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-pine">
            <LibraryBig size={16} /> Complete workshop library
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-black tracking-[-0.04em] text-walnut sm:text-6xl">
            Find the next useful guide.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-steel sm:text-lg">
            Search {loadingLibrary ? 'the full library of 500' : publishedCount.toLocaleString()} practical woodworking guides, then narrow by what you want to build, learn, or buy.
          </p>

          <div className="mt-8 rounded-[1.35rem] border border-walnut/10 bg-white p-3 shadow-[0_18px_55px_rgba(44,34,27,0.08)]">
            <label htmlFor="library-search" className="sr-only">Search all woodworking guides</label>
            <div className="flex items-center gap-3 rounded-xl bg-paper px-4 py-2">
              <Search className="shrink-0 text-pine" size={21} />
              <input
                id="library-search"
                autoFocus
                value={query}
                onChange={(event) => updateParam('q', event.target.value)}
                placeholder="Try “coffee table,” “router,” or “dust collection”"
                className="min-w-0 flex-1 bg-transparent py-3 text-base font-bold text-walnut outline-none placeholder:font-medium placeholder:text-steel/65 sm:text-lg"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => updateParam('q', '')}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-steel transition hover:bg-sawdust hover:text-walnut"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              ) : null}
            </div>
          </div>

          {!query ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-bold text-steel">Popular:</span>
              {suggestedSearches.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => chooseSuggestion(suggestion)}
                  className="rounded-full border border-walnut/10 bg-white px-3 py-2 text-xs font-extrabold text-walnut transition hover:border-pine/30 hover:text-pine"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-5 border-b border-walnut/10 pb-7">
          <div className="flex flex-wrap gap-2" aria-label="Filter by guide type">
            {scopeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateParam('scope', option.value, 'all')}
                aria-pressed={scope === option.value}
                className={`rounded-full px-4 py-2.5 text-sm font-extrabold transition ${scope === option.value ? 'bg-pine text-white' : 'border border-walnut/10 bg-white text-walnut hover:border-pine/30 hover:text-pine'}`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold text-steel" aria-live="polite">
              {loadingLibrary ? 'Opening the complete workshop library…' : <><strong className="text-walnut">{results.length.toLocaleString()}</strong> {results.length === 1 ? 'guide' : 'guides'}{query ? <> for “{query}”</> : ' available'}</>}
            </p>
            <label className="flex items-center gap-2 text-sm font-bold text-steel">
              <SlidersHorizontal size={16} />
              <span>Intent</span>
              <select
                value={intent}
                onChange={(event) => updateParam('intent', event.target.value, 'all')}
                className="rounded-full border border-walnut/10 bg-white px-4 py-2.5 font-extrabold text-walnut outline-none focus:border-pine"
              >
                <option value="all">All intents</option>
                <option value="learn">Learn</option>
                <option value="build">Build</option>
                <option value="buy">Buy</option>
              </select>
            </label>
          </div>
        </div>

        {results.length ? (
          <>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.slice(0, visibleCount).map((guide) => <GuideCard key={guide.id} guide={guide} />)}
            </div>
            {visibleCount < results.length ? (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + 24)}
                  className="rounded-full bg-pine px-7 py-3.5 text-sm font-black text-white shadow-[0_12px_30px_rgba(45,83,69,0.2)] transition hover:-translate-y-0.5 hover:bg-[#243f34]"
                >
                  Show 24 more <span className="ml-1 text-white/65">({(results.length - visibleCount).toLocaleString()} remaining)</span>
                </button>
              </div>
            ) : null}
          </>
        ) : !loadingLibrary ? (
          <div className="mx-auto max-w-2xl py-16 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sawdust text-pine"><Search /></div>
            <h2 className="mt-5 font-display text-3xl font-black text-walnut">No exact match on the bench.</h2>
            <p className="mt-3 leading-7 text-steel">Try a broader term or start with one of these proven workshop topics.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {suggestedSearches.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => chooseSuggestion(suggestion)} className="rounded-full border border-walnut/10 bg-white px-4 py-2.5 text-sm font-extrabold text-walnut hover:border-pine/30 hover:text-pine">{suggestion}</button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setVisibleCount(24)
                setSearchParams({}, { replace: true })
              }}
              className="mt-7 text-sm font-black text-pine underline decoration-amber decoration-2 underline-offset-4"
            >
              Browse the complete library
            </button>
          </div>
        ) : null}
      </section>
    </main>
  )
}
