import { AnimatePresence, motion } from 'motion/react'
import { Check, CircleAlert, ListChecks, Plus, TrendingUp } from 'lucide-react'
import type { Solution } from '../../data/solutions.ts'

interface Props {
  solution: Solution
  index: number
  selected: boolean
  onToggle: () => void
}

export default function SolutionCard({ solution, index, selected, onToggle }: Props) {
  const Icon = solution.icon
  const panelId = `solution-${solution.id}`

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-3xl border-2 transition-colors duration-300 ${
        selected ? 'border-grain bg-paddy text-cream shadow-xl shadow-paddy/20' : 'border-cream-200 bg-white text-ink'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={selected}
        aria-controls={panelId}
        className="flex w-full items-start gap-4 p-6 text-left sm:p-7"
      >
        <span
          className={`flex size-12 shrink-0 items-center justify-center rounded-2xl transition-colors ${
            selected ? 'bg-grain text-paddy' : 'bg-cream text-leaf'
          }`}
        >
          <Icon className="size-6" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className={`block text-xs font-semibold uppercase tracking-wider ${selected ? 'text-grain' : 'text-muted'}`}>
            Nhóm giải pháp {index + 1}
          </span>
          <span className={`mt-1 block font-serif text-xl leading-snug font-semibold ${selected ? 'text-cream' : 'text-paddy'}`}>
            {solution.title}
          </span>
          <span className={`mt-2 block text-sm leading-relaxed ${selected ? 'text-cream/80' : 'text-ink/75'}`}>
            {solution.summary}
          </span>
        </span>
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            selected ? 'border-grain bg-grain text-paddy' : 'border-cream-200 text-muted'
          }`}
          aria-hidden
        >
          {selected ? <Check className="size-5" /> : <Plus className="size-5" />}
        </span>
        <span className="sr-only">{selected ? 'Đang bật, bấm để tắt' : 'Đang tắt, bấm để bật'}</span>
      </button>

      <AnimatePresence initial={false}>
        {selected && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-5 border-t border-cream/15 px-6 pt-5 pb-7 sm:px-7">
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-grain">
                  <CircleAlert className="size-4" aria-hidden />
                  Vấn đề hướng đến
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-cream/85">{solution.problem}</p>
              </div>
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-grain">
                  <ListChecks className="size-4" aria-hidden />
                  Hướng triển khai
                </h4>
                <ul className="mt-1.5 space-y-1">
                  {solution.actions.map((a) => (
                    <li key={a} className="flex gap-2 text-sm leading-relaxed text-cream/85">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-grain" aria-hidden />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-cream/10 p-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-grain">
                  <TrendingUp className="size-4" aria-hidden />
                  Tác động kỳ vọng
                </h4>
                <ul className="mt-1.5 space-y-1">
                  {solution.expectedImpact.map((e) => (
                    <li key={e} className="flex gap-2 text-sm leading-relaxed text-cream/90">
                      <Check className="mt-0.5 size-4 shrink-0 text-grain" aria-hidden />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}
