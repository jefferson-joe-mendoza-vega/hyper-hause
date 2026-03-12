/**
 * Convierte un texto a slug URL-friendly.
 * "Casa Moderna en San Isidro" → "casa-moderna-en-san-isidro"
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/[^a-z0-9\s-]/g, '')   // solo letras, números, espacios y guiones
    .trim()
    .replace(/\s+/g, '-')            // espacios → guiones
    .replace(/-+/g, '-');            // múltiples guiones → uno
}

/**
 * Genera el slug final: slugify(titulo) + '-' + primeros 6 chars del ID de Firestore.
 * Ejemplo: "casa-moderna-san-isidro-xk92mn"
 */
export function generateSlug(titulo, firestoreId) {
  return slugify(titulo) + '-' + firestoreId.slice(0, 6).toLowerCase();
}
