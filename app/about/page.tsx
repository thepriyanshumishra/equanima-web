"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Shield, Target } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "We believe mental health support should be accessible, understanding, and judgment-free.",
    gradient: "from-pink-400 to-red-400",
    accentClass: "accent-top-teal",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your mental health data is sacred. We use secure sandboxes and never share personal information.",
    gradient: "from-blue-400 to-indigo-400",
    accentClass: "accent-top-blue",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Healing happens in community. We foster safe spaces for users on similar wellness journeys.",
    gradient: "from-green-400 to-teal-400",
    accentClass: "accent-top-violet",
  },
  {
    icon: Target,
    title: "Evidence-Based",
    description: "All our tools and assessments are based on validated psychological research and clinical practices.",
    gradient: "from-purple-400 to-pink-400",
    accentClass: "accent-top-amber",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-16 animate-fade-in-up">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto pt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            About Equanima
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
            We're on a mission to make mental health support accessible, personalized, and effective for everyone. Equanima combines cutting-edge AI technology with evidence-based psychological practices to provide security and ease.
          </p>
        </section>

        {/* Mission Section */}
        <section className="max-w-4xl mx-auto">
          <Card className="glass-strong border-white/20 dark:border-white/8 rounded-3xl shadow-xl overflow-hidden">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-2xl font-bold text-center text-foreground flex items-center justify-center gap-2">
                <Target className="h-5 w-5 text-primary" /> Our Mission
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground text-center text-pretty leading-relaxed">
                Mental health challenges affect millions of people worldwide, yet access to quality care remains limited. Equanima bridges this gap by providing AI-powered wellness tools that complement traditional therapy, making mental health support available 24/7, wherever you are.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Why Wellness Matters */}
        <section className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Why Mental Wellness Matters</h2>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">The foundation of a fulfilling life</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className={`glass-card rounded-2xl p-2 flex flex-col justify-between overflow-hidden relative ${value.accentClass}`}
              >
                <CardHeader className="text-center pb-2">
                  <div
                    className={`mx-auto h-10 w-10 rounded-xl bg-gradient-to-r ${value.gradient} flex items-center justify-center mb-3 text-white shadow-md`}
                  >
                    <value.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-sm font-bold">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-center text-[11px] leading-relaxed text-muted-foreground text-pretty">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
