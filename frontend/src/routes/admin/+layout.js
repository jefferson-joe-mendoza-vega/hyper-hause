import { redirect } from '@sveltejs/kit';

export const ssr = false; // Desabilitar SSR para acceso a localStorage

export function load({ url }) {
	// Verificar si está autenticado (verificar localStorage)
	if (typeof localStorage === 'undefined') {
		throw redirect(303, '/perfil');
	}

	const token = localStorage.getItem('auth_token');
	const user = localStorage.getItem('auth_user');

	if (!token || !user) {
		throw redirect(303, '/perfil');
	}

	// Pasar datos del usuario al layout
	return {
		user: JSON.parse(user)
	};
}
