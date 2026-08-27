import { ArrowRight, ExternalLink, FileCheck2, SearchCheck, ShieldCheck } from 'lucide-react'
import { Link, useSearchParams } from 'react-router'
import { productsForSubcategory, shopCategories, type ShopCategoryId } from '../data/shopCatalog'
import { usePageMeta } from '../hooks/usePageMeta'

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedCategory = searchParams.get('category') as ShopCategoryId | null
  const requestedType = searchParams.get('type')
  const activeCategory = shopCategories.find((category) => category.id === requestedCategory) ?? shopCategories[0]
  const activeSubcategory = activeCategory.subcategories.find((subcategory) => subcategory.id === requestedType)
  const products = productsForSubcategory(activeCategory.id, activeSubcategory?.id)

  usePageMeta(
    'Woodworking Tool & Supply Shortlists | Built True Workshop',
    'Browse woodworking tools and supplies by product type, with real model numbers, plain retailer links, and manufacturer references.',
  )

  const selectCategory = (categoryId: ShopCategoryId) => {
    setSearchParams({ category: categoryId }, { replace: true })
  }

  const selectSubcategory = (subcategoryId?: string) => {
    setSearchParams(subcategoryId ? { category: activeCategory.id, type: subcategoryId } : { category: activeCategory.id }, { replace: true })
  }

  return (
    <main>
      <section className="relative overflow-hidden border-b border-walnut/10 bg-walnut text-paper">
        <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-[radial-gradient(circle_at_top_right,rgba(212,122,31,0.28),transparent_60%)] lg:block" />
        <div className="relative mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="section-label !text-amber">The project comes first</p>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(3.2rem,7vw,6.4rem)] font-black leading-[0.9] tracking-[-0.06em]">
              Shop by the job <span className="text-amber">the tool must do.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-paper/70">
              Real model numbers, clear product types, and honest tradeoffs. Every path in this section stays inside the shop.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber">Retail link status</p>
            <p className="mt-3 text-sm leading-6 text-paper/70">
              These are plain, non-affiliate Amazon search links for the named model. We do not show scraped prices or ratings. Confirm the seller, model number, included accessories, and current warranty before ordering.
            </p>
            <Link to="/affiliate-disclosure/" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-paper hover:text-amber">
              Read our disclosure <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper py-12 sm:py-16">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-label">Browse the workshop aisle</p>
              <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.04em] text-walnut sm:text-5xl">What are you trying to solve?</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-steel">Choose a department, then narrow by product type. Every filter below shows products only.</p>
          </div>

          <div className="mt-8 grid overflow-hidden rounded-[1.5rem] border border-walnut/10 bg-white lg:grid-cols-[18rem_1fr]">
            <div className="border-b border-walnut/10 bg-sawdust/55 p-3 lg:border-b-0 lg:border-r">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
                {shopCategories.map((category, index) => {
                  const active = category.id === activeCategory.id
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => selectCategory(category.id)}
                      aria-pressed={active}
                      className={`group flex min-h-16 items-center gap-3 rounded-xl px-3 py-3 text-left transition ${active ? 'bg-pine text-white shadow-sm' : 'text-walnut hover:bg-white'}`}
                    >
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-[10px] font-black ${active ? 'bg-white/15 text-white' : 'bg-white text-amber'}`}>{String(index + 1).padStart(2, '0')}</span>
                      <span className="text-sm font-black leading-tight">{category.shortLabel}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="p-5 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-5 border-b border-walnut/10 pb-8 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber">Selected category</p>
                  <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.04em] text-walnut">{activeCategory.label}</h2>
                  <p className="mt-3 max-w-2xl leading-7 text-steel">{activeCategory.description}</p>
                </div>
                <div className="max-w-md">
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.16em] text-steel">Filter products by type</p>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => selectSubcategory()} aria-pressed={!activeSubcategory} className={`rounded-full border px-3 py-2 text-xs font-black transition ${!activeSubcategory ? 'border-pine bg-pine text-white' : 'border-walnut/10 bg-paper text-steel hover:border-pine/30 hover:text-pine'}`}>All {activeCategory.shortLabel.toLowerCase()}</button>
                    {activeCategory.subcategories.map((subcategory) => <button key={subcategory.id} type="button" onClick={() => selectSubcategory(subcategory.id)} aria-pressed={subcategory.id === activeSubcategory?.id} className={`rounded-full border px-3 py-2 text-xs font-black transition ${subcategory.id === activeSubcategory?.id ? 'border-pine bg-pine text-white' : 'border-walnut/10 bg-paper text-steel hover:border-pine/30 hover:text-pine'}`}>{subcategory.label}</button>)}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-end justify-between gap-3">
                <div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-amber">Products</p><h3 className="mt-2 font-display text-3xl font-black text-walnut">{activeSubcategory?.label ?? `All ${activeCategory.shortLabel.toLowerCase()}`}</h3></div>
                <span className="rounded-full bg-sawdust px-3 py-1.5 text-xs font-black text-steel">{products.length} product{products.length === 1 ? '' : 's'}</span>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <article key={product.id} className="flex h-full flex-col rounded-[1.25rem] border border-walnut/10 bg-paper p-5 transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(36,26,21,0.09)] sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.16em] text-amber">{product.brand}</span>
                        <h3 className="mt-2 font-display text-2xl font-black leading-tight text-walnut">{product.name}</h3>
                      </div>
                      <span className="shrink-0 rounded-full bg-white px-3 py-1.5 font-mono text-[10px] font-black text-pine ring-1 ring-walnut/10">{product.model}</span>
                    </div>
                    <p className="mt-5 text-sm font-black leading-6 text-walnut">Use it for: {product.useCase}</p>
                    <p className="mt-3 flex-1 text-sm leading-6 text-steel">{product.editorialNote}</p>
                    <div className="mt-6 grid gap-2">
                      <a href={product.amazonUrl} target="_blank" rel="nofollow noopener noreferrer" className="group flex items-center justify-between rounded-full bg-pine px-4 py-3 text-sm font-black text-white transition hover:bg-[#243f34]">
                        Find this model on Amazon <ExternalLink size={15} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                      {product.manufacturerUrl ? <a href={product.manufacturerUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-walnut/15 px-4 py-3 text-xs font-black text-walnut hover:border-pine hover:text-pine">Manufacturer details or manual <ExternalLink size={13} /></a> : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-walnut/10 bg-sawdust py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: SearchCheck, title: 'Start with the task', body: 'The shortlist is organized around cuts, joints, surfaces, and shop constraints—not a brand popularity contest.' },
              { icon: FileCheck2, title: 'Verify the exact model', body: 'Every product names a model and links to manufacturer details so a changed marketplace listing is easier to catch.' },
              { icon: ShieldCheck, title: 'Know the tradeoffs', body: 'Each listing explains where the model fits and what to verify, without sending you into an unrelated content feed.' },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-[1.25rem] bg-paper p-6 sm:p-7"><Icon className="text-pine" size={24} /><h3 className="mt-5 font-display text-2xl font-black text-walnut">{title}</h3><p className="mt-3 text-sm leading-6 text-steel">{body}</p></div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
