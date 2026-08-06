const CACHE = 'jwstudy-v163';
/* Rdzeń: dokument + wszystkie moduły CSS i JS — bez nich aplikacja nie ruszy offline. */
const CORE = ['./', './index.html'];
/* Dodatki: ikony i manifest. Brak któregoś nie może zablokować zapisu offline. */
const EXTRA = [
  './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png',
  './apple-touch-icon.png', './favicon-32.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(CORE).then(() => Promise.allSettled(EXTRA.map((a) => c.add(a)))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  /* Obce adresy (biblioteki z CDN, linki do jw.org) zostawiamy przeglądarce.
     Wcześniej trafiały do naszej pamięci podręcznej jako nieprzejrzyste odpowiedzi —
     zajmowały miejsce, a i tak nie dało się ich sensownie użyć offline. */
  if (new URL(req.url).origin !== self.location.origin) return;

  /* Dokument: najpierw pamięć podręczna, żeby aplikacja odpalała się offline natychmiast;
     świeża wersja dociąga się w tle i pojawi przy następnym uruchomieniu. */
  if (req.mode === 'navigate' || req.destination === 'document') {
    e.respondWith(
      caches.match('./index.html').then((cached) => {
        const fromNet = fetch(req).then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put('./index.html', copy)).catch(() => {});
          }
          return res;
        }).catch(() => cached);
        return cached || fromNet;
      })
    );
    return;
  }

  /* Moduły CSS/JS i ikony: oddajemy wersję z pamięci od razu (zero czekania na sieć),
     a w tle sprawdzamy, czy na serwerze nie ma nowszej — trafi do pamięci na następny raz. */
  e.respondWith(
    caches.match(req).then((cached) => {
      const fromNet = fetch(req).then((res) => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => cached);
      return cached || fromNet;
    })
  );
});
