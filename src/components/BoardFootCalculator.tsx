import { useMemo, useState } from 'react'
import { Calculator } from 'lucide-react'

export function BoardFootCalculator() {
  const [thickness, setThickness] = useState('1')
  const [width, setWidth] = useState('6')
  const [length, setLength] = useState('8')
  const [quantity, setQuantity] = useState('1')
  const [waste, setWaste] = useState('20')

  const result = useMemo(() => {
    const values = [thickness, width, length, quantity, waste].map(Number)
    if (values.some((value) => !Number.isFinite(value) || value < 0)) return null
    const base = (values[0] * values[1] * values[2] * values[3]) / 12
    return { base, withWaste: base * (1 + values[4] / 100) }
  }, [length, quantity, thickness, waste, width])

  const fields = [
    { label: 'Thickness (in)', value: thickness, set: setThickness },
    { label: 'Width (in)', value: width, set: setWidth },
    { label: 'Length (ft)', value: length, set: setLength },
    { label: 'Quantity', value: quantity, set: setQuantity },
    { label: 'Waste (%)', value: waste, set: setWaste },
  ]

  return (
    <section className="my-12 overflow-hidden rounded-[1.5rem] bg-walnut text-paper">
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5 sm:px-8"><Calculator className="text-amber" /><h2 className="font-display text-2xl font-black">Board-foot calculator</h2></div>
      <div className="grid gap-7 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="grid gap-4 sm:grid-cols-5">
          {fields.map((field) => (
            <label key={field.label} className="text-xs font-bold text-paper/65">{field.label}<input type="number" min="0" step="any" value={field.value} onChange={(event) => field.set(event.target.value)} className="mt-2 w-full rounded-lg border border-white/15 bg-white/10 px-3 py-3 text-base font-black text-white outline-none focus:border-amber" /></label>
          ))}
        </div>
        <div className="min-w-48 rounded-xl bg-paper p-5 text-walnut">
          <span className="block text-[10px] font-black uppercase tracking-[0.15em] text-steel">Buy at least</span>
          <strong className="mt-1 block font-display text-4xl font-black">{result ? result.withWaste.toFixed(2) : '—'}</strong>
          <span className="text-xs font-bold text-steel">board feet · {result ? `${result.base.toFixed(2)} before waste` : 'check values'}</span>
        </div>
      </div>
    </section>
  )
}
