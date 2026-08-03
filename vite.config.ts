import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Normalised to forward slashes: on Windows fileURLToPath yields backslashes,
// which produces a mixed-separator path that Rollup fails to resolve.
const srcDir = fileURLToPath(new URL("./src", import.meta.url)).replace(/\\/g, "/");

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": srcDir,
    },
  },
  build: {
    target: "es2022",
    cssMinify: "lightningcss",
    reportCompressedSize: true,
  },
});
