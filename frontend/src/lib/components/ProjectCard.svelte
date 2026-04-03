<script>
	let { badge = '', title = '', description = '', image = '' } = $props();
</script>

<div class="project-card">
	<div class="project-bg" style="background-image: url('{image}');" />
	<div class="project-overlay" />
	<div class="project-details">
		<div class="project-info">
			<span class="project-badge">{badge}</span>
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
		<div class="project-btn">
			<i class="fas fa-arrow-right" />
		</div>
	</div>
</div>

<style>
	.project-card {
		position: relative;
		height: 230px;
		border-radius: 16px;
		overflow: hidden;
		margin-bottom: 12px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
	}

	.project-bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
	}

	.project-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.1) 60%);
	}

	.project-details {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.project-badge {
		background: var(--logo-green);
		color: var(--white);
		font-size: 9px;
		font-weight: 700;
		padding: 5px 8px;
		border-radius: 6px;
		margin-bottom: 8px;
		display: inline-block;
	}

	.project-info h3 {
		font-size: 24px;
		color: var(--white);
		font-weight: 700;
		margin-bottom: 4px;
	}

	.project-info p {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.85);
	}

	.project-btn {
		width: 38px;
		height: 38px;
		background: var(--white);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--text-main);
		font-size: 14px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	}
</style>
