import { DomainError } from "@/core/errors";
import { ValueObject } from "@/core/value-object";
import { isInt, min } from "class-validator";

export class Quantity extends ValueObject {
	private constructor(value: number) {
		super(value);
	}

	static create(value: number) {
		return new Quantity(value);
	}

	validate(value: number) {
		if (!value) {
			throw new DomainError("Quantity is required");
		}

		if (!isInt(value)) {
			throw new DomainError("Quantity must to be an integer");
		}

		if (!min(value, 0)) {
			throw new DomainError("Quantity must to be biggest or equal 0");
		}
	}
}
