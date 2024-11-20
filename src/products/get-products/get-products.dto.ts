import { ApiProperty } from "@nestjs/swagger";

export class ProductDTO {
	@ApiProperty({
		description: "The product id",
		example: "850f1fa5-6cf0-4768-ac6f-bf23d87bdc97",
	})
	id: string;

	@ApiProperty({
		description: "The product name",
		example: "Era uma vez",
	})
	name: string;

	@ApiProperty({
		description: "The product description",
		example: "Era uma vez",
	})
	description: string;

	@ApiProperty({
		description: "The product price",
		example: 140,
	})
	price: number;

	@ApiProperty({
		description: "The product stock quantity",
		example: 140,
	})
	stock: number;
}

export class ProductListDTO {
	@ApiProperty({
		description: "The products list",
	})
	data: ProductDTO;
}
