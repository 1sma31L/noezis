ALTER TABLE "comment" DROP CONSTRAINT "comment_parentCommentId_comment_id_fk";
--> statement-breakpoint
ALTER TABLE "answer" ADD COLUMN "comments" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "question" ADD COLUMN "comments" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "quick_take" ADD COLUMN "comments" integer DEFAULT 0 NOT NULL;