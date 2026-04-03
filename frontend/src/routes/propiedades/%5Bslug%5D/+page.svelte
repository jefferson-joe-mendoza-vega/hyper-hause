<script>
	import { page } from '$app/stores';
	import TopBar from '$lib/components/property/TopBar.svelte';
	import HeroGallery from '$lib/components/property/HeroGallery.svelte';
	import FeaturesGrid from '$lib/components/property/FeaturesGrid.svelte';
	import PropertyContent from '$lib/components/property/PropertyContent.svelte';
	import MapSection from '$lib/components/property/MapSection.svelte';
	import './+page.css';

	// Datos de ejemplo - en una app real vendrían de una API
	const propertyData = {
		slug: $page.params.slug,
		title: 'xd 2 Prada Residencial: Departamentos modernos en Jesús María, Lima – Desde S/478,700',
		typeBadge: 'Departamento',
		price: 'USD 479,000',
		location: 'Av. Tizón y Bueno 639, Jesus Maria, Lima, Jesús María, Lima',
		image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
		badge: 'ALQUILAR',
		bedrooms: 3,
		bathrooms: 3,
		parking: 5,
		years: 0,
		description:
			'Prada, proyecto ubicado en la Av. Tizón y Bueno 639 - Jesús María, una de las zonas más residenciales y céntricas de Lima. Donde vivirás cómodamente y conectarás con rapidez con distintos distritos y a un paso de diversos...',
		address: 'Av. Tizón y Bueno 639, Jesus Maria, Lima, Jesús Maria, Lima'
	};

</script>

<div class="mobile-container">
	<TopBar slug={propertyData.slug} />
	<HeroGallery
		image={propertyData.image}
		badge={propertyData.badge}
		currentPhoto={1}
		totalPhotos={3}
	/>
	<PropertyContent
		typeBadge={propertyData.typeBadge}
		price={propertyData.price}
		title={propertyData.title}
		location={propertyData.location}
		description={propertyData.description}
	/>
	<FeaturesGrid
		bedrooms={propertyData.bedrooms}
		bathrooms={propertyData.bathrooms}
		parking={propertyData.parking}
		years={propertyData.years}
	/>
	<MapSection address={propertyData.address} />
</div>

<style>
	.mobile-container {
		width: 100%;
		max-width: 414px;
		background-color: var(--white);
		min-height: 100vh;
		overflow-x: hidden;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
		position: relative;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
	}

	@media (max-width: 480px) {
		.mobile-container {
			max-width: 100%;
			box-shadow: none;
			border-radius: 0;
		}
	}
</style>
