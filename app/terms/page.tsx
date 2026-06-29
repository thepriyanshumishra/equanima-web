import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert, BookOpen, Scale } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-purple-50/20 via-blue-50/20 to-green-50/20">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Terms of Service</h1>
          <p className="text-muted-foreground text-xs">Last Updated: June 2026</p>
        </div>

        <Card className="glass-strong border-white/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" /> Terms and Conditions
            </CardTitle>
            <CardDescription>Rules of engagement for using Equanima</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            
            <section className="space-y-2">
              <h3 className="font-semibold text-foreground text-base">1. Acceptance of Terms</h3>
              <p>
                By accessing and using Equanima (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-foreground text-base">2. No Medical Advice</h3>
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-2.5 text-amber-800 dark:text-amber-300">
                <ShieldAlert className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-xs">
                  <strong>Disclaimer:</strong> Equanima and its AIWellness assistant MitraAI do NOT provide clinical diagnosis, psychiatric therapy, or medical prescriptions. All assessments (PHQ-9, GAD-7, etc.) and chat prompts are screening and coaching aids only. Always seek professional advice for severe symptoms.
                </p>
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-foreground text-base">3. User Accounts</h3>
              <p>
                To utilize tracking logs and history, you must register an account. You are responsible for safeguarding your login credentials and are fully responsible for any activities conducted under your user session.
              </p>
            </section>



            <section className="space-y-2">
              <h3 className="font-semibold text-foreground text-base">5. Limitation of Liability</h3>
              <p>
                Equanima and its contributors shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use of or inability to use the wellness tools or AI Wellness companion chats.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-foreground text-base">6. Modifications to Service</h3>
              <p>
                We reserve the right to alter, discontinue, or update features of the Service at any time without notice.
              </p>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
