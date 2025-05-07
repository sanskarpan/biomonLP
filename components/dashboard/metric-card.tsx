"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AnimatedCounter } from "@/components/animations/animated-counter"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: number
  prefix?: string
  suffix?: string
  change?: number
  trend?: "up" | "down" | "neutral"
  icon?: ReactNode
  color?: "red" | "orange" | "blue" | "green" | "yellow" | "purple"
  alert?: boolean
}

export function MetricCard({
  title,
  value,
  prefix = "",
  suffix = "",
  change,
  trend = "neutral",
  icon,
  color = "blue",
  alert = false,
}: MetricCardProps) {
  const colorVariants = {
    red: "text-biomon-red",
    orange: "text-biomon-orange",
    blue: "text-blue-500",
    green: "text-green-500",
    yellow: "text-yellow-500",
    purple: "text-purple-500",
  }

  const bgColorVariants = {
    red: "bg-biomon-red/10",
    orange: "bg-biomon-orange/10",
    blue: "bg-blue-500/10",
    green: "bg-green-500/10",
    yellow: "bg-yellow-500/10",
    purple: "bg-purple-500/10",
  }

  const trendColor = trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className={cn("overflow-hidden", alert && "border-red-500/50")}>
        {alert && <div className="h-1 w-full bg-gradient-to-r from-red-500 to-biomon-red" />}
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline">
                <span className={cn("text-3xl font-bold", colorVariants[color])}>
                  {prefix}
                  <AnimatedCounter value={value} decimals={suffix === "h" ? 1 : 0} />
                  {suffix}
                </span>
              </div>
              {change && (
                <div className={cn("flex items-center text-xs", trendColor)}>
                  {trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                  ) : trend === "down" ? (
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                  ) : null}
                  <span>
                    {change > 0 ? "+" : ""}
                    {change}%
                  </span>
                </div>
              )}
            </div>
            {icon && <div className={cn("rounded-full p-2", bgColorVariants[color])}>{icon}</div>}
          </div>
          <Progress value={value} max={100} className="mt-4 h-1.5" />
        </CardContent>
      </Card>
    </motion.div>
  )
}
