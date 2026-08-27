import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { GuideCard } from '../components/GuideCard'
import { useContent } from '../context/ContentContext'
import { matchesPlanCategory, planCategories } from '../data/planCategories'
import { usePageMeta } from '../hooks/usePageMeta'

const PAGE_SIZE = 24

export function PlansPage() {
  const { category: categorySlug } = useParams()
  const [query, setQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const { guideIndex, loadingLibrary } = useContent()
  const selectedCategory = planCategories.find((category) => category.id === categorySlug)
  const publishedProjects = useMemo(() => guideIndex.filter((guide) => guide.type === 'project' && guide.status === 'published'), [guideIndex])

  const pageTitle = selectedCategory ? `${selectedCategory.label} Woodworking Plans | Built True Workshop` : 'Woodworking Plans by Room & Project | Built True Workshop'
  const pageDescription = selectedCategory
    ? `${selectedCategory.description} Browse source-backed Built True Workshop plans with practical dimensions, cut lists, tool paths, and safer checkpoints.`
    : 'Browse source-backed woodworking plans by room, use, and project type—from workshop storage and furniture to outdoor builds and gifts.'
  usePageMeta(pageTitle, pageDescription)

  const categoryCards = useMemo(() => planCategories.map((category) => {
    const guides = publishedProjects.filter((guide) => matchesPlanCategory(guide, category))
    return { category, count: guides.length, cover: guides.find((guide) => guide.coverImage) }
  }).filter((item) => item.count > 0), [publishedProjects])

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return publishedProjects
      .filter((guide) => !selectedCategory || matchesPlanCategory(guide, selectedCategory))
      .filter((guide) => !normalized || [guide.title, guide.dek, ...guide.tags].join(' ').toLowerCase().includes(normalized))
      .sort((a, b) => Number(a.id) - Number(b.id))
  }, [publishedProjects, query, selectedCategory])

  const heroGuide = publishedProjects.find((guide) => guide.id === '301') ?? publishedProjects.find((guide) => guide.coverImage)

  return (
    <main>
      <section className="overflow-hidden border-b border-walnut/10 bg-sawdust">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            {selectedCategory ? <Link to="/plans/" onClick={() => { setQuery(''); setVisibleCount(PAGE_SIZE) }} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-pine"><ArrowLeft size={15} /> All plan categories</Link> : <p className="section-label">Find the build that fits your life</p>}
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(3.2rem,7vw,6.2rem)] font-black leading-[0.9] tracking-[-0.06em] text-walnut">
              {selectedCategory ? selectedCategory.label : <>Browse plans by <span className="text-pine">where they belong.</span></>}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-steel">{selectedCategory?.description ?? 'Start with the room, the purpose, or the kind of weekend you have. Each path opens real source-backed guides—not a decorative category dead end.'}</p>
            <form onSubmit={(event) => event.preventDefault()} className="mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border border-walnut/10 bg-white p-3 shadow-sm">
              <Search size={20} className="ml-2 shrink-0 text-pine" />
              <label htmlFor="plan-search" className="sr-only">Search woodworking plans</label>
              <input id="plan-search" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} placeholder={selectedCategory ? `Search ${selectedCategory.label.toLowerCase()} plans` : 'Search all project plans'} className="min-w-0 flex-1 bg-transparent py-2 text-sm font-bold text-walnut outline-none placeholder:text-steel/70" />
              <span className="hidden rounded-full bg-pine px-4 py-2 text-xs font-black text-white sm:inline">{results.length} plans</span>
            </form>
          </div>
          {heroGuide?.coverImage ? (
            <div className="relative overflow-hidden rounded-[1.75rem] bg-walnut shadow-[0_30px_70px_rgba(36,26,21,0.18)]">
              <img src={heroGuide.coverImage} alt={heroGuide.coverAlt ?? ''} className="aspect-[4/3] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-walnut/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-paper sm:p-8"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber">{publishedProjects.length} source-backed project guides</p><p className="mt-2 font-display text-2xl font-black">Pick the project before you pick the tool.</p></div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div><p className="section-label">Explore a practical path</p><h2 className="mt-4 font-display text-4xl font-black tracking-[-0.04em] text-walnut sm:text-5xl">Rooms, uses, and project types</h2></div>
            <p className="max-w-lg text-sm leading-6 text-steel">Categories can overlap because a storage bench can belong in an entryway, a bedroom, or a workshop. That is useful discovery—not duplicate content.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryCards.map(({ category, count, cover }, index) => {
              const active = category.id === selectedCategory?.id
              return (
                <Link key={category.id} to={`/plans/${category.id}/`} onClick={() => { setQuery(''); setVisibleCount(PAGE_SIZE) }} aria-current={active ? 'page' : undefined} className={`group relative min-h-56 overflow-hidden rounded-[1.35rem] border transition hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(36,26,21,0.12)] ${active ? 'border-pine ring-2 ring-pine/15' : 'border-walnut/10'}`}>
                  {cover?.coverImage ? <img src={cover.coverImage} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" /> : <div className="absolute inset-0 bg-sawdust" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-walnut via-walnut/35 to-walnut/5" />
                  <span className="absolute right-5 top-5 font-mono text-[10px] font-black tracking-[0.15em] text-paper/70">{String(index + 1).padStart(2, '0')}</span>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-paper">
                    <span className="text-[10px] font-black uppercase tracking-[0.16em] text-amber">{count} plan{count === 1 ? '' : 's'}</span>
                    <h3 className="mt-2 font-display text-2xl font-black leading-tight">{category.label}</h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-paper/70">{category.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-black">Explore this path <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-walnut/10 bg-sawdust/55 py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div><p className="section-label">{selectedCategory ? selectedCategory.label : 'Complete plan library'}</p><h2 className="mt-4 font-display text-4xl font-black tracking-[-0.04em] text-walnut sm:text-5xl">{query ? `Results for “${query}”` : selectedCategory ? `${selectedCategory.label} plans` : 'Every project plan'}</h2></div>
            <p className="text-sm font-bold text-steel">{loadingLibrary ? 'Opening the library…' : `${results.length} source-backed plan${results.length === 1 ? '' : 's'}`}</p>
          </div>
          {results.length ? <><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{results.slice(0, visibleCount).map((guide) => <GuideCard key={guide.id} guide={guide} />)}</div>{visibleCount < results.length ? <div className="mt-10 text-center"><button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="rounded-full bg-pine px-7 py-4 text-sm font-black text-white transition hover:bg-[#243f34]">Show 24 more <span className="ml-1 text-white/70">({results.length - visibleCount} remaining)</span></button></div> : null}</> : <div className="mt-8 rounded-2xl border border-dashed border-walnut/25 bg-paper p-12 text-center"><h3 className="font-display text-2xl font-black text-walnut">No plan matches that search.</h3><p className="mt-2 text-steel">Try a broader project name or choose another category.</p></div>}
        </div>
      </section>
    </main>
  )
}
