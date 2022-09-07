import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    server: {
      port: 3000,
    },
    resolve: {
      alias: [
        { find: "@components", replacement: resolve(__dirname, "src", "components") },
        { find: "@app", replacement: resolve(__dirname, "src", "app") },
        { find: "@hooks", replacement: resolve(__dirname, "src", "hooks") },
        { find: "@assets", replacement: resolve(__dirname, "src", "assets") },
        { find: "@slices", replacement: resolve(__dirname, "src", "slices") },
        { find: "@services", replacement: resolve(__dirname, "src", "services") },
        { find: "@interfaces", replacement: resolve(__dirname, "src", "interfaces") },
      ],
    },
  });
};
