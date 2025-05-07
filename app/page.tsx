"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Activity, AlertCircle, ArrowRight, Brain, ChevronRight, Shield, Zap, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { ParticleField } from "@/components/animations/particle-field"
import { AnimatedCounter } from "@/components/animations/animated-counter"

// Device icons
const deviceIcons = [
  { name: "Apple Watch", icon: "/placeholder.svg?height=40&width=40" },
  { name: "Fitbit", icon: "/placeholder.svg?height=40&width=40" },
  { name: "Oura Ring", icon: "/placeholder.svg?height=40&width=40" },
  { name: "Garmin", icon: "/placeholder.svg?height=40&width=40" },
  { name: "Whoop", icon: "/placeholder.svg?height=40&width=40" },
]

// Features data
const features = [
  {
    icon: <Activity className="h-10 w-10 text-biomon-red" />,
    title: "360° Health Dashboard",
    description: "View all your health metrics in one place with smart visualizations and trend analysis.",
  },
  {
    icon: <Brain className="h-10 w-10 text-biomon-orange" />,
    title: "AI-Powered Recommendations",
    description: "Get personalized health insights based on your unique data patterns and goals.",
  },
  {
    icon: <AlertCircle className="h-10 w-10 text-biomon-red" />,
    title: "Trend Alerts & Daily Nudges",
    description: "Receive proactive notifications when your metrics need attention or optimization.",
  },
  {
    icon: <Zap className="h-10 w-10 text-biomon-orange" />,
    title: "Smart Coaching & Community",
    description: "Connect with health experts and like-minded individuals for support and motivation.",
  },
  {
    icon: <Shield className="h-10 w-10 text-biomon-red" />,
    title: "Privacy & Ownership",
    description: "HIPAA-compliant platform that gives you full control of your health data.",
  },
]

// How it works steps
const steps = [
  {
    number: "01",
    title: "Connect Devices & Upload Labs",
    description: "Link your wearables and import your lab results with a few clicks.",
  },
  {
    number: "02",
    title: "Get Your Health Score",
    description: "Receive a comprehensive assessment of your current health status.",
  },
  {
    number: "03",
    title: "Receive Personalized Tips",
    description: "Get actionable recommendations tailored to your unique health profile.",
  },
  {
    number: "04",
    title: "Track Progress with Smart Charts",
    description: "Monitor your improvements over time with intuitive visualizations.",
  },
]

// Testimonials
const testimonials = [
  {
    quote:
      "Biomon completely changed my workouts. I found my iron was low during training weeks – something I'd never have caught without this app.",
    author: "Alex P.",
    role: "Triathlete",
  },
  {
    quote:
      "As someone who tracks everything, Biomon finally connected all my data in one place. The alerts caught my rising cortisol levels before I burned out.",
    author: "Sarah M.",
    role: "Tech Executive",
  },
  {
    quote:
      "The correlation between my sleep quality and recovery metrics has been eye-opening. Biomon's insights helped me optimize my training schedule.",
    author: "Michael K.",
    role: "CrossFit Coach",
  },
]

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [animateOnScroll, setAnimateOnScroll] = useState<NodeListOf<Element> | null>(null)

  useEffect(() => {
    // Testimonial rotation
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    // Animation on scroll
    const elements = document.querySelectorAll(".animate-on-scroll")
    setAnimateOnScroll(elements)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (elements.length > 0) {
      elements.forEach((el) => observer.observe(el))
    }

    return () => {
      clearInterval(interval)
      if (elements.length > 0) {
        elements.forEach((el) => observer.unobserve(el))
      }
    }
  }, [testimonials.length]) // Add testimonials.length as a dependency

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-16 lg:py-20">
        <ParticleField />
        <div className="container relative z-10 px-4">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <Badge className="w-fit bg-biomon-pink text-white">Now in Beta</Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Optimize Your Health with <span className="gradient-text">Data-Driven Insights</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                All your fitness metrics, labs, and health data – unified in one platform that tells you what your body
                needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <AnimatedButton variant="gradient" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                  Join the Biomon Beta – Get 3 Months Free
                </AnimatedButton>
                <AnimatedButton variant="outline" size="lg" icon={<Eye className="h-4 w-4" />}>
                  See the Dashboard
                </AnimatedButton>
              </div>
              <div className="flex flex-wrap gap-4 mt-4 items-center">
                <span className="text-sm font-medium">Compatible with:</span>
                {deviceIcons.map((device, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Image
                      src={device.icon || "/placeholder.svg"}
                      alt={device.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-xs">{device.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <AnimatedCard className="overflow-hidden rounded-xl border bg-background shadow-xl" borderGradient>
                <div className="absolute inset-0 bg-gradient-to-br from-biomon-red/20 via-biomon-pink/20 to-biomon-orange/20 opacity-50"></div>
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Biomon Dashboard"
                  width={800}
                  height={600}
                  className="relative z-10 rounded-lg"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20 rounded-lg bg-background/80 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Health Score</h3>
                      <p className="text-2xl font-bold text-biomon-red">87/100</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Sleep</p>
                        <p className="font-medium">8.2h</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Recovery</p>
                        <p className="font-medium">92%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">HRV</p>
                        <p className="font-medium">68ms</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
              <div className="absolute -right-4 -top-4 z-[-1] h-40 w-40 rounded-full bg-biomon-orange/20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 z-[-1] h-40 w-40 rounded-full bg-biomon-pink/20 blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Key Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Biomon brings together all your health data to provide actionable insights and personalized
              recommendations.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover animate-on-scroll">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-spacing">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started with Biomon is easy. Follow these simple steps to begin your health optimization journey.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative animate-on-scroll">
                {index < steps.length - 1 && (
                  <div className="absolute hidden md:block top-8 left-full w-full h-0.5 bg-gradient-to-r from-biomon-red to-biomon-orange transform -translate-x-1/2 z-0"></div>
                )}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-biomon-red to-biomon-orange text-white text-xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="section-spacing bg-muted/30">
        <div className="container px-4">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Your Complete Health Dashboard</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Biomon's intuitive dashboard gives you a comprehensive view of your health metrics, making it easy to
                track your progress and identify areas for improvement.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-biomon-red flex-shrink-0 mt-0.5" />
                  <span>Track all your vital health metrics in one place</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-biomon-red flex-shrink-0 mt-0.5" />
                  <span>Visualize trends and correlations between different data points</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-biomon-red flex-shrink-0 mt-0.5" />
                  <span>Receive personalized alerts and recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-biomon-red flex-shrink-0 mt-0.5" />
                  <span>Set goals and monitor your progress over time</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/dashboard-preview" className="inline-flex items-center gap-2">
                    Explore Dashboard <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-on-scroll">
              <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Biomon Dashboard Preview"
                  width={800}
                  height={600}
                  className="relative z-10 rounded-lg"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20 rounded-lg bg-background/80 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-biomon-red">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm font-medium">
                      Alert: Your fasting glucose is trending high – here's what to do.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -top-4 z-[-1] h-40 w-40 rounded-full bg-biomon-orange/20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 z-[-1] h-40 w-40 rounded-full bg-biomon-red/20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-spacing">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from people who have transformed their health with Biomon.
            </p>
          </div>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-biomon-red/10 blur-xl"></div>
            <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-biomon-orange/10 blur-xl"></div>
            <Card className="relative z-10 overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-4 text-4xl text-biomon-red">"</div>
                <Tabs defaultValue="0" value={activeTestimonial.toString()} className="w-full">
                  {testimonials.map((testimonial, index) => (
                    <TabsContent
                      key={index}
                      value={index.toString()}
                      className="mt-0 data-[state=active]:animate-fade-in"
                    >
                      <blockquote className="space-y-4">
                        <p className="text-lg">{testimonial.quote}</p>
                        <footer className="flex items-center gap-4 pt-4 border-t">
                          <div className="rounded-full bg-muted h-12 w-12 flex items-center justify-center">
                            <span className="text-xl font-bold">{testimonial.author.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </footer>
                      </blockquote>
                    </TabsContent>
                  ))}
                  <div className="mt-6 flex justify-center gap-2">
                    <TabsList>
                      {testimonials.map((_, index) => (
                        <TabsTrigger
                          key={index}
                          value={index.toString()}
                          className="h-2 w-2 rounded-full p-0 data-[state=active]:bg-biomon-red"
                          onClick={() => setActiveTestimonial(index)}
                        />
                      ))}
                    </TabsList>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-muted/30">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Optimize Your Health?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the Biomon beta today and get 3 months free access to all premium features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Input type="email" placeholder="Enter your email" className="max-w-xs" />
              <Button className="gradient-bg">Join the Beta</Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link href="#" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Traction Section */}
      <section className="section-spacing bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Traction</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're just getting started, but we're already making waves in the health optimization space.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="animate-on-scroll"
            >
              <AnimatedCard className="text-center p-6">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-4xl font-bold text-biomon-pink">
                    <AnimatedCounter value={1000} suffix="+" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-muted-foreground">Waitlist Signups</p>
                </CardContent>
              </AnimatedCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="animate-on-scroll"
            >
              <AnimatedCard className="text-center p-6">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-4xl font-bold text-biomon-orange">
                    <AnimatedCounter value={5} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-muted-foreground">Pilot Gyms & Health Clubs</p>
                </CardContent>
              </AnimatedCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="animate-on-scroll"
            >
              <AnimatedCard className="text-center p-6">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-4xl font-bold text-biomon-red">
                    <AnimatedCounter value={3} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-muted-foreground">Health Tech Partnerships</p>
                </CardContent>
              </AnimatedCard>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
