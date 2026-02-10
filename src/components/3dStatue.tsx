import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stage, Center } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { Model } from './Greek_statue_head'
import type { Group } from 'three'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

function CameraAndModelController({ canvasRef }: { canvasRef: React.RefObject<HTMLDivElement | null> }) {
  const { camera } = useThree()
  const groupRef = useRef<Group>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef({ value: 0 })
  const targetProgress = useRef(0)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const isMobile = window.innerWidth < 768

  useGSAP(() => {
    if (!groupRef.current || !canvasRef.current) return

    const group = groupRef.current
    const canvas = canvasRef.current

    // Créer la timeline principale
    const tl = gsap.timeline({ paused: true })
    // Étape 1: Vue de face → Vue de droite
    tl.to(camera.position, { 
      x: 0.6, 
      y: 0, 
      z: 0, 
      duration: 2.6, 
      ease: "power2.inOut" 
    })
    // .to(group.rotation, { 
    //   y: Math.PI / 4,
    //   x: 0.1,
    //   duration: 1, 
    //   ease: "power2.inOut" 
    // }, "<")
    // .to(group.position, {
    //   x: -0.5,
    //   duration: 1,
    //   ease: "power2.inOut"
    // }, "<")
    // Animer le canvas (position, scale, opacity, etc.)
    .to(canvas, {
      x: isMobile?"65%":"30%", // Translate X
      y: isMobile?"15%":0,
      scale: 1,
      duration: 1,
      ease: "power2.inOut"
    }, "<")

    // Étape 2: Vue de droite → Vue de dessus
    .to(camera.position, { 
      x: -0.3, 
      y: 0.3, 
      z: 0.6, 
      duration: .6, 
      ease: "power2.inOut" 
    })
    // .to(group.rotation, { 
    //   y: Math.PI / 2,
    //   x: 0,
    //   z: 0.1,
    //   duration: 1, 
    //   ease: "power2.inOut" 
    // }, "<")
    // .to(group.position, {
    //   x: 0,
    //   y: -0.5,
    //   duration: 1,
    //   ease: "power2.inOut"
    // }, "<")
    .to(canvas, {
      x: "-30%",
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power2.inOut"
    }, "<")

    // Étape 3: Vue de dessus → Vue de gauche
    .to(camera.position, { 
      x: 0, 
      y: 0, 
      z: 0, 
      duration: 1, 
      ease: "power2.inOut" 
    })
    // .to(group.rotation, { 
    //   y: Math.PI,
    //   x: -0.1,
    //   z: 0,
    //   duration: 1, 
    //   ease: "power2.inOut" 
    // }, "<")
    // .to(group.position, {
    //   x: 0.5,
    //   y: 0,
    //   duration: 1,
    //   ease: "power2.inOut"
    // }, "<")
    .to(canvas, {
      x: 0,
      y: 0,
      scale: 0.8,
      duration: 1,
      ease: "power2.inOut"
    }, "<")

    // // Étape 4: Vue de gauche → Retour face
    // .to(camera.position, { 
    //   x: 0, 
    //   y: 2, 
    //   z: 8, 
    //   duration: 1, 
    //   ease: "power2.inOut" 
    // })
    // .to(group.rotation, { 
    //   y: Math.PI * 2,
    //   x: 0,
    //   z: 0,
    //   duration: 1, 
    //   ease: "power2.inOut" 
    // }, "<")
    // .to(group.position, {
    //   x: 0,
    //   y: 0,
    //   duration: 1,
    //   ease: "power2.inOut"
    // }, "<")
    // .to(canvas, {
    //   x: 0,
    //   y: 0,
    //   scale: 1,
    //   duration: 1,
    //   ease: "power2.inOut"
    // }, "<")

    timelineRef.current = tl

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      targetProgress.current += e.deltaY * 0.0003
      targetProgress.current = Math.max(0, Math.min(1, targetProgress.current))
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, { 
    scope: containerRef,
    dependencies: [camera] 
  })

  useFrame(() => {
    if (!timelineRef.current) return

    progressRef.current.value += (targetProgress.current - progressRef.current.value) * 0.1
    timelineRef.current.progress(progressRef.current.value)
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

  return (
    <div className='w-full h-screen fixed inset-0 overflow-hidden'>
      <div 
        ref={canvasRef} 
        className='w-full h-full'
        style={{ transformOrigin: 'center center' }}
      >
        <Canvas 
          camera={{ position: [0, 2, 8], fov: 45 }}
        >
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.5}>
              <CameraAndModelController canvasRef={canvasRef} />
            </Stage>
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}