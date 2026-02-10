import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stage } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { Model } from './Greek_statue_head'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Group } from 'three'

gsap.registerPlugin(ScrollTrigger)

export default function Statue() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<Group>(null)

  useGSAP(() => {
    if (!groupRef.current) return
    
    // Get the 3D group element
    const group = groupRef.current
    
    // Create scroll animation
    gsap.to(group.rotation, {
      y: Math.PI * 2, // Full rotation
      duration: 1,
      ease: "none",
      scrollTrigger: {
        trigger: canvasRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: false, // Set to true for debugging
      }
    })
    
    // Scale animation
    gsap.to(group.scale, {
      x: 3,
      y: 3,
      z: 3,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: canvasRef.current,
        start: "top center",
        end: "center center",
        scrub: true,
      }
    })
    
    // Position animation
    gsap.to(group.position, {
      y: 3,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: canvasRef.current,
        start: "top bottom",
        end: "center center",
        scrub: true,
      }
    })
    
  }, { scope: canvasRef })

  return (
    <div className='w-full h-full'
      ref={canvasRef}
    >
      <Canvas camera={{ position: [0, 0, 2], fov: 45 }}>
        <Suspense fallback={null}>
        <Stage environment="city" intensity={0.5}>
            <group position={[0, 1.5, 0]}
              ref={groupRef}
            >
                <Model scale={[2, 2, 2]} />
            </group>
        </Stage>

        </Suspense>
        <OrbitControls 
        enableRotate={false}
        enableZoom={false}
        enablePan={false}
        />
      </Canvas>
    </div>
  )
}