"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, ArrowLeft, Sparkles, Shield, User, GraduationCap } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const { login, signup, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const success = await login(loginData.email, loginData.password)
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in to Equanima.",
        })
        router.push("/dashboard")
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    }
  }

  const handleDemoLogin = async (role: "user" | "therapist" | "coordinator") => {
    let email = ""
    let password = "demo123"

    if (role === "user") {
      email = "demo-user@equanima.com"
    } else if (role === "therapist") {
      email = "demo-therapist@equanima.com"
    } else {
      email = "demo-coordinator@equanima.com"
    }

    // Autofill credentials
    setLoginData({ email, password })

    try {
      const success = await login(email, password)
      if (success) {
        toast({
          title: `Logged in as ${role.toUpperCase()}`,
          description: "Welcome to the Equanima demo session.",
        })
        router.push("/dashboard")
      }
    } catch (error) {
      toast({
        title: "Demo login failed",
        description: "Failed to perform demo login.",
        variant: "destructive",
      })
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }
    try {
      const success = await signup(signupData.name, signupData.email, signupData.password)
      if (success) {
        toast({
          title: "Welcome to Equanima!",
          description: "Your account has been created successfully.",
        })
        router.push("/dashboard")
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please try again with different credentials.",
        variant: "destructive",
      })
    }
  }

  const isDemoAutofilled = 
    loginData.email.includes("demo-user") || 
    loginData.email.includes("demo-therapist") || 
    loginData.email.includes("demo-coordinator")

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 glass-subtle animate-slide-down">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <Card className="glass-strong border-white/30 shadow-2xl animate-fade-up rounded-3xl p-1">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2 animate-bounce-gentle">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              Welcome to Equanima
            </CardTitle>
            <CardDescription className="text-xs">
              Your journey to mental wellness starts here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 glass-subtle rounded-xl p-0.5">
                <TabsTrigger value="login" className="rounded-lg text-xs font-bold py-2">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="rounded-lg text-xs font-bold py-2">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-xs font-bold text-foreground">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="glass-subtle border-0 rounded-xl"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-xs font-bold text-foreground">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="glass-subtle border-0 pr-10 rounded-xl"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                        onClick={() => !isDemoAutofilled && setShowPassword(!showPassword)}
                        disabled={isLoading || isDemoAutofilled}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full py-5 rounded-xl font-bold text-xs"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                {/* Quick Demo Login Section */}
                <div className="pt-6 border-t border-white/10 space-y-3">
                  <p className="text-[10px] font-bold text-center text-muted-foreground uppercase tracking-wider">
                    Quick Demo Logins (Autofills & Logs In Immediately)
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDemoLogin("user")}
                      disabled={isLoading}
                      className="glass border-white/20 dark:border-white/8 hover:bg-primary/10 rounded-xl py-4 h-auto text-[10px] font-bold flex flex-col items-center gap-1 hover:scale-105 transition-transform"
                    >
                      <GraduationCap className="h-4 w-4 text-teal-500" />
                      Student
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDemoLogin("therapist")}
                      disabled={isLoading}
                      className="glass border-white/20 dark:border-white/8 hover:bg-primary/10 rounded-xl py-4 h-auto text-[10px] font-bold flex flex-col items-center gap-1 hover:scale-105 transition-transform"
                    >
                      <User className="h-4 w-4 text-blue-500" />
                      Therapist
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDemoLogin("coordinator")}
                      disabled={isLoading}
                      className="glass border-white/20 dark:border-white/8 hover:bg-primary/10 rounded-xl py-4 h-auto text-[10px] font-bold flex flex-col items-center gap-1 hover:scale-105 transition-transform"
                    >
                      <Shield className="h-4 w-4 text-amber-500" />
                      Coordinator
                    </Button>
                  </div>
                </div>

              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-xs font-bold text-foreground">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Your full name"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      className="glass-subtle border-0 rounded-xl"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-xs font-bold text-foreground">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className="glass-subtle border-0 rounded-xl"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-xs font-bold text-foreground">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className="glass-subtle border-0 pr-10 rounded-xl"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm" className="text-xs font-bold text-foreground">Confirm Password</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      className="glass-subtle border-0 rounded-xl"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full py-5 rounded-xl font-bold text-xs animate-delay-1000 transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="text-center text-[10px] text-muted-foreground font-semibold">
              <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
