"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface BodyCompositionChartProps {
  data: {
    date: string
    weight: number
    fat: number
    muscle: number
    water: number
  }[]
}

export function BodyCompositionChart({ data }: BodyCompositionChartProps) {
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
          weight: {
            label: "Weight (lbs)",
            color: "hsl(var(--chart-1))",
          },
          fat: {
            label: "Body Fat (%)",
            color: "hsl(var(--chart-2))",
          },
          muscle: {
            label: "Muscle Mass (lbs)",
            color: "hsl(var(--chart-3))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-weight)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-weight)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorFat" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-fat)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-fat)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMuscle" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-muscle)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-muscle)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dx={-10} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="var(--color-weight)"
              fillOpacity={1}
              fill="url(#colorWeight)"
            />
            <Area type="monotone" dataKey="fat" stroke="var(--color-fat)" fillOpacity={1} fill="url(#colorFat)" />
            <Area
              type="monotone"
              dataKey="muscle"
              stroke="var(--color-muscle)"
              fillOpacity={1}
              fill="url(#colorMuscle)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </motion.div>
  )
}
