/**
 * Middleware de Autenticación
 * Verifica que el usuario tenga un JWT token válido
 */

import { verifyToken } from '../jwt/jwt.js';

/**
 * Extraer y verificar token JWT del header Authorization
 * @param {Request} req - Request objeto
 * @param {string} jwtSecret - Secret para verificar JWT
 * @returns {Promise<Object|null>} Payload del token si es válido, null si no
 */
export async function extractAndVerifyToken(req, jwtSecret) {
	try {
		const authHeader = req.headers.get('authorization');
		
		if (!authHeader) {
			console.warn('❌ No Authorization header');
			return null;
		}

		// El header debe ser: "Bearer <token>"
		const parts = authHeader.split(' ');
		if (parts.length !== 2 || parts[0] !== 'Bearer') {
			console.warn('❌ Invalid Authorization format');
			return null;
		}

		const token = parts[1];
		const payload = await verifyToken(token, jwtSecret);

		if (!payload) {
			console.warn('❌ Invalid or expired token');
			return null;
		}

		console.log('✓ Token válido para usuario:', payload.email);
		return payload;
	} catch (error) {
		console.error('Error en extractAndVerifyToken:', error.message);
		return null;
	}
}

/**
 * Middleware que solo permite requests autenticados
 * Retorna error 401 si no hay token válido
 */
export async function requireAuth(req, jwtSecret) {
	const payload = await extractAndVerifyToken(req, jwtSecret);

	if (!payload) {
		return new Response(
			JSON.stringify({
				error: 'No autorizado',
				mensaje: 'Token inválido o expirado. Por favor inicia sesión nuevamente.'
			}),
			{ status: 401, headers: { 'Content-Type': 'application/json' } }
		);
	}

	// Retornar el payload para que el handler lo use
	return { authenticated: true, user: payload };
}

/**
 * Generar response de error 401
 */
export function unauthorized(message = 'No autorizado') {
	return new Response(
		JSON.stringify({ error: 'No autorizado', mensaje: message }),
		{ status: 401, headers: { 'Content-Type': 'application/json' } }
	);
}
