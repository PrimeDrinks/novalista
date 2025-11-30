// sw.js - Service Worker simples para o Prime Drinks Express

const CACHE_NAME = "prime-drinks-v1";
const ASSETS_TO_CACHE = [
  const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./logo-prime.png",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
  // se quiser, pode adicionar mais arquivos fixos aqui
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Se tiver no cache, usa; senão, busca na rede
      return cached || fetch(event.request);
    })
  );
});

