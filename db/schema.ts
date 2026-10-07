import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  city: text("city").notNull(),
  category: text("category").notNull(),
  price: real("price").notNull(),
  downPaymentPercent: real("down_payment_percent").notNull().default(20),
  installmentMonths: integer("installment_months").notNull().default(36),
  description: text("description").notNull().default(""),
  imageUrl: text("image_url").notNull().default("/lmar-hero.jpg"),
  videoUrl: text("video_url").notNull().default(""),
  brochureUrl: text("brochure_url").notNull().default("/lmar-brochure.html"),
  locationUrl: text("location_url").notNull().default(""),
  constructionProgress: integer("construction_progress").notNull().default(0),
  status: text("status").notNull().default("active"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  project: text("project").notNull().default("General inquiry"),
  message: text("message").notNull().default(""),
  source: text("source").notNull().default("website"),
  status: text("status").notNull().default("new"),
  adminNotes: text("admin_notes").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const siteVisits = sqliteTable("site_visits", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  preferredDate: text("preferred_date").notNull(),
  interest: text("interest").notNull().default(""),
  status: text("status").notNull().default("pending"),
  adminNotes: text("admin_notes").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
