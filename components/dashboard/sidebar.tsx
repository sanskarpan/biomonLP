"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Activity,
  ChevronLeft,
  Home,
  Layers,
  MessageSquare,
  Settings,
  Smartphone,
  TestTubeIcon as Lab,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface DashboardSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function DashboardSidebar({ open, setOpen, activeTab, setActiveTab }: DashboardSidebarProps) {
  const sidebarVariants = {
    open: {
      width: "240px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      width: "0px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const navItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "insights", label: "Insights", icon: Activity },
    { id: "labs", label: "Labs", icon: Lab },
    { id: "wearables", label: "Wearables", icon: Smartphone },
    { id: "coaching", label: "Coaching", icon: MessageSquare },
  ]

  const accountItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-background md:relative md:z-0",
          open ? "shadow-lg md:shadow-none" : "shadow-none",
        )}
        animate={open ? "open" : "closed"}
        variants={sidebarVariants}
        initial={false}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-biomon-red to-biomon-orange bg-clip-text text-transparent">
              Biomon
            </span>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(false)}>
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Close Sidebar</span>
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="px-2 text-xs font-medium text-muted-foreground">Dashboard</h3>
              <nav className="grid gap-1">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "secondary" : "ghost"}
                    size="sm"
                    className={cn("h-9 justify-start px-2", activeTab === item.id && "bg-muted font-medium")}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                ))}
              </nav>
            </div>

            <div className="space-y-1">
              <h3 className="px-2 text-xs font-medium text-muted-foreground">Account</h3>
              <nav className="grid gap-1">
                {accountItems.map((item) => (
                  <Button key={item.id} variant="ghost" size="sm" className="h-9 justify-start px-2">
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Layers className="mr-2 h-4 w-4" />
            Upgrade to Pro
          </Button>
        </div>
      </motion.div>
    </>
  )
}
