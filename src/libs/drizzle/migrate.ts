import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const connection = new Database("sqlite.db");
const db = drizzle(connection);

(async () => {
	await migrate(db, { migrationsFolder: "./src/libs/drizzle/migrations" });

	await connection.close();
})();
