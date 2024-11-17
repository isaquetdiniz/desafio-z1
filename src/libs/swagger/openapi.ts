import type { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function openapi(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle("Monitoria Backend ES 2024.1")
		.setDescription("The Monitoria Backend ES 2024.1 description")
		.setVersion("1.0")
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup("docs", app, document);
}
