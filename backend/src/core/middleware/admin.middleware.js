/**
 * Middleware de Autorización
 * Verifica que el usuario tenga rol 'admin'
 * ⭐ También verifica contra la BD (por si cambiaron el rol después de login)
 */

import { extractAndVerifyToken } from './auth.middleware.js';

/**
 * Middleware que solo permite requests de administradores
 * Retorna error 403 si el usuario no es admin
 * @param {Request} req - Request objeto
 * @param {string} jwtSecret - Secret para verificar JWT
 * @param {Object} db - Cliente de Firestore (opcional, para verificar rol en BD)
 * @returns {Promise<Response|Object>} Error 403 o { authorized: true, user: payload }
 */
export async function requireAdmin(req, jwtSecret, db = null) {
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

	// Verificar que el usuario sea admin (en el token)
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

	// ⭐ VERIFICAR ROL ACTUAL EN LA BD (por si cambió después del login)
	if (db && payload.id) {
		try {
			const usuarioEnBD = await db.getById('usuarios', payload.id);
			
			if (usuarioEnBD && usuarioEnBD.rol !== 'admin') {
				console.warn(`❌ Rol del usuario ${payload.email} cambió a "${usuarioEnBD.rol}" pero intentó usar token antiguo`);
				
				return new Response(
					JSON.stringify({
						error: 'Acceso denegado',
						mensaje: 'Tu rol ha sido actualizado. Por favor, vuelve a iniciar sesión.',
						rolActual: usuarioEnBD.rol
					}),
					{ status: 403, headers: { 'Content-Type': 'application/json' } }
				);
			}
		} catch (err) {
			console.error('Error verificando rol en BD:', err.message);
			// Continuar de todas formas (fallback)
		}
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
