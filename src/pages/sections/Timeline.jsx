import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { experience } from '../../data/content'

const companyColors = {
  stc: '#c8a96e',
  Unifonic: '#5c7394',
  'Solution by stc': '#8b7355',
  MCIT: '#4a6fa5',
  'Saudi Aramco': '#3d5578',
}

function TimelineItem({ item, index }) {
  const isLeft = index % 2 === 0

  return (
    <div className={`relative flex ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start gap-8 lg:gap-12`}>
      {/* Desktop spacer */}
      <div className="hidden lg:block flex-1" />

      {/* Center dot */}
      <div className="hidden lg:flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 300, damping: 22, delay: index * 0.08 }}
          className="w-4 h-4 rounded-full border-2 z-10"
          style={{
            borderColor: companyColors[item.company] || '#c8a96e',
            background: '#f4f6fb',
            boxShadow: `0 0 16px ${companyColors[item.company] || '#c8a96e'}50`,
          }}
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -32 : 32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 mb-12"
      >
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="rounded-2xl p-7 border transition-all duration-300 group"
          style={{
            background: '#ffffff',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            borderColor: 'rgba(10,15,30,0.1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${companyColors[item.company] || '#c8a96e'}50`
            e.currentTarget.style.boxShadow = `0 8px 32px ${companyColors[item.company] || '#c8a96e'}15`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(26,31,46,0.1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <div
                className="text-xs font-medium tracking-widest uppercase mb-2"
                style={{ color: companyColors[item.company] || '#c8a96e', fontFamily: 'JetBrains Mono, monospace' }}
              >
                {item.period}
              </div>
              <h3
                className="font-display font-medium leading-tight"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', color: '#0b1020' }}
              >
                {item.title}
              </h3>
            </div>
            <span
              className="px-3 py-1.5 rounded-full text-xs font-medium shrink-0"
              style={{
                background: `${companyColors[item.company] || '#c8a96e'}12`,
                color: companyColors[item.company] || '#c8a96e',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {item.company}
            </span>
          </div>

          <p className="text-sm leading-relaxed mb-5" style={{ color: '#374358', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            {item.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-col gap-2">
            {item.highlights.slice(0, 3).map((h, hi) => (
              <div key={hi} className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                  style={{ background: companyColors[item.company] || '#c8a96e' }} />
                <span className="text-xs leading-relaxed" style={{ color: '#5a6a88', fontFamily: 'Inter, sans-serif' }}>
                  {h}
                </span>
              </div>
            ))}
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 mt-5 pt-4 border-t" style={{ borderColor: 'rgba(26,31,46,0.08)' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.5 3.5 6.5 3.5 6.5s3.5-4 3.5-6.5C9.5 2.567 7.933 1 6 1z"
                stroke="#7a8aaa" strokeWidth="1" fill="none" />
              <circle cx="6" cy="4.5" r="1" fill="#7a8aaa" />
            </svg>
            <span className="text-xs" style={{ color: '#7a8aaa', fontFamily: 'Inter, sans-serif' }}>
              {item.location}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function Timeline() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  })

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative py-28 lg:py-36"
      style={{ background: '#f4f6fb' }}
    >
      {/* Subtle top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.3), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 lg:mb-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px" style={{ background: '#c8a96e' }} />
            <span className="text-xs font-medium tracking-[0.22em] uppercase"
              style={{ color: '#c8a96e', fontFamily: 'JetBrains Mono, monospace' }}>
              Professional Journey
            </span>
          </div>
          <h2 className="font-display font-light leading-tight max-w-lg"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#0b1020' }}>
            A decade of{' '}
            <span className="italic" style={{ color: '#c8a96e' }}>deliberate growth</span>
          </h2>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical SVG line — desktop only */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px overflow-hidden">
            <motion.div
              style={{
                scaleY: shouldReduce ? 1 : lineScaleY,
                transformOrigin: 'top',
                height: '100%',
                background: 'linear-gradient(to bottom, #c8a96e, rgba(200,169,110,0.2))',
              }}
            />
          </div>

          {/* Timeline items */}
          <div className="flex flex-col">
            {experience.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Education footer */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-8 p-7 rounded-2xl border"
          style={{ background: '#ffffff', borderColor: 'rgba(200,169,110,0.25)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="text-xs font-medium tracking-widest uppercase mb-2"
                style={{ color: '#c8a96e', fontFamily: 'JetBrains Mono, monospace' }}>
                Education
              </div>
              <h3 className="font-display font-medium text-xl"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0b1020' }}>
                West Virginia University
              </h3>
              <p className="text-sm mt-1" style={{ color: '#374358', fontFamily: 'Inter, sans-serif' }}>
                Bachelor of Science in Management Information Systems · Minor in Communication Studies
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'GPA 3.31', icon: '◆' },
                { label: "President's List", icon: '◈' },
                { label: '2010 – 2015', icon: '◇' },
              ].map((b) => (
                <div key={b.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium"
                  style={{ borderColor: 'rgba(200,169,110,0.3)', color: '#3d4868', background: 'rgba(200,169,110,0.06)', fontFamily: 'Inter, sans-serif' }}>
                  <span style={{ color: '#c8a96e', fontSize: '10px' }}>{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
