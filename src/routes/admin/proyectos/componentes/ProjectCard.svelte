<script>
	let { title, location, status, progress } = $props();
</script>

<div class="bg-white dark:bg-[#1a2329] rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden group hover:shadow-lg transition-shadow">
	<div class="h-48 bg-gradient-to-br from-brand-green to-primary relative overflow-hidden">
		<img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop" alt={title} class="w-full h-full object-cover opacity-50" />
		<div class="absolute top-3 right-3 bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-bold">
			{progress}%
		</div>
	</div>
	<div class="p-6">
		<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
		<div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
			<span class="material-icons-round text-sm">location_on</span>
			{location}
		</div>
		<div class="mb-4">
			<div class="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
				<span>Progreso</span>
				<span>{progress}%</span>
			</div>
			<div class="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
				<div class="h-full bg-brand-green transition-all" style="width: {progress}%"></div>
			</div>
		</div>
		<span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
			{status}
		</span>
		<div class="flex gap-2 mt-4">
			<button class="flex-1 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
				Editar
			</button>
			<button class="flex-1 py-2 bg-brand-green hover:bg-brand-green/90 text-white rounded-lg text-sm font-medium transition-colors">
				Ver Detalles
			</button>
		</div>
	</div>
</div>
