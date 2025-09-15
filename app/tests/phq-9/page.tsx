"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { AuthProvider } from "@/components/contexts/auth-context"
import { MoodProvider } from "@/components/contexts/mood-context"
import { AuthGuard } from "@/components/auth-guard"
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself in some way",
]

const responseOptions = [
  { value: "0", label: "Not at all", score: 0 },
  { value: "1", label: "Several days", score: 1 },
  { value: "2", label: "More than half the days", score: 2 },
  { value: "3", label: "Nearly every day", score: 3 },
]

function PHQ9Content() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Record<number, number>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const { toast } = useToast()

  const handleResponse = (questionIndex: number, score: number) => {
    setResponses({ ...responses, [questionIndex]: score })
  }

  const canProceed = responses[currentQuestion] !== undefined

  const nextQuestion = () => {
    if (currentQuestion < phq9Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsComplete(true)
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResults = () => {
    const totalScore = Object.values(responses).reduce((sum, score) => sum + score, 0)
    let severity = ""
    let description = ""
    let recommendations = []

    if (totalScore <= 4) {
      severity = "Minimal Depression"
      description = "Your responses suggest minimal or no depression symptoms."
      recommendations = [
        "Continue maintaining good mental health habits",
        "Regular exercise and social connections",
        "Monitor your mood over time",
      ]
    } else if (totalScore <= 9) {
      severity = "Mild Depression"
      description = "Your responses suggest mild depression symptoms."
      recommendations = [
        "Consider lifestyle changes like regular exercise",
        "Practice stress management techniques",
        "Monitor symptoms and consider professional support if they persist",
      ]
    } else if (totalScore <= 14) {
      severity = "Moderate Depression"
      description = "Your responses suggest moderate depression symptoms."
      recommendations = [
        "Consider speaking with a healthcare professional",
        "Therapy or counseling may be beneficial",
        "Continue monitoring your symptoms",
      ]
    } else if (totalScore <= 19) {
      severity = "Moderately Severe Depression"
      description = "Your responses suggest moderately severe depression symptoms."
      recommendations = [
        "Strongly consider professional mental health support",
        "Therapy and/or medication may be helpful",
        "Reach out to trusted friends, family, or support groups",
      ]
    } else {
      severity = "Severe Depression"
      description = "Your responses suggest severe depression symptoms."
      recommendations = [
        "Please seek professional help immediately",
        "Contact a mental health professional or your doctor",
        "Consider crisis resources if you're having thoughts of self-harm",
      ]
    }

    return { totalScore, severity, description, recommendations }
  }

  const results = isComplete ? calculateResults() : null

  const progress = ((currentQuestion + 1) / phq9Questions.length) * 100

  if (showResults && results) {
    return (
      <div className="min-h-screen pb-20 pt-6 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <Button asChild variant="ghost" className="glass-subtle">
            <Link href="/tests">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tests
            </Link>
          </Button>

          <Card className="glass-strong">
            <CardHeader className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">PHQ-9 Results</CardTitle>
              <CardDescription>Your depression screening results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{results.totalScore}/27</div>
                <div className="text-xl font-semibold mb-2">{results.severity}</div>
                <p className="text-muted-foreground text-pretty">{results.description}</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Recommendations:</h4>
                <ul className="space-y-2">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {results.totalScore >= 15 && (
                <Card className="border-amber-200 bg-amber-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-semibold text-amber-800 mb-1">Important</p>
                        <p className="text-amber-700">
                          Your results suggest significant depression symptoms. Please consider reaching out to a mental
                          health professional for proper evaluation and support.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-4">
                <Button asChild className="flex-1">
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1 bg-transparent">
                  <Link href="/tests">Take Another Test</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="min-h-screen pb-20 pt-6 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="glass-strong text-center">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Assessment Complete!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for completing the PHQ-9 assessment. Your responses have been recorded.
              </p>
              <Button onClick={() => setShowResults(true)} size="lg">
                View Results
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20 pt-6 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button asChild variant="ghost" className="glass-subtle">
          <Link href="/tests">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tests
          </Link>
        </Button>

        <Card className="glass-strong">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle>PHQ-9 Depression Assessment</CardTitle>
                <CardDescription>
                  Question {currentQuestion + 1} of {phq9Questions.length}
                </CardDescription>
              </div>
              <div className="text-right text-sm text-muted-foreground">{Math.round(progress)}% Complete</div>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-lg font-medium mb-4 text-pretty">
                Over the last 2 weeks, how often have you been bothered by:
              </p>
              <p className="text-xl font-semibold text-balance">{phq9Questions[currentQuestion]}</p>
            </div>

            <RadioGroup
              value={responses[currentQuestion]?.toString() || ""}
              onValueChange={(value) => handleResponse(currentQuestion, Number.parseInt(value))}
            >
              {responseOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 glass-subtle rounded-lg p-4">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between">
              <Button
                onClick={previousQuestion}
                variant="outline"
                disabled={currentQuestion === 0}
                className="glass-subtle bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button onClick={nextQuestion} disabled={!canProceed}>
                {currentQuestion === phq9Questions.length - 1 ? "Complete" : "Next"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function PHQ9Page() {
  return (
    <AuthProvider>
      <MoodProvider>
        <AuthGuard>
          <PHQ9Content />
        </AuthGuard>
      </MoodProvider>
    </AuthProvider>
  )
}
