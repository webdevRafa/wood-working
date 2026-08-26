import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Bookmark,
  LibraryBig,
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
import { searchGuides } from '../lib/guideSearch'

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
  const { guideIndex, loadingLibrary } = useContent()

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const publishedGuides = useMemo(
    () => guideIndex.filter((guide) => guide.status === 'published'),
    [guideIndex],
  )

  const recommendedGuides = useMemo(() => {
    const preferredIds = ['001', '002', '003', '031', '301']
    const preferred = preferredIds
      .map((id) => publishedGuides.find((guide) => guide.id === id))
      .filter((guide): guide is NonNullable<typeof guide> => Boolean(guide))
    return [...preferred, ...publishedGuides.filter((guide) => !preferredIds.includes(guide.id))].slice(0, 5)
  }, [publishedGuides])

  const allResults = useMemo(
    () => (query.trim() ? searchGuides(publishedGuides, query) : recommendedGuides),
    [publishedGuides, query, recommendedGuides],
  )
  const previewResults = allResults.slice(0, 8)
  const libraryCount = loadingLibrary ? 500 : publishedGuides.length
  const suggestedSearches = ['beginner', 'table saw', 'small shop', 'joinery', 'finishing']

  const openFullSearch = (includeQuery = true) => {
    const normalized = includeQuery ? query.trim() : ''
    navigate(normalized ? `/search/?q=${encodeURIComponent(normalized)}` : '/search/')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] bg-walnut/60 p-3 backdrop-blur-sm sm:p-8" role="dialog" aria-modal="true" aria-labelledby="search-dialog-title" aria-describedby="search-dialog-description">
      <button className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close search" />
      <div className="relative mx-auto mt-[2vh] flex max-h-[92vh] max-w-3xl flex-col overflow-hidden rounded-[1.5rem] bg-paper shadow-2xl sm:mt-[6vh] sm:max-h-[84vh]">
        <div className="border-b border-walnut/10 px-4 pb-4 pt-4 sm:px-6 sm:pt-5">
          <form
            onSubmit={(event) => {
              event.preventDefault()
              openFullSearch()
            }}
            className="flex items-center gap-3"
          >
            <Search className="shrink-0 text-pine" size={22} />
            <label htmlFor="quick-search" className="sr-only">Search all woodworking guides</label>
            <input
              id="quick-search"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search all 500 woodworking guides"
              className="min-w-0 flex-1 bg-transparent py-2 text-base font-bold text-walnut outline-none placeholder:font-medium placeholder:text-steel/70 sm:text-lg"
            />
            {query ? (
              <button type="button" onClick={() => setQuery('')} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-steel hover:bg-sawdust hover:text-walnut" aria-label="Clear search"><X size={18} /></button>
            ) : null}
            <button onClick={onClose} type="button" className="grid h-10 w-10 shrink-0 place-items-center rounded-full hover:bg-sawdust" aria-label="Close search"><X /></button>
          </form>
          <div id="search-dialog-description" className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-walnut/10 pt-3 text-xs font-bold text-steel">
            <span>Projects, skills, tools, shop setup, and materials</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-pine/10 px-3 py-1.5 font-black text-pine"><LibraryBig size={14} /> {loadingLibrary ? 'Opening all 500…' : `${libraryCount.toLocaleString()} guides available`}</span>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">
          {!query ? (
            <div className="mb-4 flex flex-wrap items-center gap-2 px-2">
              <span className="mr-1 text-[10px] font-black uppercase tracking-[0.16em] text-steel">Try</span>
              {suggestedSearches.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => setQuery(suggestion)} className="rounded-full border border-walnut/10 bg-white px-3 py-1.5 text-xs font-extrabold text-walnut transition hover:border-pine/30 hover:text-pine">{suggestion}</button>
              ))}
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-3 px-2 pb-3">
            <p id="search-dialog-title" className="text-[10px] font-black uppercase tracking-[0.18em] text-steel">
              {query ? `${allResults.length.toLocaleString()} ${allResults.length === 1 ? 'result' : 'results'} for “${query}”` : 'Recommended starting points'}
            </p>
            <span className="text-[10px] font-bold text-steel/80">Showing {previewResults.length} of {query ? allResults.length.toLocaleString() : libraryCount.toLocaleString()}</span>
          </div>
          <div className="grid gap-2">
            {previewResults.map((guide) => (
              <button
                key={guide.id}
                onClick={() => {
                  navigate(guide.canonicalPath)
                  onClose()
                }}
                className="group flex items-center justify-between gap-5 rounded-xl border border-transparent p-4 text-left transition hover:border-walnut/10 hover:bg-white hover:shadow-sm"
              >
                <span className="min-w-0">
                  <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-amber">{guide.type} · {guide.intent} · source-backed</span>
                  <span className="mt-1 block font-display text-lg font-black leading-tight text-walnut">{guide.title}</span>
                  <span className="mt-1.5 line-clamp-1 block text-sm leading-5 text-steel">{guide.dek}</span>
                </span>
                <ArrowRight size={18} className="shrink-0 text-pine transition group-hover:translate-x-1" />
              </button>
            ))}
            {allResults.length === 0 ? (
              <div className="rounded-xl bg-sawdust/70 p-6 text-center">
                <strong className="block font-display text-xl text-walnut">No exact match on the bench.</strong>
                <span className="mt-2 block text-sm leading-6 text-steel">Try a broader term like “beginner,” “router,” “table saw,” or “coffee table.”</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="border-t border-walnut/10 bg-white/70 p-3 sm:p-4">
          <button
            type="button"
            onClick={() => openFullSearch(allResults.length > 0)}
            className="group flex w-full items-center justify-between gap-4 rounded-xl bg-pine px-5 py-3.5 text-left text-white transition hover:bg-[#243f34]"
          >
            <span>
              <span className="block text-sm font-black">{query && allResults.length ? `View all ${allResults.length.toLocaleString()} results` : `Browse all ${libraryCount.toLocaleString()} guides`}</span>
              <span className="mt-0.5 block text-xs text-white/70">Open the full library with category and intent filters</span>
            </span>
            <ArrowRight className="shrink-0 transition group-hover:translate-x-1" size={19} />
          </button>
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
          <div className="grid content-start gap-3"><strong className="text-amber">Trust</strong><Link to="/about/">About</Link><Link to="/about/testing-method/">Testing method</Link><Link to="/about/editorial-policy/">Editorial policy</Link><Link to="/affiliate-disclosure/">Disclosure</Link><Link to="/corrections/">Corrections</Link></div>
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
