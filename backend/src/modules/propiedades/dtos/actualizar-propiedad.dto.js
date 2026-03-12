/**
 * DTO para actualizar una propiedad.
 * Solo incluye los campos que lleguen en el body (patch parcial).
 */
export function actualizarPropiedadDto(raw) {
  const dto = {};

  // Información principal
  if (raw.titulo        !== undefined) dto.titulo        = String(raw.titulo).trim();
  if (raw.descripcion   !== undefined) dto.descripcion   = String(raw.descripcion).trim();
  if (raw.precio        !== undefined) dto.precio        = Number(raw.precio);
  if (raw.tipoOperacion !== undefined) dto.tipoOperacion = String(raw.tipoOperacion).trim();
  if (raw.tipoInmueble  !== undefined) dto.tipoInmueble  = String(raw.tipoInmueble).trim();

  // Ubicación
  if (raw.direccion     !== undefined) dto.direccion     = String(raw.direccion).trim();
  if (raw.mapaUrl       !== undefined) dto.mapaUrl       = String(raw.mapaUrl).trim();

  // Amenidades
  if (raw.amenidades !== undefined) {
    if (Array.isArray(raw.amenidades)) dto.amenidades = raw.amenidades;
    else if (typeof raw.amenidades === 'string') { try { const p = JSON.parse(raw.amenidades); if (Array.isArray(p)) dto.amenidades = p; } catch {} }
  }

  // Características
  if (raw.dormitorios      !== undefined) dto.dormitorios      = Number(raw.dormitorios);
  if (raw.banos            !== undefined) dto.banos            = Number(raw.banos);
  if (raw.estacionamientos !== undefined) dto.estacionamientos = Number(raw.estacionamientos);
  if (raw.area             !== undefined) dto.area             = Number(raw.area);

  // Imágenes
  if (Array.isArray(raw.imagenes)) dto.imagenes = raw.imagenes;

  if (raw.activo        !== undefined) dto.activo        = Boolean(raw.activo);

  return dto;
}
