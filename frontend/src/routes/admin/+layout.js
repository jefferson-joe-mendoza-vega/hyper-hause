import { redirect } from '@sveltejs/kit';
import { isAuthenticated, getUser, verifyTokenWithServer } from '$lib/auth.js';

export async function load({ url }) {
	// Verificar si está autenticado localmente
	if (!isAuthenticated()) {
		throw redirect(303, '/login');
	}

	// Verificar token con el servidor
	const isValid = await verifyTokenWithServer();
	if (!isValid) {
		throw redirect(303, '/login');
	}

	const user = getUser();

	// Pasar datos del usuario al layout
	return {
		user
	};
}
