import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: { globals: true, environment: "jsdom" },
  // @ts-expect-error : next-line
  server: { host: true, hmr: { path: "/hmr" }, allowedHosts: true },
});
