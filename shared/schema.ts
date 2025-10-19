import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const credibilityChecks = pgTable("credibility_checks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  text: text("text").notNull(),
  verdict: text("verdict").notNull(),
  reasoning: text("reasoning").notNull(),
  sources: text("sources").array().notNull().default(sql`ARRAY[]::text[]`),
  confidence: integer("confidence"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCredibilityCheckSchema = createInsertSchema(credibilityChecks).omit({
  id: true,
  createdAt: true,
});

export type InsertCredibilityCheck = z.infer<typeof insertCredibilityCheckSchema>;
export type CredibilityCheck = typeof credibilityChecks.$inferSelect;
