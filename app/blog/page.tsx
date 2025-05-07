"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Clock, Search, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Blog posts data
const posts = [
  {
    id: 1,
    title: "5 Lab Metrics That Actually Matter",
    excerpt:
      "Not all lab tests are created equal. Learn which biomarkers provide the most actionable insights for your health optimization journey.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Labs",
    author: "Dr. Sarah Chen",
    date: "May 7, 2023",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "How Your Sleep Impacts Metabolism",
    excerpt:
      "The surprising connection between sleep quality and metabolic health. Discover how improving your sleep can boost your energy and help manage weight.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Sleep",
    author: "Michael Rodriguez",
    date: "April 22, 2023",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "AI in Biohacking: What to Expect Next",
    excerpt:
      "Artificial intelligence is revolutionizing personal health optimization. Here's how AI will transform the future of biohacking and wellness.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Technology",
    author: "Alex Johnson",
    date: "April 15, 2023",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "The HRV Revolution: Beyond Recovery",
    excerpt:
      "Heart rate variability isn't just for tracking recovery. Learn how this powerful metric can provide insights into stress, aging, and overall health.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Wearables",
    author: "Dr. Sarah Chen",
    date: "April 8, 2023",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Nutrition Tracking: Beyond Calories",
    excerpt:
      "Modern nutrition is about more than just counting calories. Discover how tracking micronutrients and meal timing can optimize your performance.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Nutrition",
    author: "Michael Rodriguez",
    date: "March 30, 2023",
    readTime: "9 min read",
  },
  {
    id: 6,
    title: "The Future of Personalized Health",
    excerpt:
      "How advances in wearable technology, genomics, and AI are creating truly personalized health recommendations and interventions.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Future",
    author: "Alex Johnson",
    date: "March 22, 2023",
    readTime: "11 min read",
  },
]

// Categories
const categories = ["All", "Labs", "Sleep", "Technology", "Wearables", "Nutrition", "Future"]

export default function Blog() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 bg-grid-gray-100/40 bg-[size:20px_20px] dark:bg-grid-gray-950/40"></div>
        <div className="container relative z-10 px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Biomon <span className="gradient-text">Insights</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">
                Expert articles, research, and guides to help you optimize your health with data-driven approaches.
              </p>
              <div className="mt-8 flex max-w-md mx-auto">
                <Input type="text" placeholder="Search articles..." className="rounded-r-none" />
                <Button className="rounded-l-none gradient-bg">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="section-spacing">
        <div className="container px-4">
          <Tabs defaultValue="All" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-flow-col auto-cols-max gap-2">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="px-4">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <TabsContent value="All" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="animate-on-scroll"
                  >
                    <Card className="h-full overflow-hidden card-hover">
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">{post.category}</span>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                        <CardDescription className="flex items-center text-xs mt-2">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                          <span className="mx-2">•</span>
                          <Calendar className="h-3 w-3 mr-1" />
                          {post.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="ghost" className="p-0 h-auto" asChild>
                          <Link href="#" className="inline-flex items-center text-sm font-medium">
                            Read More <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            {categories.slice(1).map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {posts
                    .filter((post) => post.category === category)
                    .map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="animate-on-scroll"
                      >
                        <Card className="h-full overflow-hidden card-hover">
                          <div className="aspect-video overflow-hidden">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              width={600}
                              height={400}
                              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                          <CardHeader className="p-4 pb-2">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
                                {post.category}
                              </span>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {post.readTime}
                              </div>
                            </div>
                            <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                            <CardDescription className="flex items-center text-xs mt-2">
                              <User className="h-3 w-3 mr-1" />
                              {post.author}
                              <span className="mx-2">•</span>
                              <Calendar className="h-3 w-3 mr-1" />
                              {post.date}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                          </CardContent>
                          <CardFooter className="p-4 pt-0">
                            <Button variant="ghost" className="p-0 h-auto" asChild>
                              <Link href="#" className="inline-flex items-center text-sm font-medium">
                                Read More <ArrowRight className="ml-1 h-4 w-4" />
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-spacing bg-muted/30">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Stay Updated</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Subscribe to our newsletter for the latest articles, research, and health optimization tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Input type="email" placeholder="Enter your email" className="max-w-xs" />
              <Button className="gradient-bg">Subscribe</Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
