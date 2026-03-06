import { TIPO_OPERACION, TIPO_INMUEBLE } from '../propiedades.model.js';

/**
 * DTO para crear una propiedad.
 * Limpia y coerciona los datos de entrada antes de pasarlos al service.
 */
export function crearPropiedadDto(raw) {
  return {
    // Información principal
    titulo:             String(raw.titulo             ?? '').trim(),
    descripcion:        String(raw.descripcion        ?? '').trim(),
    precio:             Number(raw.precio             ?? 0),
    tipoOperacion:      String(raw.tipoOperacion      ?? '').trim(),
    tipoInmueble:       String(raw.tipoInmueble       ?? '').trim(),

    // Ubicación
    direccion:          String(raw.direccion          ?? '').trim(),
    distrito:           String(raw.distrito           ?? '').trim(),

    // Características
    dormitorios:        Number(raw.dormitorios        ?? 0),
    banos:              Number(raw.banos              ?? 0),
    estacionamientos:   Number(raw.estacionamientos   ?? 0),

    // Imágenes — se asignan después de subir a ImgBB
    imagenes:           Array.isArray(raw.imagenes) ? raw.imagenes : []
  };
}

export { TIPO_OPERACION, TIPO_INMUEBLE };
