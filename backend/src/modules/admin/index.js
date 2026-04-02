import { AdminController } from './admin.controller.js';
import { requireAdmin } from '../../core/middleware/admin.middleware.js';

/**
 * registerAdminRoutes(router, env)
 * Registra las rutas del panel administrativo.
 * Todas las rutas requieren autenticación de admin.
 */
export function registerAdminRoutes(router, env) {
  const ctrl = new AdminController(env);
  const jwtSecret = env.JWT_SECRET || 'tu-secret-key-desarrollo';

  // ============================================
  // ADMIN ONLY ENDPOINTS
  // ============================================

  // GET /api/admin/propiedades - Lista todas propiedades
  router.get('/api/admin/propiedades', async (req) => {
    const authResult = await requireAdmin(req, jwtSecret);
    if (authResult instanceof Response) return authResult;
    return ctrl.getAllPropiedades(req);
  });

  // GET /api/admin/propiedades/:id - Obtiene una propiedad
  router.get('/api/admin/propiedades/:id', async (req, params) => {
    const authResult = await requireAdmin(req, jwtSecret);
    if (authResult instanceof Response) return authResult;
    return ctrl.getPropiedadById(req, params);
  });

  // DELETE /api/admin/propiedades/:id - Elimina una propiedad
  router.delete('/api/admin/propiedades/:id', async (req, params) => {
    const authResult = await requireAdmin(req, jwtSecret);
    if (authResult instanceof Response) return authResult;
    return ctrl.deletePropiedadById(req, params);
  });

  // GET /api/admin/dashboard - Estadísticas del dashboard
  router.get('/api/admin/dashboard', async (req) => {
    const authResult = await requireAdmin(req, jwtSecret);
    if (authResult instanceof Response) return authResult;
    return ctrl.getDashboardStats(req);
  });
}

export { AdminController };
