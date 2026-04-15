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
		box-shadow: var(--shadow-md);
		border: 1px solid var(--border-color);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.project-card:hover {
		box-shadow: var(--shadow-xl);
		transform: translateY(-8px);
		border-color: var(--logo-green);
	}

	.project-bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		transition: transform 0.3s;
	}

	.project-card:hover .project-bg {
		transform: scale(1.05);
	}

	.project-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.3) 70%);
		transition: all 0.3s;
	}

	.project-card:hover .project-overlay {
		background: linear-gradient(to top, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.2) 70%);
	}

	.project-details {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 24px;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.project-badge {
		background: var(--logo-green);
		color: var(--white);
		font-size: 9px;
		font-weight: 700;
		padding: 6px 10px;
		border-radius: 6px;
		margin-bottom: 10px;
		display: inline-block;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.project-info h3 {
		font-size: 26px;
		color: var(--white);
		font-weight: 700;
		margin-bottom: 6px;
		line-height: 1.2;
	}

	.project-info p {
		font-size: 13px;
		color: rgba(255, 255, 255, 0.85);
		line-height: 1.3;
	}

	.project-btn {
		width: 40px;
		height: 40px;
		background: var(--white);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--text-main);
		font-size: 16px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		transition: all 0.3s;
		cursor: pointer;
		border: none;
	}

	.project-card:hover .project-btn {
		transform: scale(1.1) translateX(4px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
	}

	/* Tablet */
	@media (min-width: 768px) {
		.project-card {
			height: 280px;
			border-radius: 20px;
			margin-bottom: 16px;
		}

		.project-details {
			padding: 28px;
		}

		.project-badge {
			padding: 8px 12px;
			font-size: 10px;
		}

		.project-info h3 {
			font-size: 32px;
			margin-bottom: 8px;
		}

		.project-info p {
			font-size: 14px;
		}

		.project-btn {
			width: 48px;
			height: 48px;
			font-size: 18px;
		}
	}

	/* Desktop */
	@media (min-width: 1024px) {
		.project-card {
			height: 300px;
			border-radius: 24px;
			margin-bottom: 20px;
		}

		.project-details {
			padding: 32px;
		}

		.project-badge {
			padding: 8px 14px;
			font-size: 11px;
			margin-bottom: 12px;
		}

		.project-info h3 {
			font-size: 36px;
			margin-bottom: 10px;
		}

		.project-info p {
			font-size: 15px;
		}

		.project-btn {
			width: 52px;
			height: 52px;
			font-size: 20px;
		}
	}

	/* Large Desktop */
	@media (min-width: 1440px) {
		.project-card {
			height: 340px;
		}

		.project-details {
			padding: 36px;
		}

		.project-info h3 {
			font-size: 40px;
		}

		.project-info p {
			font-size: 16px;
		}
	}
</style>
