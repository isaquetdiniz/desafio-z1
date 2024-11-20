import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const product = sqliteTable("products", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description").notNull(),
	price: integer("price").notNull(),
});

export const inventoryMovement = sqliteTable("inventory_movements", {
	id: text("id").primaryKey(),
	productId: text("product_id")
		.notNull()
		.references(() => product.id),
	type: text("type").notNull(),
	quantity: integer("quantity").notNull(),
});
