import { PropiedadesService }          from './propiedades.service.js';
import { extractImages, uploadImages } from '../../providers/imgbb/index.js';

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

export class PropiedadesController {
  constructor(env) {
    this.env     = env;
    this.service = new PropiedadesService(env);
  }

  /** Convierte un FormData en objeto plano de strings/números */
  _formDataToObject(formData) {
    const obj = {};
    for (const [key, value] of formData.entries()) {
      // Ignorar los campos de imagen (imagen_1 ... imagen_10)
      if (/^imagen_\d+$/.test(key)) continue;
      if (value instanceof File) continue;
      obj[key] = value;
    }
    return obj;
  }

  // GET /api/propiedades
  async getAll(request) {
    const url   = new URL(request.url);
    const tipoOperacion = url.searchParams.get('tipoOperacion') || undefined;
    const tipoInmueble  = url.searchParams.get('tipoInmueble')  || undefined;
    const limit         = Number(url.searchParams.get('limit') || 20);

    const usaFiltros = tipoOperacion || tipoInmueble;

    const data = usaFiltros
      ? await this.service.buscar({ tipoOperacion, tipoInmueble, limit })
      : await this.service.getAll();

    return json({ success: true, total: data.length, data });
  }

  // GET /api/propiedades/:id
  async getById(request, { id }) {
    const propiedad = await this.service.getById(id);
    return json({ success: true, data: propiedad });
  }

  // POST /api/propiedades  (multipart/form-data)
  async create(request) {
    const formData = await request.formData();

    // Extraer y subir imágenes
    const { files, error: imgError } = extractImages(formData);
    if (imgError) return error(imgError, 422);

    const imagenes = await uploadImages(files, this.env.IMGBB_API_KEY);

    // Extraer campos de texto del formData
    const body = this._formDataToObject(formData);
    body.imagenes = imagenes;

    const created = await this.service.create(body);
    return json({ success: true, data: created }, 201);
  }

  // PUT /api/propiedades/:id  (multipart/form-data o JSON)
  async update(request, { id }) {
    const contentType = request.headers.get('content-type') ?? '';
    let body;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      body = this._formDataToObject(formData);

      // Si envía imágenes nuevas, subirlas y reemplazar
      const { files, error: imgError } = extractImages(formData);
      if (imgError === null && files.length > 0) {
        body.imagenes = await uploadImages(files, this.env.IMGBB_API_KEY);
      }
    } else {
      body = await request.json();
    }

    const updated = await this.service.update(id, body);
    return json({ success: true, data: updated });
  }

  // DELETE /api/propiedades/:id
  async delete(request, { id }) {
    await this.service.delete(id);
    return json({ success: true, message: 'Propiedad eliminada.' });
  }
}
