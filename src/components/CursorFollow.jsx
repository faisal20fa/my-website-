import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CursorFollow() {
  const [visible, setVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const rawX = useSpring(0, { damping: 28, stiffness: 500, mass: 0.6 })
  const rawY = useSpring(0, { damping: 28, stiffness: 500, mass: 0.6 })

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMove = (e) => {
      rawX.set(e.clientX - 16)
      rawY.set(e.clientY - 16)
      setVisible(true)
    }

    const handleEnter = (e) => {
      if (
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.closest('[data-magnetic]')
      ) {
        setIsHovering(true)
      }
    }

    const handleLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleEnter)
    document.addEventListener('mouseout', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleEnter)
      document.removeEventListener('mouseout', handleLeave)
    }
  }, [rawX, rawY])

  if (!visible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ x: rawX, y: rawY }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 2.2 : 1,
          backgroundColor: isHovering
            ? 'rgba(200,169,110,0.9)'
            : 'rgba(200,169,110,0.6)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="w-8 h-8 rounded-full"
        style={{
          background: 'rgba(200,169,110,0.6)',
        }}
      />
    </motion.div>
  )
}
