// La protección de ruta ya la maneja +layout.js con ssr=false.
export const ssr = false;

export async function load({ parent }) {
	const parentData = await parent();
	return {
		user: parentData?.user
	};
}
