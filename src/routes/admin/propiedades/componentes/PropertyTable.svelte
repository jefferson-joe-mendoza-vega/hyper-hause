<div class="bg-white dark:bg-[#1a2329] rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
	<div class="overflow-x-auto">
		<table class="w-full">
			<thead class="bg-slate-50 dark:bg-white/5">
				<tr>
					<th class="px-6 py-4 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Propiedad</th>
					<th class="px-6 py-4 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Tipo</th>
					<th class="px-6 py-4 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Precio</th>
					<th class="px-6 py-4 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Estado</th>
					<th class="px-6 py-4 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Ubicación</th>
					<th class="px-6 py-4 text-right text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Acciones</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-slate-100 dark:divide-white/5">
				<tr class="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
					<td class="px-6 py-4">
						<div class="flex items-center gap-3">
							<img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=100&h=100&fit=crop" alt="Casa" class="w-12 h-12 rounded-lg object-cover" />
							<div>
								<div class="text-sm font-bold text-slate-900 dark:text-white">Casa en San Isidro</div>
								<div class="text-xs text-slate-500">ID: #12345</div>
							</div>
						</div>
					</td>
					<td class="px-6 py-4">
						<span class="text-sm text-slate-900 dark:text-white">Venta</span>
					</td>
					<td class="px-6 py-4">
						<div class="text-sm font-bold text-slate-900 dark:text-white">$850,000</div>
					</td>
					<td class="px-6 py-4">
						<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
							Activa
						</span>
					</td>
					<td class="px-6 py-4">
						<span class="text-sm text-slate-600 dark:text-slate-400">San Isidro, Lima</span>
					</td>
					<td class="px-6 py-4">
						<div class="flex items-center justify-end gap-2">
							<button class="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors" title="Editar">
								<span class="material-icons-round text-blue-600 text-lg">edit</span>
							</button>
							<button class="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors" title="Ver">
								<span class="material-icons-round text-slate-600 dark:text-slate-400 text-lg">visibility</span>
							</button>
							<button class="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors" title="Eliminar">
								<span class="material-icons-round text-red-600 text-lg">delete</span>
							</button>
						</div>
					</td>
				</tr>
				<!-- Más filas de ejemplo -->
				<tr class="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
					<td class="px-6 py-4">
						<div class="flex items-center gap-3">
							<img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=100&fit=crop" alt="Departamento" class="w-12 h-12 rounded-lg object-cover" />
							<div>
								<div class="text-sm font-bold text-slate-900 dark:text-white">Departamento Miraflores</div>
								<div class="text-xs text-slate-500">ID: #12346</div>
							</div>
						</div>
					</td>
					<td class="px-6 py-4">
						<span class="text-sm text-slate-900 dark:text-white">Alquiler</span>
					</td>
					<td class="px-6 py-4">
						<div class="text-sm font-bold text-slate-900 dark:text-white">$2,500/mes</div>
					</td>
					<td class="px-6 py-4">
						<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
							Pendiente
						</span>
					</td>
					<td class="px-6 py-4">
						<span class="text-sm text-slate-600 dark:text-slate-400">Miraflores, Lima</span>
					</td>
					<td class="px-6 py-4">
						<div class="flex items-center justify-end gap-2">
							<button class="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors" title="Editar">
								<span class="material-icons-round text-blue-600 text-lg">edit</span>
							</button>
							<button class="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors" title="Ver">
								<span class="material-icons-round text-slate-600 dark:text-slate-400 text-lg">visibility</span>
							</button>
							<button class="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors" title="Eliminar">
								<span class="material-icons-round text-red-600 text-lg">delete</span>
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<!-- Pagination -->
	<div class="px-6 py-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
		<div class="text-sm text-slate-600 dark:text-slate-400">
			Mostrando <span class="font-bold">1-10</span> de <span class="font-bold">156</span> propiedades
		</div>
		<div class="flex gap-2">
			<button class="px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
				Anterior
			</button>
			<button class="px-4 py-2 rounded-lg bg-brand-green text-white hover:bg-brand-green/90 transition-colors">
				1
			</button>
			<button class="px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
				2
			</button>
			<button class="px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
				3
			</button>
			<button class="px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
				Siguiente
			</button>
		</div>
	</div>
</div>
