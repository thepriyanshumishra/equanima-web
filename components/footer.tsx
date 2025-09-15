import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="glass border-t border-white/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6">
            <Link href="/terms" className="text-sm text-foreground/70 hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-foreground/70 hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-foreground/70 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="https://github.com" className="text-foreground/70 hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="https://linkedin.com" className="text-foreground/70 hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:contact@equanima.com"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-foreground/60">© 2024 Equanima. Your AI-powered wellness companion.</p>
        </div>
      </div>
    </footer>
  )
}
