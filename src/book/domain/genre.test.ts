import { DomainError } from "@/core/errors";
import { describe, expect, it } from "vitest";
import { Genre } from "./genre";

describe("Genre", () => {
	it("Should return a DomainError if name not is passed", () => {
		//@ts-ignore
		const test = () => Genre.create();

		const test2 = () => Genre.create("");

		expect(test).toThrowError(new DomainError("Genre is required"));
		expect(test2).toThrowError(new DomainError("Genre is required"));
	});

	it("Should return a DomainError if name not is string", () => {
		//@ts-ignore
		const test = () => Genre.create(12912192);

		expect(test).toThrowError(new DomainError("Genre must to be a string"));
	});

	it("Should return a DomainError if name is too short or big", () => {
		//@ts-ignore
		const test = () => Genre.create("a".repeat(300));
		const test2 = () => Genre.create("a");

		expect(test).toThrowError(
			new DomainError("Genre must have at least 3 char and 255 in max"),
		);
		expect(test2).toThrowError(
			new DomainError("Genre must have at least 3 char and 255 in max"),
		);
	});

	it("Should create a genre successfully", () => {
		const result = Genre.create("Ação");

		expect(result.value).toBe("Ação");
	});
});
