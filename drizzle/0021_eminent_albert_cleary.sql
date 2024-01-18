DO $$ BEGIN
 CREATE TYPE "status_enum" AS ENUM('HIDDEN', 'VISIBLE', 'ARCHIVED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "habits" ADD COLUMN "status" "status_enum" DEFAULT 'VISIBLE' NOT NULL;--> statement-breakpoint
ALTER TABLE "habits" DROP COLUMN IF EXISTS "hidden";