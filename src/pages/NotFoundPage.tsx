import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { usePageMeta } from '../hooks/usePageMeta'

export function NotFoundPage() {
  usePageMeta('Page not found | Built True Workshop', 'The requested page could not be found.', true)
  return <main className="grid min-h-[65vh] place-items-center bg-paper px-5 py-20 text-center"><div><span className="font-display text-[8rem] font-black leading-none text-sawdust">404</span><p className="section-label -mt-5">Wrong turn in the shop</p><h1 className="mt-4 font-display text-5xl font-black tracking-tight text-walnut">That page is not on the bench.</h1><p className="mx-auto mt-5 max-w-lg leading-7 text-steel">Try the project finder, search the guide library, or head back to the workshop entrance.</p><Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-pine px-6 py-4 text-sm font-black text-white"><ArrowLeft size={17} />Back to the workshop</Link></div></main>
}
