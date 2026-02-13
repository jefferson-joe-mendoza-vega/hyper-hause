<script>
	let { property } = $props();
</script>

<article class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden group">
	<div class="relative h-48 w-full overflow-hidden">
		<img
			alt={property.title}
			class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
			src={property.image}
		/>
		<div class="absolute top-3 left-3 {property.type === 'Venta' ? 'bg-brand-green' : property.type === 'Alquiler' ? 'bg-brand-green' : 'bg-primary'} text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm tracking-wide uppercase">
			{property.type}
		</div>
		<button class="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
			<span class="material-icons-round text-lg leading-none">favorite_border</span>
		</button>
		<div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
		<div class="absolute bottom-3 left-3 flex items-center text-white text-xs font-medium">
			<span class="material-icons-outlined text-sm mr-1">location_on</span>
			{property.location}
		</div>
	</div>
	<div class="p-5">
		<h4 class="font-bold text-lg text-slate-800 dark:text-white mb-1 line-clamp-1">{property.title}</h4>
		<p class="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{property.description}</p>
		<div class="flex items-center gap-4 mb-5 text-slate-600 dark:text-slate-300">
			<div class="flex items-center gap-1.5" title="Habitaciones">
				<span class="material-icons-outlined text-primary dark:text-blue-300 text-lg">bed</span>
				<span class="text-xs font-bold">{property.bedrooms}</span>
			</div>
			<div class="flex items-center gap-1.5" title="Baños">
				<span class="material-icons-outlined text-primary dark:text-blue-300 text-lg">bathtub</span>
				<span class="text-xs font-bold">{property.bathrooms}</span>
			</div>
			<div class="flex items-center gap-1.5" title="Estacionamientos">
				<span class="material-icons-outlined text-primary dark:text-blue-300 text-lg">directions_car</span>
				<span class="text-xs font-bold">{property.parking}</span>
			</div>
			<div class="w-px h-4 bg-slate-200 dark:bg-slate-600"></div>
			<div class="flex items-center gap-1.5" title="Area">
				<span class="material-icons-outlined text-primary dark:text-blue-300 text-lg">square_foot</span>
				<span class="text-xs font-bold">{property.area}m²</span>
			</div>
		</div>
		<div class="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-4">
			<div class="flex flex-col">
				<span class="text-[10px] uppercase font-bold text-slate-400">{property.isRental ? 'Precio / Mes' : 'Precio'}</span>
				<span class="text-xl font-extrabold text-primary dark:text-white">
					${property.price.toLocaleString()}
				</span>
			</div>
			<button class="px-5 py-2.5 bg-brand-green hover:bg-[#3d9162] text-white text-sm font-bold rounded-lg shadow-lg shadow-green-500/20 transition-all active:scale-95 flex items-center gap-2">
				Ver Detalles
				<span class="material-icons-round text-sm">arrow_forward</span>
			</button>
		</div>
	</div>
</article>
