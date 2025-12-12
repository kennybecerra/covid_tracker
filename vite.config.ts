import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "build",
	},
	server: {
		port: 3002,
		open: true,
	},
	resolve: {
		alias: {
			src: resolve(__dirname, "src"),
		},
	},
});
