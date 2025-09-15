"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, ArrowLeft, Sparkles } from "lucide-react"
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 glass-subtle animate-slide-down">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <Card className="glass-strong shadow-2xl animate-fade-up animate-delay-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2 animate-bounce-gentle">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              Welcome to Equanima
            </CardTitle>
            <CardDescription className="animate-fade-up animate-delay-300">
              Your journey to mental wellness starts here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 glass-subtle animate-scale-up animate-delay-400">
                <TabsTrigger value="login" className="transition-all duration-300 hover:scale-105">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="transition-all duration-300 hover:scale-105">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-6 animate-fade-up animate-delay-500">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2 animate-slide-right animate-delay-600">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="glass-subtle border-0 transition-all duration-300 hover:glass focus:glass-strong focus:scale-105"
                      required
                    />
                  </div>
                  <div className="space-y-2 animate-slide-right animate-delay-700">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="glass-subtle border-0 pr-10 transition-all duration-300 hover:glass focus:glass-strong focus:scale-105"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-all duration-300 hover:scale-110"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full animate-bounce-gentle animate-delay-800 transition-all duration-300 hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6 animate-fade-up animate-delay-500">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2 animate-slide-right animate-delay-600">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Your full name"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      className="glass-subtle border-0 transition-all duration-300 hover:glass focus:glass-strong focus:scale-105"
                      required
                    />
                  </div>
                  <div className="space-y-2 animate-slide-right animate-delay-700">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className="glass-subtle border-0 transition-all duration-300 hover:glass focus:glass-strong focus:scale-105"
                      required
                    />
                  </div>
                  <div className="space-y-2 animate-slide-right animate-delay-800">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className="glass-subtle border-0 pr-10 transition-all duration-300 hover:glass focus:glass-strong focus:scale-105"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-all duration-300 hover:scale-110"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2 animate-slide-right animate-delay-900">
                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      className="glass-subtle border-0 transition-all duration-300 hover:glass focus:glass-strong focus:scale-105"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full animate-bounce-gentle animate-delay-1000 transition-all duration-300 hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground animate-fade-up animate-delay-1100">
              <div className="mb-4 p-4 glass-subtle rounded-lg border border-primary/20">
                <p className="font-medium text-primary mb-2">Demo Credentials for Testing:</p>
                <div className="space-y-1 text-xs">
                  <p>
                    <strong>Email:</strong> demo@equanima.com
                  </p>
                  <p>
                    <strong>Password:</strong> demo123
                  </p>
                  <p className="text-muted-foreground mt-2">
                    (Any email/password combination will work for demo purposes)
                  </p>
                </div>
              </div>
              <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
