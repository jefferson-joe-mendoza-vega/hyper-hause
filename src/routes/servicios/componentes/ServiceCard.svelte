<script>
	let { service } = $props();
</script>

<article class="group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 hover:-translate-y-1">
	<div class="w-14 h-14 bg-{service.color}/10 dark:bg-{service.color}/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
		<span class="material-icons-round text-{service.color} dark:text-{service.color === 'primary' ? 'blue-400' : 'brand-green'} text-2xl">
			{service.icon}
		</span>
	</div>
	
	<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-{service.color} transition-colors">
		{service.title}
	</h3>
	
	<p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
		{service.description}
	</p>
	
	<button class="flex items-center gap-2 text-sm font-bold text-{service.color} dark:text-{service.color === 'primary' ? 'blue-400' : 'brand-green'} group-hover:gap-3 transition-all">
		Saber más
		<span class="material-icons-round text-lg">arrow_forward</span>
	</button>
</article>
