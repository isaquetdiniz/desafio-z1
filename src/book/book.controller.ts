import { Documentation } from "@/libs/swagger";
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BookService } from "./book.service";
import {
	BookDetailDTO,
	BooksListDTO,
	CreateBookBody,
	GetBookByIdParams,
	GetBooksQuery,
	UpdateBookBody,
} from "./dtos";

@Controller("books")
@ApiTags("Books")
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@Documentation({
		summary: "Create a new book.",
		description: "Create a new book.",
		response: {
			description: "The book created successfully.",
			type: BookDetailDTO,
		},
	})
	@Post()
	async createBook(@Body() body: CreateBookBody) {
		const book = await this.bookService.createBook(body);

		return {
			data: book,
		};
	}

	@Documentation({
		summary: "Get a books list.",
		description: "Get a books list by filter.",
		response: {
			description: "The books list returned successfully.",
			type: BooksListDTO,
		},
	})
	@Get()
	async getBooks(@Query() query: GetBooksQuery) {
		const books = await this.bookService.getBooks(query);

		return { data: books };
	}

	@Documentation({
		summary: "Get a book.",
		description: "Get a book by id.",
		response: {
			description: "The book returned successfully.",
			type: BookDetailDTO,
		},
	})
	@Get(":id")
	async getBookById(@Param() params: GetBookByIdParams) {
		const book = await this.bookService.getBook(params.id);

		return {
			data: book,
		};
	}

	@Documentation({
		summary: "Update a book.",
		description: "Update a book.",
		response: {
			description: "The book updated successfully.",
			type: BookDetailDTO,
		},
	})
	@Patch(":id")
	async updateBook(
		@Param() params: GetBookByIdParams,
		@Body() body: UpdateBookBody,
	) {
		const book = await this.bookService.updateBook(params.id, body);

		return {
			data: book,
		};
	}

	@Documentation({
		summary: "Delete a book.",
		description: "Delete a book by id.",
		response: {
			description: "The book deleted successfully.",
			type: BookDetailDTO,
		},
	})
	@Delete(":id")
	async deleteBook(@Param() params: GetBookByIdParams) {
		const book = await this.bookService.deleteBook(params.id);

		return {
			data: book,
		};
	}
}
