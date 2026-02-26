<script>
	import UserTable from './componentes/UserTable.svelte';
</script>

<div class="space-y-6">
	<div class="flex justify-between items-center">
		<div>
			<h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Usuarios</h1>
			<p class="text-slate-600 dark:text-slate-400">Gestiona los usuarios del sistema</p>
		</div>
		<button class="bg-brand-green hover:bg-brand-green/90 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2">
			<span class="material-icons-round">person_add</span>
			Nuevo Usuario
		</button>
	</div>

	<UserTable />
</div>
