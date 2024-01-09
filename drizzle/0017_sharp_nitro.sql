CREATE TABLE IF NOT EXISTS "waitlist" (
	"id" serial PRIMARY KEY NOT NULL,
	"varchar2" varchar(256)
);
--> statement-breakpoint
ALTER TABLE "checks" ALTER COLUMN "user_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "habits" ALTER COLUMN "user_id" DROP DEFAULT;