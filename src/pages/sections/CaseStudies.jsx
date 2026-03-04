import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { caseStudies } from '../../data/content'

function TiltCard({ study, index, onOpen }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14
    setTilt({ x, y })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      onClick={() => onOpen(study)}
      animate={{
        rotateX: tilt.y,
        rotateY: tilt.x,
        scale: hovered ? 1.02 : 1,
        opacity: 1,
        y: 0,
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 22, delay: index * 0.1 }}
      className="glass-dark rounded-2xl p-7 cursor-pointer relative overflow-hidden group"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        boxShadow: hovered
          ? `0 0 40px ${study.accentColor}25, 0 24px 60px rgba(0,0,0,0.4)`
          : '0 4px 24px rgba(0,0,0,0.2)',
      }}
    >
      {/* Glow overlay on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${study.accentColor}12, transparent 70%)`,
        }}
      />

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-bl-[4rem] opacity-10"
        style={{ background: study.accentColor }}
      />

      {/* Case ID */}
      <div className="flex items-center justify-between mb-5">
        <span
          className="text-xs font-medium tracking-[0.2em] uppercase"
          style={{ color: study.accentColor, fontFamily: 'JetBrains Mono, monospace' }}
        >
          Case 0{study.id}
        </span>
        <span
          className="text-xs px-3 py-1 rounded-full border"
          style={{
            borderColor: `${study.accentColor}40`,
            color: study.accentColor,
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          {study.company}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-display font-medium leading-tight mb-3"
        style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
          color: '#e8e4dc',
        }}
      >
        {study.title}
      </h3>
      <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(232,228,220,0.5)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
        {study.subtitle}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {study.tags.map((t) => (
          <span
            key={t}
            className="text-xs px-3 py-1 rounded-full"
            style={{
              background: `${study.accentColor}15`,
              color: study.accentColor,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-2 mt-auto">
        <span className="text-sm font-medium" style={{ color: study.accentColor, fontFamily: 'Inter, sans-serif' }}>
          Explore case study
        </span>
        <motion.svg
          animate={{ x: hovered ? 4 : 0 }}
          width="14" height="14" viewBox="0 0 14 14" fill="none"
        >
          <path d="M2 7h10M8 3l4 4-4 4" stroke={study.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </div>
    </motion.div>
  )
}

function CaseModal({ study, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 lg:p-8"
      style={{ background: 'rgba(5,10,20,0.9)', backdropFilter: 'blur(16px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.92, y: 32, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 32, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{
          background: '#0e1628',
          border: `1px solid ${study.accentColor}30`,
          boxShadow: `0 0 80px ${study.accentColor}15, 0 40px 100px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Modal header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 border-b"
          style={{ background: '#0e1628', borderColor: `${study.accentColor}20` }}>
          <span className="text-xs font-medium tracking-widest uppercase"
            style={{ color: study.accentColor, fontFamily: 'JetBrains Mono, monospace' }}>
            Case 0{study.id} · {study.company} · {study.period}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#e8e4dc' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-8 py-8">
          {/* Title */}
          <h2 className="font-display font-medium leading-tight mb-2"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#e8e4dc' }}>
            {study.title}
          </h2>
          <p className="text-base mb-8 italic" style={{ color: study.accentColor, fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 300 }}>
            {study.subtitle}
          </p>

          {/* Challenge */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-5 rounded-full" style={{ background: '#ef4444' }} />
              <span className="text-xs font-medium tracking-widest uppercase"
                style={{ color: 'rgba(232,228,220,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
                Challenge
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,228,220,0.7)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              {study.challenge}
            </p>
          </div>

          {/* Approach */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-5 rounded-full" style={{ background: '#c8a96e' }} />
              <span className="text-xs font-medium tracking-widest uppercase"
                style={{ color: 'rgba(232,228,220,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
                Approach
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,228,220,0.7)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              {study.approach}
            </p>
          </div>

          {/* Outcomes */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-5 rounded-full" style={{ background: '#22c55e' }} />
              <span className="text-xs font-medium tracking-widest uppercase"
                style={{ color: 'rgba(232,228,220,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
                Outcomes
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {study.outcomes.map((o, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="flex items-start gap-3 px-4 py-3 rounded-xl"
                  style={{ background: `${study.accentColor}10`, border: `1px solid ${study.accentColor}20` }}
                >
                  <span className="mt-0.5 text-xs shrink-0" style={{ color: '#22c55e' }}>✓</span>
                  <span className="text-sm leading-relaxed" style={{ color: 'rgba(232,228,220,0.8)', fontFamily: 'Inter, sans-serif' }}>
                    {o}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t" style={{ borderColor: `${study.accentColor}20` }}>
            {study.tags.map((t) => (
              <span key={t} className="text-xs px-3 py-1.5 rounded-full"
                style={{ background: `${study.accentColor}15`, color: study.accentColor, fontFamily: 'Inter, sans-serif' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CaseStudies() {
  const [selected, setSelected] = useState(null)

  return (
    <section
      id="cases"
      className="relative py-28 lg:py-36 noise-bg"
      style={{ background: '#080d1a' }}
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(200,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px" style={{ background: '#c8a96e' }} />
            <span className="text-xs font-medium tracking-[0.22em] uppercase"
              style={{ color: '#c8a96e', fontFamily: 'JetBrains Mono, monospace' }}>
              Case Studies
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display font-light leading-tight max-w-xl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#e8e4dc' }}>
              Defining partnerships that{' '}
              <span className="italic" style={{ color: '#c8a96e' }}>reshaped markets</span>
            </h2>
            <p className="text-sm max-w-xs" style={{ color: 'rgba(232,228,220,0.45)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              Click any case to explore the full challenge, approach, and measurable outcomes.
            </p>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {caseStudies.map((study, i) => (
            <TiltCard key={study.id} study={study} index={i} onOpen={setSelected} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <CaseModal study={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
