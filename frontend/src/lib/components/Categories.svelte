<script>
	const categories = [
		{ icon: 'fas fa-building', label: 'Deptos' },
		{ icon: 'fas fa-home', label: 'Casas' },
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
		margin-bottom: 16px;
	}

	.section-title {
		font-size: 18px;
		color: var(--text-main);
		font-weight: 600;
		letter-spacing: -0.3px;
		margin-bottom: 16px;
	}

	.categories-grid {
		display: flex;
		justify-content: space-between;
	}

	.category-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.category-item:hover {
		transform: translateY(-4px);
	}

	.cat-icon-box {
		width: 65px;
		height: 65px;
		background: var(--white);
		border-radius: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.03);
		color: var(--text-blue);
		font-size: 20px;
		transition: all 0.3s ease;
	}

	.category-item:hover .cat-icon-box {
		box-shadow: 0 12px 24px rgba(26, 75, 142, 0.12);
		background: var(--bg-green-light);
	}

	.category-item span {
		font-size: 12px;
		color: var(--text-main);
		font-weight: 500;
	}
</style>
