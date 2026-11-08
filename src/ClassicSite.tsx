import { MotionConfig } from 'motion/react'
import Navbar from './components/layout/Navbar.tsx'
import Footer from './components/layout/Footer.tsx'
import HeroSection from './features/hero/HeroSection.tsx'
import RiceJourneySection from './features/rice-journey/RiceJourneySection.tsx'
import SimulatorSection from './features/simulator/SimulatorSection.tsx'
import RestructuringSection from './features/restructuring/RestructuringSection.tsx'
import ConclusionSection from './features/conclusion/ConclusionSection.tsx'

export default function ClassicSite() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <HeroSection />
        <RiceJourneySection />
        <SimulatorSection />
        <RestructuringSection />
        <ConclusionSection />
      </main>
      <Footer />
    </MotionConfig>
  )
}
