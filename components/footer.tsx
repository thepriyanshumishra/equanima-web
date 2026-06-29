"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Send, Sparkles } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export function Footer() {
  const pathname = usePathname()
  const { toast } = useToast()
  const [email, setEmail] = useState("")

  const toolPaths = ["/dashboard", "/mood-tracker", "/tests", "/profile"]
  const shouldHide = toolPaths.some((p) => pathname.startsWith(p))

  if (shouldHide) return null

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    toast({
      title: "Subscribed Successfully",
      description: "You've been added to our wellness newsletter catalog.",
    })
    setEmail("")
  }

  return (
    <footer className="glass border-t border-white/20 mt-auto relative overflow-hidden bg-gradient-to-t from-background to-transparent pt-16 pb-12">
      <div className="absolute left-[10%] bottom-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute right-[10%] top-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Equanima
              </span>
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed text-pretty">
              Empowering your wellness journey through clinical tracking, supportive community connects, and secure empathetic AI prompts.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Link href="https://github.com/thepriyanshumishra" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-lg glass border border-white/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:scale-105 transition-all">
                <Github className="h-4 w-4" />
              </Link>
              <Link href="https://www.linkedin.com/in/thepriyanshumishra/" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-lg glass border border-white/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:scale-105 transition-all">
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link href="mailto:thedarkpcm@gmail.com" className="h-8 w-8 rounded-lg glass border border-white/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:scale-105 transition-all">
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Product Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Product</h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <Link href="/mood-tracker" className="hover:text-primary transition-colors">
                  Mood Tracker
                </Link>
              </li>
              <li>
                <Link href="/tests" className="hover:text-primary transition-colors">
                  Screening Assessments
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  MitraAI Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Support */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About the Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Sign-up */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Newsletter</h4>
            <p className="text-xs text-muted-foreground leading-relaxed text-pretty">
              Get monthly wellness advice, tips, and updates directly in your mailbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass border-white/20 dark:border-white/8 h-9 text-xs rounded-xl focus-visible:ring-primary focus-visible:ring-1"
                required
              />
              <Button type="submit" size="sm" className="h-9 px-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl">
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </div>

        </div>

        {/* Divider */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-semibold">
          <p>© 2026 Equanima. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
