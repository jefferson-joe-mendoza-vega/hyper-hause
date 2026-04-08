<script>
	let { onSubmit = () => {} } = $props();

	let formData = $state({
		nombre: '',
		tipoInmueble: 'Departamento',
		tipoOperacion: 'Alquilar',
		ubicacion: '',
		precio: '',
		bedrooms: 0,
		bathrooms: 0,
		parking: 0
	});

	let loading = $state(false);
	let error = $state(null);

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8787';

	async function handleSubmit() {
		loading = true;
		error = null;

		try {
			const token = localStorage.getItem('authToken');
			const headers = token ? { Authorization: `Bearer ${token}` } : {};

			const bodyData = new FormData();
			bodyData.append('nombre', formData.nombre);
			bodyData.append('tipoInmueble', formData.tipoInmueble);
			bodyData.append('tipoOperacion', formData.tipoOperacion);
			bodyData.append('ubicacion', formData.ubicacion);
			bodyData.append('precio', formData.precio);
			bodyData.append('bedrooms', formData.bedrooms);
			bodyData.append('bathrooms', formData.bathrooms);
			bodyData.append('parking', formData.parking);

			const response = await fetch(`${BACKEND_URL}/api/propiedades`, {
				method: 'POST',
				headers, // No agregamos Content-Type, fetch lo genera automáticamente con el boundary para FormData
				body: bodyData
			});

			if (!response.ok) {
				throw new Error('Error crear propiedad');
			}

			// Reset form
			formData = {
				nombre: '',
				tipoInmueble: 'Departamento',
				tipoOperacion: 'Alquilar',
				ubicacion: '',
				precio: '',
				bedrooms: 0,
				bathrooms: 0,
				parking: 0
			};

			onSubmit();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="form-container">
	<h2 class="form-title">Nueva Propiedad</h2>

	{#if error}
		<div class="alert-error">{error}</div>
	{/if}

	<div class="form-grid">
		<div class="form-group">
			<label>Nombre</label>
			<input
				type="text"
				bind:value={formData.nombre}
				required
				placeholder="Ej: Casa en Miraflores"
			/>
		</div>

		<div class="form-group">
			<label>Tipo de Inmueble</label>
			<select bind:value={formData.tipoInmueble}>
				<option>Departamento</option>
				<option>Casa</option>
				<option>Terreno</option>
				<option>Comercio</option>
			</select>
		</div>

		<div class="form-group">
			<label>Tipo de Operación</label>
			<select bind:value={formData.tipoOperacion}>
				<option>Alquilar</option>
				<option>Comprar</option>
				<option>Proyecto</option>
			</select>
		</div>

		<div class="form-group">
			<label>Ubicación</label>
			<input type="text" bind:value={formData.ubicacion} placeholder="Dirección" />
		</div>

		<div class="form-group">
			<label>Precio</label>
			<input type="text" bind:value={formData.precio} placeholder="S/ 500,000" />
		</div>

		<div class="form-group">
			<label>Dormitorios</label>
			<input type="number" bind:value={formData.bedrooms} min="0" />
		</div>

		<div class="form-group">
			<label>Baños</label>
			<input type="number" bind:value={formData.bathrooms} min="0" />
		</div>

		<div class="form-group">
			<label>Parking</label>
			<input type="number" bind:value={formData.parking} min="0" />
		</div>
	</div>

	<div class="form-actions">
		<button type="submit" class="btn-submit" disabled={loading}>
			{loading ? 'Creando...' : 'Crear Propiedad'}
		</button>
	</div>
</form>

<style>
	.form-container {
		background-color: var(--white);
		border-radius: 12px;
		padding: 30px;
		margin-bottom: 30px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
	}

	.form-title {
		font-size: 20px;
		color: var(--text-main);
		font-weight: 700;
		margin-bottom: 20px;
	}

	.alert-error {
		background-color: #fee2e2;
		color: #dc2626;
		padding: 12px 16px;
		border-radius: 8px;
		margin-bottom: 20px;
		font-size: 14px;
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 16px;
		margin-bottom: 20px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.form-group label {
		font-size: 14px;
		font-weight: 600;
		color: var(--text-main);
	}

	.form-group input,
	.form-group select {
		padding: 10px 12px;
		border: 1px solid var(--border-color);
		border-radius: 8px;
		font-size: 14px;
		color: var(--text-main);
		transition: 0.2s;
	}

	.form-group input:focus,
	.form-group select:focus {
		outline: none;
		border-color: var(--logo-green);
		box-shadow: 0 0 0 3px rgba(0, 208, 132, 0.1);
	}

	.form-actions {
		display: flex;
		gap: 12px;
		justify-content: flex-end;
	}

	.btn-submit {
		background-color: var(--logo-green);
		color: var(--white);
		border: none;
		padding: 12px 24px;
		border-radius: 8px;
		font-weight: 600;
		font-size: 14px;
		cursor: pointer;
		transition: 0.2s;
	}

	.btn-submit:hover:not(:disabled) {
		background-color: var(--accent-green-dark);
	}

	.btn-submit:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
