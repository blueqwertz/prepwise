"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sun,
  Sunrise,
  Moon,
  Apple,
  ChefHat,
  ChevronDown,
  ListOrdered,
  ShoppingBag,
  Flame,
  Drumstick,
  Wheat,
  Droplets,
} from "lucide-react"
import type { DayPlan, Meal } from "@/types"
import { formatCurrency } from "@/lib/utils"

interface Props {
  day: DayPlan
  dayIndex: number
}

const mealIcons: Record<string, typeof ChefHat> = {
  breakfast: Sunrise,
  lunch: Sun,
  dinner: Moon,
  snack: Apple,
}

export default function MealPlanCard({ day }: Props) {
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null)

  return (
    <div className="rounded-2xl bg-white border border-zinc-200/60 shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      {/* Day header */}
      <div className="flex items-center justify-between px-6 py-5 bg-emerald-50/60 border-b border-emerald-100/60">
        <div>
          <h3 className="font-bold text-lg text-emerald-900">{day.day}</h3>
          <p className="text-xs text-emerald-600/70 mt-0.5">{day.date}</p>
        </div>
        <div className="text-right">
          <div className="text-xs font-medium text-emerald-600/70 uppercase tracking-wide">
            Daily Total
          </div>
          <div className="text-lg font-bold text-emerald-700 tabular-nums">
            {formatCurrency(day.dailyTotalCost)}
          </div>
        </div>
      </div>

      {/* Meals */}
      <div className="divide-y divide-zinc-100">
        {day.meals.map((meal) => {
          const Icon = mealIcons[meal.mealType] || ChefHat
          const isExpanded = expandedMeal === meal.id

          return (
            <div key={meal.id}>
              <button
                onClick={() =>
                  setExpandedMeal(isExpanded ? null : meal.id)
                }
                className="w-full flex items-center gap-4 px-6 py-4 hover:bg-zinc-50 transition-colors text-left group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 group-hover:bg-emerald-100 transition-colors shrink-0">
                  <Icon className="h-4 w-4 text-zinc-500 group-hover:text-emerald-600 transition-colors" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-zinc-400 capitalize mb-0.5">
                    {meal.mealType}
                  </div>
                  <div className="font-medium text-sm text-zinc-900 truncate">
                    {meal.name}
                  </div>
                </div>

                <div className="text-sm font-medium text-zinc-600 tabular-nums">
                  {formatCurrency(meal.estimatedTotalCost)}
                </div>

                <ChevronDown
                  className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 space-y-5 bg-zinc-50/50 border-t border-zinc-100">
                      <p className="text-sm text-zinc-600 leading-relaxed pt-4">
                        {meal.description}
                      </p>

                      {/* Ingredients */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <ShoppingBag className="h-4 w-4 text-emerald-500" />
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            Ingredients
                          </h4>
                        </div>
                        <ul className="space-y-1.5">
                          {meal.ingredients.map((ing, i) => (
                            <li
                              key={i}
                              className="flex items-center justify-between text-sm py-1 px-3 rounded-lg hover:bg-white transition-colors"
                            >
                              <span className="text-zinc-700">
                                <span className="font-medium text-zinc-500 text-xs mr-2 tabular-nums">
                                  {ing.amount}
                                </span>
                                {ing.name}
                              </span>
                              <span className="text-xs text-zinc-400 tabular-nums ml-4 shrink-0">
                                {formatCurrency(ing.estimatedCost)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Instructions */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <ListOrdered className="h-4 w-4 text-emerald-500" />
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            Instructions
                          </h4>
                        </div>
                        <ol className="space-y-2">
                          {meal.instructions.map((step, i) => (
                            <li key={i} className="flex gap-3 text-sm text-zinc-700">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mt-0.5">
                                {i + 1}
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Nutrition */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Flame className="h-4 w-4 text-amber-500" />
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            Nutrition &middot; per serving
                          </h4>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                          {[
                            {
                              icon: Flame,
                              value: meal.nutritionInfo.calories,
                              unit: "kcal",
                              label: "Calories",
                              color: "text-amber-600 bg-amber-50",
                            },
                            {
                              icon: Drumstick,
                              value: meal.nutritionInfo.protein,
                              unit: "g",
                              label: "Protein",
                              color: "text-red-600 bg-red-50",
                            },
                            {
                              icon: Wheat,
                              value: meal.nutritionInfo.carbs,
                              unit: "g",
                              label: "Carbs",
                              color: "text-blue-600 bg-blue-50",
                            },
                            {
                              icon: Droplets,
                              value: meal.nutritionInfo.fat,
                              unit: "g",
                              label: "Fat",
                              color: "text-purple-600 bg-purple-50",
                            },
                          ].map((nut) => (
                            <div
                              key={nut.label}
                              className="flex flex-col items-center p-3 rounded-xl bg-white border border-zinc-100"
                            >
                              <nut.icon className={`h-4 w-4 ${nut.color.split(" ")[0]} mb-1`} />
                              <span className="font-bold text-sm tabular-nums text-zinc-900">
                                {nut.value}
                              </span>
                              <span className="text-[10px] text-zinc-400 uppercase tracking-wide">
                                {nut.unit} {nut.label.toLowerCase()}
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-zinc-400 mt-3 text-center">
                          {meal.servings} {meal.servings === 1 ? "serving" : "servings"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
