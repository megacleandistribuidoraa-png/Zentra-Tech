const CACHE_NAME = 'megaclean-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/admin.html'
];

// Instalar o Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Ativar e limpar caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estratégia Network First com fallback para cache
self.addEventListener('fetch', event => {
  // Não fazer cache de requisições POST, PUT, DELETE ou para APIs
  if (event.request.method !== 'GET' || event.request.url.includes('/api/')) {
    return; // Deixa a requisição passar normalmente sem interceptar
  }
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Se a resposta for válida e for GET, armazena no cache
        if (response.status === 200 && event.request.method === 'GET') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Se falhar, tenta o cache
        return caches.match(event.request);
      })
  );
});













