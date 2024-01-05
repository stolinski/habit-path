ALTER TABLE "habit" ADD COLUMN "days_per_month" integer;--> statement-breakpoint
ALTER TABLE "habit" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "habit" DROP COLUMN IF EXISTS "password";