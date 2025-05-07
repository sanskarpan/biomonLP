"use client"

import { AlertCircle, ArrowRight, CheckCircle, Clock, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Alert {
  id: number
  title: string
  description: string
  type: "warning" | "info" | "success" | "error"
  time: string
  action?: string
}

interface AlertCardProps {
  alert: Alert
}

export function AlertCard({ alert }: AlertCardProps) {
  const iconMap = {
    warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-biomon-red" />,
  }

  const bgColorMap = {
    warning: "bg-yellow-500/10",
    info: "bg-blue-500/10",
    success: "bg-green-500/10",
    error: "bg-biomon-red/10",
  }

  return (
    <div className={cn("mb-2 rounded-lg p-3 transition-colors hover:bg-muted/50", bgColorMap[alert.type])}>
      <div className="flex gap-3">
        <div className="flex-shrink-0 pt-0.5">{iconMap[alert.type]}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h4 className="font-medium">{alert.title}</h4>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {alert.time}
            </div>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{alert.description}</p>
          {alert.action && (
            <Button variant="ghost" size="sm" className="mt-2 h-7 gap-1 px-2 text-xs">
              {alert.action}
              <ArrowRight className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
