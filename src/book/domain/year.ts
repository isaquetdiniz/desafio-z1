import { DomainError } from "@/core/errors";
import { ValueObject } from "@/core/value-object";
import { isInt, min } from "class-validator";

export class Year extends ValueObject {
	private constructor(value: number) {
		super(value);
	}

	static create(value: number) {
		return new Year(value);
	}

	validate(value: number) {
		if (!value) {
			throw new DomainError("Year is required");
		}

		if (!isInt(value)) {
			throw new DomainError("Year must to be an integer");
		}

		if (!min(value, 0)) {
			throw new DomainError("Year must to be biggest or equal 0");
		}
	}
}
