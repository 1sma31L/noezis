CREATE TYPE "public"."content_type" AS ENUM('post', 'comment', 'answer', 'quickTake');--> statement-breakpoint
CREATE TYPE "public"."reaction_type" AS ENUM('like', 'dislike');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"authorId" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" jsonb NOT NULL,
	"tags" text[],
	"thumbnail" varchar(255),
	"views" integer DEFAULT 0 NOT NULL,
	"comments" integer DEFAULT 0 NOT NULL,
	"shares" integer DEFAULT 0 NOT NULL,
	"isReviewed" boolean DEFAULT false NOT NULL,
	"isPublished" boolean DEFAULT false NOT NULL,
	"isRefused" boolean DEFAULT false NOT NULL,
	"isDeleted" boolean DEFAULT false NOT NULL,
	"refusedReason" text,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"username" varchar(50) NOT NULL,
	"bio" text,
	"jobTitle" varchar(100),
	"location" varchar(100),
	"website" varchar(255),
	"bannerImage" varchar(255),
	"dateOfBirth" date,
	"gender" varchar(50),
	"interests" text,
	"isVerified" boolean DEFAULT false NOT NULL,
	"isLove" boolean DEFAULT false NOT NULL,
	"isPrivate" boolean DEFAULT false NOT NULL,
	"isBanned" boolean DEFAULT false NOT NULL,
	"isDeleted" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "profile_username_unique" UNIQUE("username")
);
--> statement-breakpoint
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
CREATE TABLE "save" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"contentId" varchar(255) NOT NULL,
	"userId" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text DEFAULT 'https://i.pinimg.com/736x/22/02/f1/2202f1513fa534d5e3698ae8619d9474.jpg',
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_contentId_post_id_fk" FOREIGN KEY ("contentId") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "save" ADD CONSTRAINT "save_contentId_post_id_fk" FOREIGN KEY ("contentId") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "save" ADD CONSTRAINT "save_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;