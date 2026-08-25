import { useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Menu,
  Ruler,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react'
import { Link, Route, Routes } from 'react-router'

const featuredProjects = [
  {
    eyebrow: 'First weekend build',
    title: 'A coffee table that teaches five core skills',
    description:
      'Square cuts, a stable base, a clean glue-up, patient sanding, and a finish you can repair.',
    facts: ['Beginner', '6–8 hours', '3 essential tools'],
    tone: 'bg-[#d7c29f]',
    number: '01',
  },
  {
    eyebrow: 'Small-space project',
    title: 'A wall shelf with genuinely hidden brackets',
    description:
      'A forgiving, one-board project with a drilling guide that removes the guesswork.',
    facts: ['Beginner', '2–3 hours', 'Under $60'],
    tone: 'bg-[#a9b7a7]',
    number: '02',
  },
  {
    eyebrow: 'Build your shop',
    title: 'A rock-solid bench from construction lumber',
    description:
      'Flat where it matters, mobile if you need it, and strong enough to grow with your work.',
    facts: ['Beginner+', '1 weekend', 'Free cut list'],
    tone: 'bg-[#c9a778]',
    number: '03',
  },
]

const skillPaths = [
  {
    icon: Ruler,
    title: 'Start from zero',
    copy: 'Learn the few measuring, cutting, drilling, and assembly habits that prevent expensive mistakes.',
    link: 'Follow the beginner path',
  },
  {
    icon: Wrench,
    title: 'Set up a smarter shop',
    copy: 'Plan around your space, power, dust, and real projects before a large machine claims the floor.',
    link: 'Plan your workshop',
  },
  {
    icon: ShieldCheck,
    title: 'Choose tools honestly',
    copy: 'See who a tool fits, what it costs to own, how it performed, and when you should skip it.',
    link: 'See our testing method',
  },
]

function BrandMark() {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-sm bg-amber font-display text-sm font-black tracking-[-0.08em] text-walnut shadow-[inset_0_0_0_1px_rgba(36,26,21,0.2)]">
      BT
    </span>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navItems = ['Projects', 'Skills', 'Tools', 'Shop setup', 'Materials']

  return (
    <header className="relative z-50 border-b border-walnut/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Built True Workshop home">
          <BrandMark />
          <span className="leading-none">
            <span className="block font-display text-[17px] font-black tracking-[-0.02em] text-walnut">
              Built True
            </span>
            <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.22em] text-steel">
              Workshop
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-bold text-charcoal transition hover:text-pine"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-walnut transition hover:bg-sawdust"
            aria-label="Search Built True Workshop"
          >
            <Search size={19} strokeWidth={2.3} />
          </button>
          <a
            href="#start-here"
            className="rounded-full bg-pine px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#243f34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine"
          >
            Start here
          </a>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full text-walnut sm:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {menuOpen ? (
        <nav id="mobile-menu" className="border-t border-walnut/10 bg-paper px-5 py-5 sm:hidden">
          <div className="mx-auto grid max-w-[1280px] gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-bold text-walnut hover:bg-sawdust"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  )
}

function WorkshopVisual() {
  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] bg-walnut p-6 text-paper shadow-[0_30px_70px_rgba(36,26,21,0.22)] sm:min-h-[520px] sm:p-8">
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.65)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amber">Weekend build no. 01</p>
          <h2 className="mt-3 max-w-xs font-display text-3xl font-black leading-[1.05] tracking-tight">
            A coffee table built to teach.
          </h2>
        </div>
        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold">Free plan</span>
      </div>

      <div className="absolute inset-x-5 bottom-5 top-40 overflow-hidden rounded-[1.5rem] bg-[#caa97b] p-6 text-walnut sm:inset-x-8 sm:bottom-8 sm:p-8">
        <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-amber/70 blur-3xl" />
        <div className="relative h-full">
          <div className="absolute left-[8%] right-[8%] top-[19%] h-[26%] skew-x-[-7deg] rounded-sm border-2 border-walnut/70 bg-[#e1bd88] shadow-[8px_12px_0_rgba(36,26,21,0.14)]">
            <span className="absolute left-[18%] top-0 h-full w-px bg-walnut/20" />
            <span className="absolute right-[25%] top-0 h-full w-px bg-walnut/20" />
          </div>
          <div className="absolute left-[19%] top-[43%] h-[40%] w-[7%] -skew-x-6 bg-walnut" />
          <div className="absolute right-[19%] top-[43%] h-[40%] w-[7%] skew-x-6 bg-walnut" />
          <div className="absolute left-[21%] right-[21%] top-[62%] h-[7%] bg-walnut" />
          <div className="absolute bottom-0 left-0 rounded-full bg-paper/85 px-4 py-2 text-xs font-extrabold shadow-sm">
            3 tools · 6–8 hours · under $150
          </div>
          <span className="absolute right-2 top-[2%] font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-walnut/70">
            42 in × 22 in
          </span>
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <>
      <main>
        <section className="overflow-hidden bg-paper">
          <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.03fr_.97fr] lg:gap-20 lg:py-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-pine/20 bg-white px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-pine shadow-sm">
                <Sparkles size={14} fill="currentColor" />
                Independent projects & honest tool guidance
              </div>
              <h1 className="mt-7 max-w-3xl font-display text-[clamp(3.25rem,7vw,6.6rem)] font-black leading-[0.88] tracking-[-0.065em] text-walnut">
                Build with confidence.
                <span className="mt-3 block text-pine">Buy tools with a reason.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-steel sm:text-xl">
                Complete woodworking guides, measured plans, and plainspoken tool advice for people who would rather make sawdust than chase hype.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#projects"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-amber px-6 py-4 text-sm font-black text-walnut shadow-[0_8px_24px_rgba(212,122,31,0.24)] transition hover:-translate-y-0.5 hover:bg-[#e18a30]"
                >
                  Find your first project
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </a>
                <a
                  href="#shop-setup"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-walnut/20 bg-white px-6 py-4 text-sm font-black text-walnut transition hover:border-pine hover:text-pine"
                >
                  Set up my shop
                </a>
              </div>
              <div className="mt-10 grid max-w-xl grid-cols-3 border-t border-walnut/15 pt-6">
                {[
                  ['500', 'planned guides'],
                  ['No hype', 'testing promise'],
                  ['Free', 'starter plans'],
                ].map(([value, label]) => (
                  <div key={label} className="pr-3">
                    <strong className="block font-display text-xl font-black text-walnut sm:text-2xl">{value}</strong>
                    <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.12em] text-steel">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <WorkshopVisual />
          </div>
        </section>

        <section id="start-here" className="border-y border-walnut/10 bg-white">
          <div className="mx-auto grid max-w-[1280px] gap-4 px-5 py-6 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex items-start gap-3 sm:items-center">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sawdust text-walnut">
                <BookOpen size={18} />
              </span>
              <div>
                <p className="font-display text-lg font-black text-walnut">Not sure where to begin?</p>
                <p className="text-sm text-steel">Tell us your space, time, budget, and tools. We’ll point you to a realistic first win.</p>
              </div>
            </div>
            <button className="inline-flex items-center justify-between gap-5 rounded-full border border-walnut/20 px-5 py-3 text-sm font-black text-walnut hover:border-pine hover:text-pine lg:min-w-52">
              Find my starting point
              <ChevronDown size={17} />
            </button>
          </div>
        </section>

        <section id="projects" className="bg-paper py-20 sm:py-28">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="section-label">Start with a win</p>
                <h2 className="section-title mt-3">Useful projects. Honest difficulty.</h2>
              </div>
              <a href="#all-projects" className="group inline-flex items-center gap-2 text-sm font-black text-pine">
                Browse all projects
                <ArrowRight size={17} className="transition group-hover:translate-x-1" />
              </a>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <article key={project.number} className="group overflow-hidden rounded-[1.6rem] border border-walnut/10 bg-white transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(36,26,21,0.11)]">
                  <div className={`relative h-48 overflow-hidden ${project.tone}`}>
                    <div className="absolute -right-6 -top-8 font-display text-[10rem] font-black leading-none text-walnut/[0.08]">{project.number}</div>
                    <div className="absolute bottom-6 left-6 right-6 h-[5.5rem] rounded-sm border-2 border-walnut/50 bg-paper/25 shadow-[7px_8px_0_rgba(36,26,21,0.12)]" />
                    <span className="absolute left-6 top-5 rounded-full bg-walnut px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-paper">Free guide</span>
                  </div>
                  <div className="p-6 sm:p-7">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber">{project.eyebrow}</p>
                    <h3 className="mt-3 font-display text-2xl font-black leading-tight text-walnut">{project.title}</h3>
                    <p className="mt-3 leading-7 text-steel">{project.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.facts.map((fact) => (
                        <span key={fact} className="rounded-full bg-sawdust/70 px-3 py-1.5 text-[11px] font-bold text-charcoal">{fact}</span>
                      ))}
                    </div>
                    <a href="#guide" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-pine">
                      See the cut list <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="bg-walnut py-20 text-paper sm:py-28">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="section-label text-amber">Choose your path</p>
              <h2 className="section-title mt-3 text-paper">Build the shop—and judgment—you actually need.</h2>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/10 lg:grid-cols-3">
              {skillPaths.map(({ icon: Icon, title, copy, link }) => (
                <article key={title} className="bg-walnut p-7 sm:p-9">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-amber"><Icon /></span>
                  <h3 className="mt-7 font-display text-2xl font-black">{title}</h3>
                  <p className="mt-3 leading-7 text-paper/65">{copy}</p>
                  <a href="#path" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-amber">{link}<ArrowRight size={16} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="shop-setup" className="bg-sawdust py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="section-label">Our shop promise</p>
              <h2 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight text-walnut">A recommendation should earn its place on your bench.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'We say who should skip it.',
                'We separate tests from research.',
                'We show required accessories.',
                'We disclose every paid relationship.',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl bg-paper p-4 text-sm font-bold text-charcoal">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-finish text-white"><Check size={14} strokeWidth={3} /></span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#19120f] text-paper">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="flex items-center gap-3"><BrandMark /><span className="font-display text-xl font-black">Built True Workshop</span></div>
            <p className="mt-5 max-w-md leading-7 text-paper/60">Practical projects and honest tool guidance for building better—and buying less badly.</p>
            <p className="mt-4 text-xs leading-5 text-paper/50">We may earn a commission from purchases made through links on this site, at no extra cost to you.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="grid content-start gap-3"><strong className="text-amber">Build</strong><a href="#projects">Projects</a><a href="#skills">Skills</a><a href="#shop-setup">Shop setup</a></div>
            <div className="grid content-start gap-3"><strong className="text-amber">Trust</strong><a href="#testing">Testing method</a><a href="#disclosure">Affiliate disclosure</a><a href="#corrections">Corrections</a></div>
          </div>
        </div>
        <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-paper/40">© {new Date().getFullYear()} Built True Workshop. Build it once. Build it right.</div>
      </footer>
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-paper font-sans text-charcoal">
      <Header />
      <Routes>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
