import { AdminController } from './admin.controller.js';
import { requireAdmin } from '../../core/middleware/admin.middleware.js';
import { FirestoreClient } from '../../infrastructure/database/connection.js';

/**
 * registerAdminRoutes(router, env)
 * Registra las rutas del panel administrativo.
 * ⭐ TODAS las rutas requieren autenticación de admin.
 */
export function registerAdminRoutes(router, env) {
  const ctrl = new AdminController(env);
  const jwtSecret = env.JWT_SECRET || 'tu-secret-key-desarrollo';
  const db = new FirestoreClient(env); // ⭐ Cliente Firestore para verificaciones

  // ============================================
  // ADMIN ONLY ENDPOINTS - Todas protegidas ⭐
  // ============================================

  // GET /api/admin/propiedades - Lista todas propiedades
  router.get('/api/admin/propiedades', async (req) => {
    // ⭐ Verificar que sea admin
    const authResult = await requireAdmin(req, jwtSecret, db);
    if (authResult instanceof Response) return authResult;
    return ctrl.getAllPropiedades(req);
  });

  // GET /api/admin/propiedades/:id - Obtiene una propiedad
  router.get('/api/admin/propiedades/:id', async (req, params) => {
    // ⭐ Verificar que sea admin
    const authResult = await requireAdmin(req, jwtSecret, db);
    if (authResult instanceof Response) return authResult;
    return ctrl.getPropiedadById(req, params);
  });

  // PUT /api/admin/propiedades/:id - Actualiza una propiedad
  router.put('/api/admin/propiedades/:id', async (req, params) => {
    // ⭐ Verificar que sea admin
    const authResult = await requireAdmin(req, jwtSecret, db);
    if (authResult instanceof Response) return authResult;
    return ctrl.updatePropiedadById(req, params);
  });

  // DELETE /api/admin/propiedades/:id - Elimina una propiedad
  router.delete('/api/admin/propiedades/:id', async (req, params) => {
    // ⭐ Verificar que sea admin
    const authResult = await requireAdmin(req, jwtSecret, db);
    if (authResult instanceof Response) return authResult;
    return ctrl.deletePropiedadById(req, params);
  });

  // GET /api/admin/dashboard - Estadísticas del dashboard
  router.get('/api/admin/dashboard', async (req) => {
    // ⭐ Verificar que sea admin
    const authResult = await requireAdmin(req, jwtSecret, db);
    if (authResult instanceof Response) return authResult;
    return ctrl.getDashboardStats(req);
  });
}

export { AdminController };
