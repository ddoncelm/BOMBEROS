// Service Worker — Bomberos Marbella v7
// NETWORK FIRST para index.html — siempre sirve la versión más reciente
const CACHE = 'bomberos-v7';

self.addEventListener('install', e => {
  // Activar inmediatamente sin esperar
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Borrar TODAS las cachés antiguas
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => {
        console.log('Borrando caché antigua:', k);
        return caches.delete(k);
      }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Mapa tiles — cache first (no cambian)
  if (url.includes('tile.openstreetmap.org') || 
      url.includes('ign.es/wmts') || 
      url.includes('catastro.meh.es')) {
    e.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(e.request).then(cached => {
          if (cached) return cached;
          return fetch(e.request).then(resp => {
            if (resp.ok) cache.put(e.request, resp.clone());
            return resp;
          }).catch(() => cached || new Response('', {status: 503}));
        })
      )
    );
    return;
  }

  // index.html y config.js — NETWORK FIRST, siempre la versión más reciente
  if (url.includes('index.html') || url.endsWith('/') || url.includes('config.js')) {
    e.respondWith(
      fetch(e.request).then(resp => {
        if (resp.ok) {
          caches.open(CACHE).then(c => c.put(e.request, resp.clone()));
        }
        return resp;
      }).catch(() =>
        caches.match(e.request).then(cached => 
          cached || new Response('Sin conexión', {status: 503})
        )
      )
    );
    return;
  }

  // Resto — cache first con fallback a red
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp.ok) {
          caches.open(CACHE).then(c => c.put(e.request, resp.clone()));
        }
        return resp;
      }).catch(() => new Response('', {status: 503}));
    })
  );
});
