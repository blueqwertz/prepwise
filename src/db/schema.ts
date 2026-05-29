import { pgTable, uuid, timestamp, integer, text, jsonb, varchar } from "drizzle-orm/pg-core"

export const mealPlans = pgTable("meal_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  budget: integer("budget").notNull(),
  days: integer("days").notNull(),
  people: integer("people").notNull().default(2),
  dietary: text("dietary").array(),
  cuisine: text("cuisine").array(),
  restrictions: varchar("restrictions", { length: 500 }),
  notes: varchar("notes", { length: 500 }),
  data: jsonb("data").notNull(),
})
