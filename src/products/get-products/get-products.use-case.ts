import { Injectable } from "@nestjs/common";
import { DrizzleProductRepository } from "../product.repository";

@Injectable()
export class GetProductsUseCase {
	constructor(private readonly productRepository: DrizzleProductRepository) {}

	async perform() {
		return this.productRepository.findMany();
	}
}
