/**
 * router.js — Mapa de URLs de la API
 *
 * Solo organiza rutas. No contiene lógica de negocio.
 * Soporta params dinámicos: /api/propiedades/:id
 */

export class Router {
  constructor() {
    this._routes = [];
  }

  // ── Registro de rutas ────────────────────────────────────────────────────────

  get(path, handler)    { this._add('GET',    path, handler); return this; }
  post(path, handler)   { this._add('POST',   path, handler); return this; }
  put(path, handler)    { this._add('PUT',    path, handler); return this; }
  delete(path, handler) { this._add('DELETE', path, handler); return this; }
  patch(path, handler)  { this._add('PATCH',  path, handler); return this; }

  _add(method, path, handler) {
    // Convierte /api/propiedades/:id → regex con grupos nombrados
    const pattern = new RegExp(
      '^' + path.replace(/:([a-zA-Z_]+)/g, '(?<$1>[^/]+)') + '$'
    );
    this._routes.push({ method, pattern, handler });
  }

  // ── Resolución ───────────────────────────────────────────────────────────────

  /**
   * Devuelve { handler, params } si hay match, o null.
   */
  resolve(method, pathname) {
    for (const route of this._routes) {
      if (route.method !== method) continue;
      const match = pathname.match(route.pattern);
      if (match) {
        return { handler: route.handler, params: match.groups || {} };
      }
    }
    return null;
  }
}
