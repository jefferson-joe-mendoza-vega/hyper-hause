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
		location = '',
		type = 'Alquilar',
		slug = ''
	} = $props();

	function handleCardClick() {
		if (slug) {
			goto(`/propiedades/${slug}`);
		}
	}
</script>

<div class="prop-card" onclick={handleCardClick}>
	<div class="prop-image" style="background-image: url('{image}')">
		<div class="badge-top badge-{badgeType}">
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
		background: var(--white);
		border-radius: 16px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
		overflow: hidden;
		flex-shrink: 0;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.prop-card:hover {
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
		transform: translateY(-4px);
	}

	.prop-image {
		height: 180px;
		position: relative;
		background-size: cover;
		background-position: center;
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
	}

	.badge-green {
		background: var(--badge-green);
	}

	.badge-orange {
		background: var(--badge-orange);
	}

	.location-overlay {
		position: absolute;
		bottom: 12px;
		left: 12px;
		right: 12px;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
		color: var(--white);
		padding: 8px 12px;
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
		align-items: center;
		margin-bottom: 8px;
	}

	.prop-title {
		font-size: 15px;
		color: var(--text-main);
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 150px;
	}

	.type-badge {
		background: var(--badge-purple-bg);
		color: var(--badge-purple-text);
		padding: 4px 10px;
		border-radius: 8px;
		font-size: 11px;
		font-weight: 600;
	}

	.prop-price {
		color: var(--logo-green);
		font-size: 20px;
		font-weight: 700;
		margin-bottom: 12px;
	}

	.prop-divider {
		border: none;
		border-top: 1px solid var(--bg-gray-light);
		margin-bottom: 12px;
	}

	.prop-features {
		display: flex;
		justify-content: space-between;
	}

	.feature {
		display: flex;
		align-items: center;
		gap: 6px;
		color: var(--text-gray);
		font-size: 12px;
		font-weight: 500;
	}

	/* Responsive */
	@media (min-width: 768px) {
		.prop-card {
			min-width: unset;
		}
	}
</style>
