import {
  ArrowRight,
  BookOpen,
  Check,
  Ruler,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { Link } from 'react-router'
import { GuideCard } from '../components/GuideCard'
import { useContent } from '../context/ContentContext'
import { usePageMeta } from '../hooks/usePageMeta'

const paths = [
  { icon: Ruler, title: 'Start from zero', copy: 'Learn measuring, cutting, drilling, and assembly habits that prevent expensive mistakes.', to: '/start-here/' },
  { icon: Wrench, title: 'Set up a smarter shop', copy: 'Plan around space, power, dust, and real projects before a machine claims the floor.', to: '/shop/' },
  { icon: ShieldCheck, title: 'Choose tools honestly', copy: 'See who a tool fits, what ownership costs, and when you should skip it.', to: '/tools/' },
]

export function HomePage() {
  const { guideIndex } = useContent()
  usePageMeta(
    'Built True Workshop | Build with confidence',
    'Practical woodworking projects, honest tool guidance, and shop-tested skills for building with confidence.',
  )
  const featured = ['301', '001', '202'].map((id) => guideIndex.find((guide) => guide.id === id)).filter((guide) => guide !== undefined)
  if (featured.length < 3) featured.push(...guideIndex.filter((guide) => !featured.includes(guide)).slice(0, 3 - featured.length))

  return (
    <main>
      <section className="overflow-hidden bg-paper">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.03fr_.97fr] lg:gap-16 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-pine/20 bg-white px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-pine shadow-sm"><Sparkles size={14} fill="currentColor" />Independent projects & honest tool guidance</div>
            <h1 className="mt-7 max-w-3xl font-display text-[clamp(3.25rem,7vw,6.6rem)] font-black leading-[0.88] tracking-[-0.065em] text-walnut">Build with confidence.<span className="mt-3 block text-pine">Buy tools with a reason.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-steel sm:text-xl">Complete woodworking guides, measured plans, and plainspoken tool advice for people who would rather make sawdust than chase hype.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/start-here/" className="group inline-flex items-center justify-center gap-3 rounded-full bg-amber px-6 py-4 text-sm font-black text-walnut shadow-[0_8px_24px_rgba(212,122,31,0.24)] transition hover:-translate-y-0.5 hover:bg-[#e18a30]">Find your first project<ArrowRight size={18} className="transition group-hover:translate-x-1" /></Link>
              <Link to="/shop/" className="inline-flex items-center justify-center rounded-full border border-walnut/20 bg-white px-6 py-4 text-sm font-black text-walnut transition hover:border-pine hover:text-pine">Set up my shop</Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 border-t border-walnut/15 pt-6">
              {[["500", "guide roadmap"], ["No hype", "testing promise"], ["Free", "starter plans"]].map(([value, label]) => <div key={label} className="pr-3"><strong className="block font-display text-xl font-black text-walnut sm:text-2xl">{value}</strong><span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-steel sm:text-[11px]">{label}</span></div>)}
            </div>
          </div>

          <div className="relative min-h-[480px] overflow-hidden rounded-[2rem] bg-walnut shadow-[0_30px_70px_rgba(36,26,21,0.22)] sm:min-h-[560px]">
            <img src="/images/workshop-hero.png" alt="A finished walnut coffee table beside a practical home workshop bench" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-walnut/90 via-walnut/10 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 rounded-[1.25rem] border border-white/15 bg-walnut/85 p-5 text-paper backdrop-blur-md sm:inset-x-7 sm:bottom-7 sm:p-6">
              <div className="flex items-start justify-between gap-5"><div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber">Weekend build no. 01</p><h2 className="mt-2 font-display text-2xl font-black">A coffee table built to teach.</h2></div><span className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider">Free plan</span></div>
              <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-bold text-paper/75"><span>3 tools</span><span>·</span><span>6–8 hours</span><span>·</span><span>42 × 22 in</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-walnut/10 bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-start gap-3 sm:items-center"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sawdust text-walnut"><BookOpen size={18} /></span><div><p className="font-display text-lg font-black text-walnut">Not sure where to begin?</p><p className="text-sm text-steel">Tell us your space, time, and goal. We’ll point you to a realistic first win.</p></div></div>
          <Link to="/start-here/" className="group inline-flex items-center justify-center gap-3 rounded-full border border-walnut/20 px-5 py-3 text-sm font-black text-walnut hover:border-pine hover:text-pine">Find my starting point<ArrowRight size={17} className="transition group-hover:translate-x-1" /></Link>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="section-label">Start with a win</p><h2 className="section-title mt-3">Useful projects. Honest difficulty.</h2></div><Link to="/projects/" className="group inline-flex items-center gap-2 text-sm font-black text-pine">Browse all projects<ArrowRight size={17} className="transition group-hover:translate-x-1" /></Link></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">{featured.map((guide) => <GuideCard key={guide.id} guide={guide} />)}</div>
        </div>
      </section>

      <section className="bg-walnut py-20 text-paper sm:py-28">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="max-w-3xl"><p className="section-label text-amber">Choose your path</p><h2 className="section-title mt-3 text-paper">Build the shop—and judgment—you actually need.</h2></div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/10 lg:grid-cols-3">
            {paths.map(({ icon: Icon, title, copy, to }) => <article key={title} className="bg-walnut p-7 sm:p-9"><span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-amber"><Icon /></span><h3 className="mt-7 font-display text-2xl font-black">{title}</h3><p className="mt-3 leading-7 text-paper/65">{copy}</p><Link to={to} className="mt-7 inline-flex items-center gap-2 text-sm font-black text-amber">Open this path<ArrowRight size={16} /></Link></article>)}
          </div>
        </div>
      </section>

      <section className="bg-sawdust py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div><p className="section-label">Our shop promise</p><h2 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight text-walnut">A recommendation should earn its place on your bench.</h2><Link to="/about/testing-method/" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-pine">Read the testing method<ArrowRight size={16} /></Link></div>
          <div className="grid gap-3 sm:grid-cols-2">{['We say who should skip it.', 'We separate tests from research.', 'We show required accessories.', 'We disclose every paid relationship.'].map((item) => <div key={item} className="flex items-center gap-3 rounded-xl bg-paper p-4 text-sm font-bold text-charcoal"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-finish text-white"><Check size={14} strokeWidth={3} /></span>{item}</div>)}</div>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8"><p className="section-label">Free shop note</p><h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-black tracking-tight text-walnut sm:text-5xl">The first 10 shop purchases—in the order they earn their keep.</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-steel">A practical purchase sequence, a “buy later” list, and a one-page bench checklist. No sale countdown. No spam parade.</p><form className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}><label className="sr-only" htmlFor="home-email">Email address</label><input id="home-email" type="email" placeholder="you@example.com" className="min-w-0 flex-1 rounded-full border border-walnut/20 bg-white px-5 py-4 font-bold outline-none focus:border-pine" /><button className="rounded-full bg-pine px-6 py-4 text-sm font-black text-white">Send the checklist</button></form><p className="mt-3 text-xs text-steel">You can unsubscribe anytime. We never sell your email address.</p></div>
      </section>
    </main>
  )
}
