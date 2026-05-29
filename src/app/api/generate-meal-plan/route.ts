import { NextResponse } from "next/server"
import { getDb } from "@/db"
import { mealPlans } from "@/db/schema"
import { desc } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const { generateMealPlan } = await import("@/lib/openai")

    const body = await request.json()

    if (!body.budget || body.budget <= 0) {
      return NextResponse.json(
        { error: "Please provide a valid budget greater than 0." },
        { status: 400 }
      )
    }

    if (!body.days || body.days < 1 || body.days > 14) {
      return NextResponse.json(
        { error: "Please provide between 1 and 14 days." },
        { status: 400 }
      )
    }

    const mealPlan = await generateMealPlan({
      budget: body.budget,
      days: body.days,
      people: body.people || 2,
      dietary: body.dietary || [],
      cuisine: body.cuisine || [],
      restrictions: body.restrictions || "",
      additionalNotes: body.additionalNotes || "",
    })

    return NextResponse.json(mealPlan)
  } catch (error) {
    console.error("Meal plan generation failed:", error)
    return NextResponse.json(
      { error: "Failed to generate meal plan. Please try again." },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const db = getDb()

    const plans = await db
      .select({
        id: mealPlans.id,
        createdAt: mealPlans.createdAt,
        budget: mealPlans.budget,
        days: mealPlans.days,
        people: mealPlans.people,
        dietary: mealPlans.dietary,
        cuisine: mealPlans.cuisine,
        restrictions: mealPlans.restrictions,
        notes: mealPlans.notes,
        data: mealPlans.data,
      })
      .from(mealPlans)
      .orderBy(desc(mealPlans.createdAt))
      .limit(20)

    return NextResponse.json(plans)
  } catch (error) {
    console.error("Failed to fetch meal plans:", error)
    return NextResponse.json(
      { error: "Failed to fetch meal plans." },
      { status: 500 }
    )
  }
}
