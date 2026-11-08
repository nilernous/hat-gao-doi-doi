import { useEffect, useState } from 'react'
import { BookOpen, ChevronRight, FlaskConical, GitCompareArrows, RotateCcw } from 'lucide-react'
import PixelButton from '../ui/PixelButton.tsx'
import {
  computeBreakdown,
  scenarioOrder,
  scenarios,
  UNIT,
  type MetricKey,
  type Scenario,
  type ScenarioId,
} from '../../features/simulator/scenario-data.ts'
import { formatNumber } from '../../features/simulator/AnimatedNumber.tsx'

/**
 * Màn "Ngã rẽ": tính sổ một vụ lúa từng bước.
 * Mọi số liệu lấy từ features/simulator/scenario-data.ts (cấu hình tập trung).
 */

const BLOCK_COLORS: Record<Exclude<MetricKey, 'revenue'>, string> = {
  materialCost: '#64866b',
  laborCost: '#5b7fb0',
  landCost: '#9c6a3c',
  residual: '#e5be65',
}
const REVENUE_BLOCK = '#efe3c2'
const MAX_BLOCKS = Math.max(...scenarioOrder.map((id) => scenarios[id].revenue))
const LETTER: Record<ScenarioId, string> = { 'rieng-le': 'A', 'lien-ket-htx': 'B' }

function SourceTag({ s }: { s: Scenario }) {
  const report = s.source.kind === 'report'
  const Icon = report ? BookOpen : FlaskConical
  return (
    <p
      className={`flex items-start gap-2 px-3 py-1.5 text-lg leading-tight ${
        report ? 'bg-[#22402f] text-[#cfe3c4]' : 'bg-[#4a3d1c] text-[#f6e3a0]'
      }`}
    >
      <Icon className="mt-1 size-4 shrink-0" aria-hidden />
      <span>
        <strong>{LETTER[s.id]}:</strong> {s.source.label}
      </span>
    </p>
  )
}

/** Thanh khối: mỗi khối = 1 triệu đồng. step quyết định đã tô tới phần nào. */
function BlockBar({ scenario, step }: { scenario: Scenario; step: number }) {
  const m = computeBreakdown(scenario)
  const parts = m.filter((x) => x.key !== 'revenue') as { key: Exclude<MetricKey, 'revenue'>; value: number }[]
  const blocks: string[] = []
  parts.forEach((p, i) => {
    for (let k = 0; k < Math.max(0, p.value); k++) blocks.push(step > i ? BLOCK_COLORS[p.key] : REVENUE_BLOCK)
  })
  return (
    <div
      className="grid gap-[2px]"
      style={{ gridTemplateColumns: `repeat(${MAX_BLOCKS}, minmax(0, 1fr))` }}
      role="img"
      aria-label={`${scenario.label}: ${m.map((x) => `${x.label} ${x.value}`).join(', ')} (${UNIT})`}
    >
      {blocks.map((col, i) => (
        <span
          key={i}
          className="h-4 transition-colors duration-300 sm:h-5"
          style={{ backgroundColor: col, boxShadow: 'inset 0 -2px 0 rgb(0 0 0 / 0.25)', transitionDelay: `${(i % 12) * 15}ms` }}
        />
      ))}
    </div>
  )
}

function Legend() {
  const items: [string, string][] = [
    ['Chi phí vật tư', BLOCK_COLORS.materialCost],
    ['Lao động quy đổi', BLOCK_COLORS.laborCost],
    ['Sử dụng đất', BLOCK_COLORS.landCost],
    ['Thu nhập còn lại', BLOCK_COLORS.residual],
  ]
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-lg text-cream/80">
      {items.map(([label, col]) => (
        <li key={label} className="flex items-center gap-1.5">
          <span className="size-3" style={{ backgroundColor: col }} aria-hidden />
          {label}
        </li>
      ))}
      <li className="text-cream/50">· 1 khối = 1 triệu đồng</li>
    </ul>
  )
}

type Phase = { kind: 'choose' } | { kind: 'ledger'; id: ScenarioId; step: number } | { kind: 'compare' }

export default function SimulatorPanel({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>({ kind: 'choose' })
  const [tried, setTried] = useState<Set<ScenarioId>>(new Set())

  const choose = (id: ScenarioId) => {
    setTried((t) => new Set(t).add(id))
    setPhase({ kind: 'ledger', id, step: 0 })
  }

  const ledgerDone = phase.kind === 'ledger' && phase.step >= 4
  const nextStep = () => phase.kind === 'ledger' && !ledgerDone && setPhase({ ...phase, step: phase.step + 1 })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== ' ' && e.key !== 'Enter') return
      if ((e.target as HTMLElement)?.tagName === 'BUTTON') return
      e.preventDefault()
      if (phase.kind === 'ledger' && !ledgerDone) nextStep()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="pixel-frame w-full bg-[#183026] px-4 py-5 font-pixel text-cream sm:px-6">
      {phase.kind === 'choose' && (
        <>
          <p className="text-lg text-grain">Đơn vị: {UNIT} · số liệu minh hoạ</p>
          <h2 className="mt-1 text-3xl leading-tight">Chú Tư nên đi đường nào?</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {scenarioOrder.map((id) => {
              const s = scenarios[id]
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => choose(id)}
                  className={`pixel-frame-sm pixel-press flex flex-col gap-1 px-4 py-3 text-left transition-colors ${
                    id === 'rieng-le' ? 'bg-[#4a3d1c] hover:bg-[#5a4a22]' : 'bg-[#22402f] hover:bg-[#2c5240]'
                  }`}
                >
                  <span className="flex items-center justify-between text-lg text-grain">
                    Con đường {LETTER[id]}
                    {tried.has(id) && <span className="text-[#8fbd5b]">✓ đã thử</span>}
                  </span>
                  <span className="text-2xl leading-tight sm:text-3xl">{s.label}</span>
                  <span className="text-lg leading-snug text-cream/75">{s.summary}</span>
                </button>
              )
            })}
          </div>
          <div className="mt-4 flex flex-wrap justify-end gap-3">
            <PixelButton onClick={() => setPhase({ kind: 'compare' })}>
              <GitCompareArrows className="size-5" aria-hidden />
              Xem so sánh ngay
            </PixelButton>
          </div>
        </>
      )}

      {phase.kind === 'ledger' && <Ledger scenario={scenarios[phase.id]} step={phase.step} />}

      {phase.kind === 'ledger' && (
        <div className="mt-5 flex flex-wrap justify-end gap-3">
          {!ledgerDone ? (
            <PixelButton variant="primary" onClick={nextStep} autoFocus>
              Tính tiếp
              <ChevronRight className="size-6" aria-hidden />
            </PixelButton>
          ) : (
            <>
              {scenarioOrder
                .filter((id) => !tried.has(id))
                .map((id) => (
                  <PixelButton key={id} onClick={() => choose(id)}>
                    <RotateCcw className="size-5" aria-hidden />
                    Thử con đường {LETTER[id]}
                  </PixelButton>
                ))}
              <PixelButton variant="primary" onClick={() => setPhase({ kind: 'compare' })} autoFocus>
                <GitCompareArrows className="size-5" aria-hidden />
                So sánh hai con đường
              </PixelButton>
            </>
          )}
        </div>
      )}

      {phase.kind === 'compare' && (
        <>
          <Compare />
          <div className="mt-5 flex flex-wrap justify-end gap-3">
            <PixelButton onClick={() => setPhase({ kind: 'choose' })}>
              <RotateCcw className="size-5" aria-hidden />
              Tính lại
            </PixelButton>
            <PixelButton variant="primary" onClick={onDone} autoFocus>
              Tiếp tục
              <ChevronRight className="size-6" aria-hidden />
            </PixelButton>
          </div>
        </>
      )}
    </div>
  )
}

function Ledger({ scenario, step }: { scenario: Scenario; step: number }) {
  const m = computeBreakdown(scenario)
  const sign = ['', '−', '−', '−', '=']
  return (
    <div>
      <p className="text-lg text-grain">Con đường {LETTER[scenario.id]} · Sổ thu chi 1 ha / 1 vụ</p>
      <h2 className="text-3xl leading-tight">{scenario.label}</h2>
      <div className="mt-3">
        <SourceTag s={scenario} />
      </div>

      <div className="mt-4">
        <BlockBar scenario={scenario} step={step} />
      </div>

      <dl className="mt-4 grid gap-1 text-2xl">
        {m.map((row, i) => {
          if (i > step) return null
          const result = row.kind === 'result'
          const col = row.key === 'revenue' ? REVENUE_BLOCK : BLOCK_COLORS[row.key]
          return (
            <div
              key={row.key}
              className={`flex items-center justify-between gap-3 px-2 py-0.5 ${result ? 'bg-grain text-outline' : ''}`}
            >
              <dt className="flex items-center gap-2">
                <span className="w-4 text-center">{sign[i]}</span>
                {!result && <span className="size-3" style={{ backgroundColor: col }} aria-hidden />}
                {row.label}
              </dt>
              <dd className="tabular-nums">{formatNumber(row.value)}</dd>
            </div>
          )
        })}
      </dl>
      <div className="mt-3">
        <Legend />
      </div>
    </div>
  )
}

function Compare() {
  const a = scenarios['rieng-le']
  const b = scenarios['lien-ket-htx']
  const ma = computeBreakdown(a)
  const mb = computeBreakdown(b)
  return (
    <div>
      <p className="text-lg text-grain">Đơn vị: {UNIT}</p>
      <h2 className="text-3xl leading-tight">Đặt hai con đường cạnh nhau</h2>

      <div className="mt-4 grid gap-3">
        {[a, b].map((s) => (
          <div key={s.id}>
            <p className="mb-1 text-xl">
              <span className="text-grain">{LETTER[s.id]}</span> · {s.shortLabel}
            </p>
            <BlockBar scenario={s} step={4} />
          </div>
        ))}
        <Legend />
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[300px] text-xl sm:text-2xl">
          <thead>
            <tr className="text-left text-lg text-cream/60">
              <th scope="col" className="py-1 font-normal">Chỉ số</th>
              <th scope="col" className="px-2 py-1 text-right font-normal">A</th>
              <th scope="col" className="px-2 py-1 text-right font-normal">B</th>
              <th scope="col" className="py-1 text-right font-normal">B − A</th>
            </tr>
          </thead>
          <tbody>
            {ma.map((row, i) => {
              const diff = mb[i].value - row.value
              const result = row.kind === 'result'
              return (
                <tr key={row.key} className={result ? 'bg-grain text-outline' : 'border-t border-cream/10'}>
                  <th scope="row" className={`py-1 text-left font-normal ${result ? 'pl-2' : ''}`}>{row.label}</th>
                  <td className="px-2 py-1 text-right tabular-nums">{formatNumber(row.value)}</td>
                  <td className="px-2 py-1 text-right tabular-nums">{formatNumber(mb[i].value)}</td>
                  <td className={`py-1 text-right tabular-nums ${result ? 'pr-2' : 'text-grain'}`}>
                    {diff > 0 ? '+' : ''}
                    {formatNumber(diff)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid gap-2">
        <SourceTag s={a} />
        <SourceTag s={b} />
      </div>
    </div>
  )
}
