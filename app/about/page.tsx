"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Shield, Target } from "lucide-react"
import Image from "next/image"

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Clinical Psychologist & Co-Founder",
    image: "/professional-woman-psychologist.png",
  },
  {
    name: "Alex Rodriguez",
    role: "AI Engineer & Co-Founder",
    image: "/professional-engineer.png",
  },
  {
    name: "Maya Patel",
    role: "UX Designer",
    image: "/professional-woman-designer.png",
  },
  {
    name: "Dr. James Wilson",
    role: "Mental Health Advisor",
    image: "/professional-man-doctor.png",
  },
]

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "We believe mental health support should be accessible, understanding, and judgment-free.",
    gradient: "from-pink-400 to-red-400",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your mental health data is sacred. We use end-to-end encryption and never share personal information.",
    gradient: "from-blue-400 to-indigo-400",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Healing happens in community. We foster connections between users on similar journeys.",
    gradient: "from-green-400 to-teal-400",
  },
  {
    icon: Target,
    title: "Evidence-Based",
    description: "All our tools and assessments are based on validated psychological research and clinical practices.",
    gradient: "from-purple-400 to-pink-400",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="relative mb-8">
            <Image src="/logo.png" alt="Equanima Logo" width={80} height={80} className="mx-auto drop-shadow-2xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Equanima</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            We're on a mission to make mental health support accessible, personalized, and effective for everyone.
            Equanima combines cutting-edge AI technology with evidence-based psychological practices.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-muted-foreground text-center text-pretty max-w-4xl mx-auto">
                Mental health challenges affect millions of people worldwide, yet access to quality care remains
                limited. Equanima bridges this gap by providing AI-powered wellness tools that complement traditional
                therapy, making mental health support available 24/7, wherever you are.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Why Wellness Matters */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Mental Wellness Matters</h2>
            <p className="text-xl text-muted-foreground">The foundation of a fulfilling life</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
              >
                <CardHeader className="text-center">
                  <div
                    className={`mx-auto h-12 w-12 rounded-full bg-gradient-to-r ${value.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-pretty text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">Passionate experts dedicated to your mental wellness</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="rounded-full mx-auto shadow-lg"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
