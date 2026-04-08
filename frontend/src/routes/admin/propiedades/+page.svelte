<script>
	import PropiedadList from './components/PropiedadList.svelte';
	import PropiedadForm from './components/PropiedadForm.svelte';

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8787';

	let propiedades = $state([]);
	let loading = $state(true);
	let error = $state(null);
	let showForm = $state(false);

	async function cargarPropiedades() {
		try {
			loading = true;
			const token = localStorage.getItem('authToken');
			const headers = token ? { Authorization: `Bearer ${token}` } : {};

			const response = await fetch(`${BACKEND_URL}/api/admin/propiedades`, { headers });

			if (!response.ok) {
				throw new Error('Error cargando propiedades');
			}

			const data = await response.json();
			propiedades = data.data || [];
		} catch (err) {
			error = err.message;
			console.error('Error:', err);
		} finally {
			loading = false;
		}
	}

	// Cargar al montar
	import { onMount } from 'svelte';
	onMount(cargarPropiedades);

	function handleFormSubmit() {
		showForm = false;
		cargarPropiedades();
	}

	function handlePropertyDeleted() {
		cargarPropiedades();
	}
</script>

<div class="propiedades-admin">
	<div class="page-header">
		<h1 class="page-title">Gestionar Propiedades</h1>
		<button class="btn-primary" on:click={() => (showForm = !showForm)}>
			<i class="fas fa-plus" />
			Nueva Propiedad
		</button>
	</div>

	{#if showForm}
		<PropiedadForm onSubmit={handleFormSubmit} />
	{/if}

	{#if loading}
		<div class="loading">
			<p>Cargando propiedades...</p>
		</div>
	{:else if error}
		<div class="error">
			<p>Error: {error}</p>
		</div>
	{:else}
		<PropiedadList {propiedades} onDelete={handlePropertyDeleted} />
	{/if}
</div>

<style>
	.propiedades-admin {
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
</style>
