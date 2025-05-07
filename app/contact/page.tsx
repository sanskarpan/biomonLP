"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

// FAQ data
const faqs = [
  {
    question: "What devices does Biomon support?",
    answer:
      "Biomon supports a wide range of wearable devices including Apple Watch, Fitbit, Oura Ring, Garmin, Whoop, and more. We're constantly adding support for new devices.",
  },
  {
    question: "How secure is my health data?",
    answer:
      "Your privacy is our top priority. Biomon is HIPAA-compliant and uses bank-level encryption to protect your data. You maintain full ownership and control of your health information at all times.",
  },
  {
    question: "Can I import my lab results?",
    answer:
      "Yes! Biomon supports manual entry of lab results as well as direct imports from major lab providers. We can analyze and track trends in your bloodwork and other diagnostic tests.",
  },
]

export default function Contact() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 bg-grid-gray-100/40 bg-[size:20px_20px] dark:bg-grid-gray-950/40"></div>
        <div className="container relative z-10 px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Get in <span className="gradient-text">Touch</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">
                Have questions about Biomon? We're here to help. Reach out to our team for support, partnership
                inquiries, or feedback.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-spacing">
        <div className="container px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="animate-on-scroll"
            >
              <Card>
                <CardHeader className="p-6">
                  <CardTitle>Contact Us</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <form className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" placeholder="Enter your first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Enter your last name" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Enter the subject" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Enter your message" className="min-h-32" />
                    </div>
                    <Button type="submit" className="w-full gradient-bg">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="animate-on-scroll"
              >
                <Card>
                  <CardHeader className="p-6">
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Reach out to us directly through these channels.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-biomon-red/10 p-2">
                          <Mail className="h-5 w-5 text-biomon-red" />
                        </div>
                        <div>
                          <h3 className="font-medium">Email</h3>
                          <p className="text-muted-foreground">info@biomon.ai</p>
                          <p className="text-muted-foreground">support@biomon.ai</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-biomon-orange/10 p-2">
                          <Phone className="h-5 w-5 text-biomon-orange" />
                        </div>
                        <div>
                          <h3 className="font-medium">Phone</h3>
                          <p className="text-muted-foreground">+1 (555) 123-4567</p>
                          <p className="text-muted-foreground">Mon-Fri, 9am-5pm PST</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-biomon-red/10 p-2">
                          <MapPin className="h-5 w-5 text-biomon-red" />
                        </div>
                        <div>
                          <h3 className="font-medium">Office</h3>
                          <p className="text-muted-foreground">123 Health Tech Drive</p>
                          <p className="text-muted-foreground">San Francisco, CA 94107</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="animate-on-scroll"
              >
                <Card>
                  <CardHeader className="p-6">
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Quick answers to common questions about Biomon.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-spacing bg-muted/30">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Visit Us</h2>
            <p className="text-lg text-muted-foreground">
              We're located in the heart of San Francisco's tech district.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border bg-background shadow-xl">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.95397618613!2d-122.43913217832036!3d37.77710275895104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Optimize Your Health?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the Biomon beta today and start your journey to better health.
            </p>
            <Button asChild size="lg" className="gradient-bg">
              <Link href="/">Join the Beta</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
