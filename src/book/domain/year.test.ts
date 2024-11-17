import { DomainError } from "@/core/errors";
import { describe, expect, it } from "vitest";
import { Year } from "./year";

describe("Year", () => {
	it("Should return a DomainError if value not is passed", () => {
		//@ts-ignore
		const test = () => Year.create();

		expect(test).toThrowError(new DomainError("Year is required"));
	});

	it("Should return a DomainError if value not is an integer", () => {
		//@ts-ignore
		const test = () => Year.create("oioioi");

		expect(test).toThrowError(new DomainError("Year must to be an integer"));
	});

	it("Should return a DomainError if value is lowest than 0", () => {
		const test = () => Year.create(-4);

		expect(test).toThrowError(
			new DomainError("Year must to be biggest or equal 0"),
		);
	});

	it("Should create a Year successfully", () => {
		const result = Year.create(1994);

		expect(result.value).toBe(1994);
	});
});
