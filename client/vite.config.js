import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    host: '0.0.0.0',
    hmr: true,
    port: 3002,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: false, 
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,gif,svg,mp3}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/your-api-url\/podcasts/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'podcast-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
});
