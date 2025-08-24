import { sql, relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  unique,
  index,
} from "drizzle-orm/pg-core";
import { ANONYMOUS_PROFILE_IMAGE } from "@/lib/constants";

export const contentTypeEnum = pgEnum("content_type", [
  "post",
  "question",
  "answer",
  "quickTake",
]);

export const reactionTypeEnum = pgEnum("reaction_type", ["like", "dislike"]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image").default(ANONYMOUS_PROFILE_IMAGE),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const profile = pgTable("profile", (d) => ({
  id: d
    .varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: d
    .varchar({ length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  username: d.varchar({ length: 50 }).notNull().unique(),
  bio: d.text(),
  jobTitle: d.varchar({ length: 100 }),
  location: d.varchar({ length: 100 }),
  website: d.varchar({ length: 255 }),
  bannerImage: d.varchar({ length: 255 }),
  dateOfBirth: d.date(),
  gender: d.varchar({ length: 50 }),
  interests: d.text(),
  isVerified: d.boolean().notNull().default(false),
  isLove: d.boolean().notNull().default(false),
  isPrivate: d.boolean().notNull().default(false),
  isBanned: d.boolean().notNull().default(false),
  isDeleted: d.boolean().notNull().default(false),
  createdAt: d
    .timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: d
    .timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
}));

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, { fields: [profile.userId], references: [user.id] }),
}));

export const post = pgTable("post", (d) => ({
  id: d
    .varchar({ length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  authorId: d
    .varchar({ length: 255 })
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  title: d.varchar({ length: 255 }).notNull(),
  content: d.jsonb().notNull(),
  tags: d.text().array(),
  thumbnail: d.varchar({ length: 255 }),
  views: d.integer().notNull().default(0),
  comments: d.integer().notNull().default(0),
  shares: d.integer().notNull().default(0),
  isReviewed: d.boolean().notNull().default(false),
  isPublished: d.boolean().notNull().default(false),
  isRefused: d.boolean().notNull().default(false),
  isDeleted: d.boolean().notNull().default(false),
  refusedReason: d.text(),
  createdAt: d
    .timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: d
    .timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
}));

export const postRelations = relations(post, ({ one }) => ({
  author: one(profile, {
    fields: [post.authorId],
    references: [profile.userId],
  }),
}));

export const reaction = pgTable(
  "reaction",
  (d) => ({
    id: d.varchar({ length: 255 }).primaryKey(),
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    contentId: d.varchar({ length: 255 }).notNull(),
    contentType: contentTypeEnum("content_type").notNull(),
    type: reactionTypeEnum("reaction_type").notNull(),
    createdAt: d
      .timestamp({ mode: "date", withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: d
      .timestamp({ mode: "date", withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  }),
  (table) => ({
    // Composite unique constraint to prevent duplicate reactions
    uniqueUserContentReaction: unique().on(
      table.userId,
      table.contentId,
      table.contentType,
    ),
    // Indexes for performance
    userIdIdx: index().on(table.userId),
    contentIdx: index().on(table.contentId, table.contentType),
  }),
);

export const save = pgTable("save", (d) => ({
  id: d.varchar({ length: 255 }).primaryKey(),
  contentId: d
    .varchar({ length: 255 })
    .notNull()
    .references(() => post.id, { onDelete: "cascade" }),
  userId: d
    .varchar({ length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: d
    .timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: d
    .timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
}));

export const saveRelations = relations(save, ({ one }) => ({
  content: one(post, {
    fields: [save.contentId],
    references: [post.id],
  }),
  user: one(user, {
    fields: [save.userId],
    references: [user.id],
  }),
}));

export const quickTake = pgTable("quick_take", (d) => ({
  id: d
    .varchar({ length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  authorId: d
    .varchar({ length: 255 })
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  content: d.text().notNull(),
  tags: d.text().array(),
  comments: d.integer().notNull().default(0),
  isDeleted: d.boolean().notNull().default(false),
  createdAt: d
    .timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: d
    .timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
}));

export const quickTakeRelations = relations(quickTake, ({ one }) => ({
  author: one(profile, {
    fields: [quickTake.authorId],
    references: [profile.userId],
  }),
}));

export const question = pgTable("question", (d) => ({
  id: d
    .varchar({ length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  authorId: d
    .varchar({ length: 255 })
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  title: d.varchar({ length: 255 }).notNull(),
  content: d.text().notNull(),
  tags: d.text().array(),
  comments: d.integer().notNull().default(0),
  isDeleted: d.boolean().notNull().default(false),
  createdAt: d
    .timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: d
    .timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
}));

export const questionRelations = relations(question, ({ one }) => ({
  author: one(profile, {
    fields: [question.authorId],
    references: [profile.userId],
  }),
}));

export const answer = pgTable("answer", (d) => ({
  id: d
    .varchar({ length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  questionId: d
    .varchar({ length: 255 })
    .notNull()
    .references(() => question.id, { onDelete: "cascade" }),
  authorId: d
    .varchar({ length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  content: d.text().notNull(),
  tags: d.text().array(),
  comments: d.integer().notNull().default(0),
  isDeleted: d.boolean().notNull().default(false),
  createdAt: d
    .timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: d
    .timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
}));

export const answerRelations = relations(answer, ({ one }) => ({
  author: one(profile, {
    fields: [answer.authorId],
    references: [profile.userId],
  }),
  question: one(question, {
    fields: [answer.questionId],
    references: [question.id],
  }),
}));

export const comment = pgTable("comment", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  contentType: contentTypeEnum("content_type").notNull(),
  contentId: text("content_id").notNull(),
  parentCommentId: text("parent_comment_id"),
  content: text("content").notNull(),
  isDeleted: boolean("is_deleted").notNull().default(false),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const commentRelations = relations(comment, ({ one, many }) => ({
  author: one(profile, {
    fields: [comment.authorId],
    references: [profile.userId],
  }),
  parentComment: one(comment, {
    fields: [comment.parentCommentId],
    references: [comment.id],
    relationName: "CommentReplies",
  }),
  replies: many(comment, {
    relationName: "CommentReplies",
  }),
}));
