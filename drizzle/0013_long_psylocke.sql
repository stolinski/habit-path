ALTER TABLE "user_session" ADD COLUMN "session_token" varchar(256);--> statement-breakpoint
ALTER TABLE "user_session" DROP COLUMN IF EXISTS "active_expires";--> statement-breakpoint
ALTER TABLE "user_session" DROP COLUMN IF EXISTS "idle_expires";