import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DrizzleBookRepository } from "./books.repository";

@Module({
	imports: [ConfigModule],
	providers: [DrizzleBookRepository],
	exports: [DrizzleBookRepository],
})
export class DrizzleModule {}
