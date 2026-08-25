import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  Bookmark,
  Check,
  Clock3,
  DollarSign,
  Printer,
  Ruler,
  ShieldAlert,
  Wrench,
} from 'lucide-react'
import { Link, useParams } from 'react-router'
import { BoardFootCalculator } from '../components/BoardFootCalculator'
import { GuideCard } from '../components/GuideCard'
import { getGuideById, getGuideBySlug, guideIndex } from '../data/guides'
import { useSavedGuides } from '../context/SavedGuidesContext'
import { usePageMeta } from '../hooks/usePageMeta'

const sectionLabels: Record<string, string> = {
  project: 'Projects',
  skill: 'Skills',
  troubleshooting: 'Skills',
  review: 'Tools',
  comparison: 'Tools',
  shop: 'Shop setup',
  material: 'Materials',
}

const parentPaths: Record<string, string> = {
  project: '/projects/',
  skill: '/skills/',
  troubleshooting: '/skills/',
  review: '/tools/',
  comparison: '/tools/',
  shop: '/shop/',
  material: '/materials/',
}

export function GuidePage() {
  const { slug = '' } = useParams()
  const guide = getGuideBySlug(slug)
  const { isSaved, toggleSaved } = useSavedGuides()
  const [saveMessage, setSaveMessage] = useState('')
  usePageMeta(
    guide?.seoTitle ?? 'Guide not found | Built True Workshop',
    guide?.metaDescription ?? 'The requested guide could not be found.',
    guide?.indexStatus !== 'index',
  )

  const related = useMemo(() => {
    if (!guide) return []
    const explicit = guide.relatedGuideIds.map(getGuideById).filter((item) => item !== undefined)
    if (explicit.length) return explicit
    return guideIndex.filter((item) => item.id !== guide.id && (item.clusterId === guide.clusterId || item.type === guide.type)).slice(0, 3)
  }, [guide])

  if (!guide) {
    return <main className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8"><p className="section-label">Wrong turn</p><h1 className="mt-4 font-display text-5xl font-black text-walnut">That guide is not on the bench.</h1><p className="mt-5 text-steel">The link may have changed, or the draft may not exist yet.</p><Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-pine px-6 py-4 text-sm font-black text-white"><ArrowLeft size={17} />Back to the workshop</Link></main>
  }

  const totalHours = guide.totalMinutes ? Math.max(1, Math.round(guide.totalMinutes / 60)) : undefined

  return (
    <main>
      <header className="border-b border-walnut/10 bg-paper">
        <div className="mx-auto max-w-[1180px] px-5 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-10">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-bold text-steel"><Link to="/" className="hover:text-pine">Home</Link><span>/</span><Link to={parentPaths[guide.type]} className="hover:text-pine">{sectionLabels[guide.type]}</Link><span>/</span><span className="text-walnut">{guide.title}</span></nav>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-pine px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white">{guide.type}</span><span className="text-[10px] font-black uppercase tracking-[0.16em] text-amber">Editorial draft · noindex</span></div>
              <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.9rem,7vw,5.8rem)] font-black leading-[0.92] tracking-[-0.055em] text-walnut">{guide.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-steel sm:text-xl">{guide.dek}</p>
            </div>
            <div className="lg:text-right"><div className="flex gap-2 lg:justify-end"><button onClick={() => void toggleSaved(guide.id, guide.slug, guide.title).then((result) => setSaveMessage(result === 'sign-in-required' ? 'Sign in to save this guide.' : result === 'saved' ? 'Guide saved.' : 'Guide removed.'))} className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-black lg:flex-none ${isSaved(guide.id) ? 'border-pine bg-pine text-white' : 'border-walnut/20 bg-white text-walnut hover:border-pine'}`}><Bookmark size={17} fill={isSaved(guide.id) ? 'currentColor' : 'none'} />{isSaved(guide.id) ? 'Saved' : 'Save'}</button><button onClick={() => window.print()} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-walnut/20 bg-white px-4 py-3 text-sm font-black text-walnut hover:border-pine lg:flex-none"><Printer size={17} />Print</button></div>{saveMessage ? <p role="status" className="mt-2 text-xs font-bold text-steel">{saveMessage}</p> : null}</div>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-walnut/10 bg-walnut/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Wrench, label: 'Difficulty', value: guide.skillLevel ?? 'All levels' },
              { icon: Clock3, label: 'Total time', value: totalHours ? `${totalHours} hours` : 'Read in 10 min' },
              { icon: DollarSign, label: 'Cost band', value: guide.costBand ? '$'.repeat(guide.costBand) : 'Varies' },
              { icon: Ruler, label: 'Finished size', value: guide.dimensions?.imperial ?? 'Project dependent' },
            ].map(({ icon: Icon, label, value }) => <div key={label} className="bg-white p-5"><span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-steel"><Icon size={15} className="text-pine" />{label}</span><strong className="mt-2 block text-sm text-walnut">{value}</strong></div>)}
          </div>
        </div>
      </header>

      <div className="border-b border-amber/25 bg-[#fff6e9]"><div className="mx-auto flex max-w-[1180px] items-start gap-3 px-5 py-4 text-sm leading-6 text-walnut sm:px-8"><AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber" /><p><strong>Affiliate disclosure:</strong> {guide.affiliateDisclosure}</p></div></div>

      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,760px)_260px] lg:items-start">
        <article className="article-content min-w-0">
          {guide.id === '031' ? <BoardFootCalculator /> : null}

          {guide.tools.length || guide.materials.length ? (
            <div className="mb-12 grid gap-5 md:grid-cols-2">
              {guide.tools.length ? <section className="rounded-[1.3rem] border border-walnut/10 bg-white p-6"><h2 className="font-display text-2xl font-black text-walnut">Tools</h2><ul className="mt-5 grid gap-4">{guide.tools.map((tool) => <li key={tool.name} className="grid grid-cols-[auto_1fr] gap-3"><span className={`mt-0.5 grid h-5 w-5 place-items-center rounded-full ${tool.required ? 'bg-pine text-white' : 'bg-sawdust text-pine'}`}><Check size={12} strokeWidth={3} /></span><span><strong className="text-sm text-walnut">{tool.name}{tool.required ? '' : ' (optional)'}</strong><span className="mt-1 block text-sm leading-6 text-steel">{tool.purpose}{tool.substitute ? ` Substitute: ${tool.substitute}.` : ''}</span></span></li>)}</ul></section> : null}
              {guide.materials.length ? <section className="rounded-[1.3rem] border border-walnut/10 bg-white p-6"><h2 className="font-display text-2xl font-black text-walnut">Materials</h2><ul className="mt-5 grid gap-4">{guide.materials.map((material) => <li key={material.name} className="border-b border-walnut/10 pb-3 last:border-0 last:pb-0"><span className="flex items-baseline justify-between gap-4"><strong className="text-sm text-walnut">{material.name}</strong><span className="text-xs font-black text-pine">{material.quantity}</span></span>{material.notes ? <span className="mt-1 block text-sm leading-6 text-steel">{material.notes}</span> : null}</li>)}</ul></section> : null}
            </div>
          ) : null}

          {guide.cutList ? <section id="cut-list" className="mb-12 overflow-hidden rounded-[1.3rem] border border-walnut/10 bg-white"><div className="border-b border-walnut/10 px-6 py-5"><h2 className="font-display text-2xl font-black text-walnut">Cut list</h2><p className="mt-1 text-sm text-steel">Verify all dimensions against your actual material before cutting the full batch.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[650px] border-collapse text-left text-sm"><thead className="bg-sawdust/60 text-[10px] font-black uppercase tracking-[0.12em] text-steel"><tr>{['Part', 'Qty', 'Thickness', 'Width', 'Length'].map((heading) => <th key={heading} className="px-5 py-3">{heading}</th>)}</tr></thead><tbody>{guide.cutList.map((item) => <tr key={item.part} className="border-t border-walnut/10"><td className="px-5 py-4 font-bold text-walnut">{item.part}{item.notes ? <span className="mt-1 block text-xs font-normal text-steel">{item.notes}</span> : null}</td><td className="px-5 py-4">{item.quantity}</td><td className="px-5 py-4">{item.thickness}</td><td className="px-5 py-4">{item.width}</td><td className="px-5 py-4">{item.length}</td></tr>)}</tbody></table></div></section> : null}

          {guide.safetyNotes.length ? <section className="mb-12 rounded-[1.3rem] border border-[#b33a2b]/25 bg-[#fff4f1] p-6"><div className="flex items-center gap-3"><ShieldAlert className="text-[#b33a2b]" /><h2 className="font-display text-2xl font-black text-walnut">Before you start</h2></div><ul className="mt-4 grid gap-3">{guide.safetyNotes.map((note) => <li key={note} className="flex gap-3 text-sm leading-6 text-charcoal"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b33a2b]" />{note}</li>)}</ul></section> : null}

          {guide.sections.map((section, index) => <section key={section.id} id={section.id} className="scroll-mt-28 border-t border-walnut/10 py-9 first:border-0 first:pt-0"><span className="text-[10px] font-black uppercase tracking-[0.18em] text-amber">{String(index + 1).padStart(2, '0')}</span><h2 className="mt-2 font-display text-3xl font-black leading-tight tracking-tight text-walnut sm:text-4xl">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-[17px] leading-8 text-charcoal/90">{paragraph}</p>)}{section.bullets ? <ul className="mt-5 grid gap-3">{section.bullets.map((bullet) => <li key={bullet} className="flex gap-3 leading-7 text-charcoal"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pine" />{bullet}</li>)}</ul> : null}{section.callout ? <aside className={`mt-7 rounded-xl border-l-4 p-5 ${section.callout.tone === 'warning' ? 'border-[#b33a2b] bg-[#fff4f1]' : section.callout.tone === 'decision' ? 'border-amber bg-[#fff6e9]' : 'border-pine bg-sawdust/55'}`}><strong className="font-display text-lg text-walnut">{section.callout.title}</strong><p className="mt-2 text-sm leading-6 text-charcoal/80">{section.callout.body}</p></aside> : null}</section>)}
        </article>

        <aside className="hidden lg:block lg:sticky lg:top-28"><div className="rounded-[1.2rem] border border-walnut/10 bg-white p-5"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-steel">In this guide</p><nav className="mt-4 grid gap-3">{guide.sections.map((section) => <a key={section.id} href={`#${section.id}`} className="text-sm font-bold leading-5 text-walnut hover:text-pine">{section.heading}</a>)}</nav></div><div className="mt-4 rounded-[1.2rem] bg-sawdust p-5"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-pine">Evidence status</p><strong className="mt-2 block font-display text-lg text-walnut">Editorial build draft</strong><p className="mt-2 text-xs leading-5 text-steel">This page remains noindex until measurements, steps, safety notes, and original evidence pass review.</p></div></aside>
      </div>

      {related.length ? <section className="border-t border-walnut/10 bg-sawdust/55 py-16"><div className="mx-auto max-w-[1180px] px-5 sm:px-8"><p className="section-label">Keep building</p><h2 className="mt-3 font-display text-4xl font-black text-walnut">The next useful step</h2><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{related.map((item) => <GuideCard key={item.id} guide={item} compact />)}</div></div></section> : null}
    </main>
  )
}
