<script>
	import { goto } from '$app/navigation';
	import { loadGoogleScript, getToken, setToken, setUser } from '$lib/auth.js';
	import { onMount } from 'svelte';

	const GOOGLE_CLIENT_ID = '469356156937-pbc5ehis02bvshqjbvhvil8odq9trj7k.apps.googleusercontent.com';
	const API_URL = 'http://localhost:8787';

	let loading = $state(false);
	let error = $state('');
	let initialized = $state(false);

	onMount(async () => {
		// Si ya está autenticado, ir al admin
		if (getToken()) {
			goto('/admin');
			return;
		}

		// Inicializar Google OAuth
		try {
			await loadGoogleScript();

			if (window.google?.accounts?.id) {
				// Configurar callback
				window.google.accounts.id.initialize({
					client_id: GOOGLE_CLIENT_ID,
					callback: handleCredentialResponse,
					auto_select: false
				});

				// Renderizar botón
				window.google.accounts.id.renderButton(document.getElementById('google-signin-button'), {
					theme: 'outline',
					size: 'large',
					text: 'signin_with',
					width: '300'
				});

				initialized = true;
			}
		} catch (err) {
			error = 'Error al cargar Google Sign-In: ' + err.message;
			console.error('Google init error:', err);
		}
	});

	async function handleCredentialResponse(response) {
		try {
			loading = true;
			error = '';

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
				const data = await res.json();
				throw new Error(data.error || 'Error en autenticación');
			}

			const data = await res.json();

			// Guardar token y usuario
			setToken(data.token);
			setUser(data.usuario);

			// Redirigir al admin
			loading = false;
			goto('/admin');
		} catch (err) {
			error = 'Error: ' + err.message;
			loading = false;
			console.error('Login error:', err);
		}
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
</script>

<svelte:head>
	<title>Login - Hyper House Admin</title>
</svelte:head>

<div class="login-container">
	<div class="login-card">
		<div class="logo-section">
			<h1>Hyper House</h1>
			<p>Panel de Administración</p>
		</div>

		<div class="login-content">
			<h2>Acceso Administrativo</h2>
			<p class="subtitle">
				Inicia sesión con tu cuenta de Google para acceder al panel de administración.
			</p>

			{#if error}
				<div class="error-message">{error}</div>
			{/if}

	{#if loading}
		<div class="loading">Autenticando...</div>
	{:else if initialized}

			<div class="divider">
				<span>Solo para administradores</span>
			</div>

			<p class="info-text">
				Se requiere una cuenta de Google autorizada para acceder a esta sección.
			</p>
		</div>

		<div class="footer-text">
			<p>© 2026 Hyper House Inmobiliaria - Todos los derechos reservados</p>
		</div>
	</div>
</div>

<style>
	.login-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #0b1121 0%, #1a1f3a 100%);
		padding: 20px;
	}

	.login-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		max-width: 450px;
		width: 100%;
		overflow: hidden;
	}

	.logo-section {
		background: linear-gradient(135deg, #0b1121 0%, #1a1f3a 100%);
		color: white;
		padding: 40px 30px;
		text-align: center;
	}

	.logo-section h1 {
		font-size: 32px;
		font-weight: 700;
		margin: 0 0 8px 0;
		letter-spacing: -0.5px;
	}

	.logo-section p {
		font-size: 14px;
		color: #94a3b8;
		margin: 0;
	}

	.login-content {
		padding: 40px 30px;
	}

	.login-content h2 {
		font-size: 24px;
		font-weight: 600;
		color: #0b1121;
		margin: 0 0 16px 0;
	}

	.subtitle {
		font-size: 14px;
		color: #64748b;
		margin: 0 0 24px 0;
		line-height: 1.6;
	}

	.error-message {
		background: #fee;
		color: #c00;
		padding: 12px 16px;
		border-radius: 8px;
		margin-bottom: 20px;
		font-size: 14px;
		border-left: 4px solid #c00;
	}

	.google-button-wrapper {
		display: flex;
		justify-content: center;
		margin: 30px 0;
	}

	.loading {
		text-align: center;
		padding: 30px 0;
		color: #94a3b8;
		font-size: 14px;
	}

	.divider {
		display: flex;
		align-items: center;
		margin: 30px 0;
		color: #94a3b8;
		font-size: 13px;
	}

	.divider::before,
	.divider::after {
		content: '';
		flex: 1;
		height: 1px;
		background: #e2e8f0;
	}

	.divider span {
		margin: 0 12px;
	}

	.info-text {
		font-size: 13px;
		color: #94a3b8;
		text-align: center;
		margin: 0;
		line-height: 1.5;
	}

	.footer-text {
		border-top: 1px solid #e2e8f0;
		padding: 20px 30px;
		text-align: center;
		color: #94a3b8;
		font-size: 12px;
		margin: 0;
	}

	.footer-text p {
		margin: 0;
	}

	@media (max-width: 640px) {
		.login-card {
			border-radius: 0;
		}

		.logo-section {
			padding: 30px 20px;
		}

		.logo-section h1 {
			font-size: 28px;
		}

		.login-content {
			padding: 30px 20px;
		}

		.login-content h2 {
			font-size: 20px;
		}

		.footer-text {
			padding: 15px 20px;
		}
	}
</style>
