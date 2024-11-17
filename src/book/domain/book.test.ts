import { DomainError } from "@/core/errors";
import { describe, expect, it, vi } from "vitest";
import { Author } from "./author";
import { Book } from "./book";
import { Genre } from "./genre";
import { Title } from "./title";
import { Year } from "./year";

describe("Book", () => {
	it("Should throw a DomainError when try to create a Book and publishYear is in the future", () => {
		const test = () =>
			Book.create({
				title: Title.create("Titulo"),
				author: Author.create("Autor"),
				genre: Genre.create("genero"),
				publishYear: Year.create(2027),
				quantity: 19,
			});

		expect(test).toThrowError(
			new DomainError("Not is possible create a book with future publishYear"),
		);
	});

	it("Should throw a DomainError when try to restore a Book and publishYear is in the future", () => {
		const test = () =>
			Book.restore({
				id: "id",
				title: Title.create("Titulo"),
				author: Author.create("Autor"),
				genre: Genre.create("genero"),
				publishYear: Year.create(2027),
				quantity: 19,
			});

		expect(test).toThrowError(
			new DomainError("Not is possible create a book with future publishYear"),
		);
	});

	it("Should create a Book successfully", () => {
		vi.mock("node:crypto", () => ({
			randomUUID: () => "id",
		}));

		const result = Book.create({
			title: Title.create("Titulo"),
			author: Author.create("Autor"),
			genre: Genre.create("genero"),
			publishYear: Year.create(1999),
			quantity: 19,
		});

		expect(result.toJSON()).toStrictEqual({
			id: "id",
			title: "Titulo",
			author: "Autor",
			genre: "genero",
			publishYear: 1999,
			quantity: 19,
		});
	});

	it("Should restore a Book successfully", () => {
		const result = Book.restore({
			id: "id",
			title: Title.create("Titulo"),
			author: Author.create("Autor"),
			genre: Genre.create("genero"),
			publishYear: Year.create(1999),
			quantity: 19,
		});

		expect(result).toBeInstanceOf(Book);
		expect(result.toJSON()).toStrictEqual({
			id: "id",
			title: "Titulo",
			author: "Autor",
			genre: "genero",
			publishYear: 1999,
			quantity: 19,
		});
	});

	it("Should be parsed in JSON correctly", () => {
		const result = Book.restore({
			id: "id",
			title: Title.create("Titulo"),
			author: Author.create("Autor"),
			genre: Genre.create("genero"),
			publishYear: Year.create(1999),
			quantity: 19,
		});

		expect(result.toJSON()).toStrictEqual({
			id: "id",
			title: "Titulo",
			author: "Autor",
			genre: "genero",
			publishYear: 1999,
			quantity: 19,
		});
	});
});
