<script>
	let selectedFilter = $state('Todos');
	const filters = ['Todos', 'Venta', 'Alquiler', 'Proyectos', 'Remates'];
</script>

<div class="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
	{#each filters as filter}
		<button
			class="whitespace-nowrap px-4 py-2 text-xs font-semibold rounded-full transition-colors {selectedFilter === filter
				? 'bg-primary text-white shadow-md shadow-primary/20'
				: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/50'}"
			onclick={() => (selectedFilter = filter)}
		>
			{filter}
		</button>
	{/each}
</div>

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
