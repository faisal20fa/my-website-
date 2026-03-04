import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp'
import { impactMetrics } from '../../data/content'

function ImpactCard({ metric, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp(metric.value, 2000, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -8,
        transition: { type: 'spring', stiffness: 300, damping: 22 },
      }}
      className="glass-dark glass-dark-hover rounded-2xl p-8 flex flex-col card-glow transition-shadow duration-500"
    >
      {/* Accent line */}
      <div className="w-10 h-0.5 mb-6 rounded-full" style={{ background: 'linear-gradient(90deg, #c8a96e, transparent)' }} />

      {/* Metric value */}
      <div
        className="font-mono font-medium mb-3 leading-none"
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
          background: 'linear-gradient(135deg, #f0dba3, #c8a96e)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {metric.prefix}{count}{metric.suffix}
      </div>

      {/* Label */}
      <div className="text-base font-semibold mb-3" style={{ color: '#e8e4dc', fontFamily: 'Inter, sans-serif' }}>
        {metric.label}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed mt-auto" style={{ color: 'rgba(232,228,220,0.5)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
        {metric.description}
      </p>
    </motion.div>
  )
}

export default function StrategicImpact() {
  return (
    <section
      id="impact"
      className="relative py-28 lg:py-36 overflow-hidden noise-bg"
      style={{ background: '#0e1628' }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb-a absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.05]"
          style={{ background: '#c8a96e', right: '-10%', top: '-20%' }} />
        <div className="orb-b absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.04]"
          style={{ background: '#5c7394', left: '-8%', bottom: '-10%' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px" style={{ background: '#c8a96e' }} />
            <span className="text-xs font-medium tracking-[0.22em] uppercase"
              style={{ color: '#c8a96e', fontFamily: 'JetBrains Mono, monospace' }}>
              Strategic Impact
            </span>
            <span className="w-8 h-px" style={{ background: '#c8a96e' }} />
          </div>
          <h2
            className="font-display font-light leading-tight"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              color: '#e8e4dc',
            }}
          >
            Measurable impact at{' '}
            <span className="italic" style={{ color: '#c8a96e' }}>
              enterprise scale
            </span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {impactMetrics.map((m, i) => (
            <ImpactCard key={m.label} metric={m} index={i} />
          ))}
        </div>

        {/* Bottom descriptor */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="max-w-2xl mx-auto text-base font-light leading-relaxed"
            style={{ color: 'rgba(232,228,220,0.45)', fontFamily: 'Inter, sans-serif' }}>
            Across stc, Unifonic, MCIT, and Saudi Aramco — building partnerships, programs,
            and ecosystems that create lasting commercial and strategic value.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
