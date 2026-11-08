import { motion } from 'motion/react'
import { GitCompareArrows } from 'lucide-react'
import { scenarioOrder, scenarios, type ScenarioId } from './scenario-data.ts'

export type SimulatorMode = ScenarioId | 'compare'

interface Props {
  mode: SimulatorMode
  onChange: (mode: SimulatorMode) => void
}

const options: { id: SimulatorMode; label: string; hint: string }[] = [
  ...scenarioOrder.map((id) => ({ id, label: scenarios[id].shortLabel, hint: `Kịch bản ${id === 'rieng-le' ? 'A' : 'B'}` })),
  { id: 'compare', label: 'So sánh hai kịch bản', hint: 'A và B' },
]

export default function ScenarioSelector({ mode, onChange }: Props) {
  return (
    <div
      role="radiogroup"
      aria-label="Chọn kịch bản mô phỏng"
      className="grid grid-cols-2 gap-1 rounded-2xl bg-paddy/8 p-1.5 sm:inline-grid sm:grid-cols-3"
    >
      {options.map((opt) => {
        const selected = mode === opt.id
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.id)}
            className={`relative min-h-14 rounded-xl px-4 py-2 text-left transition-colors sm:min-w-44 ${
              opt.id === 'compare' ? 'col-span-2 sm:col-span-1' : ''
            } ${selected ? 'text-cream' : 'text-paddy hover:bg-white/70'}`}
          >
            {selected && (
              <motion.span
                layoutId="scenario-pill"
                className="absolute inset-0 rounded-xl bg-paddy shadow-md"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {opt.id === 'compare' && <GitCompareArrows className="size-4 shrink-0" aria-hidden />}
              <span>
                <span className={`block text-[11px] font-semibold uppercase tracking-wider ${selected ? 'text-grain' : 'text-muted'}`}>
                  {opt.hint}
                </span>
                <span className="block text-sm font-semibold sm:text-base">{opt.label}</span>
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
