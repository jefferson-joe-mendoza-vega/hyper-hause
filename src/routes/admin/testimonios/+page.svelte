<script>
	import TestimonialCard from './componentes/TestimonialCard.svelte';
</script>

<div class="space-y-6">
	<div class="flex justify-between items-center">
		<div>
			<h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Testimonios</h1>
			<p class="text-slate-600 dark:text-slate-400">Gestiona las opiniones de clientes</p>
		</div>
		<a href="/admin/testimonios/nuevo" class="bg-brand-green hover:bg-brand-green/90 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2">
			<span class="material-icons-round">add</span>
			Nuevo Testimonio
		</a>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<TestimonialCard 
			name="María Castro"
			role="Cliente - Venta"
			comment="Excelente servicio, me ayudaron a vender mi casa en tiempo récord."
			rating="5"
			date="20 Feb 2026"
			status="Publicado"
		/>
		<TestimonialCard 
			name="Jorge Rodríguez"
			role="Cliente - Alquiler"
			comment="Encontré el departamento ideal gracias a su equipo."
			rating="5"
			date="18 Feb 2026"
			status="Publicado"
		/>
		<TestimonialCard 
			name="Ana Sánchez"
			role="Cliente - Compra"
			comment="Confianza total en cada paso del proceso."
			rating="4"
			date="15 Feb 2026"
			status="Pendiente"
		/>
	</div>
</div>
