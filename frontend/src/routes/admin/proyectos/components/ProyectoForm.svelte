<script>
	let { onSubmit = () => {} } = $props();

	let formData = $state({
		nombre: '',
		tipoInmueble: 'Lotes Urbanos',
		tipoOperacion: 'Comprar',
		tipoDesarrollo: 'Desarrollo Horizontal',
		direccion: '',
		latitud: '',
		longitud: '',
		precio: '',
		precioDolares: '',
		area: '',
		frontis: '',
		fondo: '',
		perimetro: '',
		amenidades: [],
		descripcion: '',
		imagenes: [],
		activo: true
	});

	let imagenesSubidas = $state([]);
	let loading = $state(false);
	let uploadingImage = $state(false);
	let error = $state(null);
	let successMessage = $state(null);

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8787';
	
	const tiposInmuebles = ['Lotes Urbanos', 'Desarrollo Horizontal', 'Departamentos', 'Casas', 'Locales', 'Oficinas', 'Terrenos'];
	const tiposOperacion = ['Comprar', 'Alquilar', 'Venta Directa'];
	const tiposDesarrollo = ['Desarrollo Horizontal', 'Desarrollo Vertical', 'Mixto'];
	const amenidadesOpciones = ['Restaurantes', 'Parques', 'Hospitales', 'Escuelas', 'Transporte público', 'Centros comerciales', 'Seguridad 24h'];

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

	function handleFileSelect(e) {
		const files = e.target.files;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				uploadToImgbb(files[i]);
			}
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		loading = true;
		error = null;
		successMessage = null;

		try {
			const token = localStorage.getItem('authToken');
			if (!token) {
				throw new Error('No hay autenticación. Por favor, inicia sesión.');
			}

			// Validar campos requeridos
			if (!formData.nombre.trim()) throw new Error('El nombre del proyecto es requerido');
			if (!formData.direccion.trim()) throw new Error('La dirección es requerida');
			if (!formData.area) throw new Error('El área es requerida');

			const response = await fetch(`${BACKEND_URL}/api/admin/proyectos`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				const errData = await response.json();
				throw new Error(errData.error || 'Error creando proyecto');
			}

			successMessage = 'Proyecto creado exitosamente';
			resetForm();
			onSubmit();
		} catch (err) {
			error = err.message;
			console.error('Error:', err);
		} finally {
			loading = false;
		}
	}

	function resetForm() {
		formData = {
			nombre: '',
			tipoInmueble: 'Lotes Urbanos',
			tipoOperacion: 'Comprar',
			tipoDesarrollo: 'Desarrollo Horizontal',
			direccion: '',
			latitud: '',
			longitud: '',
			precio: '',
			precioDolares: '',
			area: '',
			frontis: '',
			fondo: '',
			perimetro: '',
			amenidades: [],
			descripcion: '',
			imagenes: [],
			activo: true
		};
		imagenesSubidas = [];
	}
</script>

<div class="proyecto-form-container">
	<div class="form-header">
		<h2>Crear Nuevo Proyecto</h2>
	</div>

	{#if error}
		<div class="alert alert-error">
			{error}
		</div>
	{/if}

	{#if successMessage}
		<div class="alert alert-success">
			{successMessage}
		</div>
	{/if}

	<form on:submit={handleSubmit} class="proyecto-form">
		<!-- Información Básica -->
		<fieldset class="form-section">
			<legend>Información Básica</legend>

			<div class="form-row">
				<div class="form-group">
					<label for="nombre">Nombre del Proyecto *</label>
					<input
						id="nombre"
						type="text"
						bind:value={formData.nombre}
						placeholder="ej: Los Cerezos"
						required
					/>
				</div>

				<div class="form-group">
					<label for="tipoOperacion">Tipo de Operación *</label>
					<select id="tipoOperacion" bind:value={formData.tipoOperacion}>
						{#each tiposOperacion as tipo}
							<option value={tipo}>{tipo}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="tipoInmueble">Tipo de Inmueble *</label>
					<select id="tipoInmueble" bind:value={formData.tipoInmueble}>
						{#each tiposInmuebles as tipo}
							<option value={tipo}>{tipo}</option>
						{/each}
					</select>
				</div>

				<div class="form-group">
					<label for="tipoDesarrollo">Tipo de Desarrollo *</label>
					<select id="tipoDesarrollo" bind:value={formData.tipoDesarrollo}>
						{#each tiposDesarrollo as tipo}
							<option value={tipo}>{tipo}</option>
						{/each}
					</select>
				</div>
			</div>
		</fieldset>

		<!-- Ubicación -->
		<fieldset class="form-section">
			<legend>Ubicación</legend>

			<div class="form-group">
				<label for="direccion">Dirección *</label>
				<input
					id="direccion"
					type="text"
					bind:value={formData.direccion}
					placeholder="ej: Av. Principal 123, San Isidro"
					required
				/>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="latitud">Latitud</label>
					<input id="latitud" type="number" bind:value={formData.latitud} step="0.0001" />
				</div>

				<div class="form-group">
					<label for="longitud">Longitud</label>
					<input id="longitud" type="number" bind:value={formData.longitud} step="0.0001" />
				</div>
			</div>
		</fieldset>

		<!-- Dimensiones y Áreas -->
		<fieldset class="form-section">
			<legend>Dimensiones</legend>

			<div class="form-row">
				<div class="form-group">
					<label for="area">Área (m²) *</label>
					<input
						id="area"
						type="number"
						bind:value={formData.area}
						placeholder="ej: 250"
						required
					/>
				</div>

				<div class="form-group">
					<label for="frontis">Frontis (m)</label>
					<input id="frontis" type="number" bind:value={formData.frontis} placeholder="ej: 15" />
				</div>

				<div class="form-group">
					<label for="fondo">Fondo (m)</label>
					<input id="fondo" type="number" bind:value={formData.fondo} placeholder="ej: 18" />
				</div>

				<div class="form-group">
					<label for="perimetro">Perímetro (m)</label>
					<input id="perimetro" type="number" bind:value={formData.perimetro} placeholder="ej: 66" />
				</div>
			</div>
		</fieldset>

		<!-- Precios -->
		<fieldset class="form-section">
			<legend>Precios</legend>

			<div class="form-row">
				<div class="form-group">
					<label for="precio">Precio (S/.)</label>
					<input id="precio" type="number" bind:value={formData.precio} placeholder="Precio en soles" />
				</div>

				<div class="form-group">
					<label for="precioDolares">Precio (USD)</label>
					<input id="precioDolares" type="number" bind:value={formData.precioDolares} placeholder="Precio en dólares" />
				</div>
			</div>
		</fieldset>

		<!-- Amenidades -->
		<fieldset class="form-section">
			<legend>Amenidades Cercanas</legend>

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
		</fieldset>

		<!-- Descripción -->
		<fieldset class="form-section">
			<legend>Descripción</legend>

			<div class="form-group">
				<label for="descripcion">Descripción del Proyecto</label>
				<textarea
					id="descripcion"
					bind:value={formData.descripcion}
					placeholder="Complejo residencial de lujo con amenidades de clase mundial..."
					rows="6"
				></textarea>
			</div>
		</fieldset>

		<!-- Imágenes -->
		<fieldset class="form-section">
			<legend>Galería de Imágenes</legend>

			<div class="upload-section">
				<label for="file-upload" class="upload-label">
					<i class="fas fa-cloud-upload-alt"></i>
					<span>Seleccionar imágenes</span>
				</label>
				<input
					id="file-upload"
					type="file"
					multiple
					accept="image/*"
					on:change={handleFileSelect}
					disabled={uploadingImage}
					style="display: none;"
				/>
				{#if uploadingImage}
					<p class="uploading">Subiendo imagen...</p>
				{/if}
			</div>

			{#if imagenesSubidas.length > 0}
				<div class="imagenes-list">
					<h4>Imágenes Cargadas ({imagenesSubidas.length})</h4>
					<div class="imagenes-grid">
						{#each imagenesSubidas as imagen, index}
							<div class="imagen-item">
								<img src={imagen.thumb?.url || imagen.url} alt={`Imagen ${index + 1}`} />
								<button
									type="button"
									class="btn-remove"
									on:click={() => removeImagen(index)}
									title="Eliminar imagen"
								>
									<i class="fas fa-times"></i>
								</button>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</fieldset>

		<!-- Activo -->
		<fieldset class="form-section">
			<legend>Estado</legend>

			<label class="switch-label">
				<input type="checkbox" bind:checked={formData.activo} />
				<span>Proyecto Activo</span>
			</label>
		</fieldset>

		<!-- Botones -->
		<div class="form-actions">
			<button type="submit" class="btn-primary" disabled={loading || uploadingImage}>
				{#if loading}
					<i class="fas fa-spinner fa-spin"></i>
					Guardando...
				{:else}
					<i class="fas fa-save"></i>
					Guardar Proyecto
				{/if}
			</button>
			<button type="button" class="btn-secondary" on:click={resetForm}>
				<i class="fas fa-redo"></i>
				Limpiar
			</button>
		</div>
	</form>
</div>

<style>
	.proyecto-form-container {
		background: var(--white);
		border-radius: 12px;
		padding: 24px;
		margin-bottom: 30px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.form-header {
		margin-bottom: 24px;
	}

	.form-header h2 {
		font-size: 20px;
		color: var(--text-main);
		margin: 0;
	}

	.proyecto-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.form-section {
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		padding: 16px;
		background: #f9fafb;
	}

	.form-section legend {
		font-weight: 600;
		color: var(--text-main);
		padding: 0 8px;
		font-size: 14px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.form-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 16px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.form-group label {
		font-weight: 500;
		font-size: 14px;
		color: var(--text-main);
	}

	.form-group input,
	.form-group select,
	.form-group textarea {
		padding: 10px 12px;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		font-family: inherit;
		font-size: 14px;
		transition: border-color 0.2s;
	}

	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--logo-green);
		box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
	}

	.amenidades-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 12px;
	}

	.amenidad-checkbox {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px;
		background: var(--white);
		border: 1px solid #d1d5db;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s;
	}

	.amenidad-checkbox:hover {
		background: #f3f4f6;
	}

	.amenidad-checkbox input[type='checkbox'] {
		width: auto;
		cursor: pointer;
	}

	.amenidad-checkbox input[type='checkbox']:checked {
		accent-color: var(--logo-green);
	}

	.upload-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		padding: 24px;
		background: var(--white);
		border: 2px dashed #d1d5db;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s;
	}

	.upload-section:hover {
		border-color: var(--logo-green);
		background: #f0fdf4;
	}

	.upload-label {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		font-family: inherit;
	}

	.upload-label i {
		font-size: 32px;
		color: var(--logo-green);
	}

	.upload-label span {
		font-weight: 600;
		color: var(--text-main);
	}

	.uploading {
		font-size: 14px;
		color: var(--logo-green);
		margin: 0;
	}

	.imagenes-list {
		margin-top: 16px;
	}

	.imagenes-list h4 {
		margin: 0 0 12px 0;
		font-size: 14px;
		color: var(--text-main);
	}

	.imagenes-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 12px;
	}

	.imagen-item {
		position: relative;
		border-radius: 6px;
		overflow: hidden;
		aspect-ratio: 1;
		background: #f3f4f6;
	}

	.imagen-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.btn-remove {
		position: absolute;
		top: 4px;
		right: 4px;
		background: rgba(255, 0, 0, 0.8);
		color: white;
		border: none;
		border-radius: 50%;
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		opacity: 0;
		transition: all 0.2s;
	}

	.imagen-item:hover .btn-remove {
		opacity: 1;
	}

	.switch-label {
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		font-weight: 500;
	}

	.switch-label input[type='checkbox'] {
		width: auto;
		cursor: pointer;
	}

	.form-actions {
		display: flex;
		gap: 12px;
		margin-top: 20px;
	}

	.btn-primary,
	.btn-secondary {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 16px;
		border: none;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 14px;
	}

	.btn-primary {
		background-color: var(--logo-green);
		color: white;
	}

	.btn-primary:hover:not(:disabled) {
		background-color: var(--accent-green-dark);
	}

	.btn-primary:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.btn-secondary {
		background-color: #6b7280;
		color: white;
	}

	.btn-secondary:hover {
		background-color: #4b5563;
	}

	.alert {
		padding: 12px 16px;
		border-radius: 6px;
		margin-bottom: 20px;
		font-size: 14px;
	}

	.alert-error {
		background-color: #fee2e2;
		color: #dc2626;
		border: 1px solid #fca5a5;
	}

	.alert-success {
		background-color: #dcfce7;
		color: #16a34a;
		border: 1px solid #86efac;
	}

	@media (max-width: 768px) {
		.proyecto-form-container {
			padding: 16px;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.amenidades-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.form-actions {
			flex-direction: column;
		}

		.btn-primary,
		.btn-secondary {
			width: 100%;
			justify-content: center;
		}
	}
</style>
