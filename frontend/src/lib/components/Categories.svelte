<script>
	const categories = [
		{ icon: 'fas fa-building', label: 'Deptos' },
		{ icon: 'fas fa-home', label: 'Casas' },
		{ icon: 'fas fa-store', label: 'Comercial' },
		{ icon: 'fas fa-industry', label: 'Industrial' },
		{ icon: 'fas fa-mountain', label: 'Terrenos' }
	];
</script>

<section class="categories-section">
	<h2 class="section-title">Categorías</h2>
	<div class="categories-grid">
		{#each categories as category}
			<div class="category-item">
				<div class="cat-icon-box">
					<i class={category.icon} />
				</div>
				<span>{category.label}</span>
			</div>
		{/each}
	</div>
</section>

<style>
	.categories-section {
		padding: 0 24px;
		margin-bottom: 24px;
	}

	.section-title {
		font-size: 18px;
		color: var(--text-main);
		font-weight: 600;
		letter-spacing: -0.3px;
		margin-bottom: 16px;
	}

	.categories-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		gap: 12px;
	}

	.category-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.category-item:hover {
		transform: translateY(-6px);
	}

	.cat-icon-box {
		width: 70px;
		height: 70px;
		background: var(--white);
		border-radius: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: var(--shadow-md);
		color: var(--text-blue);
		font-size: 24px;
		transition: all 0.3s;
		border: 1px solid var(--border-color);
	}

	.category-item:hover .cat-icon-box {
		box-shadow: var(--shadow-lg);
		background: var(--bg-green-light);
		border-color: var(--logo-green);
		transform: scale(1.05);
	}

	.category-item span {
		font-size: 12px;
		color: var(--text-main);
		font-weight: 500;
		text-align: center;
		line-height: 1.3;
	}

	/* Tablet */
	@media (min-width: 768px) {
		.categories-section {
			padding: 0 48px;
			margin-bottom: 32px;
		}

		.section-title {
			font-size: 20px;
			margin-bottom: 20px;
		}

		.categories-grid {
			grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
			gap: 16px;
		}

		.cat-icon-box {
			width: 80px;
			height: 80px;
			font-size: 28px;
		}

		.category-item span {
			font-size: 13px;
		}
	}

	/* Desktop */
	@media (min-width: 1024px) {
		.categories-section {
			padding: 0 80px;
			margin-bottom: 48px;
		}

		.section-title {
			font-size: 24px;
			margin-bottom: 28px;
		}

		.categories-grid {
			display: flex;
			justify-content: flex-start;
			gap: 24px;
			overflow-x: auto;
			overflow-y: hidden;
			padding-bottom: 8px;
			scrollbar-width: thin;
			scrollbar-color: var(--border-color) transparent;
		}

		.categories-grid::-webkit-scrollbar {
			height: 4px;
		}

		.categories-grid::-webkit-scrollbar-track {
			background: transparent;
		}

		.categories-grid::-webkit-scrollbar-thumb {
			background: var(--border-color);
			border-radius: 2px;
		}

		.category-item {
			flex: 0 0 auto;
			gap: 12px;
		}

		.cat-icon-box {
			width: 90px;
			height: 90px;
			font-size: 32px;
			border-radius: 20px;
		}

		.category-item span {
			font-size: 14px;
		}
	}
</style>
