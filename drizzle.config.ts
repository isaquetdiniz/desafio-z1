import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/libs/drizzle/schema.ts",
	out: "./src/libs/drizzle/migrations",
	dialect: "sqlite",
});
