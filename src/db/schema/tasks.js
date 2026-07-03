import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description"),

  completed: boolean("completed").default(false),

  userId: integer("user_id")
  .references(() => users.id, {
    onDelete: "cascade",
  })
  .notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});