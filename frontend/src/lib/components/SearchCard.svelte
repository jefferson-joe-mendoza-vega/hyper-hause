<script>
	let activeTab = 'alquilar';

	const tabs = ['Alquilar', 'Comprar', 'Proyectos'];

	const propertyTypes = ['Tipo de Propiedad', 'Departamento', 'Casa', 'Terreno', 'Comercio'];
</script>

<div class="search-card">
	<div class="tabs">
		{#each tabs as tab}
			<div
				class="tab {activeTab === tab.toLowerCase() ? 'active' : ''}"
				on:click={() => (activeTab = tab.toLowerCase())}
				on:keydown={(e) => e.key === 'Enter' && (activeTab = tab.toLowerCase())}
				role="button"
				tabindex="0"
			>
				{tab}
			</div>
		{/each}
	</div>
	<div class="search-inputs">
		<div class="input-group">
			<select>
				{#each propertyTypes as type}
					<option>{type}</option>
				{/each}
			</select>
			<i class="fas fa-chevron-down" />
		</div>
		<div class="input-group">
			<i class="fas fa-search search-icon" />
			<input type="text" placeholder="Ciudad, zona" />
		</div>
	</div>
</div>

<style>
	.search-card {
		background: var(--white);
		border-radius: 16px;
		padding: 20px;
		box-shadow: var(--shadow-md);
		border: 1px solid var(--border-color);
	}

	.tabs {
		display: flex;
		background: var(--bg-gray-light);
		border-radius: 12px;
		padding: 4px;
		margin-bottom: 20px;
		gap: 4px;
	}

	.tab {
		flex: 1;
		text-align: center;
		padding: 12px 8px;
		font-size: 13px;
		font-weight: 500;
		color: var(--text-gray);
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s;
		white-space: nowrap;
	}

	.tab.active {
		background: var(--white);
		color: var(--text-blue);
		font-weight: 600;
		box-shadow: var(--shadow-sm);
	}

	.tab:hover {
		color: var(--text-blue);
	}

	.search-inputs {
		display: flex;
		gap: 12px;
		flex-direction: column;
	}

	.input-group {
		flex: 1;
		background: var(--bg-color);
		border-radius: 12px;
		display: flex;
		align-items: center;
		padding: 0 14px;
		height: 44px;
		position: relative;
		border: 1px solid var(--border-color);
		transition: all 0.3s;
	}

	.input-group:hover,
	.input-group:focus-within {
		border-color: var(--logo-green);
		background: var(--white);
		box-shadow: 0 0 0 3px rgba(0, 208, 132, 0.1);
	}

	.input-group select,
	.input-group input {
		border: none;
		background: transparent;
		width: 100%;
		font-size: 13px;
		color: var(--text-main);
		outline: none;
		appearance: none;
		font-weight: 500;
	}

	.input-group input::placeholder {
		color: var(--text-muted);
	}

	.input-group i.fa-chevron-down {
		position: absolute;
		right: 14px;
		color: var(--text-muted);
		font-size: 10px;
		pointer-events: none;
	}

	.search-icon {
		color: var(--text-muted);
		margin-right: 8px;
		font-size: 14px;
		flex-shrink: 0;
	}

	/* Tablet */
	@media (min-width: 768px) {
		.search-card {
			padding: 24px;
			border-radius: 20px;
		}

		.tabs {
			margin-bottom: 24px;
		}

		.search-inputs {
			flex-direction: row;
			gap: 16px;
		}

		.input-group {
			height: 50px;
			padding: 0 16px;
			font-size: 14px;
		}
	}

	/* Desktop */
	@media (min-width: 1024px) {
		.search-card {
			padding: 28px;
			border-radius: 24px;
			background: linear-gradient(135deg, var(--white) 0%, rgba(240, 253, 250, 0.5) 100%);
		}

		.tabs {
			margin-bottom: 28px;
		}

		.tab {
			padding: 14px 12px;
			font-size: 14px;
		}

		.search-inputs {
			gap: 20px;
		}

		.input-group {
			height: 56px;
			padding: 0 18px;
			border-radius: 14px;
			font-size: 15px;
		}
	}
</style>
