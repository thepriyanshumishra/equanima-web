"use client"

import { Brain, BarChart3, User, ClipboardList, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/contexts/auth-context"

const navItems = [
  { href: "/dashboard", icon: BarChart3, label: "Dashboard" },
  { href: "/mood-tracker", icon: Brain, label: "Mood" },
  { href: "/tests", icon: ClipboardList, label: "Tests" },
  { href: "/profile", icon: User, label: "Profile" },
]

export function BottomNavigation() {
  const pathname = usePathname()
  const { user } = useAuth()

  const toolPaths = ["/dashboard", "/mood-tracker", "/tests", "/profile"]
  const shouldShow = user && toolPaths.some((p) => pathname.startsWith(p))

  if (!shouldShow) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200",
                "hover:bg-primary/10 hover:scale-105",
                isActive ? "text-primary bg-primary/10 scale-105" : "text-foreground/70 hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
