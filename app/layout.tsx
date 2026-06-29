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
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-indigo-50/20 to-emerald-50/15 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950/40 transition-colors duration-500`}>
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[15%] w-[30rem] h-[30rem] rounded-full bg-purple-400/10 dark:bg-purple-600/5 blur-[120px] animate-blob" />
          <div className="absolute bottom-[20%] right-[10%] w-[35rem] h-[35rem] rounded-full bg-emerald-400/10 dark:bg-emerald-600/5 blur-[130px] animate-blob" style={{ animationDelay: "2s" }} />
          <div className="absolute top-[40%] right-[25%] w-[25rem] h-[25rem] rounded-full bg-blue-400/10 dark:bg-blue-600/5 blur-[100px] animate-blob" style={{ animationDelay: "4s" }} />
        </div>
        <Suspense fallback={null}>
          <ThemeProvider>
            <AuthProvider>
              <MoodProvider>
                <Navbar />
                <main className="flex-1 pt-24 pb-20 md:pb-0">{children}</main>
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
