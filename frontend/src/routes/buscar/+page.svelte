<script>
	import { goto } from '$app/navigation';

	// ── Filtros de tipo de operación ───────────────────────────────────────────
	const operaciones = ['Todos', 'Venta', 'Alquiler', 'Proyectos', 'Remate'];
	let operacionActiva = $state('Todos');

	// ── Ubicación ─────────────────────────────────────────────────────────────
	const ubicaciones = ['Lima', 'Cajamarca', 'Arequipa', 'Cusco'];
	let ubicacionActiva = $state('Lima');

	// ── Tipo de inmueble ───────────────────────────────────────────────────────
	const tiposInmueble = [
		{ label: 'Depa', icon: 'fas fa-building' },
		{ label: 'Casa', icon: 'fas fa-home' },
		{ label: 'Oficina', icon: 'fas fa-briefcase' },
		{ label: 'Terreno', icon: 'fas fa-map' }
	];
	let tipoActivo = $state('Depa');

	// ── Dropdowns ─────────────────────────────────────────────────────────────
	let habitaciones = $state('Any');
	let banos = $state('Any');
	let estacionamientos = $state('Any');
	const opcionesNum = ['Any', '1', '2', '3', '4', '5+'];

	// ── Rango de precio ───────────────────────────────────────────────────────
	let precioMin = $state(60);
	let precioMax = $state(226);

	// ── Área ─────────────────────────────────────────────────────────────────
	let areaMin = $state(60);
	let areaMax = $state(300);

	// ── Búsqueda ─────────────────────────────────────────────────────────────
	let busqueda = $state('');

	// ── Resultados (simulados) ────────────────────────────────────────────────
	let resultados = $state(3);

	function aplicarFiltros() {
		// Aquí conectarás con la API real
		console.log('Aplicando filtros...', {
			operacion: operacionActiva,
			ubicacion: ubicacionActiva,
			tipo: tipoActivo,
			habitaciones,
			banos,
			estacionamientos,
			precio: [precioMin, precioMax],
			area: [areaMin, areaMax]
		});
	}

	function formatPrecio(val) {
		return val >= 1000 ? `$${(val)}k` : `$${val}k`;
	}
</script>

<svelte:head>
	<title>Buscar Propiedades — HyperHause</title>
	<meta name="description" content="Busca propiedades en venta, alquiler y proyectos en Lima y el Perú." />
</svelte:head>

<!-- ── Barra de búsqueda ──────────────────────────────────────────────────── -->
<div class="search-bar-wrap">
	<div class="search-input-wrap">
		<i class="fas fa-search search-icon" />
		<input
			id="buscar-input"
			type="text"
			placeholder="Buscar por distrito, calle..."
			bind:value={busqueda}
			class="search-input"
		/>
	</div>
	<button class="filter-btn" aria-label="Filtros avanzados">
		<i class="fas fa-sliders-h" />
	</button>
</div>

<!-- ── Chips de operación ─────────────────────────────────────────────────── -->
<div class="chips-scroll">
	{#each operaciones as op}
		<button
			class="chip {operacionActiva === op ? 'chip-active' : ''}"
			onclick={() => (operacionActiva = op)}
		>
			{op}
		</button>
	{/each}
</div>

<!-- ── Filtros avanzados ──────────────────────────────────────────────────── -->
<div class="filtros-section">
	<p class="filtros-label">FILTROS AVANZADOS</p>

	<!-- Ubicación -->
	<div class="filter-group">
		<label class="filter-title">Ubicación</label>
		<div class="toggle-group">
			{#each ubicaciones as ub}
				<button
					class="toggle-btn {ubicacionActiva === ub ? 'toggle-active' : ''}"
					onclick={() => (ubicacionActiva = ub)}
				>
					{ub}
				</button>
			{/each}
		</div>
	</div>

	<!-- Tipo de inmueble -->
	<div class="filter-group">
		<label class="filter-title">Tipo de Inmueble</label>
		<div class="tipo-grid">
			{#each tiposInmueble as tipo}
				<button
					class="tipo-btn {tipoActivo === tipo.label ? 'tipo-active' : ''}"
					onclick={() => (tipoActivo = tipo.label)}
				>
					<i class={tipo.icon} />
					{tipo.label}
				</button>
			{/each}
		</div>
	</div>

	<!-- Habitaciones / Baños / Estac. -->
	<div class="filter-group">
		<div class="selects-row">
			<div class="select-wrap">
				<label class="select-label">Habitaciones</label>
				<select bind:value={habitaciones} class="select-input">
					{#each opcionesNum as op}
						<option value={op}>{op}</option>
					{/each}
				</select>
			</div>
			<div class="select-wrap">
				<label class="select-label">Baños</label>
				<select bind:value={banos} class="select-input">
					{#each opcionesNum as op}
						<option value={op}>{op}</option>
					{/each}
				</select>
			</div>
			<div class="select-wrap">
				<label class="select-label">Estac.</label>
				<select bind:value={estacionamientos} class="select-input">
					{#each opcionesNum as op}
						<option value={op}>{op}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<!-- Rango de precio -->
	<div class="filter-group">
		<div class="range-header">
			<label class="filter-title">Rango de Precio</label>
			<span class="range-value">{formatPrecio(precioMin)} - {formatPrecio(precioMax)}</span>
		</div>
		<input
			type="range"
			min="0"
			max="500"
			bind:value={precioMin}
			class="range-slider"
		/>
		<input
			type="range"
			min="0"
			max="500"
			bind:value={precioMax}
			class="range-slider"
		/>
	</div>

	<!-- Área -->
	<div class="filter-group">
		<div class="range-header">
			<label class="filter-title">Área (m²)</label>
			<span class="range-value">{areaMin}m² - {areaMax}m²</span>
		</div>
		<input
			type="range"
			min="20"
			max="1000"
			bind:value={areaMin}
			class="range-slider"
		/>
		<input
			type="range"
			min="20"
			max="1000"
			bind:value={areaMax}
			class="range-slider"
		/>
	</div>

	<!-- Botón aplicar -->
	<button class="btn-aplicar" onclick={aplicarFiltros}>
		Aplicar Filtros
	</button>
</div>

<!-- ── Resultados ─────────────────────────────────────────────────────────── -->
<div class="resultados-bar">
	<span class="resultados-count">Resultados <strong>({resultados})</strong></span>
	<div class="ordenar-wrap">
		<span class="ordenar-label">Ordenar por:</span>
		<select class="ordenar-select">
			<option>Recientes</option>
			<option>Precio: menor a mayor</option>
			<option>Precio: mayor a menor</option>
			<option>Mayor área</option>
		</select>
	</div>
</div>

<!-- ── Botón flotante Mapa ────────────────────────────────────────────────── -->
<button class="fab-mapa">
	<i class="fas fa-map" />
	Mapa
</button>

<style>
	/* ── Barra de búsqueda ── */
	.search-bar-wrap {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 16px 20px 12px;
	}

	.search-input-wrap {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 10px;
		background: #f1f5f9;
		border-radius: 14px;
		padding: 0 16px;
		height: 48px;
	}

	.search-icon {
		color: #94a3b8;
		font-size: 14px;
	}

	.search-input {
		flex: 1;
		border: none;
		background: transparent;
		font-size: 14px;
		color: var(--text-main);
		outline: none;
		font-family: 'Inter', sans-serif;
	}

	.search-input::placeholder {
		color: #94a3b8;
	}

	.filter-btn {
		width: 48px;
		height: 48px;
		background: var(--text-blue);
		border: none;
		border-radius: 14px;
		color: white;
		font-size: 17px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: opacity 0.2s;
	}

	.filter-btn:hover {
		opacity: 0.88;
	}

	/* ── Chips ── */
	.chips-scroll {
		display: flex;
		gap: 8px;
		overflow-x: auto;
		padding: 0 20px 14px;
		scrollbar-width: none;
	}

	.chips-scroll::-webkit-scrollbar {
		display: none;
	}

	.chip {
		flex-shrink: 0;
		padding: 8px 18px;
		border-radius: 24px;
		font-size: 13px;
		font-weight: 500;
		border: 1px solid #e2e8f0;
		background: white;
		color: var(--text-gray);
		cursor: pointer;
		transition: all 0.18s;
	}

	.chip-active {
		background: var(--text-blue);
		color: white;
		border-color: var(--text-blue);
		font-weight: 600;
	}

	/* ── Sección filtros ── */
	.filtros-section {
		padding: 0 20px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.filtros-label {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: var(--text-blue);
		margin-bottom: -8px;
	}

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.filter-title {
		font-size: 14px;
		font-weight: 600;
		color: var(--text-main);
	}

	/* ── Toggle de ubicación ── */
	.toggle-group {
		display: flex;
		gap: 0;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		overflow: hidden;
	}

	.toggle-btn {
		flex: 1;
		padding: 11px 8px;
		font-size: 13px;
		font-weight: 500;
		border: none;
		background: white;
		color: var(--text-gray);
		cursor: pointer;
		transition: all 0.18s;
	}

	.toggle-btn + .toggle-btn {
		border-left: 1px solid #e2e8f0;
	}

	.toggle-active {
		background: var(--text-blue);
		color: white;
		font-weight: 600;
	}

	/* ── Tipo de inmueble ── */
	.tipo-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	.tipo-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 14px;
		border: 1.5px solid #e2e8f0;
		border-radius: 12px;
		background: white;
		color: var(--text-gray);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.18s;
	}

	.tipo-btn i {
		font-size: 15px;
	}

	.tipo-active {
		border-color: var(--text-blue);
		background: #eef4ff;
		color: var(--text-blue);
		font-weight: 600;
	}

	/* ── Selects ── */
	.selects-row {
		display: flex;
		gap: 10px;
	}

	.select-wrap {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.select-label {
		font-size: 11px;
		font-weight: 600;
		color: var(--text-gray);
	}

	.select-input {
		padding: 10px 10px;
		border: 1.5px solid #e2e8f0;
		border-radius: 10px;
		font-size: 13px;
		color: var(--text-main);
		background: white;
		outline: none;
		font-family: 'Inter', sans-serif;
		cursor: pointer;
		appearance: auto;
	}

	.select-input:focus {
		border-color: var(--text-blue);
	}

	/* ── Range slider ── */
	.range-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.range-value {
		font-size: 12px;
		font-weight: 600;
		color: var(--text-blue);
		background: #eef4ff;
		padding: 4px 10px;
		border-radius: 8px;
	}

	.range-slider {
		width: 100%;
		accent-color: var(--text-blue);
		cursor: pointer;
		height: 4px;
	}

	/* ── Botón Aplicar ── */
	.btn-aplicar {
		width: 100%;
		padding: 16px;
		background: var(--text-blue);
		color: white;
		border: none;
		border-radius: 14px;
		font-size: 15px;
		font-weight: 600;
		cursor: pointer;
		font-family: 'Inter', sans-serif;
		transition: opacity 0.2s, transform 0.15s;
		margin-bottom: 4px;
	}

	.btn-aplicar:hover {
		opacity: 0.9;
		transform: translateY(-1px);
	}

	.btn-aplicar:active {
		transform: translateY(0);
	}

	/* ── Barra de resultados ── */
	.resultados-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px 20px 8px;
	}

	.resultados-count {
		font-size: 14px;
		color: var(--text-main);
		font-weight: 500;
	}

	.resultados-count strong {
		color: var(--text-blue);
	}

	.ordenar-wrap {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.ordenar-label {
		font-size: 12px;
		color: var(--text-gray);
	}

	.ordenar-select {
		font-size: 12px;
		color: var(--text-main);
		border: none;
		background: transparent;
		font-weight: 600;
		cursor: pointer;
		outline: none;
		font-family: 'Inter', sans-serif;
	}

	/* ── FAB Mapa ── */
	.fab-mapa {
		position: fixed;
		bottom: 90px;
		right: 20px;
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 12px 20px;
		background: #1a233a;
		color: white;
		border: none;
		border-radius: 30px;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
		font-family: 'Inter', sans-serif;
		transition: transform 0.2s, box-shadow 0.2s;
		z-index: 50;
	}

	.fab-mapa:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 28px rgba(0, 0, 0, 0.3);
	}

	/* ── Responsive desktop ── */
	@media (min-width: 768px) {
		.tipo-grid {
			grid-template-columns: repeat(4, 1fr);
		}

		.toggle-group {
			max-width: 400px;
		}

		.fab-mapa {
			bottom: 30px;
		}
	}
</style>
