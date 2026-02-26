<div class="bg-white dark:bg-[#1a2329] rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
	<form class="space-y-6">
		<!-- Información Básica -->
		<div>
			<h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Información Básica</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Título</label>
					<input type="text" placeholder="Ej: Casa moderna en San Isidro" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm dark:text-white focus:border-brand-green focus:ring-0" />
				</div>
				<div>
					<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tipo</label>
					<select class="w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm dark:text-white focus:border-brand-green focus:ring-0">
						<option>Venta</option>
						<option>Alquiler</option>
						<option>Proyecto</option>
					</select>
				</div>
				<div>
					<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Precio</label>
					<input type="number" placeholder="850000" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm dark:text-white focus:border-brand-green focus:ring-0" />
				</div>
				<div>
					<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Área (m²)</label>
					<input type="number" placeholder="250" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm dark:text-white focus:border-brand-green focus:ring-0" />
				</div>
			</div>
		</div>

		<!-- Ubicación -->
		<div>
			<h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Ubicación</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Dirección</label>
					<input type="text" placeholder="Av. Principal 123" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm dark:text-white focus:border-brand-green focus:ring-0" />
				</div>
				<div>
					<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Distrito</label>
					<input type="text" placeholder="San Isidro" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm dark:text-white focus:border-brand-green focus:ring-0" />
				</div>
			</div>
		</div>

		<!-- Características -->
		<div>
			<h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Características</h2>
			<div class="grid grid-cols-3 gap-4">
				<div>
					<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Dormitorios</label>
					<input type="number" placeholder="3" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm dark:text-white focus:border-brand-green focus:ring-0" />
				</div>
				<div>
					<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Baños</label>
					<input type="number" placeholder="2" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm dark:text-white focus:border-brand-green focus:ring-0" />
				</div>
				<div>
					<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Estacionamientos</label>
					<input type="number" placeholder="2" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm dark:text-white focus:border-brand-green focus:ring-0" />
				</div>
			</div>
		</div>

		<!-- Descripción -->
		<div>
			<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Descripción</label>
			<textarea rows="5" placeholder="Describe la propiedad..." class="w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm dark:text-white focus:border-brand-green focus:ring-0 resize-none"></textarea>
		</div>

		<!-- Imágenes -->
		<div>
			<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Imágenes</label>
			<div class="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl p-8 text-center hover:border-brand-green transition-colors cursor-pointer">
				<span class="material-icons-round text-slate-400 text-4xl mb-2">cloud_upload</span>
				<p class="text-sm text-slate-600 dark:text-slate-400">Arrastra imágenes o <span class="text-brand-green font-bold">haz clic para seleccionar</span></p>
			</div>
		</div>

		<!-- Actions -->
		<div class="flex gap-4 pt-4">
			<button type="submit" class="flex-1 bg-brand-green hover:bg-brand-green/90 text-white py-3 rounded-xl font-bold shadow-lg transition-all">
				Publicar Propiedad
			</button>
			<button type="button" class="px-6 py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl font-medium text-slate-700 dark:text-white transition-colors">
				Cancelar
			</button>
		</div>
	</form>
</div>
