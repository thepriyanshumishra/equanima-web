"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/contexts/auth-context"
import { useMood } from "@/components/contexts/mood-context"
import { AuthGuard } from "@/components/auth-guard"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Brain, Zap, Heart, Calendar, ArrowRight, Sparkles, User, Shield, MessageSquare, Plus, Video, Radio, Bell } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const MOOD_COLORS = {
  "very-happy": "#10b981",
  happy: "#34d399",
  neutral: "#fbbf24",
  sad: "#fb923c",
  "very-sad": "#ef4444",
}

const mockTherapistClients = [
  { name: "John Doe", email: "john@student.edu", lastAssessment: "PHQ-9", lastScore: 14, severity: "Moderate", date: "2 days ago", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
  { name: "Emily Watson", email: "emily@student.edu", lastAssessment: "GAD-7", lastScore: 8, severity: "Mild", date: "1 day ago", color: "text-green-500 bg-green-500/10 border-green-500/20" },
  { name: "Alex Mercer", email: "alex@student.edu", lastAssessment: "DASS-21", lastScore: 28, severity: "Moderate Tension", date: "4 hours ago", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
]

const mockCoordinatorStats = [
  { department: "Engineering", avgStress: 7.2, color: "#f59e0b" },
  { department: "Humanities", avgStress: 5.1, color: "#10b981" },
  { department: "Sciences", avgStress: 6.0, color: "#3b82f6" },
  { department: "Medicine", avgStress: 8.5, color: "#ef4444" },
]

function DashboardContent() {
  const { user } = useAuth()
  const { entries, getWeeklyData } = useMood()
  const { toast } = useToast()

  const weeklyData = getWeeklyData()
  const recentEntries = entries.slice(-7).reverse()

  // Calculate statistics
  const avgMood = weeklyData.reduce((sum, day) => sum + day.mood, 0) / weeklyData.length || 3
  const avgEnergy = weeklyData.reduce((sum, day) => sum + day.energy, 0) / weeklyData.length || 5
  const avgAnxiety = weeklyData.reduce((sum, day) => sum + day.anxiety, 0) / weeklyData.length || 5

  // Mood distribution for pie chart
  const moodDistribution = entries.reduce(
    (acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const pieData = Object.entries(moodDistribution).map(([mood, count]) => ({
    name: mood.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    value: count,
    color: MOOD_COLORS[mood as keyof typeof MOOD_COLORS],
  }))

  const recentAvg = weeklyData.slice(-3).reduce((sum, day) => sum + day.mood, 0) / 3
  const previousAvg = weeklyData.slice(-6, -3).reduce((sum, day) => sum + day.mood, 0) / 3
  const moodTrend = recentAvg > previousAvg ? "up" : recentAvg < previousAvg ? "down" : "stable"

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getMoodEmoji = (mood: string) => {
    const emojiMap = {
      "very-happy": "😄",
      happy: "😊",
      neutral: "😐",
      sad: "😢",
      "very-sad": "😭",
    }
    return emojiMap[mood as keyof typeof emojiMap] || "😐"
  }

  const handleAction = (message: string) => {
    toast({
      title: "Action Triggered",
      description: message,
    })
  }

  return (
    <div className="min-h-screen pb-20 pt-6 px-4">
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
        
        {/* Header Hero Banner */}
        <div className="glass-strong rounded-3xl p-8 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 border border-white/20 dark:border-white/8 relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight flex items-center gap-2">
            <Sparkles className="h-5.5 w-5.5 text-primary animate-pulse" /> Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Here is your mental wellness and mood trend overview for this week.
          </p>
        </div>

        {/* 3 Metric Cards Grid */}
        <div className="grid sm:grid-cols-3 gap-6">
          
          {/* Average Mood */}
          <Card className="glass-card accent-top-teal border-white/20 dark:border-white/8 p-6 flex flex-col justify-between h-36 rounded-2xl">
            <div className="flex justify-between items-start text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <span>Average Mood</span>
              <div className="h-8 w-8 rounded-lg bg-white/10 dark:bg-black/10 flex items-center justify-center text-teal-500 shadow-glow-teal border border-white/25 dark:border-white/5">
                <Brain className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold flex items-baseline gap-2">
                {avgMood.toFixed(1)} <span className="text-xs font-normal text-muted-foreground">/5</span>
                {moodTrend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-emerald-500 animate-bounce" />
                ) : moodTrend === "down" ? (
                  <TrendingDown className="h-4 w-4 text-red-500 animate-bounce" />
                ) : null}
              </div>
              <p className="text-[10px] text-muted-foreground font-semibold">
                {moodTrend === "up" ? "Improving" : moodTrend === "down" ? "Declining" : "Stable"} mood this week
              </p>
            </div>
          </Card>

          {/* Energy level */}
          <Card className="glass-card accent-top-blue border-white/20 dark:border-white/8 p-6 flex flex-col justify-between h-36 rounded-2xl">
            <div className="flex justify-between items-start text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <span>Energy Level</span>
              <div className="h-8 w-8 rounded-lg bg-white/10 dark:bg-black/10 flex items-center justify-center text-blue-500 shadow-glow-blue border border-white/25 dark:border-white/5">
                <Zap className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold">
                {avgEnergy.toFixed(1)} <span className="text-xs font-normal text-muted-foreground">/10</span>
              </div>
              <p className="text-[10px] text-muted-foreground font-semibold">Weekly vitality average</p>
            </div>
          </Card>

          {/* Anxiety Index */}
          <Card className="glass-card accent-top-amber border-white/20 dark:border-white/8 p-6 flex flex-col justify-between h-36 rounded-2xl">
            <div className="flex justify-between items-start text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <span>Anxiety Index</span>
              <div className="h-8 w-8 rounded-lg bg-white/10 dark:bg-black/10 flex items-center justify-center text-amber-500 shadow-glow-amber border border-white/25 dark:border-white/5">
                <Heart className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold">
                {avgAnxiety.toFixed(1)} <span className="text-xs font-normal text-muted-foreground">/10</span>
              </div>
              <p className="text-[10px] text-muted-foreground font-semibold">Weekly tension average</p>
            </div>
          </Card>

        </div>

        {/* ROLE BASED PANELS */}
        
        {/* 1. Therapist Dashboard Panel */}
        {user?.role === "therapist" && (
          <Card className="glass-card border-white/25 dark:border-white/8 p-6 space-y-4 rounded-2xl accent-top-blue animate-scale-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-500" /> Clinical Management Console
                </CardTitle>
                <CardDescription className="text-xs">Monitor logs and clinical screening records of assigned student clients</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleAction("Initiating collaborative telehealth consultation room.")} size="sm" className="text-xs rounded-xl flex items-center gap-1.5 h-9">
                  <Video className="h-4 w-4" /> Consult Room
                </Button>
                <Button onClick={() => handleAction("Opening write prescription & notes console.")} size="sm" variant="outline" className="glass border-white/20 text-xs rounded-xl h-9">
                  Write Notes
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3 pt-2">
              {mockTherapistClients.map((client, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/10 dark:bg-black/25 border border-white/10 dark:border-white/5 flex flex-col justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-xs text-foreground">{client.name}</h4>
                    <p className="text-[9px] text-muted-foreground">{client.email}</p>
                  </div>
                  <div className="space-y-1 pt-2 border-t border-white/5">
                    <p className="text-[10px] text-muted-foreground font-semibold flex justify-between">
                      <span>Last screening:</span>
                      <span className="font-bold text-foreground">{client.lastAssessment}</span>
                    </p>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-xs font-extrabold text-foreground">Score: {client.lastScore}</span>
                      <Badge className={`text-[8px] py-0 px-2 rounded-full border ${client.color}`}>
                        {client.severity}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-[9px] text-muted-foreground text-right italic font-semibold">{client.date}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* 2. Coordinator Dashboard Panel */}
        {user?.role === "coordinator" && (
          <Card className="glass-card border-white/25 dark:border-white/8 p-6 space-y-6 rounded-2xl accent-top-amber animate-scale-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-amber-500" /> Campus Wellness Analytics
                </CardTitle>
                <CardDescription className="text-xs">Anonymized stress trends and circle stats for campus administrators</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleAction("Opening university broadcast message panel.")} size="sm" className="text-xs rounded-xl flex items-center gap-1.5 h-9 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                  <Radio className="h-4 w-4" /> Broadcast Advisory
                </Button>
                <Button onClick={() => handleAction("Initiating coordinate meeting alert for crisis staff.")} size="sm" variant="destructive" className="text-xs rounded-xl h-9 flex items-center gap-1.5">
                  <Bell className="h-4 w-4" /> Alert Staff
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Aggregated metrics */}
              <div className="md:col-span-1 space-y-3 flex flex-col justify-center">
                <div className="p-3.5 rounded-xl bg-white/10 dark:bg-black/20 border border-white/10 dark:border-white/5">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Campus Stress Score</span>
                  <div className="text-2xl font-bold flex items-baseline gap-1.5">
                    6.2 <span className="text-xs font-normal text-muted-foreground">/10</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground pt-0.5">Moderate tension index</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/10 dark:bg-black/20 border border-white/10 dark:border-white/5">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Active Campus Members</span>
                  <div className="text-2xl font-bold">1,420</div>
                  <p className="text-[9px] text-muted-foreground pt-0.5">38% enrolled students</p>
                </div>
              </div>

              {/* Stress level across departments bar chart */}
              <div className="md:col-span-2 space-y-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Average Stress level by Faculty</span>
                <div className="h-44 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockCoordinatorStats}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                      <XAxis dataKey="department" stroke="currentColor" className="text-[9px] opacity-60" />
                      <YAxis domain={[0, 10]} stroke="currentColor" className="text-[9px] opacity-60" />
                      <Tooltip />
                      <Bar dataKey="avgStress" fill="var(--primary)" radius={[4, 4, 0, 0]}>
                        {mockCoordinatorStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </Card>
        )}

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Mood Area Chart */}
          <Card className="glass-card border-white/25 dark:border-white/8 p-6 space-y-4 rounded-2xl">
            <div>
              <CardTitle className="text-base font-bold">7-Day Mood Trend</CardTitle>
              <CardDescription className="text-xs">Visualize your daily state patterns</CardDescription>
            </div>
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" />
                  <XAxis dataKey="date" tickFormatter={formatDate} stroke="currentColor" className="text-[10px] opacity-50" />
                  <YAxis domain={[1, 5]} stroke="currentColor" className="text-[10px] opacity-50" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.75)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      borderRadius: "12px",
                      backdropFilter: "blur(20px)",
                      color: "#1e293b",
                    }}
                    labelFormatter={(val) => `Date: ${formatDate(val)}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="mood"
                    stroke="var(--primary)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#moodGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Energy vs Anxiety Comparison Bar Chart */}
          <Card className="glass-card border-white/25 dark:border-white/8 p-6 space-y-4 rounded-2xl">
            <div>
              <CardTitle className="text-base font-bold">Energy vs Anxiety</CardTitle>
              <CardDescription className="text-xs">Compare vitality against emotional pressure</CardDescription>
            </div>
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" />
                  <XAxis dataKey="date" tickFormatter={formatDate} stroke="currentColor" className="text-[10px] opacity-50" />
                  <YAxis domain={[0, 10]} stroke="currentColor" className="text-[10px] opacity-50" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.75)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      borderRadius: "12px",
                      backdropFilter: "blur(20px)",
                      color: "#1e293b",
                    }}
                  />
                  <Bar dataKey="energy" fill="#10b981" radius={[4, 4, 0, 0]} opacity={0.8} />
                  <Bar dataKey="anxiety" fill="#f59e0b" radius={[4, 4, 0, 0]} opacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Lower Grid: Pie Distribution & Recent Log Entries */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Pie Distribution */}
          {pieData.length > 0 ? (
            <Card className="glass-card border-white/25 dark:border-white/8 p-6 space-y-4 rounded-2xl">
              <div>
                <CardTitle className="text-base font-bold">Mood Distribution</CardTitle>
                <CardDescription className="text-xs">Breakdown of recorded states</CardDescription>
              </div>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} opacity={0.85} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          ) : (
            <Card className="glass-card border-white/25 dark:border-white/8 p-6 flex flex-col items-center justify-center h-80 text-muted-foreground rounded-2xl">
              <Calendar className="h-10 w-10 opacity-30 mb-2 animate-float" />
              <p className="text-sm">No entries logged yet to construct distribution.</p>
            </Card>
          )}

          {/* Recent Logs List */}
          <Card className="glass-card border-white/25 dark:border-white/8 p-6 space-y-4 rounded-2xl">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-base font-bold">Recent Reflections</CardTitle>
                <CardDescription className="text-xs">Your latest logged entries</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm" className="hover:scale-105 transition-transform text-xs">
                <Link href="/mood-tracker">
                  View All <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="space-y-3">
              {recentEntries.slice(0, 4).map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/10 dark:bg-black/10 border border-white/10 dark:border-white/5 hover:scale-[1.01] transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                    <div>
                      <p className="font-semibold text-sm capitalize">{entry.mood.replace("-", " ")}</p>
                      <p className="text-[10px] text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <Badge variant="outline" className="text-[9px] py-0 px-1 border-primary/20 bg-primary/5 text-primary">
                      E: {entry.energy}
                    </Badge>
                    <Badge variant="outline" className="text-[9px] py-0 px-1 border-secondary/20 bg-secondary/5 text-secondary">
                      A: {entry.anxiety}
                    </Badge>
                  </div>
                </div>
              ))}
              {recentEntries.length === 0 && (
                <div className="text-center py-12 text-muted-foreground flex flex-col items-center gap-4">
                  <Calendar className="h-10 w-10 opacity-30 animate-float" />
                  <p className="text-sm">No mood logs saved.</p>
                  <Button asChild size="sm" className="hover:scale-105">
                    <Link href="/mood-tracker">Create Log</Link>
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions Card */}
        <Card className="glass-card border-white/25 dark:border-white/8 p-6 space-y-4 rounded-2xl">
          <div>
            <CardTitle className="text-base font-bold">Quick Services</CardTitle>
            <CardDescription className="text-xs">Quick jump to wellness programs</CardDescription>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Button
              asChild
              className="py-6 flex-col gap-1.5 h-auto bg-transparent border-white/15 dark:border-white/5 hover:scale-105 transition-all text-foreground hover:bg-primary/10 rounded-xl"
              variant="outline"
            >
              <Link href="/mood-tracker">
                <Brain className="h-5 w-5 text-teal-500" />
                <span className="font-semibold text-xs">Track Mood</span>
              </Link>
            </Button>
            <Button
              asChild
              className="py-6 flex-col gap-1.5 h-auto bg-transparent border-white/15 dark:border-white/5 hover:scale-105 transition-all text-foreground hover:bg-primary/10 rounded-xl"
              variant="outline"
            >
              <Link href="/tests">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-xs">Assessments</span>
              </Link>
            </Button>
            <Button
              asChild
              className="py-6 flex-col gap-1.5 h-auto bg-transparent border-white/15 dark:border-white/5 hover:scale-105 transition-all text-foreground hover:bg-primary/10 rounded-xl"
              variant="outline"
            >
              <Link href="/profile">
                <Heart className="h-5 w-5 text-amber-500" />
                <span className="font-semibold text-xs">Profile & Logs</span>
              </Link>
            </Button>
          </div>
        </Card>

      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}
