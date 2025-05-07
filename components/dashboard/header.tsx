"use client"

import { Bell, Calendar, ChevronDown, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ModeToggle } from "@/components/mode-toggle"

interface DashboardHeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  dateRange: string
  setDateRange: (range: string) => void
}

export function DashboardHeader({ sidebarOpen, setSidebarOpen, dateRange, setDateRange }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <Badge variant="outline" className="ml-2">
          Beta
        </Badge>
      </div>

      <div className="relative ml-auto flex items-center gap-4">
        <div className="hidden md:flex">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-64 rounded-full bg-muted pl-8 md:w-80" />
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1 md:gap-2">
              <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="hidden md:inline-flex">{dateRange}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0">
            <div className="grid gap-1 p-1">
              <Button variant="ghost" size="sm" className="justify-start" onClick={() => setDateRange("Today")}>
                Today
              </Button>
              <Button variant="ghost" size="sm" className="justify-start" onClick={() => setDateRange("Yesterday")}>
                Yesterday
              </Button>
              <Button variant="ghost" size="sm" className="justify-start" onClick={() => setDateRange("Last 7 Days")}>
                Last 7 Days
              </Button>
              <Button variant="ghost" size="sm" className="justify-start" onClick={() => setDateRange("Last 30 Days")}>
                Last 30 Days
              </Button>
              <Button variant="ghost" size="sm" className="justify-start" onClick={() => setDateRange("This Month")}>
                This Month
              </Button>
              <Button variant="ghost" size="sm" className="justify-start" onClick={() => setDateRange("Last Month")}>
                Last Month
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-biomon-red"></span>
        </Button>

        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Help Center</DropdownMenuItem>
            <DropdownMenuItem>Feedback</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
