ALTER TABLE "comment" RENAME COLUMN "authorId" TO "author_id";--> statement-breakpoint
ALTER TABLE "comment" RENAME COLUMN "contentType" TO "content_type";--> statement-breakpoint
ALTER TABLE "comment" RENAME COLUMN "contentId" TO "content_id";--> statement-breakpoint
ALTER TABLE "comment" RENAME COLUMN "parentCommentId" TO "parent_comment_id";--> statement-breakpoint
ALTER TABLE "comment" RENAME COLUMN "isDeleted" TO "is_deleted";--> statement-breakpoint
ALTER TABLE "comment" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "comment" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "comment" DROP CONSTRAINT "comment_authorId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;