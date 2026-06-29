import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-purple-50/20 via-blue-50/20 to-green-50/20">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground text-xs">Last Updated: June 2026</p>
        </div>

        <Card className="glass-strong border-white/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" /> Privacy and Data Security
            </CardTitle>
            <CardDescription>How we safeguard your personal wellness information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            
            <section className="space-y-2">
              <h3 className="font-semibold text-foreground text-base flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" /> 1. Information We Collect
              </h3>
              <p>
                We collect personal registration details (name, email, avatar preference) and wellness telemetry logs. Telemetry includes daily mood logs, energy and anxiety levels, notes, tags, and mental health assessment history.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-foreground text-base flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" /> 2. Security & Data Protection
              </h3>
              <p>
                Your mental health data is highly sensitive. For the client showcase, all logs and profile credentials are saved locally in your browser's secure `localStorage` sandbox. No personal health metrics are transmitted to any third-party marketing servers.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-foreground text-base">3. Use of MitraAI Conversation Logs</h3>
              <p>
                MitraAI chat logs are kept isolated within your current browser session. These logs are processed client-side to generate context and support prompts, ensuring your conversations remain entirely confidential and temporary.
              </p>
            </section>



            <section className="space-y-2">
              <h3 className="font-semibold text-foreground text-base">5. Data Deletion and Export</h3>
              <p>
                You retain absolute control over your information. You can instantly download a structured JSON file containing all your logged wellness data from the Profile tab, or permanently delete your account (which purges all local storage entries immediately).
              </p>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
