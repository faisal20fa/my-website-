import { useRef, useMemo, useEffect, memo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'

// ─── Config ──────────────────────────────────────────────────────────────────
const NODE_COUNT = 30
const CONNECT_DIST = 1.7
const BOUNDS = { x: 5, y: 3.2, z: 2.5 }

// ─── Node particle network ────────────────────────────────────────────────────
function initNodes() {
  return Array.from({ length: NODE_COUNT }, () => ({
    x: (Math.random() - 0.5) * BOUNDS.x * 2,
    y: (Math.random() - 0.5) * BOUNDS.y * 2,
    z: (Math.random() - 0.5) * BOUNDS.z * 2,
    vx: (Math.random() - 0.5) * 0.0015,
    vy: (Math.random() - 0.5) * 0.0015,
    vz: (Math.random() - 0.5) * 0.0008,
    gold: Math.random() > 0.45,
  }))
}

function Network({ mouseRef }) {
  const groupRef = useRef()
  const pointsRef = useRef()
  const linesRef = useRef()

  const nodes = useMemo(() => initNodes(), [])
  const maxLines = Math.floor((NODE_COUNT * (NODE_COUNT - 1)) / 2)

  const nodePos = useMemo(() => {
    const arr = new Float32Array(NODE_COUNT * 3)
    nodes.forEach((n, i) => { arr[i * 3] = n.x; arr[i * 3 + 1] = n.y; arr[i * 3 + 2] = n.z })
    return arr
  }, [nodes])

  const nodeColors = useMemo(() => {
    const arr = new Float32Array(NODE_COUNT * 3)
    const gold = new THREE.Color('#c8a96e')
    const steel = new THREE.Color('#4a6fa5')
    nodes.forEach((n, i) => {
      const c = n.gold ? gold : steel
      arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b
    })
    return arr
  }, [nodes])

  const linePos = useMemo(() => new Float32Array(maxLines * 6), [maxLines])

  useFrame(() => {
    // Drift nodes
    nodes.forEach((n, i) => {
      n.x += n.vx; n.y += n.vy; n.z += n.vz
      if (Math.abs(n.x) > BOUNDS.x) n.vx *= -1
      if (Math.abs(n.y) > BOUNDS.y) n.vy *= -1
      if (Math.abs(n.z) > BOUNDS.z) n.vz *= -1
      nodePos[i * 3] = n.x; nodePos[i * 3 + 1] = n.y; nodePos[i * 3 + 2] = n.z
    })
    if (pointsRef.current?.geometry?.attributes?.position) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }

    // Recompute connection lines
    let lc = 0
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const dz = nodes[i].z - nodes[j].z
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < CONNECT_DIST) {
          const k = lc * 6
          linePos[k]   = nodes[i].x; linePos[k+1] = nodes[i].y; linePos[k+2] = nodes[i].z
          linePos[k+3] = nodes[j].x; linePos[k+4] = nodes[j].y; linePos[k+5] = nodes[j].z
          lc++
        }
      }
    }
    if (linesRef.current?.geometry?.attributes?.position) {
      const attr = linesRef.current.geometry.attributes.position
      attr.array.set(linePos)
      attr.needsUpdate = true
      linesRef.current.geometry.setDrawRange(0, lc * 2)
    }

    // Mouse-driven scene tilt
    if (groupRef.current && mouseRef.current) {
      const mx = mouseRef.current.x * 0.14
      const my = mouseRef.current.y * 0.09
      groupRef.current.rotation.y += (mx - groupRef.current.rotation.y) * 0.035
      groupRef.current.rotation.x += (my - groupRef.current.rotation.x) * 0.035
    }
  })

  return (
    <group ref={groupRef}>
      {/* Node particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={nodePos}    count={NODE_COUNT}    itemSize={3} />
          <bufferAttribute attach="attributes-color"    array={nodeColors} count={NODE_COUNT}    itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.075} vertexColors transparent opacity={0.65} sizeAttenuation depthWrite={false} />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={linePos} count={maxLines * 2} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#3d5578" transparent opacity={0.2} depthWrite={false} />
      </lineSegments>
    </group>
  )
}

// ─── Floating wireframe geometries ───────────────────────────────────────────
function FloatingGeo({ position, size, speedX, speedY, color, type = 'ico' }) {
  const ref = useRef()
  const baseY = position[1]

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * speedX
    ref.current.rotation.y = state.clock.elapsedTime * speedY
    ref.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.18
  })

  return (
    <mesh ref={ref} position={[position[0], position[1], position[2]]}>
      {type === 'ico'
        ? <icosahedronGeometry args={[size, 0]} />
        : type === 'oct'
        ? <octahedronGeometry args={[size, 0]} />
        : <tetrahedronGeometry args={[size, 0]} />}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.3} depthWrite={false} />
    </mesh>
  )
}

// ─── Full scene ───────────────────────────────────────────────────────────────
function HeroSceneInner({ mouseRef }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2, 3]} intensity={1.2} color="#c8a96e" />
      <pointLight position={[-4, -2, -2]} intensity={0.6} color="#1e3d68" />

      <Network mouseRef={mouseRef} />

      {/* Large icosahedron — right side */}
      <FloatingGeo position={[3.6, 0.6, -1.2]} size={0.85} speedX={0.14} speedY={0.20} color="#c8a96e" type="ico" />
      {/* Medium icosahedron — upper left */}
      <FloatingGeo position={[-3.5, 1.4, -0.8]} size={0.52} speedX={0.18} speedY={0.12} color="#4a6fa5" type="ico" />
      {/* Small octahedron — lower right */}
      <FloatingGeo position={[2.8, -2.0, 0.4]} size={0.32} speedX={0.26} speedY={0.22} color="#c8a96e" type="oct" />
      {/* Tiny tetrahedron — center-left */}
      <FloatingGeo position={[-2.0, -0.8, 1.0]} size={0.22} speedX={0.32} speedY={0.28} color="#5c7394" type="tet" />
    </>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default memo(function HeroScene3D() {
  const mouseRef = useRef({ x: 0, y: 0 })
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) return
    const handler = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [shouldReduce])

  if (shouldReduce) return null

  return (
    <div
      className="absolute inset-0"
      style={{ zIndex: 1, pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 65 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <HeroSceneInner mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  )
})
