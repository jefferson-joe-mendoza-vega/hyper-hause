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
  if (raw.distrito      !== undefined) dto.distrito      = String(raw.distrito).trim();

  // Características
  if (raw.dormitorios      !== undefined) dto.dormitorios      = Number(raw.dormitorios);
  if (raw.banos            !== undefined) dto.banos            = Number(raw.banos);
  if (raw.estacionamientos !== undefined) dto.estacionamientos = Number(raw.estacionamientos);

  // Imágenes
  if (Array.isArray(raw.imagenes)) dto.imagenes = raw.imagenes;

  if (raw.activo        !== undefined) dto.activo        = Boolean(raw.activo);

  return dto;
}
