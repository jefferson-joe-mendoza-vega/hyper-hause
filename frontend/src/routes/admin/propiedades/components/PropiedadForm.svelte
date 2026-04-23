<script>
	let { onSubmit = () => {}, onCancel = () => {}, propiedad = null } = $props();

	const AUTH_TOKEN_KEY = 'auth_token';
	const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';
	const amenidadesOpciones = ['asensor', 'gm', 'piscina', 'gym', 'parque', 'seguridad 24h', 'terraza'];

	function getInitialFormData() {
		if (propiedad) {
			return {
				titulo: propiedad.titulo || '',
				tipoInmueble: propiedad.tipoInmueble || 'Departamento',
				tipoOperacion: propiedad.tipoOperacion || 'Comprar',
				direccion: propiedad.direccion || '',
				precio: propiedad.precio || '',
				precioDolares: propiedad.precioDolares || '',
				dormitorios: propiedad.dormitorios || 0,
				banos: propiedad.banos || 0,
				estacionamientos: propiedad.estacionamientos || 0,
				area: propiedad.area || '',
				descripcion: propiedad.descripcion || '',
				amenidades: propiedad.amenidades || [],
				mapaUrl: propiedad.mapaUrl || '',
				recomendado: propiedad.recomendado || false,
				recomendadoColor: propiedad.recomendadoColor || '#f97316',
				recomendadoEtiqueta: propiedad.recomendadoEtiqueta || '',
				imagenes: propiedad.imagenes || [],
				activo: propiedad.activo !== false
			};
		}
		return {
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
	}

	let formData = $state(getInitialFormData());
	let imagenesSubidas = $state(propiedad?.imagenes || []);
	let loading = $state(false);
	let uploadingImage = $state(false);
	let error = $state(null);

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

			const token = localStorage.getItem(AUTH_TOKEN_KEY);
			const headers = token ? { Authorization: `Bearer ${token}` } : {};

			// Función auxiliar para convertir a número de forma segura
			const parseNum = (val) => {
				const num = parseInt(val);
				return isNaN(num) ? 0 : num;
			};

			// Preparar datos en JSON (no FormData)
			const jsonData = {
				titulo: String(formData.titulo).trim(),
				tipoInmueble: String(formData.tipoInmueble).trim(),
				tipoOperacion: String(formData.tipoOperacion).trim(),
				direccion: String(formData.direccion).trim(),
				precio: parseNum(formData.precio),
				dormitorios: parseNum(formData.dormitorios),
				banos: parseNum(formData.banos),
				estacionamientos: parseNum(formData.estacionamientos),
				area: parseNum(formData.area),
				descripcion: String(formData.descripcion).trim(),
				amenidades: formData.amenidades,
				mapaUrl: String(formData.mapaUrl).trim(),
				recomendado: Boolean(formData.recomendado),
				activo: Boolean(formData.activo),
				imagenes: imagenesSubidas
			};

			if (formData.precioDolares && String(formData.precioDolares).trim()) {
				jsonData.precioDolares = parseNum(formData.precioDolares);
			}

			if (formData.recomendado) {
				jsonData.recomendadoColor = String(formData.recomendadoColor).trim();
				jsonData.recomendadoEtiqueta = String(formData.recomendadoEtiqueta).trim();
			}

			// Determine if create or update
			const method = propiedad ? 'PUT' : 'POST';
			const url = propiedad 
				? `${BACKEND_URL}/api/admin/propiedades/${propiedad.id}`
				: `${BACKEND_URL}/api/propiedades`;

			const response = await fetch(url, {
				method,
				headers: {
					...headers,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(jsonData)
			});

			if (!response.ok) {
				const errData = await response.json();
				throw new Error(errData.error || `Error ${propiedad ? 'actualizando' : 'creando'} propiedad`);
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

<form onsubmit={(e) => { e.preventDefault(); handleSubmit(e); }} class="form-container">
	<div class="form-header">
		<h2 class="form-title">{propiedad ? 'Editar Propiedad' : 'Nueva Propiedad'}</h2>
		{#if propiedad}
			<button 
				type="button"
				class="btn-cancel"
				onclick={onCancel}
			>
				<i class="fas fa-times"></i>
			</button>
		{/if}
	</div>

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
						onchange={() => toggleAmenidad(amenidad)}
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
						onchange={handleFileSelect}
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
										onclick={() => removeImagen(idx)}
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
			{#if loading}
				{propiedad ? 'Actualizando...' : 'Creando...'}
			{:else}
				{propiedad ? 'Actualizar Propiedad' : 'Crear Propiedad'}
			{/if}
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

	.form-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
	}

	.form-title {
		font-size: 24px;
		color: var(--text-main);
		font-weight: 700;
		margin: 0;
	}

	.btn-cancel {
		background: none;
		border: none;
		font-size: 24px;
		color: var(--text-gray);
		cursor: pointer;
		padding: 0;
		transition: color 0.2s;
	}

	.btn-cancel:hover {
		color: var(--text-main);
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

	/* Responsive Styles */
	@media (max-width: 1024px) {
		.form-container {
			padding: 24px;
		}

		.form-grid {
			grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		}

		.amenidades-grid {
			grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		}

		.imagenes-gallery {
			grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		}
	}

	@media (max-width: 768px) {
		.form-container {
			padding: 16px;
			margin-bottom: 20px;
		}

		.form-title {
			font-size: 20px;
			margin-bottom: 20px;
		}

		.section-title {
			font-size: 14px;
			margin-bottom: 14px;
		}

		.form-section {
			margin-bottom: 20px;
			padding-bottom: 20px;
		}

		.form-grid {
			grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
			gap: 12px;
		}

		.form-group label {
			font-size: 13px;
		}

		.form-group input,
		.form-group select,
		.form-group textarea {
			padding: 8px 10px;
			font-size: 14px;
		}

		.amenidades-grid {
			grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
			gap: 8px;
		}

		.amenidad-checkbox {
			padding: 8px 10px;
			font-size: 12px;
		}

		.amenidad-checkbox span {
			font-size: 12px;
		}

		.upload-area {
			padding: 24px 16px;
		}

		.upload-hint p {
			font-size: 13px;
		}

		.imagenes-gallery {
			grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
			gap: 10px;
		}

		.imagen-card img {
			height: 90px;
		}

		.form-actions {
			margin-top: 20px;
			gap: 8px;
		}

		.btn-submit {
			padding: 10px 20px;
			font-size: 13px;
			width: 100%;
		}
	}

	@media (max-width: 480px) {
		.form-container {
			padding: 12px;
			margin-bottom: 16px;
			border-radius: 8px;
		}

		.form-title {
			font-size: 18px;
			margin-bottom: 16px;
		}

		.section-title {
			font-size: 13px;
			margin-bottom: 12px;
		}

		.alert-error {
			font-size: 12px;
			padding: 10px 12px;
		}

		.form-section {
			margin-bottom: 16px;
			padding-bottom: 16px;
		}

		.form-grid {
			grid-template-columns: 1fr;
			gap: 10px;
		}

		.form-group {
			gap: 6px;
		}

		.form-group label {
			font-size: 12px;
		}

		.form-group input,
		.form-group select,
		.form-group textarea {
			padding: 8px;
			font-size: 14px;
			border-radius: 6px;
		}

		.form-group textarea {
			min-height: 60px;
		}

		.amenidades-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 6px;
		}

		.amenidad-checkbox {
			padding: 6px 8px;
			font-size: 11px;
		}

		.amenidad-checkbox span {
			font-size: 11px;
		}

		.upload-area {
			padding: 16px 12px;
		}

		.upload-hint p {
			font-size: 12px;
		}

		.imagenes-gallery {
			grid-template-columns: repeat(3, 1fr);
			gap: 8px;
		}

		.imagen-card {
			border-radius: 6px;
		}

		.imagen-card img {
			height: 80px;
		}

		.imagen-info {
			padding: 6px;
			gap: 3px;
		}

		.etiqueta-input {
			padding: 3px 4px;
			font-size: 11px;
		}

		.btn-remove {
			padding: 3px 6px;
			font-size: 11px;
		}

		.form-actions {
			flex-direction: column;
			margin-top: 16px;
			gap: 10px;
		}

		.btn-submit {
			padding: 12px 16px;
			font-size: 14px;
			width: 100%;
		}

		.form-group.checkbox {
			flex-wrap: wrap;
		}

		.form-group.checkbox label {
			font-size: 13px;
		}
	}
</style>
