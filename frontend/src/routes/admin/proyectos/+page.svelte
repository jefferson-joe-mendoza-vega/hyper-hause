<script>
	import ProyectoList from './components/ProyectoList.svelte';
	import ProyectoForm from './components/ProyectoForm.svelte';

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8787';

	let proyectos = $state([]);
	let loading = $state(true);
	let error = $state(null);
	let showForm = $state(false);

	async function cargarProyectos() {
		try {
			loading = true;
			const token = localStorage.getItem('authToken');
			const headers = token ? { Authorization: `Bearer ${token}` } : {};

			const response = await fetch(`${BACKEND_URL}/api/admin/proyectos`, { headers });

			if (!response.ok) {
				throw new Error('Error cargando proyectos');
			}

			const data = await response.json();
			proyectos = data.data || [];
		} catch (err) {
			error = err.message;
			console.error('Error:', err);
		} finally {
			loading = false;
		}
	}

	// Cargar al montar
	import { onMount } from 'svelte';
	onMount(cargarProyectos);

	function handleFormSubmit() {
		showForm = false;
		cargarProyectos();
	}

	function handleProjectDeleted() {
		cargarProyectos();
	}
</script>

<div class="proyectos-admin">
	<div class="page-header">
		<h1 class="page-title">Gestionar Proyectos</h1>
		<button class="btn-primary" on:click={() => (showForm = !showForm)}>
			<i class="fas fa-plus" />
			Nuevo Proyecto
		</button>
	</div>

	{#if showForm}
		<ProyectoForm onSubmit={handleFormSubmit} />
	{/if}

	{#if loading}
		<div class="loading">
			<p>Cargando proyectos...</p>
		</div>
	{:else if error}
		<div class="error">
			<p>Error: {error}</p>
		</div>
	{:else}
		<ProyectoList {proyectos} onDelete={handleProjectDeleted} />
	{/if}
</div>

<style>
	.proyectos-admin {
		max-width: 1200px;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
	}

	.page-title {
		font-size: 28px;
		color: var(--text-main);
		font-weight: 700;
		letter-spacing: -0.5px;
	}

	.btn-primary {
		display: flex;
		align-items: center;
		gap: 8px;
		background-color: var(--logo-green);
		color: var(--white);
		border: none;
		padding: 10px 16px;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: 0.2s;
	}

	.btn-primary:hover {
		background-color: var(--accent-green-dark);
	}

	.loading,
	.error {
		text-align: center;
		padding: 40px 20px;
	}

	.error {
		background-color: #fee2e2;
		color: #dc2626;
		border-radius: 12px;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.proyectos-admin {
			max-width: 100%;
		}

		.page-title {
			font-size: 24px;
		}

		.btn-primary {
			padding: 9px 14px;
			font-size: 14px;
			gap: 6px;
		}
	}

	@media (max-width: 768px) {
		.page-header {
			flex-direction: column;
			gap: 16px;
			align-items: flex-start;
			margin-bottom: 20px;
		}

		.page-title {
			font-size: 20px;
			margin: 0;
		}

		.btn-primary {
			width: 100%;
			justify-content: center;
		}
	}
</style>
