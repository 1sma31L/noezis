ALTER TABLE "save" DROP CONSTRAINT "save_post_id_fkey";
--> statement-breakpoint
ALTER TABLE "save" DROP CONSTRAINT "save_quick_take_id_fkey";
--> statement-breakpoint
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_post_id_fkey" FOREIGN KEY ("contentId") REFERENCES "public"."post"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_quick_take_id_fkey" FOREIGN KEY ("contentId") REFERENCES "public"."quick_take"("id") ON DELETE no action ON UPDATE no action;