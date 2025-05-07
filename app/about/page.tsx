"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowRight, Brain, Heart, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Team members data
const team = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Former health tech executive with a passion for preventative health and data science.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Dr. Sarah Chen",
    role: "Chief Medical Officer",
    bio: "Board-certified physician specializing in preventative medicine and health optimization.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Michael Rodriguez",
    role: "CTO",
    bio: "AI researcher and engineer with expertise in machine learning for health applications.",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 bg-grid-gray-100/40 bg-[size:20px_20px] dark:bg-grid-gray-950/40"></div>
        <div className="container relative z-10 px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Our <span className="gradient-text">Mission</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">
                We're building a world where everyone has a "check engine light" for their body — making proactive
                health mainstream.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-spacing bg-muted/30">
        <div className="container px-4">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="animate-on-scroll"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Vision</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Biomon envisions a future where health optimization is accessible to everyone, not just elite athletes
                and biohackers. We believe that by unifying health data and providing actionable insights, we can help
                people take control of their health and live longer, more vibrant lives.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-biomon-red/10 p-2">
                    <Heart className="h-5 w-5 text-biomon-red" />
                  </div>
                  <div>
                    <h3 className="font-medium">Proactive Health</h3>
                    <p className="text-muted-foreground">
                      Shifting from reactive healthcare to proactive health optimization.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-biomon-orange/10 p-2">
                    <Brain className="h-5 w-5 text-biomon-orange" />
                  </div>
                  <div>
                    <h3 className="font-medium">Data-Driven Insights</h3>
                    <p className="text-muted-foreground">
                      Using AI to transform complex health data into simple, actionable guidance.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-biomon-red/10 p-2">
                    <Shield className="h-5 w-5 text-biomon-red" />
                  </div>
                  <div>
                    <h3 className="font-medium">Privacy-First Approach</h3>
                    <p className="text-muted-foreground">
                      Ensuring users maintain complete ownership and control of their health data.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative animate-on-scroll"
            >
              <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-biomon-red/20 to-biomon-orange/20 opacity-50"></div>
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Biomon Vision"
                  width={800}
                  height={600}
                  className="relative z-10 rounded-lg"
                />
              </div>
              <div className="absolute -right-4 -top-4 z-[-1] h-40 w-40 rounded-full bg-biomon-orange/20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 z-[-1] h-40 w-40 rounded-full bg-biomon-red/20 blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-spacing">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're a passionate group of health enthusiasts, data scientists, and medical professionals dedicated to
              revolutionizing personal health.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="animate-on-scroll"
              >
                <Card className="overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              <Card className="text-center">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-4xl font-bold text-biomon-red">1,000+</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-muted-foreground">Waitlist Signups</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="animate-on-scroll"
            >
              <Card className="text-center">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-4xl font-bold text-biomon-orange">5</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-muted-foreground">Pilot Gyms & Health Clubs</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="animate-on-scroll"
            >
              <Card className="text-center">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-4xl font-bold text-biomon-red">3</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-muted-foreground">Health Tech Partnerships</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Join Us on Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Be part of the health revolution. Join our beta program today and help shape the future of personal health
              intelligence.
            </p>
            <Button asChild size="lg" className="gradient-bg">
              <Link href="/" className="inline-flex items-center gap-2">
                Join the Beta <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
