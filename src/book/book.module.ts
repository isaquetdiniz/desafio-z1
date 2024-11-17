import { DrizzleModule } from "@/libs/drizzle";
import { DefaultErrorFilter } from "@/libs/nest";
import { Module, ValidationPipe } from "@nestjs/common";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";

@Module({
	imports: [DrizzleModule],
	controllers: [BookController],
	providers: [
		{ provide: APP_FILTER, useClass: DefaultErrorFilter },
		{ provide: APP_PIPE, useValue: new ValidationPipe({ transform: true }) },
		BookService,
	],
})
export class BookModule {}
