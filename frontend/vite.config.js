import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      injectManifest: {
        swSrc: "src/service-worker.js",
        swDest: "dist/sw.js",
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
      manifest: {
        name: "PersonalTrack",
        short_name: "PersonalTrack",
        description: "Es más que solo un viaje",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "android-launchericon-48-48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "android-launchericon-72-72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "android-launchericon-96-96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "android-launchericon-144-144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-launchericon-512-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "120.png",
            sizes: "120x120",
            type: "image/png",
          },
          {
            src: "152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "167.png",
            sizes: "167x167",
            type: "image/png",
          },
          {
            src: "180.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // Tamaño máximo de caché
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/accounts\.google\.com\/.*/, // Ignorar caché para OAuth
            handler: "NetworkOnly", // Usar red directamente
          },
        ],
      },
      devOptions: {
        enabled: true, // Habilitar para desarrollo
      },
    }),
  ],
});
