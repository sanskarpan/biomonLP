"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "gradient" | "outline"
  size?: "default" | "sm" | "lg"
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

export function AnimatedButton({
  children,
  className,
  variant = "default",
  size = "default",
  icon,
  iconPosition = "right",
  ...props
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const variants = {
    default: "bg-primary text-white hover:bg-primary/90",
    gradient: "bg-gradient-to-r from-biomon-red via-biomon-pink to-biomon-orange text-white",
    outline: "bg-transparent border border-primary text-primary hover:bg-primary/10",
  }

  const sizes = {
    sm: "h-9 px-3 text-sm",
    default: "h-10 px-4",
    lg: "h-12 px-6 text-lg",
  }

  return (
    <motion.button
      className={cn(
        "relative inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {variant === "gradient" && (
        <motion.span
          className="absolute inset-0 rounded-md bg-gradient-to-r from-biomon-red via-biomon-pink to-biomon-orange opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ filter: "brightness(1.1)" }}
        />
      )}
      <motion.span
        className="relative flex items-center gap-2"
        animate={{ x: isHovered ? (iconPosition === "right" ? -5 : 5) : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {icon && iconPosition === "left" && <span>{icon}</span>}
        {children}
        {icon && iconPosition === "right" && (
          <motion.span animate={{ x: isHovered ? 5 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            {icon}
          </motion.span>
        )}
      </motion.span>
    </motion.button>
  )
}
