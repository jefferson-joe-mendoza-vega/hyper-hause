/**
 * JWT utilities para Cloudflare Workers
 * Usando Web Crypto API (sin dependencias externas)
 */

// Codificar base64url (para JWT)
function base64urlEncode(data) {
	const binary = new TextEncoder().encode(JSON.stringify(data));
	const base64 = btoa(String.fromCharCode(...new Uint8Array(binary)));
	return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Generar firma HMAC-SHA256
async function generateSignature(message, secret) {
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey(
		'raw',
		encoder.encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign']
	);

	const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
	const base64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
	return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Generar JWT token
 * @param {Object} payload - Datos del usuario
 * @param {string} secret - Secret key para firmar
 * @param {number} expiresIn - Expiracion en segundos (default 7 dias)
 * @returns {Promise<string>} Token JWT
 */
export async function generateToken(payload, secret, expiresIn = 7 * 24 * 60 * 60) {
	const now = Math.floor(Date.now() / 1000);
	const exp = now + expiresIn;

	const header = {
		alg: 'HS256',
		typ: 'JWT'
	};

	const claims = {
		...payload,
		iat: now,
		exp: exp
	};

	const headerEncoded = base64urlEncode(header);
	const payloadEncoded = base64urlEncode(claims);
	const message = `${headerEncoded}.${payloadEncoded}`;

	const signature = await generateSignature(message, secret);

	return `${message}.${signature}`;
}

/**
 * Validar JWT token
 * @param {string} token - Token a validar
 * @param {string} secret - Secret key
 * @returns {Promise<Object>} Payload si es válido, null si no
 */
export async function verifyToken(token, secret) {
	try {
		const parts = token.split('.');
		if (parts.length !== 3) return null;

		const [headerEncoded, payloadEncoded, signatureProvided] = parts;
		const message = `${headerEncoded}.${payloadEncoded}`;

		// Verificar firma
		const signatureCalculated = await generateSignature(message, secret);
		if (signatureProvided !== signatureCalculated) {
			return null;
		}

		// Decodificar payload
		const payloadJson = atob(
			payloadEncoded.replace(/-/g, '+').replace(/_/g, '/')
		);
		const payload = JSON.parse(payloadJson);

		// Verificar expiración
		const now = Math.floor(Date.now() / 1000);
		if (payload.exp < now) {
			return null;
		}

		return payload;
	} catch (error) {
		console.error('Error validando JWT:', error);
		return null;
	}
}
