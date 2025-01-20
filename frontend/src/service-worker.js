import { precacheAndRoute } from "workbox-precaching";

// Precarga los recursos especificados en el manifiesto
precacheAndRoute(self.__WB_MANIFEST);

// Ignorar solicitudes específicas relacionadas con Google OAuth
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Ignorar rutas relacionadas con Google OAuth
  if (url.origin === "https://accounts.google.com") {
    console.log("Ignorando solicitud de Google OAuth:", url.href);
    return; // No interceptar, deja que pase directamente
  }

  // Manejo por defecto de otras solicitudes
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
