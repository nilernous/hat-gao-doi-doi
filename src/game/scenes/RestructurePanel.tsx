import { Check, ChevronRight, CircleAlert, ListChecks, Plus, TrendingUp } from 'lucide-react'
import { solutions } from '../../data/solutions.ts'
import PixelButton from '../ui/PixelButton.tsx'

interface Props {
  selected: ReadonlySet<string>
  focus: string | null
  onToggle: (id: string) => void
  onDone: () => void
}

/**
 * Màn "Làng lúa đổi mới": bật/tắt từng nhóm giải pháp, làng trên sân khấu thay đổi theo.
 * Không chấm điểm, không phần trăm: bộ đếm chỉ đếm số nhóm đã bật (docs/overview.md mục 4.4).
 */
export default function RestructurePanel({ selected, focus, onToggle, onDone }: Props) {
  const total = solutions.length
  const shown = solutions.find((s) => s.id === focus && selected.has(s.id))

  return (
    <div className="pixel-frame w-full bg-[#183026] px-4 py-5 font-pixel text-cream sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-lg text-grain">Bật từng nhóm giải pháp để dựng lại làng</p>
          <h2 className="text-3xl leading-tight">Ba nhóm giải pháp tái cơ cấu</h2>
        </div>
        <div className="text-right">
          <p className="text-lg text-cream/70" aria-live="polite">
            Đã bật {selected.size}/{total} nhóm giải pháp
          </p>
          <div className="mt-1 flex justify-end gap-1" aria-hidden>
            {solutions.map((s) => (
              <span key={s.id} className={`h-3 w-8 ${selected.has(s.id) ? 'bg-grain' : 'bg-cream/15'}`} />
            ))}
          </div>
        </div>
      </div>

      <ul className="mt-4 grid gap-3 md:grid-cols-3">
        {solutions.map((s, i) => {
          const on = selected.has(s.id)
          const Icon = s.icon
          return (
            <li key={s.id}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => onToggle(s.id)}
                className={`pixel-frame-sm pixel-press flex h-full w-full items-start gap-3 px-3 py-2.5 text-left transition-colors ${
                  on ? 'bg-grain text-outline' : 'bg-[#22402f] hover:bg-[#2c5240]'
                }`}
              >
                <Icon className="mt-1 size-6 shrink-0" aria-hidden />
                <span className="flex-1">
                  <span className={`block text-lg ${on ? 'text-outline/70' : 'text-grain'}`}>Nhóm {i + 1}</span>
                  <span className="block text-xl leading-tight sm:text-2xl">{s.title}</span>
                </span>
                {on ? <Check className="size-6 shrink-0" aria-hidden /> : <Plus className="size-6 shrink-0 text-cream/60" aria-hidden />}
                <span className="sr-only">{on ? 'đang bật' : 'đang tắt'}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-4 min-h-[9rem] bg-[#12261c] px-4 py-3">
        {shown ? (
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <h3 className="flex items-center gap-2 text-xl text-grain">
                <CircleAlert className="size-5" aria-hidden />
                Vấn đề hướng đến
              </h3>
              <p className="mt-1 text-lg leading-snug text-cream/85">{shown.problem}</p>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-xl text-grain">
                <ListChecks className="size-5" aria-hidden />
                Hướng triển khai
              </h3>
              <ul className="mt-1 space-y-0.5 text-lg leading-snug text-cream/85">
                {shown.actions.map((a) => (
                  <li key={a}>▸ {a}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-xl text-grain">
                <TrendingUp className="size-5" aria-hidden />
                Tác động kỳ vọng
              </h3>
              <ul className="mt-1 space-y-0.5 text-lg leading-snug text-cream/85">
                {shown.expectedImpact.map((e) => (
                  <li key={e}>✓ {e}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-xl text-cream/60">
            Chọn một nhóm giải pháp ở trên. Làng lúa trên sân khấu sẽ thay đổi theo lựa chọn của bạn.
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-xl text-lg leading-snug text-cream/55">
          Tác động chỉ mô tả định tính. Game không chấm điểm hay tính phần trăm vì chưa có mô hình và dữ liệu hỗ trợ.
        </p>
        <PixelButton variant="primary" onClick={onDone}>
          Tiếp tục
          <ChevronRight className="size-6" aria-hidden />
        </PixelButton>
      </div>
    </div>
  )
}
