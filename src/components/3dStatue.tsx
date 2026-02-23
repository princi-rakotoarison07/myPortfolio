import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stage, Center, OrbitControls } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { Model } from './Greek_statue_head'
import type { Group } from 'three'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { sharedProgress } from './constants/constants'

gsap.registerPlugin(useGSAP)

function CameraAndModelController({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLDivElement | null>
}) {
  const { camera } = useThree()
  const groupRef = useRef<Group>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const isMobile = window.innerWidth < 768

  useGSAP(
    () => {
      if (!groupRef.current || !canvasRef.current) return
      if (isMobile) return
      const canvas = canvasRef.current

      const tl = gsap.timeline({ paused: true })

      tl.to(camera.position, {
        x: 0.6,
        y: 0,
        z: 0,
        duration: 2.6,
        ease: 'power2.inOut',
      })
        .to(
          canvas,
          {
            x: isMobile ? '65%' : '30%',
            y: isMobile ? '15%' : 0,
            scale: 1,
            duration: 2.6,
            ease: 'power2.inOut',
          },
          '<'
        )
        .to(camera.rotation, {
          duration: 1.6,
        })

      timelineRef.current = tl
      // No wheel listener here — Hero is the single source of truth
    },
    {
      scope: containerRef,
      dependencies: [camera],
    }
  )

  // Driven by sharedProgress — same value as Hero's timeline
  useFrame(() => {
    if (!timelineRef.current) return
    timelineRef.current.progress(sharedProgress.value)
    camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={containerRef}>
      <group ref={groupRef}>
        <Center>
          <Model scale={[1, 1, 1]} />
        </Center>
      </group>
    </group>
  )
}

export default function Statue() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const isMobile = window.innerWidth < 768

  return (
    <div className="w-full h-72 md:h-screen md:absolute inset-0 overflow-visible">
      <div
        ref={canvasRef}
        className="w-full h-full overflow-visible"
        style={{ transformOrigin: 'center center' }}
      >
        <Canvas
          camera={{ position: [0, 2, 8], fov: 45 }}
          className="w-full h-full overflow-visible"
          shadows={false}
        >
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.5}>
              <CameraAndModelController canvasRef={canvasRef} />
            </Stage>
          </Suspense>
          {isMobile && <OrbitControls enableZoom={false}/>}
        </Canvas>
      </div>
    </div>
  )
}