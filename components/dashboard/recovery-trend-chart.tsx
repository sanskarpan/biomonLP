"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface RecoveryTrendChartProps {
  data: {
    date: string
    recovery: number
    hrv: number
  }[]
}

export function RecoveryTrendChart({ data }: RecoveryTrendChartProps) {
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
          recovery: {
            label: "Recovery %",
            color: "hsl(var(--chart-2))",
          },
          hrv: {
            label: "HRV (ms)",
            color: "hsl(var(--chart-4))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorRecovery" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-recovery)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-recovery)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorHrv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-hrv)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-hrv)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis
              yAxisId="left"
              orientation="left"
              domain={[50, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              dx={-10}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[40, 80]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              dx={10}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="recovery"
              stroke="var(--color-recovery)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRecovery)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="hrv"
              stroke="var(--color-hrv)"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </motion.div>
  )
}
