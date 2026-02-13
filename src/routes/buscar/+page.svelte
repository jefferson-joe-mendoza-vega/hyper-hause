<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FilterPanel from './componentes/FilterPanel.svelte';
	import PropertyCard from './componentes/PropertyCard.svelte';
	import QuickFilters from './componentes/QuickFilters.svelte';

	const properties = [
		{
			id: 1,
			title: 'Penthouse con Vista al Mar',
			description: 'Exclusivo departamento con acabados de lujo, terraza amplia y zona de parrilla.',
			location: 'Miraflores, Lima',
			type: 'Venta',
			price: 345000,
			bedrooms: 3,
			bathrooms: 3,
			parking: 2,
			area: 180,
			image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChZsZPlwNRIXL9IWjflvchjN-zXoncKpPAGOsap5fnJ-m1X1fEoxHfH9aNk-EMZCiGAo9zQK7ZT_PUfhijyEpp98PmpkZ2fkIo9cbi9R7c329OvSENdf0vB8j2sedbGAXSjw1FpqpNS20QTHDBV31WjUlXIN1dJhyR-l3onx7JHjOKNQAC7jqJIX4nO17EBznOKtrBEjVZGgGGEk2BzMXf6NtyhfWIN0fPAFC_bnxYtMq2Cuz-hxz2nnXQBgAWhwRPzhFdQwwyViod'
		},
		{
			id: 2,
			title: 'Residencia Familiar Clásica',
			description: 'Amplia casa con jardín privado, cerca a parques y centro financiero.',
			location: 'San Isidro, Lima',
			type: 'Oportunidad',
			price: 580000,
			bedrooms: 4,
			bathrooms: 3.5,
			parking: 2,
			area: 250,
			image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCSiPzzl0fygjOnjWK0rsYQNtgi2vaUmmniPim0ggpPb0dFi9eQX9h8FFhYjfjvQMPiVsX_4mQnjdPK8GZjbNCAviudCKzND1BGyV4dyqtoOzdjnrEpCcXoe41kcLa4b9J5XqQmkPCHeGtqKT50wo4Ww5A8UsPrcb04Enskzr3Hxajbi_TC9Xn0EFJMW6uifSLp3byEDXoU6Zj1BY8IeeSUuuhnE9PmWLalnhJNmyKV_rdvsuNKKShUY-c1PPZjMmb2UWjMzOtYsYx'
		},
		{
			id: 3,
			title: 'Loft Artístico en Barranco',
			description: 'Espacio abierto ideal para solteros o parejas jóvenes, estilo industrial.',
			location: 'Barranco, Lima',
			type: 'Alquiler',
			price: 850,
			isRental: true,
			bedrooms: 1,
			bathrooms: 1,
			parking: 0,
			area: 75,
			image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC222cIud72YLhGwQXAtA0gjeHNmRBJUYZvxi3PhnSltV9P-kpLxnDrVn1rtWy5uZNIgefuUQtzeeWWtos2Fv63na3ziuvcEafRo-Upc_WDJosgwHh1gHjL2e8TzubGRiiy40M99tfIWDOhaeiLdLr6iPw80CuVtMznwDT9tx6VIey4f5B_SZd35yr5uGvrY3p17symJxF5-YAvOm5fSfRZvrpwK90Cb78M0GvFEOpENfdJjQUAfVfdTrSVkciEqcgMGlWP1iMXlEXR'
		}
	];

	let searchQuery = '';
</script>

<svelte:head>
	<title>Buscar Propiedades - Hyper House Inmobiliaria</title>
</svelte:head>

<!-- iOS Status Bar Placeholder -->
<div class="h-12 w-full bg-background-light dark:bg-background-dark fixed top-0 z-50"></div>

<Header />

<!-- Main Container -->
<main class="w-full max-w-md mx-auto relative min-h-screen pb-24 pt-4">
	<!-- Search Section -->
	<section class="px-5 pt-2 pb-4">

		<!-- Search Input -->
		<div class="flex gap-3">
			<div class="flex-1 relative">
				<span class="absolute left-3 top-1/2 -translate-y-1/2 material-icons-outlined text-slate-400">search</span>
				<input
					bind:value={searchQuery}
					class="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400 text-sm font-medium"
					placeholder="Buscar por distrito, calle..."
					type="text"
				/>
			</div>
			<button class="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors active:scale-95">
				<span class="material-icons-outlined">tune</span>
			</button>
		</div>

		<!-- Quick Filters -->
		<QuickFilters />
	</section>

	<!-- Filter Panel -->
	<FilterPanel />

	<!-- Results List -->
	<section class="px-5 mt-6 space-y-6">
		<div class="flex justify-between items-end mb-2">
			<h3 class="text-lg font-bold text-slate-800 dark:text-white">
				Resultados <span class="text-slate-400 font-medium text-base ml-1">({properties.length})</span>
			</h3>
			<div class="flex items-center text-xs font-semibold text-slate-500 cursor-pointer">
				Ordenar por: Recientes <span class="material-icons-round text-sm ml-1">expand_more</span>
			</div>
		</div>

		{#each properties as property (property.id)}
			<PropertyCard {property} />
		{/each}
	</section>
</main>

<!-- Footer -->
<Footer />

<!-- Bottom Navigation Bar -->
<nav class="fixed bottom-0 w-full bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 pb-safe pt-2 z-50">
	<div class="max-w-md mx-auto flex justify-around items-center h-16 pb-4">
		<a href="/" class="flex flex-col items-center justify-center w-16 text-slate-400 hover:text-primary transition-colors">
			<span class="material-icons-outlined text-2xl mb-1">home</span>
			<span class="text-[10px] font-medium">Inicio</span>
		</a>
		<a href="/buscar" class="flex flex-col items-center justify-center w-16 text-primary dark:text-white transition-colors">
			<span class="material-icons-round text-2xl mb-1">search</span>
			<span class="text-[10px] font-bold">Buscar</span>
		</a>
		<a href="/servicios" class="flex flex-col items-center justify-center w-16 text-slate-400 hover:text-primary transition-colors">
			<span class="material-icons-outlined text-2xl mb-1">favorite_border</span>
			<span class="text-[10px] font-medium">Favoritos</span>
		</a>
		<a href="/contacto" class="flex flex-col items-center justify-center w-16 text-slate-400 hover:text-primary transition-colors">
			<span class="material-icons-outlined text-2xl mb-1">person_outline</span>
			<span class="text-[10px] font-medium">Perfil</span>
		</a>
	</div>
</nav>

<!-- Map FAB (Floating Action Button) -->
<div class="fixed bottom-24 right-5 z-40">
	<button class="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-full shadow-xl shadow-slate-900/20 hover:scale-105 transition-transform active:scale-95">
		<span class="material-icons-round text-lg">map</span>
		<span class="text-sm font-bold pr-1">Mapa</span>
	</button>
</div>