<script>
	let selectedLocation = $state('Lima');
	let selectedPropertyType = $state('depa');
	let bedrooms = $state('Any');
	let bathrooms = $state('Any');
	let parking = $state('Any');
	let priceRange = $state(500);
	let areaRange = $state(200);
</script>

<section class="px-5 py-6 space-y-6 bg-white dark:bg-slate-800/50 mx-4 mt-2 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
	<h2 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Filtros Avanzados</h2>

	<!-- Location Toggle -->
	<div>
		<div class="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Ubicación</div>
		<div class="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
			<button
				class="flex-1 py-2 text-sm font-semibold rounded-md transition-all {selectedLocation === 'Lima'
					? 'shadow-sm bg-white dark:bg-slate-700 text-primary dark:text-white'
					: 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}"
				onclick={() => (selectedLocation = 'Lima')}
			>
				Lima
			</button>
			<button
				class="flex-1 py-2 text-sm font-semibold rounded-md transition-all {selectedLocation === 'Cajamarca'
					? 'shadow-sm bg-white dark:bg-slate-700 text-primary dark:text-white'
					: 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}"
				onclick={() => (selectedLocation = 'Cajamarca')}
			>
				Cajamarca
			</button>
		</div>
	</div>

	<!-- Property Type Grid -->
	<div>
		<div class="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Tipo de Inmueble</div>
		<div class="grid grid-cols-2 gap-3">
			<label class="cursor-pointer group">
				<input bind:group={selectedPropertyType} class="peer sr-only" name="ptype" type="radio" value="depa" />
				<div class="flex items-center gap-2 p-3 border border-slate-200 dark:border-slate-600 rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/20 transition-all">
					<span class="material-icons-outlined text-slate-400 peer-checked:text-primary group-hover:text-primary">apartment</span>
					<span class="text-sm font-medium text-slate-600 dark:text-slate-300 peer-checked:text-primary dark:peer-checked:text-white">Depa</span>
				</div>
			</label>
			<label class="cursor-pointer group">
				<input bind:group={selectedPropertyType} class="peer sr-only" name="ptype" type="radio" value="casa" />
				<div class="flex items-center gap-2 p-3 border border-slate-200 dark:border-slate-600 rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/20 transition-all">
					<span class="material-icons-outlined text-slate-400 peer-checked:text-primary group-hover:text-primary">home</span>
					<span class="text-sm font-medium text-slate-600 dark:text-slate-300 peer-checked:text-primary dark:peer-checked:text-white">Casa</span>
				</div>
			</label>
		</div>
	</div>

	<!-- Counters Row -->
	<div class="flex justify-between gap-4">
		<div class="flex-1">
			<label for="bedrooms" class="block text-xs font-bold text-slate-500 mb-2">Habitaciones</label>
			<select id="bedrooms" bind:value={bedrooms} class="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-primary py-2.5">
				<option>Any</option>
				<option>1+</option>
				<option>2+</option>
				<option>3+</option>
				<option>4+</option>
			</select>
		</div>
		<div class="flex-1">
			<label for="bathrooms" class="block text-xs font-bold text-slate-500 mb-2">Baños</label>
			<select id="bathrooms" bind:value={bathrooms} class="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-primary py-2.5">
				<option>Any</option>
				<option>1+</option>
				<option>2+</option>
				<option>3+</option>
			</select>
		</div>
		<div class="flex-1">
			<label for="parking" class="block text-xs font-bold text-slate-500 mb-2">Estac.</label>
			<select id="parking" bind:value={parking} class="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-primary py-2.5">
				<option>Any</option>
				<option>1</option>
				<option>2</option>
			</select>
		</div>
	</div>

	<!-- Price Slider -->
	<div>
		<div class="flex justify-between mb-2">
			<label for="priceRange" class="text-sm font-bold text-slate-700 dark:text-slate-200">Rango de Precio</label>
			<span class="text-xs font-bold text-primary dark:text-white bg-primary/10 dark:bg-primary/30 px-2 py-0.5 rounded">
				${Math.round(priceRange * 0.24)}k - ${Math.round(priceRange * 0.9)}k
			</span>
		</div>
		<input
			id="priceRange"
			bind:value={priceRange}
			class="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-primary"
			max="1000"
			min="50"
			type="range"
		/>
	</div>

	<!-- Area Slider -->
	<div>
		<div class="flex justify-between mb-2">
			<label for="areaRange" class="text-sm font-bold text-slate-700 dark:text-slate-200">Área (m²)</label>
			<span class="text-xs font-bold text-slate-500 dark:text-slate-400">
				{Math.round(areaRange * 0.3)}m² - {Math.round(areaRange * 1.5)}m²
			</span>
		</div>
		<input
			id="areaRange"
			bind:value={areaRange}
			class="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-primary"
			max="500"
			min="20"
			type="range"
		/>
	</div>

	<button class="w-full py-3 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-[0.98]">
		Aplicar Filtros
	</button>
</section>

<style>
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 20px;
		width: 20px;
		border-radius: 50%;
		background: #1a5789;
		cursor: pointer;
		margin-top: -8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	}
	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: 4px;
		cursor: pointer;
		background: #e2e8f0;
		border-radius: 2px;
	}
</style>
