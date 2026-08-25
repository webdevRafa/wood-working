import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Bookmark,
  LogOut,
  Menu,
  Search,
  UserRound,
  X,
} from 'lucide-react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { useContent } from '../context/ContentContext'
import { ConsentBanner } from './ConsentBanner'
import { trackEvent } from '../lib/analytics'

export function BrandMark() {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-amber font-display text-sm font-black tracking-[-0.08em] text-walnut shadow-[inset_0_0_0_1px_rgba(36,26,21,0.2)]">
      BT
    </span>
  )
}

const navItems = [
  { label: 'Projects', to: '/projects/' },
  { label: 'Skills', to: '/skills/' },
  { label: 'Tools', to: '/tools/' },
  { label: 'Shop setup', to: '/shop/' },
  { label: 'Materials', to: '/materials/' },
]

function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { guideIndex } = useContent()

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return guideIndex.slice(0, 5)
    return guideIndex
      .filter((guide) =>
        [guide.title, guide.dek, ...guide.tags].join(' ').toLowerCase().includes(normalized),
      )
      .slice(0, 8)
  }, [guideIndex, query])

  return (
    <div className="fixed inset-0 z-[100] bg-walnut/55 p-3 backdrop-blur-sm sm:p-8" role="dialog" aria-modal="true" aria-label="Search guides">
      <button className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close search" />
      <div className="relative mx-auto mt-[8vh] max-w-3xl overflow-hidden rounded-[1.5rem] bg-paper shadow-2xl">
        <div className="flex items-center gap-3 border-b border-walnut/10 px-5 py-4">
          <Search className="shrink-0 text-pine" size={22} />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, skills, and tool decisions"
            className="min-w-0 flex-1 bg-transparent py-2 text-base font-bold text-walnut outline-none placeholder:font-medium placeholder:text-steel/70 sm:text-lg"
          />
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full hover:bg-sawdust" aria-label="Close search"><X /></button>
        </div>
        <div className="max-h-[62vh] overflow-y-auto p-3 sm:p-5">
          <p className="px-2 pb-3 text-[10px] font-black uppercase tracking-[0.18em] text-steel">
            {query ? `${results.length} matching guides` : 'Good places to begin'}
          </p>
          <div className="grid gap-2">
            {results.map((guide) => (
              <button
                key={guide.id}
                onClick={() => {
                  navigate(guide.canonicalPath)
                  onClose()
                }}
                className="group flex items-center justify-between gap-5 rounded-xl border border-transparent p-4 text-left hover:border-walnut/10 hover:bg-white"
              >
                <span>
                  <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-amber">{guide.type} · {guide.intent}</span>
                  <span className="mt-1 block font-display text-lg font-black leading-tight text-walnut">{guide.title}</span>
                </span>
                <ArrowRight size={18} className="shrink-0 text-pine transition group-hover:translate-x-1" />
              </button>
            ))}
            {results.length === 0 ? (
              <div className="rounded-xl bg-sawdust/70 p-6 text-center text-sm text-steel">
                No matching guide yet. Try “beginner,” “router,” “table saw,” or “coffee table.”
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const { user, pending, available, error, signInWithGoogle, signOut } = useAuth()

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-walnut/10 bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="Built True Workshop home">
            <BrandMark />
            <span className="leading-none">
              <span className="block font-display text-[17px] font-black tracking-[-0.02em] text-walnut">Built True</span>
              <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.22em] text-steel">Workshop</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `text-sm font-bold transition hover:text-pine ${isActive ? 'text-pine' : 'text-charcoal'}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-1 sm:flex">
            <button type="button" onClick={() => setSearchOpen(true)} className="grid h-10 w-10 place-items-center rounded-full text-walnut transition hover:bg-sawdust" aria-label="Search Built True Workshop">
              <Search size={19} strokeWidth={2.3} />
            </button>
            <Link to="/saved/" className="grid h-10 w-10 place-items-center rounded-full text-walnut transition hover:bg-sawdust" aria-label="Saved projects"><Bookmark size={19} strokeWidth={2.3} /></Link>
            <div className="relative">
              <button type="button" onClick={() => setAccountOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-full text-walnut transition hover:bg-sawdust" aria-expanded={accountOpen} aria-label="Account">
                {user?.photoURL ? <img src={user.photoURL} referrerPolicy="no-referrer" alt="" className="h-8 w-8 rounded-full object-cover" /> : <UserRound size={19} strokeWidth={2.3} />}
              </button>
              {accountOpen ? <div className="absolute right-0 top-12 w-72 rounded-xl border border-walnut/10 bg-white p-4 shadow-xl"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-pine">Your workshop</p>{pending ? <p className="mt-3 text-sm text-steel">Checking sign-in…</p> : user ? <><strong className="mt-3 block text-sm text-walnut">{user.displayName ?? 'Signed-in woodworker'}</strong><span className="mt-1 block truncate text-xs text-steel">{user.email}</span><button onClick={() => void signOut()} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-walnut/15 px-4 py-3 text-sm font-black text-walnut"><LogOut size={16} />Sign out</button></> : <><p className="mt-3 text-sm leading-6 text-steel">Sign in to save guides and keep project progress across devices.</p><button disabled={!available} onClick={() => void signInWithGoogle()} className="mt-4 w-full rounded-full bg-pine px-4 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50">Continue with Google</button></>}{error ? <p className="mt-3 text-xs leading-5 text-[#b33a2b]">{error}</p> : null}</div> : null}
            </div>
            <Link to="/start-here/" className="ml-2 rounded-full bg-pine px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#243f34]">
              Start here
            </Link>
          </div>

          <div className="flex items-center sm:hidden">
            <button type="button" onClick={() => setSearchOpen(true)} className="grid h-11 w-11 place-items-center rounded-full text-walnut" aria-label="Search"><Search size={20} /></button>
            <button type="button" className="grid h-11 w-11 place-items-center rounded-full text-walnut" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav id="mobile-menu" className="border-t border-walnut/10 bg-paper px-5 py-5 sm:hidden">
            <div className="mx-auto grid max-w-[1280px] gap-1">
              {navItems.map((item) => <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-base font-bold text-walnut hover:bg-sawdust">{item.label}</NavLink>)}
              <NavLink to="/start-here/" onClick={() => setMenuOpen(false)} className="mt-2 rounded-lg bg-pine px-3 py-3 text-base font-bold text-white">Start here</NavLink>
            </div>
          </nav>
        ) : null}
      </header>
      {searchOpen ? <SearchDialog onClose={() => setSearchOpen(false)} /> : null}
    </>
  )
}

function Footer() {
  return (
    <footer className="bg-[#19120f] text-paper">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <div className="flex items-center gap-3"><BrandMark /><span className="font-display text-xl font-black">Built True Workshop</span></div>
          <p className="mt-5 max-w-md leading-7 text-paper/60">Practical projects and honest tool guidance for building better—and buying less badly.</p>
          <p className="mt-4 max-w-lg text-xs leading-5 text-paper/50">We may earn a commission from purchases made through links on this site, at no extra cost to you.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
          <div className="grid content-start gap-3"><strong className="text-amber">Build</strong><Link to="/projects/">Projects</Link><Link to="/skills/">Skills</Link><Link to="/shop/">Shop setup</Link></div>
          <div className="grid content-start gap-3"><strong className="text-amber">Choose</strong><Link to="/tools/">Tools</Link><Link to="/materials/">Materials</Link><Link to="/plans/">Plans</Link></div>
          <div className="grid content-start gap-3"><strong className="text-amber">Trust</strong><Link to="/about/testing-method/">Testing method</Link><Link to="/affiliate-disclosure/">Disclosure</Link><Link to="/corrections/">Corrections</Link></div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-5 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© {new Date().getFullYear()} Built True Workshop. Build it once. Build it right.</span>
          <div className="flex gap-4"><Link to="/privacy/">Privacy</Link><Link to="/terms/">Terms</Link><Link to="/accessibility/">Accessibility</Link></div>
        </div>
      </div>
    </footer>
  )
}

export function SiteLayout() {
  const location = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    void trackEvent('page_view', { page_path: location.pathname })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-paper font-sans text-charcoal">
      <Header />
      <Outlet />
      <Footer />
      <ConsentBanner />
    </div>
  )
}
