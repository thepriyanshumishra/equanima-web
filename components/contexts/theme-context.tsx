"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface ThemeContextType {
  theme: "light" | "dark"
  language: "en" | "hi"
  defaultLanguage: "en" | "hi"
  userMode: "anonymous" | "user"
  toggleTheme: () => void
  setLanguage: (lang: "en" | "hi") => void
  setDefaultLanguage: (lang: "en" | "hi") => void
  toggleUserMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [language, setLanguage] = useState<"en" | "hi">("en")
  const [defaultLanguage, setDefaultLanguageState] = useState<"en" | "hi">("en")
  const [userMode, setUserMode] = useState<"anonymous" | "user">("anonymous")

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const savedLanguage = localStorage.getItem("language") as "en" | "hi" | null
    const savedDefaultLanguage = localStorage.getItem("defaultLanguage") as "en" | "hi" | null
    const savedUserMode = localStorage.getItem("userMode") as "anonymous" | "user" | null

    if (savedTheme) setTheme(savedTheme)
    if (savedDefaultLanguage) {
      setDefaultLanguageState(savedDefaultLanguage)
      if (!savedLanguage) setLanguage(savedDefaultLanguage)
    }
    if (savedLanguage) setLanguage(savedLanguage)
    if (savedUserMode) setUserMode(savedUserMode)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  useEffect(() => {
    localStorage.setItem("defaultLanguage", defaultLanguage)
  }, [defaultLanguage])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const toggleUserMode = () => {
    setUserMode((prev) => (prev === "anonymous" ? "user" : "anonymous"))
  }

  const setDefaultLanguage = (lang: "en" | "hi") => {
    setDefaultLanguageState(lang)
    setLanguage(lang) // Also set current language to new default
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        language,
        defaultLanguage,
        userMode,
        toggleTheme,
        setLanguage,
        setDefaultLanguage,
        toggleUserMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
