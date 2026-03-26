/**
 * app.js — Núcleo de la aplicación
 *
 * Responsabilidades:
 *  - Instanciar el Router
 *  - Registrar módulos (rutas)
 *  - Middlewares: CORS, parsing de errores, rutas no encontradas
 *
 * NO conoce Cloudflare Workers — eso es tarea de index.js (fetch handler)
 */

import { Router } from './router.js';
import { registerPropiedadesRoutes } from './modules/propiedades/index.js';
import { registerAuthRoutes } from './modules/auth/index.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function corsPreflightResponse() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

function addCors(response) {
  const res = new Response(response.body, response);
  for (const [k, v] of Object.entries(CORS_HEADERS)) res.headers.set(k, v);
  return res;
}

function jsonError(message, status = 500) {
  return new Response(
    JSON.stringify({ success: false, error: message }),
    { status, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
  );
}

/**
 * Crea y configura la aplicación.
 * @param {object} env  Variables de entorno del Worker (bindings Cloudflare)
 */
export function createApp(env) {
  const router = new Router();

  // ── Registro de módulos ──────────────────────────────────────────────────────
  registerPropiedadesRoutes(router, env);
  registerAuthRoutes(router, env);

  // ── Handler principal ────────────────────────────────────────────────────────
  return async function handle(request) {
    const { method, url } = request;
    const { pathname } = new URL(url);

    // CORS preflight
    if (method === 'OPTIONS') return corsPreflightResponse();

    // Ruta raíz — health check
    if (pathname === '/' || pathname === '/api') {
      return addCors(new Response(
        JSON.stringify({
          success: true,
          name:    'Hyper Hause API',
          version: '1.0.0',
          env:     env.ENVIRONMENT ?? 'development',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      ));
    }

    // Resolver ruta
    const match = router.resolve(method, pathname);
    if (!match) return jsonError('Ruta no encontrada.', 404);

    // Ejecutar handler con manejo de errores
    try {
      const response = await match.handler(request, match.params);
      return addCors(response);
    } catch (err) {
      if (err.status === 422) {
        return new Response(
          JSON.stringify({ success: false, error: err.message, errors: err.errors ?? [] }),
          { status: 422, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
        );
      }
      if (err.message?.includes('no encontrada') || err.message?.includes('not found')) {
        return jsonError(err.message, 404);
      }
      console.error('[app]', err.message, err);
      return jsonError(err.message || 'Error interno del servidor.', 500);
    }
  };
}
