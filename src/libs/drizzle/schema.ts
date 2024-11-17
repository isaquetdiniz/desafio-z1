import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const books = sqliteTable("books", {
	id: text("id").primaryKey(),
	title: text("title").notNull(),
	author: text("author").notNull(),
	genre: text("genre").notNull(),
	publishYear: integer("publish_year").notNull(),
	quantity: integer("quantity").notNull(),
});
