"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon, User } from "lucide-react"
import { useAuth } from "@/components/contexts/auth-context"
import { useTheme } from "@/components/contexts/theme-context"
import { useTranslation } from "@/lib/translations"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const { theme, language, userMode, toggleTheme, setLanguage, toggleUserMode } = useTheme()
  const t = useTranslation(language)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  const languages = {
    en: "English",
    hi: "हिंदी",
  }

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 animate-slide-down">
      <nav className="max-w-6xl mx-auto rounded-full glass border border-white/25 dark:border-white/10 px-6 py-1.5 shadow-lg backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-12">
          <Link href="/" className="flex items-center transition-none">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              Equanima
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/"
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-300 ${
                isActive("/")
                  ? "bg-primary/15 text-primary border border-primary/25 shadow-sm"
                  : "text-foreground/70 hover:text-foreground hover:bg-white/15 dark:hover:bg-white/5"
              }`}
            >
              {t.home}
            </Link>
            <Link
              href="/dashboard"
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-300 ${
                isActive("/dashboard")
                  ? "bg-primary/15 text-primary border border-primary/25 shadow-sm"
                  : "text-foreground/70 hover:text-foreground hover:bg-white/15 dark:hover:bg-white/5"
              }`}
            >
              {t.dashboard}
            </Link>
            <Link
              href="/mood-tracker"
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-300 ${
                isActive("/mood-tracker")
                  ? "bg-primary/15 text-primary border border-primary/25 shadow-sm"
                  : "text-foreground/70 hover:text-foreground hover:bg-white/15 dark:hover:bg-white/5"
              }`}
            >
              {t.moodTracker}
            </Link>
            <Link
              href="/tests"
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-300 ${
                isActive("/tests")
                  ? "bg-primary/15 text-primary border border-primary/25 shadow-sm"
                  : "text-foreground/70 hover:text-foreground hover:bg-white/15 dark:hover:bg-white/5"
              }`}
            >
              {t.tests}
            </Link>
            <Link
              href="/about"
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-300 ${
                isActive("/about")
                  ? "bg-primary/15 text-primary border border-primary/25 shadow-sm"
                  : "text-foreground/70 hover:text-foreground hover:bg-white/15 dark:hover:bg-white/5"
              }`}
            >
              {t.about}
            </Link>

            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="hover:scale-110 transition-all duration-300 text-foreground hover:text-primary"
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
            </div>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-xs font-semibold text-foreground bg-white/10 px-3 py-1.5 rounded-full border border-white/25 flex items-center gap-1.5">
                  {t.welcome}, {user.name}
                  {user.role && (
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25 font-bold">
                      {user.role}
                    </span>
                  )}
                </span>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="hover:scale-105 transition-all duration-300 bg-transparent text-foreground border-foreground/20 hover:border-primary hover:text-primary"
                >
                  {t.logout}
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 hover:scale-105 transition-all duration-300 text-white font-medium">
                  {t.login}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:scale-110 transition-all duration-300 text-foreground hover:text-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1 glass-subtle rounded-lg mt-2">
              <Link href="/" className="block px-3 py-2 text-foreground/80 hover:text-primary">
                {t.home}
              </Link>
              <Link href="/dashboard" className="block px-3 py-2 text-foreground/80 hover:text-primary">
                {t.dashboard}
              </Link>
              <Link href="/mood-tracker" className="block px-3 py-2 text-foreground/80 hover:text-primary">
                {t.moodTracker}
              </Link>
              <Link href="/tests" className="block px-3 py-2 text-foreground/80 hover:text-primary">
                {t.tests}
              </Link>
              <Link href="/about" className="block px-3 py-2 text-foreground/80 hover:text-primary">
                {t.about}
              </Link>
              <Link href="/profile?tab=account" className="block px-3 py-2 text-foreground/80 hover:text-primary">
                {t.settings}
              </Link>
              {user ? (
                <Button
                  onClick={logout}
                  variant="outline"
                  className="w-full mt-2 bg-transparent hover:scale-105 transition-all duration-300 text-foreground border-foreground/20 hover:border-primary hover:text-primary"
                >
                  {t.logout}
                </Button>
              ) : (
                <Link href="/auth" className="block">
                  <Button className="w-full mt-2 bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all duration-300 text-white font-medium">
                    {t.login}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  </div>
  )
}
