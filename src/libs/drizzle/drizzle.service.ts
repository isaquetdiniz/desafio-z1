import type { DrizzleLocalConfig } from "@/libs/drizzle/config";
import * as schema from "@/libs/drizzle/schema";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Database from "better-sqlite3";
import {
	type BetterSQLite3Database,
	drizzle,
} from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

@Injectable()
export class DrizzleService implements OnModuleInit {
	db: BetterSQLite3Database<typeof schema>;

	constructor(
		private readonly configService: ConfigService<DrizzleLocalConfig>,
	) {}

	async onModuleInit() {
		const path = this.configService.getOrThrow("DB_PATH", "sqlite.db");

		const connection = new Database(path);

		this.db = drizzle(connection, { schema });

		migrate(this.db, { migrationsFolder: "./src/libs/drizzle/migrations" });
	}
}
