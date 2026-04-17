// Este archivo vacío ahora es +page.js (client-side).
// La protección de ruta ya la maneja +layout.js con ssr=false.
// No se necesita lógica adicional aquí.
export const ssr = false;

export async function load({ parent }) {
	const parentData = await parent();
	return {
		user: parentData?.user
	};
}
