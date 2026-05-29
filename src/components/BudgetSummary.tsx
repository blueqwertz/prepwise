import { TrendingDown, TrendingUp, Lightbulb, CheckCircle2 } from "lucide-react"
import type { MealPlan } from "@/types"
import { formatCurrency } from "@/lib/utils"

interface Props {
  mealPlan: MealPlan
}

export default function BudgetSummary({ mealPlan }: Props) {
  const pctUsed = Math.round(
    (mealPlan.totalCost / mealPlan.weeklyBudget) * 100
  )

  const isOverBudget = mealPlan.remainingBudget < 0
  const isTight = !isOverBudget && pctUsed > 85

  const barColor = isOverBudget
    ? "bg-red-500"
    : isTight
      ? "bg-amber-500"
      : "bg-emerald-500"

  return (
    <div className="rounded-2xl bg-white border border-zinc-200/60 shadow-sm overflow-hidden">
      <div className="p-6">
        <h3 className="font-bold text-lg mb-1">Budget Overview</h3>
        <p className="text-sm text-zinc-500 mb-6">
          Your {mealPlan.days.length}-day meal budget at a glance
        </p>

        {/* Numbers */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-zinc-400" />
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                Total Spend
              </span>
            </div>
            <span className="text-2xl font-bold text-zinc-900 tabular-nums">
              {formatCurrency(mealPlan.totalCost)}
            </span>
          </div>
          <div
            className={`p-4 rounded-2xl border ${
              isOverBudget || isTight
                ? "bg-red-50 border-red-100"
                : "bg-emerald-50 border-emerald-100"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown
                className={`h-4 w-4 ${
                  isOverBudget || isTight ? "text-red-400" : "text-emerald-500"
                }`}
              />
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                Remaining
              </span>
            </div>
            <span
              className={`text-2xl font-bold tabular-nums ${
                isOverBudget || isTight ? "text-red-700" : "text-emerald-700"
              }`}
            >
              {formatCurrency(mealPlan.remainingBudget)}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${barColor} rounded-full transition-all duration-700 ease-out`}
              style={{ width: `${Math.min(pctUsed, 100)}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between text-xs text-zinc-400 mb-6">
          <span className="font-medium text-zinc-600">{pctUsed}% used</span>
          <span>
            Budget: {formatCurrency(mealPlan.weeklyBudget)}
          </span>
        </div>

        {/* Tips */}
        {mealPlan.tips.length > 0 && (
          <div className="rounded-2xl bg-amber-50/50 border border-amber-100 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <h4 className="text-sm font-semibold text-amber-800">
                Money-Saving Tips
              </h4>
            </div>
            <ul className="space-y-2">
              {mealPlan.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-amber-700">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
