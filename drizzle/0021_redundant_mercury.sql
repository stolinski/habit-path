DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('HIDDEN', 'VISIBLE', 'ARCHIVED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "habits" ADD COLUMN "status" "status";

UPDATE habits
SET status = CASE
    WHEN hidden THEN 'VISIBLE'
    ELSE 'HIDDEN'
END;

ALTER TABLE habits DROP COLUMN hidden;