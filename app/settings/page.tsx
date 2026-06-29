"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SettingsRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/profile?tab=account")
  }, [router])

  return null
}
