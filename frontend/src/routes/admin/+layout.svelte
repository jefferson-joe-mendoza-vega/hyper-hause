<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8787';

	let isAuthenticated = false;
	let adminName = 'Admin';

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
</script>

<div class="admin-container">
	<aside class="admin-sidebar">
		<div class="sidebar-header">
			<div class="logo">
				<i class="fas fa-shield-alt" />
				<span>Admin Panel</span>
			</div>
		</div>

		<nav class="sidebar-nav">
			{#each adminMenuItems as item}
				<a
					href={item.path}
					class="nav-link {isActive(item.path) ? 'active' : ''}"
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

	<main class="admin-main">
		<header class="admin-header">
			<div class="header-right">
				<div class="user-info">
					<span>{adminName}</span>
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
	}

	.sidebar-header {
		padding: 24px;
		border-bottom: 1px solid var(--border-color);
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
		padding: 20px 30px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 12px;
		color: var(--text-main);
		font-weight: 600;
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

	@media (max-width: 768px) {
		.admin-sidebar {
			width: 200px;
		}

		.admin-content {
			padding: 20px;
		}
	}
</style>
