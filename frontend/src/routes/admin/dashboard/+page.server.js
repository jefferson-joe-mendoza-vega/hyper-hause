import { redirect } from '@sveltejs/kit';

export function load({ parent, url }) {
	// Verificar que viene authorized de layout
	const parentData = parent();
	
	if (!parentData?.user || parentData.user.rol !== 'admin') {
		console.warn('❌ Acceso denegado a dashboard - no es admin');
		throw redirect(303, '/perfil');
	}

	console.log(`✅ Admin ${parentData.user.email} accedió a dashboard`);
	
	return {
		user: parentData.user
	};
}
