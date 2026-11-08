import type { KeyboardEvent } from 'react'
import type { ChainActor } from '../../data/rice-chain.ts'

interface Props {
  actors: ChainActor[]
  activeId: string
  onSelect: (id: string) => void
}

/** Stepper chuỗi giá trị: ngang trên desktop, dọc trên mobile. */
export default function JourneyTimeline({ actors, activeId, onSelect }: Props) {
  const activeIndex = actors.findIndex((a) => a.id === activeId)

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp']
    if (!keys.includes(e.key)) return
    e.preventDefault()
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1
    const next = actors[(activeIndex + dir + actors.length) % actors.length]
    onSelect(next.id)
    document.getElementById(`tab-${next.id}`)?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label="Các giai đoạn trong chuỗi giá trị lúa gạo"
      onKeyDown={onKeyDown}
      className="relative grid gap-3 md:grid-cols-4 md:gap-4"
    >
      {/* Đường nối giữa các bước */}
      <div className="absolute top-7 bottom-7 left-7 w-0.5 bg-cream-200 md:top-7 md:right-[12.5%] md:bottom-auto md:left-[12.5%] md:h-0.5 md:w-auto" aria-hidden />
      <div
        className="absolute top-7 left-7 w-0.5 bg-leaf transition-all duration-500 md:hidden"
        // Mỗi hàng cao 3.5rem (size-14) + khoảng cách 0.75rem (gap-3)
        style={{ height: `${activeIndex * 4.25}rem` }}
        aria-hidden
      />
      <div
        className="absolute top-7 left-[12.5%] hidden h-0.5 bg-leaf transition-all duration-500 md:block"
        style={{ width: `${(activeIndex / (actors.length - 1)) * 75}%` }}
        aria-hidden
      />

      {actors.map((actor, i) => {
        const selected = actor.id === activeId
        const passed = i <= activeIndex
        const Icon = actor.icon
        return (
          <button
            key={actor.id}
            id={`tab-${actor.id}`}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls="actor-panel"
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(actor.id)}
            className="group relative flex items-center gap-4 rounded-2xl p-0 text-left md:flex-col md:gap-3 md:text-center"
          >
            <span
              className={`relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                selected
                  ? 'scale-110 border-grain bg-paddy text-grain shadow-lg shadow-paddy/25'
                  : passed
                    ? 'border-leaf bg-leaf text-cream'
                    : 'border-cream-200 bg-white text-leaf group-hover:border-leaf'
              }`}
            >
              <Icon className="size-6" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
                Giai đoạn {actor.step}
              </span>
              <span
                className={`block font-serif text-lg font-semibold transition-colors ${
                  selected ? 'text-paddy' : 'text-ink/70 group-hover:text-paddy'
                }`}
              >
                {actor.name}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
