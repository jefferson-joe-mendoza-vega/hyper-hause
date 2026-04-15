/**
 * recomendaciones.js
 * Servicio para obtener propiedades recomendadas desde la API.
 *
 * Uso:
 *   import { fetchRecomendadas } from '$lib/services/recomendaciones.js';
 *   const properties = await fetchRecomendadas();
 */

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8787';

/**
 * Datos de respaldo usados cuando la API no está disponible.
 * Reemplaza con los datos reales cuando el backend esté en producción.
 */
const FALLBACK_DATA = [
	{
		slug: 'prada-residencias',
		title: 'Prada Residencias',
		price: 'S/ 479,000',
		bedrooms: 3,
		bathrooms: 3,
		area: '200m²',
		image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=500&q=80',
		badge: 'Nuevo',
		badgeType: 'green',
		location: 'Av. Tizón y Bueno 639, Jesús María',
		type: 'Alquilar'
	},
	{
		slug: 'casa-verde-premium',
		title: 'Casa Verde Premium',
		price: 'S/ 187,300',
		bedrooms: 1,
		bathrooms: 1,
		area: '65m²',
		image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=500&q=80',
		badge: 'Última unidad',
		badgeType: 'orange',
		location: 'Calle Italia 120, Miraflores',
		type: 'Alquilar'
	}
];

/**
 * Mapea una propiedad de la API al formato que espera PropertyCard.
 * @param {object} p  Propiedad cruda del backend
 * @returns {object}
 */
function mapApiProperty(p) {
	return {
		slug:       p.slug        ?? '',
		title:      p.titulo      ?? '',
		price:      p.precio != null ? `S/ ${Number(p.precio).toLocaleString('es-PE')}` : '',
		bedrooms:   p.dormitorios ?? 0,
		bathrooms:  p.banos       ?? 0,
		area:       p.area        ? `${p.area}m²` : '',
		image:      p.imagenes?.[0]?.url ?? '',
		badge:      p.recomendadoEtiqueta ?? 'Destacado',
		badgeColor: p.recomendadoColor   ?? '',
		badgeType:  'green',
		location:   p.direccion   ?? '',
		type:       p.tipoOperacion ?? 'Alquilar'
	};
}

/**
 * Obtiene las propiedades recomendadas.
 * Si la API falla, devuelve los datos de respaldo (fallback).
 *
 * @param {number} limit  Cantidad máxima de resultados (por defecto 10)
 * @returns {Promise<object[]>}
 */
export async function fetchRecomendadas(limit = 10) {
	try {
		const res = await fetch(`${API_BASE}/api/propiedades/recomendadas?limit=${limit}`);

		if (!res.ok) throw new Error(`API respondió con status ${res.status}`);

		const json = await res.json();

		if (!json.success || !Array.isArray(json.data)) {
			throw new Error('Formato de respuesta inesperado');
		}

		return json.data.map(mapApiProperty);
	} catch (err) {
		console.warn('[recomendaciones] Usando datos de respaldo:', err.message);
		return FALLBACK_DATA;
	}
}
