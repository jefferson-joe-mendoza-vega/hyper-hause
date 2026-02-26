<script>
	let { name, role, comment, rating, date, status } = $props();
</script>

<div class="bg-white dark:bg-[#1a2329] rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-lg transition-shadow">
	<div class="flex items-start justify-between mb-4">
		<div class="flex items-center gap-3">
			<div class="w-12 h-12 bg-gradient-to-br from-brand-green to-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
				{name.split(' ').map(n => n[0]).join('')}
			</div>
			<div>
				<div class="font-bold text-slate-900 dark:text-white">{name}</div>
				<div class="text-xs text-slate-500 dark:text-slate-400">{role}</div>
			</div>
		</div>
		<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold {status === 'Publicado' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}">
			{status}
		</span>
	</div>

	<p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
		"{comment}"
	</p>

	<div class="flex items-center justify-between">
		<div class="flex gap-1">
			{#each Array(5) as _, i}
				<span class="material-icons-round text-sm {i < rating ? 'text-yellow-500' : 'text-slate-300 dark:text-slate-600'}">star</span>
			{/each}
		</div>
		<span class="text-xs text-slate-500">{date}</span>
	</div>

	<div class="flex gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
		<button class="flex-1 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
			Editar
		</button>
		<button class="flex-1 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 rounded-lg text-sm font-medium transition-colors">
			Eliminar
		</button>
	</div>
</div>
