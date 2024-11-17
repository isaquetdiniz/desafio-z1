import { Author } from "@/book/domain/author";
import { Book } from "@/book/domain/book";
import { Genre } from "@/book/domain/genre";
import { Title } from "@/book/domain/title";
import { Year } from "@/book/domain/year";
import type { UpdateBookBody } from "@/book/dtos";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import {
	type BetterSQLite3Database,
	drizzle,
} from "drizzle-orm/better-sqlite3";
import type { DrizzleLocalConfig } from "./config";
import * as schema from "./schema";

@Injectable()
export class DrizzleBookRepository {
	private readonly db: BetterSQLite3Database<typeof schema>;

	constructor(
		private readonly configService: ConfigService<DrizzleLocalConfig>,
	) {
		const path = this.configService.get("DB_PATH", "sqlite.db");

		const connection = new Database(path);

		this.db = drizzle(connection, { schema });
	}

	async createBook(book: Book): Promise<Book> {
		const bookJSON = book.toJSON();

		await this.db.insert(schema.books).values({
			id: bookJSON.id,
			title: bookJSON.title,
			author: bookJSON.author,
			genre: bookJSON.genre,
			publishYear: bookJSON.publishYear,
			quantity: bookJSON.quantity,
		});

		return book;
	}

	async getAllByFilter(filter: { genre?: string }): Promise<Book[]> {
		const books = await this.db.query.books.findMany({
			...(filter.genre && { where: eq(schema.books.genre, filter.genre) }),
		});

		return books.map((book) =>
			Book.restore({
				id: book.id,
				title: Title.create(book.title),
				author: Author.create(book.author),
				genre: Genre.create(book.genre),
				publishYear: Year.create(book.publishYear),
				quantity: book.quantity,
			}),
		);
	}

	async getById(id: string) {
		const book = await this.db.query.books.findFirst({
			where: eq(schema.books.id, id),
		});

		if (!book) return null;

		return Book.restore({
			id: book.id,
			title: Title.create(book.title),
			author: Author.create(book.author),
			genre: Genre.create(book.genre),
			publishYear: Year.create(book.publishYear),
			quantity: book.quantity,
		});
	}

	async update(id: string, params: UpdateBookBody) {
		const booksUpdated = await this.db
			.update(schema.books)
			.set({
				...(params.title && { title: params.title }),
				...(params.author && { author: params.author }),
				...(params.genre && { genre: params.genre }),
				...(params.publishYear && { publishYear: params.publishYear }),
				...(params.quantity && { quantity: params.quantity }),
			})
			.where(eq(schema.books.id, id))
			.returning();

		const book = booksUpdated[0];

		return Book.restore({
			id: book.id,
			title: Title.create(book.title),
			author: Author.create(book.author),
			genre: Genre.create(book.genre),
			publishYear: Year.create(book.publishYear),
			quantity: book.quantity,
		});
	}

	async deleteById(id: string) {
		return this.db.delete(schema.books).where(eq(schema.books.id, id));
	}
}
