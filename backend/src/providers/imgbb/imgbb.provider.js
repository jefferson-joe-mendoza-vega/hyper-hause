/**
 * ImgBB Provider — Cloudflare Workers (fetch nativo, sin npm)
 *
 * Env var requerida:
 *   IMGBB_API_KEY = "3c0908058960d827a9fd2cf9132343de"
 *
 * Reglas:
 *  - Mínimo 1 imagen (imagen_1 obligatoria)
 *  - Máximo 10 imágenes (imagen_1 … imagen_10)
 *  - Acepta File/Blob de un FormData de Cloudflare Workers
 */

const IMGBB_URL = 'https://api.imgbb.com/1/upload';
const MAX_IMAGES = 10;

/**
 * Convierte un File/Blob a base64 sin Buffer (compatible con Workers).
 */
async function toBase64(file) {
  const buffer = await file.arrayBuffer();
  const bytes  = new Uint8Array(buffer);
  let binary   = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Sube una imagen a ImgBB.
 * @param {File|Blob} file
 * @param {string}    apiKey
 * @returns {{ url: string, deleteUrl: string, thumbUrl: string }}
 */
async function uploadOne(file, apiKey) {
  const base64 = await toBase64(file);

  const body = new FormData();
  body.append('image', base64);

  const res  = await fetch(`${IMGBB_URL}?key=${apiKey}`, { method: 'POST', body });
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(`ImgBB error: ${data?.error?.message ?? 'upload failed'}`);
  }

  return {
    url:       data.data.url,
    thumbUrl:  data.data.thumb?.url ?? data.data.display_url,
    deleteUrl: data.data.delete_url
  };
}

/**
 * Extrae y valida los archivos de imagen de un FormData.
 * Campos esperados: imagen_1 (obligatorio), imagen_2 … imagen_10 (opcionales).
 *
 * @param {FormData} formData
 * @returns {{ files: File[], error: string|null }}
 */
export function extractImages(formData) {
  const files = [];

  for (let i = 1; i <= MAX_IMAGES; i++) {
    const file = formData.get(`imagen_${i}`);
    if (file && file instanceof File && file.size > 0) {
      files.push(file);
    } else if (i === 1) {
      return { files: [], error: 'imagen_1 es obligatoria.' };
    } else {
      break; // los campos son consecutivos, si falta uno se para
    }
  }

  return { files, error: null };
}

/**
 * Sube todas las imágenes a ImgBB en paralelo.
 *
 * @param {File[]} files
 * @param {string} apiKey
 * @returns {Promise<Array<{ url, thumbUrl, deleteUrl }>>}
 */
export async function uploadImages(files, apiKey) {
  return Promise.all(files.map(file => uploadOne(file, apiKey)));
}
