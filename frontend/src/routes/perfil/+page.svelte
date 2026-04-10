<script>
	import { goto } from '$app/navigation';

	// ── Estado de sesión (simulado — conectar con store real cuando exista) ─────
	// Estructura compatible con el backend: { id, nombre, email, foto, rol, estado }
	let usuario = $state(
		typeof localStorage !== 'undefined'
			? JSON.parse(localStorage.getItem('usuario') ?? 'null')
			: null
	);

	let sesionActiva = $derived(usuario !== null);

	// ── Menú de opciones del perfil ───────────────────────────────────────────
	const menuItems = [
		{
			group: 'Mi actividad',
			items: [
				{ icon: 'fas fa-heart', label: 'Propiedades guardadas', href: '/favoritos', color: '#f43f5e', bg: '#fff1f2' },
				{ icon: 'fas fa-history', label: 'Historial de búsqueda', href: '/historial', color: '#1a4b8e', bg: '#eef4ff' },
				{ icon: 'fas fa-bell', label: 'Mis alertas', href: '/alertas', color: '#f59e0b', bg: '#fff7ed' }
			]
		},
		{
			group: 'Cuenta',
			items: [
				{ icon: 'fas fa-user-edit', label: 'Editar perfil', href: '/perfil/editar', color: '#8b5cf6', bg: '#f5f3ff' },
				{ icon: 'fas fa-lock', label: 'Privacidad y seguridad', href: '/perfil/seguridad', color: '#0891b2', bg: '#ecfeff' },
				{ icon: 'fas fa-question-circle', label: 'Ayuda y soporte', href: '/ayuda', color: '#22c55e', bg: '#f0fdf4' }
			]
		}
	];

	function cerrarSesion() {
		if (typeof localStorage !== 'undefined') {
			localStorage.removeItem('usuario');
			localStorage.removeItem('token');
		}
		usuario = null;
	}

	function loginConGoogle() {
		// Placeholder — conectar con el flujo real de Google OAuth
		goto('/admin');
	}

	// Avatar placeholder si no hay foto
	function iniciales(nombre = '') {
		return nombre
			.split(' ')
			.slice(0, 2)
			.map((n) => n[0])
			.join('')
			.toUpperCase();
	}
</script>

<svelte:head>
	<title>Mi Perfil — HyperHause</title>
	<meta name="description" content="Gestiona tu cuenta, propiedades guardadas y preferencias en HyperHause." />
</svelte:head>

{#if sesionActiva}
	<!-- ════════════════════════════════════════════════════════════════════════ -->
	<!-- VISTA: USUARIO LOGUEADO                                                 -->
	<!-- ════════════════════════════════════════════════════════════════════════ -->

	<!-- Hero del perfil -->
	<div class="perfil-hero">
		<div class="hero-bg-decor" />

		<div class="avatar-wrap">
			{#if usuario.foto}
				<img src={usuario.foto} alt="Avatar de {usuario.nombre}" class="avatar-img" />
			{:else}
				<div class="avatar-placeholder">
					{iniciales(usuario.nombre)}
				</div>
			{/if}

			{#if usuario.rol === 'admin'}
				<span class="rol-badge">Admin</span>
			{/if}
		</div>

		<h1 class="perfil-nombre">{usuario.nombre}</h1>
		<p class="perfil-email">{usuario.email}</p>

		<!-- Stats del usuario -->
		<div class="user-stats">
			<div class="user-stat">
				<span class="user-stat-val">0</span>
				<span class="user-stat-lbl">Guardados</span>
			</div>
			<div class="user-stat-divider" />
			<div class="user-stat">
				<span class="user-stat-val">0</span>
				<span class="user-stat-lbl">Consultas</span>
			</div>
			<div class="user-stat-divider" />
			<div class="user-stat">
				<span class="user-stat-val">0</span>
				<span class="user-stat-lbl">Alertas</span>
			</div>
		</div>
	</div>

	<!-- Menú de opciones -->
	<div class="perfil-menu">
		{#each menuItems as grupo}
			<p class="grupo-label">{grupo.group}</p>
			<div class="grupo-items">
				{#each grupo.items as item}
					<a class="menu-item" href={item.href}>
						<div class="menu-icon" style="background:{item.bg}; color:{item.color}">
							<i class={item.icon} />
						</div>
						<span class="menu-label">{item.label}</span>
						<i class="fas fa-chevron-right menu-arrow" />
					</a>
				{/each}
			</div>
		{/each}

		<!-- Botón cerrar sesión -->
		<button class="btn-logout" onclick={cerrarSesion}>
			<i class="fas fa-sign-out-alt" />
			Cerrar sesión
		</button>
	</div>

{:else}
	<!-- ════════════════════════════════════════════════════════════════════════ -->
	<!-- VISTA: NO LOGUEADO                                                      -->
	<!-- ════════════════════════════════════════════════════════════════════════ -->

	<div class="no-sesion-wrap">
		<!-- Ilustración -->
		<div class="no-sesion-ilus">
			<div class="ilus-circle">
				<i class="fas fa-user-circle ilus-icon" />
			</div>
			<div class="ilus-dot dot-1" />
			<div class="ilus-dot dot-2" />
			<div class="ilus-dot dot-3" />
		</div>

		<h1 class="no-sesion-title">Bienvenido a<br /><span>HyperHause</span></h1>
		<p class="no-sesion-sub">
			Inicia sesión para guardar propiedades, recibir alertas y acceder a tu historial de búsqueda.
		</p>

		<!-- Beneficios -->
		<div class="beneficios">
			{#each [
				{ icon: 'fas fa-heart', text: 'Guarda tus propiedades favoritas' },
				{ icon: 'fas fa-bell', text: 'Recibe alertas de nuevas propiedades' },
				{ icon: 'fas fa-history', text: 'Accede a tu historial de búsqueda' }
			] as b}
				<div class="beneficio-item">
					<i class={b.icon} />
					<span>{b.text}</span>
				</div>
			{/each}
		</div>

		<!-- Botón Google -->
		<button class="btn-google" onclick={loginConGoogle}>
			<svg class="google-logo" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
				<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
				<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
				<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
			</svg>
			Continuar con Google
		</button>

		<p class="terminos">
			Al iniciar sesión aceptas nuestros <a href="/terminos">Términos de uso</a> y
			<a href="/privacidad">Política de privacidad</a>.
		</p>
	</div>
{/if}

<style>
	/* ══════════════════════════════════════════════════════ */
	/* VISTA LOGUEADO                                         */
	/* ══════════════════════════════════════════════════════ */

	.perfil-hero {
		background: linear-gradient(150deg, #1a233a 0%, #1a4b8e 100%);
		padding: 40px 24px 32px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		position: relative;
		overflow: hidden;
	}

	.hero-bg-decor {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 80% 20%, rgba(0,208,132,0.12) 0%, transparent 60%);
		pointer-events: none;
	}

	.avatar-wrap {
		position: relative;
		margin-bottom: 4px;
	}

	.avatar-img {
		width: 88px;
		height: 88px;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid rgba(255,255,255,0.3);
	}

	.avatar-placeholder {
		width: 88px;
		height: 88px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--logo-green), #1a4b8e);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28px;
		font-weight: 700;
		color: white;
		border: 3px solid rgba(255,255,255,0.25);
	}

	.rol-badge {
		position: absolute;
		bottom: 2px;
		right: -4px;
		background: var(--logo-green);
		color: #1a233a;
		font-size: 9px;
		font-weight: 800;
		padding: 2px 8px;
		border-radius: 20px;
		letter-spacing: 0.05em;
	}

	.perfil-nombre {
		font-size: 20px;
		font-weight: 700;
		color: white;
		text-align: center;
	}

	.perfil-email {
		font-size: 12px;
		color: rgba(255,255,255,0.6);
		margin-bottom: 16px;
	}

	.user-stats {
		display: flex;
		align-items: center;
		gap: 0;
		background: rgba(255,255,255,0.08);
		border-radius: 16px;
		padding: 14px 0;
		width: 100%;
		max-width: 320px;
	}

	.user-stat {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}

	.user-stat-divider {
		width: 1px;
		height: 32px;
		background: rgba(255,255,255,0.12);
	}

	.user-stat-val {
		font-size: 20px;
		font-weight: 700;
		color: white;
	}

	.user-stat-lbl {
		font-size: 10px;
		color: rgba(255,255,255,0.55);
	}

	/* Menú */
	.perfil-menu {
		padding: 24px 20px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.grupo-label {
		font-size: 10px;
		font-weight: 800;
		letter-spacing: 0.1em;
		color: var(--text-gray);
		text-transform: uppercase;
		margin-bottom: -8px;
	}

	.grupo-items {
		background: white;
		border-radius: 18px;
		box-shadow: 0 4px 18px rgba(0,0,0,0.05);
		overflow: hidden;
	}

	.menu-item {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 15px 16px;
		border-bottom: 1px solid #f1f5f9;
		text-decoration: none;
		transition: background 0.15s;
		cursor: pointer;
	}

	.menu-item:last-child {
		border-bottom: none;
	}

	.menu-item:hover {
		background: #f8fafc;
	}

	.menu-icon {
		width: 40px;
		height: 40px;
		border-radius: 11px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		flex-shrink: 0;
	}

	.menu-label {
		flex: 1;
		font-size: 14px;
		font-weight: 500;
		color: var(--text-main);
	}

	.menu-arrow {
		font-size: 11px;
		color: #cbd5e1;
	}

	.btn-logout {
		width: 100%;
		padding: 15px;
		background: #fff1f2;
		color: #f43f5e;
		border: none;
		border-radius: 14px;
		font-size: 14px;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		cursor: pointer;
		font-family: 'Inter', sans-serif;
		transition: background 0.2s;
	}

	.btn-logout:hover {
		background: #ffe4e6;
	}

	/* ══════════════════════════════════════════════════════ */
	/* VISTA NO LOGUEADO                                      */
	/* ══════════════════════════════════════════════════════ */

	.no-sesion-wrap {
		padding: 48px 28px 32px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		min-height: 70vh;
	}

	/* Ilustración animada */
	.no-sesion-ilus {
		position: relative;
		width: 110px;
		height: 110px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 8px;
	}

	.ilus-circle {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background: linear-gradient(145deg, #eef4ff, #dce8ff);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ilus-icon {
		font-size: 48px;
		color: var(--text-blue);
	}

	.ilus-dot {
		position: absolute;
		border-radius: 50%;
		background: var(--logo-green);
		animation: float-dot 3s ease-in-out infinite;
	}

	.dot-1 { width: 10px; height: 10px; top: 4px; right: 8px; animation-delay: 0s; }
	.dot-2 { width: 7px; height: 7px; bottom: 10px; right: 4px; animation-delay: 0.8s; background: var(--badge-orange); }
	.dot-3 { width: 8px; height: 8px; bottom: 6px; left: 10px; animation-delay: 1.5s; background: #a855f7; }

	@keyframes float-dot {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-6px); }
	}

	.no-sesion-title {
		font-size: 26px;
		font-weight: 700;
		color: var(--text-main);
		text-align: center;
		line-height: 1.25;
		letter-spacing: -0.4px;
	}

	.no-sesion-title span {
		color: var(--text-blue);
	}

	.no-sesion-sub {
		font-size: 13px;
		color: var(--text-gray);
		text-align: center;
		line-height: 1.6;
		max-width: 300px;
	}

	/* Beneficios */
	.beneficios {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.beneficio-item {
		display: flex;
		align-items: center;
		gap: 12px;
		background: #f8fafc;
		padding: 13px 16px;
		border-radius: 12px;
		font-size: 13px;
		color: var(--text-main);
		font-weight: 500;
	}

	.beneficio-item i {
		color: var(--logo-green);
		font-size: 15px;
		width: 18px;
		text-align: center;
	}

	/* Botón Google */
	.btn-google {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		padding: 15px;
		background: white;
		border: 1.5px solid var(--border-color);
		border-radius: 14px;
		font-size: 15px;
		font-weight: 600;
		color: var(--text-main);
		cursor: pointer;
		font-family: 'Inter', sans-serif;
		transition: border-color 0.2s, box-shadow 0.2s;
		box-shadow: 0 2px 10px rgba(0,0,0,0.05);
	}

	.btn-google:hover {
		border-color: #4285F4;
		box-shadow: 0 4px 16px rgba(66,133,244,0.15);
	}

	.google-logo {
		width: 20px;
		height: 20px;
		flex-shrink: 0;
	}

	.terminos {
		font-size: 11px;
		color: var(--text-gray);
		text-align: center;
		line-height: 1.6;
	}

	.terminos a {
		color: var(--text-blue);
		text-decoration: none;
		font-weight: 600;
	}

	/* Responsive */
	@media (min-width: 768px) {
		.no-sesion-wrap {
			max-width: 440px;
			margin: 0 auto;
		}

		.perfil-menu {
			max-width: 640px;
			margin: 0 auto;
			padding: 24px 0;
		}
	}
</style>
