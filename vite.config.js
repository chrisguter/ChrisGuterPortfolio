import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nodePolyfills from "rollup-plugin-polyfill-node";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(), // Add this plugin to polyfill Node.js modules
  ],
  resolve: {
    alias: {
      crypto: "crypto-browserify", // Use the browser-compatible crypto module
    },
  },
});
