import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { openapi } from "./libs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	openapi(app);

	app.enableShutdownHooks();

	await app.listen(3000);
}

bootstrap();
