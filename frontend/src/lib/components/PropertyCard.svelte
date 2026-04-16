<script>
	import { goto } from '$app/navigation';

	let {
		title = '',
		price = '',
		bedrooms = 0,
		bathrooms = 0,
		area = '',
		image = '',
		badge = '',
		badgeType = 'green',
		badgeColor = '',
		location = '',
		type = 'Alquilar',
		slug = ''
	} = $props();

	// Resuelve el color final del badge:
	// - badgeColor (hex) tiene prioridad si viene de la BD
	// - Si no, usa badgeType ('green' | 'orange') como clase CSS fallback
	const FALLBACK_COLORS = { green: '#22c55e', orange: '#f97316' };
	const resolvedBadgeColor = $derived(badgeColor || FALLBACK_COLORS[badgeType] || '#22c55e');

	function handleCardClick() {
		if (slug) {
			goto(`/propiedades/${slug}`);
		}
	}
</script>

<div class="prop-card" onclick={handleCardClick}>
	<div class="prop-image" style="background-image: url('{image}')">
		<div class="badge-top" style="background:{resolvedBadgeColor}">
			<i class="fas fa-fire" /> {badge}
		</div>
		<div class="location-overlay">
			<i class="fas fa-map-marker-alt" /> {location}
		</div>
	</div>
	<div class="prop-content">
		<div class="prop-title-row">
			<div class="prop-title">{title}</div>
			<div class="type-badge">{type}</div>
		</div>
		<div class="prop-price">{price}</div>
		<hr class="prop-divider" />
		<div class="prop-features">
			<div class="feature">
				<i class="fas fa-bed" /> {bedrooms}
			</div>
			<div class="feature">
				<i class="fas fa-bath" /> {bathrooms}
			</div>
			<div class="feature">
				<i class="fas fa-ruler-combined" /> {area}
			</div>
		</div>
	</div>
</div>

<style>
	.prop-card {
		min-width: 260px;
		max-width: 260px;
		background: var(--white);
		border-radius: 16px;
		box-shadow: var(--shadow-md);
		overflow: hidden;
		flex-shrink: 0;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		border: 1px solid var(--border-color);
	}

	.prop-card:hover {
		box-shadow: var(--shadow-xl);
		transform: translateY(-8px);
		border-color: var(--logo-green);
	}

	.prop-image {
		height: 180px;
		position: relative;
		background-size: cover;
		background-position: center;
		overflow: hidden;
	}

	.prop-image::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, transparent 0%, rgba(0, 0, 0, 0.1) 100%);
		opacity: 0;
		transition: opacity 0.3s;
	}

	.prop-card:hover .prop-image::after {
		opacity: 1;
	}

	.badge-top {
		position: absolute;
		top: 12px;
		left: 12px;
		padding: 6px 12px;
		border-radius: 8px;
		color: var(--white);
		font-size: 11px;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 4px;
		backdrop-filter: blur(4px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.location-overlay {
		position: absolute;
		bottom: 12px;
		left: 12px;
		right: 12px;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(8px);
		color: var(--white);
		padding: 10px 12px;
		border-radius: 8px;
		font-size: 11px;
		font-weight: 500;
		display: flex;
		align-items: center;
		gap: 6px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.prop-content {
		padding: 16px;
	}

	.prop-title-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 8px;
		gap: 8px;
	}

	.prop-title {
		font-size: 15px;
		color: var(--text-main);
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1;
		line-height: 1.2;
	}

	.type-badge {
		background: var(--badge-purple-bg);
		color: var(--badge-purple-text);
		padding: 4px 10px;
		border-radius: 8px;
		font-size: 11px;
		font-weight: 600;
		flex-shrink: 0;
		white-space: nowrap;
	}

	.prop-price {
		font-size: 16px;
		color: var(--logo-green);
		font-weight: 700;
		margin-bottom: 12px;
	}

	.prop-divider {
		border: none;
		border-top: 1px solid var(--border-color);
		margin: 12px 0;
	}

	.prop-features {
		display: flex;
		gap: 12px;
		font-size: 12px;
		color: var(--text-gray);
	}

	.feature {
		display: flex;
		align-items: center;
		gap: 4px;
		white-space: nowrap;
	}

	.feature i {
		color: var(--text-blue);
		font-size: 14px;
	}

	/* Tablet */
	@media (min-width: 768px) {
		.prop-card {
			min-width: unset;
			max-width: 100%;
			border-radius: 20px;
		}

		.prop-image {
			height: 200px;
		}

		.prop-content {
			padding: 18px;
		}

		.prop-title {
			font-size: 16px;
		}

		.prop-price {
			font-size: 17px;
		}
	}

	/* Desktop */
	@media (min-width: 1024px) {
		.prop-card {
			min-width: unset;
			border-radius: 20px;
		}

		.prop-image {
			height: 220px;
		}

		.prop-content {
			padding: 20px;
		}

		.prop-title {
			font-size: 17px;
		}

		.prop-price {
			font-size: 18px;
			margin-bottom: 14px;
		}

		.prop-features {
			gap: 16px;
			font-size: 13px;
		}

		.feature i {
			font-size: 15px;
		}
	}

	/* Large Desktop */
	@media (min-width: 1440px) {
		.prop-image {
			height: 240px;
		}

		.prop-content {
			padding: 22px;
		}

		.prop-title {
			font-size: 18px;
		}

		.prop-price {
			font-size: 20px;
		}
	}

	.prop-price {
		color: var(--logo-green);
		font-size: 20px;
		font-weight: 700;
		margin-bottom: 12px;
	}

	.prop-divider {
		border: none;
		border-top: 1px solid var(--border-color);
		margin: 12px 0;
	}

	.prop-features {
		display: flex;
		gap: 12px;
		font-size: 12px;
		color: var(--text-gray);
	}

	.feature {
		display: flex;
		align-items: center;
		gap: 4px;
		white-space: nowrap;
	}

	.feature i {
		color: var(--text-blue);
		font-size: 14px;
	}

	/* Responsive */
	@media (min-width: 768px) {
		.prop-card {
			min-width: unset;
			border-radius: 20px;
		}

		.prop-image {
			height: 200px;
		}

		.prop-content {
			padding: 18px;
		}

		.prop-title {
			font-size: 16px;
		}

		.prop-price {
			font-size: 17px;
		}
	}

	@media (min-width: 1024px) {
		.prop-card {
			min-width: unset;
			border-radius: 20px;
		}

		.prop-image {
			height: 220px;
		}

		.prop-content {
			padding: 20px;
		}

		.prop-title {
			font-size: 17px;
		}

		.prop-price {
			font-size: 18px;
			margin-bottom: 14px;
		}

		.prop-features {
			gap: 16px;
			font-size: 13px;
		}

		.feature i {
			font-size: 15px;
		}
	}

	@media (min-width: 1440px) {
		.prop-image {
			height: 240px;
		}

		.prop-content {
			padding: 22px;
		}

		.prop-title {
			font-size: 18px;
		}

		.prop-price {
			font-size: 20px;
		}
	}
</style>
