"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface NutrientIntakeChartProps {
  data: {
    name: string
    value: number
    color: string
    percentage: number
    target: number
  }[]
}

export function NutrientIntakeChart({ data }: NutrientIntakeChartProps) {
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
      <div className="grid h-full grid-cols-2 gap-4">
        <div className="flex flex-col justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-md">
                        <div className="font-medium">{data.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {data.value}g ({data.percentage}%)
                        </div>
                        <div className="text-sm text-muted-foreground">Target: {data.target}g</div>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col justify-center space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <span className="text-sm">{item.value}g</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{item.percentage}% of total</span>
                <span>Target: {item.target}g</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
