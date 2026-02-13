<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ServiceCard from './componentes/ServiceCard.svelte';

	const services = [
		{
			id: 1,
			icon: 'gavel',
			title: 'Asesoría Legal',
			description: 'Asesoría legal especializada en operaciones inmobiliarias para garantizar transacciones seguras y sin contratiempos.',
			color: 'primary'
		},
		{
			id: 2,
			icon: 'assessment',
			title: 'Evaluación de Riesgo',
			description: 'Realizamos una evaluación legal, comercial y técnica para tus inversiones. Para así tomar decisiones con confianza.',
			color: 'brand-green'
		},
		{
			id: 3,
			icon: 'key',
			title: 'Compra/Venta y Alquiler',
			description: 'Te acompañamos en todo el proceso de compra/venta o alquiler de tu propiedad, con asesoría personalizada y eficiente.',
			color: 'primary'
		},
		{
			id: 4,
			icon: 'verified',
			title: 'Saneamiento Físico Legal',
			description: 'Regularizamos propiedades para que cumplan con todos los requisitos legales y puedan venderse, alquilarse o heredarse sin problemas.',
			color: 'brand-green'
		}
	];
</script>

<svelte:head>
	<title>Nuestros Servicios - Hyper House Inmobiliaria</title>
</svelte:head>

<div class="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-100 antialiased selection:bg-brand-green selection:text-white">
	<Header />

	<main class="max-w-7xl mx-auto px-6 pt-8 pb-24">
		<!-- Hero Section -->
		<section class="text-center mb-16">
			<div class="inline-flex items-center gap-2 bg-brand-green/10 dark:bg-brand-green/20 text-brand-green px-5 py-2 rounded-full mb-6">
				<span class="material-icons-round text-xl">business_center</span>
				<span class="text-sm font-bold uppercase tracking-wider">Nuestros Servicios</span>
			</div>
			<h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
				Servicios Integrales<br />
				<span class="text-primary dark:text-blue-400">para tu Propiedad</span>
			</h1>
			<p class="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
				Ofrecemos un servicio integral para acompañarte en todo el proceso inmobiliario. Desde el análisis legal y comercial, hasta la gestión completa de compra/venta, alquiler y también regularización de tu propiedad. Nuestro enfoque combina experiencia técnica, visión estratégica y atención personalizada para brindarte seguridad en cada decisión.
			</p>
		</section>

		<!-- Services Grid -->
		<section class="mb-16">
			<div class="flex justify-between items-center mb-8">
				<h2 class="text-2xl font-bold text-slate-900 dark:text-white">Servicios Destacados</h2>
				<button class="text-brand-green font-bold text-sm hover:underline flex items-center gap-1">
					Ver todos
					<span class="material-icons-round text-lg">arrow_forward</span>
				</button>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each services as service (service.id)}
					<ServiceCard {service} />
				{/each}
			</div>
		</section>

		<!-- Why Choose Us Section -->
		<section class="bg-white dark:bg-slate-800 rounded-3xl shadow-soft dark:shadow-none border border-slate-100 dark:border-slate-700 p-8 md:p-12 mb-16">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
					¿Por qué elegirnos?
				</h2>
				<p class="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
					Nos destacamos por nuestro compromiso, experiencia y atención personalizada
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div class="text-center">
					<div class="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
						<span class="material-icons-round text-primary dark:text-blue-400 text-3xl">shield</span>
					</div>
					<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Seguridad Garantizada</h3>
					<p class="text-sm text-slate-600 dark:text-slate-400">
						Todas nuestras transacciones están respaldadas legalmente con total transparencia
					</p>
				</div>

				<div class="text-center">
					<div class="w-16 h-16 bg-brand-green/10 dark:bg-brand-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
						<span class="material-icons-round text-brand-green text-3xl">groups</span>
					</div>
					<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Equipo Experto</h3>
					<p class="text-sm text-slate-600 dark:text-slate-400">
						Profesionales con años de experiencia en el mercado inmobiliario
					</p>
				</div>

				<div class="text-center">
					<div class="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
						<span class="material-icons-round text-primary dark:text-blue-400 text-3xl">support_agent</span>
					</div>
					<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Atención 24/7</h3>
					<p class="text-sm text-slate-600 dark:text-slate-400">
						Estamos disponibles para atender tus consultas en cualquier momento
					</p>
				</div>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-blue-700 dark:from-primary dark:to-blue-900 p-8 md:p-12 text-white text-center">
			<div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
			<div class="relative z-10">
				<h2 class="text-3xl md:text-4xl font-extrabold mb-4">
					¿Listo para empezar?
				</h2>
				<p class="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
					Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos inmobiliarios
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href="/contacto"
						class="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
					>
						<span class="material-icons-round">phone</span>
						Contactar Ahora
					</a>
					<a
						href="/buscar"
						class="px-8 py-4 bg-brand-green hover:bg-[#3d9162] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
					>
						<span class="material-icons-round">search</span>
						Buscar Propiedades
					</a>
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
					<div class="p-1 rounded-xl group-hover:bg-slate-50 dark:group-hover:bg-white/5 transition-colors">
						<span class="material-icons-round text-slate-400 group-hover:text-primary dark:group-hover:text-white transition-colors">home</span>
					</div>
					<span class="text-[10px] font-medium text-slate-400 group-hover:text-primary dark:group-hover:text-white transition-colors">Inicio</span>
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
					<div class="p-1 rounded-xl bg-primary/10 dark:bg-primary/20 transition-colors">
						<span class="material-icons-round text-primary dark:text-blue-400">business_center</span>
					</div>
					<span class="text-[10px] font-bold text-primary dark:text-blue-400">Servicios</span>
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
