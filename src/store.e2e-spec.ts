import { randomUUID } from "node:crypto";
import { unlink } from "node:fs/promises";
import * as schema from "@/libs/drizzle/schema";
import { HttpStatus, type INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { AppModule } from "./app.module";
import {
	type InventoryMovement,
	InventoryMovementType,
	type Product,
} from "./products/product";

describe("Store", async () => {
	let app: INestApplication;

	beforeEach(async () => {
		await makeDb();

		return async () => {
			await cleanInventory();
			await cleanProducts();
		};
	});

	beforeAll(async () => {
		app = await makeSut();
	});

	afterAll(async () => {
		await app.close();
		await destroyDb();
	});

	describe("products", () => {
		describe("/GET products", () => {
			it("Should get no products if there's no product in database", async () => {
				const response = await request(app.getHttpServer()).get("/products");

				expect(response.status).toBe(HttpStatus.OK);
				expect(response.body).toStrictEqual({
					data: [],
				});
			});

			it("Should get product with stock 0 if there's no inventory", async () => {
				const product = {
					id: "id",
					name: "NOVO PRODUTO",
					description: "NOVA DESCRICAO",
					price: 1000,
				};

				await insertProductOnDb(product);

				const response = await request(app.getHttpServer()).get("/products");

				expect(response.status).toBe(HttpStatus.OK);
				expect(response.body).toStrictEqual({
					data: [{ ...product, stock: 0 }],
				});
			});

			it("Should get products with correct stock", async () => {
				const product = {
					id: "id",
					name: "NOVO PRODUTO",
					description: "NOVA DESCRICAO",
					price: 1000,
				};

				const addInventory = {
					id: "id",
					productId: product.id,
					type: InventoryMovementType.ADD,
					quantity: 1000,
				};
				const subInventory = {
					id: "id2",
					productId: product.id,
					type: InventoryMovementType.SUB,
					quantity: 500,
				};
				const inventories = [addInventory, subInventory];

				await insertProductOnDb(product);

				for (const inventory of inventories) {
					await insertInventoryOnDb(inventory);
				}

				const response = await request(app.getHttpServer()).get("/products");

				expect(response.status).toBe(HttpStatus.OK);
				expect(response.body).toStrictEqual({
					data: [{ ...product, stock: 500 }],
				});
			});

			it("Should get products", async () => {
				const product1 = {
					id: "id",
					name: "NOVO PRODUTO",
					description: "NOVA DESCRICAO",
					price: 1000,
				};
				const product2 = {
					id: "id2",
					name: "NOVO PRODUTO 2",
					description: "NOVA DESCRICAO 2",
					price: 2000,
				};

				await insertProductOnDb(product1);
				await insertProductOnDb(product2);

				const response = await request(app.getHttpServer()).get("/products");

				expect(response.status).toBe(HttpStatus.OK);
				expect(response.body).toStrictEqual({
					data: [
						{ ...product1, stock: 0 },
						{ ...product2, stock: 0 },
					],
				});
			});
		});
	});

	describe("carts", () => {
		describe("/GET cart", () => {
			it.todo("Should get cart successfully", async () => {});
		});

		describe("/PATCH carts", () => {
			it.todo("Should add new products to cart successfully", async () => {});
			it.todo(
				"Should get an error if product that are being added to card sold out",
				async () => {},
			);

			it.todo("Should increase products quantity successfully", async () => {});
			it.todo(
				"Should get an error if product that are being increased in card sold out",
				async () => {},
			);
			it.todo("Should decrease products quantity successfully", async () => {});
			it.todo("Should remove products of cart successfully", async () => {});
		});
	});

	describe("order", () => {
		describe("/POST order", () => {
			it.todo("Should create order successfully", async () => {});
			it.todo(
				"Should get an error if any cart products sold out",
				async () => {},
			);
		});
	});
});

const DB_NAME = "sqlite-store-test.db";

const makeSut = async () => {
	const module = await Test.createTestingModule({
		imports: [AppModule],
	})
		.overrideProvider(ConfigService)
		.useValue({ getOrThrow: () => DB_NAME })
		.compile();

	const app = module.createNestApplication();

	await app.init();

	return app;
};

const insertProductOnDb = async (newProduct: Partial<Product>) => {
	const connection = Database(DB_NAME);
	const db = drizzle(connection);

	await db.insert(schema.product).values({
		id: newProduct.id ?? randomUUID(),
		name: newProduct.name ?? "FAKE_NAME",
		description: newProduct.description ?? "FAKE_DESCRIPTION",
		price: newProduct.price ?? 1000,
	});

	connection.close();
};

const insertInventoryOnDb = async (
	newInventory: Partial<InventoryMovement>,
) => {
	const connection = Database(DB_NAME);
	const db = drizzle(connection);

	await db.insert(schema.inventoryMovement).values({
		id: newInventory.id ?? randomUUID(),
		productId: newInventory.productId,
		type: (newInventory.type as string) ?? "FAKE_DESCRIPTION",
		quantity: newInventory.quantity ?? 1000,
	});

	connection.close();
};

const cleanProducts = async () => {
	const connection = Database(DB_NAME);
	const db = drizzle(connection);

	await db.delete(schema.product);

	connection.close();
};

const cleanInventory = async () => {
	const connection = Database(DB_NAME);
	const db = drizzle(connection);

	await db.delete(schema.inventoryMovement);

	connection.close();
};

const destroyDb = async () => {
	await unlink(DB_NAME);
};

const makeDb = async () => {
	const connection = Database(DB_NAME);

	const db = drizzle(connection);

	await migrate(db, { migrationsFolder: "./src/libs/drizzle/migrations" });

	await connection.close();
};
