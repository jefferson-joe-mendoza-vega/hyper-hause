<script>
	import { goto } from '$app/navigation';
	import { initializeGoogleAuth, renderGoogleButton, isAuthenticated, getUser } from '$lib/auth.js';
	import { onMount } from 'svelte';

	let loading = $state(false);
	let error = $state('');
	let initialized = $state(false);

	onMount(async () => {
		// Si ya está autenticado, ir al admin
		if (isAuthenticated()) {
			goto('/admin');
			return;
		}

		// Inicializar Google OAuth
		try {
			await initializeGoogleAuth(handleLoginSuccess);
			renderGoogleButton('google-signin-button');
			initialized = true;
		} catch (err) {
			error = 'Error al cargar Google Sign-In';
			console.error(err);
		}
	});

	function handleLoginSuccess(usuario) {
		loading = false;
		// Redirigir al dashboard
		goto('/admin');
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

			{#if initialized}
				<div id="google-signin-button" class="google-button-wrapper"></div>
			{:else}
				<div class="loading">Cargando Google Sign-In...</div>
			{/if}

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
