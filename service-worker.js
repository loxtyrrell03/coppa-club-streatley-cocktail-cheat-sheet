importScripts("./asset-manifest.js");

const CACHE_NAME = "coppa-drinks-v16";
const BASE = self.registration.scope;
const APP_SHELL = [
  BASE,
  `${BASE}index.html`,
  `${BASE}styles.css`,
  `${BASE}app.js`,
  `${BASE}data.js`,
  `${BASE}flashcards.js`,
  `${BASE}scheduler.js`,
  `${BASE}study.js`,
  `${BASE}photo-credits.js`,
  `${BASE}asset-manifest.js`,
  `${BASE}manifest.webmanifest`,
  `${BASE}icons/icon.svg`,
  `${BASE}icons/icon-192.png`,
  `${BASE}icons/icon-512.png`,
  `${BASE}icons/icon-maskable-512.png`,
  `${BASE}icons/apple-touch-icon.png`,
  ...self.COPPA_IMAGE_ASSETS.map((path) => new URL(path, BASE).href)
];

self.addEventListener("install", (event) => {
  const freshRequests = APP_SHELL.map((url) => new Request(url, { cache: "reload" }));
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(freshRequests)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(`${BASE}index.html`))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(
      (cached) =>
        cached ||
        fetch(event.request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
    )
  );
});
