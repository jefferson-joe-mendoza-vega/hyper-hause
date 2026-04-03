<script>
	import SearchCard from '$lib/components/SearchCard.svelte';
	import Categories from '$lib/components/Categories.svelte';
	import PropertyCard from '$lib/components/PropertyCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ResourceBox from '$lib/components/ResourceBox.svelte';

	const properties = [
		{
			slug: 'prada-residencias',
			title: 'xd 2 Prada Residenci...',
			price: 'S/ 479,000',
			bedrooms: 3,
			bathrooms: 3,
			area: '200m²',
			image:
				'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=500&q=80',
			badge: 'Nuevo',
			badgeType: 'green',
			location: 'Av. Tizón y Bueno 639, Jesus M...',
			type: 'Alquilar'
		},
		{
			slug: 'casa-verde-premium',
			title: 'casa verde premium',
			price: 'S/ 187,300',
			bedrooms: 1,
			bathrooms: 1,
			area: '65m²',
			image:
				'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=500&q=80',
			badge: 'Última u...',
			badgeType: 'orange',
			location: 'Calle Italia 120, Miraflores',
			type: 'Alquilar'
		}
	];

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
		<a href="#">Ver todo</a>
	</div>

	<div class="rec-scroll-container">
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
	<ResourceBox
		icon="fas fa-bars"
		title="Centro de Recursos"
		description="Guías, consejos e información sobre inversión inmobiliaria."
	/>
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
</style>
