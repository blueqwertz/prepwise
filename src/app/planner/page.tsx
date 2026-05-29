"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, ArrowLeft, History, Loader2, CalendarDays, Euro } from "lucide-react"
import Link from "next/link"
import type { MealPlan, MealPlanRequest } from "@/types"
import PreferencesForm from "@/components/PreferencesForm"
import MealPlanCard from "@/components/MealPlanCard"
import BudgetSummary from "@/components/BudgetSummary"
import { formatCurrency } from "@/lib/utils"

interface SavedPlan {
  id: string
  createdAt: string
  budget: number
  days: number
  people: number
  dietary: string[] | null
  cuisine: string[] | null
  restrictions: string | null
  notes: string | null
  data: MealPlan
}

export default function PlannerPage() {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pastPlans, setPastPlans] = useState<SavedPlan[]>([])
  const [loadingPast, setLoadingPast] = useState(true)

  const fetchPastPlans = useCallback(async () => {
    try {
      const res = await fetch("/api/generate-meal-plan")
      if (res.ok) {
        const data = await res.json()
        setPastPlans(data)
      }
    } catch {
      // silently fail — past plans are non-critical
    } finally {
      setLoadingPast(false)
    }
  }, [])

  useEffect(() => {
    fetchPastPlans()
  }, [fetchPastPlans])

  async function handleSubmit(data: MealPlanRequest) {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/generate-meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.")
        return
      }

      setMealPlan(json)
      fetchPastPlans()
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setMealPlan(null)
    setError(null)
  }

  function loadPastPlan(plan: SavedPlan) {
    setMealPlan(plan.data)
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-sm shadow-emerald-200">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {mealPlan ? "Your Meal Plan" : "Plan Your Meals"}
            </h1>
            <p className="text-sm text-zinc-500">
              {mealPlan
                ? "Scroll down to see each day in detail"
                : "Set your preferences and let AI do the rest"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Error banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-center justify-between"
          >
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-4 text-red-400 hover:text-red-600 transition-colors"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Past Plans sidebar-ish section */}
      {!mealPlan && pastPlans.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <History className="h-4 w-4 text-zinc-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Past Meal Plans
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pastPlans.slice(0, 6).map((plan) => (
              <motion.button
                key={plan.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => loadPastPlan(plan)}
                className="flex flex-col items-start gap-2 p-4 rounded-2xl bg-white border border-zinc-200/60 hover:border-emerald-300 hover:shadow-sm transition-all text-left"
              >
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {new Date(plan.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-zinc-700">
                  <Euro className="h-3.5 w-3.5 text-emerald-500" />
                  {formatCurrency(plan.budget)} &middot; {plan.days}d &middot; {plan.people}p
                </div>
                {plan.dietary && plan.dietary.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {plan.dietary.slice(0, 2).map((d) => (
                      <span
                        key={d}
                        className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-medium"
                      >
                        {d}
                      </span>
                    ))}
                    {plan.dietary.length > 2 && (
                      <span className="text-[10px] text-zinc-400">
                        +{plan.dietary.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {loadingPast && !mealPlan && (
        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-10">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading past plans...
        </div>
      )}

      {/* Form or Results */}
      <AnimatePresence mode="wait">
        {!mealPlan ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <PreferencesForm onSubmit={handleSubmit} loading={loading} />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <BudgetSummary mealPlan={mealPlan} />

            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-500">
                {mealPlan.days.length}{" "}
                {mealPlan.days.length === 1 ? "day" : "days"} planned &middot;{" "}
                {mealPlan.days.reduce((s, d) => s + d.meals.length, 0)} meals
                total
              </p>
              <button
                onClick={handleReset}
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Plan a new week &rarr;
              </button>
            </div>

            <div className="grid gap-4">
              {mealPlan.days.map((day, i) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <MealPlanCard day={day} dayIndex={i} />
                </motion.div>
              ))}
            </div>

            <div className="text-center pt-8 pb-4">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium text-sm hover:from-emerald-700 hover:to-emerald-800 transition-all active:scale-[0.98] shadow-lg shadow-emerald-200/50"
              >
                <Sparkles className="h-4 w-4" />
                Generate Another Plan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
