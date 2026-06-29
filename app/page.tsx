"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, BarChart3, ArrowRight, Sparkles, Users, Star, Quote, ChevronRight, MessageSquare, Zap, Heart, Shield } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Brain,
    title: "Mood Tracking",
    description: "Track your daily emotions, triggers, and sleep patterns with our gorgeous interactive mood tracker.",
    accentClass: "accent-top-teal",
    shadowClass: "shadow-glow-teal",
    color: "text-teal-500",
    href: "/mood-tracker",
  },
  {
    icon: BarChart3,
    title: "Mental Health Tests",
    description: "Take clinically validated assessments like PHQ-9 and GAD-7 to gain deep insights into your state.",
    accentClass: "accent-top-blue",
    shadowClass: "shadow-glow-blue",
    color: "text-blue-500",
    href: "/tests",
  },
  {
    icon: Sparkles,
    title: "MitraAI Chat",
    description: "Obtain warm, 24/7 empathetic support from our AI wellness guide trained in supportive counseling.",
    accentClass: "accent-top-amber",
    shadowClass: "shadow-glow-amber",
    color: "text-amber-500",
    href: "/dashboard",
  },
]

const testimonials = [
  {
    text: "Equanima has completely changed how I monitor my stress. The mood logs showed me exactly when I needed to slow down.",
    author: "Sarah M.",
    role: "Student",
    rating: 5,
  },
  {
    text: "MitraAI feels like a trusted friend available at 2 AM. Its grounding advice is incredibly calming during stressful weeks.",
    author: "David L.",
    role: "Software Professional",
    rating: 5,
  },
  {
    text: "The clinical assessments helped me identify my anxiety trends and take actionable steps with my therapist.",
    author: "Maya P.",
    role: "Graduate Scholar",
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen space-y-28 pb-24 px-4 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 animate-fade-in-down">
        
        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-foreground text-balance">
          Your Mind's Space for
          <span className="block mt-2 bg-gradient-to-r from-teal-500 via-primary to-indigo-500 dark:from-teal-400 dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
            Equanimity
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-muted-foreground text-pretty max-w-xl mx-auto leading-relaxed">
          Log daily moods, complete validated mental health screenings, and obtain supportive, empathetic answers from MitraAI.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-sm pt-2">
          <Button
            asChild
            size="lg"
            className="flex-1 py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-95 hover:scale-[1.03] transition-all text-white font-bold rounded-xl shadow-md hover:shadow-lg h-12 text-xs"
          >
            <Link href="/dashboard">
              Get Started <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="lg"
            className="flex-1 py-6 glass border-white/25 dark:border-white/8 text-foreground font-bold rounded-xl hover:scale-[1.03] h-12 bg-transparent text-xs"
          >
            <Link href="/about">Explore Mission</Link>
          </Button>
        </div>

        {/* Interactive App Preview Mock Dashboard */}
        <div className="w-full max-w-3xl pt-8">
          <div className="glass border border-white/25 dark:border-white/8 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-6 text-left">
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Left Part of Mock: Dashboard Metrics */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-1.5 pb-2 border-b border-white/10">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Live Session Statistics</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/10 dark:bg-black/25 border border-white/10 dark:border-white/5 space-y-1">
                  <span className="text-[9px] uppercase font-bold text-muted-foreground">Sleep Index</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-foreground">8.2</span>
                    <span className="text-[10px] text-muted-foreground">hours</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/10 dark:bg-black/25 border border-white/10 dark:border-white/5 space-y-1">
                  <span className="text-[9px] uppercase font-bold text-muted-foreground">Energy level</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-teal-500">7.5</span>
                    <span className="text-[10px] text-muted-foreground">/10</span>
                  </div>
                </div>
              </div>

              {/* Mock Mood log bubble */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/15 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">😌</span>
                  <div>
                    <p className="font-bold text-xs">Logged: Calm State</p>
                    <p className="text-[9px] text-muted-foreground">"Felt positive and focused today."</p>
                  </div>
                </div>
                <Badge className="bg-primary/20 text-primary border border-primary/20 text-[9px] rounded-full">
                  Verified Log
                </Badge>
              </div>
            </div>

            {/* Right Part of Mock: Chat bubble */}
            <div className="flex-1 flex flex-col justify-between p-4 rounded-2xl bg-white/10 dark:bg-black/30 border border-white/15 dark:border-white/5 min-h-[160px] space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-white/5 text-[10px] font-bold text-muted-foreground">
                <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5 text-primary" /> MITRAAI ASSISTANT</span>
                <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">Active</span>
              </div>
              
              <div className="space-y-3 flex-1 flex flex-col justify-center">
                <div className="bg-primary/10 p-2.5 rounded-xl rounded-tl-none border border-primary/15 text-[11px] text-foreground leading-relaxed text-pretty">
                  "Take a slow breath. Try to focus on three things you can hear right now to ground yourself."
                </div>
                <div className="bg-secondary/20 p-2.5 rounded-xl rounded-tr-none border border-white/10 text-[11px] text-muted-foreground leading-relaxed self-end w-4/5 text-right">
                  "That helped a lot, thank you."
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto space-y-16 animate-fade-in-up">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Integrated Wellness Ecosystem
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-xs sm:text-sm">
            Professional tools combined with empathetic design to support your mental health journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link href={feature.href} key={index} className="block group">
              <Card className={`glass-card rounded-2xl h-full flex flex-col justify-between p-6 space-y-6 relative overflow-hidden ${feature.accentClass}`}>
                
                <div className="space-y-4">
                  {/* Icon bubble */}
                  <div className={`h-11 w-11 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/5 flex items-center justify-center ${feature.color} ${feature.shadowClass} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-bold text-primary group-hover:translate-x-1 transition-transform pt-2">
                  Launch Tool <ChevronRight className="h-3 w-3" />
                </div>

              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-5xl mx-auto space-y-16 animate-fade-in-up">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight">Real Journeys of Growth</h2>
          <p className="text-muted-foreground text-xs">Hear from community members who use Equanima daily</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((test, index) => (
            <Card key={index} className="glass-card border-white/25 dark:border-white/8 p-6 flex flex-col justify-between space-y-6 relative rounded-2xl">
              <Quote className="absolute right-6 top-6 h-7 w-7 text-primary/10" />
              
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: test.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <CardContent className="p-0">
                <p className="text-xs italic text-muted-foreground leading-relaxed text-pretty">
                  "{test.text}"
                </p>
              </CardContent>

              <div className="space-y-0.5 border-t border-white/10 pt-3">
                <p className="font-bold text-xs text-foreground">{test.author}</p>
                <p className="text-[10px] text-muted-foreground">{test.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto animate-fade-in-up">
        <Card className="glass-strong border-white/35 dark:border-white/10 p-8 sm:p-12 relative overflow-hidden shadow-2xl rounded-3xl text-center">
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-primary/10 blur-[80px]" />
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-secondary/15 blur-[80px]" />
          
          <div className="relative space-y-6 max-w-md mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Practice Equanimity?
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Join thousands of users who track progress, understand triggers, and secure supportive peer circles.
            </p>
            <Button
              asChild
              size="lg"
              className="py-5 px-6 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:scale-105 transition-all animate-pulse-glow text-xs"
            >
              <Link href="/auth">
                Create Account <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </section>

    </div>
  )
}
