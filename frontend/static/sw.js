const CACHE_NAME = 'hyper-house-v2';

// Solo cachear assets estáticos del propio dominio
const STATIC_ASSETS = [
  '/',
  '/logo.webp',
  '/manifest.json',
  '/index.html'
];

// ── Instalar ──────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .catch((err) => console.error('SW install error:', err))
  );
  self.skipWaiting();
});

// ── Activar y limpiar caches viejos ──────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch handler ─────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // ❌ NO interceptar:
  //   - Requests a dominios externos (API de Cloudflare, Google, etc.)
  //   - Métodos que no sean GET (POST, PUT, DELETE, PATCH)
  //   - Requests de extensiones de navegador (chrome-extension://)
  const isExternal = url.origin !== self.location.origin;
  const isNonGet  = request.method !== 'GET';
  const isBrowserExtension = request.url.startsWith('chrome-extension://') ||
                             request.url.startsWith('moz-extension://');

  if (isExternal || isNonGet || isBrowserExtension) {
    return; // dejar pasar sin interceptar
  }

  // ✅ Solo cachear assets estáticos del propio dominio
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        // Solo cachear respuestas 200 de assets (no páginas HTML dinámicas)
        const isAsset = /\.(js|css|webp|png|jpg|jpeg|svg|ico|woff2?)$/.test(url.pathname);
        if (response.ok && isAsset) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        // Fallback offline solo para la página principal
        if (request.headers.get('Accept')?.includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});

// ── Message handler ───────────────────────────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
