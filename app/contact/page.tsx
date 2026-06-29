"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "support",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Save to local storage for showcase
    const savedMessages = localStorage.getItem("equanima_contact_inquiries")
    const messages = savedMessages ? JSON.parse(savedMessages) : []
    messages.push({
      id: Date.now().toString(),
      ...formData,
      date: new Date().toISOString(),
    })
    localStorage.setItem("equanima_contact_inquiries", JSON.stringify(messages))

    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We will get back to you shortly.",
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      topic: "support",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-purple-50/20 via-blue-50/20 to-green-50/20">
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Contact Us</h1>
          <p className="text-muted-foreground text-pretty max-w-xl mx-auto">
            Have questions, feedback, or need help? We are here to support you on your wellness journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Details Cards */}
          <div className="space-y-6">
            <Card className="glass hover:glass-strong transition-all duration-300">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Email Support</h4>
                  <p className="text-xs text-muted-foreground mt-1">For regular inquiries:</p>
                  <a href="mailto:thedarkpcm@gmail.com" className="text-sm font-medium text-primary hover:underline">
                    thedarkpcm@gmail.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="glass hover:glass-strong transition-all duration-300">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 text-foreground">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Phone Line</h4>
                  <p className="text-xs text-muted-foreground mt-1">Monday - Friday (9AM - 5PM):</p>
                  <a href="tel:+15550199" className="text-sm font-medium text-foreground hover:underline">
                    +1 (555) 0199
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="glass hover:glass-strong transition-all duration-300">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 text-foreground">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Office Headquarters</h4>
                  <p className="text-xs text-muted-foreground mt-1">Physical location:</p>
                  <p className="text-sm font-medium text-foreground">
                    100 Wellness Way, Suite 400<br />
                    San Francisco, CA 94107
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card className="glass-strong border-white/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" /> Send Message
                </CardTitle>
                <CardDescription>We usually respond within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="glass-subtle border-0"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="glass-subtle border-0"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic of Discussion</Label>
                    <Select
                      value={formData.topic}
                      onValueChange={(val) => setFormData({ ...formData, topic: val })}
                    >
                      <SelectTrigger className="glass-subtle">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass">
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="feedback">Wellness Feedback</SelectItem>
                        <SelectItem value="inquiry">Partnership Inquiry</SelectItem>
                        <SelectItem value="other">Other Matter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message Body</Label>
                    <Textarea
                      id="message"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-[150px] glass-subtle border-0"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full animate-pulse-glow" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
