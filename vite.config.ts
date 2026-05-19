import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

const base = process.env.VITE_BASE_PATH || "/";

export default defineConfig({
  base,
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  plugins: [viteTsconfigPaths({ projects: ["./tsconfig.json"] }), tailwindcss(), tanstackStart(), react()],
});
