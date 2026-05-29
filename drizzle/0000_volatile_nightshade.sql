CREATE TABLE "meal_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"budget" integer NOT NULL,
	"days" integer NOT NULL,
	"people" integer DEFAULT 2 NOT NULL,
	"dietary" text[],
	"cuisine" text[],
	"restrictions" varchar(500),
	"notes" varchar(500),
	"data" jsonb NOT NULL
);
