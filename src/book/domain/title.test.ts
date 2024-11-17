import { DomainError } from "@/core/errors";
import { describe, expect, it } from "vitest";
import { Title } from "./title";

describe("Title", () => {
	it("Should return a DomainError if name not is passed", () => {
		//@ts-ignore
		const test = () => Title.create();
		const test2 = () => Title.create("");

		expect(test).toThrowError(new DomainError("Title is required"));
		expect(test2).toThrowError(new DomainError("Title is required"));
	});

	it("Should return a DomainError if name not is string", () => {
		//@ts-ignore
		const test = () => Title.create(12912192);

		expect(test).toThrowError(new DomainError("Title must to be a string"));
	});

	it("Should return a DomainError if name is too short or big", () => {
		//@ts-ignore
		const test = () => Title.create("a".repeat(300));
		const test2 = () => Title.create("a");

		expect(test).toThrowError(
			new DomainError("Title must have at least 3 char and 255 in max"),
		);
		expect(test2).toThrowError(
			new DomainError("Title must have at least 3 char and 255 in max"),
		);
	});

	it("Should create title successfully", () => {
		const result = Title.create("Filme top");

		expect(result.value).toBe("Filme top");
	});
});
