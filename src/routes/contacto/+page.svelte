<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let isLoggedIn = $state(false);
	
	const handleGoogleLogin = () => {
		// Aquí se implementaría la lógica de login con Google
		console.log('Iniciando sesión con Google...');
	};
</script>

<svelte:head>
	<title>Mi Perfil - Hyper House Inmobiliaria</title>
</svelte:head>

<div class="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-100 antialiased selection:bg-brand-green selection:text-white min-h-screen">
	<Header />

	<main class="max-w-2xl mx-auto px-6 pt-8 pb-32">
		{#if !isLoggedIn}
			<!-- Login Section -->
			<section class="text-center py-16">
				<div class="mb-8">
					<div class="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
						<span class="material-icons-round text-primary dark:text-blue-400 text-5xl">person</span>
					</div>
					<h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
						Bienvenido a tu<br />
						<span class="text-primary dark:text-blue-400">cuenta Hyper House</span>
					</h1>
					<p class="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
						Inicia sesión para acceder a tus propiedades favoritas, historial de búsquedas y más
					</p>
				</div>

				<!-- Google Login Button -->
				<div class="max-w-md mx-auto space-y-4">
					<button
						onclick={handleGoogleLogin}
						class="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
					>
						<svg class="w-6 h-6" viewBox="0 0 24 24">
							<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
							<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
							<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
							<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
						</svg>
						<span class="text-slate-700 dark:text-slate-200 font-bold text-base">
							Continuar con Google
						</span>
					</button>

					<div class="relative py-4">
						<div class="absolute inset-0 flex items-center">
							<div class="w-full border-t border-slate-200 dark:border-slate-700"></div>
						</div>
						<div class="relative flex justify-center">
							<span class="px-4 bg-background-light dark:bg-background-dark text-sm text-slate-500">
								O continúa explorando
							</span>
						</div>
					</div>

					<a
						href="/buscar"
						class="block w-full px-6 py-4 bg-brand-green hover:bg-[#3d9162] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
					>
						<div class="flex items-center justify-center gap-2">
							<span class="material-icons-round">search</span>
							Buscar Propiedades
						</div>
					</a>
				</div>

				<!-- Benefits Section -->
				<div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
					<div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
						<div class="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-4">
							<span class="material-icons-round text-primary dark:text-blue-400">favorite</span>
						</div>
						<h3 class="font-bold text-slate-900 dark:text-white mb-2">Favoritos</h3>
						<p class="text-sm text-slate-600 dark:text-slate-400">
							Guarda tus propiedades favoritas y accede a ellas cuando quieras
						</p>
					</div>

					<div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
						<div class="w-12 h-12 bg-brand-green/10 dark:bg-brand-green/20 rounded-xl flex items-center justify-center mb-4">
							<span class="material-icons-round text-brand-green">history</span>
						</div>
						<h3 class="font-bold text-slate-900 dark:text-white mb-2">Historial</h3>
						<p class="text-sm text-slate-600 dark:text-slate-400">
							Revisa tu historial de búsquedas y propiedades vistas
						</p>
					</div>

					<div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
						<div class="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-4">
							<span class="material-icons-round text-primary dark:text-blue-400">notifications</span>
						</div>
						<h3 class="font-bold text-slate-900 dark:text-white mb-2">Alertas</h3>
						<p class="text-sm text-slate-600 dark:text-slate-400">
							Recibe notificaciones de nuevas propiedades que te interesan
						</p>
					</div>
				</div>
			</section>
		{/if}
	</main>

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
					<div class="p-1 rounded-xl group-hover:bg-slate-50 dark:group-hover:bg-white/5 transition-colors">
						<span class="material-icons-round text-slate-400 group-hover:text-primary dark:group-hover:text-white transition-colors">business_center</span>
					</div>
					<span class="text-[10px] font-medium text-slate-400 group-hover:text-primary dark:group-hover:text-white transition-colors">Servicios</span>
				</a>
			</li>
			<li>
				<a class="flex flex-col items-center gap-1 group" href="/contacto">
					<div class="p-1 rounded-xl bg-primary/10 dark:bg-primary/20 transition-colors">
						<span class="material-icons-round text-primary dark:text-blue-400">person_outline</span>
					</div>
					<span class="text-[10px] font-bold text-primary dark:text-blue-400">Perfil</span>
				</a>
			</li>
		</ul>
	</nav>
</div>
