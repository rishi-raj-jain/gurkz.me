import { defineConfig } from "astro/config";
import uno from "unocss/astro";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [uno(), solidJs()],
});
