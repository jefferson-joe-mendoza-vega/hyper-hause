<div class="bg-white dark:bg-[#1a2329] rounded-2xl p-4 border border-slate-200 dark:border-white/5 shadow-sm">
	<div class="flex flex-wrap gap-4">
		<!-- Search -->
		<div class="flex-1 min-w-[300px] relative">
			<span class="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
			<input 
				type="text" 
				placeholder="Buscar por nombre, ID o ubicación..." 
				class="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-brand-green focus:bg-white dark:focus:bg-black/20 focus:ring-0 rounded-xl text-sm transition-all placeholder:text-slate-400 dark:text-white" 
			/>
		</div>

		<!-- Filters -->
		<select class="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-brand-green rounded-xl text-sm dark:text-white">
			<option value="">Tipo</option>
			<option value="venta">Venta</option>
			<option value="alquiler">Alquiler</option>
			<option value="proyecto">Proyecto</option>
		</select>

		<select class="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-brand-green rounded-xl text-sm dark:text-white">
			<option value="">Estado</option>
			<option value="activa">Activa</option>
			<option value="pendiente">Pendiente</option>
			<option value="vendida">Vendida</option>
			<option value="inactiva">Inactiva</option>
		</select>

		<button class="px-4 py-2.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl text-sm font-medium text-slate-700 dark:text-white transition-colors flex items-center gap-2">
			<span class="material-icons-round text-lg">filter_list</span>
			Más Filtros
		</button>
	</div>
</div>
