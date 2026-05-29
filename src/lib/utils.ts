import type { MealPlan } from "@/types"

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(amount)
}

export function budgetColor(remaining: number, total: number): string {
  const ratio = remaining / total
  if (ratio > 0.3) return "text-emerald-600"
  if (ratio > 0.1) return "text-amber-600"
  return "text-red-600"
}

export function nutritionColor(
  mealPlan: MealPlan | null
): Record<string, string> {
  if (!mealPlan) return {}
  const allMeals = mealPlan.days.flatMap((d) => d.meals)
  const avgCals =
    allMeals.reduce((s, m) => s + m.nutritionInfo.calories, 0) /
    allMeals.length
  if (avgCals > 700) return { calories: "text-red-500" }
  if (avgCals < 300) return { calories: "text-amber-500" }
  return { calories: "text-emerald-500" }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10)
}

export function getDateForDay(dayIndex: number, startDate?: Date): string {
  const date = startDate ? new Date(startDate) : new Date()
  date.setDate(date.getDate() + dayIndex)
  return date.toISOString().split("T")[0]
}
