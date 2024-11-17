import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
	IsInt,
	IsOptional,
	IsString,
	IsUUID,
	Length,
	Min,
} from "class-validator";

export class CreateBookBody {
	@ApiProperty({
		description: "The book tile",
		example: "Era uma vez",
	})
	@IsString()
	@Length(1, 255)
	title: string;

	@ApiProperty({
		description: "The book author",
		example: "Carlinhos bala",
	})
	@IsString()
	@Length(1, 255)
	author: string;

	@ApiProperty({
		description: "The book genre",
		example: "Romance",
	})
	@IsString()
	@Length(1, 255)
	genre: string;

	@ApiProperty({
		description: "The book publish year",
		example: 1948,
	})
	@IsInt()
	@Min(0)
	publishYear: number;

	@ApiProperty({
		description: "The book stock quantity",
		example: 140,
	})
	@IsInt()
	@Min(0)
	quantity: number;
}

export class GetBooksQuery {
	@ApiPropertyOptional({
		description: "The book genre to search for",
	})
	@IsOptional()
	@IsString()
	@Length(1, 255)
	genre?: string;
}

export class GetBookByIdParams {
	@ApiProperty({
		description: "The book id",
	})
	@IsUUID(4)
	id: string;
}

export class UpdateBookBody {
	@ApiPropertyOptional({
		description: "The book tile",
		example: "Era uma vez",
	})
	@IsOptional()
	@IsString()
	@Length(1, 255)
	title?: string;

	@ApiPropertyOptional({
		description: "The book author",
		example: "Carlinhos bala",
	})
	@IsOptional()
	@IsString()
	@Length(1, 255)
	author?: string;

	@ApiPropertyOptional({
		description: "The book genre",
		example: "Romance",
	})
	@IsOptional()
	@IsString()
	@Length(1, 255)
	genre?: string;

	@ApiPropertyOptional({
		description: "The book publish year",
		example: 1948,
	})
	@IsOptional()
	@IsInt()
	@Min(0)
	publishYear?: number;

	@ApiPropertyOptional({
		description: "The book stock quantity",
		example: 140,
	})
	@IsOptional()
	@IsInt()
	@Min(0)
	quantity?: number;
}

export class BookDTO {
	@ApiProperty({
		description: "The book id",
		example: "850f1fa5-6cf0-4768-ac6f-bf23d87bdc97",
	})
	id: string;

	@ApiProperty({
		description: "The book tile",
		example: "Era uma vez",
	})
	title: string;

	@ApiProperty({
		description: "The book author",
		example: "Carlinhos bala",
	})
	author: string;

	@ApiProperty({
		description: "The book genre",
		example: "Romance",
	})
	genre: string;

	@ApiProperty({
		description: "The book publish year",
		example: 1948,
	})
	publishYear: number;

	@ApiProperty({
		description: "The book stock quantity",
		example: 140,
	})
	quantity: number;
}

export class BookDetailDTO {
	@ApiProperty({
		description: "The books details",
	})
	data: BookDTO;
}

export class BooksListDTO {
	@ApiProperty({
		description: "The books list",
		isArray: true,
		type: BookDTO,
	})
	data: BookDTO[];
}
