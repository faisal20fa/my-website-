import { useState } from 'react'
import { motion } from 'framer-motion'
import { expertise } from '../../data/content'

const cardColors = ['#c8a96e', '#5c7394', '#8b7355', '#4a6fa5', '#c8a96e', '#5c7394']

function ExpertiseCard({ area, index, color }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-7 border transition-all duration-400 overflow-hidden"
      style={{
        background: hovered ? '#ffffff' : 'rgba(255,255,255,0.88)',
        borderColor: hovered ? `${color}55` : 'rgba(10,15,30,0.1)',
        boxShadow: hovered ? `0 10px 36px ${color}22, 0 2px 10px rgba(0,0,0,0.07)` : '0 2px 10px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-opacity duration-400"
        style={{ background: color, opacity: hovered ? 0.08 : 0.03, transform: 'translate(30%, -30%)' }}
      />

      {/* Icon + Category */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-300"
          style={{
            background: hovered ? `${color}15` : `${color}08`,
            color,
            border: `1px solid ${color}${hovered ? '40' : '20'}`,
          }}
        >
          {area.icon}
        </div>
        <h3
          className="font-display font-medium text-lg leading-tight"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0b1020' }}
        >
          {area.category}
        </h3>
      </div>

      {/* Skills */}
      <div className="flex flex-col gap-2.5">
        {area.skills.map((skill, si) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 + si * 0.04, duration: 0.5 }}
            className="flex items-center gap-2.5"
          >
            <motion.div
              animate={{
                backgroundColor: hovered ? color : `${color}60`,
                scale: hovered ? 1.2 : 1,
              }}
              transition={{ delay: si * 0.03 }}
              className="w-1.5 h-1.5 rounded-full shrink-0"
            />
            <span
              className="text-sm"
              style={{
                color: hovered ? '#1a2235' : '#374358',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                transition: 'color 0.3s',
              }}
            >
              {skill}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom accent line */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl origin-left"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
    </motion.div>
  )
}

export default function Expertise() {
  return (
    <section
      id="expertise"
      className="relative py-28 lg:py-36"
      style={{ background: '#edf1f9' }}
    >
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.25), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px" style={{ background: '#c8a96e' }} />
                <span className="text-xs font-medium tracking-[0.22em] uppercase"
                  style={{ color: '#c8a96e', fontFamily: 'JetBrains Mono, monospace' }}>
                  Strategic Expertise
                </span>
              </div>
              <h2 className="font-display font-light leading-tight"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#0b1020' }}>
                Skills that drive{' '}
                <span className="italic" style={{ color: '#c8a96e' }}>real outcomes</span>
              </h2>
            </div>

            {/* Languages + Certifications */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'PMP Certified', type: 'cert' },
                { label: 'Predictive Analysis', type: 'cert' },
                { label: 'English — Fluent', type: 'lang' },
                { label: 'Arabic — Native', type: 'lang' },
              ].map((b) => (
                <div
                  key={b.label}
                  className="px-4 py-2 rounded-full border text-xs font-medium"
                  style={{
                    borderColor: b.type === 'cert' ? 'rgba(200,169,110,0.4)' : 'rgba(74,111,165,0.4)',
                    color: b.type === 'cert' ? '#9a7d40' : '#2d4d7a',
                    background: b.type === 'cert' ? 'rgba(200,169,110,0.08)' : 'rgba(74,111,165,0.08)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {expertise.map((area, i) => (
            <ExpertiseCard key={area.category} area={area} index={i} color={cardColors[i]} />
          ))}
        </div>

        {/* Signal line decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-16 flex items-center justify-center gap-3"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{ scaleY: [1, 1.8, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
              className="w-0.5 rounded-full"
              style={{
                height: i === 2 ? '24px' : i === 1 || i === 3 ? '16px' : '10px',
                background: '#c8a96e',
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
