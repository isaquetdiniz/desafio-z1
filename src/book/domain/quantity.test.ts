import { DomainError } from "@/core/errors";
import { describe, expect, it } from "vitest";
import { Quantity } from "./quantity";

describe("Quantity", () => {
	it("Should return a DomainError if value not is passed", () => {
		//@ts-ignore
		const test = () => Quantity.create();

		expect(test).toThrowError(new DomainError("Quantity is required"));
	});

	it("Should return a DomainError if value not is an integer", () => {
		//@ts-ignore
		const test = () => Quantity.create("oioioi");

		expect(test).toThrowError(
			new DomainError("Quantity must to be an integer"),
		);
	});

	it("Should return a DomainError if value is lowest than 0", () => {
		const test = () => Quantity.create(-4);

		expect(test).toThrowError(
			new DomainError("Quantity must to be biggest or equal 0"),
		);
	});

	it("Should create a quantity successfully", () => {
		const result = Quantity.create(20);

		expect(result.value).toBe(20);
	});
});
