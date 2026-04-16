import { redirect } from '@sveltejs/kit';

export const ssr = false; // Desabilitar SSR para acceso a localStorage

export async function load({ url }) {
	// Verificar si está autenticado (verificar localStorage)
	if (typeof localStorage === 'undefined') {
		console.warn('❌ No hay localStorage disponible');
		throw redirect(303, '/perfil');
	}

	const token = localStorage.getItem('auth_token');
	const userStr = localStorage.getItem('auth_user');

	if (!token || !userStr) {
		console.warn('❌ No hay sesión activa');
		throw redirect(303, '/perfil');
	}

	const user = JSON.parse(userStr);

	// ⭐ VERIFICAR QUE SEA ADMIN
	if (user.rol !== 'admin') {
		console.warn(`⚠️ Usuario ${user.email} intentó acceder a /admin sin permisos (rol: ${user.rol})`);
		throw redirect(303, '/perfil');
	}

	console.log(`✅ Admin ${user.email} autenticado en ${url.pathname}`);

	// Pasar datos del usuario al layout
	return {
		user
	};
}
