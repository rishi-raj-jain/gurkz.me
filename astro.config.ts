import { defineConfig } from "astro/config";
import uno from "unocss/astro";
import solidJs from "@astrojs/solid-js";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [uno(), solidJs(), mdx()]
});