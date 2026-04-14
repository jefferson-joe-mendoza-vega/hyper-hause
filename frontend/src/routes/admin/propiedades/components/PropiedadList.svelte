<script>
	let { propiedades = [], onDelete = () => {} } = $props();

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8787';

	async function deletePropiedadById(id) {
		if (!confirm('¿Estás seguro de que deseas eliminar esta propiedad?')) return;

		try {
			const token = localStorage.getItem('authToken');
			const headers = token ? { Authorization: `Bearer ${token}` } : {};

			const response = await fetch(`${BACKEND_URL}/api/admin/propiedades/${id}`, {
				method: 'DELETE',
				headers
			});

			if (!response.ok) {
				throw new Error('Error eliminando propiedad');
			}

			onDelete();
		} catch (err) {
			alert('Error: ' + err.message);
		}
	}
</script>

<div class="propiedades-list-container">
	{#if propiedades.length === 0}
		<div class="empty-state">
			<p>No hay propiedades registradas</p>
		</div>
	{:else}
		<!-- Vista tabla (desktop) -->
		<div class="table-wrapper">
			<table class="propiedades-table">
				<thead>
					<tr>
						<th>Imagen</th>
						<th>Título</th>
						<th>Tipo</th>
						<th>Dirección</th>
						<th>Precio</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{#each propiedades as propiedad (propiedad.id)}
						<tr>
							<td>
								<div class="prop-thumb">
									{#if propiedad.imagenes?.[0]?.url}
										<img src={propiedad.imagenes[0].url} alt={propiedad.titulo} />
									{:else}
										<div class="no-image">
											<i class="fas fa-image" />
										</div>
									{/if}
								</div>
							</td>
							<td class="font-bold">{propiedad.titulo}</td>
							<td>{propiedad.tipoInmueble}</td>
							<td class="truncate">{propiedad.direccion}</td>
							<td class="font-bold">{propiedad.precio}</td>
							<td>
								<div class="acciones">
									<button class="btn-edit" title="Editar">
										<i class="fas fa-edit" />
									</button>
									<button
										class="btn-delete"
										on:click={() => deletePropiedadById(propiedad.id)}
										title="Eliminar"
									>
										<i class="fas fa-trash" />
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Vista cards (mobile) -->
		<div class="propiedad-card-list">
			{#each propiedades as propiedad (propiedad.id)}
				<div class="propiedad-card">
					<div class="card-header">
						<div class="card-image">
							{#if propiedad.imagenes?.[0]?.url}
								<img src={propiedad.imagenes[0].url} alt={propiedad.titulo} />
							{:else}
								<i class="fas fa-image" />
							{/if}
						</div>
						<div class="card-title">
							<h3>{propiedad.titulo}</h3>
							<p class="card-type">{propiedad.tipoInmueble}</p>
						</div>
					</div>

					<div class="card-body">
						<div class="card-field">
							<span class="card-label">Dirección</span>
							<span class="card-value">{propiedad.direccion}</span>
						</div>
						<div class="card-field">
							<span class="card-label">Precio</span>
							<span class="card-price">S/ {propiedad.precio.toLocaleString()}</span>
						</div>
					</div>

					<div class="card-footer">
						<button class="btn-edit" title="Editar">
							<i class="fas fa-edit" />
							Editar
						</button>
						<button
							class="btn-delete"
							on:click={() => deletePropiedadById(propiedad.id)}
							title="Eliminar"
						>
							<i class="fas fa-trash" />
							Eliminar
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.propiedades-list-container {
		background-color: var(--white);
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
		overflow: hidden;
	}

	.empty-state {
		text-align: center;
		padding: 60px 20px;
		color: var(--text-gray);
	}

	.table-wrapper {
		overflow-x: auto;
	}

	.propiedades-table {
		width: 100%;
		border-collapse: collapse;
	}

	thead {
		background-color: var(--bg-gray-light);
		border-bottom: 2px solid var(--border-color);
	}

	th {
		padding: 16px;
		text-align: left;
		font-size: 12px;
		font-weight: 700;
		color: var(--text-gray);
		letter-spacing: 0.5px;
	}

	td {
		padding: 16px;
		border-bottom: 1px solid var(--border-color);
		font-size: 14px;
		color: var(--text-main);
	}

	tr:hover {
		background-color: var(--bg-gray-light);
	}

	.prop-thumb {
		width: 50px;
		height: 50px;
		border-radius: 8px;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--bg-gray-light);
	}

	.prop-thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.no-image {
		color: var(--text-light);
		font-size: 20px;
	}

	.font-bold {
		font-weight: 600;
	}

	.truncate {
		max-width: 150px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.acciones {
		display: flex;
		gap: 8px;
	}

	.btn-edit,
	.btn-delete {
		width: 36px;
		height: 36px;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: 0.2s;
		font-size: 16px;
	}

	.btn-edit {
		background-color: #dbeafe;
		color: #2563eb;
	}

	.btn-edit:hover {
		background-color: #bfdbfe;
	}

	.btn-delete {
		background-color: #fee2e2;
		color: #dc2626;
	}

	.btn-delete:hover {
		background-color: #fecaca;
	}

	/* Mobile - Card View */
	.propiedad-card-list {
		display: none;
		flex-direction: column;
		gap: 12px;
		padding: 12px;
	}

	.propiedad-card {
		background-color: var(--white);
		border: 1px solid var(--border-color);
		border-radius: 12px;
		padding: 12px;
		transition: 0.2s;
	}

	.propiedad-card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		border-color: var(--logo-green);
	}

	.card-header {
		display: flex;
		gap: 12px;
		margin-bottom: 12px;
	}

	.card-image {
		width: 80px;
		height: 80px;
		border-radius: 8px;
		overflow: hidden;
		flex-shrink: 0;
		background-color: var(--bg-gray-light);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.card-image i {
		font-size: 32px;
		color: var(--text-gray);
	}

	.card-title {
		flex: 1;
		overflow: hidden;
	}

	.card-title h3 {
		font-size: 15px;
		font-weight: 700;
		color: var(--text-main);
		margin: 0 0 4px 0;
		line-height: 1.2;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.card-type {
		font-size: 12px;
		color: var(--text-gray);
		margin: 0;
	}

	.card-body {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
		margin-bottom: 12px;
		font-size: 13px;
	}

	.card-field {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.card-label {
		color: var(--text-gray);
		font-weight: 600;
		font-size: 11px;
		letter-spacing: 0.5px;
	}

	.card-value {
		color: var(--text-main);
		font-weight: 500;
		font-size: 13px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.card-price {
		font-size: 16px;
		font-weight: 700;
		color: var(--logo-green);
	}

	.card-footer {
		display: none;
		gap: 8px;
		padding-top: 12px;
		border-top: 1px solid var(--border-color);
	}

	.card-footer .btn-edit,
	.card-footer .btn-delete {
		flex: 1;
		height: auto;
		width: auto;
		padding: 10px 12px;
		font-size: 13px;
		justify-content: center;
		gap: 6px;
	}

	/* Responsive Styles */
	@media (max-width: 1024px) {
		.propiedades-table {
			font-size: 13px;
		}

		th,
		td {
			padding: 12px;
		}

		.prop-thumb {
			width: 44px;
			height: 44px;
		}

		.btn-edit,
		.btn-delete {
			width: 32px;
			height: 32px;
			font-size: 14px;
		}

		.truncate {
			max-width: 120px;
		}
	}

	@media (max-width: 768px) {
		/* Hide table */
		.table-wrapper {
			display: none;
		}

		/* Show cards */
		.propiedad-card-list {
			display: flex;
			padding: 0;
			background-color: transparent;
			gap: 16px;
		}

		.propiedad-card {
			background-color: var(--white);
			margin: 12px;
			padding: 14px;
			border: 1px solid var(--border-color);
		}

		.card-footer {
			display: flex;
		}

		.propiedades-list-container {
			background-color: transparent;
			box-shadow: none;
			border-radius: 0;
		}

		.empty-state {
			padding: 40px 16px;
			background-color: var(--white);
			border-radius: 12px;
			margin: 12px;
		}
	}

	@media (max-width: 480px) {
		.propiedad-card-list {
			gap: 12px;
		}

		.propiedad-card {
			margin: 6px;
			padding: 12px;
		}

		.card-image {
			width: 70px;
			height: 70px;
		}

		.card-image i {
			font-size: 28px;
		}

		.card-title h3 {
			font-size: 14px;
			-webkit-line-clamp: 2;
		}

		.card-body {
			grid-template-columns: 1fr;
			gap: 6px;
		}

		.card-footer .btn-edit,
		.card-footer .btn-delete {
			padding: 8px 10px;
			font-size: 12px;
		}

		.card-footer {
			gap: 6px;
			padding-top: 10px;
		}
	}
</style>
