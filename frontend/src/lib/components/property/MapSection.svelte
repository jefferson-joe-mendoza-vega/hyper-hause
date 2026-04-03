<script>
	let { mapImage = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80', address = '' } = $props();
</script>

<div class="map-section">
	<h2 class="section-title">Ubicación</h2>
	<div class="map-container">
		<div class="map-overlay-tint" />
		<a href="#" class="open-maps-btn">Open in Maps <i class="fas fa-external-link-alt" style="font-size: 10px;" /></a>
		<i class="fas fa-map-marker-alt pin-center" />
		<div class="expand-btn"><i class="fas fa-expand" /></div>
	</div>
	<div class="address-box">
		<i class="fas fa-map-marker-alt" />
		<p>{address}</p>
	</div>
</div>

<style>
	.section-title {
		font-size: 16px;
		color: var(--text-main);
		font-weight: 700;
		margin-bottom: 12px;
	}

	.map-container {
		width: 100%;
		height: 200px;
		border-radius: 12px;
		background-image: url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80');
		background-size: cover;
		background-position: center;
		position: relative;
		margin-bottom: 12px;
		overflow: hidden;
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
	}

	.map-overlay-tint {
		position: absolute;
		inset: 0;
		background-color: rgba(74, 222, 128, 0.1);
	}

	.pin-center {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #ef4444;
		font-size: 32px;
		filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.3));
	}

	.open-maps-btn {
		position: absolute;
		top: 12px;
		left: 12px;
		background-color: var(--white);
		color: #2563eb;
		padding: 6px 12px;
		border-radius: 6px;
		font-size: 11px;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 6px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		text-decoration: none;
		z-index: 2;
	}

	.expand-btn {
		position: absolute;
		bottom: 12px;
		right: 12px;
		width: 32px;
		height: 32px;
		background-color: var(--white);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-gray);
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		z-index: 2;
	}

	.address-box {
		background-color: #f8fafc;
		padding: 12px 16px;
		border-radius: 12px;
		display: flex;
		align-items: flex-start;
		gap: 12px;
	}

	.address-box i {
		color: var(--text-light);
		margin-top: 2px;
	}

	.address-box p {
		color: var(--text-main);
		font-size: 12px;
		font-weight: 600;
		line-height: 1.4;
	}
</style>
