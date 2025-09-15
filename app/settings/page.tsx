"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/contexts/theme-context"
import { Save, Globe, Palette, User } from "lucide-react"

export default function SettingsPage() {
  const { theme, language, defaultLanguage, userMode, toggleTheme, setLanguage, setDefaultLanguage, toggleUserMode } =
    useTheme()
  const [showSaved, setShowSaved] = useState(false)

  const languages = {
    en: "English",
    es: "Español",
    fr: "Français",
    hi: "हिंदी",
  }

  const handleSave = () => {
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div className="text-center space-y-4 animate-slide-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-lg text-muted-foreground">Customize your Equanima experience</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Language Settings */}
          <Card
            className="glass hover:scale-105 transition-all duration-300 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500 animate-pulse" />
                Language Settings
              </CardTitle>
              <CardDescription>Choose your preferred language and set default</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-language">Current Language</Label>
                <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "es" | "fr" | "hi")}>
                  <SelectTrigger className="glass-subtle">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass">
                    {Object.entries(languages).map(([code, name]) => (
                      <SelectItem key={code} value={code}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-language">Default Language</Label>
                <Select
                  value={defaultLanguage}
                  onValueChange={(value) => setDefaultLanguage(value as "en" | "es" | "fr" | "hi")}
                >
                  <SelectTrigger className="glass-subtle">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass">
                    {Object.entries(languages).map(([code, name]) => (
                      <SelectItem key={code} value={code}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card
            className="glass hover:scale-105 transition-all duration-300 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-purple-500 animate-bounce" />
                Theme Settings
              </CardTitle>
              <CardDescription>Customize the appearance of your app</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch
                  id="dark-mode"
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* User Mode Settings */}
          <Card
            className="glass hover:scale-105 transition-all duration-300 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-green-500 animate-float" />
                User Mode
              </CardTitle>
              <CardDescription>Switch between anonymous and user mode</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="user-mode">User Mode</Label>
                <Switch
                  id="user-mode"
                  checked={userMode === "user"}
                  onCheckedChange={toggleUserMode}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-blue-500"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Current mode: <span className="font-medium capitalize">{userMode}</span>
              </p>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Card
            className="glass hover:scale-105 transition-all duration-300 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <CardContent className="pt-6">
              <Button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 hover:from-purple-600 hover:via-blue-600 hover:to-green-600 text-white font-medium hover:scale-105 transition-all duration-300"
              >
                <Save className="h-4 w-4 mr-2" />
                {showSaved ? "Settings Saved!" : "Save Settings"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
