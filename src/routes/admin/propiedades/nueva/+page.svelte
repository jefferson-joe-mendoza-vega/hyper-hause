<script>
	import PropertyForm from '../componentes/PropertyForm.svelte';
</script>

<div class="space-y-6 max-w-4xl">
	<!-- Header -->
	<div>
		<a href="/admin/propiedades" class="inline-flex items-center gap-2 text-brand-green hover:underline mb-4">
			<span class="material-icons-round text-lg">arrow_back</span>
			Volver a Propiedades
		</a>
		<h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Nueva Propiedad</h1>
		<p class="text-slate-600 dark:text-slate-400">Completa la información de la nueva propiedad</p>
	</div>

	<!-- Property Form -->
	<PropertyForm />
</div>
