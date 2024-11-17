import { describe, expect, it } from "vitest";
import { ApplicationError, DomainError } from "./errors";

describe("DomainError", () => {
	it("Should have correct name", () => {
		const error = new DomainError("new error");

		expect(error.name).toBe("DomainError");
	});

	it("Should have correct message", () => {
		const message = "new error";
		const error = new DomainError(message);

		expect(error.message).toBe(message);
	});
});

describe("ApplicationError", () => {
	it("Should have correct name", () => {
		const error = new ApplicationError("new error");

		expect(error.name).toBe("ApplicationError");
	});

	it("Should have correct message", () => {
		const message = "new error";
		const error = new ApplicationError(message);

		expect(error.message).toBe(message);
	});
});
