import { PropiedadesController } from './propiedades.controller.js';

/**
 * registerPropiedadesRoutes(router, env)
 * Registra las rutas del módulo en el router central.
 *
 * Convención del router:  router.get(path, handler)
 *                         handler = (request, params) => Response
 */
export function registerPropiedadesRoutes(router, env) {
  const ctrl = new PropiedadesController(env);

  // Listar / buscar
  router.get('/api/propiedades',              (req, params) => ctrl.getAll(req, params));

  // Obtener recomendadas
  router.get('/api/propiedades/recomendadas', (req, params) => ctrl.getRecomendadas(req, params));

  // Obtener por slug (ruta específica ANTES que /:id para evitar conflicto)
  router.get('/api/propiedades/slug/:slug',   (req, params) => ctrl.getBySlug(req, params));

  // Obtener por id (admin)
  router.get('/api/propiedades/:id',          (req, params) => ctrl.getById(req, params));

  // DEBUG: Test FormData
  router.post('/api/propiedades/debug/formdata', (req) => ctrl.debugFormData(req));

  // Crear
  router.post('/api/propiedades',    (req, params) => ctrl.create(req, params));

  // Actualizar
  router.put('/api/propiedades/:id', (req, params) => ctrl.update(req, params));

  // Eliminar
  router.delete('/api/propiedades/:id', (req, params) => ctrl.delete(req, params));
}
