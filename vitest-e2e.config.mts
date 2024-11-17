import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		root: "./",
		include: ["**/*.e2e-spec.ts"],
		alias: {
			"@/": new URL("./src/", import.meta.url).pathname,
		},
	},
	resolve: {
		alias: {
			"@/": new URL("./src/", import.meta.url).pathname,
		},
	},
	plugins: [swc.vite()],
});