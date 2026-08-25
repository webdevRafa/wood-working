import { Bookmark, LogIn } from 'lucide-react'
import { GuideCard } from '../components/GuideCard'
import { useAuth } from '../context/AuthContext'
import { useSavedGuides } from '../context/SavedGuidesContext'
import { guideIndex } from '../data/guides'
import { usePageMeta } from '../hooks/usePageMeta'

export function SavedPage() {
  const { user, available, signInWithGoogle } = useAuth()
  const { savedIds } = useSavedGuides()
  const savedGuides = guideIndex.filter((guide) => savedIds.has(guide.id))
  usePageMeta('Saved projects | Built True Workshop', 'Your saved Built True Workshop guides and projects.', true)

  return <main className="min-h-[65vh] bg-paper"><header className="border-b border-walnut/10 bg-sawdust py-14 sm:py-20"><div className="mx-auto max-w-[1180px] px-5 sm:px-8"><p className="section-label">Your workshop</p><h1 className="mt-4 font-display text-5xl font-black tracking-tight text-walnut sm:text-6xl">Saved guides</h1><p className="mt-4 max-w-xl leading-7 text-steel">Keep the projects, skills, and buying decisions you want to return to.</p></div></header><div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8">{!user ? <div className="mx-auto max-w-lg rounded-2xl border border-walnut/10 bg-white p-8 text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-sawdust text-pine"><Bookmark /></span><h2 className="mt-5 font-display text-3xl font-black text-walnut">Take your saves with you</h2><p className="mt-3 leading-7 text-steel">Google sign-in is optional. It is used only to keep your saved guide list and future project progress across devices.</p><button disabled={!available} onClick={() => void signInWithGoogle()} className="mt-6 inline-flex items-center gap-2 rounded-full bg-pine px-6 py-4 text-sm font-black text-white disabled:opacity-50"><LogIn size={17} />Continue with Google</button></div> : savedGuides.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{savedGuides.map((guide) => <GuideCard key={guide.id} guide={guide} />)}</div> : <div className="rounded-2xl border border-dashed border-walnut/25 p-12 text-center"><Bookmark className="mx-auto text-pine" /><h2 className="mt-4 font-display text-3xl font-black text-walnut">Nothing saved yet</h2><p className="mt-2 text-steel">Use the Save button on a guide to put it here.</p></div>}</div></main>
}
