import { DefaultErrorFilter } from "@/libs/nest";
import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { ProductsModule } from "./products/products.module";

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), ProductsModule],
	providers: [
		{ provide: APP_FILTER, useClass: DefaultErrorFilter },
		{ provide: APP_PIPE, useValue: new ValidationPipe({ transform: true }) },
	],
})
export class AppModule {}
