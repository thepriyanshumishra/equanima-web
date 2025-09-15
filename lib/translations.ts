export const translations = {
  en: {
    // Navigation
    home: "Home",
    dashboard: "Dashboard",
    moodTracker: "Mood Tracker",
    tests: "Tests",
    about: "About",
    settings: "Settings",
    login: "Login",
    logout: "Logout",
    welcome: "Welcome",

    // Homepage
    title: "Your Mental Wellness Journey Starts Here",
    subtitle:
      "Track your mood, understand your patterns, and build better mental health habits with our comprehensive wellness platform.",
    startTracking: "Start Tracking",
    learnMore: "Learn More",

    // Features
    moodTrackingTitle: "Mood Tracking",
    moodTrackingDesc: "Daily mood logging with insights and patterns",
    personalizedInsightsTitle: "Personalized Insights",
    personalizedInsightsDesc: "AI-powered analysis of your mental health journey",
    progressMonitoringTitle: "Progress Monitoring",
    progressMonitoringDesc: "Visual charts and reports to track your growth",

    // Auth
    signIn: "Sign In",
    signUp: "Sign Up",
    email: "Email",
    password: "Password",
    fullName: "Full Name",
    demoCredentials: "Demo Credentials",

    // Dashboard
    dashboardTitle: "Your Wellness Dashboard",
    recentMoods: "Recent Moods",
    weeklyProgress: "Weekly Progress",
    insights: "Insights",

    // Settings
    settingsTitle: "Settings",
    languageSettings: "Language Settings",
    themeSettings: "Theme Settings",
    userModeSettings: "User Mode Settings",
    defaultLanguage: "Default Language",
    currentTheme: "Current Theme",
    currentUserMode: "Current User Mode",
    light: "Light",
    dark: "Dark",
    anonymous: "Anonymous",
    user: "User",
  },
  hi: {
    // Navigation
    home: "होम",
    dashboard: "डैशबोर्ड",
    moodTracker: "मूड ट्रैकर",
    tests: "टेस्ट",
    about: "हमारे बारे में",
    settings: "सेटिंग्स",
    login: "लॉगिन",
    logout: "लॉगआउट",
    welcome: "स्वागत है",

    // Homepage
    title: "आपकी मानसिक स्वास्थ्य यात्रा यहाँ से शुरू होती है",
    subtitle: "अपने मूड को ट्रैक करें, अपने पैटर्न को समझें, और हमारे व्यापक वेलनेस प्लेटफॉर्म के साथ बेहतर मानसिक स्वास्थ्य की आदतें बनाएं।",
    startTracking: "ट्रैकिंग शुरू करें",
    learnMore: "और जानें",

    // Features
    moodTrackingTitle: "मूड ट्रैकिंग",
    moodTrackingDesc: "अंतर्दृष्टि और पैटर्न के साथ दैनिक मूड लॉगिंग",
    personalizedInsightsTitle: "व्यक्तिगत अंतर्दृष्टि",
    personalizedInsightsDesc: "आपकी मानसिक स्वास्थ्य यात्रा का AI-संचालित विश्लेषण",
    progressMonitoringTitle: "प्रगति निगरानी",
    progressMonitoringDesc: "आपकी वृद्धि को ट्रैक करने के लिए दृश्य चार्ट और रिपोर्ट",

    // Auth
    signIn: "साइन इन",
    signUp: "साइन अप",
    email: "ईमेल",
    password: "पासवर्ड",
    fullName: "पूरा नाम",
    demoCredentials: "डेमो क्रेडेंशियल",

    // Dashboard
    dashboardTitle: "आपका वेलनेस डैशबोर्ड",
    recentMoods: "हाल के मूड",
    weeklyProgress: "साप्ताहिक प्रगति",
    insights: "अंतर्दृष्टि",

    // Settings
    settingsTitle: "सेटिंग्स",
    languageSettings: "भाषा सेटिंग्स",
    themeSettings: "थीम सेटिंग्स",
    userModeSettings: "उपयोगकर्ता मोड सेटिंग्स",
    defaultLanguage: "डिफ़ॉल्ट भाषा",
    currentTheme: "वर्तमान थीम",
    currentUserMode: "वर्तमान उपयोगकर्ता मोड",
    light: "हल्का",
    dark: "गहरा",
    anonymous: "गुमनाम",
    user: "उपयोगकर्ता",
  },
}

export function useTranslation(language: "en" | "hi") {
  return translations[language]
}
