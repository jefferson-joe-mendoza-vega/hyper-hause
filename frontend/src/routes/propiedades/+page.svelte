<script>
	import { onMount } from 'svelte';
	import PropertyCard from '$lib/components/PropertyCard.svelte';
	import LoadingPropertySkeleton from '$lib/components/LoadingPropertySkeleton.svelte';

	let propiedades = $state([]);
	let loading = $state(true);
	let error = $state(null);

	const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

	onMount(async () => {
		try {
			loading = true;
			
			// Esperar AMBAS cosas: el fetch Y 2 segundos mínimos
			// Así siempre se ve la animación de carga
			const [response] = await Promise.all([
				fetch(`${BACKEND_URL}/api/propiedades`),
				new Promise(resolve => setTimeout(resolve, 2000))
			]);

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			const data = await response.json();
			propiedades = (data.data || []).map((prop) => ({
				slug: prop.slug || prop.nombre?.toLowerCase().replace(/\s+/g, '-'),
				title: prop.titulo || prop.nombre || 'Sin título',
				price: prop.precio != null ? `S/ ${Number(prop.precio).toLocaleString('es-PE')}` : 'Precio no disponible',
				bedrooms: prop.dormitorios || 0,
				bathrooms: prop.banos || 0,
				area: prop.area ? `${prop.area}m²` : 'N/A',
				image: prop.imagenes?.[0]?.url || 'https://via.placeholder.com/300x200',
				badge: prop.recomendadoEtiqueta || 'Nuevo',
				badgeType: 'green',
				badgeColor: prop.recomendadoColor || '',
				location: prop.direccion || prop.ubicacion || 'Ubicación no especificada',
				type: prop.tipoOperacion || 'Alquilar'
			}));
		} catch (err) {
			error = err.message;
			console.error('Error cargando propiedades:', err);
		} finally {
			loading = false;
		}
	});

	let recomendadas = $derived(propiedades.slice(0, 2));
	let todasLasPropiedades = $derived(propiedades);
</script>

<div class="propiedades-container">
	{#if loading}
		<LoadingPropertySkeleton />
	{:else if error}
		<div class="error">
			<p>Error: {error}</p>
		</div>
	{:else if propiedades.length === 0}
		<div class="empty">
			<p>No hay propiedades disponibles</p>
		</div>
	{:else}
		<!-- Sección Recomendadas -->
		<section class="recommendations-section px-24">
			<div class="rec-header">
				<h2 class="section-title" style="margin: 0;">
					Nuestras<br />recomendaciones
				</h2>
			</div>
			<div class="rec-scroll-container">
				{#each recomendadas as property}
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
		</section>

		<!-- Sección Todas las propiedades -->
		<section class="all-properties-section px-24">
			<h2 class="section-title">Todas las Propiedades</h2>
			<div class="propiedades-grid">
				{#each todasLasPropiedades as property}
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
		</section>
	{/if}
</div>

<style>
	.propiedades-container {
		padding: 0;
		min-height: 50vh;
	}

	.recommendations-section {
		margin-bottom: 24px;
	}

	.rec-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: 12px;
	}

	.rec-scroll-container {
		display: flex;
		gap: 16px;
		overflow-x: auto;
		padding-bottom: 12px;
		scrollbar-width: none;
	}

	.rec-scroll-container::-webkit-scrollbar {
		display: none;
	}

	.all-properties-section {
		margin-bottom: 20px;
	}

	.section-title {
		font-size: 18px;
		color: var(--text-main);
		font-weight: 600;
		letter-spacing: -0.3px;
		margin-bottom: 12px;
	}

	.loading,
	.error,
	.empty {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 300px;
		text-align: center;
		color: var(--text-gray);
	}

	.error {
		background-color: #fee2e2;
		color: #dc2626;
		border-radius: 12px;
		padding: 20px;
	}

	.propiedades-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 16px;
	}

	@media (max-width: 768px) {
		.propiedades-grid {
			grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
			gap: 12px;
		}
	}

	@media (max-width: 480px) {
		.propiedades-grid {
			grid-template-columns: 1fr;
		}
	}

	.location {
		font-size: 12px;
		color: var(--text-gray);
		display: flex;
		align-items: center;
		gap: 4px;
		margin-bottom: 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.price-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.price {
		font-size: 16px;
		color: var(--logo-green);
		font-weight: 700;
	}

	.type-badge {
		background: var(--badge-purple-bg);
		color: var(--badge-purple-text);
		font-size: 11px;
		font-weight: 600;
		padding: 4px 8px;
		border-radius: 6px;
	}

	@media (min-width: 768px) {
		.propiedades-grid {
			display: grid !important;
			grid-template-columns: repeat(2, 1fr) !important;
			gap: 16px !important;
		}

		.propiedad-item {
			flex-direction: column !important;
		}

		.propiedad-img {
			width: 100% !important;
			height: 160px !important;
		}
	}

	@media (min-width: 1024px) {
		.propiedades-grid {
			grid-template-columns: repeat(3, 1fr) !important;
		}
	}

	@media (min-width: 1440px) {
		.propiedades-grid {
			grid-template-columns: repeat(4, 1fr) !important;
		}
	}
</style>
