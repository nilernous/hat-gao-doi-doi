import { motion } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import heroImage from '../../assets/images/hero-hon-dat.jpg'
import { site } from '../../data/site.ts'

const ease = [0.22, 1, 0.36, 1] as const

export default function HeroSection() {
  const lines = site.tagline.split('. ').map((l, i, arr) => (i < arr.length - 1 ? `${l}.` : l))

  return (
    <section id="top" className="relative isolate flex min-h-svh items-end overflow-hidden bg-paddy">
      <motion.img
        src={heroImage}
        alt="Cánh đồng lúa rộng lớn tại Hòn Đất, Kiên Giang"
        className="absolute inset-0 -z-20 size-full object-cover"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease }}
        fetchPriority="high"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-paddy via-paddy/70 to-paddy/30"
        aria-hidden
      />

      <div className="mx-auto w-full max-w-6xl px-4 pt-28 pb-16 sm:px-6 sm:pb-24">
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.25em] text-grain sm:text-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
        >
          {site.name} · Đồng bằng sông Cửu Long
        </motion.p>

        <h1 className="mt-5 font-serif text-4xl leading-[1.1] font-semibold text-cream sm:text-6xl lg:text-7xl">
          {lines.map((line, i) => (
            <motion.span
              key={line}
              className={`block ${i === lines.length - 1 ? 'text-grain' : ''}`}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.35 + i * 0.15 }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-cream/85 sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.85 }}
        >
          Khám phá hành trình tạo ra giá trị, phân phối lợi ích và tương lai của người nông dân Đồng bằng sông
          Cửu Long.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1 }}
        >
          <a
            href="#hanh-trinh"
            className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-grain px-7 text-base font-semibold text-paddy shadow-lg shadow-black/20 transition hover:bg-cream"
          >
            Bắt đầu hành trình
            <ArrowDown className="size-5 transition-transform group-hover:translate-y-0.5" aria-hidden />
          </a>
          <p className="max-w-xs text-sm text-cream/70">
            Ai tạo ra giá trị và giá trị được phân phối như thế nào trong chuỗi ngành lúa gạo?
          </p>
        </motion.div>
      </div>
    </section>
  )
}
