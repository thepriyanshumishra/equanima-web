# Equanima — Empathetic Mental Wellness Platform

Equanima is a premium, client-side mental wellness and psychological screening platform built with Next.js, React, Tailwind CSS, and Lucide icons. Designed with a serene, dark-mode glassmorphic aesthetic, it combines clinically validated screening questionnaires with a supportive AI companion (MitraAI) and role-based management consoles to empower student wellness and campus counseling.

## Key Features

### 🌟 Serene Glassmorphism Design
- **Fluid Visuals**: Animated colored ambient background blobs, glassmorphic card containers, and glowing icon badges.
- **Harmonious Palette**: Calm teal, indigo, blue, and amber tones that reduce eye strain and foster a relaxing experience.
- **Responsive Navigation**: Fixed floating top pill header that adapts dynamically across desktop, tablet, and mobile screens.

### 🧪 Clinically Validated Assessments
Equanima hosts 9 clinically validated mental health assessments categorized for quick discovery:
1. **PHQ-9** (Depression Screening)
2. **GAD-7** (Generalized Anxiety Screening)
3. **DASS-21** (Depression, Anxiety & Stress Scale)
4. **PSS-10** (Perceived Stress Scale)
5. **WHO-5** (Subjective Well-Being Index)
6. **K10** (Kessler Psychological Distress Scale)
7. **Rosenberg Self-Esteem Scale (RSES)** (with reverse-scoring indices)
8. **Insomnia Severity Index (ISI)** (Sleep difficulties screening)
9. **Academic & Work Burnout Index** (Chronic exhaustion screening)

### ⚡ Smart Test Runner Flow
- **Auto-Advance UX**: Selecting a choice automatically advances to the next question after a brief delay (250ms), allowing users to finish screenings without clicking "Next" repeatedly.
- **Navigational Backup**: Previous buttons let users go back and alter responses seamlessly.
- **Automated Score Mapping**: Instantly saves completed results with clinical severity levels to the user profile's history log.

### 🤖 MitraAI Wellness Companion
- **Supportive Chat**: Session-isolated, client-side conversation space containing warm, non-diagnostic counseling guidance.
- **Grounding Prompts**: Quick action buttons to query MitraAI about sleep, anxiety triggers, or breathing exercises.

### 🔑 Quick Demo Role Logins
Skip typing credentials! The login page provides instant role-based button activations for three distinct profiles:
- **Student User**: Focuses on self-tracking, logging daily moods, and taking clinical screenings.
- **Therapist**: Grants access to a *Clinical Management Console* to monitor student logs and launch collaborative telehealth consultations.
- **College Coordinator**: Grants access to *Campus Wellness Analytics* showing university-wide stress levels, active stats, and advisory broadcasts.

### 🔒 100% Client-Side Privacy
- **Local Storage Sessions**: All user profiles, mood logs, and test histories are stored directly in your local browser sandbox.
- **Zero Database Dependency**: Bypasses external servers for absolute confidentiality and instantaneous offline speeds.
- **Data Export & Deletion**: Instantly download your full history logs as a structured JSON file or purge all local storage records with one click.

---

## Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Library**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts (with custom SVG area gradients)

---

## Getting Started

### Prerequisites
Make sure you have Node.js and a package manager (pnpm, npm, or yarn) installed.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/thepriyanshumishra/equanima-web.git
   cd equanima-web
   ```
2. Install dependencies:
   ```bash
   corepack pnpm install
   ```
3. Run the development server:
   ```bash
   corepack pnpm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## License
Distributed under the MIT License. See `LICENSE` for more information.
