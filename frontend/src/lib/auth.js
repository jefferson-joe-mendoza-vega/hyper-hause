/**
 * auth.js - Lógica de autenticación con Google OAuth
 */

const GOOGLE_CLIENT_ID = '469356156937-pbc5ehis02bvshqjbvhvil8odq9trj7k.apps.googleusercontent.com';
const API_URL = 'http://localhost:8787'; // Cambiar en producción

/**
 * Cargar la biblioteca de Google OAuth
 */
export function loadGoogleScript() {
	return new Promise((resolve) => {
		if (window.google) {
			resolve();
			return;
		}

		const script = document.createElement('script');
		script.src = 'https://accounts.google.com/gsi/client';
		script.async = true;
		script.defer = true;
		script.onload = resolve;
		document.head.appendChild(script);
	});
}

/**
 * Inicializar Google OAuth (llamar en +page.svelte de login)
 */
export async function initializeGoogleAuth(callback) {
	await loadGoogleScript();

	window.google.accounts.id.initialize({
		client_id: GOOGLE_CLIENT_ID,
		callback: async (response) => {
			await handleGoogleSignIn(response, callback);
		}
	});

	return window.google;
}

/**
 * Renderizar botón de Google Sign-In
 */
export function renderGoogleButton(elementId) {
	if (window.google?.accounts?.id) {
		window.google.accounts.id.renderButton(
			document.getElementById(elementId),
			{
				theme: 'outline',
				size: 'large',
				text: 'signin_with'
			}
		);
	}
}

/**
 * Manejar respuesta de Google Sign-In
 */
export async function handleGoogleSignIn(response, callback) {
	try {
		// Decodificar JWT (sin validar firma en cliente)
		const userData = decodeJwt(response.credential);

		// Enviar al backend para validar y crear sesión
		const res = await fetch(`${API_URL}/api/auth/login-google`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				idToken: response.credential,
				googleId: userData.sub,
				nombre: userData.name,
				email: userData.email,
				foto: userData.picture
			})
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.error || 'Error en autenticación');
		}

		// Guardar token en localStorage
		setToken(data.token);
		setUser(data.usuario);

		// Ejecutar callback
		if (callback) {
			callback(data.usuario);
		}

		return data;
	} catch (error) {
		console.error('Error en handleGoogleSignIn:', error);
		throw error;
	}
}

/**
 * Decodificar JWT (base64)
 */
function decodeJwt(token) {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
			.join('')
	);
	return JSON.parse(jsonPayload);
}

/**
 * Guardar token en localStorage
 */
export function setToken(token) {
	localStorage.setItem('auth_token', token);
}

/**
 * Obtener token de localStorage
 */
export function getToken() {
	if (typeof window === 'undefined') return null;
	return localStorage.getItem('auth_token');
}

/**
 * Guardar datos del usuario
 */
export function setUser(user) {
	localStorage.setItem('auth_user', JSON.stringify(user));
}

/**
 * Obtener datos del usuario
 */
export function getUser() {
	if (typeof window === 'undefined') return null;
	const user = localStorage.getItem('auth_user');
	return user ? JSON.parse(user) : null;
}

/**
 * Verificar si el usuario está autenticado
 */
export function isAuthenticated() {
	return !!getToken();
}

/**
 * Verificar token con el servidor
 */
export async function verifyTokenWithServer() {
	const token = getToken();
	if (!token) return false;

	try {
		const res = await fetch(`${API_URL}/api/auth/verify`, {
			method: 'POST',
			headers: getAuthHeaders()
		});

		if (!res.ok) {
			// Token inválido o expirado
			logout();
			return false;
		}

		const data = await res.json();
		return data.ok;
	} catch (error) {
		console.error('Error verificando token:', error);
		return false;
	}
}

/**
 * Cerrar sesión
 */
export function logout() {
	localStorage.removeItem('auth_token');
	localStorage.removeItem('auth_user');

	// Limpiar sesión de Google
	if (window.google?.accounts?.id) {
		window.google.accounts.id.disableAutoSelect();
	}
}

/**
 * Obtener headers para peticiones autenticadas
 */
export function getAuthHeaders() {
	const token = getToken();
	return {
		'Content-Type': 'application/json',
		...(token && { Authorization: `Bearer ${token}` })
	};
}
