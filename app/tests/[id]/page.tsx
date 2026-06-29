"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/components/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, ArrowRight, ShieldAlert, Sparkles, CheckCircle2, RefreshCw, AlertCircle, HelpCircle } from "lucide-react"
import Link from "next/link"

// Tests questionnaire data config
interface Question {
  id: number
  text: string
}

interface TestConfig {
  name: string
  subtitle: string
  questions: Question[]
  options: { label: string; value: number }[]
  interpret: (score: number) => { level: string; desc: string; advice: string[]; color: string }
}

const TESTS_DATA: Record<string, TestConfig> = {
  "phq-9": {
    name: "PHQ-9 (Patient Depression Screening)",
    subtitle: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
    options: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
    questions: [
      { id: 1, text: "Little interest or pleasure in doing things." },
      { id: 2, text: "Feeling down, depressed, or hopeless." },
      { id: 3, text: "Trouble falling or staying asleep, or sleeping too much." },
      { id: 4, text: "Feeling tired or having little energy." },
      { id: 5, text: "Poor appetite or overeating." },
      { id: 6, text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down." },
      { id: 7, text: "Trouble concentrating on things, such as reading the newspaper or watching television." },
      { id: 8, text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual." },
      { id: 9, text: "Thoughts that you would be better off dead or of hurting yourself in some way." },
    ],
    interpret: (score) => {
      if (score <= 4) return { level: "Minimal Depression", desc: "Your scores indicate minimal depressive symptom levels.", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", advice: ["Maintain daily active schedules.", "Practice grounding mindfulness."] }
      if (score <= 9) return { level: "Mild Depression", desc: "Scores represent mild depressive levels.", color: "text-green-500 bg-green-500/10 border-green-500/20", advice: ["Discuss logs with MitraAI.", "Focus on sleep hygiene routines."] }
      if (score <= 14) return { level: "Moderate Depression", desc: "Moderate depressive symptoms recorded.", color: "text-amber-500 bg-amber-500/10 border-amber-500/20", advice: ["Discuss logs with MitraAI for supportive coping techniques.", "Consider discussing with a wellness coach."] }
      if (score <= 19) return { level: "Moderately Severe Depression", desc: "Significant depressive indicators present.", color: "text-orange-500 bg-orange-500/10 border-orange-500/20", advice: ["Reach out to a professional mental health counselor.", "Involve supportive friends and family."] }
      return { level: "Severe Depression", desc: "High severe indicators recorded.", color: "text-red-500 bg-red-500/10 border-red-500/20", advice: ["Urgent consultation with a clinician is recommended.", "Reach out to support helplines immediately."] }
    },
  },
  "gad-7": {
    name: "GAD-7 (Generalized Anxiety Screening)",
    subtitle: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
    options: [
      { label: "Not at all", value: 0 },
      { label: "Several days", value: 1 },
      { label: "More than half the days", value: 2 },
      { label: "Nearly every day", value: 3 },
    ],
    questions: [
      { id: 1, text: "Feeling nervous, anxious, or on edge." },
      { id: 2, text: "Not being able to stop or control worrying." },
      { id: 3, text: "Worrying too much about different things." },
      { id: 4, text: "Trouble relaxing." },
      { id: 5, text: "Being so restless that it is hard to sit still." },
      { id: 6, text: "Becoming easily annoyed or irritable." },
      { id: 7, text: "Feeling afraid as if something awful might happen." },
    ],
    interpret: (score) => {
      if (score <= 4) return { level: "Minimal Anxiety", desc: "No or minimal anxiety symptoms indicators.", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", advice: ["Continue active exercises.", "Practice deep breathing grounding."] }
      if (score <= 9) return { level: "Mild Anxiety", desc: "Mild generalized tension symptoms recorded.", color: "text-green-500 bg-green-500/10 border-green-500/20", advice: ["Practice the 4-7-8 breathing technique.", "Identify specific stress triggers in mood tracker."] }
      if (score <= 14) return { level: "Moderate Anxiety", desc: "Clear indicators of moderate anxiety.", color: "text-amber-500 bg-amber-500/10 border-amber-500/20", advice: ["Log worries daily and query MitraAI for calming tips.", "Reach out to a campus wellness advisor."] }
      return { level: "Severe Anxiety", desc: "Severe tension and panic levels present.", color: "text-red-500 bg-red-500/10 border-red-500/20", advice: ["Consult with a mental health doctor.", "Avail of professional coaching options."] }
    },
  },
  "dass-21": {
    name: "DASS-21 (Depression, Anxiety & Stress Index)",
    subtitle: "Please read each statement and select a score which applies to you over the past week.",
    options: [
      { label: "Did not apply to me at all", value: 0 },
      { label: "Applied to me to some degree", value: 1 },
      { label: "Applied to me to a considerable degree", value: 2 },
      { label: "Applied to me very much", value: 3 },
    ],
    questions: [
      { id: 1, text: "I found it hard to wind down." },
      { id: 2, text: "I was aware of dryness of my mouth." },
      { id: 3, text: "I couldn't seem to experience any positive feeling at all." },
      { id: 4, text: "I experienced breathing difficulty (e.g. excessively rapid breathing)." },
      { id: 5, text: "I found it difficult to work up the initiative to do things." },
      { id: 6, text: "I tended to over-react to situations." },
      { id: 7, text: "I experienced trembling (e.g. in the hands)." },
      { id: 8, text: "I felt that I was using a lot of nervous energy." },
      { id: 9, text: "I was worried about situations in which I might panic and make a fool of myself." },
      { id: 10, text: "I felt that I had nothing to look forward to." },
      { id: 11, text: "I found myself getting agitated." },
      { id: 12, text: "I found it difficult to relax." },
      { id: 13, text: "I felt down-hearted and blue." },
      { id: 14, text: "I was intolerant of anything that kept me from getting on with what I was doing." },
      { id: 15, text: "I felt I was close to panic." },
      { id: 16, text: "I was unable to become enthusiastic about anything." },
      { id: 17, text: "I felt I wasn't worth much as a person." },
      { id: 18, text: "I felt that I was rather touchy." },
      { id: 19, text: "I was aware of the action of my heart in the absence of physical exertion." },
      { id: 20, text: "I felt scared without any good reason." },
      { id: 21, text: "I felt that life was meaningless." },
    ],
    interpret: (score) => {
      const scaleScore = score * 2
      if (scaleScore <= 14) return { level: "Normal Range", desc: "Your scores lay in the standard normal emotional indexes.", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", advice: ["Maintain balanced nutrition.", "Practice casual relaxation logs."] }
      if (scaleScore <= 25) return { level: "Mild Tension", desc: "Mild emotional pressures identified.", color: "text-green-500 bg-green-500/10 border-green-500/20", advice: ["Incorporate brief mindful breaks in your day.", "Use mood tracking to log stress details."] }
      if (scaleScore <= 40) return { level: "Moderate Tension", desc: "Moderate stress and anxiety levels present.", color: "text-amber-500 bg-amber-500/10 border-amber-500/20", advice: ["Consult with a therapist or school counselor.", "Initiate mindful breathing guides."] }
      return { level: "Severe Tension Index", desc: "High severity indicators recorded on the DASS scale.", color: "text-red-500 bg-red-500/10 border-red-500/20", advice: ["Contact a clinical support specialist.", "Seek immediate guidance from wellness professionals."] }
    },
  },
  "pss-10": {
    name: "PSS-10 (Perceived Stress Scale)",
    subtitle: "In the last month, how often have you felt or thought about the following?",
    options: [
      { label: "Never", value: 0 },
      { label: "Almost never", value: 1 },
      { label: "Sometimes", value: 2 },
      { label: "Fairly often", value: 3 },
      { label: "Very often", value: 4 },
    ],
    questions: [
      { id: 1, text: "Been upset because of something that happened unexpectedly?" },
      { id: 2, text: "Felt that you were unable to control the important things in your life?" },
      { id: 3, text: "Felt nervous and stressed?" },
      { id: 4, text: "Felt confident about your ability to handle your personal problems? (Reverse)" },
      { id: 5, text: "Felt that things were going your way? (Reverse)" },
      { id: 6, text: "Found that you could not cope with all the things that you had to do?" },
      { id: 7, text: "Been able to control irritations in your life? (Reverse)" },
      { id: 8, text: "Felt that you were on top of things? (Reverse)" },
      { id: 9, text: "Been angered because of things that were outside of your control?" },
      { id: 10, text: "Felt difficulties were piling up so high that you could not overcome them?" },
    ],
    interpret: (score) => {
      if (score <= 13) return { level: "Low Stress", desc: "Your scores indicate low perceived stress levels.", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", advice: ["Continue maintaining work-life balance.", "Engage in social wellness events."] }
      if (score <= 26) return { level: "Moderate Stress", desc: "Moderate stress perception levels recorded.", color: "text-amber-500 bg-amber-500/10 border-amber-500/20", advice: ["Identify daily control boundaries.", "Try meditation or mindfulness apps."] }
      return { level: "High Perceived Stress", desc: "High stress perception levels present.", color: "text-red-500 bg-red-500/10 border-red-500/20", advice: ["Reach out to professional support counseling.", "Designate clear off-work rest periods."] }
    },
  },
  "who-5": {
    name: "WHO-5 (Well-Being Index)",
    subtitle: "Over the last 2 weeks, please select the score that best represents how you have been feeling.",
    options: [
      { label: "All of the time", value: 5 },
      { label: "Most of the time", value: 4 },
      { label: "More than half the time", value: 3 },
      { label: "Less than half the time", value: 2 },
      { label: "Some of the time", value: 1 },
      { label: "At no time", value: 0 },
    ],
    questions: [
      { id: 1, text: "I have felt cheerful and in good spirits." },
      { id: 2, text: "I have felt calm and relaxed." },
      { id: 3, text: "I have felt active and vigorous." },
      { id: 4, text: "I woke up feeling fresh and rested." },
      { id: 5, text: "My daily life has been filled with things that interest me." },
    ],
    interpret: (score) => {
      const pct = score * 4
      if (pct >= 50) return { level: "Good Well-Being", desc: "Your well-being percentage is healthy.", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", advice: ["Maintain current sleep and study schedules.", "Keep writing positive reflection logs."] }
      return { level: "Low Subjective Well-Being", desc: "Well-being indicators represent low levels (below 50%).", color: "text-amber-500 bg-amber-500/10 border-amber-500/20", advice: ["Share log with MitraAI to analyze sleep hygiene.", "Discuss concerns in a supportive circle."] }
    },
  },
  "k10": {
    name: "K10 (Kessler Distress Index)",
    subtitle: "In the past 4 weeks, about how often did you feel...",
    options: [
      { label: "None of the time", value: 1 },
      { label: "A little of the time", value: 2 },
      { label: "Some of the time", value: 3 },
      { label: "Most of the time", value: 4 },
      { label: "All of the time", value: 5 },
    ],
    questions: [
      { id: 1, text: "tired out for no good reason?" },
      { id: 2, text: "nervous?" },
      { id: 3, text: "so nervous that nothing could calm you down?" },
      { id: 4, text: "hopeless?" },
      { id: 5, text: "restless or fidgety?" },
      { id: 6, text: "so restless you could not sit still?" },
      { id: 7, text: "depressed?" },
      { id: 8, text: "that everything was an effort?" },
      { id: 9, text: "so sad that nothing could cheer you up?" },
      { id: 10, text: "worthless?" },
    ],
    interpret: (score) => {
      if (score <= 19) return { level: "Likely Well", desc: "Your distress scores show minimal emotional indicators.", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", advice: ["Continue with daily energy tracker logs.", "Participate in campus recreation."] }
      if (score <= 24) return { level: "Mild Distress", desc: "Mild indicators of distress registered.", color: "text-green-500 bg-green-500/10 border-green-500/20", advice: ["Use calming breathing guides.", "Query MitraAI for relaxing prompts."] }
      if (score <= 29) return { level: "Moderate Distress", desc: "Moderate distress metrics present.", color: "text-amber-500 bg-amber-500/10 border-amber-500/20", advice: ["Discuss logs with a certified practitioner.", "Consider group circle meetups."] }
      return { level: "Severe Distress Index", desc: "High severe indicators of distress recorded.", color: "text-red-500 bg-red-500/10 border-red-500/20", advice: ["Professional mental health consult is advised.", "Connect with counselor support services."] }
    },
  },
  "rses": {
    name: "Rosenberg Self-Esteem Scale (RSES)",
    subtitle: "Please rate how strongly you agree or disagree with the following statements about yourself.",
    options: [
      { label: "Strongly Agree", value: 3 },
      { label: "Agree", value: 2 },
      { label: "Disagree", value: 1 },
      { label: "Strongly Disagree", value: 0 },
    ],
    questions: [
      { id: 1, text: "I feel that I'm a person of worth, at least on an equal plane with others." },
      { id: 2, text: "I feel that I have a number of good qualities." },
      { id: 3, text: "All in all, I am inclined to feel that I am a failure. (Reverse)" },
      { id: 4, text: "I am able to do things as well as most other people." },
      { id: 5, text: "I feel I do not have much to be proud of. (Reverse)" },
      { id: 6, text: "I take a positive attitude toward myself." },
      { id: 7, text: "On the whole, I am satisfied with myself." },
      { id: 8, text: "I wish I could have more respect for myself. (Reverse)" },
      { id: 9, text: "I certainly feel useless at times. (Reverse)" },
      { id: 10, text: "At times I think I am no good at all. (Reverse)" },
    ],
    interpret: (score) => {
      if (score < 15) return { level: "Low Self-Esteem", desc: "Your scores indicate low subjective evaluation of personal worth.", color: "text-red-500 bg-red-500/10 border-red-500/20", advice: ["Focus on listing weekly micro-successes.", "Talk with MitraAI about self-criticism loops."] }
      if (score <= 25) return { level: "Healthy Self-Esteem", desc: "Your score lies in the standard average self-esteem index.", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", advice: ["Maintain current wellness routines.", "Share encouraging feedback with friends or family."] }
      return { level: "High Self-Esteem", desc: "Strong positive evaluation of personal self-worth.", color: "text-green-500 bg-green-500/10 border-green-500/20", advice: ["Continue sharing leadership guides.", "Empower others in support circles."] }
    },
  },
  "isi": {
    name: "Insomnia Severity Index (ISI)",
    subtitle: "Please rate the severity of your sleep difficulties over the last 2 weeks.",
    options: [
      { label: "None / Very Satisfied", value: 0 },
      { label: "Mild / Slightly", value: 1 },
      { label: "Moderate / Somewhat", value: 2 },
      { label: "Severe / Much", value: 3 },
      { label: "Very Severe / Very Much", value: 4 },
    ],
    questions: [
      { id: 1, text: "Difficulty falling asleep." },
      { id: 2, text: "Difficulty staying asleep." },
      { id: 3, text: "Problems waking up too early." },
      { id: 4, text: "How satisfied/dissatisfied are you with your current sleep pattern?" },
      { id: 5, text: "How noticeable to others do you think your sleep problem is in terms of impairing the quality of life?" },
      { id: 6, text: "How worried/distressed are you about your current sleep problem?" },
      { id: 7, text: "To what extent do you consider your sleep problem to interfere with your daily functioning (e.g. fatigue, mood)?" },
    ],
    interpret: (score) => {
      if (score <= 7) return { level: "No Insomnia", desc: "No clinically significant insomnia indicators present.", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", advice: ["Maintain consistent sleep schedules.", "Avoid screens 30 mins before bed."] }
      if (score <= 14) return { level: "Subthreshold Insomnia", desc: "Mild signs of insomnia. Some sleep disturbances present.", color: "text-green-500 bg-green-500/10 border-green-500/20", advice: ["Reduce evening caffeine intake.", "Ask MitraAI for custom sleep wind-down prompts."] }
      if (score <= 21) return { level: "Moderate Insomnia", desc: "Clinical insomnia of moderate severity.", color: "text-amber-500 bg-amber-500/10 border-amber-500/20", advice: ["Practice mindfulness breathing before sleep.", "Consider consulting a clinical advisor."] }
      return { level: "Severe Insomnia Index", desc: "Significant sleep onset or maintenance challenges recorded.", color: "text-red-500 bg-red-500/10 border-red-500/20", advice: ["Schedule clinical guidance for sleep hygiene.", "Seek medical consultation for persistent insomnia."] }
    },
  },
  "burnout": {
    name: "Academic & Work Burnout Index",
    subtitle: "How often do you experience the following study or career exhaustion symptoms?",
    options: [
      { label: "Never", value: 0 },
      { label: "Rarely", value: 1 },
      { label: "Sometimes", value: 2 },
      { label: "Often", value: 3 },
      { label: "Always", value: 4 },
    ],
    questions: [
      { id: 1, text: "I feel emotionally exhausted from my work or studies." },
      { id: 2, text: "I feel tired and low on energy at the end of the day." },
      { id: 3, text: "I feel weary when I wake up and have to face another day." },
      { id: 4, text: "I have become less interested in my work or study tasks." },
      { id: 5, text: "I doubt the significance and value of my work or studies." },
      { id: 6, text: "I feel frustrated by my daily responsibilities." },
      { id: 7, text: "I feel like I'm not accomplishing anything meaningful." },
      { id: 8, text: "I find it hard to concentrate on my tasks." },
      { id: 9, text: "I catch myself being cynical or cold toward colleagues or peers." },
      { id: 10, text: "I feel overwhelmed by the volume of workload and deadlines." },
    ],
    interpret: (score) => {
      if (score <= 15) return { level: "Low Burnout", desc: "Healthy academic/career engagement levels. Well-balanced.", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", advice: ["Keep up current task prioritizations.", "Continue setting healthy workload boundaries."] }
      if (score <= 28) return { level: "Moderate Burnout", desc: "You are experiencing signs of fatigue and work-related weariness.", color: "text-amber-500 bg-amber-500/10 border-amber-500/20", advice: ["Integrate brief breaks using Pomodoro timing.", "Discuss coping strategies in support circles."] }
      return { level: "High Burnout Index", desc: "Significant indicators of work or academic burnout. Urgent relaxation is advised.", color: "text-red-500 bg-red-500/10 border-red-500/20", advice: ["Discuss workload scaling with a coordinator.", "Take designated wellness off-time.", "Consult a professional guide."] }
    },
  },
}

function TestRunnerContent() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { updateUser, user } = useAuth()

  const testId = typeof params?.id === "string" ? params.id.toLowerCase() : ""
  const config = TESTS_DATA[testId]

  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [finalScore, setFinalScore] = useState(0)

  if (!config) {
    return (
      <Card className="glass border-white/20 p-8 max-w-md mx-auto text-center mt-12 rounded-2xl">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4 animate-float" />
        <CardTitle className="mb-2">Assessment Not Found</CardTitle>
        <CardDescription className="mb-4">The screening ID does not match any valid tests.</CardDescription>
        <Button asChild className="w-full">
          <Link href="/tests">Back to Catalog</Link>
        </Button>
      </Card>
    )
  }

  const currentQuestion = config.questions[currentIdx]
  const isLastQuestion = currentIdx === config.questions.length - 1
  const progressPct = ((currentIdx + 1) / config.questions.length) * 100

  const calculateAndSaveResults = (latestAnswers: Record<number, number>) => {
    let score = 0
    if (testId === "pss-10") {
      const reverseIds = [4, 5, 7, 8]
      config.questions.forEach((q) => {
        const val = latestAnswers[q.id] || 0
        if (reverseIds.includes(q.id)) {
          score += (4 - val)
        } else {
          score += val
        }
      })
    } else if (testId === "rses") {
      const reverseIds = [3, 5, 8, 9, 10]
      config.questions.forEach((q) => {
        const val = latestAnswers[q.id] || 0
        if (reverseIds.includes(q.id)) {
          score += (3 - val)
        } else {
          score += val
        }
      })
    } else {
      score = Object.values(latestAnswers).reduce((sum, val) => sum + val, 0)
    }

    setFinalScore(score)
    setIsSubmitted(true)

    // Save test results to user profile history logs
    const resultObj = {
      testId,
      testName: config.name,
      score,
      level: config.interpret(score).level,
      date: new Date().toISOString(),
    }

    const currentHistory = user?.testHistory || []
    updateUser({
      testHistory: [resultObj, ...currentHistory],
    })

    toast({
      title: "Test Complete!",
      description: "Your results have been calculated and saved to your history logs.",
    })
  }

  const handleSelectOption = (val: number) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: val }
    setAnswers(updatedAnswers)

    // Auto-advance with 250ms feedback delay
    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentIdx((prev) => prev + 1)
      }, 250)
    } else {
      setTimeout(() => {
        calculateAndSaveResults(updatedAnswers)
      }, 300)
    }
  }

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1)
    }
  }

  const handleRetake = () => {
    setAnswers({})
    setCurrentIdx(0)
    setIsSubmitted(false)
    setFinalScore(0)
  }

  if (isSubmitted) {
    const result = config.interpret(finalScore)
    return (
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Results Glass Card */}
        <Card className="glass-strong border-white/30 shadow-2xl p-4 rounded-3xl animate-scale-in">
          <CardHeader className="text-center space-y-3">
            <Badge variant="outline" className="mx-auto rounded-full py-0.5 px-3 uppercase text-[10px] tracking-wider font-semibold border-primary/20 bg-primary/5 text-primary">
              Assessment Results
            </Badge>
            <CardTitle className="text-2xl font-bold">{config.name}</CardTitle>
            <CardDescription className="text-xs">Saved to your secure profile history logs</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            
            {/* Score Ring Display */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/10 dark:bg-black/10 border border-white/10 dark:border-white/5 space-y-2">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Your score</span>
              <div className="h-24 w-24 rounded-full border-4 border-primary flex items-center justify-center text-3xl font-extrabold text-primary shadow-inner">
                {finalScore}
              </div>
              <Badge className={`mt-2 py-1 px-3 text-xs font-bold rounded-full border ${result.color}`}>
                {result.level}
              </Badge>
            </div>

            {/* Scale Interpretation Detail */}
            <div className="space-y-1 bg-white/5 p-4 rounded-xl border border-white/5 text-center">
              <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">What this score means</h4>
              <p className="text-sm text-foreground/90 text-pretty leading-relaxed">
                {result.desc}
              </p>
            </div>

            {/* Recommendations List */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs flex items-center gap-1.5 text-foreground uppercase tracking-wider">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" /> Recommended Actions
              </h4>
              <ul className="space-y-2">
                {result.advice.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions Grid */}
            <div className="flex gap-2 pt-4 border-t border-white/10">
              <Button onClick={handleRetake} variant="outline" className="flex-1 glass border-white/20 bg-transparent rounded-xl h-10 text-xs font-semibold">
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Retake Test
              </Button>
              <Button asChild className="flex-1 rounded-xl h-10 text-xs font-semibold">
                <Link href="/tests">All Assessments</Link>
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    )
  }

  const selectedAnswer = answers[currentQuestion.id]

  return (
    <div className="max-w-xl mx-auto space-y-6">
      
      {/* Back to Catalog Link */}
      <Link href="/tests" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold hover:underline">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to assessments list
      </Link>

      {/* Questionnaire Card */}
      <Card className="glass-strong border-white/30 shadow-2xl p-3 rounded-3xl animate-scale-in">
        
        {/* Progress Header */}
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center text-xs font-bold text-muted-foreground mb-2">
            <span className="uppercase text-[10px] tracking-wider text-primary">Question {currentIdx + 1} of {config.questions.length}</span>
            <span>{Math.round(progressPct)}% Complete</span>
          </div>
          
          {/* Progress bar container */}
          <div className="w-full h-1.5 bg-white/10 dark:bg-black/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 shadow-md"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          
          {/* Question Text */}
          <div className="p-5 rounded-2xl bg-white/10 dark:bg-black/10 border border-white/10 dark:border-white/5 space-y-2">
            <p className="text-xs text-muted-foreground leading-relaxed">{config.subtitle}</p>
            <h3 className="text-lg font-bold leading-snug text-foreground text-pretty">
              {currentQuestion.text}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {config.options.map((opt) => {
              const isSelected = selectedAnswer === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelectOption(opt.value)}
                  className={`
                    w-full p-4 rounded-xl flex items-center justify-between text-left transition-all duration-300 text-xs font-semibold border
                    ${isSelected
                      ? "bg-primary text-primary-foreground border-transparent scale-[1.01] shadow-md"
                      : "glass hover:bg-white/30 border-white/20 dark:border-white/5 text-foreground hover:scale-[1.01]"
                    }
                  `}
                >
                  <span>{opt.label}</span>
                  {isSelected && <CheckCircle2 className="h-4 w-4 text-primary-foreground fill-current animate-scale-in" />}
                </button>
              )
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-2 pt-4 border-t border-white/10">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentIdx === 0}
              className="flex-1 glass border-white/20 bg-transparent rounded-xl h-10 text-xs font-semibold"
            >
              <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Previous
            </Button>
            
            <Button
              type="button"
              onClick={() => {
                if (answers[currentQuestion.id] === undefined) {
                  toast({
                    title: "Answer Required",
                    description: "Please select an option before moving forward.",
                    variant: "destructive",
                  })
                  return
                }
                if (isLastQuestion) {
                  calculateAndSaveResults(answers)
                } else {
                  setCurrentIdx((prev) => prev + 1)
                }
              }}
              className="flex-1 rounded-xl h-10 text-xs font-semibold"
            >
              {isLastQuestion ? "Finish & Calculate" : "Next Query"}
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>

        </CardContent>
      </Card>
      
      {/* Helpful Hint */}
      <p className="text-center text-[10px] text-muted-foreground flex items-center justify-center gap-1 font-semibold">
        <HelpCircle className="h-3 w-3 text-primary" /> Selecting an option will auto-advance to the next question.
      </p>

    </div>
  )
}

export default function TestRunnerPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen pb-20 pt-6 px-4">
        <TestRunnerContent />
      </div>
    </AuthGuard>
  )
}
