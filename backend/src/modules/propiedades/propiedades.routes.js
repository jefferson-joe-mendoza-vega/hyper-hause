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
  router.get('/api/propiedades',     (req, params) => ctrl.getAll(req, params));

  // Obtener por id
  router.get('/api/propiedades/:id', (req, params) => ctrl.getById(req, params));

  // Crear
  router.post('/api/propiedades',    (req, params) => ctrl.create(req, params));

  // Actualizar
  router.put('/api/propiedades/:id', (req, params) => ctrl.update(req, params));

  // Eliminar
  router.delete('/api/propiedades/:id', (req, params) => ctrl.delete(req, params));
}
