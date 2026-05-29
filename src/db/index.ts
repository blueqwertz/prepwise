import { neon, NeonQueryFunction } from "@neondatabase/serverless"
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http"
import * as schema from "./schema"

let _sql: NeonQueryFunction<false, false> | null = null
let _db: NeonHttpDatabase<typeof schema> | null = null

function getSql() {
  if (!_sql) {
    _sql = neon(process.env.DATABASE_URL!)
  }
  return _sql
}

export function getDb() {
  if (!_db) {
    _db = drizzle(getSql(), { schema })
  }
  return _db
}
