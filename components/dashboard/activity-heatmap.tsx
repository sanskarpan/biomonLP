"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ActivityHeatmapProps {
  data: {
    day: string
    hours: {
      hour: number
      value: number
    }[]
  }[]
}

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  const [mounted, setMounted] = useState(false)
  const [hoveredCell, setHoveredCell] = useState<{ day: string; hour: number; value: number } | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const getColor = (value: number) => {
    // Color scale from light to dark
    if (value === 0) return "bg-muted"
    if (value < 20) return "bg-green-100 dark:bg-green-900/20"
    if (value < 40) return "bg-green-200 dark:bg-green-800/30"
    if (value < 60) return "bg-green-300 dark:bg-green-700/40"
    if (value < 80) return "bg-green-400 dark:bg-green-600/60"
    return "bg-green-500 dark:bg-green-500/80"
  }

  const formatHour = (hour: number) => {
    if (hour === 0) return "12 AM"
    if (hour === 12) return "12 PM"
    if (hour < 12) return `${hour} AM`
    return `${hour - 12} PM`
  }

  const getValue = (day: string, hour: number) => {
    const dayData = data.find((d) => d.day === day)
    if (!dayData) return 0

    const hourData = dayData.hours.find((h) => h.hour === hour)
    return hourData ? hourData.value : 0
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-[250px] w-full overflow-auto"
    >
      <div className="relative min-w-[600px]">
        {/* Hour labels (top) */}
        <div className="flex border-b">
          <div className="w-16 flex-shrink-0"></div>
          <div className="flex flex-1">
            {[0, 6, 12, 18, 23].map((hour) => (
              <div
                key={hour}
                className="flex-1 text-center text-xs text-muted-foreground"
                style={{ marginLeft: hour === 0 ? 0 : `${((hour - 0) / 23) * 100}%` }}
              >
                {formatHour(hour)}
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap grid */}
        <div className="flex flex-col">
          {days.map((day) => (
            <div key={day} className="flex h-10 items-center">
              <div className="w-16 flex-shrink-0 pr-2 text-right text-xs font-medium">{day}</div>
              <div className="relative flex-1 h-6">
                {hours.map((hour) => {
                  const value = getValue(day, hour)
                  return (
                    <div
                      key={hour}
                      className={`absolute top-0 h-full cursor-pointer transition-colors ${getColor(value)}`}
                      style={{
                        left: `${(hour / 24) * 100}%`,
                        width: `${(1 / 24) * 100}%`,
                      }}
                      onMouseEnter={() => setHoveredCell({ day, hour, value })}
                      onMouseLeave={() => setHoveredCell(null)}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {hoveredCell && (
          <div
            className="absolute rounded-lg border bg-background p-2 text-xs shadow-md"
            style={{
              left: `${(hoveredCell.hour / 24) * 100}%`,
              top: `${days.indexOf(hoveredCell.day) * 40 + 40}px`,
              transform: "translateX(-50%)",
              zIndex: 10,
            }}
          >
            <div className="font-medium">
              {hoveredCell.day}, {formatHour(hoveredCell.hour)}
            </div>
            <div className="text-muted-foreground">Activity: {hoveredCell.value}%</div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
