CREATE TABLE "save" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"contentId" varchar(255) NOT NULL,
	"userId" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "save" ADD CONSTRAINT "save_contentId_post_id_fk" FOREIGN KEY ("contentId") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "save" ADD CONSTRAINT "save_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;