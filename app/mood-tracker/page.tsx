"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { useMood } from "@/components/contexts/mood-context"
import { AuthGuard } from "@/components/auth-guard"
import { Calendar, Plus, X, Brain, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const moodOptions = [
  { value: "very-happy", emoji: "😄", label: "Very Happy", color: "from-emerald-400 to-green-500" },
  { value: "happy", emoji: "😊", label: "Happy", color: "from-green-400 to-teal-400" },
  { value: "neutral", emoji: "😐", label: "Neutral", color: "from-yellow-400 to-amber-500" },
  { value: "sad", emoji: "😢", label: "Sad", color: "from-orange-400 to-red-400" },
  { value: "very-sad", emoji: "😭", label: "Very Sad", color: "from-red-500 to-rose-600" },
] as const

const commonTags = [
  "work",
  "family",
  "friends",
  "exercise",
  "sleep",
  "stress",
  "anxiety",
  "productivity",
  "fatigue",
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

  const recentEntries = entries.slice(-4).reverse()

  return (
    <div className="min-h-screen pb-20 pt-6 px-4">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in-up">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">How is your mind today?</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Log your daily mental wellness logs to construct deep insights and understand patterns over time.
          </p>
        </div>

        {/* Input Form Card */}
        <Card className="glass-strong border-white/30 shadow-2xl p-2 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-primary" /> Today's Entry
            </CardTitle>
            <CardDescription className="text-xs">
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Mood Selection Row */}
              <div className="space-y-3">
                <Label className="text-sm font-bold text-foreground">Select Current State</Label>
                <div className="grid grid-cols-5 gap-2">
                  {moodOptions.map((mood) => {
                    const isSelected = selectedMood === mood.value
                    return (
                      <button
                        key={mood.value}
                        type="button"
                        onClick={() => setSelectedMood(mood.value)}
                        className={`
                          p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 relative overflow-hidden border
                          ${isSelected 
                            ? `bg-gradient-to-br ${mood.color} text-white border-transparent scale-105 shadow-md` 
                            : "glass hover:scale-105 hover:bg-white/30 border-white/20 dark:border-white/5 text-foreground"
                          }
                        `}
                      >
                        <span className={`text-3xl transition-transform duration-300 ${isSelected ? "scale-110 animate-bounce-gentle" : ""}`}>
                          {mood.emoji}
                        </span>
                        <span className="text-[10px] font-bold tracking-tight">{mood.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                
                {/* Energy Slider */}
                <div className="space-y-3 p-4 rounded-2xl glass-subtle border-white/10">
                  <Label className="text-xs font-bold text-muted-foreground flex justify-between">
                    <span>Energy level</span>
                    <span className="text-primary font-bold">{energy[0]} / 10</span>
                  </Label>
                  <Slider
                    value={energy}
                    onValueChange={setEnergy}
                    max={10}
                    min={1}
                    step={1}
                    className="py-2"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                    <span>Lethargic</span>
                    <span>Hyperactive</span>
                  </div>
                </div>

                {/* Anxiety Slider */}
                <div className="space-y-3 p-4 rounded-2xl glass-subtle border-white/10">
                  <Label className="text-xs font-bold text-muted-foreground flex justify-between">
                    <span>Anxiety / Tension</span>
                    <span className="text-primary font-bold">{anxiety[0]} / 10</span>
                  </Label>
                  <Slider
                    value={anxiety}
                    onValueChange={setAnxiety}
                    max={10}
                    min={1}
                    step={1}
                    className="py-2"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                    <span>Serene</span>
                    <span>Tense / Panicky</span>
                  </div>
                </div>

              </div>

              {/* Tags Selector */}
              <div className="space-y-3">
                <Label className="text-sm font-bold text-foreground">Subject Tags</Label>
                <div className="flex flex-wrap gap-1.5">
                  {commonTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag)
                    return (
                      <Badge
                        key={tag}
                        variant={isSelected ? "default" : "outline"}
                        className={`cursor-pointer transition-all hover:scale-105 rounded-full px-3 py-1 text-xs
                          ${isSelected 
                            ? "bg-primary text-primary-foreground shadow-sm" 
                            : "glass-subtle text-foreground border-white/20 dark:border-white/5"
                          }
                        `}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    )
                  })}
                </div>
                
                {/* Custom Tag input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom subject tag..."
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    className="glass-subtle border-0 rounded-xl"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomTag())}
                  />
                  <Button
                    type="button"
                    onClick={addCustomTag}
                    variant="outline"
                    className="glass border-white/20 bg-transparent rounded-xl"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 rounded-full px-2.5 py-0.5 text-xs flex items-center gap-1"
                      >
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)}>
                          <X className="h-3 w-3 hover:scale-110" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Reflection Notes Textarea */}
              <div className="space-y-3">
                <Label htmlFor="notes" className="text-sm font-bold text-foreground">Daily Reflections</Label>
                <Textarea
                  id="notes"
                  placeholder="Record what triggers your state. Write your thoughts down..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="glass-subtle border-0 min-h-[110px] rounded-2xl leading-relaxed"
                />
              </div>

              {/* Save Button */}
              <Button
                type="submit"
                className="w-full py-6 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl animate-pulse-glow"
              >
                Log Mind State
              </Button>

            </form>
          </CardContent>
        </Card>

        {/* Recent logs card list */}
        {recentEntries.length > 0 && (
          <Card className="glass-card border-white/25 dark:border-white/8 p-6 space-y-4">
            <div>
              <CardTitle className="text-lg font-bold">Recent Mind Logs</CardTitle>
              <CardDescription className="text-xs">Your last few recordings</CardDescription>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {recentEntries.map((entry) => {
                const moodOption = moodOptions.find((m) => m.value === entry.mood)
                return (
                  <div
                    key={entry.id}
                    className="glass-subtle border-white/10 p-4 rounded-2xl flex flex-col justify-between space-y-3 hover:scale-[1.01] transition-transform"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{moodOption?.emoji}</span>
                        <div>
                          <p className="font-bold text-sm capitalize">{moodOption?.label}</p>
                          <p className="text-[9px] text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant="outline" className="text-[8px] py-0 px-1 border-primary/20 text-primary">
                          Energy: {entry.energy}/10
                        </Badge>
                        <Badge variant="outline" className="text-[8px] py-0 px-1 border-secondary/20 text-secondary">
                          Anxiety: {entry.anxiety}/10
                        </Badge>
                      </div>
                    </div>
                    {entry.notes && (
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed italic">
                        "{entry.notes}"
                      </p>
                    )}
                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {entry.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-[8px] py-0 px-1.5 opacity-80"
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
          </Card>
        )}

      </div>
    </div>
  )
}

export default function MoodTrackerPage() {
  return (
    <AuthGuard>
      <MoodTrackerContent />
    </AuthGuard>
  )
}
