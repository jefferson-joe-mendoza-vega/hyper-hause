<script>
	let { bedrooms = 3, bathrooms = 3, parking = 5, years = 0 } = $props();
</script>

<div class="features-grid">
	<div class="feature-card">
		<i class="fas fa-bed" />
		<strong>{bedrooms}</strong>
		<span>DORM.</span>
	</div>
	<div class="feature-card">
		<i class="fas fa-bath" />
		<strong>{bathrooms}</strong>
		<span>BAÑOS</span>
	</div>
	<div class="feature-card">
		<i class="fas fa-car" />
		<strong>{parking}</strong>
		<span>PARKING</span>
	</div>
	<div class="feature-card">
		<i class="fas fa-clock" />
		<strong>{years}</strong>
		<span>AÑOS</span>
	</div>
</div>

<style>
	.features-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		margin-bottom: 30px;
	}

	.feature-card {
		background-color: #f8fafc;
		border-radius: 12px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
	}

	.feature-card i {
		color: var(--accent-green-dark);
		font-size: 18px;
		margin-bottom: 4px;
	}

	.feature-card strong {
		color: var(--text-main);
		font-size: 15px;
		font-weight: 700;
	}

	.feature-card span {
		color: var(--text-light);
		font-size: 9px;
		font-weight: 600;
		letter-spacing: 0.5px;
	}
</style>
