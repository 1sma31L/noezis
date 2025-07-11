CREATE TYPE "public"."content_type" AS ENUM('post', 'comment', 'answer', 'quickTake');--> statement-breakpoint
CREATE TYPE "public"."reaction_type" AS ENUM('like', 'dislike');--> statement-breakpoint
CREATE TABLE "reaction" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"contentId" varchar(255) NOT NULL,
	"userId" varchar(255) NOT NULL,
	"content_type" "content_type" NOT NULL,
	"reaction_type" "reaction_type" NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "jobTitle" varchar(100);--> statement-breakpoint
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_contentId_post_id_fk" FOREIGN KEY ("contentId") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post" DROP COLUMN "upvotes";--> statement-breakpoint
ALTER TABLE "post" DROP COLUMN "downvotes";