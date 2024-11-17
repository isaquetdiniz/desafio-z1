import { DomainError } from "@/core/errors";
import { ValueObject } from "@/core/value-object";
import { isString, length } from "class-validator";

export class Title extends ValueObject {
	private constructor(name: string) {
		super(name);
	}

	static create(name: string) {
		return new Title(name);
	}

	validate(name: string) {
		if (!name) {
			throw new DomainError("Title is required");
		}

		if (!isString(name)) {
			throw new DomainError("Title must to be a string");
		}

		if (!length(name, 3, 255)) {
			throw new DomainError("Title must have at least 3 char and 255 in max");
		}
	}
}
