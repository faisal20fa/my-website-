import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconAI({ color, size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      {/* Central brain/neural core */}
      <circle cx="18" cy="18" r="4.5" stroke={color} strokeWidth="1.5" />
      {/* Neural connections */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const r = Math.PI * deg / 180
        const x1 = 18 + 4.5 * Math.cos(r)
        const y1 = 18 + 4.5 * Math.sin(r)
        const x2 = 18 + 11 * Math.cos(r)
        const y2 = 18 + 11 * Math.sin(r)
        const lx = 18 + 13.5 * Math.cos(r)
        const ly = 18 + 13.5 * Math.sin(r)
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1" opacity="0.5" />
            <circle cx={lx} cy={ly} r="1.8" fill={color} opacity={i % 2 === 0 ? 0.9 : 0.5} />
          </g>
        )
      })}
      {/* Outer ring pulse arcs */}
      <circle cx="18" cy="18" r="16" stroke={color} strokeWidth="0.5" strokeDasharray="3 5" opacity="0.3" />
    </svg>
  )
}

function IconIoT({ color, size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      {/* Central hub */}
      <circle cx="18" cy="18" r="3" fill={color} opacity="0.9" />
      {/* Concentric signal rings */}
      <circle cx="18" cy="18" r="7" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="18" cy="18" r="12" stroke={color} strokeWidth="0.8" opacity="0.35" />
      <circle cx="18" cy="18" r="16.5" stroke={color} strokeWidth="0.5" opacity="0.15" />
      {/* Device nodes */}
      {[
        [18, 4], [30, 11], [30, 25], [18, 32], [6, 25], [6, 11]
      ].map(([x, y], i) => (
        <rect key={i} x={x - 2.2} y={y - 2.2} width="4.4" height="4.4" rx="1.2"
          fill={color} opacity={0.7} />
      ))}
    </svg>
  )
}

function IconBlockchain({ color, size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      {/* Chain links */}
      {[
        { x: 4, y: 15 },
        { x: 14, y: 15 },
        { x: 24, y: 15 },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width="10" height="8" rx="2.5"
            stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.1" />
          {i < 2 && (
            <line x1={b.x + 10} y1={b.y + 4} x2={b.x + 14} y2={b.y + 4}
              stroke={color} strokeWidth="1.2" opacity="0.5" />
          )}
        </g>
      ))}
      {/* Second row — offset for chain feel */}
      {[{ x: 9, y: 25 }, { x: 19, y: 25 }].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width="10" height="8" rx="2.5"
            stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.1" />
          {i < 1 && (
            <line x1={b.x + 10} y1={b.y + 4} x2={b.x + 14} y2={b.y + 4}
              stroke={color} strokeWidth="1.2" opacity="0.5" />
          )}
          {/* Vertical chain link */}
          <line x1={b.x + 5} y1={b.y} x2={(i === 0 ? 14 : 24) + 5} y2={23}
            stroke={color} strokeWidth="1" opacity="0.4" />
        </g>
      ))}
      {/* Hash dots on blocks */}
      {[9, 19, 29].map((x, i) => (
        <circle key={i} cx={x} cy={19} r="1" fill={color} opacity="0.5" />
      ))}
    </svg>
  )
}

function IconEdge({ color, size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      {/* Lightning bolt — fast processing */}
      <path d="M20 4 L12 19 H18 L16 32 L26 17 H20 L22 4Z"
        stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.15"
        strokeLinejoin="round" strokeLinecap="round" />
      {/* Speed lines */}
      <line x1="4" y1="12" x2="9" y2="12" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="2" y1="18" x2="9" y2="18" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="4" y1="24" x2="9" y2="24" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Outer burst */}
      <circle cx="18" cy="18" r="15.5" stroke={color} strokeWidth="0.5"
        strokeDasharray="2 4" opacity="0.2" />
    </svg>
  )
}

function IconCloud({ color, size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      {/* Main cloud shape */}
      <path d="M10 24 Q5 24 5 19 Q5 14 10 14 Q10 9 16 9 Q20 9 22 12 Q24 9 27 9 Q31 9 31 14 Q34 14 34 19 Q34 24 29 24 Z"
        stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.12" strokeLinejoin="round" />
      {/* Upload arrow */}
      <line x1="18" y1="30" x2="18" y2="20" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 24 L18 20 L22 24" stroke={color} strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Data dots */}
      {[13, 18, 23].map((x, i) => (
        <circle key={i} cx={x} cy={17} r="1.2" fill={color} opacity={0.5 + i * 0.15} />
      ))}
    </svg>
  )
}

// ─── Tech data ─────────────────────────────────────────────────────────────────

const TECHNOLOGIES = [
  {
    name: 'Artificial Intelligence',
    short: 'AI',
    color: '#c8a96e',
    Icon: IconAI,
    description: 'Partnered with global AI providers to deploy machine learning across stc subsidiaries and Saudi Arabia\'s Giga projects — including the landmark NEOM MoU.',
    benefits: [
      'Automates complex decision-making at scale',
      'Reduces operational costs by 30–40%',
      'Enables predictive analytics & personalization',
      'Accelerates innovation cycles dramatically',
    ],
  },
  {
    name: 'Internet of Things',
    short: 'IoT',
    color: '#4a9fa5',
    Icon: IconIoT,
    description: 'Mapped and onboarded IoT partners for smart city infrastructure, industrial automation, and connected services across Gulf markets.',
    benefits: [
      'Real-time visibility across physical assets',
      'Preventive maintenance cuts downtime',
      'Data-driven operational efficiency gains',
      'Bridges previously isolated systems',
    ],
  },
  {
    name: 'Blockchain',
    short: 'Blockchain',
    color: '#4a6fa5',
    Icon: IconBlockchain,
    description: 'Initiated the first system integrator MoU in Saudi Arabia with NEOM — positioning stc at the forefront of blockchain and distributed trust infrastructure.',
    benefits: [
      'Eliminates middlemen in transactions',
      'Provides immutable audit trails',
      'Enables smart contract automation',
      'Builds verifiable trust between partners',
    ],
  },
  {
    name: 'Edge Computing',
    short: 'Edge',
    color: '#a07a4a',
    Icon: IconEdge,
    description: 'Positioned stc as the preferred partner for edge computing aligned to 5G infrastructure and Giga project requirements across Saudi Arabia.',
    benefits: [
      'Sub-millisecond latency for critical ops',
      'Reduces bandwidth and cloud costs',
      'Enables AI inference at the source',
      'Works offline for resilience',
    ],
  },
  {
    name: 'Cloud Computing',
    short: 'Cloud',
    color: '#3d7ab5',
    Icon: IconCloud,
    description: 'Developed market strategies at MCIT and attracted leading international cloud providers to establish regional presence in Saudi Arabia as part of $3B+ investment.',
    benefits: [
      'Scales infrastructure on demand',
      'Pay-as-you-grow cost efficiency',
      'Global reach with built-in redundancy',
      'Accelerates go-to-market timelines',
    ],
  },
]

// ─── Tech card ────────────────────────────────────────────────────────────────

function TechCard({ tech, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '1.25rem',
        padding: '1.75rem',
        overflow: 'hidden',
        cursor: 'default',
        background: hovered
          ? 'rgba(12,20,38,0.98)'
          : 'rgba(10,17,33,0.75)',
        border: `1px solid ${hovered ? tech.color + '50' : 'rgba(255,255,255,0.07)'}`,
        backdropFilter: 'blur(20px)',
        boxShadow: hovered
          ? `0 12px 48px ${tech.color}20, 0 2px 16px rgba(0,0,0,0.35)`
          : '0 2px 12px rgba(0,0,0,0.2)',
        transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      {/* Glow orb on hover */}
      <div
        style={{
          position: 'absolute',
          top: '-30%',
          right: '-20%',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: tech.color,
          filter: 'blur(60px)',
          opacity: hovered ? 0.08 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Bottom accent bar */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '2px',
          background: `linear-gradient(90deg, ${tech.color}, transparent)`,
          transformOrigin: 'left',
          borderRadius: '0 0 1.25rem 1.25rem',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Icon + badge */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `${tech.color}14`,
              border: `1px solid ${tech.color}${hovered ? '45' : '25'}`,
              transition: 'all 0.35s ease',
            }}
          >
            <tech.Icon color={tech.color} size={32} />
          </div>
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: tech.color,
              background: `${tech.color}12`,
              border: `1px solid ${tech.color}25`,
              padding: '4px 10px',
              borderRadius: '999px',
            }}
          >
            {tech.short}
          </span>
        </div>

        {/* Name */}
        <h3
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
            fontWeight: 400,
            color: '#e8e4dc',
            lineHeight: 1.25,
            marginBottom: '0.75rem',
          }}
        >
          {tech.name}
        </h3>

        {/* Description (visible by default, fades on hover) */}
        <AnimatePresence mode="wait" initial={false}>
          {!hovered ? (
            <motion.p
              key="desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 300,
                lineHeight: 1.65,
                color: 'rgba(232,228,220,0.45)',
              }}
            >
              {tech.description}
            </motion.p>
          ) : (
            <motion.div
              key="benefits"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <p
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: tech.color,
                  marginBottom: '0.6rem',
                  opacity: 0.8,
                }}
              >
                Organizational Benefits
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {tech.benefits.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}
                  >
                    <span style={{ color: tech.color, marginTop: '4px', flexShrink: 0, fontSize: '0.5rem' }}>◆</span>
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.82rem',
                        fontWeight: 300,
                        color: 'rgba(232,228,220,0.75)',
                        lineHeight: 1.5,
                      }}
                    >
                      {b}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function TechEcosystem() {
  return (
    <section
      id="tech-ecosystem"
      className="relative py-28 lg:py-36 noise-bg"
      style={{ background: '#080d1a' }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.25), transparent)' }}
      />

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full"
          style={{ width: '40vw', height: '40vw', background: '#c8a96e', top: '10%', right: '-10%', filter: 'blur(100px)', opacity: 0.04 }} />
        <div className="absolute rounded-full"
          style={{ width: '35vw', height: '35vw', background: '#4a6fa5', bottom: '5%', left: '-8%', filter: 'blur(90px)', opacity: 0.05 }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px" style={{ background: '#c8a96e' }} />
            <span
              className="text-xs font-medium tracking-[0.22em] uppercase"
              style={{ color: '#c8a96e', fontFamily: 'JetBrains Mono, monospace' }}
            >
              Emerging Technology Ecosystem
            </span>
            <span className="w-8 h-px" style={{ background: '#c8a96e' }} />
          </div>

          <h2
            className="font-light leading-tight mb-5"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              color: '#e8e4dc',
            }}
          >
            Technologies that define{' '}
            <span
              className="italic"
              style={{
                background: 'linear-gradient(135deg, #f0dba3, #c8a96e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              the next decade
            </span>
          </h2>

          <p
            className="text-base font-light leading-relaxed"
            style={{ color: 'rgba(232,228,220,0.5)', fontFamily: 'Inter, sans-serif' }}
          >
            A decade of building partnerships across the technologies reshaping industries —
            from AI and IoT to blockchain and cloud across Gulf and global markets.
          </p>

          {/* Hover hint */}
          <div className="inline-flex items-center gap-2 mt-5">
            <motion.span
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(200,169,110,0.55)',
              }}
            >
              Hover cards to reveal benefits
            </motion.span>
          </div>
        </motion.div>

        {/* Tech grid — 5 cards: 3 top, 2 centered bottom */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-4 lg:mb-5">
          {TECHNOLOGIES.slice(0, 3).map((tech, i) => (
            <TechCard key={tech.name} tech={tech} index={i} />
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5 lg:max-w-[66.66%] lg:mx-auto">
          {TECHNOLOGIES.slice(3).map((tech, i) => (
            <TechCard key={tech.name} tech={tech} index={i + 3} />
          ))}
        </div>

        {/* Waveform accent */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <div className="flex items-end gap-1">
            {[6, 10, 16, 22, 28, 22, 16, 10, 6].map((h, i) => (
              <motion.div
                key={i}
                animate={{ scaleY: [1, 1.6, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.8, delay: i * 0.09, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '3px',
                  height: `${h}px`,
                  background: '#c8a96e',
                  borderRadius: '2px',
                  transformOrigin: 'bottom',
                }}
              />
            ))}
          </div>
          <p
            style={{
              color: 'rgba(232,228,220,0.28)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            AI · IoT · Blockchain · Edge · Cloud
          </p>
        </motion.div>
      </div>
    </section>
  )
}
