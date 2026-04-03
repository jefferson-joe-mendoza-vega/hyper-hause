<script>
	let { icon = 'fas fa-bars', title = '', description = '' } = $props();
</script>

<div class="resource-box">
	<div class="res-icon">
		<i class={icon} />
	</div>
	<div class="res-text">
		<h3>{title}</h3>
		<p>{description}</p>
	</div>
	<i class="fas fa-arrow-right res-arrow" />
</div>

<style>
	.resource-box {
		background: var(--white);
		border-radius: 16px;
		padding: 16px;
		display: flex;
		align-items: center;
		gap: 16px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);
	}

	.res-icon {
		width: 48px;
		height: 48px;
		background: #e6fbf2;
		color: var(--logo-green);
		border-radius: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		flex-shrink: 0;
	}

	.res-text h3 {
		font-size: 15px;
		color: var(--text-main);
		font-weight: 600;
		margin-bottom: 2px;
	}

	.res-text p {
		font-size: 11px;
		color: var(--text-gray);
		line-height: 1.4;
	}

	.res-arrow {
		color: #a0aec0;
		font-size: 14px;
		margin-left: auto;
	}
</style>
