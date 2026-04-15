// ─── Colección en Firestore ───────────────────────────────────────────────────
export const COLLECTION = 'proyectos';

// ─── Enums ────────────────────────────────────────────────────────────────────

export const TIPO_OPERACION = Object.freeze({
  COMPRAR:  'Comprar',
  ALQUILAR: 'Alquilar',
  VENTA_DIRECTA: 'Venta Directa'
});

export const TIPO_INMUEBLE = Object.freeze({
  LOTES_URBANOS:         'Lotes Urbanos',
  DESARROLLO_HORIZONTAL: 'Desarrollo Horizontal',
  DEPARTAMENTOS:         'Departamentos',
  CASAS:                 'Casas',
  LOCALES:               'Locales',
  OFICINAS:              'Oficinas',
  TERRENOS:              'Terrenos'
});

export const TIPO_DESARROLLO = Object.freeze({
  HORIZONTAL:  'Desarrollo Horizontal',
  VERTICAL:    'Desarrollo Vertical',
  MIXTO:       'Mixto'
});

// ─── Modelo / Schema ──────────────────────────────────────────────────────────

/**
 * Crea un objeto proyecto limpio con valores por defecto.
 * @param {Object} data
 * @returns {Object}
 */
export function createProyectoModel(data) {
  return {
    // Información principal
    nombre:             data.nombre              ?? '',
    descripcion:        data.descripcion         ?? '',
    tipoOperacion:      data.tipoOperacion       ?? null,
    tipoInmueble:       data.tipoInmueble        ?? null,
    tipoDesarrollo:     data.tipoDesarrollo      ?? null,

    // Ubicación
    direccion:          data.direccion           ?? '',
    latitud:            data.latitud ? Number(data.latitud) : null,
    longitud:           data.longitud ? Number(data.longitud) : null,

    // Precios
    precio:             Number(data.precio ?? 0),
    precioDolares:      data.precioDolares ? Number(data.precioDolares) : null,

    // Dimensiones
    area:               Number(data.area ?? 0),
    frontis:            data.frontis ? Number(data.frontis) : null,
    fondo:              data.fondo ? Number(data.fondo) : null,
    perimetro:          data.perimetro ? Number(data.perimetro) : null,

    // Amenidades
    amenidades:         Array.isArray(data.amenidades) ? data.amenidades : [],

    // Imágenes (array de objetos { url, thumbUrl })
    imagenes:           Array.isArray(data.imagenes) ? data.imagenes : [],

    // Slug para URL pública
    slug:               data.slug ?? '',

    activo:             data.activo ?? true,
    creadoEn:           data.creadoEn ?? new Date().toISOString(),
    actualizadoEn:      new Date().toISOString()
  };
}

// ─── Validación ───────────────────────────────────────────────────────────────

export function validateProyecto(data) {
  const errors = [];

  if (!data.nombre?.trim())
    errors.push('El nombre del proyecto es requerido.');

  if (!data.direccion?.trim())
    errors.push('La dirección es requerida.');

  if (!data.area || isNaN(Number(data.area)) || Number(data.area) < 0)
    errors.push('El área debe ser un número positivo.');

  if (!data.tipoOperacion || !Object.values(TIPO_OPERACION).includes(data.tipoOperacion))
    errors.push(`Tipo de operación inválido. Valores permitidos: ${Object.values(TIPO_OPERACION).join(', ')}.`);

  if (!data.tipoInmueble || !Object.values(TIPO_INMUEBLE).includes(data.tipoInmueble))
    errors.push(`Tipo de inmueble inválido. Valores permitidos: ${Object.values(TIPO_INMUEBLE).join(', ')}.`);

  if (data.tipoDesarrollo && !Object.values(TIPO_DESARROLLO).includes(data.tipoDesarrollo))
    errors.push(`Tipo de desarrollo inválido. Valores permitidos: ${Object.values(TIPO_DESARROLLO).join(', ')}.`);

  return {
    isValid: errors.length === 0,
    errors
  };
}
