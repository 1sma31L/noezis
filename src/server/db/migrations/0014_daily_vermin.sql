ALTER TABLE "reaction" DROP CONSTRAINT "reaction_post_id_fkey";
--> statement-breakpoint
ALTER TABLE "reaction" DROP CONSTRAINT "reaction_quick_take_id_fkey";
--> statement-breakpoint
CREATE INDEX "reaction_userId_index" ON "reaction" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "reaction_contentId_content_type_index" ON "reaction" USING btree ("contentId","content_type");--> statement-breakpoint
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_userId_contentId_content_type_unique" UNIQUE("userId","contentId","content_type");