"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const features: { title: string; href: string; description: string }[] = [
  {
    title: "360° Health Dashboard",
    href: "/dashboard-preview",
    description: "View all your health metrics in one place with smart visualizations.",
  },
  {
    title: "AI-Powered Recommendations",
    href: "/dashboard-preview",
    description: "Get personalized health insights based on your unique data patterns.",
  },
  {
    title: "Trend Alerts & Daily Nudges",
    href: "/dashboard-preview",
    description: "Receive proactive notifications when your metrics need attention.",
  },
  {
    title: "Smart Coaching & Community",
    href: "/dashboard-preview",
    description: "Connect with health experts and like-minded individuals.",
  },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-biomon-red to-biomon-orange bg-clip-text text-transparent">
              Biomon
            </span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {features.map((feature) => (
                      <ListItem key={feature.title} title={feature.title} href={feature.href}>
                        {feature.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/dashboard-preview" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Blog</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button className="hidden md:flex gradient-bg">Join Beta</Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-left">Biomon</SheetTitle>
                <SheetDescription className="text-left">Personal Health Intelligence Platform</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Link href="/dashboard-preview" className="text-sm font-medium leading-none py-3 hover:underline">
                  Dashboard
                </Link>
                <Link href="/about" className="text-sm font-medium leading-none py-3 hover:underline">
                  About
                </Link>
                <Link href="/blog" className="text-sm font-medium leading-none py-3 hover:underline">
                  Blog
                </Link>
                <Link href="/contact" className="text-sm font-medium leading-none py-3 hover:underline">
                  Contact
                </Link>
                <Button className="w-full gradient-bg">Join Beta</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
