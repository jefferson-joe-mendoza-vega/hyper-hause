<script>
	let { onSubmit = () => {} } = $props();

	let formData = $state({
		titulo: '',
		tipoInmueble: 'Departamento',
		tipoOperacion: 'Comprar',
		direccion: '',
		precio: '',
		precioDolares: '',
		dormitorios: 0,
		banos: 0,
		estacionamientos: 0,
		area: '',
		descripcion: '',
		amenidades: [],
		mapaUrl: '',
		recomendado: false,
		recomendadoColor: '#f97316',
		recomendadoEtiqueta: '',
		imagenes: [],
		activo: true
	});

	let imagenesSubidas = $state([]);
	let loading = $state(false);
	let uploadingImage = $state(false);
	let error = $state(null);

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8787';
	
	const amenidadesOpciones = ['asensor', 'gm', 'piscina', 'gym', 'parque', 'seguridad 24h', 'terraza'];

	function toggleAmenidad(amenidad) {
		if (formData.amenidades.includes(amenidad)) {
			formData.amenidades = formData.amenidades.filter(a => a !== amenidad);
		} else {
			formData.amenidades = [...formData.amenidades, amenidad];
		}
	}

	async function uploadToImgbb(file) {
		uploadingImage = true;
		try {
			const formDataImg = new FormData();
			formDataImg.append('image', file);

			const response = await fetch(`${BACKEND_URL}/api/upload/image`, {
				method: 'POST',
				body: formDataImg
			});

			if (!response.ok) {
				const errData = await response.json();
				throw new Error(errData.error || 'Error subiendo imagen');
			}

			const data = await response.json();

			if (!data.success) {
				throw new Error(data.error || 'Error en respuesta del servidor');
			}

			const imagenData = data.data;
			imagenesSubidas.push(imagenData);
			formData.imagenes = imagenesSubidas;

			return imagenData;
		} catch (err) {
			error = `Error al subir imagen: ${err.message}`;
			throw err;
		} finally {
			uploadingImage = false;
		}
	}

	function removeImagen(index) {
		imagenesSubidas.splice(index, 1);
		formData.imagenes = imagenesSubidas;
	}

	function handleFileSelect(event) {
		const files = event.target.files;
		if (!files) return;

		// Subir todas las imágenes
		for (const file of files) {
			uploadToImgbb(file).catch(() => {
				// Error ya manejado en uploadToImgbb
			});
		}
	}

	async function handleSubmit() {
		loading = true;
		error = null;

		try {
			if (imagenesSubidas.length === 0) {
				throw new Error('Debes subir al menos una imagen');
			}

			const token = localStorage.getItem('authToken');
			const headers = token ? { Authorization: `Bearer ${token}` } : {};

			const bodyData = new FormData();
			bodyData.append('titulo', formData.titulo);
			bodyData.append('tipoInmueble', formData.tipoInmueble);
			bodyData.append('tipoOperacion', formData.tipoOperacion);
			bodyData.append('direccion', formData.direccion);
			bodyData.append('precio', parseInt(formData.precio) || 0);
			if (formData.precioDolares.trim()) {
				bodyData.append('precioDolares', parseInt(formData.precioDolares) || 0);
			}
			bodyData.append('dormitorios', formData.dormitorios);
			bodyData.append('banos', formData.banos);
			bodyData.append('estacionamientos', formData.estacionamientos);
			bodyData.append('area', formData.area ? parseInt(formData.area) : 0);
			bodyData.append('descripcion', formData.descripcion);
			bodyData.append('amenidades', JSON.stringify(formData.amenidades));
			bodyData.append('mapaUrl', formData.mapaUrl);
			bodyData.append('recomendado', formData.recomendado);
			
			if (formData.recomendado) {
				bodyData.append('recomendadoColor', formData.recomendadoColor);
				bodyData.append('recomendadoEtiqueta', formData.recomendadoEtiqueta);
			}
			
			bodyData.append('activo', formData.activo);
			bodyData.append('imagenes', JSON.stringify(imagenesSubidas));

			const response = await fetch(`${BACKEND_URL}/api/propiedades`, {
				method: 'POST',
				headers,
				body: bodyData
			});

			if (!response.ok) {
				const errData = await response.json();
				throw new Error(errData.error || 'Error crear propiedad');
			}

			// Reset form
			formData = {
				titulo: '',
				tipoInmueble: 'Departamento',
				tipoOperacion: 'Comprar',
				direccion: '',
				precio: '',
				precioDolares: '',
				dormitorios: 0,
				banos: 0,
				estacionamientos: 0,
				area: '',
				descripcion: '',
				amenidades: [],
				mapaUrl: '',
				recomendado: false,
				recomendadoColor: '#f97316',
				recomendadoEtiqueta: '',
				imagenes: [],
				activo: true
			};

			imagenesSubidas = [];
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

	<!-- Sección básica -->
	<div class="form-section">
		<h3 class="section-title">Información Básica</h3>
		<div class="form-grid">
			<div class="form-group full-width">
				<label>Título</label>
				<input
					type="text"
					bind:value={formData.titulo}
					required
					placeholder="Ej: Casa vertical en Miraflores"
				/>
			</div>

			<div class="form-group">
				<label>Tipo de Inmueble</label>
				<select bind:value={formData.tipoInmueble}>
					<option>Departamento</option>
					<option>Casa</option>
					<option>Condominio de casas</option>
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
		</div>
	</div>

	<!-- Sección ubicación y descripción -->
	<div class="form-section">
		<h3 class="section-title">Ubicación y Descripción</h3>
		<div class="form-grid">
			<div class="form-group full-width">
				<label>Dirección</label>
				<input type="text" bind:value={formData.direccion} placeholder="Calle Italia 260, Miraflores, Lima" />
			</div>

			<div class="form-group full-width">
				<label>Descripción</label>
				<textarea
					bind:value={formData.descripcion}
					placeholder="Descripción detallada de la propiedad..."
					rows="4"
				></textarea>
			</div>

			<div class="form-group full-width">
				<label>URL del Mapa (Google Maps embed)</label>
				<input type="text" bind:value={formData.mapaUrl} placeholder="https://www.google.com/maps/embed?pb=..." />
			</div>
		</div>
	</div>

	<!-- Sección características -->
	<div class="form-section">
		<h3 class="section-title">Características</h3>
		<div class="form-grid">
			<div class="form-group">
				<label>Precio (S/.)</label>
				<input type="number" bind:value={formData.precio} placeholder="187320" required />
			</div>

			<div class="form-group">
				<label>Precio (USD) <span class="optional">Optional</span></label>
				<input type="number" bind:value={formData.precioDolares} placeholder="50000" />
			</div>

			<div class="form-group">
				<label>Dormitorios</label>
				<input type="number" bind:value={formData.dormitorios} min="0" />
			</div>

			<div class="form-group">
				<label>Baños</label>
				<input type="number" bind:value={formData.banos} min="0" />
			</div>

			<div class="form-group">
				<label>Estacionamientos</label>
				<input type="number" bind:value={formData.estacionamientos} min="0" />
			</div>

			<div class="form-group">
				<label>Área (m²)</label>
				<input type="number" bind:value={formData.area} placeholder="500" />
			</div>
		</div>
	</div>

	<!-- Sección amenidades -->
	<div class="form-section">
		<h3 class="section-title">Amenidades</h3>
		<div class="amenidades-grid">
			{#each amenidadesOpciones as amenidad}
				<label class="amenidad-checkbox">
					<input
						type="checkbox"
						checked={formData.amenidades.includes(amenidad)}
						on:change={() => toggleAmenidad(amenidad)}
					/>
					<span>{amenidad}</span>
				</label>
			{/each}
		</div>
	</div>

	<!-- Sección recomendado -->
	<div class="form-section">
		<h3 class="section-title">Destacado</h3>
		<div class="form-grid">
			<div class="form-group checkbox">
				<label>
					<input type="checkbox" bind:checked={formData.recomendado} />
					<span>Marcar como recomendado</span>
				</label>
			</div>

			{#if formData.recomendado}
				<div class="form-group">
					<label>Color del badge</label>
					<input type="color" bind:value={formData.recomendadoColor} />
				</div>

				<div class="form-group">
					<label>Etiqueta</label>
					<input
						type="text"
						bind:value={formData.recomendadoEtiqueta}
						placeholder="Ej: Última unidad"
					/>
				</div>
			{/if}
		</div>
	</div>

	<!-- Sección imágenes -->
	<div class="form-section">
		<h3 class="section-title">Imágenes</h3>
		<div class="form-grid">
			<div class="form-group full-width">
				<label>Selecciona imágenes para subir</label>
				<div class="upload-area">
					<input
						type="file"
						multiple
						accept="image/*"
						on:change={handleFileSelect}
						disabled={uploadingImage || loading}
						class="file-input"
					/>
					<div class="upload-hint">
						{#if uploadingImage}
							<p>Subiendo imagen...</p>
						{:else}
							<p>Haz clic para seleccionar imágenes o arrastra aquí</p>
						{/if}
					</div>
				</div>
			</div>

			{#if imagenesSubidas.length > 0}
				<div class="form-group full-width">
					<label>Imágenes subidas ({imagenesSubidas.length})</label>
					<div class="imagenes-gallery">
						{#each imagenesSubidas as imagen, idx}
							<div class="imagen-card">
								<img src={imagen.thumbUrl} alt={imagen.etiqueta} />
								<div class="imagen-info">
									<input
										type="text"
										bind:value={imagen.etiqueta}
										placeholder="Etiqueta"
										class="etiqueta-input"
									/>
									<button
										type="button"
										on:click={() => removeImagen(idx)}
										class="btn-remove"
										title="Eliminar imagen"
									>
										✕
									</button>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Sección estado -->
	<div class="form-section">
		<h3 class="section-title">Estado</h3>
		<div class="form-grid">
			<div class="form-group checkbox">
				<label>
					<input type="checkbox" bind:checked={formData.activo} />
					<span>Activo</span>
				</label>
			</div>
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
		font-size: 24px;
		color: var(--text-main);
		font-weight: 700;
		margin-bottom: 30px;
	}

	.form-section {
		margin-bottom: 30px;
		padding-bottom: 30px;
		border-bottom: 1px solid var(--border-color);
	}

	.form-section:last-of-type {
		border-bottom: none;
	}

	.section-title {
		font-size: 16px;
		font-weight: 600;
		color: var(--text-main);
		margin-bottom: 16px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		opacity: 0.8;
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
		margin-bottom: 0;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.form-group.full-width {
		grid-column: 1 / -1;
	}

	.form-group.checkbox {
		flex-direction: row;
		align-items: center;
	}

	.form-group.checkbox label {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 0;
	}

	.form-group label {
		font-size: 14px;
		font-weight: 600;
		color: var(--text-main);
	}

	.form-group label .optional {
		font-size: 11px;
		font-weight: 400;
		color: var(--text-secondary);
		margin-left: 4px;
	}

	.form-group input,
	.form-group select,
	.form-group textarea {
		padding: 10px 12px;
		border: 1px solid var(--border-color);
		border-radius: 8px;
		font-size: 14px;
		color: var(--text-main);
		font-family: inherit;
		transition: 0.2s;
	}

	.form-group textarea {
		resize: vertical;
		min-height: 80px;
	}

	.form-group input[type="color"] {
		height: 40px;
		cursor: pointer;
		padding: 4px;
	}

	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--logo-green);
		box-shadow: 0 0 0 3px rgba(0, 208, 132, 0.1);
	}

	.form-group small {
		font-size: 12px;
		color: var(--text-secondary);
		margin-top: 4px;
	}

	.amenidades-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 12px;
	}

	.amenidad-checkbox {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 12px;
		border: 1px solid var(--border-color);
		border-radius: 8px;
		cursor: pointer;
		transition: 0.2s;
	}

	.amenidad-checkbox:hover {
		border-color: var(--logo-green);
		background-color: rgba(0, 208, 132, 0.05);
	}

	.amenidad-checkbox input[type="checkbox"] {
		cursor: pointer;
		margin: 0;
	}

	.amenidad-checkbox span {
		font-size: 14px;
		color: var(--text-main);
		text-transform: capitalize;
	}

	.upload-area {
		position: relative;
		border: 2px dashed var(--border-color);
		border-radius: 8px;
		padding: 40px 20px;
		text-align: center;
		cursor: pointer;
		transition: 0.2s;
		background-color: rgba(0, 208, 132, 0.02);
	}

	.upload-area:hover {
		border-color: var(--logo-green);
		background-color: rgba(0, 208, 132, 0.05);
	}

	.file-input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}

	.file-input:disabled {
		cursor: not-allowed;
	}

	.upload-hint {
		pointer-events: none;
		color: var(--text-secondary);
	}

	.upload-hint p {
		margin: 0;
		font-size: 14px;
	}

	.imagenes-gallery {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 12px;
		margin-top: 12px;
	}

	.imagen-card {
		position: relative;
		border: 1px solid var(--border-color);
		border-radius: 8px;
		overflow: hidden;
		background-color: var(--white);
	}

	.imagen-card img {
		display: block;
		width: 100%;
		height: 100px;
		object-fit: cover;
	}

	.imagen-info {
		padding: 8px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.etiqueta-input {
		padding: 4px 6px;
		font-size: 12px;
		border: 1px solid var(--border-color);
		border-radius: 4px;
		color: var(--text-main);
	}

	.btn-remove {
		background-color: #ef4444;
		color: var(--white);
		border: none;
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 12px;
		cursor: pointer;
		transition: 0.2s;
	}

	.btn-remove:hover {
		background-color: #dc2626;
	}

	.form-actions {
		display: flex;
		gap: 12px;
		justify-content: flex-end;
		margin-top: 30px;
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
