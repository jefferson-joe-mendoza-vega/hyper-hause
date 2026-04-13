import { PropiedadesService }          from './propiedades.service.js';
import { extractImages, uploadImages } from '../../providers/imgbb/index.js';
import { crearPropiedadDto }          from './dtos/crear-propiedad.dto.js';
import { actualizarPropiedadDto }     from './dtos/actualizar-propiedad.dto.js';

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
      // Ignorar los campos de imagen y etiqueta (imagen_1 ... imagen_10, etiqueta_1 ... etiqueta_10)
      if (/^imagen_\d+$/.test(key)) continue;
      if (/^etiqueta_\d+$/.test(key)) continue;
      if (value instanceof File) continue;
      obj[key] = value;
    }
    return obj;
  }

  _extractEtiquetas(formData) {
    const etiquetas = [];
    for (let i = 1; i <= 10; i++) {
      const val = formData.get(`etiqueta_${i}`);
      if (val !== null) etiquetas.push(String(val).trim());
      else break;
    }
    return etiquetas;
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

  // GET /api/propiedades/slug/:slug
  async getBySlug(request, { slug }) {
    const propiedad = await this.service.getBySlug(slug);
    return json({ success: true, data: propiedad });
  }

  // GET /api/propiedades/recomendadas
  async getRecomendadas(request) {
    const url   = new URL(request.url);
    const limit = Number(url.searchParams.get('limit') || 10);

    const data = await this.service.getRecomendadas(limit);
    return json({ success: true, total: data.length, data });
  }

  // POST /api/propiedades  (multipart/form-data)
  async create(request) {
    const formData = await request.formData();

    // Extraer campos de texto del formData
    const body = this._formDataToObject(formData);

    // Si el cliente proporciona un JSON de imágenes, usar directamente
    let imagenes = [];
    const imagenesStr = formData.get('imagenes');
    if (imagenesStr && typeof imagenesStr === 'string' && imagenesStr.trim()) {
      try {
        imagenes = JSON.parse(imagenesStr);
        if (!Array.isArray(imagenes)) imagenes = [];
      } catch (e) {
        console.warn('⚠️ Error parseando imagenes JSON:', e.message);
      }
    }

    // Si no hay imágenes en JSON, intentar extraer archivos
    if (imagenes.length === 0) {
      const { files, error: imgError } = extractImages(formData);
      if (imgError) return error(imgError, 422);

      const imagenesSubidas = await uploadImages(files, this.env.IMGBB_API_KEY);
      const etiquetas = this._extractEtiquetas(formData);
      imagenes = imagenesSubidas.map((img, i) => ({ ...img, etiqueta: etiquetas[i] ?? '' }));
    }

    body.imagenes = imagenes;

    const dto = crearPropiedadDto(body);
    const created = await this.service.create(dto);
    return json({ success: true, data: created }, 201);
  }

  // PUT /api/propiedades/:id  (multipart/form-data o JSON)
  async update(request, { id }) {
    try {
      console.log(`📝 [UPDATE] Iniciando actualización de propiedad: ${id}`);
      
      const contentType = request.headers.get('content-type') ?? '';
      let body;

      if (contentType.includes('multipart/form-data')) {
        console.log(`📝 [UPDATE] Parseando FormData...`);
        const formData = await request.formData();
        body = this._formDataToObject(formData);
        console.log(`📝 [UPDATE] FormData parseado:`, Object.keys(body));

        // Extraer imágenes existentes si el usuario las mantiene
        const imagenesExistentesStr = formData.get('imagenesExistentes');
        let imagenesExistentes = [];
        if (imagenesExistentesStr) {
          try {
            imagenesExistentes = JSON.parse(imagenesExistentesStr);
            console.log(`📝 [UPDATE] Imágenes existentes encontradas: ${imagenesExistentes.length}`);
          } catch (e) {
            console.error('❌ [UPDATE] Error parsing imagenesExistentes:', e);
          }
        }

        // Si envía imágenes nuevas, subirlas
        // En UPDATE, imagen_1 NO es obligatoria (el usuario puede no agregar imágenes nuevas)
        console.log(`📝 [UPDATE] Extrayendo imágenes nuevas...`);
        const { files, error: imgError } = extractImages(formData);
        let imagenesNuevas = [];
        if (imgError) {
          // En UPDATE es OK no tener imagen_1 (usuario no está agregando imágenes nuevas)
          console.log(`⚠️  [UPDATE] Sin imágenes nuevas (${imgError})`);
        } else if (files.length > 0) {
          console.log(`📝 [UPDATE] Subiendo ${files.length} imágenes nuevas...`);
          imagenesNuevas = await uploadImages(files, this.env.IMGBB_API_KEY);
          console.log(`✅ [UPDATE] Imágenes subidas correctamente`);
        }

        // Combinar: imágenes existentes + nuevas
        body.imagenes = [...imagenesExistentes, ...imagenesNuevas];
        console.log(`📝 [UPDATE] Total imágenes finales: ${body.imagenes.length}`);
      } else {
        console.log(`📝 [UPDATE] Parseando JSON...`);
        body = await request.json();
      }

      // Aplicar DTO para limpiar/coercionar datos (incluyendo amenidades JSON parse)
      console.log(`📝 [UPDATE] Aplicando DTO...`);
      const dto = actualizarPropiedadDto(body);
      console.log(`📝 [UPDATE] DTO aplicado:`, Object.keys(dto));

      console.log(`📝 [UPDATE] Actualizando en BD...`);
      const updated = await this.service.update(id, dto);
      console.log(`✅ [UPDATE] Propiedad actualizada exitosamente`);
      
      return json({ success: true, data: updated });
    } catch (err) {
      console.error(`❌ [UPDATE] Error durante actualización:`, err.message);
      console.error(`❌ [UPDATE] Stack:`, err.stack);
      throw err; // Propagar para que app.js lo maneje
    }
  }

  // DEBUG: Endpoint para testear FormData
  async debugFormData(request) {
    try {
      const formData = await request.formData();
      
      const received = {};
      const files = [];
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          files.push({ key, name: value.name, size: value.size, type: value.type });
        } else {
          received[key] = value;
        }
      }

      console.log('🧪 DEBUG FormData:', { received, files });

      return json({
        success: true,
        message: 'FormData recibido correctamente',
        received,
        files,
        totalFields: Object.keys(received).length,
        totalFiles: files.length
      });
    } catch (err) {
      console.error('❌ Error en debugFormData:', err);
      return error(`Error: ${err.message}`);
    }
  }

  // DELETE /api/propiedades/:id
  async delete(request, { id }) {
    await this.service.delete(id);
    return json({ success: true, message: 'Propiedad eliminada.' });
  }
}
