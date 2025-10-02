import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const volumes = pgTable("volumes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  volume_number: integer("volume_number").notNull(),
  poem_content: text("poem_content").notNull(),
  reflection_prompt: text("reflection_prompt").notNull(),
  soundscape_url: text("soundscape_url"),
  soundscape_title: text("soundscape_title"),
  release_date: timestamp("release_date").notNull(),
  is_current: boolean("is_current").default(false),
});

export const reflections = pgTable("reflections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  seeker_name: text("seeker_name").notNull(),
  volume_id: varchar("volume_id").references(() => volumes.id),
  reflection_content: text("reflection_content").notNull(),
  anonymous_sharing: boolean("anonymous_sharing").default(false),
  created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const session_requests = pgTable("session_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  inner_landscape: text("inner_landscape").notNull(),
  session_intent: text("session_intent").notNull(),
  created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  status: text("status").default("pending"), // pending, responded, scheduled
});

export const email_subscribers = pgTable("email_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribed_at: timestamp("subscribed_at").default(sql`CURRENT_TIMESTAMP`),
  is_active: boolean("is_active").default(true),
});

export const insertVolumeSchema = createInsertSchema(volumes).omit({
  id: true,
});

export const insertReflectionSchema = createInsertSchema(reflections).omit({
  id: true,
  created_at: true,
});

export const insertSessionRequestSchema = createInsertSchema(session_requests).omit({
  id: true,
  created_at: true,
  status: true,
});

export const insertEmailSubscriberSchema = createInsertSchema(email_subscribers).omit({
  id: true,
  subscribed_at: true,
  is_active: true,
});

export type Volume = typeof volumes.$inferSelect;
export type InsertVolume = z.infer<typeof insertVolumeSchema>;
export type Reflection = typeof reflections.$inferSelect;
export type InsertReflection = z.infer<typeof insertReflectionSchema>;
export type SessionRequest = typeof session_requests.$inferSelect;
export type InsertSessionRequest = z.infer<typeof insertSessionRequestSchema>;
export type EmailSubscriber = typeof email_subscribers.$inferSelect;
export type InsertEmailSubscriber = z.infer<typeof insertEmailSubscriberSchema>;
