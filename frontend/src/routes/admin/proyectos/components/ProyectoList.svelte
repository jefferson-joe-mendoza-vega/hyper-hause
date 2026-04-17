<script>
	let { proyectos = [], onDelete = () => {} } = $props();

	const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

	let editingId = $state(null);
	let deleteConfirmId = $state(null);
	let loading = $state(false);

	async function handleDelete(id) {
		if (!id) return;

		loading = true;
		try {
			const token = localStorage.getItem('authToken');
			const response = await fetch(`${BACKEND_URL}/api/admin/proyectos/${id}`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});

			if (!response.ok) {
				throw new Error('Error eliminando proyecto');
			}

			deleteConfirmId = null;
			onDelete();
		} catch (err) {
			console.error('Error:', err);
			alert('Error eliminando proyecto: ' + err.message);
		} finally {
			loading = false;
		}
	}

	function toggleActive(proyecto) {
		// Implementar actualización de estado
		console.log('Toggle active para:', proyecto.id);
	}

	function getMainImage(proyecto) {
		if (proyecto.imagenes && proyecto.imagenes.length > 0) {
			return proyecto.imagenes[0].thumb?.url || proyecto.imagenes[0].url;
		}
		return 'https://via.placeholder.com/400x300?text=Sin+imagen';
	}
</script>

<div class="proyectos-list">
	{#if proyectos.length === 0}
		<div class="no-data">
			<i class="fas fa-building"></i>
			<p>No hay proyectos registrados</p>
		</div>
	{:else}
		<div class="proyectos-grid">
			{#each proyectos as proyecto (proyecto.id)}
				<div class="proyecto-card">
					<!-- Imagen -->
					<div class="proyecto-image">
						<img src={getMainImage(proyecto)} alt={proyecto.nombre} />
						<div class="proyecto-badges">
							<span class="badge badge-operacion">{proyecto.tipoOperacion}</span>
							{#if proyecto.activo}
								<span class="badge badge-activo">
									<i class="fas fa-check-circle"></i>
									Activo
								</span>
							{:else}
								<span class="badge badge-inactivo">
									<i class="fas fa-times-circle"></i>
									Inactivo
								</span>
							{/if}
						</div>
					</div>

					<!-- Contenido -->
					<div class="proyecto-content">
						<h3 class="proyecto-nombre">{proyecto.nombre}</h3>

						<div class="proyecto-info">
							<div class="info-item">
								<i class="fas fa-tag"></i>
								<span>{proyecto.tipoInmueble}</span>
							</div>
							<div class="info-item">
								<i class="fas fa-map-marker-alt"></i>
								<span class="truncate">{proyecto.direccion}</span>
							</div>
						</div>

						<!-- Características -->
						<div class="proyecto-features">
							{#if proyecto.area}
								<div class="feature">
									<i class="fas fa-ruler"></i>
									<span>{proyecto.area} m²</span>
								</div>
							{/if}

							{#if proyecto.frontis}
								<div class="feature">
									<i class="fas fa-expand-alt"></i>
									<span>{proyecto.frontis}m front</span>
								</div>
							{/if}

							{#if proyecto.fondo}
								<div class="feature">
									<i class="fas fa-expand-alt"></i>
									<span>{proyecto.fondo}m fondo</span>
								</div>
							{/if}

							{#if proyecto.perimetro}
								<div class="feature">
									<i class="fas fa-border-all"></i>
									<span>{proyecto.perimetro}m perímetro</span>
								</div>
							{/if}
						</div>

						<!-- Precio -->
						{#if proyecto.precio || proyecto.precioDolares}
							<div class="proyecto-price">
								{#if proyecto.precio}
									<span class="price-item">S/. {proyecto.precio.toLocaleString()}</span>
								{/if}
								{#if proyecto.precioDolares}
									<span class="price-item">$ {proyecto.precioDolares.toLocaleString()}</span>
								{/if}
							</div>
						{/if}

						<!-- Amenidades -->
						{#if proyecto.amenidades && proyecto.amenidades.length > 0}
							<div class="amenidades">
								{#each proyecto.amenidades.slice(0, 3) as amenidad}
									<span class="amenidad-tag">{amenidad}</span>
								{/each}
								{#if proyecto.amenidades.length > 3}
									<span class="amenidad-tag">+{proyecto.amenidades.length - 3}</span>
								{/if}
							</div>
						{/if}

						<!-- Imágenes info -->
						{#if proyecto.imagenes}
							<div class="imagenes-count">
								<i class="fas fa-image"></i>
								{proyecto.imagenes.length} imagen{proyecto.imagenes.length !== 1 ? 'es' : ''}
							</div>
						{/if}
					</div>

					<!-- Acciones -->
					<div class="proyecto-actions">
						<button class="btn-action btn-edit" title="Editar proyecto">
							<i class="fas fa-edit"></i>
							Editar
						</button>

						<button
							class="btn-action btn-delete"
							onclick={() => (deleteConfirmId = proyecto.id)}
							title="Eliminar proyecto"
						>
							<i class="fas fa-trash"></i>
							Eliminar
						</button>

						<button
							class="btn-action btn-toggle"
							onclick={() => toggleActive(proyecto)}
							title={proyecto.activo ? 'Desactivar' : 'Activar'}
						>
							<i class={proyecto.activo ? 'fas fa-toggle-on' : 'fas fa-toggle-off'}></i>
							{proyecto.activo ? 'Activo' : 'Inactivo'}
						</button>
					</div>
				</div>

				<!-- Confirmación de eliminación -->
				{#if deleteConfirmId === proyecto.id}
					<div class="delete-confirm">
						<button
							class="confirm-overlay"
							type="button"
							onclick={() => (deleteConfirmId = null)}
							aria-label="Cerrar confirmación"
						></button>
						<div class="confirm-box">
							<h3>¿Eliminar proyecto?</h3>
							<p>Se eliminará <strong>{proyecto.nombre}</strong> y todos sus datos asociados.</p>
							<div class="confirm-actions">
								<button
									class="btn-confirm btn-cancel"
									onclick={() => (deleteConfirmId = null)}
									disabled={loading}
								>
									Cancelar
								</button>
								<button
									class="btn-confirm btn-ok"
									onclick={() => handleDelete(proyecto.id)}
									disabled={loading}
								>
									{#if loading}
										<i class="fas fa-spinner fa-spin"></i>
										Eliminando...
									{:else}
										Eliminar
									{/if}
								</button>
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.proyectos-list {
		width: 100%;
	}

	.no-data {
		text-align: center;
		padding: 60px 20px;
		color: #6b7280;
	}

	.no-data i {
		font-size: 48px;
		margin-bottom: 16px;
		display: block;
		opacity: 0.5;
		margin-bottom: 16px;
	}

	.proyectos-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 24px;
		position: relative;
	}

	.proyecto-card {
		background: var(--white);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition: all 0.3s;
		display: flex;
		flex-direction: column;
	}

	.proyecto-card:hover {
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
		transform: translateY(-4px);
	}

	.proyecto-image {
		position: relative;
		width: 100%;
		padding-bottom: 66.67%;
		overflow: hidden;
		background: #f3f4f6;
	}

	.proyecto-image img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s;
	}

	.proyecto-card:hover .proyecto-image img {
		transform: scale(1.05);
	}

	.proyecto-badges {
		position: absolute;
		top: 12px;
		left: 12px;
		right: 12px;
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 6px 12px;
		border-radius: 20px;
		font-size: 12px;
		font-weight: 600;
		backdrop-filter: blur(4px);
	}

	.badge-operacion {
		background: rgba(59, 130, 246, 0.9);
		color: white;
	}

	.badge-activo {
		background: rgba(34, 197, 94, 0.9);
		color: white;
	}

	.badge-inactivo {
		background: rgba(107, 114, 128, 0.9);
		color: white;
	}

	.proyecto-content {
		padding: 16px;
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.proyecto-nombre {
		font-size: 18px;
		font-weight: 700;
		color: var(--text-main);
		margin: 0;
		line-height: 1.2;
	}

	.proyecto-info {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.info-item {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		color: #6b7280;
	}

	.info-item i {
		color: var(--logo-green);
		width: 16px;
		text-align: center;
	}

	.truncate {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.proyecto-features {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 8px;
		padding: 12px 0;
		border-top: 1px solid #e5e7eb;
		border-bottom: 1px solid #e5e7eb;
	}

	.feature {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		color: #374151;
	}

	.feature i {
		color: var(--logo-green);
		width: 14px;
		text-align: center;
	}

	.proyecto-price {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}

	.price-item {
		font-size: 14px;
		font-weight: 600;
		color: var(--logo-green);
		padding: 4px 8px;
		background: #f0fdf4;
		border-radius: 4px;
	}

	.amenidades {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}

	.amenidad-tag {
		font-size: 12px;
		padding: 4px 8px;
		background: #f3f4f6;
		color: #4b5563;
		border-radius: 4px;
		font-weight: 500;
	}

	.imagenes-count {
		font-size: 12px;
		color: #6b7280;
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.imagenes-count i {
		color: var(--logo-green);
	}

	.proyecto-actions {
		display: flex;
		gap: 8px;
		padding: 12px;
		border-top: 1px solid #e5e7eb;
		background: #fafbfc;
	}

	.btn-action {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 8px 12px;
		border: 1px solid #d1d5db;
		background: var(--white);
		border-radius: 6px;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.btn-action:hover {
		transform: translateY(-2px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.btn-edit {
		color: #3b82f6;
		border-color: #93c5fd;
	}

	.btn-edit:hover {
		background: #eff6ff;
	}

	.btn-delete {
		color: #ef4444;
		border-color: #fca5a5;
	}

	.btn-delete:hover {
		background: #fef2f2;
	}

	.btn-toggle {
		color: var(--logo-green);
		border-color: #86efac;
	}

	.btn-toggle:hover {
		background: #f0fdf4;
	}

	/* Delete Confirmation Modal */
	.delete-confirm {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.confirm-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}

	.confirm-box {
		position: relative;
		background: var(--white);
		border-radius: 12px;
		padding: 24px;
		max-width: 400px;
		z-index: 1001;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
	}

	.confirm-box h3 {
		margin: 0 0 12px 0;
		font-size: 18px;
		color: var(--text-main);
	}

	.confirm-box p {
		margin: 0 0 20px 0;
		font-size: 14px;
		color: #6b7280;
		line-height: 1.5;
	}

	.confirm-actions {
		display: flex;
		gap: 12px;
	}

	.btn-confirm {
		flex: 1;
		padding: 10px 16px;
		border: none;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
	}

	.btn-cancel {
		background: #e5e7eb;
		color: var(--text-main);
	}

	.btn-cancel:hover:not(:disabled) {
		background: #d1d5db;
	}

	.btn-ok {
		background: #ef4444;
		color: white;
	}

	.btn-ok:hover:not(:disabled) {
		background: #dc2626;
	}

	.btn-confirm:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	@media (max-width: 768px) {
		.proyectos-grid {
			grid-template-columns: 1fr;
		}

		.proyecto-actions {
			flex-wrap: wrap;
		}

		.btn-action {
			flex: 1 1 calc(50% - 4px);
		}

		.confirm-box {
			margin: 20px;
		}
	}
</style>
