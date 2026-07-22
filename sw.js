const CACHE = 'jwstudy-v61';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './favicon-32.png',
  './icon.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // HTML / nawigacja: NAJPIERW pamięć podręczna (żeby aplikacja ODPALAŁA SIĘ OFFLINE natychmiast),
  // a w tle pobieramy świeżą wersję do cache — zmiany pojawią się przy następnym uruchomieniu.
  if (req.mode === 'navigate' || req.destination === 'document') {
    e.respondWith(
      caches.match('./index.html').then((cached) => {
        const fromNet = fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('./index.html', copy)).catch(() => {});
          return res;
        }).catch(() => cached);
        // offline: natychmiast z cache; pierwszy raz (brak cache): z sieci
        return cached || fromNet;
      })
    );
    return;
  }

  // pozostałe zasoby (ikony, manifest): najpierw cache, potem sieć
  e.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
