ALTER TABLE "quick_take" ALTER COLUMN "thumbnail" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "quick_take" ADD COLUMN "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE "quick_take" DROP COLUMN "title";