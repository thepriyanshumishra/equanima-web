"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon, Globe, User, UserX, Settings } from "lucide-react"
import { useAuth } from "@/components/contexts/auth-context"
import { useTheme } from "@/components/contexts/theme-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/lib/translations"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const { theme, language, userMode, toggleTheme, setLanguage, toggleUserMode } = useTheme()
  const t = useTranslation(language)

  const languages = {
    en: "English",
    hi: "हिंदी",
  }

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/20 animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              Equanima
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105"
            >
              {t.home}
            </Link>
            <Link
              href="/dashboard"
              className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105"
            >
              {t.dashboard}
            </Link>
            <Link
              href="/mood-tracker"
              className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105"
            >
              {t.moodTracker}
            </Link>
            <Link
              href="/tests"
              className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105"
            >
              {t.tests}
            </Link>
            <Link
              href="/about"
              className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105"
            >
              {t.about}
            </Link>

            <div className="flex items-center space-x-2">
              {/* Settings Link */}
              <Link href="/settings">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:scale-110 transition-all duration-300 text-foreground hover:text-primary"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="hover:scale-110 transition-all duration-300 text-foreground hover:text-primary"
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>

              {/* Language Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:scale-110 transition-all duration-300 text-foreground hover:text-primary"
                  >
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass">
                  {Object.entries(languages).map(([code, name]) => (
                    <DropdownMenuItem
                      key={code}
                      onClick={() => setLanguage(code as "en" | "hi")}
                      className={language === code ? "bg-primary/20" : ""}
                    >
                      {name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleUserMode}
                className="hover:scale-110 transition-all duration-300 text-foreground hover:text-primary"
              >
                {userMode === "user" ? <User className="h-4 w-4" /> : <UserX className="h-4 w-4" />}
              </Button>
            </div>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-foreground bg-white/10 px-3 py-1 rounded-full animate-fade-in border border-white/20">
                  {t.welcome}, {user.name}
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
              <Link href="/settings" className="block px-3 py-2 text-foreground/80 hover:text-primary">
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
  )
}
