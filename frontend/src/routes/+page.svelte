<script>
	import { onMount } from 'svelte';
	import SearchCard from '$lib/components/SearchCard.svelte';
	import Categories from '$lib/components/Categories.svelte';
	import PropertyCard from '$lib/components/PropertyCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ResourceBox from '$lib/components/ResourceBox.svelte';
	import LoadingPropertySkeleton from '$lib/components/LoadingPropertySkeleton.svelte';
	import { fetchRecomendadas } from '$lib/services/recomendaciones.js';

	// ── Estado de recomendaciones ──────────────────────────────────────────────
	let properties = $state([]);
	let loadingRec = $state(true);

	onMount(async () => {
		properties = await fetchRecomendadas(10);
		loadingRec = false;
	});

	// ── Proyectos (estáticos por ahora) ───────────────────────────────────────
	const projects = [
		{
			badge: 'COMPRAR UNIDAD',
			title: 'Los Cerezos',
			description: 'Desde $120,000 • Entrega 2025',
			image:
				'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80'
		},
		{
			badge: 'SEPARAR UNIDAD',
			title: 'Central Park',
			description: 'Oficinas Premium • San Isidro',
			image:
				'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
		}
	];
</script>

<section class="hero">
	<h1>
		Encuentra tu<br />
		<span>propiedad ideal</span>
	</h1>
</section>

<div class="px-24 mb-16">
	<SearchCard />
</div>

<Categories />

<section class="recommendations-section">
	<div class="rec-header">
		<h2 class="section-title" style="margin: 0;">
			Nuestras<br />recomendaciones
		</h2>
		<a href="/propiedades">Ver todo</a>
	</div>

	{#if loadingRec}
		<!-- Skeleton shimmer mientras carga (igual que carga.html) -->
		<LoadingPropertySkeleton count={3} />
	{:else}
		<div class="rec-scroll-container cards-fadein">
			{#each properties as property}
				<PropertyCard
					slug={property.slug}
					title={property.title}
					price={property.price}
					bedrooms={property.bedrooms}
					bathrooms={property.bathrooms}
					area={property.area}
					image={property.image}
					badge={property.badge}
					badgeType={property.badgeType}
					badgeColor={property.badgeColor}
					location={property.location}
					type={property.type}
				/>
			{/each}
		</div>
	{/if}
</section>

<section class="projects-section">
	<h2 class="section-title">Proyectos Destacados</h2>

	{#each projects as project}
		<ProjectCard
			badge={project.badge}
			title={project.title}
			description={project.description}
			image={project.image}
		/>
	{/each}
</section>

<section class="resources-section">
	<h2 class="section-title">Centro de Recursos</h2>
	<div class="resources-grid">
		<ResourceBox
			icon="fas fa-chart-line"
			title="Blog Inmobiliario"
			description="Novedades, tendencias y análisis del mercado inmobiliario."
			iconBg="#eef2ff"
			iconColor="#4f46e5"
			href="/blog"
		/>
		<ResourceBox
			icon="fas fa-headset"
			title="Asesoría Especializada"
			description="Consulta gratis con nuestros expertos en inversión inmobiliaria."
			iconBg="#fff7ed"
			iconColor="#f59e0b"
			href="/asesoria"
		/>
		<ResourceBox
			icon="fas fa-newspaper"
			title="Centro de Recursos"
			description="Guías, consejos e información sobre inversión inmobiliaria."
			iconBg="#e6fbf2"
			iconColor="var(--logo-green)"
			href="/recursos"
		/>
	</div>
</section>

<style>
	.hero {
		padding: 24px 24px 20px;
	}

	.hero h1 {
		color: var(--text-main);
		font-size: 28px;
		font-weight: 700;
		line-height: 1.25;
		letter-spacing: -0.5px;
		margin: 0;
	}

	.hero h1 span {
		color: var(--text-blue);
	}

	.recommendations-section {
		padding-left: 24px;
		margin-bottom: 32px;
	}

	.rec-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding-right: 24px;
		margin-bottom: 16px;
		gap: 16px;
	}

	.rec-header h2 {
		margin: 0;
		font-size: 18px;
		font-weight: 600;
		line-height: 1.3;
	}

	.rec-header a {
		color: var(--logo-green);
		text-decoration: none;
		font-size: 13px;
		font-weight: 600;
		white-space: nowrap;
		padding: 6px 12px;
		border-radius: 8px;
		transition: all 0.3s;
	}

	.rec-header a:hover {
		background: rgba(0, 208, 132, 0.1);
	}

	.rec-scroll-container {
		display: flex;
		gap: 16px;
		overflow-x: auto;
		padding-bottom: 12px;
		padding-right: 24px;
		scrollbar-width: thin;
		scrollbar-color: var(--border-color) transparent;
	}

	.rec-scroll-container::-webkit-scrollbar {
		height: 4px;
	}

	.rec-scroll-container::-webkit-scrollbar-track {
		background: transparent;
	}

	.rec-scroll-container::-webkit-scrollbar-thumb {
		background: var(--border-color);
		border-radius: 2px;
	}

	.projects-section {
		padding: 0 24px;
		margin-bottom: 24px;
	}

	.projects-section .section-title {
		margin: 0 0 16px 0;
	}

	.resources-section {
		padding: 0 24px;
		margin-bottom: 24px;
	}

	.resources-section .section-title {
		margin: 0 0 16px 0;
	}

	.resources-grid {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	@media (min-width: 640px) {
		.hero {
			padding: 28px 28px 24px;
		}

		.hero h1 {
			font-size: 32px;
		}

		.recommendations-section {
			padding: 0 28px;
			margin-bottom: 32px;
		}

		.rec-header {
			padding: 0;
			margin-bottom: 20px;
		}

		.rec-header h2 {
			font-size: 20px;
		}

		.projects-section {
			padding: 0 28px;
			margin-bottom: 32px;
		}

		.resources-section {
			padding: 0 28px;
			margin-bottom: 32px;
		}

		.resources-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 16px;
		}
	}

	@media (min-width: 768px) {
		.hero {
			padding: 40px 48px 32px;
		}

		.hero h1 {
			font-size: 44px;
			line-height: 1.2;
		}

		.recommendations-section {
			padding: 0 48px;
			margin-bottom: 48px;
		}

		.rec-header {
			margin-bottom: 28px;
			align-items: center;
		}

		.rec-header h2 {
			font-size: 24px;
		}

		.rec-header a {
			font-size: 14px;
		}

		.rec-scroll-container {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
			gap: 20px;
			overflow: visible;
			padding: 0;
			scrollbar-width: none;
		}

		.rec-scroll-container::-webkit-scrollbar {
			display: none;
		}

		.projects-section {
			padding: 0 48px;
			margin-bottom: 48px;
		}

		.resources-section {
			padding: 0 48px;
			margin-bottom: 48px;
		}

		.resources-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 20px;
		}
	}

	@media (min-width: 1024px) {
		.hero {
			padding: 60px 80px 40px;
		}

		.hero h1 {
			font-size: 52px;
			line-height: 1.15;
			letter-spacing: -1.5px;
			max-width: 700px;
		}

		.recommendations-section {
			padding: 0 80px;
			margin-bottom: 64px;
		}

		.rec-header {
			margin-bottom: 32px;
		}

		.rec-header h2 {
			font-size: 28px;
			line-height: 1.2;
		}

		.rec-header a {
			font-size: 15px;
			padding: 8px 16px;
		}

		.rec-scroll-container {
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			gap: 24px;
		}

		.projects-section {
			padding: 0 80px;
			margin-bottom: 64px;
		}

		.resources-section {
			padding: 0 80px;
			margin-bottom: 80px;
		}

		.resources-grid {
			gap: 28px;
		}
	}

	@media (min-width: 1440px) {
		.hero {
			padding: 80px 100px 50px;
		}

		.hero h1 {
			font-size: 60px;
			letter-spacing: -2px;
			max-width: 800px;
		}

		.recommendations-section {
			padding: 0 100px;
			margin-bottom: 80px;
		}

		.rec-header h2 {
			font-size: 32px;
		}

		.rec-scroll-container {
			grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
			gap: 32px;
		}

		.projects-section {
			padding: 0 100px;
			margin-bottom: 80px;
		}

		.resources-section {
			padding: 0 100px;
			margin-bottom: 100px;
		}

		.resources-grid {
			gap: 32px;
		}

		.cards-fadein {
			animation: fadeInCards 0.5s ease-in;
		}

		@keyframes fadeInCards {
			from {
				opacity: 0;
				transform: translateY(10px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}
	}
</style>
