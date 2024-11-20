import { Documentation } from "@/libs/swagger";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductListDTO } from "./get-products.dto";
import { GetProductsUseCase } from "./get-products.use-case";

@Controller("products")
@ApiTags("Products")
export class GetProductsController {
	constructor(private readonly getProductsUseCase: GetProductsUseCase) {}

	@Documentation({
		summary: "Get products.",
		description: "Get a list of products.",
		response: {
			description: "The list of products returned successfully.",
			type: ProductListDTO,
		},
	})
	@Get()
	async handle() {
		const products = await this.getProductsUseCase.perform();

		return {
			data: products,
		};
	}
}
