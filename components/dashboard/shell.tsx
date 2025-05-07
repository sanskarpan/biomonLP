"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface DashboardShellProps {
  children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-7xl"
    >
      {children}
    </motion.div>
  )
}
