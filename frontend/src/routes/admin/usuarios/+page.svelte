<script>
	import { onMount } from 'svelte';

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8787';

	let usuarios = [];
	let loading = true;

	onMount(async () => {
		try {
			const token = localStorage.getItem('authToken');
			const headers = token ? { Authorization: `Bearer ${token}` } : {};

			// Por ahora mostramos un placeholder
			loading = false;
		} catch (err) {
			console.error(err);
			loading = false;
		}
	});
</script>

<div class="usuarios-admin">
	<h1 class="page-title">Gestionar Usuarios</h1>

	{#if loading}
		<div class="loading">
			<p>Cargando usuarios...</p>
		</div>
	{:else}
		<div class="empty-state">
			<p>Panel de usuarios en desarrollo</p>
		</div>
	{/if}
</div>

<style>
	.usuarios-admin {
		max-width: 1200px;
	}

	.page-title {
		font-size: 28px;
		color: var(--text-main);
		font-weight: 700;
		margin-bottom: 30px;
		letter-spacing: -0.5px;
	}

	.loading,
	.empty-state {
		background-color: var(--white);
		border-radius: 12px;
		padding: 60px 20px;
		text-align: center;
		color: var(--text-gray);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
	}
</style>
