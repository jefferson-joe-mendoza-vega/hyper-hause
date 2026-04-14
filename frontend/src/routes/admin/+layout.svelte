<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8787';

	let isAuthenticated = false;
	let adminName = 'Admin';
	let mobileMenuOpen = false;

	const adminMenuItems = [
		{ label: 'Dashboard', icon: 'fas fa-chart-line', path: '/admin/dashboard' },
		{ label: 'Propiedades', icon: 'fas fa-building', path: '/admin/propiedades' },
		{ label: 'Usuarios', icon: 'fas fa-users', path: '/admin/usuarios' }
	];

	function logout() {
		localStorage.removeItem('authToken');
		goto('/');
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
	<aside class="admin-sidebar {mobileMenuOpen ? 'mobile-open' : ''}">
		<div class="sidebar-header">
			<div class="logo">
				<i class="fas fa-shield-alt" />
				<span>Admin</span>
			</div>
			<button class="mobile-close-btn" on:click={closeMobileMenu}>
				<i class="fas fa-times" />
			</button>
		</div>

		<nav class="sidebar-nav">
			{#each adminMenuItems as item}
				<a
					href={item.path}
					class="nav-link {isActive(item.path) ? 'active' : ''}"
					on:click={closeMobileMenu}
				>
					<i class={item.icon} />
					<span>{item.label}</span>
				</a>
			{/each}
		</nav>

		<div class="sidebar-footer">
			<button class="logout-btn" on:click={logout}>
				<i class="fas fa-sign-out-alt" />
				<span>Logout</span>
			</button>
		</div>
	</aside>

	{#if mobileMenuOpen}
		<div class="mobile-overlay" on:click={closeMobileMenu}></div>
	{/if}

	<main class="admin-main">
		<header class="admin-header">
			<button class="mobile-menu-btn" on:click={toggleMobileMenu}>
				<i class="fas fa-bars" />
			</button>
			<div class="header-right">
				<div class="user-info">
					<span class="user-name">{adminName}</span>
					<i class="fas fa-user-circle" />
				</div>
			</div>
		</header>

		<div class="admin-content">
			<slot />
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

	.user-name {
		font-size: 14px;
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

	/* Responsive Design */
	@media (max-width: 1024px) {
		.admin-sidebar {
			width: 220px;
		}

		.admin-content {
			padding: 24px;
		}
	}

	@media (max-width: 768px) {
		.admin-container {
			flex-direction: column;
			height: auto;
			min-height: 100vh;
		}

		.admin-sidebar {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			z-index: 1000;
			transform: translateX(-100%);
			border-right: none;
			border-bottom: none;
			max-width: 280px;
			width: 80%;
		}

		.admin-sidebar.mobile-open {
			transform: translateX(0);
		}

		.mobile-close-btn {
			display: block;
		}

		.mobile-overlay {
			display: block;
		}

		.admin-main {
			width: 100%;
			height: 100vh;
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

		.sidebar-header {
			padding: 20px;
		}

		.logo span {
			display: none;
		}

		.nav-link span {
			display: none;
		}

		.nav-link {
			justify-content: center;
			padding: 16px;
		}

		.nav-link.active {
			border-left: none;
			border-bottom: 3px solid var(--accent-green-dark);
			padding-left: 16px;
		}

		.sidebar-nav {
			flex-direction: row;
			gap: 0;
		}

		.sidebar-footer {
			padding: 16px;
		}

		.logout-btn span {
			display: none;
		}

		.logout-btn {
			padding: 12px;
		}
	}

	@media (max-width: 480px) {
		.admin-sidebar {
			width: 100%;
			max-width: 100%;
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
