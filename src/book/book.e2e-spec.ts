import { randomUUID } from "node:crypto";
import { unlink } from "node:fs/promises";
import { books } from "@/libs/drizzle/schema";
import { HttpStatus, type INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import request from "supertest";
import {
	afterAll,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from "vitest";
import { BookModule } from "./book.module";
import type { CreateBookBody } from "./dtos";

describe("books", async () => {
	let app: INestApplication;

	beforeEach(async () => {
		await makeDb();

		return async () => {
			await cleanBooks();
		};
	});

	beforeAll(async () => {
		app = await makeSut();
	});

	afterAll(async () => {
		await app.close();
		await destroyDb();
	});

	describe("/POST books", () => {
		it("Should create book successfully", async () => {
			vi.mock("node:crypto", () => ({
				randomUUID: () => DEFAULT_ID,
			}));

			const requestBody: CreateBookBody = {
				title: "Titulo",
				author: "Autor",
				genre: "Genero",
				publishYear: 1999,
				quantity: 1,
			};

			const response = await request(app.getHttpServer())
				.post("/books")
				.send(requestBody);

			expect(response.status).toBe(HttpStatus.CREATED);
			expect(response.body).toStrictEqual({
				data: { id: DEFAULT_ID, ...requestBody },
			});
		});
	});

	describe("/GET books", () => {
		it("Should get books successfully", async () => {
			await insertBookOnDb(DEFAULT_BOOK);
			await insertBookOnDb({ ...DEFAULT_BOOK, id: "id-2" });
			await insertBookOnDb({ ...DEFAULT_BOOK, id: "id-3" });

			const response = await request(app.getHttpServer()).get("/books");

			expect(response.status).toBe(HttpStatus.OK);
			expect(response.body.data).toHaveLength(3);
		});

		it("Should get [] if no books", async () => {
			const response = await request(app.getHttpServer()).get("/books");

			expect(response.status).toBe(HttpStatus.OK);
			expect(response.body.data).toHaveLength(0);
		});
	});

	describe("/GET books/:id", () => {
		it("Should return 400 if id not is valid", async () => {
			const response = await request(app.getHttpServer()).get("/books/id");

			expect(response.status).toBe(HttpStatus.BAD_REQUEST);
		});

		it("Should get book by id successfully", async () => {
			await insertBookOnDb(DEFAULT_BOOK);

			const response = await request(app.getHttpServer()).get(
				`/books/${DEFAULT_ID}`,
			);

			expect(response.status).toBe(HttpStatus.OK);
			expect(response.body).toStrictEqual({ data: DEFAULT_BOOK });
		});

		it("Should not get if not book", async () => {
			const response = await request(app.getHttpServer()).get(
				`/books/${DEFAULT_ID}`,
			);

			expect(response.status).toBe(HttpStatus.OK);
			expect(response.body).toStrictEqual({ data: null });
		});
	});

	describe("/PATCH books/:id", () => {
		it("Should return 400 if id not is valid", async () => {
			const response = await request(app.getHttpServer()).get("/books/id");

			expect(response.status).toBe(HttpStatus.BAD_REQUEST);
		});

		it("Should update book successfully", async () => {
			await insertBookOnDb(DEFAULT_BOOK);

			const updateBookBody = {
				title: "novo titulo",
			};

			const response = await request(app.getHttpServer())
				.patch(`/books/${DEFAULT_ID}`)
				.send(updateBookBody);

			expect(response.status).toBe(HttpStatus.OK);
			expect(response.body).toStrictEqual({
				data: { ...DEFAULT_BOOK, title: updateBookBody.title },
			});
		});

		it("Should get 404 if book not found", async () => {
			const updateBookBody = {
				title: "novo titulo",
			};

			const response = await request(app.getHttpServer())
				.patch(`/books/${DEFAULT_ID}`)
				.send(updateBookBody);

			expect(response.status).toBe(HttpStatus.NOT_FOUND);
		});
	});

	describe("/DELETE books/:id", () => {
		it("Should return 400 if id not is valid", async () => {
			const response = await request(app.getHttpServer()).get("/books/id");

			expect(response.status).toBe(HttpStatus.BAD_REQUEST);
		});

		it("Should delete book successfully", async () => {
			await insertBookOnDb(DEFAULT_BOOK);

			const response = await request(app.getHttpServer()).delete(
				`/books/${DEFAULT_ID}`,
			);

			expect(response.status).toBe(HttpStatus.OK);
			expect(response.body).toStrictEqual({
				data: DEFAULT_BOOK,
			});
		});

		it("Should get 404 if book not found", async () => {
			const response = await request(app.getHttpServer()).delete(
				`/books/${DEFAULT_ID}`,
			);

			expect(response.status).toBe(HttpStatus.NOT_FOUND);
		});
	});
});

const DB_NAME = "sqlite-test.db";
const DEFAULT_ID = "5eb8c0e0-b43d-4d1f-b75b-ef1ebbef5a79";
const DEFAULT_BOOK = {
	id: DEFAULT_ID,
	title: "titulo",
	author: "author",
	genre: "genero",
	publishYear: 1999,
	quantity: 10,
};

const makeSut = async () => {
	const module = await Test.createTestingModule({
		imports: [BookModule],
	})
		.overrideProvider(ConfigService)
		.useValue({ get: () => DB_NAME })
		.compile();

	const app = module.createNestApplication();

	await app.init();

	return app;
};

const makeDb = async () => {
	const connection = Database(DB_NAME);

	const db = drizzle(connection);

	await migrate(db, { migrationsFolder: "./src/libs/drizzle/migrations" });

	await connection.close();
};

const cleanBooks = async () => {
	const connection = Database(DB_NAME);

	const db = drizzle(connection);

	await db.delete(books);
};

const destroyDb = async () => {
	await unlink(DB_NAME);
};

const insertBookOnDb = async (book: CreateBookBody & { id: string }) => {
	const connection = Database(DB_NAME);

	const db = drizzle(connection);

	await db.insert(books).values({
		id: book.id,
		title: book.title,
		author: book.author,
		genre: book.genre,
		publishYear: book.publishYear,
		quantity: book.quantity,
	});
};
