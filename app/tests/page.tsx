"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AuthProvider } from "@/components/contexts/auth-context"
import { MoodProvider } from "@/components/contexts/mood-context"
import { AuthGuard } from "@/components/auth-guard"
import { BottomNavigation } from "@/components/bottom-navigation"
import { MitraAIChat } from "@/components/mitra-ai-chat"
import { Clock, Users, TrendingUp, Brain, Heart, Zap, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"

const mentalHealthTests = [
  {
    id: "phq-9",
    title: "PHQ-9 Depression Assessment",
    description: "Patient Health Questionnaire-9 is a validated tool for screening and measuring depression severity.",
    duration: "5-7 minutes",
    questions: 9,
    category: "Depression",
    icon: Brain,
    color: "bg-blue-500",
    difficulty: "Easy",
    popularity: "Most Popular",
    lastTaken: null,
  },
  {
    id: "gad-7",
    title: "GAD-7 Anxiety Assessment",
    description:
      "Generalized Anxiety Disorder-7 questionnaire to identify probable cases of GAD and measure anxiety severity.",
    duration: "3-5 minutes",
    questions: 7,
    category: "Anxiety",
    icon: Heart,
    color: "bg-red-500",
    difficulty: "Easy",
    popularity: "Very Popular",
    lastTaken: null,
  },
  {
    id: "dass-21",
    title: "DASS-21 Stress Assessment",
    description: "Depression, Anxiety and Stress Scale-21 measures emotional states of depression, anxiety and stress.",
    duration: "8-10 minutes",
    questions: 21,
    category: "Comprehensive",
    icon: Zap,
    color: "bg-yellow-500",
    difficulty: "Medium",
    popularity: "Popular",
    lastTaken: null,
  },
  {
    id: "pss-10",
    title: "PSS-10 Perceived Stress Scale",
    description:
      "Measures the degree to which situations in your life are appraised as stressful during the last month.",
    duration: "5-7 minutes",
    questions: 10,
    category: "Stress",
    icon: TrendingUp,
    color: "bg-orange-500",
    difficulty: "Easy",
    popularity: "Popular",
    lastTaken: null,
  },
  {
    id: "who-5",
    title: "WHO-5 Well-being Index",
    description:
      "World Health Organization Well-Being Index measures current mental well-being over the past two weeks.",
    duration: "2-3 minutes",
    questions: 5,
    category: "Well-being",
    icon: Shield,
    color: "bg-green-500",
    difficulty: "Very Easy",
    popularity: "Recommended",
    lastTaken: null,
  },
  {
    id: "k10",
    title: "K10 Psychological Distress Scale",
    description: "Kessler Psychological Distress Scale measures anxiety and depressive symptoms in the past 4 weeks.",
    duration: "4-6 minutes",
    questions: 10,
    category: "Distress",
    icon: AlertTriangle,
    color: "bg-purple-500",
    difficulty: "Easy",
    popularity: "Clinical Standard",
    lastTaken: null,
  },
]

function TestsContent() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Very Easy":
        return "bg-green-100 text-green-800"
      case "Easy":
        return "bg-blue-100 text-blue-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case "Most Popular":
        return "bg-purple-100 text-purple-800"
      case "Very Popular":
        return "bg-pink-100 text-pink-800"
      case "Popular":
        return "bg-indigo-100 text-indigo-800"
      case "Recommended":
        return "bg-emerald-100 text-emerald-800"
      case "Clinical Standard":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen pb-20 pt-6 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Mental Health Assessments</h1>
          <p className="text-muted-foreground text-pretty">
            Take validated psychological assessments to better understand your mental health. These tools are used by
            healthcare professionals worldwide.
          </p>
        </div>

        {/* Important Notice */}
        <Card className="glass border-amber-200 bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-amber-800 mb-1">Important Notice</p>
                <p className="text-amber-700">
                  These assessments are screening tools and not diagnostic instruments. If you're experiencing mental
                  health concerns, please consult with a qualified healthcare professional for proper evaluation and
                  treatment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="glass">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{mentalHealthTests.length}</div>
              <p className="text-sm text-muted-foreground">Available Tests</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {mentalHealthTests.reduce((sum, test) => sum + test.questions, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Questions</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">2-10</div>
              <p className="text-sm text-muted-foreground">Minutes Each</p>
            </CardContent>
          </Card>
        </div>

        {/* Tests Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {mentalHealthTests.map((test) => (
            <Card key={test.id} className="glass hover:glass-strong transition-all duration-300 hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${test.color} bg-opacity-10 mb-3`}>
                    <test.icon className={`h-6 w-6 ${test.color.replace("bg-", "text-")}`} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge variant="outline" className={getDifficultyColor(test.difficulty)}>
                      {test.difficulty}
                    </Badge>
                    <Badge variant="outline" className={getPopularityColor(test.popularity)}>
                      {test.popularity}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{test.title}</CardTitle>
                <CardDescription className="text-pretty">{test.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {test.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {test.questions} questions
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{test.category}</Badge>
                    {test.lastTaken && (
                      <span className="text-xs text-muted-foreground">Last taken: {test.lastTaken}</span>
                    )}
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/tests/${test.id}`}>Start Assessment</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Information Section */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>About These Assessments</CardTitle>
            <CardDescription>Understanding mental health screening tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">What are these tests?</h4>
                <p className="text-sm text-muted-foreground text-pretty">
                  These are validated psychological screening tools used by healthcare professionals to assess various
                  aspects of mental health. They help identify symptoms and measure severity levels.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">How to use results?</h4>
                <p className="text-sm text-muted-foreground text-pretty">
                  Results provide insights into your current mental state but should not replace professional diagnosis.
                  Use them to track changes over time and discuss with healthcare providers.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Privacy & Security</h4>
                <p className="text-sm text-muted-foreground text-pretty">
                  All assessment data is stored securely and privately. Your responses are encrypted and only accessible
                  to you. We never share personal health information.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">When to seek help?</h4>
                <p className="text-sm text-muted-foreground text-pretty">
                  If assessments indicate moderate to severe symptoms, or if you're having thoughts of self-harm, please
                  reach out to a mental health professional or crisis helpline immediately.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crisis Resources */}
        <Card className="glass border-red-200 bg-red-50/50">
          <CardHeader>
            <CardTitle className="text-red-800">Crisis Resources</CardTitle>
            <CardDescription className="text-red-700">
              If you're in crisis or having thoughts of self-harm, please reach out immediately:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-red-800">National Suicide Prevention Lifeline</p>
                <p className="text-red-700">988 (US) - Available 24/7</p>
              </div>
              <div>
                <p className="font-semibold text-red-800">Crisis Text Line</p>
                <p className="text-red-700">Text HOME to 741741</p>
              </div>
              <div>
                <p className="font-semibold text-red-800">International Association for Suicide Prevention</p>
                <p className="text-red-700">iasp.info/resources/Crisis_Centres</p>
              </div>
              <div>
                <p className="font-semibold text-red-800">Emergency Services</p>
                <p className="text-red-700">911 (US) or your local emergency number</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function TestsPage() {
  return (
    <AuthProvider>
      <MoodProvider>
        <AuthGuard>
          <TestsContent />
          <BottomNavigation />
          <MitraAIChat />
        </AuthGuard>
      </MoodProvider>
    </AuthProvider>
  )
}
