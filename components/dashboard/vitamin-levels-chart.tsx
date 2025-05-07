"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface VitaminLevelsChartProps {
  data: {
    name: string
    value: number
    status: "optimal" | "low" | "high" | "deficient"
    reference: string
  }[]
}

export function VitaminLevelsChart({ data }: VitaminLevelsChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "#22c55e" // green-500
      case "low":
        return "#f59e0b" // amber-500
      case "high":
        return "#3b82f6" // blue-500
      case "deficient":
        return "#ef4444" // red-500
      default:
        return "#6b7280" // gray-500
    }
  }

  // Create a config object for the chart with colors for each status
  const chartConfig = {
    optimal: { color: "#22c55e" },
    low: { color: "#f59e0b" },
    high: { color: "#3b82f6" },
    deficient: { color: "#ef4444" },
    default: { color: "#6b7280" }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-[250px] w-full"
    >
      <ChartContainer className="h-full" config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" domain={[0, "dataMax"]} axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              width={80}
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md">
                      <div className="font-medium">{data.name}</div>
                      <div className="text-sm text-muted-foreground">Value: {data.value}</div>
                      <div className="text-sm text-muted-foreground">Reference: {data.reference}</div>
                      <div className="text-sm font-medium" style={{ color: getStatusColor(data.status) }}>
                        Status: {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </motion.div>
  )
}
