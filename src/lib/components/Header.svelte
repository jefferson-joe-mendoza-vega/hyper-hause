<script>
	import { page } from '$app/stores';
	
	let currentPath = $derived($page.url.pathname);
</script>

<header class="sticky top-0 z-50 glass-nav border-b border-primary/5 dark:border-white/5 px-6 pt-12 pb-4 flex justify-between items-center transition-colors">
	<a href="/" class="flex items-center gap-2">
		<!-- Logo Image -->
		<img src="/isotipo.webp" alt="Hyper House Logo" class="w-10 h-10 rounded-xl shadow-lg" />
		<div class="flex flex-col">
			<span class="text-primary dark:text-white font-extrabold text-lg tracking-tight leading-none">HYPER HOUSE</span>
			<span class="text-xs text-slate-500 dark:text-slate-400 font-medium">Inmobiliaria</span>
		</div>
	</a>
	<button class="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group">
		<span class="material-icons-round text-slate-600 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-white transition-colors">notifications_none</span>
		<span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
	</button>
</header>
