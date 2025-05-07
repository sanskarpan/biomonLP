"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import * as THREE from "three"

function Model(props: any) {
  const group = useRef<THREE.Group>(null!)
  const [error, setError] = useState(false)
  
  // Use a more reliable model URL
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/heart/model.gltf",
    undefined,
    (error) => {
      console.error("Error loading model:", error)
      setError(true)
    }
  )

  // Clone the scene to avoid modifying the original
  const clonedScene = scene.clone()

  // Apply materials to the model
  useEffect(() => {
    if (error) return
    
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#FA6177"),
          roughness: 0.3,
          metalness: 0.7,
          emissive: new THREE.Color("#F94E56").multiplyScalar(0.2),
        })
      }
    })
  }, [clonedScene, error])

  // Animate the model
  useFrame((state) => {
    if (error || !group.current) return
    
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = Math.sin(t / 4) / 4
    group.current.rotation.z = Math.sin(t / 4) / 8
    group.current.position.y = Math.sin(t / 2) / 10
    // Pulsing effect
    const scale = 1 + Math.sin(t * 2) * 0.05
    group.current.scale.set(scale, scale, scale)
  })

  if (error) {
    return (
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#FA6177" />
      </mesh>
    )
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={clonedScene} scale={2.5} />
    </group>
  )
}

export function HealthModel() {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Model />
        <Environment preset="city" />
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={5}
          blur={2.5}
        />
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  )
}
