import { DrizzleService } from "@/libs/drizzle";
import * as schema from "@/libs/drizzle/schema";
import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { Product } from "./product";

@Injectable()
export class DrizzleProductRepository {
	constructor(private readonly drizzleConnection: DrizzleService) {}

	async findMany(): Promise<Product[]> {
		const rows = await this.drizzleConnection.db
			.select({
				product: schema.product,
				inventoryMovement: schema.inventoryMovement,
			})
			.from(schema.product)
			.leftJoin(
				schema.inventoryMovement,
				eq(schema.product.id, schema.inventoryMovement.productId),
			)
			.all();

		const result = rows.reduce<Record<string, Product>>((acc, row) => {
			const product = row.product;
			const inventoryMovement = row.inventoryMovement;

			if (!acc[product.id]) {
				acc[product.id] = { ...product, stock: 0 };
			}

			if (inventoryMovement) {
				const newStock =
					inventoryMovement.type === "ADD"
						? acc[product.id].stock + inventoryMovement.quantity
						: acc[product.id].stock - inventoryMovement.quantity;
				acc[product.id] = { ...acc[product.id], stock: newStock };
			}
			return acc;
		}, {});

		return Object.values(result);
	}
}
