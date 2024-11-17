export class DomainError extends Error {
	constructor(
		message: string,
		readonly name = "DomainError",
	) {
		super(message);
	}
}

export class ApplicationError extends Error {
	constructor(
		message: string,
		readonly name = "ApplicationError",
	) {
		super(message);
	}
}
