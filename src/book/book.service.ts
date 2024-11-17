import { DrizzleBookRepository } from "@/libs/drizzle";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Author } from "./domain/author";
import { Book } from "./domain/book";
import { Genre } from "./domain/genre";
import { Title } from "./domain/title";
import { Year } from "./domain/year";
import type { CreateBookBody, GetBooksQuery, UpdateBookBody } from "./dtos";

@Injectable()
export class BookService {
	constructor(private readonly bookRepository: DrizzleBookRepository) {}

	async createBook(params: CreateBookBody) {
		const title = Title.create(params.title);
		const author = Author.create(params.author);
		const genre = Genre.create(params.genre);
		const publishYear = Year.create(params.publishYear);

		const book = Book.create({
			title,
			author,
			genre,
			publishYear,
			quantity: params.quantity,
		});

		return this.bookRepository.createBook(book);
	}

	async getBooks(params: GetBooksQuery): Promise<Book[]> {
		return this.bookRepository.getAllByFilter(params);
	}

	async getBook(id: string): Promise<Book | null> {
		return this.bookRepository.getById(id);
	}

	async updateBook(id: string, params: UpdateBookBody): Promise<Book> {
		const book = await this.bookRepository.getById(id);

		if (!book) {
			throw new NotFoundException("Book not found");
		}

		return this.bookRepository.update(id, params);
	}

	async deleteBook(id: string): Promise<Book> {
		const book = await this.bookRepository.getById(id);

		if (!book) {
			throw new NotFoundException("Book not found");
		}

		await this.bookRepository.deleteById(id);

		return book;
	}
}
