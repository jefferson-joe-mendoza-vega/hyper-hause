<script>
	let { count = 3 } = $props();
	let skeletons = Array(count).fill(null);
</script>

<div class="rec-scroll-container">
	{#each skeletons as _}
		<div class="skeleton-card">
			<!-- Imagen -->
			<div class="skeleton skeleton-img" />

			<!-- Contenido -->
			<div class="skeleton-content">
				<!-- Título y badge -->
				<div class="skeleton-title-row">
					<div class="skeleton skeleton-title" />
					<div class="skeleton skeleton-badge" />
				</div>

				<!-- Precio -->
				<div class="skeleton skeleton-price" />

				<!-- Divider -->
				<div class="skeleton-divider" />

				<!-- Features -->
				<div class="skeleton-features">
					<div class="skeleton skeleton-feature" />
					<div class="skeleton skeleton-feature" />
					<div class="skeleton skeleton-feature" />
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.rec-scroll-container {
		display: flex;
		gap: 16px;
		overflow-x: auto;
		padding-bottom: 12px;
		padding-right: 24px;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.rec-scroll-container::-webkit-scrollbar {
		display: none;
	}

	.skeleton-card {
		min-width: 260px;
		background: #ffffff;
		border-radius: 16px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
		overflow: hidden;
		flex-shrink: 0;
	}

	/* ── Animación Shimmer (igual que carga.html) ── */
	.skeleton {
		background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
		border-radius: 8px;
	}

	@keyframes shimmer {
		0%   { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}

	/* ── Piezas del skeleton ── */
	.skeleton-img {
		height: 180px;
		width: 100%;
		border-radius: 0;
	}

	.skeleton-content {
		padding: 16px;
	}

	.skeleton-title-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	.skeleton-title {
		height: 14px;
		width: 55%;
		border-radius: 4px;
	}

	.skeleton-badge {
		height: 22px;
		width: 28%;
		border-radius: 8px;
	}

	.skeleton-price {
		height: 20px;
		width: 40%;
		margin-bottom: 14px;
		border-radius: 4px;
	}

	.skeleton-divider {
		height: 1px;
		background: #e5e7eb;
		margin-bottom: 12px;
	}

	.skeleton-features {
		display: flex;
		gap: 8px;
	}

	.skeleton-feature {
		height: 14px;
		flex: 1;
		border-radius: 4px;
	}

	/* Responsive: desktop grid */
	@media (min-width: 1024px) {
		.rec-scroll-container {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
			gap: 16px;
			overflow: visible;
			padding-right: 0;
		}

		.skeleton-card {
			min-width: unset;
		}
	}
</style>
