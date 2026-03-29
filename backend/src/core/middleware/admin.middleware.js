/**
 * Middleware de Autorización
 * Verifica que el usuario tenga rol 'admin'
 */

import { extractAndVerifyToken } from './auth.middleware.js';

/**
 * Middleware que solo permite requests de administradores
 * Retorna error 403 si el usuario no es admin
 * @param {Request} req - Request objeto
 * @param {string} jwtSecret - Secret para verificar JWT
 * @returns {Promise<Response|Object>} Error 403 o { authorized: true, user: payload }
 */
export async function requireAdmin(req, jwtSecret) {
	const payload = await extractAndVerifyToken(req, jwtSecret);

	if (!payload) {
		return new Response(
			JSON.stringify({
				error: 'No autorizado',
				mensaje: 'Token inválido o expirado.'
			}),
			{ status: 401, headers: { 'Content-Type': 'application/json' } }
		);
	}

	// Verificar que el usuario sea admin
	if (payload.rol !== 'admin') {
		console.warn(`❌ Usuario ${payload.email} intentó acceder a ruta admin sin permisos`);
		
		return new Response(
			JSON.stringify({
				error: 'Acceso denegado',
				mensaje: 'Solo los administradores pueden acceder a este recurso.',
				userRol: payload.rol
			}),
			{ status: 403, headers: { 'Content-Type': 'application/json' } }
		);
	}

	console.log(`✓ Admin ${payload.email} autenticado correctamente`);
	return { authorized: true, user: payload };
}

/**
 * Generar response de error 403
 */
export function forbidden(message = 'Acceso denegado') {
	return new Response(
		JSON.stringify({
			error: 'Acceso denegado',
			mensaje: message
		}),
		{ status: 403, headers: { 'Content-Type': 'application/json' } }
	);
}
