import Hero from './sections/Hero'
import Overview from './sections/Overview'
import StrategicImpact from './sections/StrategicImpact'
import TechEcosystem from './sections/TechEcosystem'
import CaseStudies from './sections/CaseStudies'
import Timeline from './sections/Timeline'
import Expertise from './sections/Expertise'
import Contact from './sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <Overview />
      <StrategicImpact />
      <TechEcosystem />
      <CaseStudies />
      <Timeline />
      <Expertise />
      <Contact />
    </main>
  )
}
