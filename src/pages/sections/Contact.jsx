import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo } from '../../data/content'

function InputField({ label, type = 'text', name, value, onChange, placeholder, multiline }) {
  const [focused, setFocused] = useState(false)

  const baseStyle = {
    background: focused ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
    border: focused ? '1px solid rgba(200,169,110,0.6)' : '1px solid rgba(255,255,255,0.1)',
    boxShadow: focused ? '0 0 0 3px rgba(200,169,110,0.1)' : 'none',
    outline: 'none',
    transition: 'all 0.3s ease',
    color: '#e8e4dc',
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '0.625rem',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    resize: multiline ? 'vertical' : 'none',
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs font-medium tracking-wide uppercase"
        style={{ color: 'rgba(232,228,220,0.4)', fontFamily: 'Inter, sans-serif' }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          rows={5}
          style={{ ...baseStyle, color: '#e8e4dc' }}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{ ...baseStyle, color: '#e8e4dc' }}
        />
      )}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 1600))
    setStatus('success')
  }

  const contactLinks = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3 4.5h12a1.5 1.5 0 011.5 1.5v7.5A1.5 1.5 0 0115 15H3a1.5 1.5 0 01-1.5-1.5V6A1.5 1.5 0 013 4.5z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M1.5 6l7.5 5.25L16.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3.5 3h3l1.5 3.5-2 1.5a9.5 9.5 0 004 4l1.5-2 3.5 1.5v3a1 1 0 01-1 1A14 14 0 012.5 4a1 1 0 011-1z"
            stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone.replace(/\s/g, '')}`,
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M15 2.25H3A.75.75 0 002.25 3v12c0 .414.336.75.75.75h12a.75.75 0 00.75-.75V3a.75.75 0 00-.75-.75z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6 7.5v5.25M6 5.25v.75M9 12.75V9a1.5 1.5 0 013 0v3.75M9 9.75V12.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
      label: 'LinkedIn',
      value: personalInfo.linkedin,
      href: personalInfo.linkedinUrl,
    },
  ]

  return (
    <section
      id="contact"
      className="relative py-28 lg:py-36 noise-bg"
      style={{ background: '#080d1a' }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.3), transparent)' }}
      />

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full"
          style={{ width: '45vw', height: '45vw', background: '#c8a96e', bottom: '-15%', right: '-10%', filter: 'blur(120px)', opacity: 0.04 }} />
        <div className="absolute rounded-full"
          style={{ width: '35vw', height: '35vw', background: '#4a6fa5', top: '-10%', left: '-5%', filter: 'blur(100px)', opacity: 0.05 }} />
      </div>

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
            <span
              className="text-xs font-medium tracking-[0.22em] uppercase"
              style={{ color: '#c8a96e', fontFamily: 'JetBrains Mono, monospace' }}
            >
              Let's Connect
            </span>
          </div>
          <h2
            className="font-light leading-tight max-w-xl"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              color: '#e8e4dc',
            }}
          >
            Ready to build something{' '}
            <span
              className="italic"
              style={{
                background: 'linear-gradient(135deg, #f0dba3, #c8a96e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              extraordinary
            </span>
            ?
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-14 lg:gap-20">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <p
              className="text-base leading-relaxed font-light"
              style={{ color: 'rgba(232,228,220,0.55)', fontFamily: 'Inter, sans-serif' }}
            >
              Whether you're exploring partnership opportunities, seeking strategic counsel, or interested in discussing emerging market possibilities — I'd welcome the conversation.
            </p>

            {/* Contact links */}
            <div className="flex flex-col gap-3">
              {contactLinks.map((c) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.label === 'LinkedIn' ? '_blank' : undefined}
                  rel={c.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className="flex items-center gap-4 p-4 rounded-xl border"
                  style={{
                    borderColor: 'rgba(200,169,110,0.15)',
                    background: 'rgba(255,255,255,0.02)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)'
                    e.currentTarget.style.background = 'rgba(200,169,110,0.06)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(200,169,110,0.15)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(200,169,110,0.1)', color: '#c8a96e' }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <div
                      className="text-xs font-medium tracking-widest uppercase mb-0.5"
                      style={{ color: 'rgba(232,228,220,0.35)', fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {c.label}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: 'rgba(232,228,220,0.8)', fontFamily: 'Inter, sans-serif' }}
                    >
                      {c.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.5C5.067 1.5 3.5 3.067 3.5 5c0 2.5 3.5 7.5 3.5 7.5S10.5 7.5 10.5 5C10.5 3.067 8.933 1.5 7 1.5z"
                  stroke="rgba(232,228,220,0.3)" strokeWidth="1.1" />
                <circle cx="7" cy="5" r="1.2" fill="rgba(232,228,220,0.3)" />
              </svg>
              <span className="text-sm" style={{ color: 'rgba(232,228,220,0.35)', fontFamily: 'Inter, sans-serif' }}>
                Riyadh, Saudi Arabia
              </span>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 rounded-2xl border"
                  style={{ borderColor: 'rgba(200,169,110,0.2)', background: 'rgba(200,169,110,0.04)' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ background: 'rgba(200,169,110,0.12)', border: '1px solid rgba(200,169,110,0.3)' }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M6 14l5 5L22 9" stroke="#c8a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                  <h3
                    className="text-2xl font-medium mb-3"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#e8e4dc' }}
                  >
                    Message Received
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,228,220,0.5)', fontFamily: 'Inter, sans-serif' }}>
                    Thank you for reaching out. I'll be in touch shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
                    <InputField label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                  </div>
                  <InputField label="Company (Optional)" name="company" value={form.company} onChange={handleChange} placeholder="Your organization" />
                  <InputField label="Message" name="message" value={form.message} onChange={handleChange} placeholder="What would you like to discuss?" multiline />

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-medium text-sm"
                    style={{
                      background: 'linear-gradient(135deg, #c8a96e, #b89248)',
                      color: '#080d1a',
                      fontFamily: 'Inter, sans-serif',
                      cursor: status === 'loading' ? 'wait' : 'pointer',
                      opacity: status === 'loading' ? 0.85 : 1,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    {status === 'loading' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 rounded-full"
                          style={{ borderColor: '#08001a40', borderTopColor: '#080d1a' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1.5 7h11M8.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="max-w-7xl mx-auto px-6 lg:px-8 mt-20 pt-8 border-t"
        style={{ borderColor: 'rgba(232,228,220,0.08)' }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-mono font-medium"
              style={{ background: 'linear-gradient(135deg, #c8a96e, #b89248)', color: '#080d1a' }}
            >
              FA
            </div>
            <span className="text-sm font-medium" style={{ color: 'rgba(232,228,220,0.7)', fontFamily: 'Inter, sans-serif' }}>
              Faisal Alsadhan
            </span>
          </div>
          <span className="text-xs" style={{ color: 'rgba(232,228,220,0.3)', fontFamily: 'Inter, sans-serif' }}>
            © {new Date().getFullYear()} · Director of Partnerships & Strategic Alliances
          </span>
        </div>
      </div>
    </section>
  )
}
