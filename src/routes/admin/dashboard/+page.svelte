<script>
	import StatsCard from './componentes/StatsCard.svelte';
	import RecentActivity from './componentes/RecentActivity.svelte';
	import QuickActions from './componentes/QuickActions.svelte';
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex justify-between items-center">
		<div>
			<h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</h1>
			<p class="text-slate-600 dark:text-slate-400">Bienvenido al panel de administración</p>
		</div>
		<button class="bg-brand-green hover:bg-brand-green/90 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2">
			<span class="material-icons-round">add</span>
			Nueva Propiedad
		</button>
	</div>

	<!-- Stats Cards -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		<StatsCard 
			title="Total Propiedades" 
			value="156" 
			icon="home_work" 
			trend="+12%"
			trendUp={true}
		/>
		<StatsCard 
			title="Clientes Activos" 
			value="389" 
			icon="people" 
			trend="+8%"
			trendUp={true}
		/>
		<StatsCard 
			title="Operaciones" 
			value="178" 
			icon="trending_up" 
			trend="+15%"
			trendUp={true}
		/>
		<StatsCard 
			title="Proyectos" 
			value="24" 
			icon="apartment" 
			trend="-2%"
			trendUp={false}
		/>
	</div>

	<!-- Quick Actions & Recent Activity -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<QuickActions />
		<div class="lg:col-span-2">
			<RecentActivity />
		</div>
	</div>
</div>
