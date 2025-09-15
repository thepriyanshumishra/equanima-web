"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface MoodEntry {
  id: string
  date: string
  mood: "very-happy" | "happy" | "neutral" | "sad" | "very-sad"
  energy: number // 1-10
  anxiety: number // 1-10
  notes: string
  tags: string[]
}

interface MoodContextType {
  entries: MoodEntry[]
  addEntry: (entry: Omit<MoodEntry, "id">) => void
  updateEntry: (id: string, entry: Partial<MoodEntry>) => void
  deleteEntry: (id: string) => void
  getWeeklyData: () => { date: string; mood: number; energy: number; anxiety: number }[]
}

const MoodContext = createContext<MoodContextType | undefined>(undefined)

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<MoodEntry[]>([])

  useEffect(() => {
    const savedEntries = localStorage.getItem("equanima_mood_entries")
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    } else {
      // Add some mock data for demo
      const mockEntries: MoodEntry[] = [
        {
          id: "1",
          date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          mood: "happy",
          energy: 7,
          anxiety: 3,
          notes: "Had a great day at work!",
          tags: ["work", "productive"],
        },
        {
          id: "2",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          mood: "neutral",
          energy: 5,
          anxiety: 5,
          notes: "Average day, nothing special",
          tags: ["routine"],
        },
        {
          id: "3",
          date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          mood: "very-happy",
          energy: 9,
          anxiety: 2,
          notes: "Celebrated my birthday with friends!",
          tags: ["celebration", "friends", "birthday"],
        },
      ]
      setEntries(mockEntries)
      localStorage.setItem("equanima_mood_entries", JSON.stringify(mockEntries))
    }
  }, [])

  const addEntry = (entry: Omit<MoodEntry, "id">) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: Date.now().toString(),
    }
    const updatedEntries = [...entries, newEntry]
    setEntries(updatedEntries)
    localStorage.setItem("equanima_mood_entries", JSON.stringify(updatedEntries))
  }

  const updateEntry = (id: string, updatedEntry: Partial<MoodEntry>) => {
    const updatedEntries = entries.map((entry) => (entry.id === id ? { ...entry, ...updatedEntry } : entry))
    setEntries(updatedEntries)
    localStorage.setItem("equanima_mood_entries", JSON.stringify(updatedEntries))
  }

  const deleteEntry = (id: string) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id)
    setEntries(updatedEntries)
    localStorage.setItem("equanima_mood_entries", JSON.stringify(updatedEntries))
  }

  const getWeeklyData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return date.toISOString().split("T")[0]
    })

    return last7Days.map((date) => {
      const entry = entries.find((e) => e.date === date)
      const moodValue = entry
        ? entry.mood === "very-sad"
          ? 1
          : entry.mood === "sad"
            ? 2
            : entry.mood === "neutral"
              ? 3
              : entry.mood === "happy"
                ? 4
                : 5
        : 3

      return {
        date,
        mood: moodValue,
        energy: entry?.energy || 5,
        anxiety: entry?.anxiety || 5,
      }
    })
  }

  return (
    <MoodContext.Provider value={{ entries, addEntry, updateEntry, deleteEntry, getWeeklyData }}>
      {children}
    </MoodContext.Provider>
  )
}

export function useMood() {
  const context = useContext(MoodContext)
  if (context === undefined) {
    throw new Error("useMood must be used within a MoodProvider")
  }
  return context
}
