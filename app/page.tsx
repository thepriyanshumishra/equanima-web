"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, BarChart3, ArrowRight, Sparkles, Users } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Brain,
    title: "Mood Tracking",
    description: "Track your daily emotions and mental state with our intuitive mood tracker.",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    icon: BarChart3,
    title: "Mental Health Tests",
    description: "Take validated assessments like PHQ-9 and GAD-7 to understand your mental health.",
    gradient: "from-green-400 to-blue-400",
  },
  {
    icon: Sparkles,
    title: "MitraAI Chat",
    description: "Get 24/7 support from our AI wellness companion trained in mental health.",
    gradient: "from-yellow-400 to-orange-400",
  },
  {
    icon: Users,
    title: "Alumni Connect",
    description: "Connect with a supportive community of users on similar wellness journeys.",
    gradient: "from-indigo-400 to-purple-400",
  },
]

const testimonials = [
  {
    text: "Equanima has been a game-changer for my mental health journey. The mood tracking helps me understand my patterns.",
    author: "Sarah M.",
    role: "Student",
  },
  {
    text: "MitraAI feels like having a therapist available 24/7. It's incredibly supportive and understanding.",
    author: "David L.",
    role: "Professional",
  },
  {
    text: "The mental health assessments helped me realize I needed professional help. Thank you for the guidance.",
    author: "Maya P.",
    role: "Graduate",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-green-50/20 to-blue-100/30" />
        <div className="absolute inset-0 backdrop-blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance animate-fade-in-up">
            Your AI-Powered
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse-glow">
              {" "}
              Wellness
            </span>{" "}
            Companion
          </h1>

          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto animate-fade-in-up animate-stagger-1">
            Take control of your mental health with Equanima. Track your mood, access professional assessments, and get
            support from MitraAI whenever you need it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-stagger-2">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in"
            >
              <Link href="/mood-tracker">
                Start Tracking <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="glass hover:glass-strong transition-all duration-300 hover:scale-105 animate-bounce-in animate-stagger-1 bg-transparent text-foreground border-foreground/20 hover:border-primary hover:text-primary"
            >
              <Link href="/tests">Take Assessment</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 animate-fade-in-up">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need for Mental Wellness</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Comprehensive tools designed to support your mental health journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`glass hover:glass-strong transition-all duration-500 hover:scale-105 hover:shadow-xl group animate-scale-in animate-stagger-${index + 1}`}
              >
                <CardHeader className="text-center">
                  <div
                    className={`mx-auto h-12 w-12 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-float`}
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-pretty group-hover:text-foreground/80 transition-colors duration-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 relative animate-fade-in-up">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/20 to-blue-100/20 backdrop-blur-3xl" />

        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-slide-down">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">Real stories from people on their wellness journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`glass hover:glass-strong transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-up animate-stagger-${index + 1}`}
              >
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 text-pretty italic hover:text-foreground/90 transition-colors duration-300">
                    "{testimonial.text}"
                  </p>
                  <div className="animate-slide-left" style={{ animationDelay: `${index * 0.2 + 0.5}s` }}>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 animate-fade-in-up">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="glass shadow-2xl hover:glass-strong transition-all duration-500 hover:scale-105 animate-bounce-in">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4 animate-slide-up">Ready to Start Your Wellness Journey?</h2>
              <p className="text-muted-foreground mb-6 text-pretty animate-slide-up animate-stagger-1">
                Join thousands of users who have taken control of their mental health with Equanima.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse-glow animate-bounce-in animate-stagger-2"
              >
                <Link href="/dashboard">
                  Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
