import { DrizzleModule } from "@/libs/drizzle";
import { Module } from "@nestjs/common";
import { GetProductsController } from "./get-products/get-products.controller";
import { GetProductsUseCase } from "./get-products/get-products.use-case";
import { DrizzleProductRepository } from "./product.repository";

@Module({
	imports: [DrizzleModule],
	controllers: [GetProductsController],
	providers: [GetProductsUseCase, DrizzleProductRepository],
})
export class ProductsModule {}
