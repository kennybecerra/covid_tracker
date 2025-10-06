// vite.config.js
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    eslint({
      cache: false,
      include: [
        "./src/**/*.js",
        "./src/**/*.jsx",
        "./src/**/*.ts",
        "./src/**/*.tsx",
      ],
      exclude: [],
    }),
  ],
  // Optional: Configure build output directory if different from default 'dist'
  build: {
    outDir: "build", // Example: if you want to keep 'build' as output directory
    emptyOutDir: true,
  },
  server: {
    port: 3002, // You can specify the port here
    open: true, // Automatically open the app in the browser
  },
  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
    },
  },
});
