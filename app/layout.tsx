import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/contexts/theme-context"
import { AuthProvider } from "@/components/contexts/auth-context"
import { MoodProvider } from "@/components/contexts/mood-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BottomNavigation } from "@/components/bottom-navigation"
import { MitraAIChat } from "@/components/mitra-ai-chat"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Equanima - AI Wellness Assistant",
  description: "Your AI-powered wellness companion for mental health tracking and support",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Suspense fallback={null}>
          <ThemeProvider>
            <AuthProvider>
              <MoodProvider>
                <Navbar />
                <main className="flex-1 pb-20 md:pb-0">{children}</main>
                <Footer />
                <BottomNavigation />
                <MitraAIChat />
                <Toaster />
              </MoodProvider>
            </AuthProvider>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
