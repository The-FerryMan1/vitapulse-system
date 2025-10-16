import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import ui from "@nuxt/ui/vite";
import { resolve } from "node:path";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      vue(),
      vueDevTools(),
      ui({
        ui: {
          colors: {
            primary: "red",
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      outDir: resolve(__dirname, '..', 'dist'),
      emptyOutDir: true
    },
    base: '/',
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_DOMAIN_NAME,
          changeOrigin: true,
        },
      },
    },
  });
};
