import { motion } from 'framer-motion'
import { personalInfo } from '../../data/content'

const focusAreas = [
  { label: 'Partnership Strategy', icon: '◈' },
  { label: 'Ecosystem Development', icon: '◇' },
  { label: 'Emerging Technologies', icon: '◉' },
  { label: 'Business Development', icon: '◆' },
  { label: 'Revenue Growth', icon: '◈' },
  { label: 'Market Expansion', icon: '◇' },
  { label: 'Go-to-Market Strategy', icon: '◉' },
  { label: 'Investment Attraction', icon: '◆' },
  { label: 'Telecom Ecosystems', icon: '◈' },
  { label: 'Stakeholder Leadership', icon: '◇' },
]

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function Overview() {
  return (
    <section
      id="overview"
      className="relative py-28 lg:py-36"
      style={{ background: '#f4f6fb' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Text content */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px" style={{ background: '#c8a96e' }} />
              <span
                className="text-xs font-medium tracking-[0.22em] uppercase"
                style={{ color: '#c8a96e', fontFamily: 'JetBrains Mono, monospace' }}
              >
                Executive Overview
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="font-display font-light leading-tight mb-8"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: '#0b1020',
              }}
            >
              A decade of building what{' '}
              <span className="italic" style={{ color: '#c8a96e' }}>
                markets need
              </span>{' '}
              before they know they need it.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-base lg:text-lg leading-relaxed mb-8"
              style={{ color: '#374358', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              {personalInfo.summary}
            </motion.p>

            {/* Credentials row */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mt-8">
              {[
                { label: 'PMP Certified', icon: '◆' },
                { label: 'West Virginia University', icon: '◈' },
                { label: 'MIS — GPA 3.31', icon: '◇' },
                { label: "President's List", icon: '◉' },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border"
                  style={{
                    borderColor: 'rgba(200,169,110,0.35)',
                    color: '#3d4868',
                    background: 'rgba(200,169,110,0.07)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <span style={{ color: '#c8a96e', fontSize: '10px' }}>{c.icon}</span>
                  {c.label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Focus area chips */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:pt-16"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span
                className="text-xs font-medium tracking-[0.22em] uppercase"
                style={{ color: '#7a8aaa', fontFamily: 'JetBrains Mono, monospace' }}
              >
                Core Focus Areas
              </span>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              {focusAreas.map((area, i) => (
                <motion.div
                  key={area.label}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    borderColor: 'rgba(200,169,110,0.65)',
                    backgroundColor: 'rgba(200,169,110,0.09)',
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border cursor-default"
                  style={{
                    borderColor: 'rgba(10,15,30,0.14)',
                    background: 'rgba(255,255,255,0.88)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span style={{ color: '#c8a96e', fontSize: '11px' }}>{area.icon}</span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: '#1e2840', fontFamily: 'Inter, sans-serif' }}
                  >
                    {area.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Awards */}
            <motion.div variants={itemVariants} className="mt-10 p-6 rounded-2xl border" style={{ borderColor: 'rgba(200,169,110,0.25)', background: 'rgba(255,255,255,0.9)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: '#c8a96e', fontFamily: 'JetBrains Mono, monospace' }}>
                Recognitions
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { award: 'Team of the Year', org: 'MCIT FDI Team', year: '2019' },
                  { award: 'Best Operational Dashboard', org: 'Saudi Aramco', year: '2017' },
                ].map((a) => (
                  <div key={a.award} className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium" style={{ color: '#0b1020', fontFamily: 'Inter, sans-serif' }}>{a.award}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#7a8aaa' }}>{a.org}</div>
                    </div>
                    <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: '#c8a96e', fontFamily: 'JetBrains Mono, monospace' }}>{a.year}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
