"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { AuthProvider } from "@/components/contexts/auth-context"
import { MoodProvider, useMood } from "@/components/contexts/mood-context"
import { AuthGuard } from "@/components/auth-guard"
import { BottomNavigation } from "@/components/bottom-navigation"
import { MitraAIChat } from "@/components/mitra-ai-chat"
import { Calendar, Plus, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const moodOptions = [
  { value: "very-happy", emoji: "😄", label: "Very Happy", color: "bg-green-500" },
  { value: "happy", emoji: "😊", label: "Happy", color: "bg-green-400" },
  { value: "neutral", emoji: "😐", label: "Neutral", color: "bg-yellow-400" },
  { value: "sad", emoji: "😢", label: "Sad", color: "bg-orange-400" },
  { value: "very-sad", emoji: "😭", label: "Very Sad", color: "bg-red-400" },
] as const

const commonTags = [
  "work",
  "family",
  "friends",
  "exercise",
  "sleep",
  "stress",
  "anxiety",
  "happy",
  "productive",
  "tired",
  "social",
  "alone",
]

function MoodTrackerContent() {
  const { addEntry, entries } = useMood()
  const { toast } = useToast()
  const [selectedMood, setSelectedMood] = useState<(typeof moodOptions)[0]["value"] | null>(null)
  const [energy, setEnergy] = useState([5])
  const [anxiety, setAnxiety] = useState([5])
  const [notes, setNotes] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling today before saving.",
        variant: "destructive",
      })
      return
    }

    addEntry({
      date: new Date().toISOString().split("T")[0],
      mood: selectedMood,
      energy: energy[0],
      anxiety: anxiety[0],
      notes,
      tags: selectedTags,
    })

    toast({
      title: "Mood entry saved!",
      description: "Your mood has been recorded successfully.",
    })

    // Reset form
    setSelectedMood(null)
    setEnergy([5])
    setAnxiety([5])
    setNotes("")
    setSelectedTags([])
  }

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags([...selectedTags, customTag.trim()])
      setCustomTag("")
    }
  }

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      removeTag(tag)
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const recentEntries = entries.slice(-5).reverse()

  return (
    <div className="min-h-screen pb-20 pt-6 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center animate-fade-down">
          <h1 className="text-3xl font-bold mb-2 animate-bounce-gentle">How are you feeling today?</h1>
          <p className="text-muted-foreground animate-fade-up animate-delay-200">
            Track your mood and emotions to better understand your mental health patterns
          </p>
        </div>

        <Card className="glass-strong animate-scale-up animate-delay-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 animate-slide-right animate-delay-400">
              <Calendar className="h-5 w-5 text-primary animate-pulse" />
              Today's Mood Entry
            </CardTitle>
            <CardDescription className="animate-fade-up animate-delay-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3 animate-fade-up animate-delay-600">
                <Label className="text-base font-semibold">How do you feel?</Label>
                <div className="grid grid-cols-5 gap-2">
                  {moodOptions.map((mood, index) => (
                    <button
                      key={mood.value}
                      type="button"
                      onClick={() => setSelectedMood(mood.value)}
                      className={`
                        p-4 rounded-xl glass transition-all duration-300 hover:scale-110 hover:glass-strong hover:rotate-3
                        animate-bounce-gentle animate-delay-${700 + index * 100}
                        ${selectedMood === mood.value ? "ring-2 ring-primary glass-strong scale-110 rotate-3" : ""}
                      `}
                    >
                      <div className="text-3xl mb-2 animate-float">{mood.emoji}</div>
                      <div className="text-xs font-medium">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 animate-slide-right animate-delay-800">
                <Label className="text-base font-semibold">Energy Level: {energy[0]}/10</Label>
                <div className="px-2">
                  <Slider
                    value={energy}
                    onValueChange={setEnergy}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full transition-all duration-300 hover:scale-105"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 animate-slide-right animate-delay-900">
                <Label className="text-base font-semibold">Anxiety Level: {anxiety[0]}/10</Label>
                <div className="px-2">
                  <Slider
                    value={anxiety}
                    onValueChange={setAnxiety}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full transition-all duration-300 hover:scale-105"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Calm</span>
                    <span>Anxious</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 animate-fade-up animate-delay-1000">
                <Label className="text-base font-semibold">Tags (optional)</Label>
                <div className="flex flex-wrap gap-2">
                  {commonTags.map((tag, index) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-1 animate-bounce-gentle animate-delay-${1100 + index * 50} ${
                        selectedTags.includes(tag) ? "bg-primary text-primary-foreground" : "glass-subtle hover:glass"
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 animate-slide-up animate-delay-1200">
                  <Input
                    placeholder="Add custom tag..."
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    className="glass-subtle border-0 transition-all duration-300 hover:glass focus:glass-strong focus:scale-105"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomTag())}
                  />
                  <Button
                    type="button"
                    onClick={addCustomTag}
                    size="sm"
                    variant="outline"
                    className="glass-subtle bg-transparent transition-all duration-300 hover:scale-110 hover:rotate-12"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 animate-fade-up animate-delay-1300">
                    {selectedTags.map((tag, index) => (
                      <Badge
                        key={tag}
                        variant="default"
                        className={`bg-primary text-primary-foreground animate-scale-up animate-delay-${1400 + index * 100}`}
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5 transition-all duration-300 hover:scale-125 hover:rotate-90"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3 animate-slide-up animate-delay-1400">
                <Label htmlFor="notes" className="text-base font-semibold">
                  Notes (optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="What's on your mind? How was your day?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="glass-subtle border-0 min-h-[100px] transition-all duration-300 hover:glass focus:glass-strong focus:scale-105"
                />
              </div>

              <Button
                type="submit"
                className="w-full animate-pulse-gentle animate-delay-1500 transition-all duration-300 hover:scale-105"
                size="lg"
              >
                Save Mood Entry
              </Button>
            </form>
          </CardContent>
        </Card>

        {recentEntries.length > 0 && (
          <Card className="glass animate-fade-up animate-delay-1600">
            <CardHeader>
              <CardTitle className="animate-slide-right">Recent Entries</CardTitle>
              <CardDescription className="animate-fade-up animate-delay-1700">
                Your last few mood entries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEntries.map((entry, index) => {
                  const moodOption = moodOptions.find((m) => m.value === entry.mood)
                  return (
                    <div
                      key={entry.id}
                      className={`glass-subtle rounded-lg p-4 transition-all duration-300 hover:glass hover:scale-105 animate-slide-right animate-delay-${1800 + index * 100}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl animate-bounce-gentle">{moodOption?.emoji}</span>
                          <div>
                            <p className="font-medium">{moodOption?.label}</p>
                            <p className="text-sm text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <p>Energy: {entry.energy}/10</p>
                          <p>Anxiety: {entry.anxiety}/10</p>
                        </div>
                      </div>
                      {entry.notes && <p className="text-sm text-muted-foreground mb-2">{entry.notes}</p>}
                      {entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {entry.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className={`text-xs animate-scale-up animate-delay-${2000 + tagIndex * 50}`}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default function MoodTrackerPage() {
  return (
    <AuthProvider>
      <MoodProvider>
        <AuthGuard>
          <MoodTrackerContent />
          <BottomNavigation />
          <MitraAIChat />
        </AuthGuard>
      </MoodProvider>
    </AuthProvider>
  )
}
