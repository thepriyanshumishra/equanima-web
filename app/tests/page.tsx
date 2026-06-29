"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthGuard } from "@/components/auth-guard"
import { AlertCircle, Clock, FileText, CheckCircle2, ChevronRight, HelpCircle, ShieldAlert } from "lucide-react"
import Link from "next/link"

const mentalHealthTests = [
  {
    id: "phq-9",
    name: "PHQ-9 (Patient Health Questionnaire)",
    questions: 9,
    duration: "3-5 mins",
    description: "Clinically validated screening tool to measure severity of depressive symptoms.",
    category: "Depression",
    tabGroup: "mood",
    gradient: "from-emerald-400 to-teal-400",
  },
  {
    id: "gad-7",
    name: "GAD-7 (Generalized Anxiety Disorder)",
    questions: 7,
    duration: "2-4 mins",
    description: "Brief self-report scale measuring the severity of generalized anxiety symptoms.",
    category: "Anxiety",
    tabGroup: "mood",
    gradient: "from-blue-400 to-indigo-400",
  },
  {
    id: "dass-21",
    name: "DASS-21 (Depression, Anxiety & Stress Scale)",
    questions: 21,
    duration: "5-8 mins",
    description: "Set of three self-report scales designed to measure negative emotional states of depression, anxiety, and tension.",
    category: "Tri-dimensional",
    tabGroup: "stress",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    id: "pss-10",
    name: "PSS-10 (Perceived Stress Scale)",
    questions: 10,
    duration: "3-5 mins",
    description: "The most widely used psychological instrument for measuring the perception of stress.",
    category: "Stress Perception",
    tabGroup: "stress",
    gradient: "from-orange-400 to-red-400",
  },
  {
    id: "who-5",
    name: "WHO-5 (Well-Being Index)",
    questions: 5,
    duration: "2 mins",
    description: "A short self-reported questionnaire assessing subjective psychological well-being.",
    category: "Well-Being",
    tabGroup: "sleep",
    gradient: "from-teal-400 to-emerald-400",
  },
  {
    id: "k10",
    name: "K10 (Kessler Psychological Distress Scale)",
    questions: 10,
    duration: "3-5 mins",
    description: "Measures anxiety and depressive symptoms experienced during the past 4-week period.",
    category: "Distress",
    tabGroup: "mood",
    gradient: "from-yellow-400 to-amber-500",
  },
  {
    id: "rses",
    name: "Rosenberg Self-Esteem Scale (RSES)",
    questions: 10,
    duration: "3 mins",
    description: "A widely used clinical instrument for evaluating subjective self-esteem and self-worth levels.",
    category: "Self-Esteem",
    tabGroup: "sleep",
    gradient: "from-pink-400 to-rose-400",
  },
  {
    id: "isi",
    name: "Insomnia Severity Index (ISI)",
    questions: 7,
    duration: "2-3 mins",
    description: "Brief screening assessment to detect difficulties in sleep onset and sleep maintenance.",
    category: "Sleep Wellness",
    tabGroup: "sleep",
    gradient: "from-cyan-400 to-blue-400",
  },
  {
    id: "burnout",
    name: "Academic & Work Burnout Index",
    questions: 10,
    duration: "3 mins",
    description: "Measures the severity of chronic exhaustion, disengagement, and cynicism related to studies or career.",
    category: "Burnout",
    tabGroup: "stress",
    gradient: "from-amber-400 to-orange-400",
  },
]

export default function TestsCatalogPage() {
  const renderGrid = (groupId: "all" | "mood" | "stress" | "sleep") => {
    const list = mentalHealthTests.filter((test) =>
      groupId === "all" ? true : test.tabGroup === groupId
    )

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((test) => (
          <Card
            key={test.id}
            className="glass-card border-white/20 dark:border-white/8 rounded-2xl flex flex-col justify-between overflow-hidden relative group hover:scale-[1.02] transition-transform duration-300"
          >
            {/* Glow Backdrop */}
            <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full bg-gradient-to-r ${test.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300 blur-xl`} />

            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-[9px] py-0 px-2 rounded-full border-primary/20 bg-primary/5 text-primary">
                  {test.category}
                </Badge>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-semibold">
                  <Clock className="h-3 w-3" /> {test.duration}
                </div>
              </div>
              <CardTitle className="text-base font-extrabold leading-tight group-hover:text-primary transition-colors min-h-[2.5rem] flex items-center">
                {test.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="min-h-[3.5rem] flex items-start">
                <CardDescription className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
                  {test.description}
                </CardDescription>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex justify-between items-center text-[9px] text-muted-foreground font-bold">
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3" /> {test.questions} clinical queries
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Automatic scale
                  </span>
                </div>

                <Button asChild className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white border-0 py-5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 h-10 shadow-sm transition-all duration-300">
                  <Link href={`/tests/${test.id}`}>
                    Start Assessment <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen pb-20 pt-6 px-4">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
          
          {/* Header Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Clinical Assessments</h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Screen yourself with clinically validated mental health assessments to log and track index metrics.
            </p>
          </div>

          {/* Categorized Tabs */}
          <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 glass border border-white/20 dark:border-white/8 rounded-2xl p-1 max-w-2xl mx-auto gap-1">
              <TabsTrigger value="all" className="rounded-xl text-xs font-bold py-2">
                All Tests
              </TabsTrigger>
              <TabsTrigger value="mood" className="rounded-xl text-xs font-bold py-2">
                Mood & Anxiety
              </TabsTrigger>
              <TabsTrigger value="stress" className="rounded-xl text-xs font-bold py-2">
                Stress & Burnout
              </TabsTrigger>
              <TabsTrigger value="sleep" className="rounded-xl text-xs font-bold py-2">
                Well-Being & Sleep
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              {renderGrid("all")}
            </TabsContent>
            <TabsContent value="mood" className="mt-0">
              {renderGrid("mood")}
            </TabsContent>
            <TabsContent value="stress" className="mt-0">
              {renderGrid("stress")}
            </TabsContent>
            <TabsContent value="sleep" className="mt-0">
              {renderGrid("sleep")}
            </TabsContent>
          </Tabs>

          {/* Medical Disclaimer Banner (Placed below tests list) */}
          <Card className="glass border-amber-500/20 dark:border-amber-500/10 bg-amber-500/5 rounded-3xl p-5 shadow-sm mt-8">
            <div className="flex gap-4 items-start text-amber-800 dark:text-amber-300">
              <ShieldAlert className="h-6 w-6 flex-shrink-0 text-amber-500 animate-pulse" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Medical Screening Disclaimer</h4>
                <p className="text-xs leading-relaxed opacity-90">
                  These self-assessments are screening indicators only. They do not constitute diagnostic medical analysis, therapy, or prescriptions. Always discuss mental health trends with a qualified clinician. If you are experiencing severe distress or crisis, please contact your local emergency services immediately.
                </p>
              </div>
            </div>
          </Card>

          {/* Help/Inquiry Link */}
          <div className="text-center py-4">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 font-semibold">
              <HelpCircle className="h-4 w-4 text-primary" /> Need assistance picking the right test?
              <Link href="/contact" className="text-primary hover:underline font-bold">
                Ask support
              </Link>
            </p>
          </div>

        </div>
      </div>
    </AuthGuard>
  )
}
