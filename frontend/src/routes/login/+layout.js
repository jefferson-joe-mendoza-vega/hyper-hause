export const ssr = false; // Desabilitar SSR para poder usar localStorage en el cliente
export const preload = true;

import { getToken } from '$lib/auth.js';

export function load() {
	// Si ya está autenticado, no mostrar login
	if (typeof window !== 'undefined' && getToken()) {
		return { authenticated: true };
	}
	return {};
}
