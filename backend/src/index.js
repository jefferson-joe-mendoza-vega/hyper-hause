/** sude
 * index.js — Entrypoint del Cloudflare Worker
 *
 * Responsabilidad única: recibir el fetch de Cloudflare
 * y delegarlo a app.js.
 *
 * Flujo:
 *   Request → index.js (fetch) → app.js → router.js → módulo → handler → Response
 */

import { createApp } from './app.js';

export default {
  /**
   * @param {Request}                 request
   * @param {object}                  env      Bindings: vars, KV, D1, etc.
   * @param {ExecutionContext}        ctx
   * @returns {Promise<Response>}
   */
  async fetch(request, env, ctx) {
    const handle = createApp(env);
    return handle(request);
  }
};

