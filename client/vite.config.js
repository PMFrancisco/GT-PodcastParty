import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: true,
    port: 3002,
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        display: "standalone",
        lang: "es-ES",
        name: "Podcast Party PWA",
        short_name: "PodcastParty",
        description: "Podcast PWA",
        theme_color: "#fff",
        background_color: "#fff",
        start_url: "/",
        icons: [
          {
            src: "music-note-192-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: 'any'
          },
          {
            src: "music-note.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "image.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
    }),
  ],
});
