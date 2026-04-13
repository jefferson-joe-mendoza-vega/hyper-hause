import { PropiedadesController } from './propiedades.controller.js';
import { requireAdmin } from '../../core/middleware/admin.middleware.js';

/**
 * registerPropiedadesRoutes(router, env)
 * Registra las rutas del módulo en el router central.
 *
 * Convención del router:  router.get(path, handler)
 *                         handler = (request, params) => Response
 * 
 * NOTAS:
 * - GET endpoints: públicos (sin autenticación necesaria)
 * - POST/PUT/DELETE endpoints: requieren admin (protegidos por middleware)
 */
export function registerPropiedadesRoutes(router, env) {
  const ctrl = new PropiedadesController(env);
  const jwtSecret = env.JWT_SECRET || 'tu-secret-key-desarrollo';

  // ============================================
  // PUBLIC ENDPOINTS (sin autenticación)
  // ============================================

  // Listar / buscar
  router.get('/api/propiedades',              (req, params) => ctrl.getAll(req, params));

  // Obtener recomendadas
  router.get('/api/propiedades/recomendadas', (req, params) => ctrl.getRecomendadas(req, params));

  // Obtener por slug (ruta específica ANTES que /:id para evitar conflicto)
  router.get('/api/propiedades/slug/:slug',   (req, params) => ctrl.getBySlug(req, params));

  // Obtener por id
  router.get('/api/propiedades/:id',          (req, params) => ctrl.getById(req, params));

  // ============================================
  // ADMIN ONLY ENDPOINTS (protegidos)
  // ============================================

  // DEBUG: Test FormData (solo para desarrollo/admin)
  router.post('/api/propiedades/debug/formdata', async (req) => {
    const authResult = await requireAdmin(req, jwtSecret);
    if (authResult instanceof Response) {
      return authResult;
    }
    return ctrl.debugFormData(req);
  });

  // Crear propiedad (admin)
  router.post('/api/propiedades', async (req, params) => {
    // TODO: Descomentar auth en producción
    // const authResult = await requireAdmin(req, jwtSecret);
    // if (authResult instanceof Response) {
    //   return authResult;
    // }
    return ctrl.create(req, params);
  });

  // Actualizar propiedad (admin)
  router.put('/api/propiedades/:id', async (req, params) => {
    // TODO: Descomentar auth en producción
    // const authResult = await requireAdmin(req, jwtSecret);
    // if (authResult instanceof Response) {
    //   return authResult;
    // }
    return ctrl.update(req, params);
  });

  // Eliminar propiedad (admin)
  router.delete('/api/propiedades/:id', async (req, params) => {
    // TODO: Descomentar auth en producción
    // const authResult = await requireAdmin(req, jwtSecret);
    // if (authResult instanceof Response) {
    //   return authResult;
    // }
    return ctrl.delete(req, params);
  });
}
