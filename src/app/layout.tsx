import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import "./globals.css"

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Prepwise — AI Meal Planner",
  description:
    "Eat well, spend less. Prepwise uses AI to plan nutritious meals based on real grocery prices and your weekly budget.",
  keywords: ["meal planner", "AI", "budget", "recipes", "nutrition", "Prepwise"],
  openGraph: {
    title: "Prepwise — AI-Powered Meal Planning",
    description:
      "Plan healthy meals that fit your budget. Winner of Red Bull Basement 2026 Austria.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[--background]">
        <header className="sticky top-0 z-50 border-b border-[--border] bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-[--foreground]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-sm shadow-emerald-200">
                <Sparkles className="h-4 w-4" />
              </div>
              <span>Prepwise</span>
            </Link>
            <nav className="flex items-center gap-2 text-sm font-medium">
              <Link
                href="/"
                className="rounded-lg px-4 py-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                Home
              </Link>
              <Link
                href="/planner"
                className="rounded-lg bg-emerald-600 px-5 py-2 text-white transition-all hover:bg-emerald-700 active:scale-[0.98] shadow-sm shadow-emerald-200"
              >
                Plan My Meals
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[--border] bg-white py-12">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3 opacity-60">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-600 text-white text-xs font-bold">
                P
              </div>
              <span className="text-sm font-medium text-zinc-900">Prepwise</span>
            </div>
            <p className="text-sm text-zinc-400">
              &copy; {new Date().getFullYear()} Prepwise. Built by WU Vienna
              students &mdash; Red Bull Basement 2026 Austria Winner.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
