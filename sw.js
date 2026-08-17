/* Offline-first PWA for japan-osaka-2026 — optimized precache
 * Changes made:
 * - Reduce precache list to essential navigation assets
 * - Avoid precaching hundreds of font files
 * - Runtime cache strategy: cache-first for fonts/images, network-first for navigations
 * - Restrict runtime caching to safe resource types
 * - Cache name bumped to v72
 * - Added js/sw-register.js and Firebase CDN SDKs to precache (variant 1)
 */
const CACHE = "japan2026-offline-v72";
const PRECACHE = [
  './',
  './index.html',
  './tracker.html',
  './food.html',
  './usj.html',
  './china.html',
  './icon.svg',
  './manifest.webmanifest',
  './update.html',
  './css/china.css',
  './css/styles.css',
  './css/tracker.css',
  './css/food.css',
  './css/usj.css',
  './js/app.js',
  './js/china-data.js',
  './js/china.js',
  './js/data.js',
  './js/food-data.js',
  './js/food.js',
  './js/photos.js',
  './js/tracker-data.js',
  './js/tracker.js',
  './js/usj-data.js',
  './js/usj.js',
  './js/sw-register.js',
  // Fonts: keep only the CSS file; individual .woff2 files will be cached runtime
  './vendor/fonts/noto-jp.css',
  // Firebase SDKs (CDN) — precache external to guarantee tracker offline
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-database-compat.js'
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Helper to decide if a request is cacheable at runtime
function isRuntimeCacheable(req) {
  // Only GETs
  if (req.method !== 'GET') return false;
  // Allow same-origin and the Firebase CDN (we precached them)
  const url = new URL(req.url);
  if (url.origin !== self.location.origin && !url.hostname.endsWith('gstatic.com')) return false;
  // Avoid caching API endpoints or firebase internal calls (if any)
  if (url.pathname.startsWith('/__/') || url.pathname.startsWith('/api/') || url.pathname.includes('/firebase')) return false;
  // Only cache common static resource types
  const dest = req.destination || '';
  return ['script','style','image','font','document'].includes(dest) || url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|woff2?)$/i);
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return; // only handle GET
  const url = new URL(req.url);

  // Navigation requests: network-first, fallback to matching cached URL then index.html
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(
      fetch(req).then((res) => {
        // update cache in background
        const copy = res.clone();
        if (res.ok) caches.open(CACHE).then(cache => cache.put(req, copy));
        return res;
      }).catch(() => {
        // If network fails, try to serve the exact requested URL from cache first
        return caches.match(req.url, { ignoreSearch: true }).then(cached => {
          if (cached) return cached;
          return caches.match('./index.html');
        });
      })
    );
    return;
  }

  // For runtime cacheable assets (fonts/images/scripts/styles) prefer cache-first
  if (isRuntimeCacheable(req)) {
    event.respondWith(
      caches.match(req, { ignoreSearch: true }).then(cached => {
        if (cached) return cached;
        return fetch(req).then(res => {
          // only cache successful responses
          if (!res || !res.ok) return res;
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy));
          return res;
        }).catch(() => Promise.reject()); // do not return HTML for assets
      })
    );
    return;
  }

  // Default: try network, fallback to cache
  event.respondWith(
    fetch(req).catch(() => caches.match(req, { ignoreSearch: true }))
  );
});
