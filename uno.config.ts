import { defineConfig, presetUno, transformerDirectives } from "unocss";

export default defineConfig({
  presets: [presetUno()],
  transformers: [transformerDirectives()],
  theme: {
    fontFamily: {
      geist: "Geist Mono",
    },
    colors: {
      themeColor: "#5EBFA8",
      themeBlack: "#121212",
      themeGray: "#3d3d3d",
    },
  },
});
