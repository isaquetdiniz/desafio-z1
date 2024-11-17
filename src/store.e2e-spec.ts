import { describe, it } from "vitest";

describe("Store", async () => {
	describe("products", () => {
		describe("/GET products", () => {
			it.todo("Should get products successfully", async () => {});
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
