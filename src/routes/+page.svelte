<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Hyper House Inmobiliaria</title>
</svelte:head>

<div class="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-100 antialiased selection:bg-brand-green selection:text-white pb-24">
	<Header />

	<main class="px-6 pt-6">
		<!-- Hero Section -->
		<section class="mb-8">
			<h1 class="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
				Encuentra tu <br />
				<span class="text-primary dark:text-blue-400">propiedad ideal</span>
			</h1>

			<!-- Search & Filter Block -->
			<div class="bg-white dark:bg-[#1a2329] p-2 rounded-2xl shadow-soft dark:shadow-none">
				<div class="flex bg-slate-100 dark:bg-black/20 rounded-xl p-1 mb-3">
					<button class="flex-1 py-2.5 rounded-lg text-sm font-bold text-center bg-white dark:bg-primary shadow-sm text-primary dark:text-white transition-all">Venta</button>
					<button class="flex-1 py-2.5 rounded-lg text-sm font-medium text-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all">Alquiler</button>
				</div>
				<div class="flex gap-3">
					<div class="flex-1 relative">
						<span class="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
						<input class="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-transparent focus:border-brand-green focus:bg-white dark:focus:bg-black/20 focus:ring-0 rounded-xl text-sm transition-all placeholder:text-slate-400 dark:text-white" placeholder="Ciudad, zona o calle..." type="text" />
					</div>
					<button class="bg-primary hover:bg-primary/90 text-white p-3 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-primary/20 aspect-square">
						<span class="material-icons-round">tune</span>
					</button>
				</div>
			</div>
		</section>

		<!-- Categories -->
		<section class="mb-10">
			<div class="flex justify-between items-center mb-4">
				<h2 class="text-lg font-bold text-slate-900 dark:text-white">Categorías</h2>
			</div>
			<div class="grid grid-cols-4 gap-3">
				<button class="flex flex-col items-center gap-2 group">
					<div class="w-16 h-16 rounded-2xl bg-white dark:bg-[#1a2329] border border-slate-100 dark:border-white/5 flex items-center justify-center text-primary dark:text-blue-400 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary dark:group-hover:text-white transition-all shadow-sm">
						<span class="material-icons-round">apartment</span>
					</div>
					<span class="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-white transition-colors">Deptos</span>
				</button>
				<button class="flex flex-col items-center gap-2 group">
					<div class="w-16 h-16 rounded-2xl bg-white dark:bg-[#1a2329] border border-slate-100 dark:border-white/5 flex items-center justify-center text-primary dark:text-blue-400 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary dark:group-hover:text-white transition-all shadow-sm">
						<span class="material-icons-round">home</span>
					</div>
					<span class="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-white transition-colors">Casas</span>
				</button>
				<button class="flex flex-col items-center gap-2 group">
					<div class="w-16 h-16 rounded-2xl bg-white dark:bg-[#1a2329] border border-slate-100 dark:border-white/5 flex items-center justify-center text-primary dark:text-blue-400 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary dark:group-hover:text-white transition-all shadow-sm">
						<span class="material-icons-round">factory</span>
					</div>
					<span class="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-white transition-colors">Industrial</span>
				</button>
				<button class="flex flex-col items-center gap-2 group">
					<div class="w-16 h-16 rounded-2xl bg-white dark:bg-[#1a2329] border border-slate-100 dark:border-white/5 flex items-center justify-center text-primary dark:text-blue-400 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary dark:group-hover:text-white transition-all shadow-sm">
						<span class="material-icons-round">terrain</span>
					</div>
					<span class="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-white transition-colors">Terrenos</span>
				</button>
			</div>
		</section>

		<!-- Horizontal Property List -->
		<section class="mb-10">
			<div class="flex justify-between items-end mb-5">
				<div>
					<h2 class="text-xl font-bold text-slate-900 dark:text-white leading-tight">Propiedades que<br />se adaptan a ti</h2>
				</div>
				<button class="text-brand-green font-bold text-sm hover:underline">Ver todo</button>
			</div>
			<div class="flex overflow-x-auto gap-5 pb-6 -mx-6 px-6 hide-scrollbar snap-x snap-mandatory">
				<!-- Card 1 -->
				<div class="min-w-[280px] snap-center bg-white dark:bg-[#1a2329] rounded-2xl shadow-soft dark:shadow-none overflow-hidden group border border-slate-100 dark:border-white/5">
					<div class="relative h-48">
						<img alt="Modern luxury house exterior with glass facade" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_um7AoWFMGRRjxphBbRPXVNylw8AOJD06wRJc6agvKlRaOl4EfeWObA9nHnEx7kqkb8TrLaP_maCxATrd51TF1F21TRtKRIAJZPBNgxTiL6_6ya0aQg4ALaQF4zDiwOzn0w3lnxfATZTpZqvCouxnM58i6QEiGxNgmtgvvfd6YGe0TK8A6y1KGZ2PHusMo0nqKDQOHJufTbVk-LQOgAf_Ape9kN0UEyMWgrCxK3od876qZlMpfv6fEnLfhYw75AW7SE196LJJaAMw" />
						<div class="absolute top-3 left-3 bg-brand-green/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1">
							<span class="material-icons-round text-[14px]">local_fire_department</span>
							Hot Offer
						</div>
						<button class="absolute top-3 right-3 bg-white/30 backdrop-blur-md p-1.5 rounded-full hover:bg-white transition-colors">
							<span class="material-icons-round text-white hover:text-red-500 text-[20px]">favorite</span>
						</button>
						<div class="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1">
							<span class="material-icons-round text-[14px]">location_on</span>
							San Isidro
						</div>
					</div>
					<div class="p-4">
						<div class="flex justify-between items-start mb-2">
							<h3 class="font-bold text-slate-900 dark:text-white text-lg truncate pr-2">Casa Moderna Jardines</h3>
							<div class="flex items-center gap-1">
								<span class="material-icons-round text-yellow-500 text-[16px]">star</span>
								<span class="text-xs font-bold text-slate-700 dark:text-slate-300">4.8</span>
							</div>
						</div>
						<p class="text-primary dark:text-blue-300 font-extrabold text-xl mb-4">$450,000</p>
						<div class="flex items-center justify-between border-t border-slate-100 dark:border-white/10 pt-3">
							<div class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
								<span class="material-icons-round text-[18px]">bed</span>
								<span class="text-xs font-bold">4</span>
							</div>
							<div class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
								<span class="material-icons-round text-[18px]">bathtub</span>
								<span class="text-xs font-bold">3</span>
							</div>
							<div class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
								<span class="material-icons-round text-[18px]">square_foot</span>
								<span class="text-xs font-bold">320m²</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Card 2 -->
				<div class="min-w-[280px] snap-center bg-white dark:bg-[#1a2329] rounded-2xl shadow-soft dark:shadow-none overflow-hidden group border border-slate-100 dark:border-white/5">
					<div class="relative h-48">
						<img alt="Bright modern apartment living room interior" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-m_N2hOcB3Qjo4JJrstpySMCx216nte_pd4jvLLgfvoK-6nvxrRlUvr70YtsfxN8_7Kgg0eoK1jD2bHdpyLQXHWpCfNk73ngPqjb5TiyUGL7TnJQ2OX5pBPH1IQGYZi-ORqXvwYTCiSAPpXZ-f3CaCqgkj3dDkf-UHjmrUHpoBrx-jvFmx51Pn2Z_expxo3kvoBT-OfjIy7FjgwBKWOygvV7kkAdjg55hf9VdZYhL1AsUB6WxAyA9sPVpCFw4toBRVURMIWDo0el2" />
						<div class="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
							Nuevo
						</div>
						<button class="absolute top-3 right-3 bg-white/30 backdrop-blur-md p-1.5 rounded-full hover:bg-white transition-colors">
							<span class="material-icons-round text-white hover:text-red-500 text-[20px]">favorite_border</span>
						</button>
						<div class="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1">
							<span class="material-icons-round text-[14px]">location_on</span>
							Miraflores
						</div>
					</div>
					<div class="p-4">
						<div class="flex justify-between items-start mb-2">
							<h3 class="font-bold text-slate-900 dark:text-white text-lg truncate pr-2">Loft Urbano Central</h3>
							<div class="flex items-center gap-1">
								<span class="material-icons-round text-yellow-500 text-[16px]">star</span>
								<span class="text-xs font-bold text-slate-700 dark:text-slate-300">4.5</span>
							</div>
						</div>
						<p class="text-primary dark:text-blue-300 font-extrabold text-xl mb-4">$1,200 <span class="text-sm font-medium text-slate-400 dark:text-slate-500">/mes</span></p>
						<div class="flex items-center justify-between border-t border-slate-100 dark:border-white/10 pt-3">
							<div class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
								<span class="material-icons-round text-[18px]">bed</span>
								<span class="text-xs font-bold">2</span>
							</div>
							<div class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
								<span class="material-icons-round text-[18px]">bathtub</span>
								<span class="text-xs font-bold">1</span>
							</div>
							<div class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
								<span class="material-icons-round text-[18px]">square_foot</span>
								<span class="text-xs font-bold">85m²</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Card 3 -->
				<div class="min-w-[280px] snap-center bg-white dark:bg-[#1a2329] rounded-2xl shadow-soft dark:shadow-none overflow-hidden group border border-slate-100 dark:border-white/5">
					<div class="relative h-48">
						<img alt="Luxury villa with pool and large garden" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJEOYlsb06nAQDpU3IPRjXopll03bfQvwUTT4cnTwVzo6qH9h3GdRpNKXEQgSBKPxCL_rOwQXekt8TwXEkFoWjeL4ik5DisxJT4tzWwjsLcCFJ0JAoZFSSI2NB--fUVH8ygbqxXtvTDCm-lrp-2qFrQ-AD-34N0a8_L03y9JdfouCRbQ1Nf0tzOyKdB9Iixy-aRNVLVHDNyZjm5gKt6Ycl9zddT51Xh3pJhIK1oWkz1Y7rP98L3zYNiERf_yWk7gYj2cMFSXcmtT3x" />
						<button class="absolute top-3 right-3 bg-white/30 backdrop-blur-md p-1.5 rounded-full hover:bg-white transition-colors">
							<span class="material-icons-round text-white hover:text-red-500 text-[20px]">favorite_border</span>
						</button>
						<div class="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1">
							<span class="material-icons-round text-[14px]">location_on</span>
							La Molina
						</div>
					</div>
					<div class="p-4">
						<div class="flex justify-between items-start mb-2">
							<h3 class="font-bold text-slate-900 dark:text-white text-lg truncate pr-2">Residencia Los Olivos</h3>
							<div class="flex items-center gap-1">
								<span class="material-icons-round text-yellow-500 text-[16px]">star</span>
								<span class="text-xs font-bold text-slate-700 dark:text-slate-300">5.0</span>
							</div>
						</div>
						<p class="text-primary dark:text-blue-300 font-extrabold text-xl mb-4">$890,000</p>
						<div class="flex items-center justify-between border-t border-slate-100 dark:border-white/10 pt-3">
							<div class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
								<span class="material-icons-round text-[18px]">bed</span>
								<span class="text-xs font-bold">5</span>
							</div>
							<div class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
								<span class="material-icons-round text-[18px]">bathtub</span>
								<span class="text-xs font-bold">4</span>
							</div>
							<div class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
								<span class="material-icons-round text-[18px]">square_foot</span>
								<span class="text-xs font-bold">450m²</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Project Section -->
		<section class="mb-4">
			<h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">Proyectos Destacados</h2>
			<div class="flex flex-col gap-4">
				<!-- Project Card 1 -->
				<div class="relative w-full h-64 rounded-2xl overflow-hidden group shadow-lg">
					<img alt="High rise building with balconies and trees" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2yUSLID88df6vOSVgc_RmJUG6fCNpanTEkAFtJyDd4NfY5KzSZmawNDx8KyVRnH8m560Y7IMjCx-YJGPZrC-TCJ0VXzey0nbnuefTCG0StBFd4FaAH-oL3Df1T24j4llTIdTQJlPsYknMmiwYrgV66PdhWegYDkdn-MVkxcJbFQNQgfS6Qvg-cWWcdzGqgO7x8hlWs9ZmUXDx1hjW6HR7nGBk-VhyAKVZJxCSw4O9McWuHsy2tUPiNFmPSOvl0_wbq--0aj0bO8aK" />
					<div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
					<div class="absolute bottom-0 left-0 p-5 w-full">
						<div class="flex justify-between items-end">
							<div>
								<span class="bg-brand-green text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">Pre-venta Exclusiva</span>
								<h3 class="text-white text-2xl font-bold mb-1">Los Cerezos</h3>
								<p class="text-slate-200 text-sm font-medium">Desde $120,000 • Entrega 2025</p>
							</div>
							<button class="bg-white text-primary w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
								<span class="material-icons-round">arrow_forward</span>
							</button>
						</div>
					</div>
				</div>

				<!-- Project Card 2 -->
				<div class="relative w-full h-64 rounded-2xl overflow-hidden group shadow-lg">
					<img alt="Modern corporate glass building skyscraper" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc_9E9bXGBhAAuohFLl3RfsZOR3YZ947rOIoax9Yco40EGgQkoTmdPup_KcwaFI4UIdvEukL9-eR5Y2TvRnuIMIekU0c8qHIyfVjQQfuY3NR8Klbz3mh-0OJDBV2n1yTGIQgj1z_M_N6HORbKavzNJbDUChvZF8_pT5RErCgeclml0qpRSf50lIqNxu37HhJvZ7KEPiI5P_71hqEgdSHO_ZAQeiqSDo5656blJ86as1NCqbGKeuTIIVVzNtsmrYtXkWI2ihh745QrQ" />
					<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
					<div class="absolute bottom-0 left-0 p-5 w-full">
						<div class="flex justify-between items-end">
							<div>
								<span class="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">Entrega Inmediata</span>
								<h3 class="text-white text-2xl font-bold mb-1">Central Park</h3>
								<p class="text-slate-200 text-sm font-medium">Oficinas Premium • San Isidro</p>
							</div>
							<button class="bg-white text-primary w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
								<span class="material-icons-round">arrow_forward</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>

	<!-- Footer -->
	<Footer />

	<!-- Bottom Navigation -->
	<nav class="fixed bottom-0 left-0 w-full bg-white dark:bg-[#121a20] border-t border-slate-100 dark:border-white/5 pb-5 pt-3 px-6 z-50">
		<ul class="flex justify-between items-center">
			<li>
				<a class="flex flex-col items-center gap-1 group" href="/">
					<div class="p-1 rounded-xl bg-primary/10 dark:bg-primary/20 transition-colors">
						<span class="material-icons-round text-primary dark:text-blue-400">home</span>
					</div>
					<span class="text-[10px] font-bold text-primary dark:text-blue-400">Inicio</span>
				</a>
			</li>
			<li>
				<a class="flex flex-col items-center gap-1 group" href="/buscar">
					<div class="p-1 rounded-xl group-hover:bg-slate-50 dark:group-hover:bg-white/5 transition-colors">
						<span class="material-icons-round text-slate-400 group-hover:text-primary dark:group-hover:text-white transition-colors">search</span>
					</div>
					<span class="text-[10px] font-medium text-slate-400 group-hover:text-primary dark:group-hover:text-white transition-colors">Buscar</span>
				</a>
			</li>
			<li class="-mt-8">
				<button class="w-14 h-14 bg-brand-green rounded-full shadow-lg shadow-brand-green/30 flex items-center justify-center text-white hover:scale-105 transition-transform">
					<span class="material-icons-round text-2xl">add</span>
				</button>
			</li>
			<li>
				<a class="flex flex-col items-center gap-1 group" href="/servicios">
					<div class="p-1 rounded-xl group-hover:bg-slate-50 dark:group-hover:bg-white/5 transition-colors">
						<span class="material-icons-round text-slate-400 group-hover:text-primary dark:group-hover:text-white transition-colors">favorite_border</span>
					</div>
					<span class="text-[10px] font-medium text-slate-400 group-hover:text-primary dark:group-hover:text-white transition-colors">Favoritos</span>
				</a>
			</li>
			<li>
				<a class="flex flex-col items-center gap-1 group" href="/contacto">
					<div class="p-1 rounded-xl group-hover:bg-slate-50 dark:group-hover:bg-white/5 transition-colors">
						<span class="material-icons-round text-slate-400 group-hover:text-primary dark:group-hover:text-white transition-colors">person_outline</span>
					</div>
					<span class="text-[10px] font-medium text-slate-400 group-hover:text-primary dark:group-hover:text-white transition-colors">Perfil</span>
				</a>
			</li>
		</ul>
	</nav>
</div>
