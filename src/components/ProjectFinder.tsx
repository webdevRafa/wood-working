import { useMemo, useState } from 'react'
import { ArrowRight, Check, RotateCcw } from 'lucide-react'
import { Link } from 'react-router'
import { useContent } from '../context/ContentContext'

const questions = [
  {
    key: 'experience',
    title: 'How much have you built?',
    options: [
      { value: 'new', label: 'Nothing yet', detail: 'Start with control and a forgiving build.' },
      { value: 'some', label: 'A few projects', detail: 'Add one new skill without overloading the plan.' },
      { value: 'regular', label: 'I build regularly', detail: 'Choose by technique or shop bottleneck.' },
    ],
  },
  {
    key: 'time',
    title: 'How much time do you have?',
    options: [
      { value: 'short', label: 'A few hours', detail: 'A focused lesson or small project.' },
      { value: 'weekend', label: 'One weekend', detail: 'Enough time for a useful furniture build.' },
      { value: 'ongoing', label: 'No hard deadline', detail: 'A deeper shop or skill upgrade.' },
    ],
  },
  {
    key: 'goal',
    title: 'What would feel most useful?',
    options: [
      { value: 'build', label: 'Finish a project', detail: 'Get a result you can use at home.' },
      { value: 'learn', label: 'Learn the fundamentals', detail: 'Build judgment before buying more tools.' },
      { value: 'shop', label: 'Improve my shop', detail: 'Solve a recurring accuracy or workflow problem.' },
    ],
  },
] as const

type AnswerKey = (typeof questions)[number]['key']
type Answers = Partial<Record<AnswerKey, string>>

export function ProjectFinder({ embedded = false }: { embedded?: boolean }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const { guideIndex } = useContent()
  const done = step >= questions.length

  const matches = useMemo(() => {
    return [...guideIndex]
      .map((guide) => {
        let score = 0
        if (answers.goal === guide.intent) score += 5
        if (answers.goal === 'shop' && ['comparison', 'shop'].includes(guide.type)) score += 4
        if (answers.experience === 'new' && guide.skillLevel === 'beginner') score += 3
        if (answers.time === 'short' && (guide.totalMinutes ?? 9999) <= 240) score += 3
        if (answers.time === 'weekend' && (guide.totalMinutes ?? 0) <= 900) score += 2
        return { guide, score }
      })
      .sort((a, b) => b.score - a.score || Number(a.guide.id) - Number(b.guide.id))
      .slice(0, 3)
  }, [answers, guideIndex])

  const reset = () => {
    setAnswers({})
    setStep(0)
  }

  return (
    <section className={embedded ? '' : 'bg-sawdust py-16 sm:py-24'}>
      <div className={embedded ? '' : 'mx-auto max-w-4xl px-5 sm:px-8'}>
        <div className="overflow-hidden rounded-[1.7rem] border border-walnut/10 bg-white shadow-[0_24px_70px_rgba(36,26,21,0.1)]">
          <div className="flex items-center justify-between border-b border-walnut/10 px-6 py-4 sm:px-8">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-pine">Project finder</span>
            <span className="text-xs font-bold text-steel">{done ? 'Your starting points' : `${step + 1} of ${questions.length}`}</span>
          </div>

          {!done ? (
            <div className="p-6 sm:p-9">
              <h2 className="font-display text-3xl font-black tracking-tight text-walnut sm:text-4xl">{questions[step].title}</h2>
              <div className="mt-7 grid gap-3">
                {questions[step].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setAnswers((current) => ({ ...current, [questions[step].key]: option.value }))
                      setStep((current) => current + 1)
                    }}
                    className="group flex items-center justify-between gap-6 rounded-xl border border-walnut/10 bg-paper p-5 text-left transition hover:border-pine hover:bg-sawdust/55"
                  >
                    <span><strong className="block text-base text-walnut">{option.label}</strong><span className="mt-1 block text-sm leading-6 text-steel">{option.detail}</span></span>
                    <ArrowRight size={18} className="shrink-0 text-pine transition group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-9">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-finish text-white"><Check /></span>
                <div><h2 className="font-display text-3xl font-black tracking-tight text-walnut sm:text-4xl">Three honest places to begin</h2><p className="mt-2 text-steel">These are matched to your answers, not to the highest-value product.</p></div>
              </div>
              <div className="mt-8 grid gap-3">
                {matches.map(({ guide }, index) => (
                  <Link key={guide.id} to={guide.canonicalPath} className="group flex items-center gap-5 rounded-xl border border-walnut/10 p-5 hover:border-pine">
                    <span className="font-display text-3xl font-black text-amber">0{index + 1}</span>
                    <span className="min-w-0 flex-1"><span className="block text-[10px] font-black uppercase tracking-[0.15em] text-pine">{guide.type} · {guide.skillLevel ?? guide.intent}</span><strong className="mt-1 block font-display text-lg leading-tight text-walnut">{guide.title}</strong></span>
                    <ArrowRight size={18} className="shrink-0 text-pine transition group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
              <button onClick={reset} className="mt-7 inline-flex items-center gap-2 text-sm font-black text-steel hover:text-pine"><RotateCcw size={16} />Start over</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
