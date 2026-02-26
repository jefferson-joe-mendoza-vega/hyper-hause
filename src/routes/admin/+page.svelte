<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	
	// Redirigir automáticamente al dashboard solo en el cliente
	onMount(() => {
		goto('/admin/dashboard');
	});
</script>

<div class="flex items-center justify-center min-h-screen">
	<div class="text-center">
		<div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-brand-green mb-4"></div>
		<p class="text-slate-600 dark:text-slate-400">Redirigiendo...</p>
	</div>
</div>
