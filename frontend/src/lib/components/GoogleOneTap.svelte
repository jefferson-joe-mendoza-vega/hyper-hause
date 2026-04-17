<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const GOOGLE_CLIENT_ID = '469356156937-pbc5ehis02bvshqjbvhvil8odq9trj7k.apps.googleusercontent.com';
	const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

	let usuario = $state(null);
	let showOneTap = $derived(!$page.url.pathname.startsWith('/admin'));

	// ⭐ REGISTRAR CALLBACK GLOBALMENTE DESDE EL INICIO
	if (typeof window !== 'undefined' && !window.handleCredentialResponse) {
		window.handleCredentialResponse = async function (response) {
			try {
				console.log('🔐 Credencial recibida de Google');

				// Decodificar JWT
				const userData = decodeJwt(response.credential);

				// Enviar al backend
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

				if (!res.ok) {
					const errText = await res.text();
					let errMsg = 'Error en autenticación';
					try { errMsg = JSON.parse(errText)?.error || errMsg; } catch {}
					throw new Error(errMsg);
				}

				const resText = await res.text();
				let data;
				try { data = JSON.parse(resText); } catch {
					throw new Error('El servidor no devolvió una respuesta válida. Intenta de nuevo.');
				}

				console.log('📡 Respuesta COMPLETA del servidor:', JSON.stringify(data, null, 2));
				console.log('👤 Usuario recibido:', JSON.stringify(data.usuario, null, 2));
				console.log('🔐 Rol del usuario:', data.usuario?.rol);

				// Guardar datos
				if (typeof localStorage !== 'undefined') {
					const usuarioJSON = JSON.stringify(data.usuario);
					localStorage.setItem('auth_token', data.token);
					localStorage.setItem('auth_user', usuarioJSON);
					
					console.log('💾 Guardado en localStorage:');
					console.log('   Token:', data.token?.substring(0, 30) + '...');
					console.log('   Usuario JSON:', usuarioJSON);
					console.log('   Rol que se guardó:', data.usuario?.rol);
					
					// Verificar que se guardó bien
					const verificar = localStorage.getItem('auth_user');
					console.log('✅ Verificación - Lo que quedó en localStorage:', verificar);
				}

				console.log('✅ Sesión iniciada:', data.usuario.email);

				// Recargar página para actualizar estado
				setTimeout(() => window.location.reload(), 500);
			} catch (err) {
				console.error('❌ Login error:', err);
			}
		};
	}

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

	onMount(async () => {
		// Cargar usuario del localStorage si existe
		if (typeof localStorage !== 'undefined') {
			const storedUser = localStorage.getItem('auth_user');
			if (storedUser) {
				usuario = JSON.parse(storedUser);
			}
		}

		// Inicializar Google solo si no está autenticado y no está en /admin
		if (!usuario && showOneTap && typeof window !== 'undefined' && window.google) {
			initializeGoogle();
		}
	});

	function initializeGoogle() {
		try {
			if (window.google?.accounts?.id) {
				window.google.accounts.id.initialize({
					client_id: GOOGLE_CLIENT_ID,
					callback: window.handleCredentialResponse,
					auto_select: false,
					cancel_on_tap_outside: true
				});

				console.log('✅ Google inicializado correctamente');

				// Mostrar One Tap prompt
				window.google.accounts.id.prompt((notification) => {
					if (notification.isNotDisplayed() || notification.isSkipped()) {
						console.log('ℹ️ One Tap no se mostró (normal en localhost)');
					} else if (notification.isDisplayed()) {
						console.log('✅ One Tap mostrado correctamente');
					}
				});
			}
		} catch (err) {
			console.error('❌ Error initializing Google:', err);
		}
	}
</script>

<!-- No renderiza nada, solo maneja la inicialización global -->
