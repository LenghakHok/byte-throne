// @ts-check

import node from "@astrojs/node";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import unpluginTypia from "@ryoppippi/unplugin-typia/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [
      tailwindcss(),
      unpluginTypia({
        cache: false,
        typia: {
          functional: true,
          finite: true,
          undefined: true,
        },
      }),
    ],
  },
  trailingSlash: "ignore",
  output: "server",
  adapter:
    process.env.NODE_ENV === "production"
      ? vercel()
      : node({
          mode: "standalone",
        }),
});
