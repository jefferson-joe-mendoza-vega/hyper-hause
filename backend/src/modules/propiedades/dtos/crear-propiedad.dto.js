import { TIPO_OPERACION, TIPO_INMUEBLE } from '../propiedades.model.js';

/**
 * DTO para crear una propiedad.
 * Limpia y coerciona los datos de entrada antes de pasarlos al service.
 */
export function crearPropiedadDto(raw) {
  // Verificar que raw no sea null/undefined
  if (!raw || typeof raw !== 'object') {
    console.warn('⚠️ crearPropiedadDto recibió datos inválidos:', raw);
    raw = {};
  }

  const dto = {
    // Información básica
    titulo:             String(raw.titulo             ?? '').trim(),
    descripcion:        String(raw.descripcion        ?? '').trim(),
    precio:             Number(raw.precio             ?? 0),
    tipoOperacion:      String(raw.tipoOperacion      ?? '').trim(),
    tipoInmueble:       String(raw.tipoInmueble       ?? '').trim(),

    // Ubicación
    direccion:          String(raw.direccion          ?? '').trim(),
    mapaUrl:            String(raw.mapaUrl            ?? '').trim(),

    // Amenidades - Manejo robusto de JSON
    amenidades:         (() => {
      try {
        if (Array.isArray(raw.amenidades)) return raw.amenidades;
        if (typeof raw.amenidades === 'string') {
          const parsed = JSON.parse(raw.amenidades);
          return Array.isArray(parsed) ? parsed : [];
        }
        return [];
      } catch (err) {
        console.warn('⚠️ Error al parsear amenidades:', raw.amenidades, err.message);
        return [];
      }
    })(),

    // Características
    dormitorios:        Number(raw.dormitorios        ?? 0),
    banos:              Number(raw.banos              ?? 0),
    estacionamientos:   Number(raw.estacionamientos   ?? 0),
    area:               Number(raw.area               ?? 0),

    // Flags
    recomendado:        raw.recomendado === 'true' || raw.recomendado === true,
    recomendadoEtiqueta: String(raw.recomendadoEtiqueta ?? '').trim().slice(0, 30),
    recomendadoColor:    String(raw.recomendadoColor    ?? '').trim(),
    imagenes:           Array.isArray(raw.imagenes) ? raw.imagenes : []
  };

  return dto;
}

export { TIPO_OPERACION, TIPO_INMUEBLE };
