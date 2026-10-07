import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    // Opt-in extra dev hosts, comma-separated (e.g. VITE_DEV_ALLOWED_HOSTS=.example.app).
    // Empty by default so the dev server keeps Vite's strict host checking.
    allowedHosts: (process.env.VITE_DEV_ALLOWED_HOSTS ?? "").split(",").filter(Boolean),
  },
  preview: {
    host: "0.0.0.0",
    // Same opt-in for `npm run preview` — a proxied/remote preview host is
    // otherwise rejected with "Blocked request. This host is not allowed".
    allowedHosts: (process.env.VITE_DEV_ALLOWED_HOSTS ?? "").split(",").filter(Boolean),
  },
});
