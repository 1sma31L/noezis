ALTER TABLE "quick_take" ALTER COLUMN "content" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "quick_take" ADD COLUMN "authorId" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "quick_take" ADD CONSTRAINT "quick_take_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;