<script>
	import ProjectCard from './componentes/ProjectCard.svelte';
</script>

<div class="space-y-6">
	<div class="flex justify-between items-center">
		<div>
			<h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Proyectos</h1>
			<p class="text-slate-600 dark:text-slate-400">Gestiona los proyectos destacados</p>
		</div>
		<a href="/admin/proyectos/nuevo" class="bg-brand-green hover:bg-brand-green/90 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2">
			<span class="material-icons-round">add</span>
			Nuevo Proyecto
		</a>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<ProjectCard 
			title="Torre Empresarial"
			location="San Isidro"
			status="En construcción"
			progress="65"
		/>
		<ProjectCard 
			title="Condominio Residencial"
			location="Miraflores"
			status="Pre-venta"
			progress="30"
		/>
		<ProjectCard 
			title="Plaza Comercial"
			location="Surco"
			status="Planificación"
			progress="15"
		/>
	</div>
</div>
