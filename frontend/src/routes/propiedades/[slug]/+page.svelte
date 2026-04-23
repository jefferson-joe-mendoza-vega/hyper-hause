<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import TopBar from '$lib/components/property/TopBar.svelte';
	import HeroGallery from '$lib/components/property/HeroGallery.svelte';
	import FeaturesGrid from '$lib/components/property/FeaturesGrid.svelte';
	import PropertyContent from '$lib/components/property/PropertyContent.svelte';
	import MapSection from '$lib/components/property/MapSection.svelte';

	const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8787';

	let propiedad = $state(null);
	let loading = $state(true);
	let error = $state(null);

	onMount(async () => {
		const slug = $page.params.slug;
		try {
			const res = await fetch(`${API_BASE}/api/propiedades/slug/${slug}`);
			if (!res.ok) throw new Error(`Error ${res.status}`);
			const json = await res.json();
			propiedad = json.data;
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});
</script>

<main>
	{#if loading}
		<div class="state-box">
			<div class="spinner"></div>
			<p>Cargando propiedad...</p>
		</div>
	{:else if error || !propiedad}
		<div class="state-box error">
			<i class="fas fa-exclamation-circle"></i>
			<p>No se pudo cargar la propiedad.</p>
		</div>
	{:else}
		<TopBar slug={propiedad.slug} />
		<HeroGallery
			image={propiedad.imagenes?.[0]?.url ?? ''}
			badge={propiedad.tipoOperacion ?? ''}
			currentPhoto={1}
			totalPhotos={propiedad.imagenes?.length ?? 1}
		/>
		<PropertyContent
			typeBadge={propiedad.tipoInmueble ?? ''}
			price={propiedad.precio != null ? `S/ ${Number(propiedad.precio).toLocaleString('es-PE')}` : ''}
			title={propiedad.titulo ?? ''}
			location={propiedad.direccion ?? ''}
			description={propiedad.descripcion ?? ''}
		/>
		<FeaturesGrid
			bedrooms={propiedad.dormitorios ?? 0}
			bathrooms={propiedad.banos ?? 0}
			parking={propiedad.estacionamientos ?? 0}
			years={propiedad.anos ?? 0}
		/>
		<MapSection
			address={propiedad.direccion ?? ''}
			mapaUrl={propiedad.mapaUrl ?? ''}
		/>
	{/if}
</main>

<style>
	main {
		min-height: 100vh;
	}

	.state-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
		padding: 80px 20px;
		color: var(--text-secondary, #666);
	}

	.state-box.error {
		color: #dc2626;
	}

	.state-box i {
		font-size: 40px;
		opacity: 0.5;
	}

	.spinner {
		width: 36px;
		height: 36px;
		border: 3px solid rgba(0, 208, 132, 0.2);
		border-top-color: #00d084;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>
