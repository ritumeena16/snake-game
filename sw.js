const CACHE_NAME = "snake-game-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./icon.png",
  "./manifest.json"
];

// 1. Install Event: Files ko phone ki memory (cache) mein save karna
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Fetch Event: Internet na hone par cache se files dikhana
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
