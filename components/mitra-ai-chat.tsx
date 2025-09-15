"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  suggestions?: string[]
}

const welcomeMessages = [
  "Hello! I'm MitraAI, your wellness companion. How are you feeling today?",
  "Hi there! I'm MitraAI, here to support your mental wellness journey. What's on your mind?",
  "Welcome! I'm MitraAI, your AI wellness assistant. How can I help you today?",
]

const moodResponses = {
  happy: [
    "That's wonderful to hear! What's been contributing to your positive mood today?",
    "I'm so glad you're feeling happy! Would you like to share what's been going well for you?",
    "It's great that you're in a good mood! How can we maintain this positive energy?",
  ],
  sad: [
    "I'm sorry you're feeling sad. It's okay to have difficult days. Would you like to talk about what's bothering you?",
    "Thank you for sharing that with me. Sadness is a natural emotion. What do you think might help you feel a bit better?",
    "I understand you're going through a tough time. Sometimes talking about our feelings can help. What's been weighing on your mind?",
  ],
  anxious: [
    "I hear that you're feeling anxious. That can be really challenging. Have you tried any breathing exercises or grounding techniques?",
    "Anxiety can be overwhelming. You're not alone in feeling this way. What situations or thoughts are making you feel anxious?",
    "Thank you for trusting me with your feelings. When you feel anxious, what usually helps you feel more calm?",
  ],
  stressed: [
    "Stress can really take a toll on us. What are the main sources of stress in your life right now?",
    "I understand you're feeling stressed. It's important to acknowledge these feelings. What's been the most challenging part of your day?",
    "Stress is something many people experience. Have you been able to take any breaks or do something relaxing today?",
  ],
  tired: [
    "Feeling tired can affect everything else. Have you been getting enough sleep lately?",
    "Fatigue can be both physical and emotional. What do you think might be contributing to your tiredness?",
    "It sounds like you need some rest. Have you been taking care of your basic needs like sleep, food, and water?",
  ],
}

const generalResponses = [
  "I understand. Can you tell me more about what you're experiencing?",
  "That sounds challenging. How long have you been feeling this way?",
  "Thank you for sharing that with me. What do you think would help you feel better right now?",
  "I hear you. Sometimes it helps to break things down. What's the most pressing concern for you today?",
  "Your feelings are valid. Have you been able to talk to anyone else about this?",
  "That must be difficult for you. What coping strategies have you tried before?",
  "I appreciate your openness. What kind of support do you feel you need most right now?",
  "It takes courage to share your feelings. How can I best support you today?",
]

const copingStrategies = [
  "Try the 4-7-8 breathing technique: breathe in for 4, hold for 7, exhale for 8.",
  "Consider taking a short walk outside if possible. Fresh air and movement can help.",
  "Practice grounding: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.",
  "Try progressive muscle relaxation: tense and release each muscle group from your toes to your head.",
  "Consider journaling your thoughts and feelings. Sometimes writing helps clarify our emotions.",
  "Reach out to a trusted friend or family member. Social connection can be very healing.",
]

const quickSuggestions = [
  "I'm feeling anxious",
  "I had a good day",
  "I'm feeling overwhelmed",
  "I need coping strategies",
  "I'm having trouble sleeping",
  "I feel lonely",
]

export function MitraAIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)],
      isUser: false,
      timestamp: new Date(),
      suggestions: quickSuggestions.slice(0, 3),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (userMessage: string): { text: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase()

    // Mood-based responses
    if (
      message.includes("happy") ||
      message.includes("good") ||
      message.includes("great") ||
      message.includes("wonderful")
    ) {
      return {
        text: moodResponses.happy[Math.floor(Math.random() * moodResponses.happy.length)],
        suggestions: ["Tell me more", "What made you happy?", "How can I maintain this?"],
      }
    }

    if (
      message.includes("sad") ||
      message.includes("down") ||
      message.includes("depressed") ||
      message.includes("upset")
    ) {
      return {
        text: moodResponses.sad[Math.floor(Math.random() * moodResponses.sad.length)],
        suggestions: ["I need support", "Coping strategies", "Talk to someone"],
      }
    }

    if (
      message.includes("anxious") ||
      message.includes("anxiety") ||
      message.includes("worried") ||
      message.includes("nervous")
    ) {
      return {
        text: moodResponses.anxious[Math.floor(Math.random() * moodResponses.anxious.length)],
        suggestions: ["Breathing exercises", "Grounding techniques", "What triggers this?"],
      }
    }

    if (
      message.includes("stressed") ||
      message.includes("stress") ||
      message.includes("overwhelmed") ||
      message.includes("pressure")
    ) {
      return {
        text: moodResponses.stressed[Math.floor(Math.random() * moodResponses.stressed.length)],
        suggestions: ["Time management", "Relaxation techniques", "Set boundaries"],
      }
    }

    if (
      message.includes("tired") ||
      message.includes("exhausted") ||
      message.includes("fatigue") ||
      message.includes("drained")
    ) {
      return {
        text: moodResponses.tired[Math.floor(Math.random() * moodResponses.tired.length)],
        suggestions: ["Sleep hygiene", "Energy management", "Self-care tips"],
      }
    }

    // Coping strategy requests
    if (
      message.includes("coping") ||
      message.includes("help") ||
      message.includes("strategy") ||
      message.includes("technique")
    ) {
      return {
        text: copingStrategies[Math.floor(Math.random() * copingStrategies.length)],
        suggestions: ["More strategies", "Breathing exercises", "Mindfulness tips"],
      }
    }

    // Sleep-related
    if (message.includes("sleep") || message.includes("insomnia") || message.includes("can't sleep")) {
      return {
        text: "Sleep issues can really affect our mental health. Have you tried establishing a bedtime routine? Avoiding screens before bed and creating a calm environment can help.",
        suggestions: ["Sleep hygiene tips", "Relaxation techniques", "When to seek help"],
      }
    }

    // Loneliness
    if (message.includes("lonely") || message.includes("alone") || message.includes("isolated")) {
      return {
        text: "Feeling lonely is more common than you might think. It's important to reach out and connect with others, even in small ways. Have you considered joining any groups or activities?",
        suggestions: ["Social connection ideas", "Online communities", "Professional support"],
      }
    }

    // Default response
    return {
      text: generalResponses[Math.floor(Math.random() * generalResponses.length)],
      suggestions: quickSuggestions.slice(0, 3),
    }
  }

  const sendMessage = (messageText?: string) => {
    const text = messageText || inputValue
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(
      () => {
        const aiResponseData = getAIResponse(text)
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponseData.text,
          isUser: false,
          timestamp: new Date(),
          suggestions: aiResponseData.suggestions,
        }
        setMessages((prev) => [...prev, aiResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // 1-2 seconds delay
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-20 right-4 z-40 h-14 w-14 rounded-full shadow-lg",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "transition-all duration-300 hover:scale-110",
          isOpen && "hidden",
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          <div className="glass-strong rounded-2xl w-full max-w-sm h-[500px] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">MitraAI</h3>
                  <p className="text-xs text-muted-foreground">Your wellness companion</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className={cn("flex", message.isUser ? "justify-end" : "justify-start")}>
                      <div className="flex items-start gap-2 max-w-[85%]">
                        {!message.isUser && (
                          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="h-3 w-3 text-primary" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "rounded-2xl px-3 py-2 text-sm",
                            message.isUser ? "bg-primary text-primary-foreground" : "glass-subtle",
                          )}
                        >
                          {message.text}
                        </div>
                        {message.isUser && (
                          <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                            <User className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && !message.isUser && (
                      <div className="flex flex-wrap gap-1 ml-8">
                        {message.suggestions.map((suggestion, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="cursor-pointer text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-3 w-3 text-primary" />
                      </div>
                      <div className="glass-subtle rounded-2xl px-3 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="glass-subtle border-0"
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                  disabled={isTyping}
                />
                <Button
                  onClick={() => sendMessage()}
                  size="sm"
                  className="px-3"
                  disabled={isTyping || !inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
