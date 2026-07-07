import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import keystatic from "@keystatic/astro";

export default defineConfig({
  site: "https://life-line-trainingen.nl",
  output: "server",
  adapter: vercel(),
  integrations: [react(), keystatic()],
});
