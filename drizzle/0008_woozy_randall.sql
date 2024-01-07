DROP TABLE "user_key";--> statement-breakpoint
DROP TABLE "password_reset_token";--> statement-breakpoint
ALTER TABLE "auth_user" ADD COLUMN "hashed_password" varchar(255);