"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthProvider, useAuth } from "@/components/contexts/auth-context"
import { MoodProvider } from "@/components/contexts/mood-context"
import { AuthGuard } from "@/components/auth-guard"
import { BottomNavigation } from "@/components/bottom-navigation"
import { MitraAIChat } from "@/components/mitra-ai-chat"
import { User, Settings, Bell, Shield, Download, Trash2, LogOut, Edit, Save, X, HelpCircle, Mail } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

function ProfileContent() {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    phone: "",
  })

  // Settings state
  const [settings, setSettings] = useState({
    notifications: {
      moodReminders: true,
      weeklyReports: true,
      testReminders: false,
      mitraAIUpdates: true,
    },
    privacy: {
      dataSharing: false,
      analytics: true,
      crashReports: true,
    },
    preferences: {
      darkMode: false,
      language: "en",
      timezone: "UTC",
    },
  })

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    })
    setIsEditing(false)
  }

  const handleSettingChange = (category: string, setting: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }))
    toast({
      title: "Setting updated",
      description: "Your preference has been saved.",
    })
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  const handleExportData = () => {
    toast({
      title: "Data export started",
      description: "Your data export will be ready shortly. You'll receive an email when it's complete.",
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "Please check your email for confirmation instructions.",
      variant: "destructive",
    })
  }

  return (
    <div className="min-h-screen pb-20 pt-6 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Profile & Settings</h1>
          <p className="text-muted-foreground">Manage your account and customize your experience</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 glass-subtle">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>Update your personal information and preferences</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => (isEditing ? setIsEditing(false) : setIsEditing(true))}
                    className="glass-subtle bg-transparent"
                  >
                    {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Image
                      src={user?.avatar || "/placeholder.svg?height=80&width=80"}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="rounded-full border-4 border-primary/20"
                    />
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                        onClick={() =>
                          toast({
                            title: "Feature coming soon",
                            description: "Avatar upload will be available in a future update.",
                          })
                        }
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{user?.name}</h3>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <Badge variant="secondary" className="mt-1">
                      Member since {new Date().getFullYear()}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Profile Form */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      disabled={!isEditing}
                      className={!isEditing ? "glass-subtle border-0" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                      disabled={!isEditing}
                      className={!isEditing ? "glass-subtle border-0" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Optional"
                      className={!isEditing ? "glass-subtle border-0" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input
                      id="timezone"
                      value={settings.preferences.timezone}
                      disabled={!isEditing}
                      className={!isEditing ? "glass-subtle border-0" : ""}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Tell us a bit about yourself..."
                    className={!isEditing ? "glass-subtle border-0" : ""}
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <Button onClick={handleSaveProfile} className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose what notifications you'd like to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mood Tracking Reminders</p>
                      <p className="text-sm text-muted-foreground">Daily reminders to log your mood</p>
                    </div>
                    <Switch
                      checked={settings.notifications.moodReminders}
                      onCheckedChange={(checked) => handleSettingChange("notifications", "moodReminders", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Reports</p>
                      <p className="text-sm text-muted-foreground">Summary of your weekly mental health insights</p>
                    </div>
                    <Switch
                      checked={settings.notifications.weeklyReports}
                      onCheckedChange={(checked) => handleSettingChange("notifications", "weeklyReports", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Assessment Reminders</p>
                      <p className="text-sm text-muted-foreground">Reminders to take mental health assessments</p>
                    </div>
                    <Switch
                      checked={settings.notifications.testReminders}
                      onCheckedChange={(checked) => handleSettingChange("notifications", "testReminders", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">MitraAI Updates</p>
                      <p className="text-sm text-muted-foreground">New features and improvements to MitraAI</p>
                    </div>
                    <Switch
                      checked={settings.notifications.mitraAIUpdates}
                      onCheckedChange={(checked) => handleSettingChange("notifications", "mitraAIUpdates", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Data
                </CardTitle>
                <CardDescription>Control how your data is used and shared</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Data Sharing</p>
                      <p className="text-sm text-muted-foreground">
                        Share anonymized data to help improve mental health research
                      </p>
                    </div>
                    <Switch
                      checked={settings.privacy.dataSharing}
                      onCheckedChange={(checked) => handleSettingChange("privacy", "dataSharing", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Usage Analytics</p>
                      <p className="text-sm text-muted-foreground">Help us improve the app with usage analytics</p>
                    </div>
                    <Switch
                      checked={settings.privacy.analytics}
                      onCheckedChange={(checked) => handleSettingChange("privacy", "analytics", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Crash Reports</p>
                      <p className="text-sm text-muted-foreground">Automatically send crash reports to help fix bugs</p>
                    </div>
                    <Switch
                      checked={settings.privacy.crashReports}
                      onCheckedChange={(checked) => handleSettingChange("privacy", "crashReports", checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Data Management</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button variant="outline" onClick={handleExportData} className="glass-subtle bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export My Data
                    </Button>
                    <Button variant="outline" className="glass-subtle bg-transparent">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Privacy Policy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your account preferences and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                    </div>
                    <Switch
                      checked={settings.preferences.darkMode}
                      onCheckedChange={(checked) => handleSettingChange("preferences", "darkMode", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Language</p>
                      <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                    </div>
                    <Badge variant="outline">English</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Support & Help</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button variant="outline" className="glass-subtle bg-transparent">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Help Center
                    </Button>
                    <Button variant="outline" className="glass-subtle bg-transparent">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold text-destructive">Danger Zone</h4>
                  <div className="space-y-2">
                    <Button variant="outline" onClick={handleLogout} className="w-full bg-transparent">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteAccount} className="w-full">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <AuthProvider>
      <MoodProvider>
        <AuthGuard>
          <ProfileContent />
          <BottomNavigation />
          <MitraAIChat />
        </AuthGuard>
      </MoodProvider>
    </AuthProvider>
  )
}
