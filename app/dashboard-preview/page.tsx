"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Activity,
  AlertCircle,
  ChevronDown,
  Clock,
  Heart,
  Info,
  Moon,
  MoreHorizontal,
  Plus,
  Sun,
  TrendingUp,
  Zap,
} from "lucide-react"
import Image from "next/image"

// UI Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

// Custom Components
import { HealthModel } from "@/components/3d/health-model"
import { HealthRadar } from "@/components/visualizations/health-radar"
import { BodyCompositionChart } from "@/components/dashboard/body-composition-chart"
import { SleepQualityChart } from "@/components/dashboard/sleep-quality-chart"
import { NutrientIntakeChart } from "@/components/dashboard/nutrient-intake-chart"
import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap"
import { MetricCard } from "@/components/dashboard/metric-card"
import { AlertCard } from "@/components/dashboard/alert-card"
import { HealthScoreGauge } from "@/components/dashboard/health-score-gauge"
import { RecoveryTrendChart } from "@/components/dashboard/recovery-trend-chart"
import { VitaminLevelsChart } from "@/components/dashboard/vitamin-levels-chart"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"

// Type definitions for data imports
type TrendType = "up" | "down" | "neutral";
type AlertType = "warning" | "info" | "success" | "error";
type VitaminStatus = "optimal" | "low" | "high" | "deficient";

interface HealthScoreData {
  current: number;
  change: number;
  trend: TrendType;
  history: Array<{ date: string; score: number }>;
}

interface RecoveryData {
  current: number;
  change: number;
  trend: TrendType;
  history: Array<{ date: string; recovery: number; hrv: number }>;
}

interface SleepData {
  current: number;
  change: number;
  trend: TrendType;
  history: Array<{ day: string; deep: number; rem: number; light: number }>;
}

interface VitaminData {
  current: number;
  change: number;
  trend: TrendType;
  alert: boolean;
  levels: Array<{
    name: string;
    value: number;
    status: VitaminStatus;
    reference: string;
  }>;
}

interface AlertData {
  id: number;
  title: string;
  description: string;
  type: AlertType;
  time: string;
  action: string;
}

// Mock data with proper types
import {
  healthScoreData as importedHealthScoreData,
  recoveryData as importedRecoveryData,
  sleepData as importedSleepData,
  vitaminData as importedVitaminData,
  alertsData as importedAlertsData,
  nutrientData,
  activityData,
  bodyCompositionData,
  radarData,
} from "@/data/dashboard-data"

// Cast imported data to properly typed variables
const healthScoreData = importedHealthScoreData as HealthScoreData;
const recoveryData = importedRecoveryData as RecoveryData;
const sleepData = importedSleepData as SleepData;
const vitaminData = importedVitaminData as VitaminData;
const alertsData = importedAlertsData as AlertData[];

export default function DashboardPreview() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [dateRange, setDateRange] = useState("Last 7 Days")

  // Fix for hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />

        <main className="flex-1 overflow-auto p-0">
          <DashboardShell>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 p-6"
              >
                {activeTab === "overview" && (
                  <>
                    {/* Top Stats Row */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <MetricCard
                        title="Health Score"
                        value={healthScoreData.current}
                        change={healthScoreData.change}
                        trend={healthScoreData.trend as "up" | "down" | "neutral"}
                        icon={<Heart className="h-4 w-4" />}
                        color="red"
                      />
                      <MetricCard
                        title="Recovery Index"
                        value={recoveryData.current}
                        suffix="%"
                        change={recoveryData.change}
                        trend={recoveryData.trend as "up" | "down" | "neutral"}
                        icon={<Zap className="h-4 w-4" />}
                        color="orange"
                      />
                      <MetricCard
                        title="Sleep Quality"
                        value={sleepData.current}
                        suffix="h"
                        change={sleepData.change}
                        trend={sleepData.trend as "up" | "down" | "neutral"}
                        icon={<Moon className="h-4 w-4" />}
                        color="blue"
                      />
                      <MetricCard
                        title="Vitamin D"
                        value={vitaminData.current}
                        suffix=" ng/mL"
                        change={vitaminData.change}
                        trend={vitaminData.trend as "up" | "down" | "neutral"}
                        icon={<Sun className="h-4 w-4" />}
                        color="yellow"
                        alert={vitaminData.alert}
                      />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid gap-6 md:grid-cols-6 lg:grid-cols-12">
                      {/* Health Score Gauge - 4 cols */}
                      <Card className="md:col-span-3 lg:col-span-4">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-medium">Health Score</CardTitle>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Set Goals</DropdownMenuItem>
                                <DropdownMenuItem>Export Data</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <CardDescription>Your overall health assessment</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-center py-4">
                            <HealthScoreGauge score={healthScoreData.current} />
                          </div>
                          <div className="mt-2 grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-xs text-muted-foreground">Physical</p>
                              <p className="text-sm font-medium">92/100</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Mental</p>
                              <p className="text-sm font-medium">85/100</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Metabolic</p>
                              <p className="text-sm font-medium">78/100</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Alerts - 4 cols */}
                      <Card className="md:col-span-3 lg:col-span-4">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-medium">Alerts & Insights</CardTitle>
                            <Badge variant="outline" className="gap-1">
                              <AlertCircle className="h-3 w-3 text-biomon-red" />
                              <span>{alertsData.length} New</span>
                            </Badge>
                          </div>
                          <CardDescription>Personalized health notifications</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <ScrollArea className="h-[280px]">
                            <div className="space-y-1 p-4">
                              {alertsData.map((alert, index) => (
                                <AlertCard key={index} alert={{...alert, type: alert.type as "info" | "warning" | "error" | "success"}} />
                              ))}
                            </div>
                          </ScrollArea>
                        </CardContent>
                        <CardFooter className="border-t bg-muted/50 px-4 py-2">
                          <Button variant="ghost" size="sm" className="w-full justify-between">
                            <span>View All Insights</span>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>

                      {/* 3D Health Model - 4 cols */}
                      <Card className="md:col-span-6 lg:col-span-4">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-medium">Body Composition</CardTitle>
                            <Tabs defaultValue="model" className="h-8">
                              <TabsList className="h-8 w-auto">
                                <TabsTrigger value="model" className="h-7 text-xs">
                                  3D Model
                                </TabsTrigger>
                                <TabsTrigger value="chart" className="h-7 text-xs">
                                  Chart
                                </TabsTrigger>
                              </TabsList>
                            </Tabs>
                          </div>
                          <CardDescription>Interactive visualization of your body metrics</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Tabs defaultValue="model" className="h-full">
                            <TabsContent value="model" className="mt-0 h-[280px]">
                              <div className="flex h-full items-center justify-center">
                                <HealthModel />
                              </div>
                            </TabsContent>
                            <TabsContent value="chart" className="mt-0 h-[280px]">
                              <div className="flex h-full items-center justify-center">
                                <BodyCompositionChart data={bodyCompositionData} />
                              </div>
                            </TabsContent>
                          </Tabs>
                        </CardContent>
                      </Card>

                      {/* Recovery Trend - 6 cols */}
                      <Card className="md:col-span-6 lg:col-span-6">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-medium">Recovery Trend</CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="gap-1 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              >
                                <TrendingUp className="h-3 w-3" />
                                <span>+5%</span>
                              </Badge>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <CardDescription>Recovery score and HRV correlation</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <RecoveryTrendChart data={recoveryData.history} />
                        </CardContent>
                      </Card>

                      {/* Vitamin Levels - 6 cols */}
                      <Card className="md:col-span-6 lg:col-span-6">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-medium">Vitamin & Mineral Levels</CardTitle>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                              <Clock className="h-3 w-3" />
                              <span className="text-xs">Last Test: 7 days ago</span>
                            </Button>
                          </div>
                          <CardDescription>Based on your latest blood work</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <VitaminLevelsChart data={vitaminData.levels.map(level => ({
                            ...level,
                            status: level.status as "deficient" | "optimal" | "low" | "high"
                          }))} />
                        </CardContent>
                      </Card>

                      {/* Sleep Quality - 6 cols */}
                      <Card className="md:col-span-6 lg:col-span-6">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-medium">Sleep Analysis</CardTitle>
                            <Tabs defaultValue="weekly" className="h-8">
                              <TabsList className="h-8 w-auto">
                                <TabsTrigger value="weekly" className="h-7 text-xs">
                                  Weekly
                                </TabsTrigger>
                                <TabsTrigger value="monthly" className="h-7 text-xs">
                                  Monthly
                                </TabsTrigger>
                              </TabsList>
                            </Tabs>
                          </div>
                          <CardDescription>Sleep stages and quality metrics</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <SleepQualityChart data={sleepData.history} />
                        </CardContent>
                      </Card>

                      {/* Nutrient Intake - 6 cols */}
                      <Card className="md:col-span-6 lg:col-span-6">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-medium">Nutrient Intake</CardTitle>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                              <Plus className="h-3 w-3" />
                              <span className="text-xs">Log Meal</span>
                            </Button>
                          </div>
                          <CardDescription>Macronutrient and calorie tracking</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <NutrientIntakeChart data={nutrientData} />
                        </CardContent>
                      </Card>

                      {/* Activity Heatmap - 6 cols */}
                      <Card className="md:col-span-6 lg:col-span-6">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-medium">Activity Patterns</CardTitle>
                            <Badge variant="outline" className="gap-1">
                              <Activity className="h-3 w-3 text-biomon-orange" />
                              <span>Active</span>
                            </Badge>
                          </div>
                          <CardDescription>Your movement patterns throughout the week</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ActivityHeatmap data={activityData} />
                        </CardContent>
                      </Card>

                      {/* Health Radar - 6 cols */}
                      <Card className="md:col-span-6 lg:col-span-6">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-medium">Health Dimensions</CardTitle>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Info className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs text-xs">
                                    This radar chart shows your performance across key health dimensions. Higher values
                                    indicate better performance.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <CardDescription>Multi-dimensional health assessment</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex h-[250px] items-center justify-center">
                            <HealthRadar data={radarData} width={300} height={250} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}

                {activeTab === "insights" && (
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold tracking-tight">Health Insights</h2>
                      <Button>Generate New Insights</Button>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {/* Placeholder for insights content */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Sleep Optimization</CardTitle>
                          <CardDescription>Based on your recent sleep patterns</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>
                            Your sleep efficiency has decreased by 12% in the last week. Consider these recommendations:
                          </p>
                          <ul className="mt-4 list-inside list-disc space-y-2">
                            <li>Maintain a consistent sleep schedule</li>
                            <li>Reduce screen time 1 hour before bed</li>
                            <li>Keep your bedroom temperature between 65-68°F</li>
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            View Detailed Analysis
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Nutrition Insights</CardTitle>
                          <CardDescription>Dietary patterns and recommendations</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>
                            Your protein intake is consistently below target. This may impact muscle recovery and energy
                            levels.
                          </p>
                          <ul className="mt-4 list-inside list-disc space-y-2">
                            <li>Aim for 0.8-1g of protein per pound of body weight</li>
                            <li>Consider adding more lean protein sources</li>
                            <li>Distribute protein intake throughout the day</li>
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            View Meal Suggestions
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Recovery Patterns</CardTitle>
                          <CardDescription>Training and recovery balance</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>
                            Your recovery metrics show signs of accumulated fatigue. Consider adjusting your training
                            schedule.
                          </p>
                          <ul className="mt-4 list-inside list-disc space-y-2">
                            <li>Reduce high-intensity training by 20% next week</li>
                            <li>Increase focus on mobility and flexibility</li>
                            <li>Consider adding an additional rest day</li>
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            View Recovery Plan
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                )}

                {activeTab === "labs" &&
                  (
                    <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold tracking-tight">Lab Results</h2>
                      <Button>Upload New Results</Button>
                    </div>
                    <div className="grid gap-6">
                      {/* Placeholder for labs content */}
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle>Recent Lab Tests</CardTitle>
                            <Badge>Last Updated: 7 days ago</Badge>
                          </div>
                          <CardDescription>Track and analyze your lab test results over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4 rounded-lg border p-4">
                              <div>
                                <h4 className="text-sm font-medium">Vitamin D</h4>
                                <p className="text-2xl font-bold text-red-500">28 ng/mL</p>
                                <p className="text-xs text-muted-foreground">Reference: 30-100 ng/mL</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Vitamin B12</h4>
                                <p className="text-2xl font-bold text-green-500">780 pg/mL</p>
                                <p className="text-xs text-muted-foreground">Reference: 200-900 pg/mL</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Iron</h4>
                                <p className="text-2xl font-bold text-yellow-500">65 μg/dL</p>
                                <p className="text-xs text-muted-foreground">Reference: 60-170 μg/dL</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 rounded-lg border p-4">
                              <div>
                                <h4 className="text-sm font-medium">Glucose (Fasting)</h4>
                                <p className="text-2xl font-bold text-yellow-500">105 mg/dL</p>
                                <p className="text-xs text-muted-foreground">Reference: 70-99 mg/dL</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Total Cholesterol</h4>
                                <p className="text-2xl font-bold text-green-500">175 mg/dL</p>
                                <p className="text-xs text-muted-foreground">Reference: &lt;200 mg/dL</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">HDL Cholesterol</h4>
                                <p className="text-2xl font-bold text-green-500">62 mg/dL</p>
                                <p className="text-xs text-muted-foreground">Reference: &gt;40 mg/dL</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">View Complete Lab History</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                  )}

                {activeTab === "wearables" && (
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold tracking-tight">Connected Devices</h2>
                      <Button>Connect New Device</Button>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {/* Placeholder for wearables content */}
                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <Image
                              src="/placeholder.svg?height=40&width=40"
                              alt="Apple Watch"
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div>
                              <CardTitle>Apple Watch</CardTitle>
                              <CardDescription>Last synced: 2 hours ago</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Heart Rate</span>
                              <span className="font-medium">68 bpm</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Steps</span>
                              <span className="font-medium">8,742</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Active Calories</span>
                              <span className="font-medium">342 kcal</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">
                            Sync Now
                          </Button>
                          <Button variant="ghost" size="sm">
                            Settings
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <Image
                              src="/placeholder.svg?height=40&width=40"
                              alt="Oura Ring"
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div>
                              <CardTitle>Oura Ring</CardTitle>
                              <CardDescription>Last synced: 6 hours ago</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Sleep Score</span>
                              <span className="font-medium">87/100</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Readiness</span>
                              <span className="font-medium">92/100</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">HRV</span>
                              <span className="font-medium">68 ms</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">
                            Sync Now
                          </Button>
                          <Button variant="ghost" size="sm">
                            Settings
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <Image
                              src="/placeholder.svg?height=40&width=40"
                              alt="Withings Scale"
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div>
                              <CardTitle>Withings Scale</CardTitle>
                              <CardDescription>Last synced: 2 days ago</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Weight</span>
                              <span className="font-medium">172.4 lbs</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Body Fat</span>
                              <span className="font-medium">18.2%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Muscle Mass</span>
                              <span className="font-medium">134.6 lbs</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">
                            Sync Now
                          </Button>
                          <Button variant="ghost" size="sm">
                            Settings
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                )}

                {activeTab === "coaching" && (
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold tracking-tight">Coaching & Support</h2>
                      <Button>Schedule Session</Button>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {/* Placeholder for coaching content */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Your Coach</CardTitle>
                          <CardDescription>Personal health advisor</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col items-center text-center">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Coach" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h3 className="mt-4 text-lg font-medium">Dr. Sarah Chen</h3>
                            <p className="text-sm text-muted-foreground">Nutrition & Recovery Specialist</p>
                            <div className="mt-4 flex gap-2">
                              <Button variant="outline" size="sm">
                                Message
                              </Button>
                              <Button size="sm">Book Session</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Upcoming Sessions</CardTitle>
                          <CardDescription>Your scheduled coaching calls</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="rounded-lg border p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">Recovery Strategy Review</h4>
                                  <p className="text-sm text-muted-foreground">With Dr. Sarah Chen</p>
                                </div>
                                <Badge>Tomorrow</Badge>
                              </div>
                              <p className="mt-2 text-sm">10:00 AM - 10:45 AM</p>
                            </div>

                            <div className="rounded-lg border p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">Nutrition Plan Update</h4>
                                  <p className="text-sm text-muted-foreground">With Michael Rodriguez</p>
                                </div>
                                <Badge variant="outline">Next Week</Badge>
                              </div>
                              <p className="mt-2 text-sm">Wednesday, 2:30 PM</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            View All Sessions
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Health Goals</CardTitle>
                          <CardDescription>Track your progress</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm font-medium">Improve Sleep Quality</span>
                                <span className="text-sm text-muted-foreground">75%</span>
                              </div>
                              <Progress value={75} className="h-2" />
                            </div>

                            <div>
                              <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm font-medium">Increase Vitamin D Levels</span>
                                <span className="text-sm text-muted-foreground">40%</span>
                              </div>
                              <Progress value={40} className="h-2" />
                            </div>

                            <div>
                              <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm font-medium">Reduce Stress Levels</span>
                                <span className="text-sm text-muted-foreground">60%</span>
                              </div>
                              <Progress value={60} className="h-2" />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            Set New Goal
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </DashboardShell>
        </main>
      </div>
    </div>
  )
}
