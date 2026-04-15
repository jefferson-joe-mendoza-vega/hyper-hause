import { ProyectosService } from './proyectos.service.js';

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS }
  });
}

function error(message, status = 500, extra = {}) {
  return json({ success: false, error: message, ...extra }, status);
}

export class ProyectosController {
  constructor(env) {
    this.env     = env;
    this.service = new ProyectosService(env);
  }

  /**
   * GET /api/proyectos
   * Obtener todos los proyectos
   */
  async getAll(request) {
    try {
      const data = await this.service.getAll();
      return json({ success: true, total: data.length, data });
    } catch (err) {
      console.error('Error en getAll:', err);
      return error(err.message, 500);
    }
  }

  /**
   * GET /api/proyectos/:id
   */
  async getById(request, { id }) {
    try {
      const proyecto = await this.service.getById(id);
      return json({ success: true, data: proyecto });
    } catch (err) {
      console.error('Error en getById:', err);
      return error(err.message, 404);
    }
  }

  /**
   * GET /api/proyectos/slug/:slug
   */
  async getBySlug(request, { slug }) {
    try {
      const proyecto = await this.service.getBySlug(slug);
      return json({ success: true, data: proyecto });
    } catch (err) {
      console.error('Error en getBySlug:', err);
      return error(err.message, 404);
    }
  }

  /**
   * POST /api/proyectos
   * Crear proyecto
   */
  async create(request) {
    try {
      let body = {};

      const contentType = request.headers.get('Content-Type') || '';

      if (contentType.includes('application/json')) {
        body = await request.json();
      } else if (contentType.includes('multipart/form-data')) {
        const formData = await request.formData();
        body = this._formDataToObject(formData);
      }

      const proyecto = await this.service.create(body);
      return json({ success: true, data: proyecto }, 201);
    } catch (err) {
      console.error('Error en create:', err);
      return error(err.message, 400);
    }
  }

  /**
   * PUT /api/proyectos/:id
   * Actualizar proyecto
   */
  async update(request, { id }) {
    try {
      let body = {};

      const contentType = request.headers.get('Content-Type') || '';

      if (contentType.includes('application/json')) {
        body = await request.json();
      } else if (contentType.includes('multipart/form-data')) {
        const formData = await request.formData();
        body = this._formDataToObject(formData);
      }

      const proyecto = await this.service.update(id, body);
      return json({ success: true, data: proyecto });
    } catch (err) {
      console.error('Error en update:', err);
      return error(err.message, 400);
    }
  }

  /**
   * DELETE /api/proyectos/:id
   */
  async delete(request, { id }) {
    try {
      await this.service.delete(id);
      return json({ success: true, message: 'Proyecto eliminado' });
    } catch (err) {
      console.error('Error en delete:', err);
      return error(err.message, 400);
    }
  }

  /**
   * Helper: Convertir FormData a objeto
   */
  _formDataToObject(formData) {
    const obj = {};
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) continue;
      obj[key] = value;
    }
    return obj;
  }
}
