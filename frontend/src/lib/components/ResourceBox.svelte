<script>
	let {
		icon = 'fas fa-bars',
		title = '',
		description = '',
		iconBg = '#e6fbf2',
		iconColor = 'var(--logo-green)',
		href = '#'
	} = $props();
</script>

<a class="resource-box" {href}>
	<div class="res-icon" style="background:{iconBg}; color:{iconColor}">
		<i class={icon} />
	</div>
	<div class="res-text">
		<h3>{title}</h3>
		<p>{description}</p>
	</div>
	<i class="fas fa-arrow-right res-arrow" />
</a>

<style>
	.resource-box {
		background: var(--white);
		border-radius: 16px;
		padding: 16px;
		display: flex;
		align-items: center;
		gap: 16px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
		text-decoration: none;
		cursor: pointer;
		transition: box-shadow 0.2s ease, transform 0.2s ease;
		border: 1px solid transparent;
	}

	.resource-box:hover {
		box-shadow: 0 8px 28px rgba(0, 0, 0, 0.09);
		transform: translateY(-2px);
		border-color: var(--border-color);
	}

	.res-icon {
		width: 48px;
		height: 48px;
		border-radius: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		flex-shrink: 0;
	}

	.res-text {
		flex: 1;
	}

	.res-text h3 {
		font-size: 15px;
		color: var(--text-main);
		font-weight: 600;
		margin-bottom: 4px;
	}

	.res-text p {
		font-size: 12px;
		color: var(--text-gray);
		line-height: 1.4;
		margin: 0;
	}

	.res-arrow {
		color: #a0aec0;
		font-size: 14px;
		flex-shrink: 0;
	}
</style>
