import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Coins, Hammer, MapPin, Receipt, Scale } from 'lucide-react'
import type { ChainActor } from '../../data/rice-chain.ts'

interface Props {
  actor: ChainActor
  total: number
  onPrev?: () => void
  onNext?: () => void
}

function InfoList({ icon: Icon, title, items }: { icon: typeof Coins; title: string; items: string[] }) {
  return (
    <div>
      <h4 className="flex items-center gap-2 text-sm font-semibold text-paddy">
        <Icon className="size-4 text-leaf" aria-hidden />
        {title}
      </h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink/85">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-grain" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ActorDetail({ actor, total, onPrev, onNext }: Props) {
  const Icon = actor.icon
  return (
    <div
      id="actor-panel"
      role="tabpanel"
      aria-labelledby={`tab-${actor.id}`}
      className="overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-xl shadow-paddy/5"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={actor.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
        >
          {/* Cột trái: vai trò và vị trí */}
          <div className="flex flex-col gap-6 bg-paddy p-6 text-cream sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-grain text-paddy">
                <Icon className="size-6" aria-hidden />
              </span>
              <p className="text-sm text-cream/70">
                Giai đoạn {actor.step}/{total}
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold sm:text-3xl">{actor.name}</h3>
              <p className="mt-3 leading-relaxed text-cream/85">{actor.role}</p>
            </div>
            <div className="rounded-2xl bg-cream/10 p-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-grain">
                <MapPin className="size-4" aria-hidden />
                Vị trí trong chuỗi
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-cream/85">{actor.position}</p>
            </div>
          </div>

          {/* Cột phải: hoạt động, chi phí, nguồn thu */}
          <div className="flex flex-col gap-6 p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <InfoList icon={Hammer} title="Hoạt động chính" items={actor.activities} />
              <InfoList icon={Receipt} title="Nhóm chi phí có thể phát sinh" items={actor.costs} />
            </div>
            <InfoList icon={Coins} title="Nguồn thu / lợi ích kinh tế" items={actor.benefits} />

            <div className="rounded-2xl border border-grain/60 bg-grain-soft/40 p-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-paddy">
                <Scale className="size-4 text-leaf" aria-hidden />
                Góc nhìn giá trị thặng dư
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">{actor.marxLens}</p>
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 border-t border-cream-200 pt-5">
              <button
                type="button"
                onClick={onPrev}
                disabled={!onPrev}
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium whitespace-nowrap text-paddy transition hover:bg-cream disabled:invisible"
              >
                <ArrowLeft className="size-4" aria-hidden />
                <span className="sm:hidden">Trước</span>
                <span className="hidden sm:inline">Giai đoạn trước</span>
              </button>
              {onNext ? (
                <button
                  type="button"
                  onClick={onNext}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-paddy px-5 text-sm font-semibold whitespace-nowrap text-cream transition hover:bg-paddy-700"
                >
                  <span className="sm:hidden">Tiếp theo</span>
                  <span className="hidden sm:inline">Giai đoạn tiếp theo</span>
                  <ArrowRight className="size-4" aria-hidden />
                </button>
              ) : (
                <a
                  href="#mo-phong"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-grain px-5 text-sm font-semibold whitespace-nowrap text-paddy transition hover:bg-paddy hover:text-cream"
                >
                  Sang mô phỏng<span className="hidden sm:inline"> kinh tế</span>
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
