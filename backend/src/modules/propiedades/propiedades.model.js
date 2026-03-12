// ─── Colección en Firestore ───────────────────────────────────────────────────
export const COLLECTION = 'propiedades';

// ─── Enums ────────────────────────────────────────────────────────────────────

export const TIPO_OPERACION = Object.freeze({
  ALQUILAR:  'Alquilar',
  COMPRAR:   'Comprar',
  TEMPORAL:  'Temporal',
  PROYECTOS: 'Proyectos',
  TRASPASO:  'Traspaso'
});

export const TIPO_INMUEBLE = Object.freeze({
  DEPARTAMENTO:              'Departamento',
  CASA:                      'Casa',
  TERRENO_LOTE:              'Terreno / Lote',
  LOCAL_COMERCIAL:           'Local comercial',
  OFICINA_COMERCIAL:         'Oficina comercial',
  CASA_DE_CAMPO:             'Casa de campo',
  CASA_DE_PLAYA:             'Casa de playa',
  CONDOMINIO_CASAS:          'Condominio de casas',
  CONDOMINIO_EDIFICIOS:      'Condominio de edificios',
  DESARROLLO_H_V:            'Desarrollo horizontal/vertical',
  DESARROLLO_VERTICAL:       'Desarrollo vertical',
  EDIFICIOS:                 'Edificios',
  GARAGE:                    'Garage',
  HABITACION:                'Habitación',
  HOTEL:                     'Hotel',
  LOTE:                      'Lote',
  NAVE_INDUSTRIAL:           'Nave industrial',
  OTROS:                     'Otros',
  PROYECTO_DE_LOTES:         'Proyecto de lotes',
  TERRENO_AGRICOLA:          'Terreno agrícola'
});

// ─── Modelo / Schema ──────────────────────────────────────────────────────────

/**
 * Crea un objeto propiedad limpio con valores por defecto.
 * @param {Object} data
 * @returns {Object}
 */
export function createPropiedadModel(data) {
  return {
    // Información principal
    titulo:             data.titulo             ?? '',
    descripcion:        data.descripcion        ?? '',
    precio:             Number(data.precio       ?? 0),
    tipoOperacion:      data.tipoOperacion      ?? null,
    tipoInmueble:       data.tipoInmueble       ?? null,

    // Ubicación
    direccion:          data.direccion          ?? '',
    mapaUrl:            data.mapaUrl            ?? '',

    // Amenidades
    amenidades:         Array.isArray(data.amenidades) ? data.amenidades : [],

    // Características
    dormitorios:        Number(data.dormitorios      ?? 0),
    banos:              Number(data.banos            ?? 0),
    estacionamientos:   Number(data.estacionamientos ?? 0),
    area:               Number(data.area             ?? 0),

    // Imágenes (array de objetos { url, thumbUrl, deleteUrl })
    imagenes:           Array.isArray(data.imagenes) ? data.imagenes : [],

    // Slug para URL pública (se genera después de crear en Firestore)
    slug:               data.slug ?? '',

    activo:             data.activo             ?? true,
    recomendado:        data.recomendado        ?? false,
    recomendadoEtiqueta: data.recomendadoEtiqueta ?? '',
    recomendadoColor:   data.recomendadoColor   ?? '',
    creadoEn:           data.creadoEn           ?? new Date().toISOString(),
    actualizadoEn:      new Date().toISOString()
  };
}

// ─── Validación ───────────────────────────────────────────────────────────────

export function validatePropiedad(data) {
  const errors = [];

  if (!data.titulo?.trim())
    errors.push('El título del anuncio es requerido.');

  if (!data.precio || isNaN(Number(data.precio)) || Number(data.precio) < 0)
    errors.push('El precio debe ser un número positivo.');

  if (!data.tipoOperacion || !Object.values(TIPO_OPERACION).includes(data.tipoOperacion))
    errors.push(`Tipo de operación inválido. Valores permitidos: ${Object.values(TIPO_OPERACION).join(', ')}.`);

  if (!data.tipoInmueble || !Object.values(TIPO_INMUEBLE).includes(data.tipoInmueble))
    errors.push(`Tipo de inmueble inválido. Valores permitidos: ${Object.values(TIPO_INMUEBLE).join(', ')}.`);

  if (!Array.isArray(data.imagenes) || data.imagenes.length === 0)
    errors.push('Se requiere al menos 1 imagen.');

  if (Array.isArray(data.imagenes) && data.imagenes.length > 10)
    errors.push('Se permiten máximo 10 imágenes.');

  return errors;
}
