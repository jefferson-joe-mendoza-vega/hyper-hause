<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let activeNav = $derived($page.url.pathname === '/' ? 'home' : $page.url.pathname.split('/')[1]);

	const navItems = [
		{ id: 'home',      label: 'Inicio',    icon: 'fas fa-home',      path: '/' },
		{ id: 'buscar',    label: 'Buscar',    icon: 'fas fa-search',    path: '/buscar' },
		{ id: 'servicios', label: 'Servicios', icon: 'fas fa-plus',      isCenter: true, path: '/servicios' },
		{ id: 'servicios', label: 'Servicios', icon: 'fas fa-briefcase', path: '/servicios' },
		{ id: 'profile',   label: 'Perfil',    icon: 'fas fa-user',      path: '#' }
	];

	function handleNav(item) {
		if (item.path !== '#') {
			goto(item.path);
		}
	}
</script>

<nav class="bottom-nav">
	{#each navItems as item}
		{#if item.isCenter}
			<div class="nav-fab-wrap">
				<div
					class="nav-fab"
					on:click={() => handleNav(item)}
					on:keydown={(e) => e.key === 'Enter' && handleNav(item)}
					role="button"
					tabindex="0"
					title={item.label}
				>
					<i class={item.icon} />
				</div>
			</div>
		{:else}
			<div
				class="nav-item {activeNav === item.id ? 'active' : ''}"
				on:click={() => handleNav(item)}
				on:keydown={(e) => e.key === 'Enter' && handleNav(item)}
				role="button"
				tabindex="0"
				title={item.label}
			>
				<i class={item.icon} />
				<span>{item.label}</span>
			</div>
		{/if}
	{/each}
</nav>

<style>
	.bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		background: var(--white);
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 8px 10px 16px;
		border-top: 1px solid var(--bg-gray-light);
		z-index: 100;
	}

	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		color: #94a3b8;
		font-size: 10px;
		font-weight: 500;
		cursor: pointer;
		width: 60px;
		transition: 0.2s;
	}

	.nav-item.active {
		color: var(--text-blue);
	}

	.nav-item i {
		font-size: 20px;
	}

	.nav-fab-wrap {
		position: relative;
		top: -24px;
	}

	.nav-fab {
		width: 56px;
		height: 56px;
		background: var(--logo-green);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--white);
		font-size: 20px;
		box-shadow: 0 8px 20px rgba(0, 208, 132, 0.35);
		cursor: pointer;
		transition: 0.2s;
	}


	.nav-fab:hover {
		transform: scale(1.05);
	}

	/* Responsive */
	@media (min-width: 1024px) {
		.bottom-nav {
			display: none;
		}
	}
</style>
