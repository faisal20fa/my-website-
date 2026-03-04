import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion'
import * as THREE from 'three'

// ─── Coordinate helpers ───────────────────────────────────────────────────────

/** Convert lat/lon degrees to a unit-sphere Vector3 */
function latLonToVec3(lat, lon, r = 1) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  )
}

/** Build smooth arc points between two lat/lon pairs */
function buildArc(from, to, segments = 70, lift = 0.28) {
  const a = latLonToVec3(from[0], from[1])
  const b = latLonToVec3(to[0], to[1])
  const pts = []
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const p = new THREE.Vector3().lerpVectors(a, b, t)
    p.normalize().multiplyScalar(1 + lift * Math.sin(Math.PI * t))
    pts.push(p.clone())
  }
  return pts
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const RIYADH = [24.7, 46.7]

const CONNECTIONS = [
  { from: RIYADH, to: [26.2, 50.6], label: 'Bahrain', color: '#d4b56c', delay: 0 },
  { from: RIYADH, to: [29.4, 47.9], label: 'Kuwait',  color: '#d4b56c', delay: 0.06 },
  { from: RIYADH, to: [25.2, 55.3], label: 'Dubai',   color: '#d4b56c', delay: 0.12 },
  { from: RIYADH, to: [51.5, -0.1], label: 'London',  color: '#7a8fa8', delay: 0.18 },
  { from: RIYADH, to: [40.7,-74.0], label: 'New York', color: '#7a8fa8', delay: 0.24 },
  { from: RIYADH, to: [1.3, 103.8], label: 'Singapore',color: '#8b7355', delay: 0.30 },
  { from: RIYADH, to: [48.9,  2.3], label: 'Paris',   color: '#7a8fa8', delay: 0.36 },
]

const CITIES = [
  { pos: RIYADH,      color: '#c8a96e', size: 0.022, label: 'Riyadh' },
  { pos: [26.2,50.6], color: '#c8a96e', size: 0.014, label: 'Bahrain' },
  { pos: [29.4,47.9], color: '#c8a96e', size: 0.014, label: 'Kuwait' },
  { pos: [25.2,55.3], color: '#c8a96e', size: 0.012, label: 'Dubai' },
  { pos: [51.5,-0.1], color: '#94a8bf', size: 0.014, label: 'London' },
  { pos: [40.7,-74.0],color: '#94a8bf', size: 0.014, label: 'New York' },
  { pos: [1.3, 103.8],color: '#94a8bf', size: 0.013, label: 'Singapore' },
  { pos: [48.9,  2.3], color: '#94a8bf', size: 0.012, label: 'Paris' },
]

// ─── Three.js components (must live inside Canvas) ───────────────────────────

/** A single animated arc line between two points */
function Arc({ from, to, color, progressRef, delay }) {
  const matRef = useRef()
  const points = useMemo(() => buildArc(from, to), [])

  const flatPositions = useMemo(() => {
    const arr = new Float32Array(points.length * 3)
    points.forEach((p, i) => { arr[i * 3] = p.x; arr[i * 3 + 1] = p.y; arr[i * 3 + 2] = p.z })
    return arr
  }, [points])

  useFrame(() => {
    if (matRef.current) {
      const p = Math.max(0, progressRef.current - delay)
      matRef.current.opacity = Math.max(0, Math.min(0.85, p * 3.5))
    }
  })

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={flatPositions}
          count={points.length}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial ref={matRef} color={color} transparent opacity={0} />
    </line>
  )
}

/** Glowing dot at a city location */
function CityDot({ lat, lon, color, size, delay, progressRef }) {
  const meshRef = useRef()
  const pos = useMemo(() => latLonToVec3(lat, lon, 1.008), [lat, lon])

  useFrame((state) => {
    if (meshRef.current?.material) {
      const p = Math.max(0, progressRef.current - delay)
      const vis = Math.min(1, p * 4)
      meshRef.current.material.opacity = vis
      // gentle pulse
      const pulse = vis > 0.05 ? 1 + Math.sin(state.clock.elapsedTime * 2.5 + delay * 20) * 0.25 : 0
      meshRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <mesh ref={meshRef} position={[pos.x, pos.y, pos.z]}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0} />
    </mesh>
  )
}

/** Particle ring orbiting the globe */
function ParticleRing({ progressRef }) {
  const ref = useRef()
  const count = 250

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const gold = new THREE.Color('#c8a96e')
    for (let i = 0; i < count; i++) {
      const θ = (i / count) * Math.PI * 2
      const r = 1.28 + Math.random() * 0.12
      const y = (Math.random() - 0.5) * 0.28
      positions[i * 3]     = r * Math.cos(θ)
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = r * Math.sin(θ)
      const lum = 0.4 + Math.random() * 0.6
      colors[i * 3] = gold.r * lum; colors[i * 3 + 1] = gold.g * lum; colors[i * 3 + 2] = gold.b * lum
    }
    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.09
      if (ref.current.material) {
        ref.current.material.opacity = Math.min(0.55, progressRef.current * 1.8)
      }
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color"    array={colors}    count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.011} vertexColors transparent opacity={0} sizeAttenuation depthWrite={false} />
    </points>
  )
}

/** The main rotating globe group */
function GlobeGroup({ progressRef }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      const p = progressRef.current
      // Idle + scroll-driven rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.07 - p * Math.PI * 1.4
      groupRef.current.rotation.x = p * 0.12
    }
  })

  return (
    <group ref={groupRef}>
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[1, 80, 80]} />
        <meshStandardMaterial color="#0c1a30" roughness={0.25} metalness={0.85} />
      </mesh>

      {/* Lat/lon wireframe overlay */}
      <mesh>
        <sphereGeometry args={[1.003, 28, 14]} />
        <meshBasicMaterial color="#1e3d68" wireframe transparent opacity={0.1} />
      </mesh>

      {/* Second denser grid */}
      <mesh>
        <sphereGeometry args={[1.003, 56, 28]} />
        <meshBasicMaterial color="#c8a96e" wireframe transparent opacity={0.025} />
      </mesh>

      {/* City dots */}
      {CITIES.map((c, i) => (
        <CityDot
          key={i}
          lat={c.pos[0]} lon={c.pos[1]}
          color={c.color} size={c.size}
          delay={i * 0.04}
          progressRef={progressRef}
        />
      ))}

      {/* Arcs */}
      {CONNECTIONS.map((conn, i) => (
        <Arc
          key={i}
          from={conn.from} to={conn.to}
          color={conn.color}
          delay={conn.delay}
          progressRef={progressRef}
        />
      ))}
    </group>
  )
}

/** Atmosphere halo — not inside the rotating group */
function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.12, 32, 32]} />
      <meshBasicMaterial color="#0a2a5c" side={THREE.BackSide} transparent opacity={0.28} depthWrite={false} />
    </mesh>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

const STAGES = [
  {
    range: [0, 0.45],
    title: 'A Global Partnership Network',
    body: 'From Riyadh to the world — building strategic alliances that bridge telecom, fintech, and emerging technology ecosystems across borders.',
  },
  {
    range: [0.45, 0.75],
    title: 'Multi-Market Presence',
    body: 'Active across Saudi Arabia, Bahrain, Kuwait, and beyond — driving revenue growth and ecosystem development throughout the Gulf and globally.',
  },
  {
    range: [0.75, 1],
    title: '$3B+ Investment Impact',
    body: 'Connecting global technology corporations with Saudi Arabia\'s Vision 2030 — attracting landmark investment into the Kingdom\'s ICT ecosystem.',
  },
]

export default function Globe3D() {
  const sectionRef = useRef(null)
  const progressRef = useRef(0)
  const stageIndexRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (val) => {
    progressRef.current = val
  })

  // Text opacity per stage driven by scroll
  const stage0Opacity = useTransform(scrollYProgress, [0, 0.25, 0.45, 0.5], [0, 1, 1, 0])
  const stage1Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.78], [0, 1, 1, 0])
  const stage2Opacity = useTransform(scrollYProgress, [0.72, 0.8, 1, 1],   [0, 1, 1, 1])

  const opacities = [stage0Opacity, stage1Opacity, stage2Opacity]

  const pillars = [
    { value: '5+', label: 'Markets' },
    { value: '10+', label: 'Years' },
    { value: '$3B+', label: 'Investment' },
    { value: '8+', label: 'Partners' },
  ]

  return (
    <section
      ref={sectionRef}
      id="globe"
      className="relative"
      style={{ background: '#060c18', minHeight: '280vh' }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Deep space background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, #0d1e38 0%, #060c18 60%)',
          }}
        />

        {/* Noise overlay */}
        <div className="noise-bg absolute inset-0 pointer-events-none" />

        {/* 3D Canvas */}
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 0, 2.9], fov: 52 }}
            dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.18} />
            <pointLight position={[4, 4, 4]}   intensity={1.6} color="#c8a96e" />
            <pointLight position={[-5,-2,-4]}   intensity={0.9} color="#1e3d68" />
            <pointLight position={[0, 3, -3]}   intensity={0.5} color="#ffffff" />
            <Suspense fallback={null}>
              <GlobeGroup progressRef={progressRef} />
              <Atmosphere />
              <ParticleRing progressRef={progressRef} />
            </Suspense>
          </Canvas>
        </div>

        {/* ── Text overlay ── */}
        <div className="absolute inset-0 pointer-events-none flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
            {/* Left column: scrolling text stages */}
            <div className="relative lg:w-5/12" style={{ minHeight: '200px' }}>
              {/* Section eyebrow */}
              <div className="absolute -top-12 flex items-center gap-3">
                <span className="w-8 h-px" style={{ background: '#c8a96e' }} />
                <span
                  className="text-xs font-medium tracking-[0.22em] uppercase"
                  style={{ color: '#c8a96e', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Global Reach
                </span>
              </div>

              {/* Stage texts — each fades in/out based on scroll */}
              {STAGES.map((stage, i) => (
                <motion.div
                  key={i}
                  style={{ opacity: opacities[i] }}
                  className="absolute top-0 left-0 w-full"
                >
                  <h2
                    className="font-display font-light leading-tight mb-4"
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)',
                      color: '#e8e4dc',
                    }}
                  >
                    {stage.title.split(' ').map((word, wi) =>
                      word.includes('$') || word.includes('Global') || word.includes('Multi') ? (
                        <span
                          key={wi}
                          className="italic"
                          style={{ color: '#c8a96e' }}
                        >
                          {word}{' '}
                        </span>
                      ) : (
                        <span key={wi}>{word} </span>
                      )
                    )}
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(232,228,220,0.55)', fontFamily: 'Inter, sans-serif', fontWeight: 300, maxWidth: '380px' }}
                  >
                    {stage.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom stats row */}
        <div className="absolute bottom-8 left-0 right-0 pointer-events-none">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-x-8 gap-y-2"
            >
              {pillars.map((p) => (
                <div key={p.label} className="flex items-baseline gap-2">
                  <span
                    className="font-mono font-medium"
                    style={{ fontFamily: 'JetBrains Mono, monospace', color: '#c8a96e', fontSize: '1.1rem' }}
                  >
                    {p.value}
                  </span>
                  <span className="text-xs" style={{ color: 'rgba(232,228,220,0.4)', fontFamily: 'Inter, sans-serif' }}>
                    {p.label}
                  </span>
                </div>
              ))}

              {/* City dots legend */}
              <div className="ml-auto flex flex-wrap items-center gap-4 hidden lg:flex">
                {CITIES.slice(0, 5).map((c, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs"
                    style={{ color: 'rgba(232,228,220,0.35)', fontFamily: 'JetBrains Mono, monospace' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
                    {c.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
