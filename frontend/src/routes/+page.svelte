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
	}

	.rec-header a {
		color: var(--logo-green);
		text-decoration: none;
		font-size: 13px;
		font-weight: 600;
	}

	.rec-scroll-container {
		display: flex;
		gap: 16px;
		overflow-x: auto;
		padding-bottom: 12px;
		padding-right: 24px;
		scrollbar-width: none;
	}

	.rec-scroll-container::-webkit-scrollbar {
		display: none;
	}

	.projects-section {
		padding: 0 24px;
		margin-bottom: 24px;
	}

	.resources-section {
		padding: 0 24px;
		margin-bottom: 24px;
	}

	.resources-grid {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	@media (min-width: 768px) {
		.resources-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 16px;
		}
	}

	/* ── Fade-in cuando las tarjetas reales aparecen (igual que carga.html) ── */
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
</style>
