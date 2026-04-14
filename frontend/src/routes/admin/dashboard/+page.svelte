<script>
	let stats = [
		{ label: 'Total Propiedades', value: '0', icon: 'fas fa-building', color: '#4ade80' },
		{ label: 'Propiedades Activas', value: '0', icon: 'fas fa-check-circle', color: '#3b82f6' },
		{ label: 'Visitantes', value: '0', icon: 'fas fa-users', color: '#f59e0b' },
		{ label: 'Consultas', value: '0', icon: 'fas fa-inbox', color: '#8b5cf6' }
	];
</script>

<div class="dashboard">
	<h1 class="page-title">Dashboard</h1>

	<div class="stats-grid">
		{#each stats as stat}
			<div class="stat-card">
				<div class="stat-icon" style="background-color: {stat.color}20;">
					<i class={stat.icon} style="color: {stat.color};" />
				</div>
				<div class="stat-info">
					<p class="stat-label">{stat.label}</p>
					<p class="stat-value">{stat.value}</p>
				</div>
			</div>
		{/each}
	</div>

	<div class="recent-activity">
		<h2 class="section-title">Actividad Reciente</h2>
		<div class="activity-empty">
			<p>No hay actividad reciente</p>
		</div>
	</div>
</div>

<style>
	.dashboard {
		max-width: 1200px;
		margin: 0 auto;
	}

	.page-title {
		font-size: 28px;
		color: var(--text-main);
		font-weight: 700;
		margin-bottom: 30px;
		letter-spacing: -0.5px;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 20px;
		margin-bottom: 40px;
	}

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

	.section-title {
		font-size: 18px;
		color: var(--text-main);
		font-weight: 700;
		margin-bottom: 16px;
	}

	.recent-activity {
		background-color: var(--white);
		border-radius: 12px;
		padding: 24px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
	}

	.activity-empty {
		text-align: center;
		padding: 40px 20px;
		color: var(--text-gray);
	}

	/* Tablet */
	@media (max-width: 1024px) {
		.page-title {
			font-size: 24px;
			margin-bottom: 24px;
		}

		.stats-grid {
			grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
			gap: 16px;
			margin-bottom: 32px;
		}

		.stat-card {
			padding: 16px;
			gap: 12px;
		}

		.stat-icon {
			width: 50px;
			height: 50px;
		}

		.stat-icon i {
			font-size: 20px;
		}

		.stat-value {
			font-size: 20px;
		}
	}

	/* Mobile */
	@media (max-width: 768px) {
		.dashboard {
			padding: 0;
		}

		.page-title {
			font-size: 20px;
			margin-bottom: 20px;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 12px;
			margin-bottom: 24px;
		}

		.stat-card {
			padding: 12px;
			gap: 10px;
			flex-direction: column;
			text-align: center;
		}

		.stat-icon {
			width: 48px;
			height: 48px;
		}

		.stat-icon i {
			font-size: 20px;
		}

		.stat-label {
			font-size: 11px;
		}

		.stat-value {
			font-size: 18px;
		}

		.recent-activity {
			padding: 16px;
		}

		.section-title {
			font-size: 16px;
		}

		.activity-empty {
			padding: 30px 16px;
			font-size: 14px;
		}
	}

	@media (max-width: 480px) {
		.page-title {
			font-size: 18px;
			margin-bottom: 16px;
		}

		.stats-grid {
			grid-template-columns: 1fr;
			gap: 10px;
		}

		.stat-card {
			flex-direction: row;
		}

		.stat-icon {
			width: 44px;
			height: 44px;
			flex-shrink: 0;
		}

		.stat-label {
			font-size: 10px;
		}

		.stat-value {
			font-size: 16px;
		}
	}
</style>
