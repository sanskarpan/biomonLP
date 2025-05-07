"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import { motion } from "framer-motion"
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  Bell,
  Calendar,
  ChevronDown,
  Home,
  TestTubeIcon as Lab,
  MessageSquare,
  Moon,
  MoreHorizontal,
  Settings,
  Smartphone,
  User,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { HealthModel } from "@/components/3d/health-model"
import { HealthRadar } from "@/components/visualizations/health-radar"
import { AnimatedCard } from "@/components/ui/animated-card"
import { AnimatedCounter } from "@/components/animations/animated-counter"

// Mock data for charts
const heartRateData = [
  { time: "00:00", rate: 62 },
  { time: "02:00", rate: 58 },
  { time: "04:00", rate: 55 },
  { time: "06:00", rate: 61 },
  { time: "08:00", rate: 75 },
  { time: "10:00", rate: 72 },
  { time: "12:00", rate: 78 },
  { time: "14:00", rate: 74 },
  { time: "16:00", rate: 82 },
  { time: "18:00", rate: 76 },
  { time: "20:00", rate: 70 },
  { time: "22:00", rate: 65 },
]

const sleepData = [
  { day: "Mon", deep: 1.2, rem: 2.1, light: 4.5 },
  { day: "Tue", deep: 1.5, rem: 1.8, light: 4.2 },
  { day: "Wed", deep: 1.1, rem: 2.3, light: 4.0 },
  { day: "Thu", deep: 1.7, rem: 2.0, light: 4.3 },
  { day: "Fri", deep: 1.3, rem: 1.9, light: 4.1 },
  { day: "Sat", deep: 1.8, rem: 2.2, light: 4.7 },
  { day: "Sun", deep: 1.6, rem: 2.4, light: 4.4 },
]

const glucoseData = [
  { day: "Mon", glucose: 95 },
  { day: "Tue", glucose: 98 },
  { day: "Wed", glucose: 102 },
  { day: "Thu", glucose: 105 },
  { day: "Fri", glucose: 110 },
  { day: "Sat", glucose: 115 },
  { day: "Sun", glucose: 118 },
]

const recoveryData = [
  { date: "05/01", recovery: 85, hrv: 65 },
  { date: "05/02", recovery: 82, hrv: 62 },
  { date: "05/03", recovery: 78, hrv: 58 },
  { date: "05/04", recovery: 75, hrv: 55 },
  { date: "05/05", recovery: 80, hrv: 60 },
  { date: "05/06", recovery: 88, hrv: 68 },
  { date: "05/07", recovery: 92, hrv: 72 },
]

// Alert data
const alerts = [
  {
    id: 1,
    title: "Rising Blood Glucose",
    description: "Your fasting glucose has been trending upward for the past 7 days.",
    severity: "warning",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Low Vitamin D",
    description: "Your latest lab results show vitamin D levels below optimal range.",
    severity: "alert",
    time: "1 day ago",
  },
  {
    id: 3,
    title: "Improved Recovery",
    description: "Your recovery scores have improved by 15% this week.",
    severity: "success",
    time: "3 days ago",
  },
]

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-4 py-2">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold bg-gradient-to-r from-biomon-red to-biomon-orange bg-clip-text text-transparent">
                Biomon
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
                      <Home className="h-4 w-4" />
                      <span>Overview</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab("insights")}>
                      <Activity className="h-4 w-4" />
                      <span>Insights</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab("labs")}>
                      <Lab className="h-4 w-4" />
                      <span>Labs</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab("wearables")}>
                      <Smartphone className="h-4 w-4" />
                      <span>Wearables</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab("coaching")}>
                      <MessageSquare className="h-4 w-4" />
                      <span>Coaching</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-muted h-8 w-8 flex items-center justify-center">
                <span className="text-sm font-bold">JD</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john@example.com</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <Badge variant="outline" className="ml-2">
                Preview
              </Badge>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
                <span className="sr-only">Calendar</span>
              </Button>
              <div className="flex items-center gap-2 rounded-md border px-3 py-1.5">
                <span className="text-sm">Last 7 Days</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </header>
          <main className="p-6">
            <div className="grid gap-6">
              {/* Health Score Cards */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatedCard borderGradient>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-sm font-medium">Health Score</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-3xl font-bold text-biomon-pink">
                            <AnimatedCounter value={87} />
                          </p>
                          <p className="text-xs text-muted-foreground">out of 100</p>
                        </div>
                        <div className="flex items-center text-sm text-green-500">
                          <ArrowUpRight className="mr-1 h-4 w-4" />
                          <span>+3%</span>
                        </div>
                      </div>
                      <Progress value={87} className="mt-4 h-2" />
                    </CardContent>
                  </AnimatedCard>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-sm font-medium">Recovery Index</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-3xl font-bold text-biomon-orange">92%</p>
                          <p className="text-xs text-muted-foreground">Optimal</p>
                        </div>
                        <div className="flex items-center text-sm text-green-500">
                          <ArrowUpRight className="mr-1 h-4 w-4" />
                          <span>+5%</span>
                        </div>
                      </div>
                      <Progress value={92} className="mt-4 h-2" />
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-3xl font-bold">8.2h</p>
                          <p className="text-xs text-muted-foreground">Good</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Moon className="h-4 w-4 text-indigo-400" />
                          <Moon className="h-4 w-4 text-indigo-400" />
                          <Moon className="h-4 w-4 text-indigo-400" />
                          <Moon className="h-4 w-4 text-muted" />
                        </div>
                      </div>
                      <Progress value={75} className="mt-4 h-2" />
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-sm font-medium">Vitamin D</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-3xl font-bold text-red-500">28 ng/mL</p>
                          <p className="text-xs text-muted-foreground">Deficient</p>
                        </div>
                        <div className="flex items-center text-sm text-red-500">
                          <ArrowUpRight className="mr-1 h-4 w-4 rotate-180" />
                          <span>-12%</span>
                        </div>
                      </div>
                      <Progress value={40} className="mt-4 h-2" />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* 3D Health Model */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.9 }}
              >
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle>Health Visualization</CardTitle>
                    <CardDescription>Interactive 3D model of your cardiovascular health</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="flex flex-col justify-center">
                        <HealthModel />
                      </div>
                      <div>
                        <HealthRadar
                          data={[
                            { name: "Cardiovascular", value: 85, description: "Heart health and circulation" },
                            { name: "Respiratory", value: 78, description: "Lung function and oxygen efficiency" },
                            { name: "Metabolic", value: 65, description: "Energy production and utilization" },
                            { name: "Immune", value: 92, description: "Immune system strength and resilience" },
                            { name: "Cognitive", value: 88, description: "Brain function and mental clarity" },
                            { name: "Muscular", value: 75, description: "Strength, endurance and recovery" },
                          ]}
                          width={300}
                          height={300}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Alerts Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Alerts & Recommendations</CardTitle>
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <span>View All</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>Proactive notifications based on your health data</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-4">
                      {alerts.map((alert) => (
                        <Alert
                          key={alert.id}
                          variant={
                            alert.severity === "warning"
                              ? "default"
                              : alert.severity === "alert"
                                ? "destructive"
                                : "default"
                          }
                          className="bg-muted/50"
                        >
                          <AlertCircle className="h-4 w-4" />
                          <div className="flex-1">
                            <AlertTitle className="flex items-center justify-between">
                              <span>{alert.title}</span>
                              <span className="text-xs text-muted-foreground">{alert.time}</span>
                            </AlertTitle>
                            <AlertDescription className="mt-1">{alert.description}</AlertDescription>
                          </div>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Charts Section */}
              <div className="grid gap-6 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle>Heart Rate (24h)</CardTitle>
                      <CardDescription>Average: 70 bpm</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <ChartContainer
                        config={{
                          rate: {
                            label: "Heart Rate",
                            color: "hsl(var(--chart-1))",
                          },
                        }}
                        className="h-[200px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={heartRateData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                              type="monotone"
                              dataKey="rate"
                              stroke="var(--color-rate)"
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle>Sleep Analysis</CardTitle>
                      <CardDescription>Weekly sleep composition</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
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
                        className="h-[200px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={sleepData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="deep" stackId="a" fill="var(--color-deep)" />
                            <Bar dataKey="rem" stackId="a" fill="var(--color-rem)" />
                            <Bar dataKey="light" stackId="a" fill="var(--color-light)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle>Blood Glucose Trend</CardTitle>
                      <CardDescription>
                        <Badge variant="destructive" className="mr-2">
                          Alert
                        </Badge>
                        Trending upward
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <ChartContainer
                        config={{
                          glucose: {
                            label: "Glucose (mg/dL)",
                            color: "hsl(var(--chart-1))",
                          },
                        }}
                        className="h-[200px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={glucoseData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                            <defs>
                              <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-glucose)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-glucose)" stopOpacity={0.1} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis domain={[90, 120]} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area
                              type="monotone"
                              dataKey="glucose"
                              stroke="var(--color-glucose)"
                              fillOpacity={1}
                              fill="url(#colorGlucose)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                >
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle>Recovery & HRV Correlation</CardTitle>
                      <CardDescription>Last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
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
                        className="h-[200px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={recoveryData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis yAxisId="left" orientation="left" domain={[50, 100]} />
                            <YAxis yAxisId="right" orientation="right" domain={[40, 80]} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line
                              yAxisId="left"
                              type="monotone"
                              dataKey="recovery"
                              stroke="var(--color-recovery)"
                              strokeWidth={2}
                            />
                            <Line
                              yAxisId="right"
                              type="monotone"
                              dataKey="hrv"
                              stroke="var(--color-hrv)"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
