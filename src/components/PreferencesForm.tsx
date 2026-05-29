"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Euro, Calendar, Users, Filter, Globe, AlertCircle, MessageSquare, Sparkles, Loader2 } from "lucide-react"
import type { MealPlanRequest } from "@/types"

const DIETARY_OPTIONS = [
  "Omnivore",
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Keto",
  "Low-Carb",
  "High-Protein",
  "Mediterranean",
]

const CUISINE_OPTIONS = [
  "Austrian",
  "Italian",
  "Asian",
  "Indian",
  "Mexican",
  "Middle Eastern",
  "American",
  "French",
  "Japanese",
  "Korean",
]

interface Props {
  onSubmit: (data: MealPlanRequest) => void
  loading: boolean
}

export default function PreferencesForm({ onSubmit, loading }: Props) {
  const [budget, setBudget] = useState(100)
  const [days, setDays] = useState(7)
  const [people, setPeople] = useState(2)
  const [dietary, setDietary] = useState<string[]>(["Omnivore"])
  const [cuisine, setCuisine] = useState<string[]>([])
  const [restrictions, setRestrictions] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")

  function toggleDietary(option: string) {
    setDietary((prev) =>
      prev.includes(option)
        ? prev.filter((d) => d !== option)
        : [...prev, option]
    )
  }

  function toggleCuisine(option: string) {
    setCuisine((prev) =>
      prev.includes(option)
        ? prev.filter((c) => c !== option)
        : [...prev, option]
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({
      budget,
      days,
      people,
      dietary,
      cuisine,
      restrictions,
      additionalNotes,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white border border-zinc-200/60 shadow-sm overflow-hidden"
    >
      {/* Main settings */}
      <div className="p-8 space-y-8">
        <div className="grid gap-5 sm:grid-cols-3">
          {/* Budget */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
              <Euro className="h-4 w-4 text-emerald-500" />
              Weekly Budget
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium text-sm">
                €
              </span>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                min={20}
                max={1000}
                step={5}
                className="w-full pl-9 pr-16 py-3 rounded-xl border border-zinc-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-zinc-50 hover:bg-white"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-0.5">
                <button
                  type="button"
                  onClick={() => setBudget(Math.max(20, budget - 5))}
                  className="h-7 w-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200 transition-colors text-lg leading-none"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => setBudget(Math.min(1000, budget + 5))}
                  className="h-7 w-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200 transition-colors text-lg leading-none"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Days */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
              <Calendar className="h-4 w-4 text-emerald-500" />
              Duration
            </label>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-zinc-50 hover:bg-white appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat"
            >
              {[1, 3, 5, 7, 10, 14].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "day" : "days"}
                </option>
              ))}
            </select>
          </div>

          {/* People */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
              <Users className="h-4 w-4 text-emerald-500" />
              People
            </label>
            <select
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-zinc-50 hover:bg-white appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2F%3Csvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "person" : "people"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Dietary */}
      <div className="px-8 py-6 border-t border-zinc-100 bg-zinc-50/50">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-emerald-500" />
          <label className="text-sm font-medium text-zinc-700">
            Dietary Preference
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map((option) => (
            <motion.button
              key={option}
              type="button"
              onClick={() => toggleDietary(option)}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                dietary.includes(option)
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-200"
                  : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cuisine */}
      <div className="px-8 py-6 border-t border-zinc-100 bg-zinc-50/50">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="h-4 w-4 text-emerald-500" />
          <label className="text-sm font-medium text-zinc-700">
            Preferred Cuisines
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          {CUISINE_OPTIONS.map((option) => (
            <motion.button
              key={option}
              type="button"
              onClick={() => toggleCuisine(option)}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                cuisine.includes(option)
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-200"
                  : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Extra inputs */}
      <div className="px-8 py-6 border-t border-zinc-100 space-y-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            Allergies / Restrictions
          </label>
          <input
            type="text"
            value={restrictions}
            onChange={(e) => setRestrictions(e.target.value)}
            placeholder="e.g. nuts, gluten, lactose"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-zinc-50 hover:bg-white"
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
            <MessageSquare className="h-4 w-4 text-emerald-500" />
            Additional Notes
          </label>
          <input
            type="text"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="e.g. quick meals, batch cooking, no seafood"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-zinc-50 hover:bg-white"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="p-8 pt-0">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold text-base hover:from-emerald-700 hover:to-emerald-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] shadow-lg shadow-emerald-200/50"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating your meal plan...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate Meal Plan
            </>
          )}
        </button>
      </div>
    </form>
  )
}
