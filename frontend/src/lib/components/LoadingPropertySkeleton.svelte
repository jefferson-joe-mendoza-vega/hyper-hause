<script>
	let skeletons = Array(4).fill(null);
</script>

<div class="skeleton-container">
	<div class="rec-scroll-container">
		{#each skeletons as _}
			<div class="skeleton-card">
				<div class="skeleton skeleton-img" />
				<div class="skeleton-content">
					<div class="skeleton skeleton-title" />
					<div class="skeleton skeleton-price" />
					<div class="skeleton-divider" />
					<div class="skeleton-features">
						<div class="skeleton skeleton-feature" />
						<div class="skeleton skeleton-feature" />
						<div class="skeleton skeleton-feature" />
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.skeleton-container {
		padding: 0 24px;
		margin-bottom: 24px;
	}

	.rec-scroll-container {
		display: flex;
		gap: 16px;
		overflow-x: auto;
		padding-bottom: 12px;
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
		padding: 0;
	}

	.skeleton {
		background: linear-gradient(
			90deg,
			#ececec 0%,
			#f5f5f5 50%,
			#ececec 100%
		);
		background-size: 200% 100%;
		animation: shimmer 2s infinite;
		border-radius: 8px;
	}

	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		50% {
			background-position: -200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	.skeleton-img {
		height: 180px;
		width: 100%;
		border-radius: 0;
		margin-bottom: 0;
	}

	.skeleton-content {
		padding: 16px;
	}

	.skeleton-title {
		height: 16px;
		width: 70%;
		margin-bottom: 12px;
		border-radius: 4px;
	}

	.skeleton-price {
		height: 20px;
		width: 40%;
		margin-bottom: 16px;
		border-radius: 4px;
	}

	.skeleton-divider {
		height: 1px;
		background: #e5e7eb;
		margin: 12px 0 12px 0;
	}

	.skeleton-features {
		display: flex;
		gap: 12px;
	}

	.skeleton-feature {
		height: 16px;
		width: 30%;
		flex: 1;
		border-radius: 4px;
	}
</style>
