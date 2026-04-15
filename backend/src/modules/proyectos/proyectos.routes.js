import { ProyectosController } from './proyectos.controller.js';
import { requireAdmin } from '../../core/middleware/admin.middleware.js';

/**
 * registerProyectosRoutes(router, env)
 * Registra las rutas del módulo de proyectos en el router central.
 */
export function registerProyectosRoutes(router, env) {
  const ctrl = new ProyectosController(env);
  const jwtSecret = env.JWT_SECRET || 'tu-secret-key-desarrollo';

  // ============================================
  // PUBLIC ENDPOINTS (sin autenticación)
  // ============================================

  // Listar todos
  router.get('/api/proyectos', (req, params) => ctrl.getAll(req, params));

  // Obtener por slug (ANTES que /:id para evitar conflicto)
  router.get('/api/proyectos/slug/:slug', (req, params) => ctrl.getBySlug(req, params));

  // Obtener por id
  router.get('/api/proyectos/:id', (req, params) => ctrl.getById(req, params));

  // ============================================
  // ADMIN ONLY ENDPOINTS (protegidos)
  // ============================================

  // Crear proyecto (admin)
  router.post('/api/admin/proyectos', async (req, params) => {
    // TODO: Descomentar auth en producción
    // const authResult = await requireAdmin(req, jwtSecret);
    // if (authResult instanceof Response) {
    //   return authResult;
    // }
    return ctrl.create(req, params);
  });

  // Actualizar proyecto (admin)
  router.put('/api/admin/proyectos/:id', async (req, params) => {
    // TODO: Descomentar auth en producción
    // const authResult = await requireAdmin(req, jwtSecret);
    // if (authResult instanceof Response) {
    //   return authResult;
    // }
    return ctrl.update(req, params);
  });

  // Eliminar proyecto (admin)
  router.delete('/api/admin/proyectos/:id', async (req, params) => {
    // TODO: Descomentar auth en producción
    // const authResult = await requireAdmin(req, jwtSecret);
    // if (authResult instanceof Response) {
    //   return authResult;
    // }
    return ctrl.delete(req, params);
  });
}
