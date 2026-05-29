import OpenAI from "openai"
import { getDb } from "@/db"
import { mealPlans } from "@/db/schema"

let _openai: OpenAI | null = null

function getClient(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  return _openai
}

const SYSTEM_PROMPT = `You are Prepwise, an expert AI meal planner focused on budget-friendly, nutritious eating. You create realistic, practical meal plans based on grocery store prices in Austria/Central Europe.

When generating meal plans:
- Use realistic grocery prices (in EUR) based on current market rates
- Include variety across days — no repeating the same meals
- Balance nutrition: aim for proteins, complex carbs, healthy fats, fiber
- Be specific with ingredient amounts and brand-agnostic
- Provide clear, numbered cooking instructions
- Suggest meals that work for the specified number of people
- Stay strictly within the weekly budget

Respond ONLY with valid JSON in this exact structure:
{
  "weeklyBudget": number,
  "totalCost": number,
  "remainingBudget": number,
  "days": [
    {
      "day": "Monday",
      "date": "YYYY-MM-DD",
      "meals": [
        {
          "id": "unique-string",
          "name": "Meal Name",
          "description": "Brief tasty description",
          "ingredients": [
            { "name": "Ingredient", "amount": "200g", "estimatedCost": 1.50 }
          ],
          "instructions": ["Step 1...", "Step 2..."],
          "nutritionInfo": { "calories": 500, "protein": 30, "carbs": 50, "fat": 20 },
          "estimatedTotalCost": 12.50,
          "servings": 2,
          "mealType": "dinner"
        }
      ],
      "dailyTotalCost": number
    }
  ],
  "tips": ["tip 1", "tip 2"]
}

Daily meals should include breakfast, lunch, dinner, and optional snack.
Costs must be realistic average grocery prices for the region.`

export function buildMealPlanPrompt(request: {
  budget: number
  days: number
  people: number
  dietary: string[]
  cuisine: string[]
  restrictions: string
  additionalNotes: string
}): string {
  const parts: string[] = []

  parts.push(`Create a ${request.days}-day meal plan with a weekly budget of €${request.budget} for ${request.people} ${request.people === 1 ? "person" : "people"}.`)

  if (request.dietary.length > 0) {
    parts.push(`Dietary preferences: ${request.dietary.join(", ")}.`)
  }

  if (request.cuisine.length > 0) {
    parts.push(`Preferred cuisines: ${request.cuisine.join(", ")}.`)
  }

  if (request.restrictions.trim()) {
    parts.push(`Restrictions/allergies: ${request.restrictions}.`)
  }

  if (request.additionalNotes.trim()) {
    parts.push(`Additional notes: ${request.additionalNotes}.`)
  }

  parts.push("IMPORTANT: Return only valid JSON. No markdown formatting, no code blocks, no extra text — just the raw JSON object.")

  return parts.join("\n")
}

export async function generateMealPlan(request: {
  budget: number
  days: number
  people: number
  dietary: string[]
  cuisine: string[]
  restrictions: string
  additionalNotes: string
}) {
  const prompt = buildMealPlanPrompt(request)
  const client = getClient()

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    temperature: 0.8,
    max_tokens: 4000,
  })

  const content = response.choices[0]?.message?.content
  if (!content) {
    throw new Error("No response from OpenAI")
  }

  const cleaned = content
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim()

  const plan = JSON.parse(cleaned)

  const db = getDb()

  await db.insert(mealPlans).values({
    budget: request.budget,
    days: request.days,
    people: request.people,
    dietary: request.dietary,
    cuisine: request.cuisine,
    restrictions: request.restrictions || null,
    notes: request.additionalNotes || null,
    data: plan,
  })

  return plan
}
