"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface SleepQualityChartProps {
  data: {
    day: string
    deep: number
    rem: number
    light: number
  }[]
}

export function SleepQualityChart({ data }: SleepQualityChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-[250px] w-full"
    >
      <ChartContainer
        config={{
          deep: {
            label: "Deep Sleep",
            color: "hsl(var(--chart-3))",
          },
          rem: {
            label: "REM",
            color: "hsl(var(--chart-2))",
          },
          light: {
            label: "Light Sleep",
            color: "hsl(var(--chart-4))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dx={-10} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="deep" stackId="a" fill="var(--color-deep)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="rem" stackId="a" fill="var(--color-rem)" />
            <Bar dataKey="light" stackId="a" fill="var(--color-light)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </motion.div>
  )
}
