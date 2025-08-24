CREATE TABLE "comment" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"authorId" varchar(255) NOT NULL,
	"contentType" "content_type" NOT NULL,
	"contentId" varchar(255) NOT NULL,
	"parentCommentId" varchar(255),
	"content" text NOT NULL,
	"isDeleted" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_parentCommentId_comment_id_fk" FOREIGN KEY ("parentCommentId") REFERENCES "public"."comment"("id") ON DELETE cascade ON UPDATE no action;