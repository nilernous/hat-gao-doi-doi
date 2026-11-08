import { Minus, Equal } from 'lucide-react'
import DataNote from '../../components/ui/DataNote.tsx'
import AnimatedNumber from './AnimatedNumber.tsx'
import { computeBreakdown, UNIT, UNIT_SHORT, type Scenario } from './scenario-data.ts'

/** Màu cho từng phần trong thanh phân bổ doanh thu. */
const segmentStyles: Record<string, { bar: string; dot: string }> = {
  materialCost: { bar: 'bg-leaf', dot: 'bg-leaf' },
  laborCost: { bar: 'bg-paddy-700', dot: 'bg-paddy-700' },
  landCost: { bar: 'bg-muted', dot: 'bg-muted' },
  residual: { bar: 'bg-grain', dot: 'bg-grain' },
}

export default function EconomicBreakdown({ scenario }: { scenario: Scenario }) {
  const metrics = computeBreakdown(scenario)
  const revenue = metrics.find((m) => m.key === 'revenue')!
  const costs = metrics.filter((m) => m.kind === 'cost')
  const residual = metrics.find((m) => m.key === 'residual')!
  const segments = [...costs, residual]

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* Bảng công thức */}
      <div className="rounded-3xl border border-cream-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Kịch bản đang xem</p>
        <h3 className="mt-1 font-serif text-2xl font-semibold text-paddy">{scenario.label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/80">{scenario.summary}</p>
        <DataNote kind={scenario.source.kind} className="mt-4">
          {scenario.source.label}
        </DataNote>

        <dl className="mt-6 divide-y divide-cream-200 border-y border-cream-200">
          <div className="flex items-center justify-between gap-4 py-3">
            <dt className="text-sm font-medium text-ink">{revenue.label}</dt>
            <dd className="font-serif text-xl font-semibold tabular-nums text-paddy">
              <AnimatedNumber value={revenue.value} />
            </dd>
          </div>
          {costs.map((m) => (
            <div key={m.key} className="flex items-center justify-between gap-4 py-3">
              <dt className="flex items-center gap-2 text-sm text-ink/80">
                <Minus className="size-4 shrink-0 text-muted" aria-label="trừ" />
                {m.label}
              </dt>
              <dd className="font-serif text-xl tabular-nums text-ink/80">
                <AnimatedNumber value={m.value} />
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl bg-paddy px-4 py-4 text-cream">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Equal className="size-4 shrink-0 text-grain" aria-label="bằng" />
            {residual.label}
          </p>
          <p className="font-serif text-3xl font-semibold tabular-nums text-grain">
            <AnimatedNumber value={residual.value} />
          </p>
        </div>
        <p className="mt-3 text-right text-xs text-muted">Đơn vị: {UNIT}</p>
      </div>

      {/* Thanh phân bổ doanh thu */}
      <div className="flex flex-col rounded-3xl border border-cream-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="font-serif text-xl font-semibold text-paddy">Doanh thu được chia thành những phần nào?</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Mỗi đồng doanh thu từ 1 ha lúa phải bù đắp chi phí vật tư, lao động và đất trước khi còn lại phần thu nhập
          kinh tế.
        </p>

        <div className="mt-8">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium text-ink">Tổng doanh thu</span>
            <span className="font-serif text-lg font-semibold tabular-nums text-paddy">
              <AnimatedNumber value={revenue.value} /> {UNIT_SHORT}
            </span>
          </div>
          <div
            className="mt-3 flex h-12 w-full overflow-hidden rounded-xl bg-cream-200"
            role="img"
            aria-label={`Phân bổ doanh thu ${revenue.value} ${UNIT}: ${segments.map((s) => `${s.label} ${s.value}`).join(', ')}`}
          >
            {segments.map((s) => (
              <div
                key={s.key}
                className={`${segmentStyles[s.key].bar} h-full border-r-2 border-white transition-[width] duration-700 ease-out last:border-r-0`}
                style={{ width: `${Math.max(0, (s.value / revenue.value) * 100)}%` }}
              />
            ))}
          </div>
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {segments.map((s) => (
            <li
              key={s.key}
              className={`flex items-start gap-3 rounded-2xl p-3 ${s.kind === 'result' ? 'bg-grain-soft/60' : 'bg-cream'}`}
            >
              <span className={`mt-1 size-3 shrink-0 rounded-full ${segmentStyles[s.key].dot}`} aria-hidden />
              <span className="min-w-0">
                <span className="block text-sm text-ink/80">{s.label}</span>
                <span className="font-serif text-lg font-semibold tabular-nums text-paddy">
                  <AnimatedNumber value={s.value} /> {UNIT_SHORT}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
