import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    sveltekit(),
    nodePolyfills({
      include: ["fs", "path"],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ],
});
