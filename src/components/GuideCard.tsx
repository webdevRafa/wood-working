import { ArrowRight, Clock3, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import type { GuideIndexItem } from '../types/content'

const tones = ['bg-[#d7c29f]', 'bg-[#a9b7a7]', 'bg-[#c9a778]', 'bg-[#d8c8b8]', 'bg-[#b8c6b1]']

export function GuideCard({ guide, compact = false }: { guide: GuideIndexItem; compact?: boolean }) {
  const totalHours = guide.totalMinutes ? Math.max(1, Math.round(guide.totalMinutes / 60)) : undefined
  const sourceBacked = guide.status === 'published' && guide.evidenceStatus === 'research-reviewed'
  return (
    <article className={`group overflow-hidden rounded-[1.4rem] border border-walnut/10 bg-white transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(36,26,21,0.1)] ${compact ? '' : 'h-full'}`}>
      <Link to={guide.canonicalPath} className="block h-full">
        <div className={`relative overflow-hidden ${compact ? 'h-36' : 'h-48'} ${tones[Number(guide.id) % tones.length]}`}>
          {guide.coverImage ? <><img src={guide.coverImage} alt={guide.coverAlt ?? ''} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" /><div className="absolute inset-0 bg-gradient-to-t from-walnut/45 via-transparent to-walnut/10" /></> : <><div className="absolute -right-5 -top-9 font-display text-[9rem] font-black leading-none text-walnut/[0.08]">{guide.id}</div><div className="absolute inset-x-6 bottom-6 h-16 rotate-[-2deg] rounded-sm border-2 border-walnut/45 bg-paper/25 shadow-[6px_7px_0_rgba(36,26,21,0.12)]" /></>}
          <span className="absolute left-5 top-5 rounded-full bg-walnut px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-paper">{guide.type}</span>
          {guide.coverImage ? <span className="absolute right-5 top-5 rounded-full border border-white/20 bg-walnut/75 px-2.5 py-1.5 text-[10px] font-black tracking-[0.14em] text-paper backdrop-blur-sm">{guide.id}</span> : null}
        </div>
        <div className={compact ? 'p-5' : 'p-6 sm:p-7'}>
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.14em] text-steel">
            <span className="text-amber">{guide.intent}</span>
            {guide.skillLevel ? <span>{guide.skillLevel}</span> : null}
            {totalHours ? <span className="inline-flex items-center gap-1"><Clock3 size={12} />{totalHours} hr{totalHours === 1 ? '' : 's'}</span> : null}
          </div>
          <h3 className={`mt-3 font-display font-black leading-tight text-walnut ${compact ? 'text-xl' : 'text-2xl'}`}>{guide.title}</h3>
          {!compact ? <p className="mt-3 line-clamp-3 leading-7 text-steel">{guide.dek}</p> : null}
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.12em] ${sourceBacked ? 'text-pine' : 'text-steel'}`}><ShieldCheck size={14} /> {sourceBacked ? 'Source-backed guide' : 'Working draft'}</span>
            <ArrowRight size={17} className="text-pine transition group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  )
}
