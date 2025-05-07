"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  glareIntensity?: number
  rotationIntensity?: number
  borderGradient?: boolean
}

export function AnimatedCard({
  children,
  className,
  glareIntensity = 0.2,
  rotationIntensity = 10,
  borderGradient = false,
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for tracking mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animations
  const springConfig = { damping: 20, stiffness: 300 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [rotationIntensity, -rotationIntensity]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-rotationIntensity, rotationIntensity]), springConfig)
  const glareX = useSpring(useTransform(mouseX, [0, 1], ["-100%", "100%"]), springConfig)
  const glareY = useSpring(useTransform(mouseY, [0, 1], ["-100%", "100%"]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-xl bg-background transition-all duration-300",
        borderGradient && "p-[1px]",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
    >
      {borderGradient && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-biomon-red via-biomon-pink to-biomon-orange opacity-0 transition-opacity"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <motion.div
        className={cn(
          "relative h-full w-full rounded-xl bg-background",
          borderGradient && "rounded-[calc(0.75rem-1px)]",
        )}
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        {/* Glare effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white via-white to-transparent opacity-0"
          style={{
            left: glareX,
            top: glareY,
            opacity: isHovered ? glareIntensity : 0,
          }}
        />
      </motion.div>
    </motion.div>
  )
}
