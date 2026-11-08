import { useState } from 'react'
import SectionHeading from '../../components/ui/SectionHeading.tsx'
import Reveal from '../../components/ui/Reveal.tsx'
import { solutions } from '../../data/solutions.ts'
import SolutionCard from './SolutionCard.tsx'

export default function RestructuringSection() {
  const [selected, setSelected] = useState<string[]>([])
  const count = selected.length
  const total = solutions.length

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  return (
    <section id="giai-phap" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="03 · Giải pháp tái cơ cấu"
          title="Tổ chức lại để hạt gạo đổi đời"
          description="Bật từng nhóm giải pháp để xem vấn đề mà giải pháp hướng đến và tác động kỳ vọng đối với chuỗi giá trị lúa gạo."
        />

        {/* Thanh tiến độ: chỉ đếm số nhóm đã chọn, không phải chỉ số kinh tế */}
        <Reveal className="mt-10 max-w-md" delay={0.05}>
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium text-ink">Nhóm giải pháp đã chọn</span>
            <span className="font-serif text-lg font-semibold text-paddy" aria-live="polite">
              {count}/{total}
            </span>
          </div>
          <div
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-cream-200"
            role="progressbar"
            aria-label="Số nhóm giải pháp đã chọn"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={count}
          >
            <div
              className="h-full rounded-full bg-grain transition-[width] duration-500 ease-out"
              style={{ width: `${(count / total) * 100}%` }}
            />
          </div>
        </Reveal>

        <div className="mt-8 grid items-start gap-5 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <Reveal key={s.id} delay={0.08 * i}>
              <SolutionCard solution={s} index={i} selected={selected.includes(s.id)} onToggle={() => toggle(s.id)} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <p className="text-sm leading-relaxed text-muted">
            Tác động được mô tả ở dạng định tính. Website không chấm điểm hay tính phần trăm tác động vì chưa có mô hình
            và dữ liệu hỗ trợ.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
