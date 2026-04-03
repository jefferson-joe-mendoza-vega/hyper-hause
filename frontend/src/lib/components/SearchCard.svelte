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
		border-radius: 20px;
		padding: 16px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
	}

	.tabs {
		display: flex;
		background: var(--bg-gray-light);
		border-radius: 12px;
		padding: 4px;
		margin-bottom: 16px;
	}

	.tab {
		flex: 1;
		text-align: center;
		padding: 10px 0;
		font-size: 13px;
		font-weight: 500;
		color: var(--text-gray);
		border-radius: 8px;
		cursor: pointer;
		transition: 0.2s;
	}

	.tab.active {
		background: var(--white);
		color: var(--text-blue);
		font-weight: 600;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
	}

	.search-inputs {
		display: flex;
		gap: 12px;
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
	}

	.input-group input::placeholder {
		color: #a0aec0;
	}

	.input-group i.fa-chevron-down {
		position: absolute;
		right: 14px;
		color: #a0aec0;
		font-size: 10px;
		pointer-events: none;
	}

	.search-icon {
		color: #a0aec0;
		margin-right: 8px;
		font-size: 14px;
	}
</style>
