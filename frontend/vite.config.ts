import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: { globals: true, environment: "jsdom" },
  server: { host: true, hmr: { path: "/hmr" }, allowedHosts: true },
});
