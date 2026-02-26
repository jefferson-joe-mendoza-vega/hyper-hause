<script>
	import { page } from '$app/stores';
	
	let currentPath = $derived($page.url.pathname);
	
	const menuItems = [
		{ path: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
		{ path: '/admin/propiedades', icon: 'home_work', label: 'Propiedades' },
		{ path: '/admin/proyectos', icon: 'apartment', label: 'Proyectos' },
		{ path: '/admin/clientes', icon: 'people', label: 'Clientes' },
		{ path: '/admin/testimonios', icon: 'rate_review', label: 'Testimonios' },
		{ path: '/admin/usuarios', icon: 'admin_panel_settings', label: 'Usuarios' }
	];
</script>

<div class="min-h-screen bg-slate-50 dark:bg-[#0f1419]">
	<!-- Sidebar -->
	<aside class="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-[#1a2329] border-r border-slate-200 dark:border-white/5 z-40 flex flex-col">
		<!-- Logo -->
		<div class="p-6 border-b border-slate-200 dark:border-white/5 flex-shrink-0">
			<div class="flex items-center gap-2">
				<div class="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center shadow-lg">
					<span class="text-white font-extrabold text-xl tracking-tighter">HH</span>
				</div>
				<div class="flex flex-col">
					<span class="text-primary dark:text-white font-extrabold text-base tracking-tight leading-none">ADMIN PANEL</span>
					<span class="text-xs text-slate-500 dark:text-slate-400 font-medium">Hyper House</span>
				</div>
			</div>
		</div>

		<!-- Navigation -->
		<nav class="p-4 flex-1 overflow-y-auto">
			<ul class="space-y-2">
				{#each menuItems as item}
					<li>
						<a 
							href={item.path}
							class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all {currentPath.startsWith(item.path) ? 'bg-brand-green text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}"
						>
							<span class="material-icons-round text-xl">{item.icon}</span>
							<span class="font-medium text-sm">{item.label}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<!-- User Section -->
		<div class="p-4 border-t border-slate-200 dark:border-white/5 flex-shrink-0">
			<div class="flex items-center gap-3 px-4 py-3">
				<div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
					<span class="text-white font-bold text-sm">AD</span>
				</div>
				<div class="flex-1 min-w-0">
					<div class="text-sm font-bold text-slate-900 dark:text-white truncate">Admin</div>
					<div class="text-xs text-slate-500 dark:text-slate-400 truncate">admin@hyperhouse.com</div>
				</div>
				<a href="/" class="text-slate-400 hover:text-slate-600 dark:hover:text-white flex-shrink-0">
					<span class="material-icons-round text-xl">logout</span>
				</a>
			</div>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="ml-64 min-h-screen">
		<div class="p-6 md:p-8">
			<slot />
		</div>
	</main>
</div>

<style>
	:global(body) {
		overflow-x: hidden;
	}
</style>
