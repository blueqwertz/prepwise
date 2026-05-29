import { NextResponse } from "next/server"
import { getDb } from "@/db"
import { mealPlans } from "@/db/schema"
import { desc } from "drizzle-orm"

export const dynamic = "force-dynamic"

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
