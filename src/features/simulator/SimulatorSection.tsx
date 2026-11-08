import { lazy, Suspense, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Calculator, Lightbulb, Ruler } from 'lucide-react'
import SectionHeading from '../../components/ui/SectionHeading.tsx'
import Reveal from '../../components/ui/Reveal.tsx'
import ScenarioSelector, { type SimulatorMode } from './ScenarioSelector.tsx'
import EconomicBreakdown from './EconomicBreakdown.tsx'
import ConceptNote from './ConceptNote.tsx'
import { differenceNotes, scenarios, UNIT } from './scenario-data.ts'

// Recharts chỉ cần cho chế độ so sánh nên tải sau để trang đầu nhẹ hơn.
const ScenarioComparison = lazy(() => import('./ScenarioComparison.tsx'))

export default function SimulatorSection() {
  const [mode, setMode] = useState<SimulatorMode>('rieng-le')

  return (
    <section id="mo-phong" className="bg-cream-200/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="02 · Mô phỏng kinh tế"
          title="Cùng một ha lúa, hai cách tổ chức"
          description="Chọn một kịch bản để xem doanh thu, chi phí và thu nhập kinh tế còn lại của hộ nông dân thay đổi thế nào khi cách tổ chức sản xuất và tiêu thụ thay đổi."
        />

        <Reveal className="mt-8 flex flex-wrap gap-3 text-sm" delay={0.05}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-ink/80 shadow-sm">
            <Ruler className="size-4 text-leaf" aria-hidden />
            Quy mô: 1 ha, 1 vụ lúa
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-ink/80 shadow-sm">
            <Calculator className="size-4 text-leaf" aria-hidden />
            Đơn vị: {UNIT}
          </span>
        </Reveal>

        <Reveal className="mt-6 rounded-2xl border border-dashed border-paddy/25 bg-white/60 p-4 sm:p-5" delay={0.1}>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Công thức minh họa</p>
          <p className="mt-2 font-serif text-base leading-relaxed text-paddy sm:text-lg">
            <strong>Thu nhập kinh tế còn lại</strong> = Doanh thu − Chi phí vật tư − Chi phí lao động quy đổi − Chi
            phí sử dụng đất
          </p>
        </Reveal>

        <div className="mt-8">
          <ScenarioSelector mode={mode} onChange={setMode} />
        </div>

        <div className="mt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode === 'compare' ? 'compare' : 'single'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {mode === 'compare' ? (
                <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-white/70" />}>
                  <ScenarioComparison />
                </Suspense>
              ) : (
                <EconomicBreakdown scenario={scenarios[mode]} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Giải thích khác biệt */}
        <Reveal className="mt-6 rounded-3xl border border-grain/60 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="flex items-center gap-2 font-serif text-xl font-semibold text-paddy">
            <Lightbulb className="size-5 text-grain" aria-hidden />
            Vì sao hai kịch bản cho kết quả khác nhau?
          </h3>
          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            {differenceNotes.map((n) => (
              <li key={n.metric} className="text-sm leading-relaxed text-ink/85">
                {n.text}
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-cream-200 pt-4 text-sm leading-relaxed text-muted">
            Đây là ví dụ minh họa để thảo luận, không phải dự báo. Mô phỏng không khẳng định liên kết qua hợp tác xã
            chắc chắn làm tăng thu nhập; kết quả thực tế phụ thuộc vào cách hợp tác xã vận hành, giá thị trường và điều
            kiện từng địa phương.
          </p>
        </Reveal>

        <Reveal className="mt-6">
          <ConceptNote />
        </Reveal>
      </div>
    </section>
  )
}
