/* Временно: SW только сбрасывает старые кэши и уходит.
   Иначе iPhone месяцами показывает устаревший гид. */
const KILL = "japan2026-kill-v27";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.registration.unregister())
  );
});

// Ничего не перехватываем — всегда сеть / обычный браузерный кэш
self.addEventListener("fetch", () => {});
