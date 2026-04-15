import { redirect } from '@sveltejs/kit';

export const ssr = false; // Desabilitar SSR para acceso a localStorage

export function load({ url }) {
	// Verificar si está autenticado (verificar localStorage)
	if (typeof localStorage === 'undefined') {
		throw redirect(303, '/perfil');
	}

	const token = localStorage.getItem('auth_token');
	const userStr = localStorage.getItem('auth_user');

	if (!token || !userStr) {
		throw redirect(303, '/perfil');
	}

	const user = JSON.parse(userStr);

	// ⭐ VERIFICAR QUE SEA ADMIN
	if (user.rol !== 'admin') {
		console.warn(`⚠️ Usuario ${user.email} intentó acceder a /admin sin permisos`);
		throw redirect(303, '/perfil');
	}

	console.log(`✅ Admin ${user.email} accedió a ${url.pathname}`);

	// Pasar datos del usuario al layout
	return {
		user
	};
}
