import { useRef, useState, useEffect, lazy, Suspense } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Link } from 'wouter'
import { useCountUp } from '../../hooks/useCountUp'
import MagneticButton from '../../components/MagneticButton'
import { personalInfo, heroMetrics } from '../../data/content'

const HeroScene3D = lazy(() => import('./HeroScene3D'))

function MetricCard({ metric, index, trigger }) {
  const count = useCountUp(metric.value, 2000, trigger)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 1.2 + index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-dark rounded-xl px-5 py-4 text-center"
    >
      <div
        className="font-mono font-medium mb-1 leading-none"
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)',
          background: 'linear-gradient(135deg, #f0dba3, #c8a96e)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {metric.prefix}{count}{metric.suffix}
      </div>
      <div
        className="text-xs font-medium tracking-widest uppercase"
        style={{ color: 'rgba(232,228,220,0.45)', fontFamily: 'JetBrains Mono, monospace' }}
      >
        {metric.label}
      </div>
    </motion.div>
  )
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const ref = useRef(null)
  const [metricsTriggered, setMetricsTriggered] = useState(false)
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    const t = setTimeout(() => setMetricsTriggered(true), 700)
    return () => clearTimeout(t)
  }, [])

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden noise-bg"
      style={{ background: '#080d1a' }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 gradient-animated"
        style={{
          y: shouldReduce ? 0 : bgY,
          background:
            'linear-gradient(135deg, #0e1628 0%, #050a14 35%, #141e35 65%, #0e1628 100%)',
        }}
      />

      {/* 3D particle network */}
      <Suspense fallback={null}>
        <HeroScene3D />
      </Suspense>

      {/* Floating orbs */}
      {!shouldReduce && (
        <>
          <div
            className="orb-a absolute rounded-full pointer-events-none"
            style={{
              width: 'min(600px, 80vw)',
              height: 'min(600px, 80vw)',
              background: '#c8a96e',
              top: '-15%',
              left: '-15%',
              filter: 'blur(120px)',
              opacity: 0.065,
            }}
          />
          <div
            className="orb-b absolute rounded-full pointer-events-none"
            style={{
              width: 'min(500px, 70vw)',
              height: 'min(500px, 70vw)',
              background: '#3d5578',
              bottom: '-10%',
              right: '-10%',
              filter: 'blur(100px)',
              opacity: 0.07,
            }}
          />
          <div
            className="orb-c absolute rounded-full pointer-events-none"
            style={{
              width: '280px',
              height: '280px',
              background: '#c8a96e',
              top: '45%',
              right: '20%',
              filter: 'blur(80px)',
              opacity: 0.04,
            }}
          />
        </>
      )}

      {/* Horizontal scan accent */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          top: '32%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(200,169,110,0.12) 50%, transparent 100%)',
        }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 text-center"
        style={{ y: shouldReduce ? 0 : contentY, opacity: contentOpacity }}
      >
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-7"
        >
          <span className="w-8 h-px" style={{ background: '#c8a96e' }} />
          <span
            className="text-xs font-medium tracking-[0.22em] uppercase"
            style={{ color: '#c8a96e', fontFamily: 'JetBrains Mono, monospace' }}
          >
            Director of Partnerships &amp; Strategic Alliances
          </span>
          <span className="w-8 h-px" style={{ background: '#c8a96e' }} />
        </motion.div>

        {/* Name */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(3.2rem, 8.5vw, 7.5rem)',
              color: '#e8e4dc',
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
              marginBottom: '1.25rem',
            }}
          >
            Faisal{' '}
            <span
              className="italic"
              style={{
                background: 'linear-gradient(135deg, #f0dba3 0%, #c8a96e 55%, #b89248 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Alsadhan
            </span>
          </motion.h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mx-auto text-base lg:text-lg font-light leading-relaxed mb-8"
          style={{ color: 'rgba(232,228,220,0.55)', fontFamily: 'Inter, sans-serif' }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 max-w-2xl mx-auto mb-8">
          {heroMetrics.map((m, i) => (
            <MetricCard key={m.label} metric={m} index={i} trigger={metricsTriggered} />
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <MagneticButton variant="gold" onClick={() => scrollTo('cases')}>
            View Case Studies
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1.5 6.5h10M8 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <Link href="/insights">
            <MagneticButton variant="outline">Read Insights</MagneticButton>
          </Link>
          <MagneticButton variant="outline" onClick={() => scrollTo('contact')}>
            Contact
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — absolute to section (h-screen), always visible */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 z-10 flex flex-col items-center gap-2"
        style={{ transform: 'translateX(-50%)' }}
      >
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: 'rgba(200,169,110,0.4)', fontFamily: 'JetBrains Mono, monospace' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 origin-top"
          style={{ background: 'linear-gradient(to bottom, #c8a96e, transparent)' }}
        />
      </motion.div>
    </section>
  )
}
