"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/contexts/auth-context"
import { useMood } from "@/components/contexts/mood-context"
import { AuthGuard } from "@/components/auth-guard"
import { User, Shield, Key, Download, Trash2, Calendar, Mail, Phone, BookOpen, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useSearchParams } from "next/navigation"

export default function ProfilePage() {
  const { user, logout, deleteAccount, updateUser } = useAuth()
  const { entries } = useMood()
  const { toast } = useToast()
  
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "overview"

  // Edit fields
  const [profileName, setProfileName] = useState(user?.name || "")
  const [profileEmail, setProfileEmail] = useState(user?.email || "")
  const [profilePhone, setProfilePhone] = useState(user?.phone || "")
  const [profileBio, setProfileBio] = useState(user?.bio || "")
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    // Simulate small latency
    await new Promise((resolve) => setTimeout(resolve, 600))

    updateUser({
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
      bio: profileBio,
    })

    toast({
      title: "Profile Updated",
      description: "Your account details have been successfully saved.",
    })
    setIsUpdating(false)
  }

  const handleExportData = () => {
    const dataStr = JSON.stringify({ user, moodEntries: entries }, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `equanima_export_${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Data Exported",
      description: "Your personal logs have been compiled into a JSON download.",
    })
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
    <AuthGuard>
      <div className="min-h-screen pb-20 pt-6 px-4">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          
          {/* Header Banner */}
          <div className="glass-strong rounded-3xl p-8 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 border-white/20 dark:border-white/8 flex flex-col sm:flex-row items-center gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-36 h-36 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Avatar bubble */}
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-extrabold text-3xl shadow-lg border-2 border-white/20 flex-shrink-0 animate-float">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            
            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{user?.name}</h1>
              <p className="text-muted-foreground text-xs sm:text-sm">{user?.email}</p>
              {user?.bio && (
                <p className="text-xs text-muted-foreground max-w-md italic mt-1 leading-relaxed">
                  "{user.bio}"
                </p>
              )}
            </div>
            
            <Button
              variant="destructive"
              onClick={logout}
              className="px-6 py-5 rounded-xl font-bold hover:scale-105 transition-all text-xs"
            >
              Log Out
            </Button>
          </div>

          {/* Profile Tabs */}
          <Tabs defaultValue={initialTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 glass border border-white/25 dark:border-white/8 rounded-2xl p-1 max-w-md">
              <TabsTrigger value="overview" className="rounded-xl text-xs font-bold py-2">
                Overview
              </TabsTrigger>
              <TabsTrigger value="account" className="rounded-xl text-xs font-bold py-2">
                Account Settings
              </TabsTrigger>
              <TabsTrigger value="logs" className="rounded-xl text-xs font-bold py-2">
                My Logs ({entries.length})
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab Content */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                
                {/* Account Details */}
                <Card className="glass-card border-white/25 dark:border-white/8 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" /> Profile Details
                    </CardTitle>
                    <CardDescription className="text-xs">Your registered account metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 dark:bg-black/10 border border-white/10 dark:border-white/5">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-[10px] text-muted-foreground font-semibold">Email Address</p>
                        <p className="font-semibold text-xs text-foreground">{user?.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 dark:bg-black/10 border border-white/10 dark:border-white/5">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-[10px] text-muted-foreground font-semibold">Phone Number</p>
                        <p className="font-semibold text-xs text-foreground">{user?.phone || "Not set"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 dark:bg-black/10 border border-white/10 dark:border-white/5">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-[10px] text-muted-foreground font-semibold">Joined Platform</p>
                        <p className="font-semibold text-xs text-foreground">June 2026</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Privacy & Exports */}
                <Card className="glass-card border-white/25 dark:border-white/8 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" /> Data & Privacy Controls
                    </CardTitle>
                    <CardDescription className="text-xs">Download or remove personal history logs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Your mental wellness telemetry data is stored securely in your browser's local sandbox storage. You hold absolute control over it.
                    </p>
                    <div className="flex flex-col gap-2 pt-2">
                      <Button
                        onClick={handleExportData}
                        variant="outline"
                        className="glass border-white/20 bg-transparent flex items-center justify-center gap-2 py-5 rounded-xl font-bold text-xs"
                      >
                        <Download className="h-4 w-4" /> Export Personal Data
                      </Button>
                      
                      <Button
                        onClick={deleteAccount}
                        variant="destructive"
                        className="flex items-center justify-center gap-2 py-5 rounded-xl font-bold text-xs"
                      >
                        <Trash2 className="h-4 w-4" /> Delete Account & History
                      </Button>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </TabsContent>

            {/* Account Settings Tab Content */}
            <TabsContent value="account">
              <Card className="glass-card border-white/25 dark:border-white/8 rounded-2xl max-w-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Key className="h-5 w-5 text-primary" /> Edit Account Profile
                  </CardTitle>
                  <CardDescription className="text-xs">Modify your user details and wellness bio</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-bold text-foreground">Full Name</Label>
                        <Input
                          id="name"
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="glass-subtle border-0 rounded-xl"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-bold text-foreground">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileEmail}
                          onChange={(e) => setProfileEmail(e.target.value)}
                          className="glass-subtle border-0 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-bold text-foreground">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        placeholder="Add your contact..."
                        className="glass-subtle border-0 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-xs font-bold text-foreground">Wellness Bio / Motto</Label>
                      <Textarea
                        id="bio"
                        value={profileBio}
                        onChange={(e) => setProfileBio(e.target.value)}
                        placeholder="Write a grounding motto for yourself..."
                        className="glass-subtle border-0 rounded-xl min-h-[90px] leading-relaxed"
                      />
                    </div>

                    <Button type="submit" className="w-full py-5 rounded-xl font-bold text-xs" disabled={isUpdating}>
                      {isUpdating ? "Saving..." : "Save Details"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Logs Tab Content */}
            <TabsContent value="logs">
              <Card className="glass-card border-white/25 dark:border-white/8 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" /> Daily Wellness Registry
                  </CardTitle>
                  <CardDescription className="text-xs">Complete chronological logs of saved mood logs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {entries.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {entries.map((entry) => (
                        <div
                          key={entry.id}
                          className="p-4 rounded-2xl bg-white/10 dark:bg-black/10 border border-white/10 dark:border-white/5 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                              <div>
                                <p className="font-bold text-sm capitalize">{entry.mood.replace("-", " ")}</p>
                                <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                                  <Calendar className="h-3 w-3" /> {new Date(entry.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1 items-end">
                              <Badge variant="outline" className="text-[8px] py-0 px-1 border-primary/20 text-primary">
                                Energy: {entry.energy}/10
                              </Badge>
                              <Badge variant="outline" className="text-[8px] py-0 px-1 border-secondary/20 text-secondary">
                                Anxiety: {entry.anxiety}/10
                              </Badge>
                            </div>
                          </div>
                          {entry.notes && (
                            <p className="text-xs text-muted-foreground leading-relaxed italic">
                              "{entry.notes}"
                            </p>
                          )}
                          {entry.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {entry.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-[8px] py-0 px-1.5 opacity-80">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 text-muted-foreground flex flex-col items-center gap-4">
                      <Calendar className="h-12 w-12 opacity-30 animate-float" />
                      <p className="text-sm">You haven't logged any daily wellness metrics yet.</p>
                      <Button asChild className="hover:scale-105 rounded-xl font-bold py-5 px-6">
                        <a href="/mood-tracker">Log Your First Entry</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </AuthGuard>
  )
}
