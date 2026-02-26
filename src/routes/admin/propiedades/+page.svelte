<script>
	import PropertyTable from './componentes/PropertyTable.svelte';
	import FilterBar from './componentes/FilterBar.svelte';
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex justify-between items-center">
		<div>
			<h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Propiedades</h1>
			<p class="text-slate-600 dark:text-slate-400">Gestiona el catálogo de propiedades</p>
		</div>
		<a href="/admin/propiedades/nueva" class="bg-brand-green hover:bg-brand-green/90 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2">
			<span class="material-icons-round">add</span>
			Nueva Propiedad
		</a>
	</div>

	<!-- Filter Bar -->
	<FilterBar />

	<!-- Properties Table -->
	<PropertyTable />
</div>
