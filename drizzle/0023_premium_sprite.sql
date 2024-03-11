ALTER TABLE "checks" ALTER COLUMN "date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "habits" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "auth_user" ADD COLUMN "verification_token" varchar(64);