<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { logout as authLogout, getUser } from '$lib/auth.js';

	const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

	let isAuthenticated = $state(false);
	let adminName = $state('Admin');
	let userEmail = $state('');
	let mobileMenuOpen = $state(false);

	let { data, children } = $props();

	$effect(() => {
		if (data?.user) {
			adminName = data.user.nombre || 'Admin';
			userEmail = data.user.email || '';
		}
	});

	const adminMenuItems = [
		{ label: 'Dashboard', icon: 'fas fa-chart-line', path: '/admin/dashboard' },
		{ label: 'Propiedades', icon: 'fas fa-building', path: '/admin/propiedades' },
		{ label: 'Proyectos', icon: 'fas fa-city', path: '/admin/proyectos' },
		{ label: 'Usuarios', icon: 'fas fa-users', path: '/admin/usuarios' }
	];

	function logout() {
		authLogout();
		goto('/login');
	}

	function isActive(path) {
		return $page.url.pathname === path;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<div class="admin-container">
	<aside class="admin-sidebar" class:mobile-open={mobileMenuOpen}>
		<div class="sidebar-header">
			<div class="logo">
				<i class="fas fa-shield-alt"></i>
				<span>Admin</span>
			</div>
			<button class="mobile-close-btn" onclick={closeMobileMenu} aria-label="Cerrar menú">
				<i class="fas fa-times"></i>
			</button>
		</div>

		<nav class="sidebar-nav">
			{#each adminMenuItems as item}
				<a
					href={item.path}
					class="nav-link {isActive(item.path) ? 'active' : ''}"
					onclick={closeMobileMenu}
				>
					<i class={item.icon}></i>
					<span>{item.label}</span>
				</a>
			{/each}
		</nav>

		<div class="sidebar-footer">
			<button class="logout-btn" onclick={logout}>
				<i class="fas fa-sign-out-alt"></i>
				<span>Logout</span>
			</button>
		</div>
	</aside>

	{#if mobileMenuOpen}
		<div class="mobile-overlay" onclick={closeMobileMenu} onkeydown={closeMobileMenu} role="button" tabindex="-1" aria-label="Cerrar menú"></div>
	{/if}

	<main class="admin-main">
		<header class="admin-header">
			<button class="mobile-menu-btn" onclick={toggleMobileMenu} aria-label="Abrir menú">
				<i class="fas fa-bars"></i>
			</button>
			<div class="header-right">
				<div class="user-info">
					<div class="user-details">
						<span class="user-name">{adminName}</span>
						<span class="user-email">{userEmail}</span>
					</div>
					<i class="fas fa-user-circle"></i>
				</div>
			</div>
		</header>

		<div class="admin-content">
			{@render children()}
		</div>
	</main>
</div>

<style>
	.admin-container {
		display: flex;
		height: 100vh;
		background-color: #f5f7fa;
	}

	.admin-sidebar {
		width: 250px;
		background-color: var(--white);
		border-right: 1px solid var(--border-color);
		display: flex;
		flex-direction: column;
		box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
		transition: transform 0.3s ease;
	}

	.sidebar-header {
		padding: 24px;
		border-bottom: 1px solid var(--border-color);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 12px;
		color: var(--text-blue);
		font-weight: 700;
		font-size: 18px;
	}

	.logo i {
		font-size: 24px;
	}

	.mobile-close-btn {
		display: none;
		background: none;
		border: none;
		font-size: 24px;
		color: var(--text-main);
		cursor: pointer;
	}

	.sidebar-nav {
		flex: 1;
		padding: 20px 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 20px;
		color: var(--text-gray);
		text-decoration: none;
		transition: all 0.2s;
		font-weight: 500;
		font-size: 14px;
	}

	.nav-link:hover {
		background-color: var(--bg-gray-light);
		color: var(--text-blue);
	}

	.nav-link.active {
		background-color: var(--bg-green-light);
		color: var(--accent-green-dark);
		border-left: 3px solid var(--accent-green-dark);
		padding-left: 17px;
	}

	.sidebar-footer {
		padding: 20px;
		border-top: 1px solid var(--border-color);
	}

	.logout-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 10px 16px;
		background-color: #fee2e2;
		color: #dc2626;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 600;
		transition: 0.2s;
		font-size: 14px;
	}

	.logout-btn:hover {
		background-color: #fecaca;
	}

	.admin-main {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.admin-header {
		background-color: var(--white);
		border-bottom: 1px solid var(--border-color);
		padding: 16px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
	}

	.mobile-menu-btn {
		display: none;
		background: none;
		border: none;
		font-size: 20px;
		color: var(--text-main);
		cursor: pointer;
	}

	.header-right {
		display: flex;
		align-items: center;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 12px;
		color: var(--text-main);
		font-weight: 600;
	}

	.user-details {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.user-name {
		font-size: 14px;
	}

	.user-email {
		font-size: 12px;
		color: var(--text-gray);
		font-weight: 400;
	}

	.user-info i {
		font-size: 24px;
		color: var(--text-blue);
	}

	.admin-content {
		flex: 1;
		overflow-y: auto;
		padding: 30px;
	}

	.mobile-overlay {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}

	/* ── Responsive ──────────────────────────────────────────────────── */

	@media (max-width: 1024px) {
		.admin-sidebar {
			width: 220px;
		}

		.admin-content {
			padding: 24px;
		}
	}

	@media (max-width: 768px) {
		/* El contenedor principal ocupa toda la pantalla */
		.admin-container {
			flex-direction: column;
			height: auto;
			min-height: 100vh;
		}

		/* ── Drawer lateral ────────────────────────────── */
		.admin-sidebar {
			position: fixed;
			top: 0;
			left: 0;
			height: 100vh;
			width: 280px;
			max-width: 85vw;
			z-index: 1000;
			transform: translateX(-100%);
			transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
			box-shadow: 4px 0 24px rgba(0, 0, 0, 0.18);
			display: flex;
			flex-direction: column;
			border-right: none;
		}

		.admin-sidebar.mobile-open {
			transform: translateX(0);
		}

		/* Header del drawer: logo + botón cerrar */
		.sidebar-header {
			padding: 20px 20px 16px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid var(--border-color);
		}

		/* Mostrar el nombre del logo en el drawer */
		.logo span {
			display: inline;
			font-size: 16px;
		}

		.mobile-close-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 32px;
			height: 32px;
			border-radius: 8px;
			background: #f1f5f9;
			color: var(--text-main);
			font-size: 16px;
		}

		/* Nav vertical con labels */
		.sidebar-nav {
			flex: 1;
			flex-direction: column;
			gap: 4px;
			padding: 16px 12px;
			overflow-y: auto;
		}

		.nav-link {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			gap: 14px;
			padding: 13px 16px;
			border-radius: 12px;
			font-size: 14px;
			font-weight: 500;
		}

		.nav-link span {
			display: inline;
		}

		.nav-link i {
			width: 20px;
			text-align: center;
			font-size: 15px;
		}

		.nav-link.active {
			border-left: 3px solid var(--accent-green-dark);
			padding-left: 13px;
			border-bottom: none;
		}

		/* Footer con logout completo */
		.sidebar-footer {
			padding: 16px 12px;
			border-top: 1px solid var(--border-color);
		}

		.logout-btn {
			width: 100%;
			padding: 12px 16px;
			justify-content: center;
			gap: 10px;
		}

		.logout-btn span {
			display: inline;
		}

		/* Overlay oscuro */
		.mobile-overlay {
			display: block;
		}

		/* Main ocupa todo el ancho */
		.admin-main {
			width: 100%;
			min-height: 100vh;
		}

		.admin-header {
			padding: 12px 16px;
		}

		.mobile-menu-btn {
			display: block;
		}

		.user-name {
			display: none;
		}

		.admin-content {
			padding: 16px;
			min-height: calc(100vh - 60px);
		}
	}

	@media (max-width: 480px) {
		.admin-sidebar {
			width: 260px;
			max-width: 90vw;
		}

		.admin-header {
			padding: 10px 12px;
		}

		.user-info {
			gap: 8px;
		}

		.user-info i {
			font-size: 20px;
		}

		.admin-content {
			padding: 12px;
		}
	}
</style>
