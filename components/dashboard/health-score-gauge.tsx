"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface HealthScoreGaugeProps {
  score: number
  size?: number
  thickness?: number
}

export function HealthScoreGauge({ score, size = 200, thickness = 20 }: HealthScoreGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    const centerX = size / 2
    const centerY = size / 2
    const radius = (size - thickness) / 2

    // Draw background arc
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, Math.PI * 0.75, Math.PI * 2.25, false)
    ctx.lineWidth = thickness
    ctx.strokeStyle = "rgba(200, 200, 200, 0.2)"
    ctx.stroke()

    // Create gradient for score arc
    const gradient = ctx.createLinearGradient(0, 0, size, size)
    gradient.addColorStop(0, "#F94E56") // Red
    gradient.addColorStop(0.5, "#FA6177") // Pink
    gradient.addColorStop(1, "#FE9129") // Orange

    // Calculate end angle based on score
    const scoreRatio = score / 100
    const endAngle = Math.PI * 0.75 + Math.PI * 1.5 * scoreRatio

    // Draw score arc
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, Math.PI * 0.75, endAngle, false)
    ctx.lineWidth = thickness
    ctx.strokeStyle = gradient
    ctx.lineCap = "round"
    ctx.stroke()

    // Draw center text
    ctx.fillStyle = "#000"
    ctx.font = "bold 40px Inter, system-ui, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(score.toString(), centerX, centerY)

    // Draw "out of 100" text
    ctx.fillStyle = "rgba(100, 100, 100, 0.8)"
    ctx.font = "14px Inter, system-ui, sans-serif"
    ctx.fillText("out of 100", centerX, centerY + 25)
  }, [score, size, thickness])

  return (
    <div className="relative flex items-center justify-center">
      <canvas ref={canvasRef} style={{ width: size, height: size }} className="max-w-full" />
      <motion.div
        className="absolute"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-4xl font-bold"
          >
            {score}
          </motion.div>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="text-xs text-muted-foreground"
          >
            {/* out of 100 */}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
