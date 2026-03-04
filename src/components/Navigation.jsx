import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'wouter'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Overview', href: '#overview', internal: true },
  { label: 'Impact', href: '#impact', internal: true },
  { label: 'Case Studies', href: '#cases', internal: true },
  { label: 'Journey', href: '#timeline', internal: true },
  { label: 'Expertise', href: '#expertise', internal: true },
  { label: 'Insights', href: '/insights', internal: false },
  { label: 'Contact', href: '#contact', internal: true },
]

function scrollToSection(href) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [location] = useLocation()
  const isHome = location === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return
    const sections = ['overview', 'impact', 'cases', 'timeline', 'expertise', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [isHome])

  const handleNavClick = (item, e) => {
    if (item.internal && isHome) {
      e.preventDefault()
      scrollToSection(item.href)
      setMobileOpen(false)
    } else {
      setMobileOpen(false)
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(8,13,26,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(200,169,110,0.12)' : 'none',
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-3 group cursor-pointer">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-mono font-medium shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #c8a96e, #b89248)',
                  color: '#080d1a',
                  letterSpacing: '0.05em',
                }}
              >
                FA
              </div>
              <span
                className="hidden sm:block font-display text-base font-medium tracking-wide"
                style={{ color: '#e8e4dc' }}
              >
                Faisal Alsadhan
              </span>
            </a>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.internal
                  ? activeSection === item.href.replace('#', '')
                  : location === item.href
              return item.internal && isHome ? (
                <button
                  key={item.label}
                  onClick={(e) => handleNavClick(item, e)}
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
                  style={{ color: isActive ? '#c8a96e' : 'rgba(232,228,220,0.7)' }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavDot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: '#c8a96e' }}
                    />
                  )}
                </button>
              ) : (
                <Link key={item.label} href={item.href}>
                  <a
                    className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer"
                    style={{ color: isActive ? '#c8a96e' : 'rgba(232,228,220,0.7)' }}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavDot"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: '#c8a96e' }}
                      />
                    )}
                  </a>
                </Link>
              )
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (isHome) scrollToSection('#contact')
                else window.location.href = import.meta.env.BASE_URL + '#contact'
              }}
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #c8a96e, #b89248)',
                color: '#080d1a',
              }}
            >
              Get in Touch
            </button>
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            >
              <motion.span
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
                className="block w-6 h-px"
                style={{ background: '#c8a96e' }}
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                className="block w-6 h-px"
                style={{ background: '#c8a96e' }}
              />
              <motion.span
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
                className="block w-6 h-px"
                style={{ background: '#c8a96e' }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 pt-20"
            style={{ background: 'rgba(8,13,26,0.98)', backdropFilter: 'blur(24px)' }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 pb-20">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  {item.internal && isHome ? (
                    <button
                      onClick={(e) => handleNavClick(item, e)}
                      className="font-display text-3xl font-light transition-colors duration-200"
                      style={{ color: activeSection === item.href.replace('#', '') ? '#c8a96e' : '#e8e4dc' }}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link href={item.href}>
                      <a
                        onClick={() => setMobileOpen(false)}
                        className="font-display text-3xl font-light cursor-pointer"
                        style={{ color: '#e8e4dc' }}
                      >
                        {item.label}
                      </a>
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.06 + 0.1 }}
                onClick={() => {
                  setMobileOpen(false)
                  scrollToSection('#contact')
                }}
                className="mt-4 px-8 py-3.5 rounded-full text-sm font-medium"
                style={{ background: 'linear-gradient(135deg, #c8a96e, #b89248)', color: '#080d1a' }}
              >
                Get in Touch
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
