import { DomainError } from "@/core/errors";
import { describe, expect, it } from "vitest";
import { Author } from "./author";

describe("Author", () => {
	it("Should return a DomainError if name not is passed", () => {
		//@ts-ignore
		const test = () => Author.create();

		const test2 = () => Author.create("");

		expect(test).toThrowError(new DomainError("Author is required"));
		expect(test2).toThrowError(new DomainError("Author is required"));
	});

	it("Should return a DomainError if name not is string", () => {
		//@ts-ignore
		const test = () => Author.create(12912192);

		expect(test).toThrowError(new DomainError("Author must to be a string"));
	});

	it("Should return a DomainError if name is too short or big", () => {
		//@ts-ignore
		const test = () => Author.create("a".repeat(300));
		const test2 = () => Author.create("a");

		expect(test).toThrowError(
			new DomainError("Author must have at least 3 char and 255 in max"),
		);
		expect(test2).toThrowError(
			new DomainError("Author must have at least 3 char and 255 in max"),
		);
	});

	it("Should create a Author successfully", () => {
		const result = Author.create("Carlinhos");

		expect(result.value).toBe("Carlinhos");
	});
});
