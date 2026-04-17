// Redirige /admin → /admin/dashboard completamente en el cliente.
// NO usar +page.server.js porque adapter-static genera __data.json
// que Firebase Hosting no puede servir (devuelve HTML → JSON.parse crash).
export const ssr = false;

export function load() {
	// La redirección la maneja +page.svelte via goto() en onMount
	return {};
}
