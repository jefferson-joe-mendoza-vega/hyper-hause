<script>
	let {
		typeBadge = 'Departamento',
		price = 'USD 479,000',
		title = '',
		location = '',
		description = '',
		readMoreLink = '#'
	} = $props();
</script>

<div class="property-content">
	<div class="price-row">
		<div class="type-badge">{typeBadge}</div>
		<div class="price">{price}</div>
	</div>

	<h1 class="property-title">{title}</h1>

	<div class="location-text">
		<i class="fas fa-map-marker-alt" />
		<span>{location}</span>
	</div>

	<h2 class="section-title">Descripción de la Propiedad</h2>
	<p class="description-text">{description}</p>
	<a href={readMoreLink} class="read-more">Leer más <i class="fas fa-chevron-down" style="font-size: 10px;" /></a>
</div>

<style>
	.property-content {
		padding: 0 20px 30px;
	}

	.price-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}

	.type-badge {
		background-color: var(--bg-green-light);
		color: var(--accent-green-dark);
		padding: 4px 10px;
		border-radius: 6px;
		font-size: 11px;
		font-weight: 600;
	}

	.price {
		color: var(--accent-green-dark);
		font-size: 22px;
		font-weight: 700;
	}

	.property-title {
		font-size: 18px;
		color: var(--text-main);
		font-weight: 700;
		line-height: 1.3;
		margin-bottom: 12px;
	}

	.location-text {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		color: var(--text-gray);
		font-size: 12px;
		line-height: 1.4;
		margin-bottom: 24px;
	}

	.location-text i {
		color: var(--text-light);
		margin-top: 2px;
	}

	.section-title {
		font-size: 16px;
		color: var(--text-main);
		font-weight: 700;
		margin-bottom: 12px;
	}

	.description-text {
		color: var(--text-gray);
		font-size: 13px;
		line-height: 1.6;
		margin-bottom: 8px;
	}

	.read-more {
		color: var(--accent-green-dark);
		font-size: 13px;
		font-weight: 600;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 4px;
		margin-bottom: 30px;
	}
</style>
