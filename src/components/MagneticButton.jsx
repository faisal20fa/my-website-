import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, className = '', onClick, href, variant = 'gold' }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    setPos({ x: dx * 0.35, y: dy * 0.35 })
  }

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 })
  }

  const goldStyle = {
    background: 'linear-gradient(135deg, #c8a96e, #d4b56c)',
    color: '#080d1a',
    border: 'none',
  }
  const outlineStyle = {
    background: 'transparent',
    border: '1px solid rgba(200,169,110,0.5)',
    color: '#c8a96e',
  }
  const lightStyle = {
    background: 'transparent',
    border: '1px solid rgba(26,31,46,0.25)',
    color: '#1a1f2e',
  }

  const styles = variant === 'gold' ? goldStyle : variant === 'light' ? lightStyle : outlineStyle

  const Tag = href ? 'a' : 'button'
  const tagProps = href ? { href } : { type: 'button' }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 20, mass: 0.6 }}
      data-magnetic
      className="inline-block"
    >
      <Tag
        {...tagProps}
        onClick={onClick}
        className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body text-sm font-medium tracking-wide cursor-pointer transition-all duration-300 ${className}`}
        style={styles}
      >
        {children}
      </Tag>
    </motion.div>
  )
}
