export interface Ingredient {
  name: string
  amount: string
  estimatedCost: number
}

export interface NutritionInfo {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface Meal {
  id: string
  name: string
  description: string
  ingredients: Ingredient[]
  instructions: string[]
  nutritionInfo: NutritionInfo
  estimatedTotalCost: number
  servings: number
  mealType: "breakfast" | "lunch" | "dinner" | "snack"
}

export interface DayPlan {
  day: string
  date: string
  meals: Meal[]
  dailyTotalCost: number
}

export interface MealPlan {
  weeklyBudget: number
  totalCost: number
  remainingBudget: number
  days: DayPlan[]
  tips: string[]
}

export interface MealPlanRequest {
  budget: number
  days: number
  people: number
  dietary: string[]
  cuisine: string[]
  restrictions: string
  additionalNotes: string
}
