import { useState } from 'react'
import SectionHeading from '../../components/ui/SectionHeading.tsx'
import Reveal from '../../components/ui/Reveal.tsx'
import { riceChain } from '../../data/rice-chain.ts'
import JourneyTimeline from './JourneyTimeline.tsx'
import ActorDetail from './ActorDetail.tsx'

export default function RiceJourneySection() {
  const [activeId, setActiveId] = useState(riceChain[0].id)
  const index = riceChain.findIndex((a) => a.id === activeId)
  const actor = riceChain[index]

  return (
    <section id="hanh-trinh" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="01 · Hành trình hạt gạo"
          title="Từ cánh đồng đến bàn ăn"
          description="Hạt gạo đi qua bốn chủ thể trước khi đến tay người tiêu dùng. Chọn từng giai đoạn để xem vai trò, chi phí và lợi ích của mỗi chủ thể trong chuỗi giá trị."
        />

        <Reveal className="mt-12" delay={0.1}>
          <JourneyTimeline actors={riceChain} activeId={activeId} onSelect={setActiveId} />
        </Reveal>

        <Reveal className="mt-10" delay={0.15}>
          <ActorDetail
            actor={actor}
            total={riceChain.length}
            onPrev={index > 0 ? () => setActiveId(riceChain[index - 1].id) : undefined}
            onNext={index < riceChain.length - 1 ? () => setActiveId(riceChain[index + 1].id) : undefined}
          />
        </Reveal>
      </div>
    </section>
  )
}
