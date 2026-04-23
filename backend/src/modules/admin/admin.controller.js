import { PropiedadesService } from '../propiedades/propiedades.service.js';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS }
  });
}

function error(message, status = 500) {
  return json({ success: false, error: message }, status);
}

export class AdminController {
  constructor(env) {
    this.env = env;
    this.propiedadesService = new PropiedadesService(env);
  }

  // GET /api/admin/propiedades - Lista todas las propiedades (admin)
  async getAllPropiedades(request) {
    try {
      const data = await this.propiedadesService.getAll();
      return json({ success: true, total: data.length, data });
    } catch (err) {
      return error(err.message, 500);
    }
  }

  // GET /api/admin/propiedades/:id - Obtiene una propiedad por ID (admin)
  async getPropiedadById(request, { id }) {
    try {
      const propiedad = await this.propiedadesService.getById(id);
      if (!propiedad) return error('Propiedad no encontrada', 404);
      return json({ success: true, data: propiedad });
    } catch (err) {
      return error(err.message, 500);
    }
  }

  // PUT /api/admin/propiedades/:id - Actualiza una propiedad (admin)
  async updatePropiedadById(request, { id }) {
    try {
      const data = await request.json();
      const result = await this.propiedadesService.update(id, data);
      return json({ success: true, message: 'Propiedad actualizada', data: result });
    } catch (err) {
      return error(err.message, 500);
    }
  }

  // DELETE /api/admin/propiedades/:id - Elimina una propiedad (admin)
  async deletePropiedadById(request, { id }) {
    try {
      const result = await this.propiedadesService.delete(id);
      if (!result) return error('Propiedad no encontrada', 404);
      return json({ success: true, message: 'Propiedad eliminada' });
    } catch (err) {
      return error(err.message, 500);
    }
  }

  // GET /api/admin/dashboard - Estadísticas del dashboard
  async getDashboardStats(request) {
    try {
      const todasLasPropiedades = await this.propiedadesService.getAll();
      const totalPropiedades = todasLasPropiedades.length;

      return json({
        success: true,
        data: {
          totalPropiedades,
          propiedadesActivas: totalPropiedades,
          ultimasActualizaciones: new Date().toISOString()
        }
      });
    } catch (err) {
      return error(err.message, 500);
    }
  }
}
