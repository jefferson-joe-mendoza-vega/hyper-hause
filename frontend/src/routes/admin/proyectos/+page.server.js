import { redirect } from '@sveltejs/kit';

export function load({ parent }) {
	// ⭐ Verificar acceso admin en proyectos
	const parentData = parent();
	
	if (!parentData?.user || parentData.user.rol !== 'admin') {
		console.warn('❌ Acceso denegado a proyectos - no es admin');
		throw redirect(303, '/perfil');
	}

	console.log(`✅ Admin ${parentData.user.email} accedió a gestión de proyectos`);
	
	return {
		user: parentData.user
	};
}
