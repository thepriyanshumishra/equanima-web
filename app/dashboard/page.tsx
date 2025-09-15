"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AuthProvider, useAuth } from "@/components/contexts/auth-context"
import { MoodProvider, useMood } from "@/components/contexts/mood-context"
import { AuthGuard } from "@/components/auth-guard"
import { BottomNavigation } from "@/components/bottom-navigation"
import { MitraAIChat } from "@/components/mitra-ai-chat"
import {
  LineChart,
  Line,
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
import { TrendingUp, TrendingDown, Brain, Zap, Heart, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const MOOD_COLORS = {
  "very-happy": "#10b981",
  happy: "#34d399",
  neutral: "#fbbf24",
  sad: "#fb923c",
  "very-sad": "#ef4444",
}

function DashboardContent() {
  const { user } = useAuth()
  const { entries, getWeeklyData } = useMood()

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

  // Trend calculation
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

  return (
    <div className="min-h-screen pb-20 pt-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="glass-strong rounded-2xl p-6 bg-gradient-to-r from-primary/10 to-accent/10 animate-fade-down">
          <h1 className="text-3xl font-bold mb-2 animate-bounce-gentle">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground animate-fade-up animate-delay-200">
            Here's your mental wellness overview for this week.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="glass animate-scale-up animate-delay-300 transition-all duration-300 hover:scale-105 hover:glass-strong">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-2 animate-bounce-gentle animate-delay-400">
                {avgMood.toFixed(1)}/5
                {moodTrend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500 animate-bounce" />
                ) : moodTrend === "down" ? (
                  <TrendingDown className="h-4 w-4 text-red-500 animate-bounce" />
                ) : null}
              </div>
              <p className="text-xs text-muted-foreground animate-fade-up animate-delay-500">
                {moodTrend === "up" ? "Improving" : moodTrend === "down" ? "Declining" : "Stable"} this week
              </p>
            </CardContent>
          </Card>

          <Card className="glass animate-scale-up animate-delay-400 transition-all duration-300 hover:scale-105 hover:glass-strong">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Energy Level</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground animate-pulse animate-delay-100" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold animate-bounce-gentle animate-delay-500">
                {avgEnergy.toFixed(1)}/10
              </div>
              <p className="text-xs text-muted-foreground animate-fade-up animate-delay-600">Weekly average</p>
            </CardContent>
          </Card>

          <Card className="glass animate-scale-up animate-delay-500 transition-all duration-300 hover:scale-105 hover:glass-strong">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Anxiety Level</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground animate-pulse animate-delay-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold animate-bounce-gentle animate-delay-600">
                {avgAnxiety.toFixed(1)}/10
              </div>
              <p className="text-xs text-muted-foreground animate-fade-up animate-delay-700">Weekly average</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="glass animate-slide-right animate-delay-600 transition-all duration-300 hover:scale-105 hover:glass-strong">
            <CardHeader>
              <CardTitle className="animate-fade-up animate-delay-700">7-Day Mood Trend</CardTitle>
              <CardDescription className="animate-fade-up animate-delay-800">
                Track your mood patterns over the past week
              </CardDescription>
            </CardHeader>
            <CardContent className="animate-fade-up animate-delay-900">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                  <XAxis dataKey="date" tickFormatter={formatDate} stroke="rgba(148, 163, 184, 0.5)" />
                  <YAxis domain={[1, 5]} stroke="rgba(148, 163, 184, 0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid rgba(148, 163, 184, 0.3)",
                      borderRadius: "8px",
                      backdropFilter: "blur(10px)",
                    }}
                    labelFormatter={(value) => `Date: ${formatDate(value)}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="#0891b2"
                    strokeWidth={3}
                    dot={{ fill: "#0891b2", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#0891b2", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass animate-slide-left animate-delay-700 transition-all duration-300 hover:scale-105 hover:glass-strong">
            <CardHeader>
              <CardTitle className="animate-fade-up animate-delay-800">Energy vs Anxiety</CardTitle>
              <CardDescription className="animate-fade-up animate-delay-900">
                Compare your energy and anxiety levels
              </CardDescription>
            </CardHeader>
            <CardContent className="animate-fade-up animate-delay-1000">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                  <XAxis dataKey="date" tickFormatter={formatDate} stroke="rgba(148, 163, 184, 0.5)" />
                  <YAxis domain={[0, 10]} stroke="rgba(148, 163, 184, 0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid rgba(148, 163, 184, 0.3)",
                      borderRadius: "8px",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Bar dataKey="energy" fill="#10b981" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="anxiety" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {pieData.length > 0 && (
            <Card className="glass animate-scale-up animate-delay-800 transition-all duration-300 hover:scale-105 hover:glass-strong">
              <CardHeader>
                <CardTitle className="animate-slide-right animate-delay-900">Mood Distribution</CardTitle>
                <CardDescription className="animate-fade-up animate-delay-1000">
                  Overall breakdown of your recorded moods
                </CardDescription>
              </CardHeader>
              <CardContent className="animate-fade-up animate-delay-1100">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          <Card className="glass animate-scale-up animate-delay-900 transition-all duration-300 hover:scale-105 hover:glass-strong">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="animate-slide-left animate-delay-1000">Recent Entries</CardTitle>
                <CardDescription className="animate-fade-up animate-delay-1100">
                  Your latest mood recordings
                </CardDescription>
              </div>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="animate-bounce-gentle animate-delay-1200 transition-all duration-300 hover:scale-110"
              >
                <Link href="/mood-tracker">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEntries.slice(0, 5).map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`flex items-center justify-between glass-subtle rounded-lg p-3 transition-all duration-300 hover:glass hover:scale-105 animate-slide-up animate-delay-${1300 + index * 100}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl animate-bounce-gentle">{getMoodEmoji(entry.mood)}</span>
                      <div>
                        <p className="font-medium capitalize">{entry.mood.replace("-", " ")}</p>
                        <p className="text-sm text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs animate-scale-up animate-delay-1400">
                          E: {entry.energy}
                        </Badge>
                        <Badge variant="outline" className="text-xs animate-scale-up animate-delay-1500">
                          A: {entry.anxiety}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                {recentEntries.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground animate-fade-up animate-delay-1300">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50 animate-float" />
                    <p>No mood entries yet</p>
                    <Button
                      asChild
                      className="mt-4 animate-bounce-gentle animate-delay-1400 transition-all duration-300 hover:scale-110"
                      size="sm"
                    >
                      <Link href="/mood-tracker">Start Tracking</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass animate-fade-up animate-delay-1000 transition-all duration-300 hover:scale-105 hover:glass-strong">
          <CardHeader>
            <CardTitle className="animate-slide-right animate-delay-1100">Quick Actions</CardTitle>
            <CardDescription className="animate-fade-up animate-delay-1200">
              Continue your wellness journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                asChild
                className={`h-auto p-4 flex-col gap-2 bg-transparent transition-all duration-300 hover:scale-110 hover:rotate-3 animate-bounce-gentle animate-delay-1300`}
                variant="outline"
              >
                <Link href="/mood-tracker">
                  <Brain className="h-6 w-6 animate-pulse" />
                  <span>Track Mood</span>
                </Link>
              </Button>
              <Button
                asChild
                className={`h-auto p-4 flex-col gap-2 bg-transparent transition-all duration-300 hover:scale-110 hover:rotate-3 animate-bounce-gentle animate-delay-1400`}
                variant="outline"
              >
                <Link href="/tests">
                  <Calendar className="h-6 w-6 animate-pulse animate-delay-100" />
                  <span>Take Assessment</span>
                </Link>
              </Button>
              <Button
                asChild
                className={`h-auto p-4 flex-col gap-2 bg-transparent transition-all duration-300 hover:scale-110 hover:rotate-3 animate-bounce-gentle animate-delay-1500`}
                variant="outline"
              >
                <Link href="/profile">
                  <Heart className="h-6 w-6 animate-pulse animate-delay-200" />
                  <span>View Profile</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AuthProvider>
      <MoodProvider>
        <AuthGuard>
          <DashboardContent />
          <BottomNavigation />
          <MitraAIChat />
        </AuthGuard>
      </MoodProvider>
    </AuthProvider>
  )
}
