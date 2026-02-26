<script>
	let { title, value, icon, trend, trendUp } = $props();
</script>

<div class="bg-white dark:bg-[#1a2329] rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
	<div class="flex justify-between items-start mb-4">
		<div class="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center">
			<span class="material-icons-round text-brand-green text-2xl">{icon}</span>
		</div>
		<span class="text-sm font-bold {trendUp ? 'text-green-600' : 'text-red-600'}">{trend}</span>
	</div>
	<h3 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{value}</h3>
	<p class="text-sm text-slate-600 dark:text-slate-400 font-medium">{title}</p>
</div>
