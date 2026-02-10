import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stage, Center } from '@react-three/drei'
import { Suspense, useRef, useEffect } from 'react'
import { Model } from './Greek_statue_head'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'


function CameraController() {
  const { camera } = useThree()
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const progressRef = useRef({ value: 0 })
  const targetProgress = useRef(0)

  useEffect(() => {
    // Créer la timeline pour la caméra
    const tl = gsap.timeline({ paused: true })
    camera.position.set(0, 2, 8)
    // Étape 1: Position initiale → Vue de droite
    tl.to(camera.position, { 
      x: 0.6, 
      y: 0, 
      z: 2, 
      duration: 1,
      ease: "power2.inOut"
    })
    // Étape 2: Vue de droite → Vue de dessus
    .to(camera.position, { 
      x: 1, 
      y: 0, 
      z: 0, 
      duration: 1,
      ease: "power2.inOut"
    })

    // Étape 3: Vue de dessus → Vue de gauche
    .to(camera.position, { 
      x: 1.5, 
      y: 0, 
      z: 0, 
      duration: 1,
      ease: "power2.inOut"
    })

    // Étape 4: Vue de gauche → Retour position initiale
    .to(camera.position, { 
      x: 0, 
      y: 0, 
      z: 0, 
      duration: 1,
      ease: "power2.inOut"
    })

    timelineRef.current = tl

    // Gérer le scroll
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      targetProgress.current += e.deltaY * 0.0003
      targetProgress.current = Math.max(0, Math.min(1, targetProgress.current))
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      tl.kill()
    }
  }, [camera])

  useFrame(() => {
    if (!timelineRef.current) return

    // Smooth interpolation
    progressRef.current.value += (targetProgress.current - progressRef.current.value) * 0.1

    // Mettre à jour la timeline
    timelineRef.current.progress(progressRef.current.value)

    // Toujours regarder le centre (le modèle)
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function Statue() {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useGSAP(() => {

  })

  return (
    <div className='w-full h-screen fixed inset-0 overflow-hidden'>
      <Canvas 
        camera={{ position: [0, 2, 8], fov: 45 }}
        className='translate-x-1/3'
        ref={canvasRef}
      >
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5}>
            {/* Modèle fixe au centre */}
            <Center>
              <Model scale={[1, 1, 1]} />
            </Center>
          </Stage>
          <CameraController />
        </Suspense>
      </Canvas>
    </div>
  )
}