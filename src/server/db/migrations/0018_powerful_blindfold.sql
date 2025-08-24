ALTER TABLE "public"."reaction" ALTER COLUMN "content_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."content_type";--> statement-breakpoint
CREATE TYPE "public"."content_type" AS ENUM('post', 'question', 'answer', 'quickTake');--> statement-breakpoint
ALTER TABLE "public"."reaction" ALTER COLUMN "content_type" SET DATA TYPE "public"."content_type" USING "content_type"::"public"."content_type";