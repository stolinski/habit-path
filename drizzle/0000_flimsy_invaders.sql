CREATE TABLE IF NOT EXISTS "check" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date,
	"habit_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "habit" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"password" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "check" ADD CONSTRAINT "check_habit_id_habit_id_fk" FOREIGN KEY ("habit_id") REFERENCES "habit"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
