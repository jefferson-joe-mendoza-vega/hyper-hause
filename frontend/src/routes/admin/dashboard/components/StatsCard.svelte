<script>
	let { stat } = $props();
</script>

<div class="stat-card">
	<div class="stat-icon" style="background-color: {stat.color}20;">
		<i class={stat.icon} style="color: {stat.color};" />
	</div>
	<div class="stat-info">
		<p class="stat-label">{stat.label}</p>
		<p class="stat-value">{stat.value}</p>
	</div>
</div>

<style>
	.stat-card {
		background-color: var(--white);
		border-radius: 12px;
		padding: 20px;
		display: flex;
		align-items: center;
		gap: 16px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
		transition: 0.2s;
	}

	.stat-card:hover {
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
	}

	.stat-icon {
		width: 60px;
		height: 60px;
		border-radius: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
	}

	.stat-icon i {
		font-size: 24px;
	}

	.stat-info {
		flex: 1;
	}

	.stat-label {
		font-size: 12px;
		color: var(--text-gray);
		font-weight: 600;
		letter-spacing: 0.5px;
		margin-bottom: 4px;
	}

	.stat-value {
		font-size: 24px;
		color: var(--text-main);
		font-weight: 700;
	}
</style>
