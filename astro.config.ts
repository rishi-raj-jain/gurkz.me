import { defineConfig } from "astro/config";
import uno from "unocss/astro";
import solidJs from "@astrojs/solid-js";
import mdx from "@astrojs/mdx";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [uno(), solidJs(), mdx()],
  prefetch: {
    prefetchAll: true
  },
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});