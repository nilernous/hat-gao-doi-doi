import { Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import DataNote from '../../components/ui/DataNote.tsx'
import { formatNumber } from './AnimatedNumber.tsx'
import { computeBreakdown, scenarios, UNIT, type MetricKey } from './scenario-data.ts'

const COLOR_A = '#64866B' // leaf
const COLOR_B = '#E5BE65' // grain

const chartLabels: Record<MetricKey, string> = {
  revenue: 'Doanh thu',
  materialCost: 'Vật tư',
  laborCost: 'Lao động quy đổi',
  landCost: 'Sử dụng đất',
  residual: 'Thu nhập còn lại',
}

export default function ScenarioComparison() {
  const a = scenarios['rieng-le']
  const b = scenarios['lien-ket-htx']
  const ma = computeBreakdown(a)
  const mb = computeBreakdown(b)

  const rows = ma.map((m, i) => ({
    key: m.key,
    label: m.label,
    chartLabel: chartLabels[m.key],
    a: m.value,
    b: mb[i].value,
    diff: mb[i].value - m.value,
    kind: m.kind,
  }))

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
      {/* Biểu đồ cột */}
      <div className="min-w-0 rounded-3xl border border-cream-200 bg-white p-4 shadow-sm sm:p-8">
        <h3 className="px-2 font-serif text-xl font-semibold text-paddy sm:px-0">Đặt hai kịch bản cạnh nhau</h3>
        <p className="mt-1 px-2 text-xs text-muted sm:px-0">Đơn vị: {UNIT}</p>
        <div className="mt-4 h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows} layout="vertical" margin={{ top: 4, right: 28, bottom: 4, left: 0 }} barGap={3}>
              <CartesianGrid horizontal={false} stroke="#ECE6D6" />
              <XAxis type="number" tick={{ fill: '#6D756D', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="chartLabel"
                width={120}
                tick={{ fill: '#202820', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: 'rgba(23,63,48,0.05)' }}
                formatter={(value) => `${formatNumber(Number(value))} ${UNIT}`}
                contentStyle={{ borderRadius: 12, borderColor: '#ECE6D6', fontSize: 13 }}
              />
              <Legend wrapperStyle={{ fontSize: 13, paddingTop: 8 }} />
              <Bar dataKey="a" name={`A · ${a.shortLabel}`} fill={COLOR_A} radius={[0, 6, 6, 0]} maxBarSize={22}>
                <LabelList dataKey="a" position="right" fill="#202820" fontSize={12} />
              </Bar>
              <Bar dataKey="b" name={`B · ${b.shortLabel}`} fill={COLOR_B} radius={[0, 6, 6, 0]} maxBarSize={22}>
                <LabelList dataKey="b" position="right" fill="#202820" fontSize={12} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bảng so sánh */}
      <div className="flex flex-col gap-4 rounded-3xl border border-cream-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="-mx-2 overflow-x-auto px-2">
          <table className="w-full min-w-[300px] text-sm">
            <thead>
              <tr className="border-b border-cream-200 text-left text-xs uppercase tracking-wider text-muted">
                <th scope="col" className="py-2 pr-2 font-semibold">Chỉ số</th>
                <th scope="col" className="px-2 py-2 text-right font-semibold">A</th>
                <th scope="col" className="px-2 py-2 text-right font-semibold">B</th>
                <th scope="col" className="py-2 pl-2 text-right font-semibold">B − A</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.key}
                  className={r.kind === 'result' ? 'bg-paddy text-cream' : 'border-b border-cream-200 last:border-0'}
                >
                  <th scope="row" className={`py-3 pr-2 text-left font-medium ${r.kind === 'result' ? 'rounded-l-xl pl-3' : ''}`}>
                    {r.label}
                  </th>
                  <td className="px-2 py-3 text-right tabular-nums">{formatNumber(r.a)}</td>
                  <td className="px-2 py-3 text-right tabular-nums">{formatNumber(r.b)}</td>
                  <td
                    className={`py-3 pl-2 text-right font-semibold tabular-nums ${
                      r.kind === 'result' ? 'rounded-r-xl pr-3 text-grain' : 'text-paddy'
                    }`}
                  >
                    {r.diff > 0 ? '+' : ''}
                    {formatNumber(r.diff)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-2">
          <DataNote kind={a.source.kind}>
            <strong>A:</strong> {a.source.label}
          </DataNote>
          <DataNote kind={b.source.kind}>
            <strong>B:</strong> {b.source.label}
          </DataNote>
        </div>
      </div>
    </div>
  )
}
