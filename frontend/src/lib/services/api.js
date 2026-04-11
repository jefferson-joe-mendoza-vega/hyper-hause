/**
 * api.js — Cliente HTTP centralizado para el backend HyperHause
 *
 * Todos los fetch del frontend deben pasar por aquí.
 * URL base: VITE_API_URL (definida en .env)
 */

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8787';

function getToken() {
	if (typeof localStorage === 'undefined') return null;
	return localStorage.getItem('token');
}

function authHeaders(extra = {}) {
	const token = getToken();
	return {
		...(token ? { Authorization: `Bearer ${token}` } : {}),
		...extra
	};
}

async function handleResponse(res) {
	const json = await res.json().catch(() => ({}));
	if (!res.ok) {
		const msg = json.error ?? json.message ?? `Error ${res.status}`;
		throw new Error(msg);
	}
	return json;
}

// ── Propiedades ──────────────────────────────────────────────────────────────

export const propiedadesApi = {
	/** GET /api/propiedades */
	getAll: (params = {}) => {
		const qs = new URLSearchParams(params).toString();
		return fetch(`${BASE}/api/propiedades${qs ? '?' + qs : ''}`, {
			headers: authHeaders()
		}).then(handleResponse);
	},

	/** GET /api/propiedades/recomendadas */
	getRecomendadas: (limit = 10) =>
		fetch(`${BASE}/api/propiedades/recomendadas?limit=${limit}`).then(handleResponse),

	/** GET /api/propiedades/:id */
	getById: (id) =>
		fetch(`${BASE}/api/propiedades/${id}`, { headers: authHeaders() }).then(handleResponse),

	/** GET /api/propiedades/slug/:slug */
	getBySlug: (slug) =>
		fetch(`${BASE}/api/propiedades/slug/${slug}`).then(handleResponse),

	/** POST /api/propiedades  (multipart/form-data) */
	create: (formData) =>
		fetch(`${BASE}/api/propiedades`, {
			method: 'POST',
			headers: authHeaders(), // NO Content-Type — el browser lo pone con boundary
			body: formData
		}).then(handleResponse),

	/** PUT /api/propiedades/:id  (multipart/form-data) */
	update: (id, formData) =>
		fetch(`${BASE}/api/propiedades/${id}`, {
			method: 'PUT',
			headers: authHeaders(),
			body: formData
		}).then(handleResponse),

	/** DELETE /api/propiedades/:id */
	delete: (id) =>
		fetch(`${BASE}/api/propiedades/${id}`, {
			method: 'DELETE',
			headers: authHeaders()
		}).then(handleResponse)
};

// ── Auth ─────────────────────────────────────────────────────────────────────

export const authApi = {
	/** POST /api/auth/login-google */
	loginGoogle: (payload) =>
		fetch(`${BASE}/api/auth/login-google`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		}).then(handleResponse)
};

// ── Admin: Usuarios ───────────────────────────────────────────────────────────

export const usuariosApi = {
	getAll: () =>
		fetch(`${BASE}/api/admin/usuarios`, { headers: authHeaders() }).then(handleResponse),

	updateRol: (id, rol) =>
		fetch(`${BASE}/api/admin/usuarios/${id}/rol`, {
			method: 'PUT',
			headers: authHeaders({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ rol })
		}).then(handleResponse),

	updateEstado: (id, estado) =>
		fetch(`${BASE}/api/admin/usuarios/${id}/estado`, {
			method: 'PUT',
			headers: authHeaders({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ estado })
		}).then(handleResponse),

	delete: (id) =>
		fetch(`${BASE}/api/admin/usuarios/${id}`, {
			method: 'DELETE',
			headers: authHeaders()
		}).then(handleResponse)
};
