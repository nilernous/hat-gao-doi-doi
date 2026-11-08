import { ArrowUp } from 'lucide-react'
import fieldImage from '../../assets/images/field-can-tho.jpg'
import Reveal from '../../components/ui/Reveal.tsx'

/** Thông điệp kết luận gợi ý trong docs/overview.md mục 5. Nhóm cần rà soát cho khớp báo cáo. */
export default function ConclusionSection() {
  return (
    <section id="ket-luan" className="relative isolate overflow-hidden bg-paddy py-24 sm:py-32">
      <img
        src={fieldImage}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 size-full object-cover opacity-60"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-paddy via-paddy/70 to-paddy" aria-hidden />

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-grain">04 · Thông điệp kết luận</p>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="mt-6 font-serif text-2xl leading-snug font-medium text-cream sm:text-4xl sm:leading-tight">
            Tái cơ cấu ngành lúa gạo không chỉ là tăng sản lượng. Đó còn là{' '}
            <span className="text-grain">
              tổ chức lại sản xuất, nâng cao chất lượng, tăng cường liên kết và cải thiện vị thế của người nông dân
            </span>{' '}
            trong chuỗi giá trị.
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <a
            href="#top"
            className="mt-12 inline-flex min-h-12 items-center gap-2 rounded-full border border-cream/30 px-6 text-sm font-semibold text-cream transition hover:border-grain hover:text-grain"
          >
            <ArrowUp className="size-4" aria-hidden />
            Xem lại từ đầu
          </a>
        </Reveal>
      </div>
    </section>
  )
}
